import React from 'react';
import { Utensils, Pill, Building2, FlaskConical, ArrowLeftRight, AlertTriangle } from 'lucide-react';
import { MedicineDetail, ChronologicalScheduleStep } from '../types';
import { crossReferenceMedicine } from '../data/medicineCatalog';

interface PrescriptionMasterBoxProps {
  medicines: MedicineDetail[];
  chronologicalPlan?: ChronologicalScheduleStep[];
  suspectedCondition?: string;
}

export const PrescriptionMasterBox: React.FC<PrescriptionMasterBoxProps> = ({
  medicines,
}) => {
  return (
    <section
      id="prescription-master-box"
      className="bg-white rounded-3xl border-2 border-blue-500/40 shadow-sm overflow-hidden"
    >
      {/* Box Header Banner with Royal Sapphire Theme */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-5 sm:p-7 md:p-8 relative overflow-hidden">
        {/* Subtle pill & pharmacy cross glow artwork */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <svg
          className="absolute right-6 top-1/2 -translate-y-1/2 w-48 h-32 text-blue-500/10 pointer-events-none hidden sm:block"
          viewBox="0 0 160 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="20" y="20" width="120" height="80" rx="16" />
          <line x1="80" y1="40" x2="80" y2="80" />
          <line x1="60" y1="60" x2="100" y2="60" />
        </svg>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2.5 border border-blue-400/30 backdrop-blur-xs">
              <Pill className="w-3.5 h-3.5 text-blue-400" />
              <span>Prescription Master Box</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              All Prescribed Medicines
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-2xl leading-relaxed">
              Complete clinical inventory of every medicine on your prescription slip, including dosage, frequency, food rules, duration, and medical purpose.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="px-4 py-2.5 rounded-2xl bg-blue-900/60 backdrop-blur-xs border border-blue-400/30 text-left md:text-right shadow-inner">
              <div className="text-[10px] text-blue-300 uppercase tracking-wider font-extrabold">Total Items</div>
              <div className="text-base sm:text-xl font-black text-white">{medicines.length} Medicines</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        {/* MASTER PREVIEW - RESPONSIVE MOBILE CARDS + DESKTOP TABLE */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              Prescribed Medicine Summary
            </h3>
            <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
              Direct Clinical Reference
            </span>
          </div>

          {/* MOBILE CARDS VIEW (< 768px): No horizontal table panning needed */}
          <div className="block md:hidden space-y-3">
            {medicines.map((med, idx) => {
              const crossRef = crossReferenceMedicine(med.name, med.genericName);
              const isUnclear =
                med.name.toLowerCase().includes('apologies') ||
                med.name.toLowerCase().includes('unidentified') ||
                med.name.toLowerCase().includes('pharmacist') ||
                med.name.toLowerCase().includes('unclear');
              const isBrand = !isUnclear && (med.prescribedAs || crossRef.prescribedAs) === 'brand';
              const companyName = isUnclear ? undefined : (med.companyName || crossRef.companyName);
              const activeSalt = isUnclear
                ? "Handwriting unclear — please verify above"
                : (med.activeGenericSalt || crossRef.activeGenericSalt || med.genericName);
              const popularBrands = isUnclear ? [] : ((med.popularCompanyBrands && med.popularCompanyBrands.length > 0)
                ? med.popularCompanyBrands
                : crossRef.popularCompanyBrands);

              return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                        #{idx + 1}
                      </span>
                      {isUnclear ? (
                        <span className="font-bold text-amber-900 text-xs sm:text-sm bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          Apologies, we didn't understand this medicine
                        </span>
                      ) : (
                        <span className="font-bold text-slate-900 text-sm">{med.name}</span>
                      )}
                      {med.strength && (
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium border border-slate-200">
                          {med.strength} {med.form && `(${med.form})`}
                        </span>
                      )}
                      {!isUnclear && (
                        isBrand ? (
                          <span className="text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Building2 className="w-2.5 h-2.5" /> Company Brand
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <FlaskConical className="w-2.5 h-2.5" /> Generic Salt
                          </span>
                        )
                      )}
                    </div>

                    {/* Generic / Brand cross reference */}
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 space-y-1">
                      <div>
                        <span className="text-slate-400 font-medium">Active Salt: </span>
                        <strong className="text-slate-800 font-semibold">{activeSalt}</strong>
                        {companyName && (
                          <span className="text-slate-500 ml-1.5 font-normal">
                            (Mfg: {companyName})
                          </span>
                        )}
                      </div>
                      {popularBrands && popularBrands.length > 0 && (
                        <div className="text-[10px] text-slate-500 flex flex-wrap items-center gap-1 pt-0.5">
                          <span className="font-medium text-slate-400">
                            {isBrand ? 'Equivalent brands:' : 'Company brands:'}
                          </span>
                          {popularBrands.slice(0, 3).map((pb, pbIdx) => (
                            <span key={pbIdx} className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-medium text-slate-700">
                              {pb.brandName} ({pb.companyName})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold shrink-0 ${
                      med.mealRelation === 'empty_stomach' || med.mealRelation === 'before_meal'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}
                  >
                    <Utensils className="w-3 h-3" />
                    {med.mealRelation === 'empty_stomach'
                      ? 'Empty Stomach'
                      : med.mealRelation === 'after_meal'
                      ? 'After Food'
                      : 'With Food'}
                  </span>
                </div>

                {/* Dose, Timing & Duration Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Dose & Frequency</span>
                    <span className="font-semibold text-slate-800">{med.dosage}</span>
                    <span className="text-slate-500 text-[11px] block">{med.frequency}</span>
                    {med.timingCode && (
                      <span className="font-mono text-[10px] text-emerald-700 font-bold">[{med.timingCode}]</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Duration & Rule</span>
                    <span className="font-medium text-slate-700">{med.duration || 'As directed'}</span>
                    <p className="text-[10px] text-slate-600 mt-0.5 leading-tight">{med.mealRelationText}</p>
                  </div>
                </div>

                {med.purposeAndUsage && (
                  <p className="text-[11px] text-slate-600 leading-snug">
                    <strong className="text-slate-700">Purpose: </strong>{med.purposeAndUsage}
                  </p>
                )}
              </div>
              );
            })}
          </div>

          {/* DESKTOP TABLE (>= 768px) */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5">#</th>
                  <th className="p-3.5">Prescribed Medicine & Active Salt</th>
                  <th className="p-3.5">Dose & Frequency</th>
                  <th className="p-3.5">When To Take (Food Rule)</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Main Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {medicines.map((med, idx) => {
                  const crossRef = crossReferenceMedicine(med.name, med.genericName);
                  const isUnclear =
                    med.name.toLowerCase().includes('apologies') ||
                    med.name.toLowerCase().includes('unidentified') ||
                    med.name.toLowerCase().includes('pharmacist') ||
                    med.name.toLowerCase().includes('unclear');
                  const isBrand = !isUnclear && (med.prescribedAs || crossRef.prescribedAs) === 'brand';
                  const companyName = isUnclear ? undefined : (med.companyName || crossRef.companyName);
                  const activeSalt = isUnclear
                    ? "Handwriting unclear — please verify above"
                    : (med.activeGenericSalt || crossRef.activeGenericSalt || med.genericName);
                  const popularBrands = isUnclear ? [] : ((med.popularCompanyBrands && med.popularCompanyBrands.length > 0)
                    ? med.popularCompanyBrands
                    : crossRef.popularCompanyBrands);

                  return (
                  <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3.5 font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {isUnclear ? (
                          <span className="font-bold text-amber-900 text-xs sm:text-sm bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            Apologies, we didn't understand this medicine
                          </span>
                        ) : (
                          <span className="font-bold text-slate-900 text-sm">{med.name}</span>
                        )}
                        {med.strength && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                            {med.strength} ({med.form})
                          </span>
                        )}
                        {!isUnclear && (
                          isBrand ? (
                            <span className="text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Building2 className="w-2.5 h-2.5" /> Company Brand
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <FlaskConical className="w-2.5 h-2.5" /> Generic Molecule
                            </span>
                          )
                        )}
                      </div>

                      {/* Active Salt & Company details */}
                      <div className="text-[11px] text-slate-600 space-y-0.5">
                        <div>
                          <span className="text-slate-400">Active Generic Salt: </span>
                          <span className="text-slate-800 font-semibold">{activeSalt}</span>
                          {companyName && (
                            <span className="text-slate-500 ml-1.5">
                              (Mfg: <strong>{companyName}</strong>)
                            </span>
                          )}
                        </div>

                        {popularBrands && popularBrands.length > 0 && (
                          <div className="text-[10px] text-slate-500 flex flex-wrap items-center gap-1 pt-0.5">
                            <span className="font-medium text-slate-400">
                              {isBrand ? 'Other company brands:' : 'Company brands in pharmacies:'}
                            </span>
                            {popularBrands.slice(0, 3).map((pb, pbIdx) => (
                              <span key={pbIdx} className="bg-slate-100 px-1.5 py-0.5 rounded font-medium text-slate-700">
                                {pb.brandName} ({pb.companyName})
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">
                      <div>{med.dosage}</div>
                      <div className="text-[11px] text-slate-500">{med.frequency}</div>
                      {med.timingCode && (
                        <span className="font-mono text-[10px] text-emerald-700 font-bold">[{med.timingCode}]</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          med.mealRelation === 'empty_stomach' || med.mealRelation === 'before_meal'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}
                      >
                        <Utensils className="w-3 h-3" />
                        {med.mealRelation === 'empty_stomach' ? 'Empty Stomach' : med.mealRelation === 'after_meal' ? 'After Food' : 'With Food'}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-1 leading-tight">{med.mealRelationText}</p>
                    </td>
                    <td className="p-3.5 font-medium text-slate-700 whitespace-nowrap">
                      {med.duration || 'As directed'}
                    </td>
                    <td className="p-3.5 text-slate-600 max-w-xs leading-relaxed text-[11px]">
                      {med.purposeAndUsage}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
