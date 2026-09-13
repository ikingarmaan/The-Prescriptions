import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Lock,
  ArrowRight,
  ArrowUp,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  FileText,
  Search,
  BookOpen,
  Printer,
  ChevronRight,
  Info,
  Mail,
  Heart,
  Activity,
  Zap,
  Globe,
  AlertTriangle,
} from 'lucide-react';
import { ThePrescriptionLogo } from './ThePrescriptionLogo';
import { AppNavTab } from './Navbar';

interface FooterProps {
  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
  onOpenPrintModal?: () => void;
}

interface AbbreviationChip {
  code: string;
  meaning: string;
  category: 'Timing' | 'Frequency' | 'Route';
  note: string;
}

const QUICK_SHORTHAND_CHIPS: AbbreviationChip[] = [
  { code: '1-0-1', meaning: 'Morning 1, Night 1', category: 'Timing', note: 'Twice daily, spaced 10–12 hours apart' },
  { code: 'OD', meaning: 'Once Daily (Omni Die)', category: 'Frequency', note: 'Take once every 24 hours at the same time' },
  { code: 'BD', meaning: 'Twice Daily (Bis in Die)', category: 'Frequency', note: 'Take twice daily, approximately 12 hours apart' },
  { code: 'TDS', meaning: 'Three Times Daily (Ter Die)', category: 'Frequency', note: 'Take 3 times daily, every 8 hours' },
  { code: 'AC', meaning: 'Before Meals (Ante Cibum)', category: 'Timing', note: 'Take 30–45 minutes prior to eating on an empty stomach' },
  { code: 'PC', meaning: 'After Meals (Post Cibum)', category: 'Timing', note: 'Take with or immediately after food to prevent stomach upset' },
  { code: 'SOS', meaning: 'As Needed (Si Opus Sit)', category: 'Frequency', note: 'Take only when acute pain, fever, or symptoms occur' },
  { code: 'HS', meaning: 'At Bedtime (Hora Somni)', category: 'Timing', note: 'Take 30 minutes before sleep' },
  { code: 'STAT', meaning: 'Immediately (Statim)', category: 'Timing', note: 'Single urgent initial loading dose' },
];

interface SafetyTip {
  title: string;
  text: string;
  badge: string;
}

const PHARMACIST_TIPS: SafetyTip[] = [
  {
    title: 'Never Crush Coated Tablets',
    text: 'Enteric-coated (EC) or Extended-Release (ER/XR) pills are engineered to release medicine slowly. Crushing them can cause a dangerous dose dump.',
    badge: 'Formulation Rule',
  },
  {
    title: 'Space Antibiotics & Antacids',
    text: 'Minerals like calcium, magnesium, and aluminum in antacids bind to antibiotics like Ciprofloxacin or Doxycycline. Always space them 2 hours apart.',
    badge: 'Drug Spacing',
  },
  {
    title: 'Finish Your Full Course',
    text: 'Never discontinue prescribed antibiotics early even if symptoms disappear. Stopping too soon encourages bacterial resistance.',
    badge: 'Infection Control',
  },
  {
    title: 'Monitor NSAIDs with Food',
    text: 'Pain relievers like Ibuprofen or Naproxen should always be taken after a meal or snack to protect your delicate stomach lining.',
    badge: 'Gastric Protection',
  },
];

const EMERGENCY_NUMBERS = [
  { country: 'India', flag: '🇮🇳', emergency: '112 / 108', poison: '1800-116-117' },
  { country: 'United States', flag: '🇺🇸', emergency: '911', poison: '1-800-222-1222' },
  { country: 'United Kingdom', flag: '🇬🇧', emergency: '999 / 111', poison: '111' },
  { country: 'European Union', flag: '🇪🇺', emergency: '112', poison: '112' },
  { country: 'Canada', flag: '🇨🇦', emergency: '911', poison: '1-844-POISON-X' },
  { country: 'Australia', flag: '🇦🇺', emergency: '000', poison: '13 11 26' },
];

