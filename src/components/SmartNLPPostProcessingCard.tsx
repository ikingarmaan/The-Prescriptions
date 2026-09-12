import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Search,
  Pill,
  Check,
  Edit2,
  HelpCircle,
  RefreshCw,
  Cpu,
} from 'lucide-react';
import { MedicineDetail, SmartNLPSummary } from '../types';

interface SmartNLPPostProcessingCardProps {
  medicines: MedicineDetail[];
  summary?: SmartNLPSummary;
  onConfirmOrEditMedicine?: (
    index: number,
    newName: string,
    newGeneric?: string
  ) => void;
}

export const SmartNLPPostProcessingCard: React.FC<
  SmartNLPPostProcessingCardProps
> = ({ medicines, summary, onConfirmOrEditMedicine }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [customNameInput, setCustomNameInput] = useState<string>('');
  const [customGenericInput, setCustomGenericInput] = useState<string>('');

  const handleStartEdit = (index: number, med: MedicineDetail) => {
    setEditingIndex(index);
    setCustomNameInput(med.name);
    setCustomGenericInput(med.genericName);
  };

  const handleSaveEdit = (index: number) => {
    if (customNameInput.trim() && onConfirmOrEditMedicine) {
      onConfirmOrEditMedicine(
        index,
        customNameInput.trim(),
        customGenericInput.trim() || undefined
      );
    }
    setEditingIndex(null);
  };

  const handlePickCandidate = (
    index: number,
    candidateName: string,
    candidateGeneric: string
  ) => {
    if (onConfirmOrEditMedicine) {
      onConfirmOrEditMedicine(index, candidateName, candidateGeneric);
    }
    setEditingIndex(null);
  };

  const handleConfirmDirect = (index: number, med: MedicineDetail) => {
    if (onConfirmOrEditMedicine) {
      onConfirmOrEditMedicine(index, med.name, med.genericName);
    }
  };

  // Metrics calculation
  const total = medicines.length;
  const highCount =
    summary?.highConfidenceCount ??
    medicines.filter((m) => m.nlpResolution?.confidenceLevel === 'high').length;
  const medCount =
    summary?.mediumConfidenceCount ??
    medicines.filter((m) => m.nlpResolution?.confidenceLevel === 'medium').length;
  const lowCount =
    summary?.lowConfidenceCount ??
    medicines.filter((m) => m.nlpResolution?.confidenceLevel === 'low').length;
  const correctedCount =
    summary?.spellingsCorrectedCount ??
    medicines.filter((m) => m.nlpResolution?.spellingCorrected).length;
  const mappedCount =
    summary?.brandsMappedCount ??
    medicines.filter((m) => m.nlpResolution?.brandToGenericMapped).length;

  const requiresAction = lowCount > 0 || medCount > 0;

  return (
    <div
      id="smart-nlp-post-processing-suite"
      className="bg-white rounded-2xl border-2 border-indigo-200/90 shadow-sm overflow-hidden transition-all"
    >
      {/* Chromatic Top Accent Stripe */}
      <div className="h-1.5 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-500" />

      {/* Main Section Header */}
      <div className="p-5 md:p-6 bg-linear-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                <Cpu className="w-3.5 h-3.5 text-indigo-300" />
                Smart NLP Post-Processing Layer
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                RapidFuzz Active
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Brand → Generic Pharmacopeia
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Handwriting Recovery & Clinical NLP Verification
            </h3>
            <p className="text-xs md:text-sm text-indigo-100/80 max-w-3xl leading-relaxed">
              Messy OCR handwriting is cross-referenced using RapidFuzz string
              metrics, medical spell-checking, abbreviation expansion, and
              instant brand-to-generic chemical salt mapping.
            </p>
          </div>

          {/* Verification Status Pill */}
          <div className="shrink-0 flex items-center gap-3">
            <div
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                requiresAction
                  ? 'bg-amber-500/20 border-amber-400/40 text-amber-200'
                  : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200'
              }`}
            >
              {requiresAction ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-300" />
                  <span>Review & Confirmation Recommended</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>All Medicines Pharmacopeia Verified</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* NLP Metric Counters */}
        <div className="mt-5 pt-4 border-t border-indigo-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-indigo-900/40 border border-indigo-700/50 rounded-xl p-2.5">
            <div className="text-lg md:text-xl font-black text-white">
              {total}
            </div>
            <div className="text-[11px] font-medium text-indigo-200">
              Medicines Scanned
            </div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-700/50 rounded-xl p-2.5">
            <div className="text-lg md:text-xl font-black text-emerald-300">
              {highCount}
            </div>
            <div className="text-[11px] font-medium text-emerald-200">
              High Confidence (≥88%)
            </div>
          </div>

          <div className="bg-amber-950/40 border border-amber-700/50 rounded-xl p-2.5">
            <div className="text-lg md:text-xl font-black text-amber-300">
              {correctedCount}
            </div>
            <div className="text-[11px] font-medium text-amber-200">
              Spellings Corrected
            </div>
          </div>

          <div className="bg-purple-950/40 border border-purple-700/50 rounded-xl p-2.5">
            <div className="text-lg md:text-xl font-black text-purple-300">
              {mappedCount}
            </div>
            <div className="text-[11px] font-medium text-purple-200">
              Brand → Generic Salts
            </div>
          </div>
        </div>
      </div>

      {/* Action Banner if Confirmation Needed */}
      {requiresAction && (
        <div className="p-4 bg-amber-50 border-b border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900 text-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <strong className="font-semibold block sm:inline">
                Action Recommended:
              </strong>{' '}
              Certain handwriting tokens had ambiguous strokes. Check the
              recovered names below and tap <strong>Confirm</strong> or select a
              candidate to ensure exact safety.
            </div>
          </div>
        </div>
      )}

      {/* Detailed Medicine-by-Medicine NLP Recovery List */}
      <div className="p-5 md:p-6 space-y-4 bg-slate-50/50">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>NLP Decrypted Medicine Registry</span>
          <span className="text-[11px] font-normal text-slate-400">
            Interactive verification enabled
          </span>
        </div>

        <div className="space-y-3">
          {medicines.map((med, index) => {
            const nlp = med.nlpResolution;
            const isEditing = editingIndex === index;
            const isConfirmed = nlp?.userConfirmed;
            const score = nlp?.confidenceScore ?? 95;
            const confLevel = nlp?.confidenceLevel ?? 'high';

            const scoreBadge =
              confLevel === 'high'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : confLevel === 'medium'
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-rose-50 text-rose-900 border-rose-300';

            return (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all bg-white ${
                  confLevel === 'low'
                    ? 'border-rose-300 ring-2 ring-rose-100'
                    : confLevel === 'medium'
                    ? 'border-amber-200 ring-2 ring-amber-50'
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  {/* Left info: Raw token -> Recovered Name -> Generic */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        #{index + 1}
                      </span>

                      {/* Recovered Medicine Name */}
                      <span className="text-base font-bold text-slate-900 tracking-tight">
                        {med.name}
                      </span>

                      {med.strength && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {med.strength}
                        </span>
                      )}

                      {/* Confidence pill */}
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${scoreBadge}`}
                      >
                        {confLevel === 'high' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : confLevel === 'medium' ? (
                          <Sparkles className="w-3 h-3 text-amber-600" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                        )}
                        <span>
                          {confLevel.toUpperCase()} ({score}%)
                        </span>
                      </span>

                      {/* User Confirmed Badge */}
                      {isConfirmed && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-700" />
                          Confirmed by You
                        </span>
                      )}
                    </div>

                    {/* Spelling correction alert / trail */}
                    {nlp?.spellingCorrected && (
                      <div className="text-xs text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1.5 flex-wrap">
                        <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>
                          Spelling Recovered from messy OCR token:{' '}
                          <code className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-mono text-[11px]">
                            {nlp.originalSpelling || nlp.originalRawToken}
                          </code>{' '}
                          →{' '}
                          <strong className="text-slate-900">
                            {nlp.matchedBrandOrDrug}
                          </strong>
                        </span>
                      </div>
                    )}

                    {/* Brand to Generic Active Salt */}
                    <p className="text-xs text-slate-600">
                      <span className="text-indigo-600 font-semibold">
                        Active Generic Salt:{' '}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {med.genericName}
                      </span>
                    </p>
                  </div>

                  {/* Right Action buttons */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0">
                    {!isConfirmed && (
                      <button
                        type="button"
                        onClick={() => handleConfirmDirect(index, med)}
                        className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                        title="Confirm this detected medicine is accurate"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Confirm</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        isEditing
                          ? setEditingIndex(null)
                          : handleStartEdit(index, med)
                      }
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{isEditing ? 'Cancel' : 'Change / Edit'}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Edit & Alternative Candidates Panel */}
                {isEditing && (
                  <div className="mt-4 pt-3.5 border-t border-slate-200 space-y-3 bg-slate-50 -mx-4 -mb-4 p-4 rounded-b-xl">
                    <div className="text-xs font-bold text-slate-700">
                      Select a RapidFuzz Alternative or Enter Exact Medicine
                      Name:
                    </div>

                    {/* Alternative Candidates generated by RapidFuzz */}
                    {nlp?.alternativeCandidates &&
                      nlp.alternativeCandidates.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-semibold text-slate-500 block">
                            Top RapidFuzz Dictionary Matches:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {nlp.alternativeCandidates.map((cand, cIdx) => (
                              <button
                                key={cIdx}
                                type="button"
                                onClick={() =>
                                  handlePickCandidate(
                                    index,
                                    cand.brandName,
                                    cand.genericName
                                  )
                                }
                                className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 text-left transition-all flex items-center gap-2 group cursor-pointer shadow-2xs"
                              >
                                <div>
                                  <div className="font-bold text-slate-800 group-hover:text-indigo-900">
                                    {cand.brandName}
                                  </div>
                                  <div className="text-[10px] text-slate-500">
                                    {cand.genericName}
                                  </div>
                                </div>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                                  {cand.similarityScore}%
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Manual name input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Medicine Brand Name
                        </label>
                        <input
                          type="text"
                          value={customNameInput}
                          onChange={(e) => setCustomNameInput(e.target.value)}
                          placeholder="e.g., Augmentin 625"
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Generic Active Salt
                        </label>
                        <input
                          type="text"
                          value={customGenericInput}
                          onChange={(e) => setCustomGenericInput(e.target.value)}
                          placeholder="e.g., Amoxicillin + Clavulanic Acid"
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingIndex(null)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(index)}
                        className="px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-xs cursor-pointer"
                      >
                        Save & Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
