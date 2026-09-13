import React from 'react';
import {
  FileText,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Stethoscope,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Info,
  Search,
  Pill,
  HeartPulse,
} from 'lucide-react';

interface HomeSeoArticleProps {
  onNavigateToTab?: (tab: string) => void;
}

export const HomeSeoArticle: React.FC<HomeSeoArticleProps> = ({ onNavigateToTab }) => {
  return (
    <article className="mt-12 pt-8 border-t border-slate-200 text-slate-800 space-y-10 leading-relaxed">
      {/* Header Banner */}
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Patient Health Literacy & Clinical Education Guide</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Understand Doctor Prescriptions: A Patient Guide to Handwriting, Generic Salts, and Dosage Timing
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Navigating a doctor prescription should never feel like solving an incomprehensible puzzle. Every year, millions of patients worldwide leave medical clinics holding handwritten paper slips filled with rapid cursive strokes, Latin frequency abbreviations, and unfamiliar pharmaceutical brand names. This comprehensive clinical guide explores the anatomy of medical prescriptions, explains how active generic salts work, breaks down chronobiological dosing schedules, and provides essential safety rules to protect you and your family.
        </p>
      </header>

      {/* Quick Navigation Cards */}
      <nav aria-label="Article Table of Contents" className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>In This Educational Guide</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-bold text-slate-700">
          <a href="#prescription-anatomy" className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors flex items-center justify-between">
            <span>1. Prescription Anatomy</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
          <a href="#generic-vs-brand" className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors flex items-center justify-between">
            <span>2. Generic Salts vs Brands</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
          <a href="#chronopharmacology-timing" className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors flex items-center justify-between">
            <span>3. Dosing Chronobiology</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
          <a href="#meal-relations-ac-pc" className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors flex items-center justify-between">
            <span>4. Meal Directives (AC / PC)</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
          <a href="#lasa-safety-risks" className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors flex items-center justify-between">
            <span>5. Look-Alike Drug Risks</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
          <a href="#ai-transcription-safety" className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors flex items-center justify-between">
            <span>6. AI & Human Safeguards</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
          <a href="#pharmacist-checklist" className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors flex items-center justify-between">
            <span>7. Pharmacist Questions</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
          <a href="#emergency-protocols" className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors flex items-center justify-between">
            <span>8. Emergency Protocols</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </nav>

      {/* Section 1: Anatomy of a Prescription */}
      <section id="prescription-anatomy" className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">
            1
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">Clinical Handwriting Explained</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              The Anatomy of a Medical Prescription: Why Doctor Penmanship Is Difficult to Read
            </h3>
          </div>
        </div>
        
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          The stereotype of the illegible doctor prescription is recognized worldwide. Rushed eight-minute appointments, heavy outpatient loads, and continuous cursive ligatures cause letterforms to blur into undulating lines on paper.
        </p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>The Four Standard Structural Elements of a Legitimate Clinical Order</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Medical documentation adheres to an internationally standardized architectural formula inherited from historical Latin apothecary treatises:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            <div className="bg-white p-3.5 rounded-lg border border-slate-200">
              <strong className="text-emerald-800 font-bold block mb-1">1. The Superscription (Rx Heading)</strong>
              The ℞ symbol stands for the Latin imperative Recipe (&quot;take thou&quot;), signifying the formal commencement of the prescription.
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200">
              <strong className="text-emerald-800 font-bold block mb-1">2. The Inscription (Medication Entity)</strong>
              Identifies the active pharmaceutical salt, dosage strength (e.g. 500mg, 10mcg), and formulation (tablets, capsules, syrups).
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200">
              <strong className="text-emerald-800 font-bold block mb-1">3. The Subscription (Dispensing Mandate)</strong>
              Dispensing mandates for the pharmacist specifying quantity (e.g. &quot;Mitte 30 tabs&quot;) or therapeutic course duration.
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200">
              <strong className="text-emerald-800 font-bold block mb-1">4. The Signa or Sig (Patient Instructions)</strong>
              Derived from Latin Signa (&quot;label on container&quot;), detailing frequency, circadian timing, and meal directives.
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Recognizing this four-part structural anatomy equips you to verify your prescription with confidence before leaving the pharmacy.
        </p>
      </section>

      {/* Section 2: Generic Salts vs Brand Names */}
      <section id="generic-vs-brand" className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
            2
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">Pharmacological Transparency</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Active Generic Salts vs. Proprietary Brand Names: Decoding the Core Molecule
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          A common moment of anxiety occurs at the pharmacy counter: your doctor writes a promoted brand name, but the pharmacist dispenses a box with an unfamiliar generic name. Patients understandably ask: <em>Is this substitute safe? Does it work as effectively as the original brand?</em>
        </p>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Every medication consists of two elements: the <strong>Active Pharmaceutical Ingredient (API or generic salt)</strong> and inactive excipients (binders, colorants, preservatives). While excipients shape the pill, the active generic salt alone is the therapeutic molecule that treats your condition.
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Commercial Trade Brands</th>
                <th className="p-3">Active Generic Pharmaceutical Molecule</th>
                <th className="p-3">Therapeutic Class</th>
                <th className="p-3">Physiological Mechanism of Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Augmentin, Clavam, Curam</td>
                <td className="p-3 font-mono text-emerald-800">Amoxicillin + Clavulanate Potassium</td>
                <td className="p-3">Beta-Lactam / Beta-Lactamase Inhibitor</td>
                <td className="p-3">Bactericidal cell wall inhibition protected against enzyme breakdown.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Glucophage, Glycomet, Riomet</td>
                <td className="p-3 font-mono text-emerald-800">Metformin Hydrochloride</td>
                <td className="p-3">Biguanide Antihyperglycemic</td>
                <td className="p-3">Suppresses liver glucose production and improves insulin uptake.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Lipitor, Atorva, Storvas</td>
                <td className="p-3 font-mono text-emerald-800">Atorvastatin Calcium Trihydrate</td>
                <td className="p-3">HMG-CoA Reductase Inhibitor (Statin)</td>
                <td className="p-3">Halts liver cholesterol synthesis and clears atherogenic LDL.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Panadol, Tylenol, Calpol, Dolo</td>
                <td className="p-3 font-mono text-emerald-800">Paracetamol (Acetaminophen)</td>
                <td className="p-3">Centrally Acting Analgesic &amp; Antipyretic</td>
                <td className="p-3">Inhibits prostaglandin synthesis to reduce pain and fever.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">Nexium, Esomac</td>
                <td className="p-3 font-mono text-emerald-800">Esomeprazole Magnesium</td>
                <td className="p-3">Proton Pump Inhibitor (PPI)</td>
                <td className="p-3">Inhibits gastric parietal ATPase pumps to suppress acid.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Once twenty-year patents expire, licensed manufacturers produce generic bioequivalents delivering identical active molecules into the bloodstream at matching therapeutic rates.
        </p>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Learning to identify the active generic salt prevents accidental double-dosing across brands, protects your budget from inflated markups, and ensures therapeutic continuity during pharmacy supply shortages.
        </p>

        {onNavigateToTab && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigateToTab('lookup')}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search 5,000+ Generic Salts in Our Master Medicine Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* Section 3: Chronopharmacology and Timing */}
      <section id="chronopharmacology-timing" className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black shrink-0">
            3
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">Chronopharmacology</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              The Chronobiology of Medication: Understanding Circadian Dosages &amp; Timing (1-0-1, BD, TDS)
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Swallowing a tablet is only half the equation of successful medical therapy; administering that molecule at the exact physiological moment represents the other crucial half. The scientific discipline of <strong>chronopharmacology</strong> studies how biological circadian rhythms influence drug absorption, serum distribution, hepatic metabolism, receptor density, and renal clearance across twenty-four hours.
        </p>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Our organs follow daily biological cycles: blood pressure surges in early morning, liver cholesterol synthesis peaks at night, gastric acid output peaks before midnight, and bronchial inflammation worsens before dawn. Physicians format dosing schedules to synchronize with these peaks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
            <span className="font-mono font-black text-purple-900 text-base">1 - 0 - 1  (BD / BID)</span>
            <h4 className="font-bold text-slate-900">Twice Daily (Morning &amp; Evening)</h4>
            <p className="text-slate-600 leading-relaxed">
              Partition doses by approximately twelve hours (e.g. 8:00 AM and 8:00 PM). Taking doses too close together causes early-evening serum spikes followed by overnight drops below protective therapeutic levels.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
            <span className="font-mono font-black text-purple-900 text-base">1 - 0 - 0  (OD / QD)</span>
            <h4 className="font-bold text-slate-900">Once Daily (Early Morning)</h4>
            <p className="text-slate-600 leading-relaxed">
              Intended for compounds requiring twenty-four-hour steady state or daytime synchronization. For example, diuretic hypertension medications (such as Furosemide or Hydrochlorothiazide) are universally prescribed in the morning to ensure excessive fluid excretion occurs throughout daytime waking hours, preventing disruptive nocturia and nighttime sleep disturbances.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
            <span className="font-mono font-black text-purple-900 text-base">1 - 1 - 1  (TDS / TID)</span>
            <h4 className="font-bold text-slate-900">Three Times Daily (Every 8 Hours)</h4>
            <p className="text-slate-600 leading-relaxed">
              Essential for short half-life drugs and antibiotics. Doses must be spaced eight hours apart (e.g. 7:00 AM, 3:00 PM, 11:00 PM) to keep drug levels above minimum inhibitory concentrations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
            <span className="font-mono font-black text-purple-900 text-base">0 - 0 - 1  (HS / QHS)</span>
            <h4 className="font-bold text-slate-900">At Bedtime (Hora Somni)</h4>
            <p className="text-slate-600 leading-relaxed">
              Specified for agents that induce central sedation (such as certain first-generation antihistamines or tricyclic pain modulators) or drugs that intercept nocturnal enzyme cascades, such as short-acting cholesterol-lowering statins whose primary biochemical target exhibits peak synthesis while you sleep.
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Disrupting circadian intervals by bunching doses causes toxic spikes followed by vulnerability. Respecting timetables ensures intended clinical outcomes.
        </p>

        {onNavigateToTab && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigateToTab('abbreviations')}
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-800 bg-purple-50 px-4 py-2 rounded-xl border border-purple-200 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Latin Clinical Abbreviations &amp; Timings in Our Dictionary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* Section 4: Meal Directives AC vs PC */}
      <section id="meal-relations-ac-pc" className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black shrink-0">
            4
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">Food-Drug Dynamics</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Meal Relationships: The Critical Distinction Between AC (Ante Cibum) and PC (Post Cibum)
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Few prescription notations are more clinically pivotal yet frequently neglected by patients than the Latin directives <strong>AC</strong> and <strong>PC</strong>. These abbreviations determine how a pharmaceutical interacts with gastric hydrochloric acid, digestive bile salts, mucosal enzymes, and the physical presence of food boluses in the gastrointestinal tract.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-3">
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
              <Clock className="w-4 h-4" />
              <span>AC — Ante Cibum (Before Meals)</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-bold">
              Standard Timing: 30 to 60 minutes prior to eating.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Clinical Rationale:</strong> Proton Pump Inhibitors (such as Pantoprazole, Omeprazole, Rabeprazole) are prodrugs requiring an alkaline small-intestinal environment for absorption before targeting the active proton pumps in the stomach wall. These pumps are stimulated into action by meal anticipation and consumption. Ingesting the pill thirty to sixty minutes before breakfast ensures maximal circulating drug concentration precisely when gastric pumps turn on. Similarly, thyroid replacement hormones like <strong>Levothyroxine</strong> are chemically vulnerable; dietary calcium, soy, dietary fiber, and caffeinated beverages bind tightly to the molecule, drastically curtailing systemic absorption if swallowed with breakfast.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
              <Clock className="w-4 h-4" />
              <span>PC — Post Cibum (After Meals)</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 font-bold">
              Standard Timing: Within 15 to 30 minutes following a substantial meal.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Clinical Rationale:</strong> NSAIDs (Ibuprofen, Naproxen, Diclofenac) inhibit gastric mucus synthesis. Taken empty stomach, they cause mucosal erosion, dyspepsia, and ulcers. Food provides a physical buffer. Additionally, fat-soluble compounds require dietary lipids to stimulate bile secretion for absorption.
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          If your prescription designates &quot;PC&quot;, do not take your medicine with a glass of tap water while skipping breakfast. If nausea or busy schedules prevent a full plate, consuming a slice of toast, a banana, or a small cup of yogurt creates the digestive barrier required to protect your stomach mucosa.
        </p>
      </section>

      {/* Section 5: The LASA Drug Dilemma */}
      <section id="lasa-safety-risks" className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black shrink-0">
            5
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">Patient Safety Alert</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              The &quot;Look-Alike, Sound-Alike&quot; (LASA) Drug Dilemma in Handwritten Prescriptions
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Patient safety agencies highlight Look-Alike, Sound-Alike (LASA) drug pairs as leading causes of dispensing errors when cursive strokes blur together.
        </p>

        <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-3">
          <h4 className="font-bold text-rose-950 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>High-Risk LASA Confusion Pairs Frequently Documented in Clinical Audits</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="bg-white p-3 rounded-xl border border-rose-100">
              <strong className="text-rose-900 block font-bold mb-1">Celebrex (celecoxib) vs. Celexa (citalopram)</strong>
              <em>Celebrex</em> is a selective COX-2 inhibitor for severe osteoarthritis and acute musculoskeletal inflammation. <em>Celexa</em> is a selective serotonin reuptake inhibitor (SSRI) prescribed for clinical depression and anxiety. Confusing these due to hurried penmanship could leave a patient unmedicated for cardiac or mental health symptoms.
            </div>
            <div className="bg-white p-3 rounded-xl border border-rose-100">
              <strong className="text-rose-900 block font-bold mb-1">Clonidine vs. Klonopin (clonazepam)</strong>
              <em>Clonidine</em> is a potent centrally acting alpha-2 agonist used to manage severe hypertension and ADHD. <em>Klonopin</em> is a high-potency benzodiazepine anticonvulsant and anxiolytic. An accidental switch could trigger profound hypotension or acute respiratory sedation.
            </div>
            <div className="bg-white p-3 rounded-xl border border-rose-100">
              <strong className="text-rose-900 block font-bold mb-1">Prednisone vs. Prednisolone</strong>
              Both are corticosteroids, but pediatric formulations and liver activation differ markedly, creating severe risks for pediatric dosing.
            </div>
            <div className="bg-white p-3 rounded-xl border border-rose-100">
              <strong className="text-rose-900 block font-bold mb-1">Hydralazine vs. Hydroxyzine</strong>
              <em>Hydralazine</em> is a direct arteriolar vasodilator for severe cardiovascular hypertension. <em>Hydroxyzine</em> is a sedating antihistamine for pruritus and acute anxiety. Mistaking these two could precipitate cardiovascular collapse.
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          To mitigate these hazards, institutional pharmacy protocols utilize <strong>Tall Man Lettering</strong> — capitalizing distinctive syllable clusters (for example, <em>predniSONE</em> versus <em>prednisoLONE</em>, or <em>hydrALAZINE</em> versus <em>hydrOXYzine</em>) to force cognitive pause. If you observe any ambiguity in your handwritten prescription, do not attempt to guess or self-interpret. Ask your dispensing pharmacist to corroborate the intended clinical indication.
        </p>
      </section>

      {/* Section 6: AI Transcription & Human Safeguards */}
      <section id="ai-transcription-safety" className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black shrink-0">
            6
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">Digital Health Ethics</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              How Artificial Intelligence Interprets Cursive Medical Ligatures Responsibly
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Advances in multimodal transformers have revolutionized document processing. Traditional OCR failed on medical scripts because it expected rigid, isolated typography, failing on overlapping handwriting, low contrast slips, and skewed angles.
        </p>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Modern clinical neural networks evaluate cursive handwriting by examining contextual token relationships across multidimensional space. Rather than analyzing an ambiguous squiggle in isolation, the algorithm considers the entire clinical row: the accompanying dosage units, administration frequency, and known pharmacological pairs. If an illegible script appears ambiguous between &quot;Metformin&quot; and &quot;Metoprolol&quot;, an intelligent model checks the accompanying strength and schedule. If the slip specifies &quot;500mg BD PC&quot;, the system identifies that Metformin is standardly dosed in 500mg increments with meals, while Metoprolol is prescribed in smaller 25mg to 100mg doses for cardiovascular indications.
        </p>

        <div className="bg-emerald-50/90 border border-emerald-200 p-5 rounded-2xl space-y-3">
          <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Our Foundational Principle: Explicit Refusal to Hallucinate Unverified Drugs</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            While consumer chatbots guess when uncertain, medical tools must maintain safety. That is why Theprescription enforces strict confidence thresholds: if handwriting is smudged or distorted, it flags the line as unverified and directs you to consult your pharmacist.
          </p>
        </div>
      </section>

      {/* Section 7: Patient Safety Checklist */}
      <section id="pharmacist-checklist" className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black shrink-0">
            7
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">Patient Advocacy</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              The Patient Safety Checklist: 7 Essential Questions to Ask Your Pharmacist
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Community pharmacists are accessible healthcare partners. When collecting your medicine, take two minutes to review these seven safety verification questions:
        </p>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">1. What is the active generic chemical molecule and brand name of this medication?</strong>
              Confirming both names prevents accidental double-dosing if you already take another brand with the same active molecule at home.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">2. Exactly what health condition or symptom is this medication prescribed to treat?</strong>
              Verifying the therapeutic condition prevents LASA drug mix-ups and clarifies why you take the medicine.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">3. How many times each day should I take this, and at what specific hours?</strong>
              Clarify whether &quot;three times daily&quot; requires strictly spacing doses eight hours apart around the clock or taking doses with morning, midday, and evening meals.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">4. Should I take this before meals, with food, or on an empty stomach?</strong>
              Confirm meal timing to prevent gastrointestinal ulceration, nausea, or drug malabsorption.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">5. What precise protocol should I follow if I miss an intended dose?</strong>
              Learn whether to take the missed pill immediately or skip it to prevent double-dose spikes.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">6. Are there specific foods, beverages, herbal teas, or dietary supplements I must avoid?</strong>
              Check for common biochemical triggers such as grapefruit juice, dairy calcium, alcohol, St. John&apos;s Wort, or supplemental potassium.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">7. What are the common mild side effects, and what severe warning signs require emergency care?</strong>
              Distinguish between mild transient adaptations (dry mouth, fatigue) and dangerous reactions like facial swelling or severe rash.
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Emergency Notice & Boundaries */}
      <section id="emergency-protocols" className="space-y-4 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">Emergency Protocol</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Emergency Medical Situations vs. Educational Review: Clear Boundaries
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Theprescription is engineered to champion patient health literacy, explain technical pharmacological terminology, and encourage proactive, informed dialogues between patients and certified clinicians. However, digital educational software must establish unequivocal clinical boundaries.
        </p>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          If you, a family member, or a person under your care experiences sudden acute symptoms — such as sudden respiratory distress, acute anaphylactic swelling of lips or throat, crushing chest pain radiating to the neck or arm, sudden motor weakness, severe confusion, uncontrolled hemorrhaging, or an accidental overdose — <strong>do not upload images or read online articles</strong>. Immediately telephone your regional emergency hotline (e.g. 911 in the USA, 112 in Europe, 999 in the UK) or proceed directly to the nearest hospital emergency department.
        </p>

        <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
          <p className="font-semibold text-white mb-1">Our Educational Commitment:</p>
          <p>
            Theprescription does not dispense medicines, provide official medical diagnoses, formulate treatment plans, or alter clinical prescriptions. Always treat the physical label attached by your registered pharmacist as the primary authoritative instruction, and consult your physician for all personalized diagnostic and dosing decisions.
          </p>
        </div>
      </section>
    </article>
  );
};
