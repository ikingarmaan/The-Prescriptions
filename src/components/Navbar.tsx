import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Search,
  BookOpen,
  Printer,
  ChevronDown,
  Info,
  HelpCircle,
  Mail,
  ShieldAlert,
  Lock,
  FileCheck,
  Menu,
  X,
  Newspaper,
} from 'lucide-react';
import { ThePrescriptionLogo } from './ThePrescriptionLogo';
import { ThemeToggle } from './ThemeToggle';

export type AppNavTab =
  | 'prescription'
  | 'lookup'
  | 'abbreviations'
  | 'blog'
  | 'about'
  | 'faq'
  | 'contact'
  | 'disclaimer'
  | 'privacy'
  | 'terms';

interface NavbarProps {
  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
  hasResult: boolean;
  onOpenPrintModal: () => void;
  hideOtherTabs?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  hasResult,
  onOpenPrintModal,
  hideOtherTabs = false,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  interface InfoPageItem {
    id: 'about' | 'faq' | 'contact' | 'disclaimer' | 'privacy' | 'terms';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    desc: string;
    alert?: boolean;
  }

  const infoPages: InfoPageItem[] = [
    { id: 'about', label: 'About Us', icon: Info, desc: 'Our mission & clinical AI principles' },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, desc: 'Prescription reading & accuracy questions' },
    { id: 'disclaimer', label: 'Medical Disclaimer', icon: ShieldAlert, desc: 'Critical healthcare safety notices', alert: true },
    { id: 'contact', label: 'Contact Us', icon: Mail, desc: 'Feedback, support & pharmacist inquiries' },
    { id: 'privacy', label: 'Privacy Policy', icon: Lock, desc: 'Encrypted ephemeral data handling' },
    { id: 'terms', label: 'Terms & Conditions', icon: FileCheck, desc: 'Usage guidelines & terms' },
  ];

  const isInfoPageActive = ['about', 'faq', 'contact', 'disclaimer', 'privacy', 'terms'].includes(activeTab);

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors duration-150">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Logo and Brand */}
          <div
            onClick={() => {
              setActiveTab('prescription');
              setIsMobileMenuOpen(false);
            }}
            className="cursor-pointer select-none py-1 group"
          >
            <ThePrescriptionLogo size="md" showWordmark={true} />
          </div>

          {/* Desktop Navigation Tabs */}
          {!hideOtherTabs && (
            <nav className="hidden md:flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 text-xs shadow-2xs gap-1">
              <button
                id="nav-check-prescription"
                type="button"
                onClick={() => setActiveTab('prescription')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all min-h-[40px] cursor-pointer ${
                  activeTab === 'prescription'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-600/25 ring-1 ring-emerald-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/70 dark:hover:bg-slate-750'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    activeTab === 'prescription' ? 'bg-white/20 text-white' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span>Check Prescription</span>
              </button>

              <button
                id="nav-medicine-lookup"
                type="button"
                onClick={() => setActiveTab('lookup')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all min-h-[40px] cursor-pointer ${
                  activeTab === 'lookup'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-600/25 ring-1 ring-blue-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50/70 dark:hover:bg-slate-750'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    activeTab === 'lookup' ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                </div>
                <span>Medicine Lookup</span>
              </button>

              <button
                id="nav-abbreviations"
                type="button"
                onClick={() => setActiveTab('abbreviations')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all min-h-[40px] cursor-pointer ${
                  activeTab === 'abbreviations'
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-sm shadow-purple-600/25 ring-1 ring-purple-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-purple-50/70 dark:hover:bg-slate-750'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    activeTab === 'abbreviations' ? 'bg-white/20 text-white' : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <span>Doctor Codes</span>
              </button>

              <button
                id="nav-blog"
                type="button"
                onClick={() => setActiveTab('blog')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all min-h-[40px] cursor-pointer ${
                  activeTab === 'blog'
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm shadow-teal-600/25 ring-1 ring-teal-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-teal-50/70 dark:hover:bg-slate-750'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    activeTab === 'blog' ? 'bg-white/20 text-white' : 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400'
                  }`}
                >
                  <Newspaper className="w-3.5 h-3.5" />
                </div>
                <span>Articles & Guides</span>
              </button>

              {/* Pages Dropdown (About, FAQ, Disclaimer, Contact, Privacy, Terms) */}
              <div className="relative" ref={dropdownRef}>
                <button
                  id="nav-more-pages-btn"
                  type="button"
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold transition-all min-h-[40px] cursor-pointer ${
                    isInfoPageActive
                      ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs border border-slate-200 dark:border-slate-600'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <span>More Pages</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[10px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500">
                      Information & Legal
                    </div>
                    {infoPages.map((page) => {
                      const Icon = page.icon;
                      const isCurrent = activeTab === page.id;
                      return (
                        <button
                          key={page.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(page.id);
                            setIsMoreMenuOpen(false);
                          }}
                          className={`w-full px-3 py-2.5 text-left flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer ${
                            isCurrent ? 'bg-emerald-50/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold' : 'text-slate-700 dark:text-slate-250'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                              page.alert
                                ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                                : isCurrent
                                ? 'bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                              <span className="text-slate-900 dark:text-slate-100">{page.label}</span>
                              {page.alert && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-extrabold">
                                  Notice
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-normal leading-tight mt-0.5">
                              {page.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>
          )}

          {/* Right Action Header Buttons */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Theme Toggle Button */}
            <ThemeToggle />

            {!hideOtherTabs && hasResult && activeTab === 'prescription' && (
              <button
                id="nav-print-card-btn"
                type="button"
                onClick={onOpenPrintModal}
                className="px-3 py-2 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 active:bg-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-xl border border-emerald-200 dark:border-emerald-800/60 transition-colors flex items-center gap-1.5 min-h-[40px] cursor-pointer"
                title="Print Medication Card"
              >
                <Printer className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span className="hidden sm:inline">Print Medication Card</span>
                <span className="sm:hidden text-xs font-bold">Print</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            {!hideOtherTabs && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Full Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-4 animate-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('prescription');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 text-[11px] font-bold ${
                  activeTab === 'prescription' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="truncate">Scan</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('lookup');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 text-[11px] font-bold ${
                  activeTab === 'lookup' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="truncate">Lookup</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('abbreviations');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 text-[11px] font-bold ${
                  activeTab === 'abbreviations' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="truncate">Codes</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('blog');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 text-[11px] font-bold ${
                  activeTab === 'blog' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span className="truncate">Articles</span>
              </button>
            </div>

            {/* Theme Toggle row in Mobile Drawer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Appearance Mode</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Switch between light and dark theme</span>
              </div>
              <ThemeToggle showLabel={true} />
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Pages & Policies
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {infoPages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(page.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-left flex items-center gap-2 font-medium ${
                      activeTab === page.id
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <page.icon className="w-3.5 h-3.5 shrink-0 text-slate-500 dark:text-slate-400" />
                    <span className="truncate">{page.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Navigation Bar */}
      {!hideOtherTabs && (
        <nav
          id="mobile-bottom-nav"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center justify-around shadow-lg transition-colors duration-150"
        >
          <button
            id="mobile-nav-prescription"
            type="button"
            onClick={() => setActiveTab('prescription')}
            className={`flex flex-col items-center justify-center min-w-[70px] min-h-[48px] py-1.5 px-2 rounded-xl transition-all ${
              activeTab === 'prescription'
                ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/50'
                : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className={`w-5 h-5 mb-0.5 ${activeTab === 'prescription' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
            <span className="text-[11px] leading-tight">Prescription</span>
          </button>

          <button
            id="mobile-nav-lookup"
            type="button"
            onClick={() => setActiveTab('lookup')}
            className={`flex flex-col items-center justify-center min-w-[70px] min-h-[48px] py-1.5 px-2 rounded-xl transition-all ${
              activeTab === 'lookup'
                ? 'text-blue-700 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/50'
                : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Search className={`w-5 h-5 mb-0.5 ${activeTab === 'lookup' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
            <span className="text-[11px] leading-tight">Lookup</span>
          </button>

          <button
            id="mobile-nav-abbreviations"
            type="button"
            onClick={() => setActiveTab('abbreviations')}
            className={`flex flex-col items-center justify-center min-w-[55px] min-h-[48px] py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'abbreviations'
                ? 'text-purple-700 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-950/50 border border-purple-200/80 dark:border-purple-800/50'
                : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className={`w-5 h-5 mb-0.5 ${activeTab === 'abbreviations' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-slate-500'}`} />
            <span className="text-[10px] leading-tight">Codes</span>
          </button>

          <button
            id="mobile-nav-blog"
            type="button"
            onClick={() => setActiveTab('blog')}
            className={`flex flex-col items-center justify-center min-w-[55px] min-h-[48px] py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'blog'
                ? 'text-teal-700 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-950/50 border border-teal-200/80 dark:border-teal-800/50'
                : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Newspaper className={`w-5 h-5 mb-0.5 ${activeTab === 'blog' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}`} />
            <span className="text-[10px] leading-tight">Articles</span>
          </button>

          <button
            id="mobile-nav-more"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col items-center justify-center min-w-[70px] min-h-[48px] py-1.5 px-2 rounded-xl transition-all ${
              isInfoPageActive || isMobileMenuOpen
                ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/50'
                : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Menu className="w-5 h-5 mb-0.5 text-slate-400 dark:text-slate-500" />
            <span className="text-[11px] leading-tight">Pages</span>
          </button>
        </nav>
      )}
    </>
  );
};
