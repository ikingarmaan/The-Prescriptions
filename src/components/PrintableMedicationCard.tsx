import React, { useState } from 'react';
import { Printer, X, ShieldAlert, CheckCircle, Download, FileText, Check } from 'lucide-react';
import { PrescriptionAnalysisResult } from '../types';
import {
  generatePrintableCardHtml,
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

  const handleDownloadHtml = () => {
    const htmlContent = generatePrintableCardHtml(prescription);
    const filename = `medication-schedule-${new Date().toISOString().slice(0, 10)}.html`;
    downloadFile(htmlContent, filename, 'text/html;charset=utf-8');
    setDownloadedFormat('html');
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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs p-2 sm:p-6 flex items-center justify-center print:p-0 print:static print:bg-white"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden print:border-none print:shadow-none print:max-w-none my-auto">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-100 bg-slate-50 print:hidden gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
            <span className="font-bold text-xs sm:text-sm text-slate-800 truncate">
              Printable Medication Guide
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2 shrink-0">
            {/* Download HTML Card Button */}
            <button
              id="download-html-card-btn"
              type="button"
              onClick={handleDownloadHtml}
              className="px-3 sm:px-3.5 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs min-h-[40px] cursor-pointer"
              title="Download standalone offline HTML card"
            >
              {downloadedFormat === 'html' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Card Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download Card</span>
                </>
              )}
            </button>

            {/* Download TXT Summary Button */}
            <button
              id="download-txt-card-btn"
              type="button"
              onClick={handleDownloadTxt}
              className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 min-h-[40px] cursor-pointer"
              title="Download plain text schedule for notes/messages"
            >
              {downloadedFormat === 'txt' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Text Saved!</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
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
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Document */}
        <div className="p-4 sm:p-8 md:p-10 space-y-5 sm:space-y-6 text-slate-900 print:p-0">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Official Patient Medication Schedule & Guide
              </span>
              <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
                Prescription Medicines & Usage Summary
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Clinical reference for safe dosage, administration timing, and food guidelines.
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p className="font-semibold text-slate-800">
                {prescription.doctorSpecialtyOrClinic || 'Prescribed Regimen'}
              </p>
              <p>Generated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Condition Overview */}
          {prescription.suspectedCondition && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-800 mb-0.5">
                Indication / Treatment Goal: {prescription.suspectedCondition}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {prescription.generalExplanation}
              </p>
            </div>
          )}

          {/* Table of Medicines */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
              Prescribed Medicines ({prescription.medicines.length})
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <th className="p-3">#</th>
                    <th className="p-3">Medicine & Generic Salt</th>
                    <th className="p-3">Dose & Frequency</th>
                    <th className="p-3">When To Take (Food)</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Purpose & Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {prescription.medicines.map((med, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{med.name}</div>
                        <div className="text-[11px] text-slate-500">{med.genericName}</div>
                        {med.strength && (
                          <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                            {med.strength} ({med.form})
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">{med.dosage}</div>
                        <div className="text-[11px] text-slate-500">{med.frequency}</div>
                        {med.timingCode && (
                          <span className="text-[10px] font-mono text-slate-600">[{med.timingCode}]</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-900 block">
                          {med.mealRelationText}
                        </span>
                      </td>
                      <td className="p-3 text-slate-700 whitespace-nowrap">
                        {med.duration || 'As directed'}
                      </td>
                      <td className="p-3 text-slate-600 text-[11px] leading-relaxed max-w-xs">
                        {med.purposeAndUsage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Prescribed Laboratory Tests (if any) */}
          {prescription.labTests && prescription.labTests.length > 0 && (
            <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-950 mb-2">
                Ordered Laboratory & Diagnostic Tests ({prescription.labTests.length})
              </h3>
              <div className="space-y-2 text-xs">
                {prescription.labTests.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900">{t.testName}</span>
                      <span className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded ml-2 font-semibold">
                        {t.category}
                      </span>
                      <p className="text-[11px] text-slate-600 mt-0.5">{t.whyDoctorOrdered}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {t.preparationInstructions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spacing & Safety Guidelines */}
          {prescription.potentialInteractionsOrSpacingAdvice.length > 0 && (
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 text-xs">
              <h3 className="font-bold text-amber-950 mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Critical Timing & Spacing Instructions
              </h3>
              <ul className="space-y-1 text-amber-900">
                {prescription.potentialInteractionsOrSpacingAdvice.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="font-bold text-amber-600">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Medical Disclaimer */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong>Important Safety Notice:</strong> This schedule is generated for patient guidance based on recognized clinical pharmacopeias. Do not alter doses or stop prescribed treatments without consulting your prescribing medical practitioner or dispensing pharmacist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
