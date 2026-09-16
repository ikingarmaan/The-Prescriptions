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
  CheckCircle2,
} from 'lucide-react';
import { crossReferenceMedicine } from '../data/medicineCatalog';
import { trackMedicineSearch } from '../utils/analytics';

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
      trackMedicineSearch(medicineName.trim(), data.data ? 1 : 0);
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Check Any Medicine & Its Usage
            </h1>
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
      {/* -------------------- COMPREHENSIVE SEO EDUCATIONAL GUIDE (1,800+ WORDS) -------------------- */}
      <section className="mt-12 pt-8 border-t border-slate-200 text-slate-800 space-y-10 leading-relaxed">
        {/* Guide Header */}
        <header className="space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider border border-blue-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Pharmacology &amp; Drug Directory Guide</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Understanding Active Generic Salts, Therapeutic Bioequivalence, and Safe Medication Formulations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            When patients receive a prescription, they are often confronted with an overwhelming array of proprietary brand names, chemical salt suffixes, dosage strengths, and specialized release formulations. This clinical educational guide breaks down how active pharmaceutical ingredients work, demystifies generic substitution, explains metric dosage units, and explores food-drug interactions to help you navigate your medications safely.
          </p>
        </header>

        {/* Section 1 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
              1
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">Pharmacological Foundations</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Active Pharmaceutical Ingredients (APIs) vs. Commercial Brand Names: A Deep Dive
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            In modern clinical pharmacology, every commercially manufactured medication consists of two distinct components: the Active Pharmaceutical Ingredient (API) and inactive pharmaceutical excipients. The Active Pharmaceutical Ingredient — commonly termed the active generic salt — is the biologically active chemical entity responsible for producing direct physiological effects in the human body. Whether the therapeutic objective is halting bacterial protein synthesis, blocking myocardial beta-adrenergic receptors, reducing hepatic cholesterol output, or neutralizing inflammatory prostaglandins, the active salt is the sole molecular engine driving clinical efficacy.
          </p>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            In contrast, commercial brand names are proprietary trademarks owned by pharmaceutical corporations for marketing and consumer recognition. For example, consider the popular cardiovascular therapy prescribed under the trademark brand name <em>Lipitor</em>. The true biological agent inside every capsule is <strong>Atorvastatin Calcium</strong>. Similarly, while millions of patients recognize the brand name <em>Augmentin</em>, the actual therapeutic intervention is a synergized combination of two active molecules: <strong>Amoxicillin Trihydrate</strong> (a bactericidal beta-lactam antibiotic) and <strong>Clavulanate Potassium</strong> (a beta-lactamase enzyme inhibitor that disables bacterial defenses).
          </p>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span>The Chemistry Behind the Salt Suffix: Why Hydrochloride, Potassium, and Maleate Matter</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Patients frequently notice chemical suffixes attached to generic names, such as <em>Metformin Hydrochloride</em>, <em>Amlodipine Besylate</em>, or <em>Diclofenac Sodium vs. Diclofenac Potassium</em>. Pure drug molecules are often non-ionized organic bases or acids that dissolve poorly in water or degrade rapidly in stomach acid. By bonding the drug molecule to an inorganic counter-ion (forming a chemical salt), medicinal chemists dramatically improve water solubility, gastrointestinal absorption velocity, and chemical shelf-life stability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-blue-900 block font-bold mb-0.5">Diclofenac Potassium vs. Sodium</strong>
                The potassium salt dissolves and enters the bloodstream more rapidly, making it preferable for acute immediate pain relief (migraines, dental surgery), whereas the sodium salt provides slower, sustained absorption for chronic osteoarthritic inflammation.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-blue-900 block font-bold mb-0.5">Amlodipine Besylate vs. Maleate</strong>
                Besylate (benzene sulfonate) provides optimal crystalline stability preventing chemical degradation in humid storage environments compared to earlier carboxylic acid salts.
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Understanding that the active generic salt is the true medicinal compound empowers patients to demystify complex packaging, cross-reference multiple prescriptions, and avoid dangerous unintentional duplicate therapies where two differently named commercial brands contain the identical chemical molecule.
          </p>
        </article>

        {/* Section 2 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">
              2
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">Regulatory Standards</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Therapeutic Bioequivalence: What It Means When a Pharmacist Substitutes a Generic
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            When an innovator pharmaceutical firm invents and patents a new drug molecule, it enjoys approximately twenty years of market exclusivity to recover hundreds of millions of dollars invested in discovery, synthesis, and multi-phase human clinical trials. When that initial patent period elapses, the regulatory framework permits certified secondary manufacturers to produce and distribute generic versions.
          </p>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            However, regulatory authorities — such as the United States Food and Drug Administration (US FDA), the European Medicines Agency (EMA), Health Canada, and national pharmacopeial agencies — enforce uncompromising scientific criteria before granting market clearance. A generic drug cannot simply be mixed in a facility; it must demonstrate unequivocal <strong>pharmaceutical equivalence</strong> and <strong>bioequivalence</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm my-3">
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pharmaceutical Equivalence</span>
              </h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                The generic formulation must possess identical active chemical ingredients in the exact same molar dosage strength, identical dosage form (tablet to tablet, capsule to capsule), and identical administration route as the innovator reference listed drug (RLD).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pharmacokinetic Bioequivalence</span>
              </h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                In rigorously audited human clinical trials, the rate and extent of systemic absorption are monitored. The 90% confidence interval for both the Peak Serum Concentration (Cmax) and total biological drug exposure over time (Area Under the Curve, or AUC) must fall within a strict 80% to 125% statistical bioequivalence corridor compared to the brand drug.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Post-marketing surveillance demonstrates that pharmacokinetic differences between approved generics and brands average under 3.5% — matching batch-to-batch variations in brand medications. Generic bioequivalents deliver identical clinical efficacy and safety at substantial cost savings.
          </p>
        </article>

        {/* Section 3 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black shrink-0">
              3
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">Metric Precision</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Understanding Metric Strength Measurements: Grams, Milligrams, Micrograms, and Units
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Prescription dosages rely on the International System of Metric Units. Because dosages span microgram hormones to gram-level antimicrobials, a misplaced decimal point can cause a dangerous overdose catastrophe.
          </p>

          <div className="overflow-x-auto my-3">
            <table className="w-full text-left text-xs border-collapse border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Metric Unit &amp; Symbol</th>
                  <th className="p-3">Numerical Conversion Ratio</th>
                  <th className="p-3">Typical Clinical Medication Examples</th>
                  <th className="p-3">High-Risk Safety Caution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-purple-900">Gram (g or gm)</td>
                  <td className="p-3">1 gram = 1,000 milligrams</td>
                  <td className="p-3">High-dose antibiotics (Ceftriaxone 1g IV), bulk oral electrolyte powders</td>
                  <td className="p-3 text-rose-700 font-medium">Never confuse &quot;1g&quot; with &quot;1mg&quot;; doing so represents a 1,000x dosage differential.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-purple-900">Milligram (mg)</td>
                  <td className="p-3">1 mg = 1/1,000th of a gram</td>
                  <td className="p-3">The most common unit: Paracetamol 500mg, Amoxicillin 500mg, Metformin 500mg</td>
                  <td className="p-3 text-slate-600">Standard for 90% of oral solid dosage tablets and capsules.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-purple-900">Microgram (mcg or &mu;g)</td>
                  <td className="p-3">1 mcg = 1/1,000th of a milligram</td>
                  <td className="p-3">Thyroid hormones (Levothyroxine 50mcg, 100mcg), Digoxin, Fentanyl patches</td>
                  <td className="p-3 text-rose-700 font-medium">Never use the abbreviation &quot;&mu;g&quot; in cursive handwritten notes; it easily looks like &quot;mg&quot;.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-purple-900">International Unit (IU or U)</td>
                  <td className="p-3">Biological activity measurement based on bioassay effect</td>
                  <td className="p-3">Insulin (e.g. 10 units subcutaneous), Vitamin D3 (e.g. 60,000 IU weekly), Heparin</td>
                  <td className="p-3 text-rose-700 font-medium">Always use an official U-100 insulin syringe for insulin; never use standard household teaspoons or generic ml droppers.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Whenever inspecting a newly dispensed prescription, carefully inspect both the numeral and the metric unit. If you normally take a 50-microgram thyroid pill and the box reads 50 milligrams, halt immediately and contact your pharmacy prior to swallowing the medication.
          </p>
        </article>

        {/* Section 4 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black shrink-0">
              4
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">Drug Delivery Technology</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Dosage Forms &amp; Drug Absorption: Tablets, Capsules, Syrups, and Modified Release (ER / XR / CR)
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            The physical architecture of a pharmaceutical product is designed to transport the fragile active chemical through the harsh environment of hydrochloric stomach acid (pH 1.5 to 2.5) into the small intestine where systemic absorption into hepatic portal circulation occurs. Modifying this physical matrix alters how and when the body absorbs the medication.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-mono font-bold text-amber-800 text-xs uppercase bg-amber-100 px-2 py-0.5 rounded-md">
                Enteric-Coated (EC)
              </span>
              <h4 className="font-bold text-slate-900">Acid-Resistant Polymer Barrier</h4>
              <p className="text-slate-600 leading-relaxed">
                Coated with specialized cellulose phthalate polymers that resist dissolution in acidic stomach fluids. The coating only dissolves upon reaching the neutral-to-alkaline duodenum. Common for Aspirin (protects the stomach mucosa) and Proton Pump Inhibitors (protects the acid-labile molecule from degradation).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-mono font-bold text-amber-800 text-xs uppercase bg-amber-100 px-2 py-0.5 rounded-md">
                Extended-Release (ER / XR / XL / CR)
              </span>
              <h4 className="font-bold text-slate-900">Gradual Hydrophilic Matrix Diffusion</h4>
              <p className="text-slate-600 leading-relaxed">
                Formulated inside a semi-permeable wax or polymer matrix that slowly leaches the active drug into the intestine over 12 to 24 continuous hours. This flattens peak-and-trough serum oscillations, reducing side effects and eliminating the need to take tablets multiple times a day.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-mono font-bold text-amber-800 text-xs uppercase bg-amber-100 px-2 py-0.5 rounded-md">
                Sublingual &amp; Buccal (SL)
              </span>
              <h4 className="font-bold text-slate-900">Direct Venous Mucosal Absorption</h4>
              <p className="text-slate-600 leading-relaxed">
                Dissolved directly under the tongue or between the gum and cheek. Venous blood from the oral mucosa drains straight into the superior vena cava, bypassing destructive stomach acid and first-pass liver metabolism for rapid emergency therapeutic onset (e.g. Nitroglycerin for acute angina).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
            <strong className="font-bold flex items-center gap-1.5 text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Critical Patient Warning: Never Crush or Chew Extended-Release (ER/XR) Tablets
            </strong>
            <p className="leading-relaxed">
              Crushing, chewing, or splitting an extended-release, sustained-release, or controlled-release tablet destroys the microscopic diffusion membrane. This results in <strong>dose dumping</strong> — the entire 24-hour supply of active drug releases into the bloodstream within minutes, triggering dangerous toxicity, severe hypotension, respiratory depression, or fatal cardiac arrhythmias. If swallowing large tablets is challenging, ask your pharmacist for liquid or dispersible alternatives.
            </p>
          </div>
        </article>

        {/* Section 5 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black shrink-0">
              5
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">Clinical Pharmacology</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Common Drug-Nutrient &amp; Food Interactions: Grapefruit, Calcium, Alcohol, and Empty Stomach Rules
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Medications do not operate in a vacuum. Everything we eat, drink, or ingest as dietary supplements traverses the same metabolic pathways in our digestive tract and liver. When nutritional substances meet particular pharmaceuticals, biochemical conflicts can develop.
          </p>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-xs">
                CYP
              </div>
              <div>
                <strong className="text-slate-900 font-bold block mb-0.5">The Grapefruit Juice Interaction (CYP3A4 Inhibition)</strong>
                Grapefruit contains organic compounds called furanocoumarins. These molecules irreversibly inhibit the primary cytochrome P450 3A4 (CYP3A4) enzyme located in intestinal enterocytes. Normally, CYP3A4 breaks down a significant percentage of statins (Atorvastatin, Simvastatin), calcium channel blockers (Amlodipine, Felodipine), and immunosuppressants before they enter circulation. Ingesting grapefruit juice blocks this breakdown, causing circulating drug levels to skyrocket by up to 300%, leading to acute muscle breakdown (rhabdomyolysis) or severe hypotension.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 text-xs">
                Ca++
              </div>
              <div>
                <strong className="text-slate-900 font-bold block mb-0.5">Dairy Calcium &amp; Heavy Mineral Chelation (Fluoroquinolones &amp; Tetracyclines)</strong>
                Consuming milk, cheese, yogurt, calcium-fortified plant milks, antacids (containing magnesium/aluminum), or iron supplements alongside antibiotics like Ciprofloxacin, Levofloxacin, or Doxycycline causes <em>chemical chelation</em>. Positively charged polyvalent metal ions bind to the antibiotic molecule, forming an insoluble chemical complex that passes through the bowel without being absorbed, rendering the antibiotic therapy ineffective. Maintain a strict two-hour window between dairy products and these antibiotics.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 font-bold flex items-center justify-center shrink-0 text-xs">
                EtOH
              </div>
              <div>
                <strong className="text-slate-900 font-bold block mb-0.5">Ethanol (Alcohol) Conflicts</strong>
                Combining alcohol with central nervous system depressants (benzodiazepines, opioids, sedating antihistamines) triggers additive respiratory depression. Furthermore, combining alcohol with Metronidazole triggers a violent disulfiram-like reaction (severe vomiting, tachycardia, throbbing headache), while combining alcohol with chronic Paracetamol depletes hepatic glutathione, increasing susceptibility to acute liver failure.
              </div>
            </div>
          </div>
        </article>

        {/* Section 6 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black shrink-0">
              6
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">Consumer Health Literacy</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                How to Read &amp; Compare Over-The-Counter (OTC) and Prescription Active Salts
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            One of the most frequent routes to accidental medication toxicity begins in the over-the-counter aisle. Many multi-symptom cold remedies, sinus decongestants, headache relievers, and nighttime cough syrups contain identical active generic salts under vastly different commercial branding.
          </p>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            For instance, a patient battling a respiratory viral infection might take a prescription painkiller containing Paracetamol (such as Co-codamol), drink a warm lemon-flavored nighttime cold remedy packet (also containing 1,000mg Paracetamol), and swallow two over-the-counter sinus relief caplets (containing an additional 500mg Paracetamol). In doing so, their daily ingestion rapidly exceeds the maximum safe adult ceiling of 4,000 milligrams per 24 hours. The toxic metabolite N-acetyl-p-benzoquinone imine (NAPQI) rapidly overwhelms protective liver glutathione stores, initiating irreversible hepatocellular necrosis.
          </p>

          <div className="bg-teal-50 p-5 rounded-xl border border-teal-200 space-y-2 text-xs sm:text-sm text-teal-950">
            <h4 className="font-bold text-teal-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>The Active Ingredient Habit: Your Defense Against Toxicity</span>
            </h4>
            <p className="leading-relaxed">
              Always turn the pharmaceutical carton over and read the standardized &quot;Drug Facts&quot; or &quot;Active Ingredients&quot; panel. Never rely on the front headline branding (&quot;Multi-Action Sinus Plus&quot; or &quot;Nighttime PM Formula&quot;). Verify the active chemical salts and add up your cumulative daily intake across all concurrent prescriptions, over-the-counter tablets, and supplements.
            </p>
          </div>
        </article>

        {/* Section 7 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
              7
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">Storage Protocols</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Safe Medication Storage Protocols: Room Temperature, Refrigeration, and Moisture Prevention
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Medicinal compounds are delicate biochemical formulations susceptible to thermodynamic degradation, hydrolytic cleavage, and photochemical oxidation. Where and how you store your pharmaceuticals directly determines whether the tablets will retain their therapeutic potency until their stated expiration date.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Controlled Room Temperature (15&deg;C - 25&deg;C / 59&deg;F - 77&deg;F)</h4>
              <p className="text-slate-600 leading-relaxed">
                Applies to the vast majority of solid oral dosage forms (tablets, capsules). Store in a dry, cool cabinet. Avoid leaving pill bottles inside parked automobiles where cabin temperatures can exceed 50&deg;C (122&deg;F) within an hour, melting capsule shells and denaturing active salts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Refrigerated Cold Chain (2&deg;C - 8&deg;C / 36&deg;F - 46&deg;F)</h4>
              <p className="text-slate-600 leading-relaxed">
                Crucial for complex biologics, reconstituted antibiotic syrups, unopened insulin vials, and certain ophthalmic drop solutions. Never place medications directly against the freezer cooling plate; freezing causes irreversible protein denaturation and ruptures delicate suspension micelles.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">The Bathroom Cabinet Myth: Moisture &amp; Humidity</h4>
              <p className="text-slate-600 leading-relaxed">
                Despite tradition, storing medicines inside a bathroom cabinet is unsafe. Frequent hot showers create extreme relative humidity and temperature oscillations. Moisture penetrates container caps, triggering chemical hydrolysis in aspirin, effervescent salts, and test strips. Choose a high bedroom drawer or dedicated pantry shelf away from children.
              </p>
            </div>
          </div>
        </article>

        {/* Section 8 */}
        <article className="space-y-4 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shrink-0">
              8
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-400">Clinical Partnership</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Why Professional Pharmacist Verification Is Non-Negotiable
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The digital drug encyclopedia and cross-referencing capabilities of <span className="text-white font-bold">Theprescription</span> are engineered to inform and empower. However, healthcare software is a partner in health literacy — it is never an autonomous prescribing physician or dispensing authority.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every patient presents unique clinical variables: renal function, hepatic enzymes, cardiac ejection fraction, genetic polymorphisms, and polypharmacy. A digital catalog explains generic salts, but only your licensed physician and pharmacist can calibrate therapy safely to your individual physiology.
          </p>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
            <p className="font-semibold text-white mb-1">Our Core Safety Promise:</p>
            <p>
              Whenever you encounter an unfamiliar brand, ambiguous dosage strength, or conflicting food advice, bring your physical medicine packaging to your community pharmacist. Their clinical training is your most reliable shield against preventable medication errors.
            </p>
          </div>
        </article>
      </section>

    </div>
  );
};
