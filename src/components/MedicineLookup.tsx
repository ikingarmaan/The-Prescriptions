import React, { useState } from 'react';
import {
  Search,
  Pill,
  ShieldCheck,
  AlertTriangle,
  Utensils,
  Clock,
  Sparkles,
  HelpCircle,
  PhoneCall,
  Info,
  Building2,
  FlaskConical,
  ArrowLeftRight,
} from 'lucide-react';
import { crossReferenceMedicine } from '../data/medicineCatalog';

interface MedicineProfile {
  name: string;
  genericName: string;
  drugClass: string;
  primaryUses: string[];
  howItWorks: string;
  standardFormsAndStrengths: string[];
  typicalDosageAndTiming: string;
  foodInstructions: string;
  mealRelation: string;
  precautionsAndWarnings: string[];
  commonSideEffects: string[];
  seriousSideEffectsToReport?: string[];
  commonInteractionsToAvoid?: string[];
  missedDoseAdvice?: string;
  storageInstructions?: string;
}

export const MedicineLookup: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<MedicineProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const popularMedicines = [
    'Amoxicillin',
    'Augmentin 625',
    'Pantoprazole 40mg',
    'Metformin 500mg',
    'Atorvastatin 10mg',
    'Azithromycin 500mg',
    'Paracetamol 650mg',
    'Cetirizine 10mg',
  ];

  const handleSearch = async (medicineName: string) => {
    if (!medicineName.trim()) return;
    setIsLoading(true);
    setError(null);
    setQuery(medicineName);

    try {
      const response = await fetch('/api/check-single-medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicineName: medicineName.trim() }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Could not find medicine details.');
      }
      setResult(data.data);
    } catch (err: any) {
      console.error('Lookup error:', err);
      setError(err.message || 'Failed to retrieve information for this medicine.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="medicine-lookup-container" className="w-full mx-auto space-y-6">
      {/* Search Header with Cool Sapphire Theme */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
          {/* Subtle molecular/chemical structure background artwork */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <svg
            className="absolute right-6 top-6 w-52 h-44 text-blue-500/10 pointer-events-none hidden sm:block"
            viewBox="0 0 200 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="40" cy="40" r="14" />
            <circle cx="120" cy="40" r="14" />
            <circle cx="80" cy="110" r="14" />
            <circle cx="160" cy="110" r="14" />
            <line x1="54" y1="40" x2="106" y2="40" />
            <line x1="50" y1="52" x2="70" y2="98" />
            <line x1="110" y1="52" x2="90" y2="98" />
            <line x1="130" y1="52" x2="150" y2="98" />
            <line x1="94" y1="110" x2="146" y2="110" />
          </svg>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2.5 border border-blue-400/30 backdrop-blur-xs">
              <Pill className="w-3.5 h-3.5 text-blue-400" />
              <span>Medicine & Salt Verification Encyclopedia</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Check Any Medicine & Its Usage
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1.5 max-w-2xl leading-relaxed">
              Search any brand name or generic compound to understand its clinical purpose, food interactions, safety precautions, and side effects.
            </p>

            {/* Search Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
              className="flex flex-col sm:flex-row gap-2.5 mt-5"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="medicine-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., Augmentin, Metformin, Pantocid, Dolo, Azithral..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/20 bg-slate-900/70 text-white placeholder:text-slate-400 focus:bg-slate-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all text-base sm:text-sm min-h-[48px]"
                />
              </div>
              <button
                id="search-medicine-btn"
                type="submit"
                disabled={isLoading || !query.trim()}
                className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/30 transition-all shrink-0 flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Check Medicine</span>
              </button>
            </form>

            {/* Popular Quick Suggestions */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-blue-200/70 font-medium">Quick search:</span>
              {popularMedicines.map((med) => (
                <button
                  key={med}
                  type="button"
                  onClick={() => handleSearch(med)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-blue-500/25 hover:text-white text-blue-100 transition-colors text-xs font-medium border border-white/10 min-h-[34px] cursor-pointer"
                >
                  {med}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Error View */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to fetch medicine details</p>
            <p className="text-rose-700 text-xs mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <div>
            <h3 className="font-bold text-slate-800 text-base">Retrieving Clinical Information...</h3>
            <p className="text-xs text-slate-500 mt-1">Analyzing pharmacological profile, uses, and precautions</p>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && !isLoading && (() => {
        const crossRef = crossReferenceMedicine(result.name, result.genericName);
        const isBrand = crossRef.prescribedAs === 'brand';
        const companyName = crossRef.companyName;
        const activeSalt = crossRef.activeGenericSalt || result.genericName;
        const popularBrands = crossRef.popularCompanyBrands;

        return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-slate-100 bg-linear-to-b from-blue-50/50 to-white">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {result.drugClass || 'Therapeutic Agent'}
                  </span>
                  {isBrand ? (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-blue-600" />
                      Company Brand
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <FlaskConical className="w-3 h-3 text-emerald-600" />
                      Generic Molecule
                    </span>
                  )}
                  {result.standardFormsAndStrengths && result.standardFormsAndStrengths.length > 0 && (
                    <span className="text-xs text-slate-500 font-medium">
                      Forms: {result.standardFormsAndStrengths.join(', ')}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {result.name}
                </h3>

                {/* Generic / Company Cross Reference Box */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <div>
                      <span className="text-slate-400 font-medium">Active Chemical Molecule: </span>
                      <strong className="text-slate-800 text-sm font-semibold">{activeSalt}</strong>
                      {companyName && (
                        <span className="text-slate-500 ml-2 font-normal">
                          (Manufacturer: <strong className="text-slate-700">{companyName}</strong>)
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <ArrowLeftRight className="w-2.5 h-2.5" /> Two-Way Cross-Reference
                    </span>
                  </div>

                  {popularBrands && popularBrands.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        {isBrand ? 'Other Leading Company Brands With This Active Salt:' : 'Popular Company Brands in Pharmacies:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {popularBrands.slice(0, 6).map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[11px]"
                          >
                            <span className="font-semibold text-slate-800">{b.brandName}</span>
                            <span className="text-[10px] text-slate-500">({b.companyName})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs shrink-0 self-start">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1">
                  <Utensils className="w-3.5 h-3.5 text-blue-600" />
                  Food Guidance
                </div>
                <p className="text-slate-600">{result.foodInstructions}</p>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Primary Uses */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Primary Medical Uses & Indications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {result.primaryUses.map((use, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works & Dosage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  How It Works in the Body
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {result.howItWorks}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  Typical Dosing & Timing
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {result.typicalDosageAndTiming}
                </p>
              </div>
            </div>

            {/* Precautions */}
            {result.precautionsAndWarnings && result.precautionsAndWarnings.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Key Safety Warnings & Precautions
                </h4>
                <div className="space-y-1.5">
                  {result.precautionsAndWarnings.map((warning, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2"
                    >
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{warning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Side Effects */}
            {result.commonSideEffects && result.commonSideEffects.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Common Side Effects
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.commonSideEffects.map((effect, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                    >
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missed dose advice & storage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
              {result.missedDoseAdvice && (
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Missed Dose:</span>
                  <p>{result.missedDoseAdvice}</p>
                </div>
              )}
              {result.storageInstructions && (
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Storage:</span>
                  <p>{result.storageInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
};
