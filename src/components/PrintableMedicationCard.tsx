import React, { useState } from 'react';
import {
  Printer,
  X,
  ShieldAlert,
  CheckCircle,
  Download,
  FileText,
  Check,
  Clock,
  Sun,
  CloudSun,
  Sunset,
  Moon,
  AlertCircle,
  Apple,
  Ban,
  Droplets,
  HeartPulse,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';
import { PrescriptionAnalysisResult } from '../types';
import {
  generateAndDownloadMedicationCardPdf,
  generateMedicationCardText,
  downloadFile,
} from '../utils/cardDownload';

interface PrintableMedicationCardProps {
  prescription: PrescriptionAnalysisResult;
  onClose: () => void;
}

export const PrintableMedicationCard: React.FC<PrintableMedicationCardProps> = ({
  prescription,
  onClose,
}) => {
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    generateAndDownloadMedicationCardPdf(prescription);
    setDownloadedFormat('pdf');
    setTimeout(() => setDownloadedFormat(null), 3000);
  };

  const handleDownloadTxt = () => {
    const textContent = generateMedicationCardText(prescription);
    const filename = `medication-schedule-${new Date().toISOString().slice(0, 10)}.txt`;
    downloadFile(textContent, filename, 'text/plain;charset=utf-8');
    setDownloadedFormat('txt');
    setTimeout(() => setDownloadedFormat(null), 3000);
  };

  return (
    <div
      id="printable-med-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 dark:bg-slate-950/85 backdrop-blur-xs p-2 sm:p-6 flex items-center justify-center print:p-0 print:static print:bg-white"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden print:border-none print:shadow-none print:max-w-none my-auto">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 print:hidden gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
            <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate">
              Printable Medication Guide
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2 shrink-0">
            {/* Download PDF Card Button */}
            <button
              id="download-pdf-card-btn"
              type="button"
              onClick={handleDownloadPdf}
              className="px-3 sm:px-3.5 py-2 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 active:bg-slate-950 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs min-h-[40px] cursor-pointer"
              title="Download official medication card as PDF format"
            >
              {downloadedFormat === 'pdf' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download Card (PDF)</span>
                </>
              )}
            </button>

            {/* Download TXT Summary Button */}
            <button
              id="download-txt-card-btn"
              type="button"
              onClick={handleDownloadTxt}
              className="px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5 min-h-[40px] cursor-pointer"
              title="Download plain text schedule for notes/messages"
            >
              {downloadedFormat === 'txt' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Text Saved!</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Download .TXT</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              id="trigger-print-btn"
              type="button"
              onClick={handlePrint}
              className="px-3.5 sm:px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs min-h-[40px] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Document */}
        <div className="p-4 sm:p-8 md:p-10 space-y-6 text-slate-900 print:p-0">
          {/* 1. Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-serif font-black text-emerald-700">℞</span>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                  Theprescription Official Patient Medication Schedule &amp; Guide
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Prescription Medicines &amp; Daily Schedule
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Comprehensive reference for safe dosage, administration timing, food rules, lab tests, and recovery guidelines.
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-slate-600 space-y-0.5 shrink-0 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
              <p className="font-bold text-slate-900 text-sm">
                {prescription.doctorSpecialtyOrClinic || 'Prescribed Clinical Regimen'}
              </p>
              {prescription.prescriptionDate && (
                <p>
                  <span className="text-slate-400">Prescription Date: </span>
                  <strong className="text-slate-700">{prescription.prescriptionDate}</strong>
                </p>
              )}
              <p>
                <span className="text-slate-400">Document Issued: </span>
                <span>{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </p>
            </div>
          </div>

          {/* Condition Overview */}
          {prescription.suspectedCondition && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-black text-slate-900 mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Primary Diagnosis / Indication: {prescription.suspectedCondition}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {prescription.generalExplanation}
              </p>
            </div>
          )}

          {/* 2. Master Table of Medicines */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Prescribed Medicines Master Inventory ({prescription.medicines.length})</span>
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">Verify with prescribing physician</span>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <th className="p-3">#</th>
                    <th className="p-3">Medicine &amp; Active Salt</th>
                    <th className="p-3">Dose &amp; Frequency</th>
                    <th className="p-3">When To Take (Food Rule)</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Purpose &amp; Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {prescription.medicines.map((med, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900 text-sm">{med.name}</div>
                        <div className="text-[11px] text-slate-600 font-medium">{med.genericName}</div>
                        {med.strength && (
                          <span className="inline-block mt-0.5 text-[10px] text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded font-semibold border border-slate-200">
                            {med.strength} {med.form ? `(${med.form})` : ''}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{med.dosage}</div>
                        <div className="text-[11px] text-slate-600">{med.frequency}</div>
                        {med.timingCode && (
                          <span className="inline-block mt-0.5 text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 font-semibold">
                            [{med.timingCode}]
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">
                          {med.mealRelationText}
                        </span>
                        {med.howToTake && (
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {med.howToTake}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-800 font-medium whitespace-nowrap">
                        {med.duration || 'As directed'}
                      </td>
                      <td className="p-3 text-slate-700 text-[11px] leading-relaxed max-w-xs">
                        <p className="font-medium text-slate-800">{med.purposeAndUsage}</p>
                        {med.precautions && med.precautions.length > 0 && (
                          <p className="text-[10px] text-amber-800 mt-1 bg-amber-50/80 p-1.5 rounded border border-amber-200/60">
                            ⚠️ {med.precautions[0]}
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Chronological Daily Dosage Routine / Time-Slot Schedule Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Daily Dosage Routine &amp; Patient Check-Off Tracker</span>
              </h2>
              <span className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-semibold border border-purple-100">
                Wall / Fridge Schedule
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {/* Morning Slot */}
              <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                <div className="flex items-center gap-1.5 pb-1 border-b border-amber-200/80">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <div>
                    <h3 className="font-bold text-xs text-amber-950">Morning</h3>
                    <p className="text-[10px] text-amber-700">7:00 AM – 9:00 AM</p>
                  </div>
                </div>
                <div className="space-y-1.5 min-h-[60px]">
                  {prescription.scheduleSummary.morning.length > 0 ? (
                    prescription.scheduleSummary.morning.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-800">
                        <span className="inline-block w-3.5 h-3.5 border border-amber-400 rounded bg-white shrink-0 mt-0.5" />
                        <span className="font-medium text-[11px] leading-tight">{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">No morning doses</p>
                  )}
                </div>
              </div>

              {/* Afternoon Slot */}
              <div className="p-3 rounded-xl border border-sky-200 bg-sky-50/40 space-y-2">
                <div className="flex items-center gap-1.5 pb-1 border-b border-sky-200/80">
                  <CloudSun className="w-4 h-4 text-sky-600" />
                  <div>
                    <h3 className="font-bold text-xs text-sky-950">Afternoon</h3>
                    <p className="text-[10px] text-sky-700">12:00 PM – 2:00 PM</p>
                  </div>
                </div>
                <div className="space-y-1.5 min-h-[60px]">
                  {prescription.scheduleSummary.afternoon.length > 0 ? (
                    prescription.scheduleSummary.afternoon.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-800">
                        <span className="inline-block w-3.5 h-3.5 border border-sky-400 rounded bg-white shrink-0 mt-0.5" />
                        <span className="font-medium text-[11px] leading-tight">{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">No afternoon doses</p>
                  )}
                </div>
              </div>

              {/* Evening Slot */}
              <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
                <div className="flex items-center gap-1.5 pb-1 border-b border-indigo-200/80">
                  <Sunset className="w-4 h-4 text-indigo-600" />
                  <div>
                    <h3 className="font-bold text-xs text-indigo-950">Evening / Dinner</h3>
                    <p className="text-[10px] text-indigo-700">6:00 PM – 8:00 PM</p>
                  </div>
                </div>
                <div className="space-y-1.5 min-h-[60px]">
                  {prescription.scheduleSummary.evening.length > 0 ? (
                    prescription.scheduleSummary.evening.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-800">
                        <span className="inline-block w-3.5 h-3.5 border border-indigo-400 rounded bg-white shrink-0 mt-0.5" />
                        <span className="font-medium text-[11px] leading-tight">{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">No evening doses</p>
                  )}
                </div>
              </div>

              {/* Bedtime Slot */}
              <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
                <div className="flex items-center gap-1.5 pb-1 border-b border-purple-200/80">
                  <Moon className="w-4 h-4 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-xs text-purple-950">Bedtime</h3>
                    <p className="text-[10px] text-purple-700">9:30 PM – 11:00 PM</p>
                  </div>
                </div>
                <div className="space-y-1.5 min-h-[60px]">
                  {prescription.scheduleSummary.bedtime.length > 0 ? (
                    prescription.scheduleSummary.bedtime.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-800">
                        <span className="inline-block w-3.5 h-3.5 border border-purple-400 rounded bg-white shrink-0 mt-0.5" />
                        <span className="font-medium text-[11px] leading-tight">{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">No bedtime doses</p>
                  )}
                </div>
              </div>

              {/* As Needed (SOS) Slot */}
              <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                <div className="flex items-center gap-1.5 pb-1 border-b border-rose-200/80">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <div>
                    <h3 className="font-bold text-xs text-rose-950">As Needed (SOS)</h3>
                    <p className="text-[10px] text-rose-700">Only if symptoms occur</p>
                  </div>
                </div>
                <div className="space-y-1.5 min-h-[60px]">
                  {prescription.scheduleSummary.asNeeded.length > 0 ? (
                    prescription.scheduleSummary.asNeeded.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-800">
                        <span className="inline-block w-3.5 h-3.5 border border-rose-400 rounded bg-white shrink-0 mt-0.5" />
                        <span className="font-medium text-[11px] leading-tight">{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">No SOS items</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Critical Timing & Drug Spacing Instructions */}
          {prescription.potentialInteractionsOrSpacingAdvice.length > 0 && (
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-xs">
              <h3 className="font-black text-amber-950 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Critical Timing, Interaction &amp; Spacing Rules
              </h3>
              <ul className="space-y-1 text-amber-900 pl-1">
                {prescription.potentialInteractionsOrSpacingAdvice.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-amber-600 shrink-0">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Ordered Diagnostic & Laboratory Tests (Adv / Inv) */}
          {prescription.labTests && prescription.labTests.length > 0 && (
            <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-indigo-950 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-indigo-700" />
                  <span>Prescribed Diagnostic &amp; Laboratory Investigations ({prescription.labTests.length})</span>
                </h3>
                <span className="text-[10px] font-bold text-indigo-700 uppercase bg-indigo-100 px-2 py-0.5 rounded">
                  Adv / Inv
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {prescription.labTests.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{t.testName}</span>
                        <span className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded font-semibold">
                          {t.category}
                        </span>
                        {t.fastingRequired && (
                          <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                            Fasting Required
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">{t.whyDoctorOrdered}</p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-[11px] font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 inline-block">
                        Prep: {t.preparationInstructions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Nutritional, Dietary & Hydration Guidelines */}
          {prescription.foodAndDietaryRules && (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 text-xs space-y-3">
              <h3 className="font-black text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                <Apple className="w-4 h-4 text-emerald-600" />
                Nutritional &amp; Dietary Guidelines During Treatment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Foods to Eat */}
                <div className="bg-white p-3 rounded-lg border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-1 text-emerald-800 font-bold text-[11px]">
                    <Apple className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Beneficial Foods to Consume</span>
                  </div>
                  <ul className="text-[11px] text-slate-700 space-y-0.5 pl-1">
                    {prescription.foodAndDietaryRules.foodsToEat.map((food, idx) => (
                      <li key={idx}>✓ {food}</li>
                    ))}
                  </ul>
                </div>

                {/* Foods to Avoid */}
                <div className="bg-white p-3 rounded-lg border border-rose-100 space-y-1">
                  <div className="flex items-center gap-1 text-rose-800 font-bold text-[11px]">
                    <Ban className="w-3.5 h-3.5 text-rose-600" />
                    <span>Foods &amp; Drinks to Avoid / Limit</span>
                  </div>
                  <ul className="text-[11px] text-slate-700 space-y-0.5 pl-1">
                    {prescription.foodAndDietaryRules.foodsToAvoidOrLimit.map((food, idx) => (
                      <li key={idx}>✕ {food}</li>
                    ))}
                  </ul>
                </div>

                {/* Hydration Guidance */}
                <div className="bg-white p-3 rounded-lg border border-cyan-100 space-y-1">
                  <div className="flex items-center gap-1 text-cyan-800 font-bold text-[11px]">
                    <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Fluid &amp; Hydration Strategy</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {prescription.foodAndDietaryRules.hydrationAdvice}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 7. Supportive Lifestyle & Recovery Care Advice */}
          {prescription.lifestyleAdvice && prescription.lifestyleAdvice.length > 0 && (
            <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 text-xs">
              <h3 className="font-black text-teal-950 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-teal-700" />
                Supportive Lifestyle, Activity &amp; Recovery Guidance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {prescription.lifestyleAdvice.map((advice, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-lg border border-teal-100 text-slate-800 text-[11px] flex items-start gap-1.5">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{advice}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. Red-Flag Warning Symptoms & Storage Advice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-1">
              <h4 className="font-black text-rose-950 flex items-center gap-1.5 text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                When to Contact Your Doctor Immediately (Red Flags)
              </h4>
              <p className="text-[11px] text-rose-900 leading-relaxed">
                Report sudden chest tightness, severe rash/hives, difficulty breathing, persistent vomiting, or unresolving high fever directly to emergency care or your prescribing physician.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <h4 className="font-black text-slate-900 text-xs">
                Safe Medication Storage &amp; Handling
              </h4>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Store all tablets and capsules in a cool, dry place away from direct sunlight and humidity. Keep liquid suspensions tightly capped. Keep all medications out of reach of children.
              </p>
            </div>
          </div>

          {/* 9. Sign-off / Clinical Stamp & Disclaimer */}
          <div className="pt-4 border-t-2 border-slate-200 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="border border-dashed border-slate-300 rounded-xl p-3 h-20 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Prescribing Doctor Signature</span>
                <div className="border-b border-slate-300 w-full" />
              </div>
              <div className="border border-dashed border-slate-300 rounded-xl p-3 h-20 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Dispensing Pharmacist Stamp</span>
                <div className="border-b border-slate-300 w-full" />
              </div>
              <div className="border border-dashed border-slate-300 rounded-xl p-3 h-20 flex flex-col justify-between col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Date of Dispensing</span>
                <span className="font-medium text-slate-700 text-right">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-[10px] text-slate-500 flex items-start gap-2 leading-relaxed">
              <CheckCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p>
                <strong>Important Safety Disclaimer:</strong> This medication schedule is generated by Theprescription AI for patient education and adherence support based on recognized clinical pharmacopeias. It is designed to complement, not replace, the professional judgment of your prescribing doctor or dispensing pharmacist. Never alter dosages or discontinue prescribed treatment without clinical consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

