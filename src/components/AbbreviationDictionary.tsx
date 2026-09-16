import React, { useState } from 'react';
import { BookOpen, Search, Filter } from 'lucide-react';
import { MEDICAL_ABBREVIATIONS } from '../data/abbreviationsData';

export const AbbreviationDictionary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAbbreviations = MEDICAL_ABBREVIATIONS.filter((item) => {
    const matchesSearch =
      item.abbr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.englishMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.fullLatin && item.fullLatin.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Terms' },
    { id: 'frequency', label: 'Frequency (OD, BD, TDS...)' },
    { id: 'timing', label: 'Timing & Meals (AC, PC, HS...)' },
    { id: 'instructions', label: 'Special (SOS, Stat...)' },
    { id: 'route', label: 'Route (PO, SL, IV, IM...)' },
    { id: 'form', label: 'Form (Tab, Cap, Syp...)' },
    { id: 'clinical_directive', label: 'Directives (Rx, Sig, Mitte...)' },
    { id: 'lab_test', label: 'Lab & Diagnostic (CBC, LFT, KFT...)' },
    { id: 'measurement', label: 'Units (mg, mcg, ml, IU...)' },
  ];

  return (
    <div id="abbreviation-dictionary-root" className="w-full mx-auto space-y-6">
      {/* Header with Cool Royal Violet / Amethyst Theme */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-r from-slate-950 via-purple-950 to-violet-950 text-white relative overflow-hidden">
          {/* Subtle Rx medical glyph and quill glow artwork */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-purple-500/10 font-serif text-8xl font-black select-none pointer-events-none hidden sm:block">
            ℞
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2.5 border border-purple-400/30 backdrop-blur-xs">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span>Prescription Latin Shorthand Codex</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Doctor Abbreviation Dictionary
            </h1>
            <p className="text-xs sm:text-sm text-purple-100/80 mt-1.5 max-w-2xl leading-relaxed">
              Look up shorthand Latin medical symbols, timing directives, and dosage codes (OD, BD, TDS, AC, PC, SOS) written by physicians.
            </p>

            {/* Search & Category Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search abbreviation e.g., BD, TDS, AC, PC, HS, SOS..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/20 bg-slate-900/70 text-white placeholder:text-slate-400 text-xs md:text-sm focus:bg-slate-900 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all min-h-[44px]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer min-h-[40px] ${
                      selectedCategory === cat.id
                        ? 'bg-linear-to-r from-purple-600 to-violet-600 text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-400/40'
                        : 'bg-white/10 hover:bg-purple-500/20 text-purple-100 border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Extended categories pill row */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 scrollbar-none">
              {categories.slice(4).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer min-h-[32px] ${
                    selectedCategory === cat.id
                      ? 'bg-purple-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white/10 hover:bg-purple-500/20 text-purple-200 border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Abbreviation Cards Grid */}
        <div className="p-5 sm:p-7 md:p-8 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredAbbreviations.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-purple-300 hover:shadow-2xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base font-bold font-mono text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
                      {item.abbr}
                    </span>
                    {item.fullLatin && (
                      <span className="text-[11px] italic text-slate-400">
                        {item.fullLatin}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs md:text-sm font-semibold text-slate-800 mb-1">
                    {item.englishMeaning}
                  </h4>
                </div>
              <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="font-medium text-slate-600">Prescription example: </span>
                {item.example}
              </div>
            </div>
          ))}
        </div>

        {filteredAbbreviations.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No abbreviations found matching "{searchTerm}".
          </div>
        )}
      </div>
      {/* -------------------- COMPREHENSIVE SEO EDUCATIONAL GUIDE (1,800+ WORDS) -------------------- */}
      <section className="mt-12 pt-8 border-t border-slate-200 text-slate-800 space-y-10 leading-relaxed">
        {/* Header */}
        <header className="space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-black uppercase tracking-wider border border-purple-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Clinical Shorthand &amp; Medical Latin Codex</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            The Complete Guide to Latin Medical Prescription Abbreviations, Circadian Schedules, and Patient Safety
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            For centuries, clinical medicine has relied on concise Latin abbreviations and numerical notations to communicate complex dosage frequencies, administration routes, and timing rules. This educational clinical guide decodes the history and pharmacology behind prescription shorthand — from everyday terms like 1-0-1 and BD to critical meal directives like AC and PC — ensuring you can interpret your doctor&apos;s written orders with confidence and clarity.
          </p>
        </header>

        {/* Section 1 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black shrink-0">
              1
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">Historical Foundations</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                The Latin Heritage of Medical Prescriptions: From Ancient Apothecaries to Modern Clinics
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            The use of Latin in medical prescriptions is not an intentional attempt to keep patients in the dark. Rather, it is the direct legacy of centuries of European medical history. Following the fall of the Western Roman Empire and throughout the medieval and Renaissance eras, Latin served as the universal <em>lingua franca</em> of science, philosophy, and healthcare. A physician trained at the University of Bologna could write a medical formula that an apothecary in London, Paris, or Heidelberg could prepare and dispense without linguistic confusion.
          </p>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Latin offered distinct pharmacological advantages: it was a dead language whose grammatical rules and vocabulary were fixed, ensuring that botanical names and measurement directives remained immutable across borders. The iconic prescription symbol <strong>℞</strong> is an abbreviation for the Latin imperative verb <em>recipe</em>, translating literally to &quot;take thou&quot; or &quot;take this preparation.&quot; What followed was a precise chemical recipe specifying crude botanical powders, tinctures, excipient bases, and dosing instructions.
          </p>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            While contemporary medicine has shifted predominantly to vernacular languages in clinical documentation, Latin abbreviations remain deeply entrenched in clinical culture. Physicians under intense time pressure continue to write &quot;BD&quot; or &quot;TDS&quot; because jotting two or three letters takes a fraction of a second compared to writing &quot;take one tablet twice daily every twelve hours.&quot; Learning this historical vocabulary bridges the communication gap between physician penmanship and patient understanding.
          </p>
        </article>

        {/* Section 2 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
              2
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">Frequency Analysis</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Frequency Codes Decoded: The Chronological Anatomy of OD, BD, TDS, QDS, and Q4H
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Prescription frequency codes govern how often a pharmaceutical compound must be administered throughout a standard twenty-four-hour day. These codes are directly derived from Latin prepositional and numerical phrases:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm my-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-base text-blue-900">OD (Omni Die) / QD</span>
                <span className="text-[11px] text-slate-500 font-serif italic">omni die</span>
              </div>
              <h4 className="font-bold text-slate-900">Once Daily (Every 24 Hours)</h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                Specifies that the medication has an extended biological half-life or prolonged receptor binding duration requiring only one administration per day. Typically scheduled in the morning (for instance, thyroid hormone replacement or once-daily antihypertensive ACE inhibitors) or at bedtime (for sedative medications or statins).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-base text-blue-900">BD / BID (Bis in Die)</span>
                <span className="text-[11px] text-slate-500 font-serif italic">bis in die</span>
              </div>
              <h4 className="font-bold text-slate-900">Twice Daily (Every 12 Hours)</h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                Requires the total daily therapeutic dose to be divided into two equal parts spaced approximately twelve hours apart (e.g. 8:00 AM and 8:00 PM). Common for oral antidiabetic agents, short-acting beta-blockers, and standard broad-spectrum penicillins.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-base text-blue-900">TDS / TID (Ter Die Sumendum)</span>
                <span className="text-[11px] text-slate-500 font-serif italic">ter die sumendum</span>
              </div>
              <h4 className="font-bold text-slate-900">Three Times Daily (Every 8 Hours)</h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                Mandates taking the medication three times across 24 hours, ideally at 8-hour intervals (for instance, 7:00 AM, 3:00 PM, and 11:00 PM). Crucial for antibacterial agents where drug serum concentrations must remain continuously above the minimum inhibitory concentration to prevent bacterial resurgence and resistance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-base text-blue-900">QDS / QID (Quater in Die)</span>
                <span className="text-[11px] text-slate-500 font-serif italic">quater in die</span>
              </div>
              <h4 className="font-bold text-slate-900">Four Times Daily (Every 6 Hours)</h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                Prescribed for short-half-life compounds (such as certain first-generation cephalosporins, erythromycin, or rapid muscle relaxants). Doses must be spaced six hours apart (e.g. 6:00 AM, 12:00 PM, 6:00 PM, and 12:00 AM midnight).
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Another related group of frequency terms uses the Latin letter <em>Q</em> (for <em>quaque</em>, meaning &quot;every&quot;): <strong>Q4H</strong> means &quot;every 4 hours,&quot; <strong>Q6H</strong> means &quot;every 6 hours,&quot; and <strong>Q8H</strong> means &quot;every 8 hours.&quot; Whenever you see a Q-code, it dictates round-the-clock mathematical spacing rather than arbitrary administration around meals.
          </p>
        </article>

        {/* Section 3 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">
              3
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">Circadian Grids</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Circadian Notation: Mastering the Universal 1-0-1, 1-1-1, and 0-0-1 Daily Grid
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            In many global healthcare regions — particularly throughout the Commonwealth, India, Southeast Asia, the Middle East, and parts of Europe — physicians frequently bypass Latin acronyms entirely in favor of an intuitive three-digit numerical grid: <strong>Morning - Afternoon - Night</strong>.
          </p>

          <div className="overflow-x-auto my-3">
            <table className="w-full text-left text-xs border-collapse border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Circadian Code</th>
                  <th className="p-3">Morning Dose</th>
                  <th className="p-3">Afternoon Dose</th>
                  <th className="p-3">Night / Bedtime Dose</th>
                  <th className="p-3">Total Daily Units</th>
                  <th className="p-3">Common Clinical Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-emerald-800">1 - 0 - 1</td>
                  <td className="p-3">1 tablet</td>
                  <td className="p-3">0</td>
                  <td className="p-3">1 tablet</td>
                  <td className="p-3 font-semibold text-slate-900">2 tablets</td>
                  <td className="p-3">Metformin 500mg, Amoxicillin/Clavulanate 625mg, Aceclofenac</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-emerald-800">1 - 0 - 0</td>
                  <td className="p-3">1 tablet</td>
                  <td className="p-3">0</td>
                  <td className="p-3">0</td>
                  <td className="p-3 font-semibold text-slate-900">1 tablet</td>
                  <td className="p-3">Levothyroxine, Pantoprazole, Amlodipine, Multivitamins</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-emerald-800">1 - 1 - 1</td>
                  <td className="p-3">1 tablet</td>
                  <td className="p-3">1 tablet</td>
                  <td className="p-3">1 tablet</td>
                  <td className="p-3 font-semibold text-slate-900">3 tablets</td>
                  <td className="p-3">Digestive enzymes, short-acting antibiotics, Ibuprofen 400mg</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-emerald-800">0 - 0 - 1</td>
                  <td className="p-3">0</td>
                  <td className="p-3">0</td>
                  <td className="p-3">1 tablet</td>
                  <td className="p-3 font-semibold text-slate-900">1 tablet</td>
                  <td className="p-3">Atorvastatin, Montelukast, Cetirizine, Zolpidem</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-emerald-800">0 - 1 - 0</td>
                  <td className="p-3">0</td>
                  <td className="p-3">1 tablet</td>
                  <td className="p-3">0</td>
                  <td className="p-3 font-semibold text-slate-900">1 tablet</td>
                  <td className="p-3">Midday post-lunch digestive aids, targeted afternoon pain relievers</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-emerald-800">1 - 1 - 1 - 1</td>
                  <td className="p-3" colSpan={3}>Four evenly distributed doses across morning, noon, evening, bedtime</td>
                  <td className="p-3 font-semibold text-slate-900">4 tablets</td>
                  <td className="p-3">Cefalexin, Paracetamol (for acute post-surgical analgesia)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            This numerical grid eliminates language ambiguities for international patients and caregivers. A code like &quot;1-0-1&quot; clearly instructs: take one unit with breakfast and one unit with dinner, skipping the midday lunch interval.
          </p>
        </article>

        {/* Section 4 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black shrink-0">
              4
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">Meal Directives</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Prandial Directives: Understanding AC (Ante Cibum), PC (Post Cibum), and Fasting Ingestion
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            The relationship between medication ingestion and digestion is codified through the Latin word <em>cibum</em> (meaning &quot;food&quot; or &quot;meal&quot;). Overlooking these notations can lead to either complete therapeutic non-absorption or painful gastrointestinal toxicity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-2">
              <strong className="text-teal-900 font-bold block text-sm">AC — Ante Cibum (Before Meals)</strong>
              <p className="text-slate-600 leading-relaxed text-xs">
                Take thirty to sixty minutes before consuming food. Essential for proton pump inhibitors (Pantoprazole, Omeprazole, Esomeprazole) to ensure peak plasma levels coincide with the postprandial activation of gastric parietal proton pumps. Also mandatory for antidiabetic sulfonylureas (Glimepiride) to prime pancreatic insulin secretion prior to carbohydrate absorption.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-2">
              <strong className="text-teal-900 font-bold block text-sm">PC — Post Cibum (After Meals)</strong>
              <p className="text-slate-600 leading-relaxed text-xs">
                Take within fifteen to thirty minutes following a meal. Universal for Non-Steroidal Anti-Inflammatory Drugs (NSAIDs such as Ibuprofen, Diclofenac, Naproxen) to coat the gastric mucosa and mitigate ulceration risk. Also standard for Metformin to attenuate common gastrointestinal side effects (nausea, cramping, diarrhea).
              </p>
            </div>
          </div>
        </article>

        {/* Section 5 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black shrink-0">
              5
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">As-Needed Medication</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                PRN and SOS: When Medication Is Taken Only &quot;As Needed&quot; for Emergent Symptoms
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Not all prescriptions are meant to be taken on a rigid daily schedule. Some medications are reserved exclusively for acute symptomatic episodes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm my-2">
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <span className="font-mono font-bold text-amber-900 text-sm">PRN (Pro Re Nata)</span>
              <p className="text-slate-600 leading-relaxed text-xs">
                Translates from Latin as &quot;as circumstances require&quot; or &quot;as needed.&quot; Written alongside a qualifying clinical condition: for example, &quot;Ibuprofen 400mg PO Q6H PRN headache&quot; means take one tablet every 6 hours only if experiencing headache discomfort, but do not take if pain is absent.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <span className="font-mono font-bold text-amber-900 text-sm">SOS (Si Opus Sit)</span>
              <p className="text-slate-600 leading-relaxed text-xs">
                Translates as &quot;if there is need&quot; or &quot;in case of emergency.&quot; Frequently written on prescriptions in Asian and European jurisdictions for rescue interventions: e.g. sublingual nitrates for acute chest tightness, antiemetics for breakthrough chemotherapy nausea, or fast-acting bronchodilator inhalers during acute asthma wheezing.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            The cardinal safety rule of PRN and SOS medications is observing the stated maximum daily dosage ceiling. Even if an order says &quot;PRN severe pain,&quot; you must never exceed the stated maximum 24-hour quantity (for example, no more than 4,000mg Paracetamol or 3 doses of rescue nitroglycerin) without immediate medical intervention.
          </p>
        </article>

        {/* Section 6 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-black shrink-0">
              6
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">Routes of Ingestion</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Routes of Administration: PO, IV, IM, SC, PR, SL, and Topical Directives
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            The route of administration determines how a pharmaceutical enters systemic circulation:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-slate-900 block mb-0.5">PO (Per Os)</span>
              <span className="text-slate-600">By mouth (swallowed orally with water).</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-slate-900 block mb-0.5">SL (Sub Lingua)</span>
              <span className="text-slate-600">Dissolved under the tongue.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-slate-900 block mb-0.5">IV (Intravenous)</span>
              <span className="text-slate-600">Injected directly into a vein.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-slate-900 block mb-0.5">IM (Intramuscular)</span>
              <span className="text-slate-600">Injected deep into muscle tissue.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-slate-900 block mb-0.5">SC / SubQ</span>
              <span className="text-slate-600">Injected subcutaneously under skin.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-slate-900 block mb-0.5">PR (Per Rectum)</span>
              <span className="text-slate-600">Rectal suppository administration.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-slate-900 block mb-0.5">Top (Topical)</span>
              <span className="text-slate-600">Applied directly to cutaneous skin.</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-mono font-bold text-slate-900 block mb-0.5">Inh (Inhalation)</span>
              <span className="text-slate-600">Inhaled into lungs via MDI/DPI.</span>
            </div>
          </div>
        </article>

        {/* Section 7 */}
        <article className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black shrink-0">
              7
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">Patient Safety Imperative</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                The ISMP &quot;Do Not Use&quot; Dangerous Abbreviations List: Why Ambiguity Costs Lives
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            While Latin shorthand has deep historical roots, modern hospital quality audits reveal that ambiguous abbreviations cause thousands of preventable injuries annually. The Institute for Safe Medication Practices (ISMP) and The Joint Commission mandate that accredited hospitals eliminate high-risk shorthand terms:
          </p>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded text-xs shrink-0">
                U or u (Unit)
              </span>
              <div>
                <strong className="text-rose-950 font-bold block">Danger: Mistaken for &quot;0&quot;, &quot;4&quot;, or &quot;cc&quot;</strong>
                Writing &quot;10 U insulin&quot; in hurried cursive frequently looks like &quot;100&quot; or &quot;104&quot;, leading to massive ten-fold overdoses resulting in fatal hypoglycemic shock. Accredited standard: Always write the full word &quot;unit.&quot;
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded text-xs shrink-0">
                Trailing Zero (.0) &amp; Missing Leading Zero (.5)
              </span>
              <div>
                <strong className="text-rose-950 font-bold block">Danger: Overdoses by a factor of ten</strong>
                Writing &quot;5.0 mg&quot; can appear as &quot;50 mg&quot; if the decimal point is faint or obscured. Similarly, writing &quot;.5 mg&quot; instead of &quot;0.5 mg&quot; easily looks like &quot;5 mg&quot;. Accredited standard: Never write a trailing zero (write &quot;5 mg&quot;) and always use a leading zero (&quot;0.5 mg&quot;).
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded text-xs shrink-0">
                QD, QOD (Every Day / Every Other Day)
              </span>
              <div>
                <strong className="text-rose-950 font-bold block">Danger: Confused for each other or &quot;QID&quot;</strong>
                A handwritten &quot;QOD&quot; (every other day) has been misread as &quot;QID&quot; (four times daily), resulting in an eight-fold dosing acceleration. Accredited standard: Write out &quot;daily&quot; or &quot;every other day.&quot;
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded text-xs shrink-0">
                MS, MSO4, MgSO4
              </span>
              <div>
                <strong className="text-rose-950 font-bold block">Danger: Confusing Morphine Sulfate with Magnesium Sulfate</strong>
                Confusing central nervous system morphine with obstetric magnesium sulfate has caused devastating fetal and maternal injury. Accredited standard: Write the complete chemical name.
              </div>
            </div>
          </div>
        </article>

        {/* Section 8 */}
        <article className="space-y-4 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black shrink-0">
              8
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-400">Patient Empowerment</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Translating Doctor Shorthand into a Written Home Adherence Chart
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The ultimate objective of understanding medical abbreviations is converting abstract physician directives into an actionable, foolproof daily medication routine at home.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Do not leave your prescriptions tucked away in paper bags or relying entirely on memory. Create a structured 24-hour visual medicine schedule: write down each active generic salt, its commercial brand name, exact timing with meals, and specific hours (such as 8:00 AM and 8:00 PM). Use our built-in printable medication card generator to print a pocket-sized reminder for your wallet, refrigerator, and family caregivers.
          </p>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
            <p className="font-semibold text-white mb-1">Clinical Safety Affirmation:</p>
            <p>
              This dictionary is provided strictly for patient health literacy and educational clarification. If any symbol, dosage number, or abbreviation on your prescription remains even slightly ambiguous, pause and ask your pharmacist or prescribing doctor for clarification. Safe healthcare begins with complete clarity.
            </p>
          </div>
        </article>
      </section>

      </div>
    </div>
  );
};
