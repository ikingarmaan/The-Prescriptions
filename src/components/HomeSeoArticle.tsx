import React from 'react';
import {
  AlertTriangle,
  Stethoscope,
  Sparkles,
  FileSearch,
  Pill,
  Clock,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Search,
  Printer,
  HeartPulse,
} from 'lucide-react';

interface HomeSeoArticleProps {
  onNavigateToTab?: (tab: string) => void;
}

export const HomeSeoArticle: React.FC<HomeSeoArticleProps> = ({ onNavigateToTab }) => {
  return (
    <article
      id="seo-guide-section"
      className="mt-12 space-y-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm transition-colors"
      aria-label="AI Doctor Prescription Reader and Medication Literacy Educational Guide"
    >
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Patient Health Literacy & Technology Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          AI Doctor Prescription Reader: How Artificial Intelligence Deciphers Doctor Handwriting and Medical Prescriptions
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          Struggling to read what your physician wrote on your prescription slip? You are not alone. Globally, over 50% of outpatient prescriptions are handwritten in cursive script with Latin medical shorthand. Learn how an <strong>AI doctor prescription reader</strong> uses computer vision and pharmacological algorithms to transcribe messy handwriting, reveal generic medicine salts, and generate clear daily schedules.
        </p>
      </div>

      {/* Grid of Key Benefits / Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-3">
            <FileSearch className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Handwriting OCR Scanner
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Neural vision models analyze stroke curvature, ligatures, and ink density to decode cursive doctor handwriting accurately.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold mb-3">
            <Pill className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Generic Medicine Salts
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Automatically maps commercial brand names to active chemical molecules, helping you understand drug bioequivalence and save costs.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            1-0-1 Dosage Decoder
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Converts cryptic Latin abbreviations (1-0-1, BD, TDS, AC, PC) into an easy-to-follow chronological 24-hour routine.
          </p>
        </div>
      </div>

      {/* Section 1: The Problem of Doctor Handwriting */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Why Doctor Prescriptions Are Notoriously Hard to Read
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          It is a running joke in popular culture that doctors have indecipherable handwriting. However, in clinical practice, physician handwriting is shaped by high-volume outpatient clinics, extreme time constraints, and repetitive notation. Physicians frequently examine 40 to 80 patients per shift, writing hundreds of drug orders in rapid shorthand. Over years of practice, full drug names morph into stylized cursive ligatures where only the first two or three letters are formed distinctly.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Compounding the challenge, prescriptions rely heavily on Latin medical abbreviations:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 my-2">
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>1-0-1:</strong> One dose in the morning, none in afternoon, one at night.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>BD / BID (Bis in die):</strong> Take twice daily, roughly 12 hours apart.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>TDS / TID (Ter in die):</strong> Take three times daily with 8-hour intervals.</span>
          </li>
          <li className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>AC &amp; PC:</strong> <em>Ante Cibum</em> (before food) vs. <em>Post Cibum</em> (after food).</span>
          </li>
        </ul>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          When patients cannot decipher these notes, they risk taking medications at suboptimal times, forgetting dosages, or accidentally mixing incompatible prescriptions. An <strong>AI prescription reader</strong> bridges this communication gap by providing instant, clear, and educational transcription.
        </p>
      </section>

      {/* Section 2: How AI Doctor Prescription Readers Work */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How Our AI Doctor Prescription Reader Works (5-Stage Pipeline)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlike generic OCR tools designed for printed book pages or clean receipts, a specialized <strong>doctor prescription scanner</strong> must handle angled photos, creased paper, ink bleeding, and ambiguous cursive loops. Theprescription employs a 5-stage pipeline:
        </p>

        <div className="space-y-3">
          <div className="flex gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Adaptive Optical Preprocessing &amp; Shadow Removal
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Prescription photos captured on smartphones often suffer from uneven shadows, low contrast, and perspective tilt. Our system normalizes the image canvas, suppresses background paper noise, enhances ink contrast, and levels the text baseline.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Cursive Neural Stroke Recognition
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Advanced vision neural networks evaluate continuous handwritten character trajectories rather than segmented letters. This allows the model to differentiate confusing pairs like 'Cl' vs 'd', 'u' vs 'n', and 'ol' vs 'al'.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Pharmacological Vocabulary Cross-Referencing &amp; RapidFuzz
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Raw decoded letters are cross-checked against a pharmacopeial database containing over 5,000 brand formulations and active pharmaceutical ingredients (APIs). If a doctor abbreviated "Augmentn 625", the NLP engine matches it to "Augmentin 625 (Amoxicillin + Clavulanic Acid)".
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              4
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Dosage &amp; Meal Relation Extraction
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                The engine isolates strength indicators (e.g. 500mg, 10ml, 1 puff), frequency shorthand (1-0-1, TDS, SOS), and meal timing instructions (before breakfast, after dinner) to structure each medication into a chronological daily timeline.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              5
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Interactive Patient Review &amp; Printable Schedule Export
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Patients review the deciphered medicines with confidence badges, verify generic salts, and export an official PDF medication schedule or print a daily checklist card for their refrigerator or medicine box.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Understanding Generic vs Brand Medicines */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Why Knowing Your Generic Medicine Salt Matters
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          When a physician writes a brand name on your prescription (e.g. Lipitor, Pan 40, Augmentin, Glycomet), pharmacies often sell the specific brand requested. However, pharmaceutical regulations require generic equivalents to have the exact same active chemical salt, strength, dosage form, and bioavailability as the brand-name drug.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Using our built-in <strong>Medicine &amp; Generic Salt Directory</strong>, patients can identify the active generic molecule (such as Atorvastatin, Pantoprazole, or Metformin) and discuss affordable generic alternatives with their doctor or dispensing pharmacist, potentially saving up to 60% to 80% on long-term chronic treatment costs.
        </p>
        {onNavigateToTab && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigateToTab('lookup')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Explore the Medicine &amp; Generic Salt Directory</span>
            </button>
          </div>
        )}
      </section>

      {/* Section 4: Step-by-Step Guide on How to Use the Tool */}
      <section className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How to Get the Best Results from an Online Prescription Reader
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">1. Natural, Bright Lighting</span>
            <p>Photograph your prescription under even, natural light. Avoid casting shadows with your hand or smartphone over doctor handwriting.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">2. Flatten Creased Paper</span>
            <p>Smooth out folded prescription slips before snapping your picture. A flat document prevents angled distortion and blurred words.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">3. Include All Dosage Details</span>
            <p>Ensure the camera frame captures medicine names, dosage frequencies (1-0-1, BD, OD), meal instructions (AC/PC), and doctor signatures.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">4. Always Confirm with Pharmacists</span>
            <p>Treat AI interpretations as educational support. Always double-check with the pharmacist dispensing your medicines before taking a new pill.</p>
          </div>
        </div>
      </section>

      {/* Critical Emergency Protocol & Safety Boundaries */}
      <section id="emergency-protocols" className="space-y-4 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">Emergency Protocol</span>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              Emergency Medical Situations vs. Educational Review: Clear Boundaries
            </h4>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Theprescription is engineered to champion patient health literacy, explain technical pharmacological terminology, and encourage proactive, informed dialogues between patients and certified clinicians. However, digital educational software must establish unequivocal clinical boundaries.
        </p>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          If you, a family member, or a person under your care experiences sudden acute symptoms — such as sudden respiratory distress, acute anaphylactic swelling of lips or throat, crushing chest pain radiating to the neck or arm, sudden motor weakness, severe confusion, uncontrolled hemorrhaging, or an accidental overdose — <strong>do not upload images or read online articles</strong>. Immediately telephone your regional emergency hotline (e.g. 911 in the USA, 112 in Europe/India, 999 in the UK) or proceed directly to the nearest hospital emergency department.
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
