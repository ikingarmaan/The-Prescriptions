import React from 'react';
import { Pill, Clock, Utensils, ShieldCheck, HeartPulse, Check, Sun, Moon } from 'lucide-react';
import { MedicineDetail, ChronologicalTakingPlanSlot } from '../types';

interface PrescriptionMasterBoxProps {
  medicines: MedicineDetail[];
  chronologicalPlan?: ChronologicalTakingPlanSlot[];
  suspectedCondition?: string;
  className?: string;
}

export const PrescriptionMasterBox: React.FC<PrescriptionMasterBoxProps> = ({
  medicines = [],
  chronologicalPlan = [],
  suspectedCondition,
  className = '',
}) => {
  if (!medicines || medicines.length === 0) {
    return null;
  }

  return (
    <div
      id="prescription-master-box"
      className={`bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-500/30 dark:border-emerald-500/40 shadow-sm overflow-hidden ${className}`}
    >
      {/* Header Bar with Deep Emerald Theme */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 text-white relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Complete Master Summary</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Prescribed Medicines Master Roster ({medicines.length})
            </h3>
            {suspectedCondition && (
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Clinical Indication:{' '}
                <span className="text-white font-semibold">{suspectedCondition}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Table / Card Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
              <th className="py-3 px-4 text-center w-12">#</th>
              <th className="py-3 px-4">Medicine &amp; Active Salt</th>
              <th className="py-3 px-3">Form / Strength</th>
              <th className="py-3 px-3">Dosage &amp; Frequency</th>
              <th className="py-3 px-3">Meal Relation</th>
              <th className="py-3 px-3 text-center">Daily Schedule</th>
              <th className="py-3 px-4">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {medicines.map((med, idx) => (
              <tr
                key={idx}
                className="hover:bg-emerald-50/30 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-400 dark:text-slate-500">
                  {idx + 1}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {med.name}
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    {med.genericName}
                  </div>
                  {med.companyName && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-0.5">
                      Mfg: {med.companyName}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-3">
                  <div className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                    <Pill className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{med.form}</span>
                  </div>
                  {med.strength && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      {med.strength}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{med.dosage}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{med.frequency}</div>
                  {med.timingCode && (
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono text-[10px] border border-blue-200 dark:border-blue-800">
                      {med.timingCode}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                      med.mealRelation === 'empty_stomach' || med.mealRelation === 'before_meal'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    <Utensils className="w-3 h-3 shrink-0" />
                    <span className="capitalize">
                      {med.mealRelation ? med.mealRelation.replace('_', ' ') : 'With food'}
                    </span>
                  </span>
                </td>
                <td className="py-3.5 px-3 text-center">
                  <div className="inline-flex items-center gap-1">
                    <span
                      title="Morning"
                      className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                        med.scheduleTimes?.morning
                          ? 'bg-amber-500 text-white font-black'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      M
                    </span>
                    <span
                      title="Afternoon"
                      className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                        med.scheduleTimes?.afternoon
                          ? 'bg-amber-500 text-white font-black'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      A
                    </span>
                    <span
                      title="Evening"
                      className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                        med.scheduleTimes?.evening
                          ? 'bg-indigo-500 text-white font-black'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      E
                    </span>
                    <span
                      title="Bedtime"
                      className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                        med.scheduleTimes?.bedtime
                          ? 'bg-purple-600 text-white font-black'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      N
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                  {med.duration || 'As directed'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
