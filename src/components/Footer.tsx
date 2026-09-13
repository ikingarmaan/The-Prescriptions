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
    <footer className="relative z-30 mt-auto border-t border-slate-700/70 bg-gradient-to-b from-slate-900 via-[#0b1626] to-[#07101e] text-slate-100 text-xs sm:text-sm print:hidden pb-32 sm:pb-12 shadow-2xl overflow-hidden">
      {/* Decorative Top Multi-Color Glowing Gradient Bar with Smooth Wave Animation */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-300 via-cyan-400 via-indigo-400 to-emerald-400 animate-gradient-shift shadow-[0_0_20px_rgba(52,211,153,0.5)]" />

      {/* Dynamic Animated Ambient Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[520px] h-[320px] bg-emerald-500/12 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-[520px] h-[320px] bg-cyan-500/12 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />

      {/* Upper Interactive Health & Safety Strip */}
      <div className="border-b border-slate-800/80 bg-slate-850/60 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Medical Disclaimer Banner */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <p className="leading-snug">
              <span className="font-bold text-amber-300 mr-1.5">Educational Medical Intelligence:</span>
              <span>This tool clarifies doctor penmanship &amp; pharmacology. Never alter, discontinue, or initiate prescription doses without consulting your doctor or pharmacist.</span>
            </p>
          </div>

          {/* Quick Disclaimer Action Button */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('disclaimer');
              scrollToTop();
            }}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-emerald-950/40 text-slate-200 hover:text-emerald-300 border border-slate-700/80 hover:border-emerald-500/40 transition-all shrink-0 cursor-pointer shadow-sm text-xs font-semibold hover:scale-102"
          >
            <span>Full Safety Protocol</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Interactive Emergency Hotline & Global Support Selector with ECG Animation */}
      <div className="border-b border-slate-800/70 bg-gradient-to-r from-rose-950/25 via-slate-850/50 to-slate-850/50 px-4 sm:px-6 lg:px-8 py-3 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
              <span>Acute Medical Emergency or Suspected Drug Overdose?</span>
            </div>

            {/* Cool Animated ECG Heartbeat Monitor Line */}
            <svg className="h-5 w-24 opacity-60 hidden xl:block ml-2" viewBox="0 0 120 24" fill="none">
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
                    ? 'bg-rose-500/25 text-rose-100 border border-rose-400/50 shadow-sm scale-105'
                    : 'bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700/70 hover:border-slate-600'
                }`}
              >
                <span>{country.flag}</span>
                <span className="hidden md:inline">{country.country}</span>
              </button>
            ))}

            <a
              href={`tel:${currentCountry.emergency.split('/')[0].trim()}`}
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Call {currentCountry.emergency}</span>
            </a>
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
              AI-powered assistant that deciphers doctor prescriptions into clear medicine names, dosage timings, and structured schedules.
            </p>

            {/* Trust Badges with interactive hover and glow */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-850/70 hover:bg-slate-800 border border-slate-750/70 hover:border-emerald-500/40 text-xs text-slate-200 transition-all hover:translate-x-1 shadow-2xs group">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:rotate-6 transition-transform" />
                <span className="font-medium">Ephemeral Decryption (Zero storage of patient scans)</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-850/70 hover:bg-slate-800 border border-slate-750/70 hover:border-cyan-500/40 text-xs text-slate-200 transition-all hover:translate-x-1 shadow-2xs group">
                <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Multi-Key Neural Consensus Pipeline</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-850/70 hover:bg-slate-800 border border-slate-750/70 hover:border-indigo-500/40 text-xs text-slate-200 transition-all hover:translate-x-1 shadow-2xs group">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 group-hover:rotate-12 transition-transform" />
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
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">62 FAQs</span>
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
      <div className="border-t border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center flex-wrap gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} <strong className="text-white font-bold">Theprescription</strong>.</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-300">Healthcare Accessibility &amp; Medication Safety</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-semibold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>All Systems Operational (30 RPM Engine)</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-300">
              Developed by{' '}
              <a
                href="https://mohdarmaan.up.railway.app/#home"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-400 hover:text-emerald-300 underline decoration-emerald-500/40 hover:decoration-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer hover:scale-105"
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
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
