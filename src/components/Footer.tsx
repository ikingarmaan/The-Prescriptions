import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Lock,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  HelpCircle,
  FileText,
  Search,
  BookOpen,
  Printer,
  ChevronRight,
  Info,
  Mail,
  Activity,
  Zap,
  Globe,
  AlertTriangle,
  ExternalLink,
  Newspaper,
} from 'lucide-react';
import { ThePrescriptionLogo } from './ThePrescriptionLogo';
import { AppNavTab } from './Navbar';

interface FooterProps {
  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
  onOpenPrintModal?: () => void;
}

const EMERGENCY_NUMBERS = [
  { country: 'India', flag: '🇮🇳', emergency: '112 / 108', poison: '1800-116-117' },
  { country: 'United States', flag: '🇺🇸', emergency: '911', poison: '1-800-222-1222' },
  { country: 'United Kingdom', flag: '🇬🇧', emergency: '999 / 111', poison: '111' },
  { country: 'European Union', flag: '🇪🇺', emergency: '112', poison: '112' },
  { country: 'Canada', flag: '🇨🇦', emergency: '911', poison: '1-844-POISON-X' },
  { country: 'Australia', flag: '🇦🇺', emergency: '000', poison: '13 11 26' },
];

export const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab, onOpenPrintModal }) => {
  const [activeCountryIndex, setActiveCountryIndex] = useState<number>(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCountry = EMERGENCY_NUMBERS[activeCountryIndex];

  return (
    <footer className="relative z-30 mt-auto border-t border-slate-700/70 bg-gradient-to-b from-slate-900 via-[#0b1626] to-[#07101e] text-slate-100 text-xs sm:text-sm print:hidden pb-20 md:pb-6 shadow-2xl overflow-hidden">
      {/* Decorative Top Multi-Color Glowing Gradient Bar (GPU-composited translate3d) */}
      <div className="h-1.5 w-full overflow-hidden relative shadow-[0_0_20px_rgba(52,211,153,0.5)]">
        <div className="absolute inset-y-0 -left-[50%] w-[200%] bg-gradient-to-r from-emerald-400 via-teal-300 via-cyan-400 via-indigo-400 to-emerald-400 animate-gpu-slide" />
      </div>

      {/* Dynamic Animated Ambient Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[480px] h-[280px] bg-emerald-500/10 rounded-full blur-[90px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-[480px] h-[280px] bg-cyan-500/10 rounded-full blur-[90px] animate-pulse-glow pointer-events-none" />

      {/* 1. Upper Medical Intelligence & Disclaimer Strip */}
      <div className="border-b border-slate-800/80 bg-slate-850/60 backdrop-blur-md px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4">
          {/* Medical Disclaimer Banner */}
          <div className="flex items-center gap-2.5 text-xs text-slate-200">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 shadow-xs animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <p className="leading-snug text-[11px] sm:text-xs">
              <span className="font-bold text-amber-300 mr-1">Educational Medical Intelligence:</span>
              <span>Clarifies penmanship &amp; pharmacology. Never alter doses without your doctor or pharmacist.</span>
            </p>
          </div>

          {/* Quick Disclaimer Action Button */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('disclaimer');
              scrollToTop();
            }}
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-emerald-950/40 text-slate-200 hover:text-emerald-300 border border-slate-700/80 hover:border-emerald-500/40 transition-all shrink-0 cursor-pointer shadow-xs text-[11px] sm:text-xs font-semibold self-end sm:self-center"
          >
            <span>Full Safety Protocol</span>
            <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Emergency Hotline Strip */}
      <div className="border-b border-slate-800/70 bg-gradient-to-r from-rose-950/30 via-slate-850/50 to-slate-850/50 px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <PhoneCall className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">Acute Emergency or Overdose?</span>

            {/* Animated ECG Monitor Line on Desktop */}
            <svg className="h-4 w-20 opacity-60 hidden xl:block ml-1" viewBox="0 0 120 24" fill="none">
              <path
                d="M0 12 H35 L42 4 L48 20 L54 6 L60 16 L65 12 H120"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-400 animate-ecg-pulse"
              />
            </svg>
          </div>

          {/* Region Switcher & Direct Call Action */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 mr-0.5 shrink-0">Region:</span>
            {EMERGENCY_NUMBERS.map((country, idx) => (
              <button
                key={country.country}
                type="button"
                onClick={() => setActiveCountryIndex(idx)}
                className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeCountryIndex === idx
                    ? 'bg-rose-500/30 text-rose-100 border border-rose-400/60 shadow-xs scale-102'
                    : 'bg-slate-800/70 text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>{country.flag}</span>
                <span className="hidden md:inline">{country.country}</span>
              </button>
            ))}

            <a
              href={`tel:${currentCountry.emergency.split('/')[0].trim()}`}
              className="ml-auto sm:ml-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] sm:text-xs shadow-xs transition-all shrink-0 cursor-pointer active:scale-95"
            >
              <span>Call {currentCountry.emergency}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Main Sitemap & Navigation Grid */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-8">
          
          {/* Column 1: Brand & Trust Badges (4 cols desktop) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <ThePrescriptionLogo size="md" showWordmark={true} variant="dark" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              AI-powered assistant that deciphers doctor prescriptions into clear medicine names, dosage timings, and structured schedules.
            </p>

            {/* Trust Badges - compact on mobile, full on desktop */}
            <div className="grid grid-cols-1 gap-1.5 pt-0.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-850/60 border border-slate-750/70 text-[11px] text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Ephemeral Decryption (Zero storage of patient scans)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-850/60 border border-slate-750/70 text-[11px] text-slate-300">
                <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Multi-Key Neural Consensus Pipeline</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-850/60 border border-slate-750/70 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">RapidFuzz Pharmacopeia Fuzzy Salt Mapping</span>
              </div>
            </div>
          </div>

          {/* Columns 2 & 3: Clinical Tools & Support (Side-by-side on mobile, dedicated on desktop) */}
          <div className="grid grid-cols-2 lg:contents gap-3 sm:gap-6">
            
            {/* Column 2: Clinical Tools (3 cols desktop) */}
            <div className="lg:col-span-3 space-y-2.5">
              <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-1.5 sm:pb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Clinical Tools</span>
              </h4>
              <ul className="space-y-1 sm:space-y-1.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('prescription');
                      scrollToTop();
                    }}
                    className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-between group ${
                      activeTab === 'prescription'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Check Prescription</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline-block group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('lookup');
                      scrollToTop();
                    }}
                    className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-between group ${
                      activeTab === 'lookup'
                        ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">Medicine Directory</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline-block group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('abbreviations');
                      scrollToTop();
                    }}
                    className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-between group ${
                      activeTab === 'abbreviations'
                        ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">Latin Codes (BD, 1-0-1)</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline-block group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('blog');
                      scrollToTop();
                    }}
                    className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-between group ${
                      activeTab === 'blog'
                        ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Newspaper className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">Articles & Guides (17)</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline-block group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </li>
                {onOpenPrintModal && (
                  <li>
                    <button
                      type="button"
                      onClick={onOpenPrintModal}
                      className="w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-between group text-slate-300 hover:text-white hover:bg-slate-850"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <Printer className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="truncate">Print Schedule</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline-block group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 3: Knowledge & Support (3 cols desktop) */}
            <div className="lg:col-span-3 space-y-2.5">
              <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-1.5 sm:pb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Knowledge &amp; Support</span>
              </h4>
              <ul className="space-y-1 sm:space-y-1.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('faq');
                      scrollToTop();
                    }}
                    className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-between group ${
                      activeTab === 'faq'
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">Medical FAQs</span>
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">62</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('about');
                      scrollToTop();
                    }}
                    className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-between group ${
                      activeTab === 'about'
                        ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">Clinical Mission</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline-block group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('contact');
                      scrollToTop();
                    }}
                    className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-between group ${
                      activeTab === 'contact'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Contact Support</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:inline-block group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:Theprescriptionn@gmail.com"
                    className="w-full text-left font-mono text-[11px] p-1 sm:p-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-slate-850 transition-all flex items-center justify-between border border-emerald-500/20 group"
                    title="Direct Email Support"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Theprescriptionn@gmail.com</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 shrink-0 transition-colors hidden sm:inline-block" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Safety & Legal (2 cols desktop, horizontal pills on mobile) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-2.5 pt-2 md:pt-0 border-t border-slate-800/80 md:border-t-0">
            <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-1.5 sm:pb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Safety &amp; Legal</span>
            </h4>
            <ul className="flex flex-wrap lg:flex-col gap-1.5 lg:gap-1.5 text-xs">
              <li className="flex-1 min-w-[120px] lg:w-full">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('disclaimer');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'disclaimer'
                      ? 'text-rose-300 bg-rose-500/20 font-bold border border-rose-500/30'
                      : 'text-rose-300 hover:text-rose-200 hover:bg-rose-950/40'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">Medical Disclaimer</span>
                </button>
              </li>
              <li className="flex-1 min-w-[110px] lg:w-full">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('privacy');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'privacy'
                      ? 'text-emerald-300 bg-emerald-500/20 font-bold border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Privacy Policy</span>
                </button>
              </li>
              <li className="flex-1 min-w-[110px] lg:w-full">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('terms');
                    scrollToTop();
                  }}
                  className={`w-full text-left font-semibold p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'terms'
                      ? 'text-indigo-300 bg-indigo-500/20 font-bold border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate">Terms &amp; Conditions</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Bottom Interactive Bar */}
      <div className="border-t border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-3.5 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs text-slate-300">
          <div className="flex items-center flex-wrap justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()}{' '}
              <strong className="text-white font-black tracking-tight inline-flex items-center drop-shadow-sm">
                <span className="text-white">The</span>
                <span className="text-emerald-400">prescription</span>
              </strong>
              .
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-300 hidden sm:inline">Healthcare Accessibility &amp; Medication Safety</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-semibold text-[11px] shadow-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span>All Systems Operational (30 RPM Engine)</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">
              Developed by{' '}
              <a
                href="https://mohdarmaan.up.railway.app/#home"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-400 hover:text-emerald-300 underline decoration-emerald-500/40 hover:decoration-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                Mohd Armaan
                <ExternalLink className="w-3 h-3 inline-block opacity-80" />
              </a>
            </span>
          </div>

          {/* Interactive Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs active:scale-95 text-[11px] sm:text-xs font-semibold shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