export const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab, onOpenPrintModal }) => {
  const [selectedChip, setSelectedChip] = useState<AbbreviationChip>(QUICK_SHORTHAND_CHIPS[0]);
  const [activeCountryIndex, setActiveCountryIndex] = useState<number>(0);
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCountry = EMERGENCY_NUMBERS[activeCountryIndex];
  const currentTip = PHARMACIST_TIPS[currentTipIndex];

  return (
    <footer className="relative z-30 mt-auto border-t border-slate-800 bg-slate-950 text-slate-200 text-xs sm:text-sm print:hidden pb-32 sm:pb-12 shadow-2xl overflow-hidden">
      {/* Decorative Top Multi-Color Glowing Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 via-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Upper Interactive Health & Safety Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Medical Disclaimer Banner */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <p className="leading-snug">
              <span className="font-bold text-amber-300 mr-1.5">Educational Medical Intelligence:</span>
              <span>This tool clarifies doctor penmanship & pharmacology. Never alter, discontinue, or initiate prescription doses without consulting your doctor or pharmacist.</span>
            </p>
          </div>

          {/* Quick Disclaimer Action Button */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('disclaimer');
              scrollToTop();
            }}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all shrink-0 cursor-pointer shadow-sm text-xs font-semibold"
          >
            <span>Full Safety Protocol</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Interactive Emergency Hotline & Global Support Selector */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-rose-950/20 via-slate-900/40 to-slate-900/40 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>Acute Medical Emergency or Suspected Drug Overdose?</span>
            </div>
          </div>

          {/* Interactive Country Switcher Pills */}
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-[11px] font-medium text-slate-400 mr-1 hidden sm:inline">Region:</span>
            {EMERGENCY_NUMBERS.map((country, idx) => (
              <button
                key={country.country}
                type="button"
                onClick={() => setActiveCountryIndex(idx)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  activeCountryIndex === idx
                    ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40 shadow-sm'
                    : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-750'
                }`}
              >
                <span>{country.flag}</span>
                <span className="hidden md:inline">{country.country}</span>
              </button>
            ))}

            <a
              href={`tel:${currentCountry.emergency.split('/')[0].trim()}`}
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <span>Call {currentCountry.emergency}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Middle Interactive Zone: Shorthand Decoder & Pharmacist Tips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Interactive Quick Prescription Shorthand Decoder Widget (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Interactive Doctor Penmanship Shorthand Decoder</span>
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Click to decode</span>
                </h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('abbreviations');
                  scrollToTop();
                }}
                className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>All 100+ Latin codes</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Shorthand Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {QUICK_SHORTHAND_CHIPS.map((chip) => (
                <button
                  key={chip.code}
                  type="button"
                  onClick={() => setSelectedChip(chip)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedChip.code === chip.code
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md scale-105 ring-2 ring-emerald-400/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {chip.code}
                </button>
              ))}
            </div>

            {/* Live Interactive Decoded Output Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                    {selectedChip.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    = {selectedChip.meaning}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-750">
                    {selectedChip.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-1">
                  💡 {selectedChip.note}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('abbreviations');
                  scrollToTop();
                }}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Lookup in Dictionary</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right: Daily Pharmacist Safety Tip (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    Pharmacist Clinical Rule
                  </h4>
                </div>

                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {currentTip.badge}
                </span>
              </div>

              <h5 className="text-xs sm:text-sm font-bold text-slate-100 mb-1.5">
                {currentTip.title}
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentTip.text}
              </p>
            </div>

            {/* Interactive Carousel Controls */}
            <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                {PHARMACIST_TIPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentTipIndex(i)}
                    aria-label={`View tip ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentTipIndex === i ? 'w-6 bg-indigo-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentTipIndex((prev) => (prev > 0 ? prev - 1 : PHARMACIST_TIPS.length - 1))}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-all"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTipIndex((prev) => (prev + 1) % PHARMACIST_TIPS.length)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow cursor-pointer transition-all"
                >
                  Next Tip →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sitemap & Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Clinical Principles (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <ThePrescriptionLogo size="sm" showWordmark={true} />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Clinical decision-support and patient empowerment platform. Decrypts illegible doctor handwriting into certified active generic salts, timing rules, and chronological schedules.
            </p>

            {/* Trust Badges */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-medium">Ephemeral Decryption (Zero storage of patient scans)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium">Multi-Key Neural Consensus Pipeline</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="font-medium">RapidFuzz Pharmacopeia Fuzzy Salt Mapping</span>
              </div>
            </div>
          </div>

          {/* Column 2: Clinical Tools (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-2.5 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clinical Tools</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('prescription');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                    activeTab === 'prescription'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Check Prescription</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('lookup');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                    activeTab === 'lookup'
                      ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-blue-400" />
                    <span>Medicine Directory & Generic Salts</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('abbreviations');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                    activeTab === 'abbreviations'
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    <span>Latin Shorthand Codes (1-0-1, BD)</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </li>
              {onOpenPrintModal && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenPrintModal}
                    className="w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group text-slate-300 hover:text-white hover:bg-slate-900"
                  >
                    <span className="flex items-center gap-2">
                      <Printer className="w-3.5 h-3.5 text-teal-400" />
                      <span>Print Patient Medication Schedule</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Information & Resources (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-2.5 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Knowledge & Support</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('faq');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                    activeTab === 'faq'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Frequently Asked Questions</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">26 FAQs</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('about');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                    activeTab === 'about'
                      ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Clinical Mission & Pharmacists</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('contact');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                    activeTab === 'contact'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Contact Clinical Support</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Safety & Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-2.5 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Safety & Legal</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('disclaimer');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'disclaimer'
                      ? 'text-rose-300 bg-rose-500/20 font-bold border border-rose-500/30'
                      : 'text-rose-300 hover:text-rose-200 hover:bg-rose-950/40'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Medical Disclaimer</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('privacy');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'privacy'
                      ? 'text-emerald-300 bg-emerald-500/20 font-bold border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('terms');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'terms'
                      ? 'text-indigo-300 bg-indigo-500/20 font-bold border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center flex-wrap gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} <strong className="text-white font-bold">Theprescription</strong>.</span>
            <span className="hidden sm:inline">•</span>
            <span>Healthcare Accessibility & Medication Safety</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational (30 RPM Engine)
            </span>
          </div>

          {/* Interactive Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-md hover:scale-105"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
