import React, { useState } from 'react';
import {
  ShieldAlert,
  HelpCircle,
  Check,
  Edit3,
  Search,
  Sparkles,
  AlertTriangle,
  Pill,
  BookOpen,
  Info,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  RotateCcw,
} from 'lucide-react';
import { MedicineDetail } from '../types';
import { MEDICINE_DICTIONARY, DictionaryEntry } from '../data/medicineDictionary';
import {
  saveLearnedCorrection,
  getClinicalExplanationForMedicine,
  getLearnedCorrections,
} from '../utils/hitlLearningEngine';

interface HumanInTheLoopVerificationCardProps {
  medicines: MedicineDetail[];
  onConfirmOrUpdateMedicine: (
    index: number,
    confirmedName: string,
    confirmedGeneric?: string,
    extraExplanation?: Partial<MedicineDetail>
  ) => void;
  className?: string;
}

export const HumanInTheLoopVerificationCard: React.FC<HumanInTheLoopVerificationCardProps> = ({
  medicines,
  onConfirmOrUpdateMedicine,
  className = '',
}) => {
  // Find medicines that have low confidence (< 75%), or need user confirmation, or have not been confirmed yet
  const [activeManualIndex, setActiveManualIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customStrength, setCustomStrength] = useState<string>('');
  const [customTiming, setCustomTiming] = useState<string>('');
  const [lastExplainedIndex, setLastExplainedIndex] = useState<number | null>(null);
  const [showLearningDrawer, setShowLearningDrawer] = useState<boolean>(false);

  // Strictly filter: ONLY ask Doctor Handwriting Verification when below 50% sure AND you just can't get the name
  const itemsToReview: number[] = [];

  medicines.forEach((med, idx) => {
    // If already verified or confirmed, never re-ask
    if (med.nlpResolution?.userConfirmed) return;

    const score = med.nlpResolution?.confidenceScore ?? 100;
    const isBelow50 = score < 50;

    const nameLower = (med.name || '').toLowerCase();
    const genericLower = (med.genericName || '').toLowerCase();
    const rawLower = (med.nlpResolution?.originalRawToken || '').toLowerCase();

    const cantGetName =
      !med.nlpResolution?.brandToGenericMapped ||
      nameLower.includes('apologies') ||
      nameLower.includes('unidentified') ||
      nameLower.includes('pharmacist') ||
      nameLower.includes('unclear') ||
      nameLower.includes('illegible') ||
      nameLower.includes('scribble') ||
      nameLower.includes('unknown') ||
      nameLower.includes('ambiguous') ||
      nameLower.includes('undecipherable') ||
      nameLower.includes('?') ||
      genericLower.includes('under review') ||
      genericLower.includes('unable to identify') ||
      rawLower.includes('?');

    // Rule: below 50% sure AND can't get the name
    if (isBelow50 && cantGetName) {
      itemsToReview.push(idx);
    }
  });

  // Autocomplete matching against MEDICINE_DICTIONARY
  const filteredSuggestions = searchQuery.trim().length >= 2
    ? MEDICINE_DICTIONARY.filter((entry) => {
        const q = searchQuery.toLowerCase();
        return (
          entry.brandName.toLowerCase().includes(q) ||
          entry.genericName.toLowerCase().includes(q) ||
          entry.shortForms.some((s) => s.toLowerCase().includes(q)) ||
          entry.regionalAliases?.some((a) => a.toLowerCase().includes(q))
        );
      }).slice(0, 5)
    : [];

  const handleApproveAsCorrect = (index: number) => {
    const med = medicines[index];
    if (!med) return;

    const rawToken = med.nlpResolution?.originalRawToken || med.name;

    // Train site memory
    saveLearnedCorrection(rawToken, med.name, med.genericName, {
      strength: med.strength,
      form: med.form,
      category: 'User Verified Correct',
    });

    // Re-enrich with verified clinical explanation
    const clinicalInfo = getClinicalExplanationForMedicine(med.name, med.genericName);

    onConfirmOrUpdateMedicine(index, med.name, med.genericName, {
      purposeAndUsage: clinicalInfo.purposeAndUsage,
      howToTake: clinicalInfo.howToTake,
      precautions: clinicalInfo.precautions,
      commonSideEffects: clinicalInfo.commonSideEffects,
      whenToContactDoctor: clinicalInfo.whenToContactDoctor,
    });

    setLastExplainedIndex(index);
    if (activeManualIndex === index) {
      setActiveManualIndex(null);
    }
  };

  const handleSelectSuggestion = (
    index: number,
    entry: DictionaryEntry,
    chosenStrength?: string
  ) => {
    const med = medicines[index];
    if (!med) return;

    const rawToken = med.nlpResolution?.originalRawToken || med.name;
    const finalStrength = chosenStrength || customStrength || entry.standardStrengths[0] || med.strength;
    const finalName = `${entry.brandName}${finalStrength ? ' ' + finalStrength : ''}`;

    // Train site memory
    saveLearnedCorrection(rawToken, entry.brandName, entry.genericName, {
      strength: finalStrength,
      form: entry.forms[0] || med.form,
      category: entry.category,
    });

    // Generate full clinical explanation
    const clinicalInfo = getClinicalExplanationForMedicine(entry.brandName, entry.genericName);

    onConfirmOrUpdateMedicine(index, finalName, entry.genericName, {
      strength: finalStrength,
      form: entry.forms[0] || med.form,
      purposeAndUsage: clinicalInfo.purposeAndUsage,
      howToTake: clinicalInfo.howToTake,
      precautions: clinicalInfo.precautions,
      commonSideEffects: clinicalInfo.commonSideEffects,
      whenToContactDoctor: clinicalInfo.whenToContactDoctor,
      mealRelationText: clinicalInfo.mealRelationText,
    });

    setLastExplainedIndex(index);
    setActiveManualIndex(null);
    setSearchQuery('');
    setCustomStrength('');
  };

  const handleCustomManualSubmit = (index: number) => {
    const med = medicines[index];
    if (!med || !searchQuery.trim()) return;

    const rawToken = med.nlpResolution?.originalRawToken || med.name;
    const trimmed = searchQuery.trim();

    // Check if typed name matches any generic or brand in dictionary
    const match = MEDICINE_DICTIONARY.find(
      (d) =>
        d.brandName.toLowerCase() === trimmed.toLowerCase() ||
        d.genericName.toLowerCase().includes(trimmed.toLowerCase())
    );

    const confirmedGeneric = match ? match.genericName : med.genericName;
    const finalName = customStrength ? `${trimmed} ${customStrength}` : trimmed;

    // Train site memory
    saveLearnedCorrection(rawToken, trimmed, confirmedGeneric, {
      strength: customStrength || med.strength,
      form: med.form,
    });

    const clinicalInfo = getClinicalExplanationForMedicine(trimmed, confirmedGeneric);

    onConfirmOrUpdateMedicine(index, finalName, confirmedGeneric, {
      strength: customStrength || med.strength,
      purposeAndUsage: clinicalInfo.purposeAndUsage,
      howToTake: clinicalInfo.howToTake,
      precautions: clinicalInfo.precautions,
      commonSideEffects: clinicalInfo.commonSideEffects,
      whenToContactDoctor: clinicalInfo.whenToContactDoctor,
    });

    setLastExplainedIndex(index);
    setActiveManualIndex(null);
    setSearchQuery('');
    setCustomStrength('');
  };

  // If no medicines are below 50% sure with an unidentifiable name, do not show any prompt
  if (itemsToReview.length === 0) {
    return null;
  }

  const learnedMemory = getLearnedCorrections();

  return (
    <div
      id="human-in-the-loop-card"
      className={`bg-white rounded-3xl border-2 border-amber-300 shadow-sm overflow-hidden ${className}`}
    >
      {/* Top Warning Accent Bar */}
      <div className="h-2 w-full bg-linear-to-r from-amber-500 via-orange-500 to-amber-600" />

      {/* Header */}
      <div className="p-5 sm:p-6 bg-linear-to-r from-slate-950 via-amber-950/90 to-slate-950 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Confidence Below 50% — Doctor Handwriting Verification
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/20">
                {itemsToReview.length} Line{itemsToReview.length > 1 ? 's' : ''} Need Review
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Doctor Handwriting Verification
            </h3>
            <p className="text-xs text-amber-100/90 max-w-2xl leading-relaxed">
              We are below 50% sure about the medicine name on this line because the doctor’s handwriting is unclear. Please confirm or type the medicine name manually to prevent medication errors and train the site.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={() => setShowLearningDrawer(!showLearningDrawer)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all border border-amber-400/30 cursor-pointer"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
              <span>Learned Memory ({learnedMemory.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Site Learning Drawer (Collapsible) */}
      {showLearningDrawer && (
        <div className="bg-amber-50/70 border-b border-amber-200 p-4 sm:p-5 text-xs text-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-amber-700" />
              Adaptive Site Memory: Learned Doctor Handwriting Patterns
            </h4>
            <span className="text-[11px] text-amber-800 font-medium">
              Trained from human confirmations
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            Every time you confirm or manually type a medicine below, the system permanently learns that doctor’s handwriting ligature or abbreviation. Future scans will recognize it with 100% confidence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {learnedMemory.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-white border border-amber-200 shadow-2xs flex flex-col justify-between text-left"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-mono text-[11px] bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-bold">
                    "{item.rawToken}"
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    +{item.count} Confirmed
                  </span>
                </div>
                <div className="font-bold text-slate-900 text-xs truncate">
                  → {item.confirmedMedicine}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {item.confirmedGeneric}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Low-Confidence / Ambiguous Items Review List */}
      <div className="p-4 sm:p-6 divide-y divide-slate-200 space-y-5 sm:space-y-6">
        {itemsToReview.map((medIndex) => {
          const med = medicines[medIndex];
          if (!med) return null;

          const isManualActive = activeManualIndex === medIndex;
          const rawOcrToken = med.nlpResolution?.originalRawToken || med.name;
          const score = med.nlpResolution?.confidenceScore ?? 60;
          const isJustExplained = lastExplainedIndex === medIndex;

          const isUnableToUnderstand =
            med.name.toLowerCase().includes('apologies') ||
            med.name.toLowerCase().includes('unidentified') ||
            med.name.toLowerCase().includes('pharmacist') ||
            (score < 50 && !med.nlpResolution?.brandToGenericMapped);

          return (
            <div
              key={medIndex}
              className={`pt-5 first:pt-0 space-y-3 transition-all ${
                isJustExplained ? 'p-3 bg-emerald-50/50 rounded-2xl border border-emerald-200' : ''
              }`}
            >
              {/* Card Row Top: Raw OCR vs Best Guess */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      Line #{medIndex + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      OCR Detected Text:
                    </span>
                    <code className="font-mono text-xs font-bold bg-white px-2.5 py-1 rounded-md border border-slate-300 text-slate-900 shadow-2xs">
                      "{rawOcrToken}"
                    </code>
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Confidence: {score}%
                    </span>
                  </div>

                  {isUnableToUnderstand ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-0.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100/90 text-amber-900 border border-amber-300 text-xs font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Apologies, we didn't understand this medicine</span>
                      </div>
                      <span className="text-xs text-slate-600">
                        Doctor's handwriting is unclear on this line.
                      </span>
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-slate-700 flex flex-wrap items-center gap-2">
                      <span>AI Predicted Match:</span>
                      <strong className="text-slate-900 text-base">{med.name}</strong>
                      {med.strength && (
                        <span className="text-xs bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">
                          {med.strength}
                        </span>
                      )}
                      <span className="text-xs text-slate-500">
                        ({med.genericName})
                      </span>
                    </div>
                  )}
                </div>

                {/* Direct Question Prompt */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                  <div className="text-xs font-bold text-slate-700 text-center sm:text-right">
                    {isUnableToUnderstand ? "Do you know this medicine?" : "Is this correct?"}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* If unable to understand, provide Type Manually as the prominent action */}
                    {isUnableToUnderstand ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (isManualActive) {
                            setActiveManualIndex(null);
                          } else {
                            setActiveManualIndex(medIndex);
                            setSearchQuery('');
                            setCustomStrength(med.strength || '');
                          }
                        }}
                        className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isManualActive
                            ? 'bg-amber-500 text-slate-950 border border-amber-600'
                            : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                        }`}
                      >
                        <Edit3 className="w-4 h-4 text-slate-950" />
                        <span>Type medicine name</span>
                      </button>
                    ) : (
                      <>
                        {/* YES BUTTON */}
                        <button
                          type="button"
                          onClick={() => handleApproveAsCorrect(medIndex)}
                          className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Yes, this is correct</span>
                        </button>

                        {/* NO BUTTON -> Open manual input */}
                        <button
                          type="button"
                          onClick={() => {
                            if (isManualActive) {
                              setActiveManualIndex(null);
                            } else {
                              setActiveManualIndex(medIndex);
                              setSearchQuery('');
                              setCustomStrength(med.strength || '');
                            }
                          }}
                          className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isManualActive
                              ? 'bg-amber-100 text-amber-900 border-amber-400'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                          <span>No, type manually</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* MANUAL TYPING ACCORDION */}
              {isManualActive && (
                <div className="bg-amber-50/50 border border-amber-300 p-4 sm:p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5">
                      <Edit3 className="w-4 h-4 text-amber-700" />
                      Type Correct Medicine Name for "{rawOcrToken}"
                    </h5>
                    <span className="text-[11px] text-slate-500">
                      Search by brand name or generic active salt
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-8 relative">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Medicine Name (Live Autocomplete):
                      </label>
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="e.g. Augmentin, Dolo, Pantocid, Azithral, Telma..."
                          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-xs text-slate-900 font-semibold"
                          autoFocus
                        />
                      </div>

                      {/* Autocomplete Dropdown */}
                      {filteredSuggestions.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-lg z-30 overflow-hidden divide-y divide-slate-100">
                          {filteredSuggestions.map((entry) => (
                            <button
                              key={entry.brandName}
                              type="button"
                              onClick={() => handleSelectSuggestion(medIndex, entry)}
                              className="w-full p-2.5 text-left hover:bg-amber-50 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                            >
                              <div>
                                <div className="font-bold text-slate-900 text-xs">
                                  {entry.brandName}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  {entry.genericName}
                                </div>
                              </div>
                              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">
                                {entry.standardStrengths[0] || 'Standard'}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Strength / Dosage:
                      </label>
                      <input
                        type="text"
                        value={customStrength}
                        onChange={(e) => setCustomStrength(e.target.value)}
                        placeholder="e.g. 625mg, 40mg, 500mg"
                        className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Popular Quick Suggestions Pills */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Quick Pharmacopeia Matches:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Augmentin 625', 'Dolo 650', 'Pan 40', 'Azithral 500', 'Montair-LC', 'Telma 40', 'Cifran 500', 'Metformin 500'].map(
                        (pill) => (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => {
                              setSearchQuery(pill);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                          >
                            + {pill}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200">
                    <button
                      type="button"
                      onClick={() => setActiveManualIndex(null)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!searchQuery.trim()}
                      onClick={() => handleCustomManualSubmit(medIndex)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Save & Explain Medicine</span>
                    </button>
                  </div>
                </div>
              )}

              {/* POST-VERIFICATION CLINICAL EXPLANATION BOX */}
              {isJustExplained && (
                <div className="p-4 rounded-2xl bg-white border-2 border-emerald-400/80 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2 border-b border-emerald-100 pb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                          Verified & Explained: {med.name}
                        </h4>
                        <p className="text-[11px] text-emerald-700 font-medium">
                          Active Generic Salt: {med.genericName}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      Human Verified (Site Trained)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        What It Treats & Why Prescribed:
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {med.purposeAndUsage || 'Clinical therapeutic treatment prescribed for your condition.'}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        How to Take Safely:
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {med.howToTake || med.mealRelationText || 'Take as scheduled with water.'}
                      </p>
                    </div>
                  </div>

                  {med.precautions && med.precautions.length > 0 && (
                    <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                      <div className="font-bold flex items-center gap-1 text-amber-950">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        Important Precautions:
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-amber-900 space-y-0.5">
                        {med.precautions.slice(0, 2).map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
