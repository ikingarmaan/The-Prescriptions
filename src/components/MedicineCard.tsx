import React, { useState } from 'react';
import {
  Pill,
  Clock,
  Utensils,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Sparkles,
  Check,
  Edit3,
  Building2,
  FlaskConical,
  ArrowLeftRight,
} from 'lucide-react';
import { MedicineDetail, MealRelation } from '../types';
import {
  saveLearnedCorrection,
  getClinicalExplanationForMedicine,
} from '../utils/hitlLearningEngine';
import { crossReferenceMedicine } from '../data/medicineCatalog';

interface MedicineCardProps {
  medicine: MedicineDetail;
  index: number;
  onConfirmOrEdit?: (
    index: number,
    newName: string,
    newGeneric?: string,
    extraExplanation?: Partial<MedicineDetail>
  ) => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  index,
  onConfirmOrEdit,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showEditPanel, setShowEditPanel] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(medicine.name);
  const [editGeneric, setEditGeneric] = useState<string>(medicine.genericName);

  const getMealBadge = (mealRelation: MealRelation, text: string) => {
    switch (mealRelation) {
      case 'empty_stomach':
      case 'before_meal':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
          dot: 'bg-amber-500',
          label: 'Empty Stomach / Before Meals (AC)',
          tip: text || 'Take 30–60 minutes before meals with plain water',
        };
      case 'after_meal':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
          dot: 'bg-emerald-600',
          label: 'After Food (PC)',
          tip: text || 'Take with or immediately after food to prevent gastric irritation',
        };
      case 'with_meal':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
          dot: 'bg-blue-600',
          label: 'With Meals',
          tip: text || 'Take together during your meal',
        };
      case 'anytime':
      default:
        return {
          bg: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700',
          dot: 'bg-slate-500',
          label: 'With or Without Food',
          tip: text || 'Can be taken at your scheduled time regardless of meals',
        };
    }
  };

  const mealInfo = getMealBadge(medicine.mealRelation, medicine.mealRelationText);

  // Two-way Generic & Company Brand Resolution
  const crossRef = crossReferenceMedicine(medicine.name, medicine.genericName);
  const isPrescribedAsBrand = (medicine.prescribedAs || crossRef.prescribedAs) === 'brand';
  const companyName = medicine.companyName || crossRef.companyName;
  const activeSalt = medicine.activeGenericSalt || crossRef.activeGenericSalt || medicine.genericName;
  const popularBrands = (medicine.popularCompanyBrands && medicine.popularCompanyBrands.length > 0)
    ? medicine.popularCompanyBrands
    : crossRef.popularCompanyBrands;

  const isUnableToUnderstand =
    medicine.name.toLowerCase().includes('apologies') ||
    medicine.name.toLowerCase().includes('unidentified') ||
    medicine.name.toLowerCase().includes('pharmacist') ||
    medicine.name.toLowerCase().includes('unclear');

  const cardThemes = [
    'from-blue-600 via-indigo-600 to-sky-500',
    'from-emerald-600 via-teal-600 to-emerald-400',
    'from-purple-600 via-violet-600 to-purple-400',
    'from-amber-600 via-orange-600 to-amber-400',
    'from-rose-600 via-pink-600 to-red-500',
  ];
  const themeGradient = cardThemes[index % cardThemes.length];

  return (
    <div
      id={`medicine-card-${index}`}
      className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      {/* Dynamic top chromatic stripe */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${themeGradient}`} />

      {/* Primary Card Header */}
      <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800/80 bg-linear-to-r from-slate-50/80 via-white to-slate-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950/80">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r ${themeGradient} text-white shadow-2xs`}>
                #{index + 1}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {medicine.name}
              </h3>
              {medicine.strength && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {medicine.strength}
                </span>
              )}
              {medicine.form && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                  <Pill className="w-3 h-3" />
                  {medicine.form}
                </span>
              )}

              {/* Confidence Badge */}
              {medicine.nlpResolution && (
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                    medicine.nlpResolution.confidenceLevel === 'high'
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60'
                      : medicine.nlpResolution.confidenceLevel === 'medium'
                      ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800/60'
                      : 'bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-800/60'
                  }`}
                >
                  {medicine.nlpResolution.confidenceLevel === 'high' ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  ) : medicine.nlpResolution.confidenceLevel === 'medium' ? (
                    <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                  )}
                  <span>
                    Confidence: {medicine.nlpResolution.confidenceScore}%
                  </span>
                </span>
              )}

              {medicine.nlpResolution?.userConfirmed && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-700 dark:text-emerald-400" /> Confirmed
                </span>
              )}
            </div>

            {/* Two-Way Generic & Company Brand Identity Box or Polite Apologies Banner */}
            {isUnableToUnderstand ? (
              <div className="mt-2.5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-950 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Apologies, we didn't understand this medicine</span>
                </div>
                <p className="text-[11px] text-amber-800 dark:text-amber-300/90 leading-relaxed">
                  Doctor's handwriting on this prescription line was unclear or faint. Please use the verification box at the top of the page to confirm or manually type the medicine name.
                </p>
              </div>
            ) : (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-xs space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {isPrescribedAsBrand ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        <Building2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        Company Brand
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[11px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <FlaskConical className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        Generic Molecule
                      </span>
                    )}

                    {companyName && (
                      <span className="text-[11px] text-slate-600 dark:text-slate-400">
                        Mfg by: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{companyName}</strong>
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                    <ArrowLeftRight className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500" />
                    Generic ⇄ Brand Cross-Referenced
                  </span>
                </div>

                {/* Active generic salt */}
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">Active Generic Salt:</span>
                  <span className="text-slate-900 dark:text-slate-100 font-semibold text-xs sm:text-[13px] bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 shadow-2xs">
                    {activeSalt}
                  </span>
                </div>

                {/* Popular Company / Brand Equivalents */}
                {popularBrands && popularBrands.length > 0 && (
                  <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                      {isPrescribedAsBrand
                        ? 'Other Leading Company Brands with this Salt:'
                        : 'Popular Company Brand Names in Pharmacies:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {popularBrands.slice(0, 5).map((b, bIdx) => (
                        <span
                          key={bIdx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                        >
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{b.brandName}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">({b.companyName})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Timing, Meal Badges and Review Button */}
          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${mealInfo.bg}`}
              >
                <span className={`w-2 h-2 rounded-full ${mealInfo.dot}`} />
                {mealInfo.label}
              </div>

              {onConfirmOrEdit && (
                <button
                  type="button"
                  onClick={() => setShowEditPanel(!showEditPanel)}
                  className="px-2 py-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-md transition-all flex items-center gap-1 cursor-pointer"
                  title="Verify or adjust detected medicine"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{showEditPanel ? 'Close' : 'Confirm / Edit'}</span>
                </button>
              )}
            </div>

            {medicine.duration && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                <Calendar className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                Duration: {medicine.duration}
              </span>
            )}
          </div>
        </div>

        {/* Quick Schedule Row */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Dose: <strong>{medicine.dosage}</strong></span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>Frequency: <strong>{medicine.frequency}</strong></span>
            </div>

            {medicine.timingCode && (
              <span className="px-2 py-0.5 font-mono text-[11px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Code: {medicine.timingCode}
              </span>
            )}
          </div>

          {/* Time of day badges */}
          <div className="flex items-center gap-1">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                medicine.scheduleTimes.morning
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-300 dark:text-slate-600'
              }`}
            >
              Morning
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                medicine.scheduleTimes.afternoon
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-300 dark:text-slate-600'
              }`}
            >
              Afternoon
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                medicine.scheduleTimes.evening
                  ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-300 dark:text-slate-600'
              }`}
            >
              Evening
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                medicine.scheduleTimes.bedtime
                  ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-300 dark:text-slate-600'
              }`}
            >
              Bedtime
            </span>
            {medicine.scheduleTimes.asNeeded && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                As Needed (SOS)
              </span>
            )}
          </div>
        </div>

        {/* Interactive Smart NLP Verification & Edit Panel */}
        {showEditPanel && onConfirmOrEdit && (
          <div className="mt-4 pt-3.5 border-t border-indigo-100 dark:border-indigo-950/80 bg-indigo-50/50 dark:bg-indigo-950/30 -mx-5 -mb-5 md:-mx-6 md:-mb-6 p-4 md:p-5 rounded-b-none border-b border-indigo-200/80 dark:border-indigo-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Confirm or Adjust Medicine Details
              </span>
              <button
                type="button"
                onClick={() => setShowEditPanel(false)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Quick RapidFuzz Candidate suggestions if available */}
            {medicine.nlpResolution?.alternativeCandidates && medicine.nlpResolution.alternativeCandidates.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block">
                  RapidFuzz Matched Candidates from Pharmacopeia:
                </span>
                <div className="flex flex-wrap gap-2">
                  {medicine.nlpResolution.alternativeCandidates.map((cand, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => {
                        const rawToken = medicine.nlpResolution?.originalRawToken || medicine.name;
                        saveLearnedCorrection(rawToken, cand.brandName, cand.genericName);
                        const explanation = getClinicalExplanationForMedicine(cand.brandName, cand.genericName);
                        onConfirmOrEdit(index, cand.brandName, cand.genericName, explanation);
                        setEditName(cand.brandName);
                        setEditGeneric(cand.genericName);
                        setShowEditPanel(false);
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-indigo-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span className="font-bold text-slate-800 dark:text-slate-100">{cand.brandName}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">({cand.similarityScore}%)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Manual input edit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Active Generic Salt
                </label>
                <input
                  type="text"
                  value={editGeneric}
                  onChange={(e) => setEditGeneric(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  const rawToken = medicine.nlpResolution?.originalRawToken || medicine.name;
                  saveLearnedCorrection(rawToken, medicine.name, medicine.genericName);
                  const explanation = getClinicalExplanationForMedicine(medicine.name, medicine.genericName);
                  onConfirmOrEdit(index, medicine.name, medicine.genericName, explanation);
                  setShowEditPanel(false);
                }}
                className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm Current Name</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (editName.trim()) {
                    const rawToken = medicine.nlpResolution?.originalRawToken || medicine.name;
                    saveLearnedCorrection(rawToken, editName.trim(), editGeneric.trim() || undefined);
                    const explanation = getClinicalExplanationForMedicine(editName.trim(), editGeneric.trim());
                    onConfirmOrEdit(index, editName.trim(), editGeneric.trim() || undefined, explanation);
                    setShowEditPanel(false);
                  }
                }}
                className="px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-xs cursor-pointer"
              >
                Save Custom Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Body */}
      <div className="p-5 md:p-6 space-y-5 text-slate-700 dark:text-slate-300 text-sm">
        {/* Purpose & Therapeutic Usage (What is this medicine for?) */}
        <div className="bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900/40">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 dark:text-emerald-300 mb-1">
                What This Medicine Is Used For
              </h4>
              <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                {medicine.purposeAndUsage}
              </p>
            </div>
          </div>
        </div>

        {/* Administration: How to Take & Food Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider mb-2">
              <Utensils className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Meal & Food Instructions
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {medicine.mealRelationText}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              How To Take Correctly
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {medicine.howToTake}
            </p>
          </div>
        </div>

        {/* Collapsible Details: Precautions, Side Effects & When to alert doctor */}
        <div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full py-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors border-t border-slate-100 dark:border-slate-800 pt-3"
          >
            <span>Safety Guidelines & Side Effects</span>
            <span className="flex items-center gap-1 text-[11px] font-normal text-slate-400 dark:text-slate-500 lowercase">
              {isExpanded ? 'collapse' : 'view details'}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {isExpanded && (
            <div className="pt-3 space-y-4">
              {/* Precautions */}
              {medicine.precautions && medicine.precautions.length > 0 && (
                <div>
                  <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Important Precautions & Warnings
                  </h5>
                  <ul className="space-y-1.5 pl-1">
                    {medicine.precautions.map((prec, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span>{prec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Side Effects */}
              {medicine.commonSideEffects && medicine.commonSideEffects.length > 0 && (
                <div>
                  <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    Common Side Effects to Expect
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {medicine.commonSideEffects.map((effect, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 font-medium"
                      >
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* When to contact doctor */}
              {medicine.whenToContactDoctor && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                  <PhoneCall className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Contact Doctor If: </span>
                    <span>{medicine.whenToContactDoctor}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
