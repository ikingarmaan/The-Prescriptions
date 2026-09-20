import React, { useState } from 'react';
import {
  Printer,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  HeartPulse,
  Share2,
  Check,
  Stethoscope,
  Info,
  Calendar,
  Apple,
  Ban,
  Droplets,
  GlassWater,
  Download,
} from 'lucide-react';
import { PrescriptionAnalysisResult } from '../types';
import { PrescriptionMasterBox } from './PrescriptionMasterBox';
import { LabTestsSection } from './LabTestsSection';
import { MedicineCard } from './MedicineCard';
import { DailyScheduleTimeline } from './DailyScheduleTimeline';
import { MultiEngineConsensusCard } from './MultiEngineConsensusCard';
import { HumanInTheLoopVerificationCard } from './HumanInTheLoopVerificationCard';
import { MedicineDetail } from '../types';
import { generateAndDownloadMedicationCardPdf } from '../utils/cardDownload';

interface PrescriptionResultViewProps {
  result: PrescriptionAnalysisResult;
  onReset: () => void;
  onOpenPrintModal: () => void;
  onConfirmOrEditMedicine?: (
    index: number,
    newName: string,
    newGeneric?: string,
    extraExplanation?: Partial<MedicineDetail>
  ) => void;
}

export const PrescriptionResultView: React.FC<PrescriptionResultViewProps> = ({
  result,
  onReset,
  onOpenPrintModal,
  onConfirmOrEditMedicine,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleDownloadCard = () => {
    generateAndDownloadMedicationCardPdf(result);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleCopySummary = () => {
    const text = `Prescription Medicine Summary (${result.suspectedCondition || 'Doctor Regimen'}):
${result.medicines
  .map(
    (m, i) =>
      `${i + 1}. ${m.name} (${m.genericName}) - ${m.dosage}, ${m.frequency} [${m.mealRelationText}]`
  )
  .join('\n')}

Daily Routine:
- Morning: ${result.scheduleSummary?.morning?.join(', ') || 'None'}
- Afternoon: ${result.scheduleSummary?.afternoon?.join(', ') || 'None'}
- Evening: ${result.scheduleSummary?.evening?.join(', ') || 'None'}
- Bedtime: ${result.scheduleSummary?.bedtime?.join(', ') || 'None'}
- As Needed: ${result.scheduleSummary?.asNeeded?.join(', ') || 'None'}

${
  result.labTests && result.labTests.length > 0
    ? `\nPrescribed Laboratory & Diagnostic Tests:\n${result.labTests
        .map((t, idx) => `${idx + 1}. ${t.testName} (${t.category}) - ${t.preparationInstructions}`)
        .join('\n')}`
    : ''
}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="prescription-result-container" className="w-full mx-auto space-y-6">
      {/* Overview Banner Card with Cool Emerald Theme */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 text-white relative overflow-hidden">
          {/* Subtle medical glow artwork */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-xs flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                  Prescription Deciphered Successfully
                </span>
                {result.doctorSpecialtyOrClinic && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-emerald-100 border border-white/10">
                    {result.doctorSpecialtyOrClinic}
                  </span>
                )}
                {result.prescriptionDate && result.prescriptionDate !== 'Not specified' && (
                  <span className="text-xs text-emerald-200/70 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {result.prescriptionDate}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {result.suspectedCondition || 'Prescription Analysis & Medicine Guide'}
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                {result.generalExplanation}
              </p>
            </div>

            {/* Quick Actions (Thumb-Friendly on Mobile, clean 2x2 grid on Laptop) */}
            <div className="grid grid-cols-2 gap-2 shrink-0 w-full md:w-72">
              <button
                id="print-summary-card-btn"
                type="button"
                onClick={onOpenPrintModal}
                className="px-3.5 py-2.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 text-xs font-extrabold rounded-xl shadow-md shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                title="Open printable card & print settings"
              >
                <Printer className="w-4 h-4" />
                <span>Print Card</span>
              </button>

              <button
                id="quick-download-card-btn"
                type="button"
                onClick={handleDownloadCard}
                className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold rounded-xl border border-emerald-500/40 shadow-sm transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                title="Download official medication schedule card as PDF document"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>PDF Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopySummary}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/15 transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>

              <button
                id="analyze-another-btn"
                type="button"
                onClick={onReset}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white text-xs font-semibold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Slip</span>
              </button>
            </div>
          </div>
        </div>

        {/* Prescription Metadata Badges */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span>
              Total Medicines: <strong className="text-slate-900">{result.medicines.length}</strong>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span>
              Lab Tests Advised: <strong className="text-slate-900">{result.labTests?.length || 0}</strong>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span>
              Duration: <strong className="text-slate-900">{result.medicines[0]?.duration || 'As directed'}</strong>
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 shrink-0" /> 5-Stage Clinical Decryption & Accuracy Verification
          </span>
        </div>
      </div>

      {/* Ambiguity or Faint Handwriting Alert (if any) */}
      {result.unclearOrAmbiguousNotes && result.unclearOrAmbiguousNotes.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs md:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">
              Apologies, we didn't understand some parts of the handwriting:
            </span>
            <ul className="space-y-1 text-xs">
              {result.unclearOrAmbiguousNotes.map((note, idx) => {
                const cleanNote = note
                  .replace(/unidentified medication\s*(\(requires pharmacist verification\))?/gi, "Apologies, we didn't understand this medicine")
                  .replace(/requires pharmacist verification/gi, "please verify or type manually");
                return (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span>•</span>
                    <span>{cleanNote}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* 5-MODEL MULTI-ENGINE HANDWRITING OCR CONSENSUS CARD */}
      {result.multiEngineEnsemble && (
        <MultiEngineConsensusCard ensemble={result.multiEngineEnsemble} />
      )}

      {/* HUMAN-IN-THE-LOOP SAFETY VERIFICATION PROTOCOL */}
      {onConfirmOrEditMedicine && (
        <HumanInTheLoopVerificationCard
          medicines={result.medicines}
          onConfirmOrUpdateMedicine={onConfirmOrEditMedicine}
        />
      )}

      {/* MASTER BOX: ALL PRESCRIBED MEDICINES */}
      <PrescriptionMasterBox
        medicines={result.medicines}
        chronologicalPlan={result.chronologicalTakingPlan}
        suspectedCondition={result.suspectedCondition}
      />

      {/* LABORATORY & DIAGNOSTIC TESTS SECTION (User Request 3) */}
      <LabTestsSection
        labTests={result.labTests}
        suspectedCondition={result.suspectedCondition}
      />

      {/* Critical Spacing & Interaction Advice - Crimson & Coral Warning Theme */}
      {result.potentialInteractionsOrSpacingAdvice && result.potentialInteractionsOrSpacingAdvice.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-rose-500/40 shadow-sm overflow-hidden transition-colors">
          <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-rose-950 to-red-950 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-rose-300" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-400/30 uppercase tracking-wider mb-1">
                  Safety Critical
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Important Medicine Timing & Spacing Instructions
                </h3>
                <p className="text-xs text-rose-200/80">
                  Required intervals between medicines or foods to prevent dangerous absorption blocks:
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-2.5">
            {result.potentialInteractionsOrSpacingAdvice.map((rule, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                <span className="leading-relaxed font-semibold">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Dosage Schedule Timeline */}
      <DailyScheduleTimeline
        medicines={result.medicines}
        scheduleSummary={result.scheduleSummary}
      />

      {/* Food, Dietary & Hydration Rules - Lush Mint & Sage Wellness Theme */}
      {result.foodAndDietaryRules && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-500/40 shadow-sm overflow-hidden transition-colors">
          <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
                <Apple className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-400/30 uppercase tracking-wider mb-1">
                  Metabolic & Dietary
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Nutritional & Dietary Guidelines for This Regimen
                </h3>
                <p className="text-xs text-teal-100/80">
                  Foods and fluids that enhance medication bioavailability and protect organ health.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Foods to Eat */}
              {result.foodAndDietaryRules.foodsToEat && result.foodAndDietaryRules.foodsToEat.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <Apple className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Recommended Foods To Eat
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {result.foodAndDietaryRules.foodsToEat.map((food, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Foods to Avoid */}
              {result.foodAndDietaryRules.foodsToAvoid && result.foodAndDietaryRules.foodsToAvoid.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    Foods & Substances to Avoid
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {result.foodAndDietaryRules.foodsToAvoid.map((food, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Hydration & Water Intake */}
            {result.foodAndDietaryRules.hydrationAndFluids && (
              <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/40 flex items-start gap-3 text-xs text-teal-950 dark:text-teal-200">
                <GlassWater className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-teal-900 dark:text-teal-300 mb-0.5">
                    Circadian Hydration Strategy
                  </h4>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    {result.foodAndDietaryRules.hydrationAndFluids}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* All Medicines Detailed Breakdown */}
      <div className="space-y-4">
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30 uppercase tracking-wider mb-1">
                Deep Pharmacology
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight">
                Individual Medicine Pharmacological Profiles ({result.medicines.length})
              </h3>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Complete clinical reference cards detailing indications, side effects, precautions, and emergency doctor contact flags.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {result.medicines.map((med, idx) => (
            <MedicineCard
              key={idx}
              medicine={med}
              index={idx}
              onConfirmOrEdit={onConfirmOrEditMedicine}
            />
          ))}
        </div>
      </div>

      {/* Lifestyle & Home Care Advice - Turquoise & Aqua Recovery Theme */}
      {result.lifestyleAdvice && result.lifestyleAdvice.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-teal-500/40 shadow-sm overflow-hidden transition-colors">
          <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-cyan-950 to-teal-950 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/30 uppercase tracking-wider mb-1">
                  Supportive Care
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Recovery & Supportive Clinical Care Advice
                </h3>
                <p className="text-xs text-cyan-100/80">
                  Complementary lifestyle recommendations to support rapid medical recovery:
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.lifestyleAdvice.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-teal-100 dark:border-teal-900/40 hover:border-teal-200 dark:hover:border-teal-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-semibold transition-colors"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Official Medical Disclaimer */}
      <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3 transition-colors">
        <Info className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Medical Disclaimer</span>
          <p className="leading-relaxed">
            {result.medicalDisclaimer ||
              'This prescription review is generated to help you understand your medications and their general administration guidelines. It does not replace clinical consultation. Always double-check dosage and instructions with your dispensing pharmacist or treating doctor.'}
          </p>
        </div>
      </div>
    </div>
  );
};
