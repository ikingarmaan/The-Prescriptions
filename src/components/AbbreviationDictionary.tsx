import React, { useState } from 'react';
import { BookOpen, Search, Filter } from 'lucide-react';
import { MEDICAL_ABBREVIATIONS } from '../data/medicalData';

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
    <div id="abbreviation-dictionary-root" className="w-full max-w-4xl mx-auto space-y-6">
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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Doctor Abbreviation Dictionary
            </h2>
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
    </div>
  </div>
);
};
