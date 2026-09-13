import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Lock,
  FileText,
  Clock,
  CheckCircle2,
  X,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { FAQ_DATABASE, FAQItem } from '../data/faqData';

interface FaqSectionProps {
  variant?: 'homepage' | 'full';
  onNavigateToTab?: (tab: string) => void;
  defaultExpandedIndex?: number | null;
}

// 4 high-priority featured FAQs selected for the homepage
const HOMEPAGE_FEATURED_IDS = ['faq-1', 'faq-2', 'faq-3', 'faq-6'];

export const FaqSection: React.FC<FaqSectionProps> = ({
  variant = 'homepage',
  onNavigateToTab,
  defaultExpandedIndex = 0,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [homepageShowAll, setHomepageShowAll] = useState(false);

  // Set initial expanded item
  const [expandedId, setExpandedId] = useState<string | null>(() => {
    if (variant === 'homepage') {
      return HOMEPAGE_FEATURED_IDS[0]; // expand the first featured question
    }
    return defaultExpandedIndex !== null && FAQ_DATABASE[defaultExpandedIndex]
      ? FAQ_DATABASE[defaultExpandedIndex].id
      : null;
  });

  const categories = [
    'All',
    'Popular',
    'Technology & Recognition',
    'Dosage & Doctor Codes',
    'Clinical Safety & Protocols',
    'Medicine Storage & Disposal',
    'Privacy & Data',
    'Features & Usage',
  ];

  // For the homepage, only show 4 featured items unless the user toggles show all
  const displayedFaqs = useMemo(() => {
    if (variant === 'homepage' && !homepageShowAll && !searchQuery.trim()) {
      return FAQ_DATABASE.filter((item) => HOMEPAGE_FEATURED_IDS.includes(item.id));
    }

    return FAQ_DATABASE.filter((item) => {
      // Category filter
      if (selectedCategory === 'Popular' && !item.popular) {
        return false;
      }
      if (
        selectedCategory !== 'All' &&
        selectedCategory !== 'Popular' &&
        item.category !== selectedCategory
      ) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [variant, homepageShowAll, searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technology & Recognition':
        return <Sparkles className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Dosage & Doctor Codes':
        return <Clock className="w-3.5 h-3.5 text-blue-600" />;
      case 'Clinical Safety & Protocols':
        return <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />;
      case 'Medicine Storage & Disposal':
        return <Stethoscope className="w-3.5 h-3.5 text-amber-600" />;
      case 'Privacy & Data':
        return <Lock className="w-3.5 h-3.5 text-cyan-600" />;
      case 'Features & Usage':
      default:
        return <FileText className="w-3.5 h-3.5 text-purple-600" />;
    }
  };

  return (
    <section
      id="faq-section"
      className={`w-full ${
        variant === 'homepage'
          ? 'mt-12 pt-10 border-t border-slate-300'
          : 'max-w-4xl mx-auto'
      }`}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-extrabold border border-emerald-300 shadow-2xs">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>Prescription FAQs & Safety Guidance</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto font-medium">
          {variant === 'homepage'
            ? 'Quick answers to top questions on deciphering doctor handwriting, understanding 1-0-1 dosage codes, and our encrypted privacy protections.'
            : `Explore our complete knowledge base of ${FAQ_DATABASE.length} verified answers covering prescription parsing, doctor Latin codes, pharmacology accuracy, medication safety protocols, and patient privacy.`}
        </p>
      </div>

      {/* Interactive Controls (Full view or when user searches on homepage) */}
      {variant === 'full' && (
        <div className="w-full mx-auto space-y-4 mb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by symptom, medicine name, Latin code (e.g. 1-0-1, AC), or question..."
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills with live question counts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? FAQ_DATABASE.length
                  : cat === 'Popular'
                  ? FAQ_DATABASE.filter((i) => i.popular).length
                  : FAQ_DATABASE.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat === 'Popular' && '🔥 '}
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive
                        ? 'bg-slate-700 text-emerald-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 px-1">
            <span>
              Showing <strong className="text-slate-900 font-bold">{displayedFaqs.length}</strong> of{' '}
              {FAQ_DATABASE.length} questions
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-emerald-700 hover:underline font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Accordion Questions List (Showing 4 on homepage by default) */}
      <div className="w-full mx-auto space-y-3">
        {displayedFaqs.map((faq) => {
          const isOpen = expandedId === faq.id;
          return (
            <div
              key={faq.id}
              className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/25'
                  : 'border-slate-300 shadow-2xs hover:border-slate-400'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                      {getCategoryIcon(faq.category)}
                      <span>{faq.category}</span>
                    </span>
                    {faq.popular && (
                      <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-300 px-1.5 py-0.2 rounded-md">
                        Key Question
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-bold text-sm sm:text-base leading-snug ${
                      isOpen ? 'text-emerald-950 font-black' : 'text-slate-900'
                    }`}
                  >
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-200 bg-emerald-50/30">
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line space-y-2 font-medium">
                    {faq.answer}
                  </div>

                  {/* Contextual Quick Links based on category */}
                  {onNavigateToTab && (
                    <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3 text-xs">
                      {faq.category === 'Dosage & Doctor Codes' && (
                        <button
                          type="button"
                          onClick={() => onNavigateToTab('abbreviations')}
                          className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold hover:underline cursor-pointer"
                        >
                          <span>Explore Doctor Codes Dictionary</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {faq.category === 'Technology & Recognition' && (
                        <button
                          type="button"
                          onClick={() => onNavigateToTab('lookup')}
                          className="inline-flex items-center gap-1 text-blue-800 hover:text-blue-950 font-bold hover:underline cursor-pointer"
                        >
                          <span>Search Medicine & Generic Salts</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {faq.category === 'Clinical Safety' && (
                        <button
                          type="button"
                          onClick={() => onNavigateToTab('disclaimer')}
                          className="inline-flex items-center gap-1 text-rose-800 hover:text-rose-950 font-bold hover:underline cursor-pointer"
                        >
                          <span>Read Medical Safety Disclaimer</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Homepage specific: Clear Call-To-Action to View All Questions */}
      {variant === 'homepage' && (
        <div className="w-full mx-auto mt-6 bg-slate-900 text-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center justify-center sm:justify-start gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Showing 4 of {FAQ_DATABASE.length} Medical FAQs</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Have questions about drug interactions, pediatric doses, Latin codes, or e-prescriptions?
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onNavigateToTab ? (
              <button
                type="button"
                onClick={() => onNavigateToTab('faq')}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-2"
              >
                <span>View All {FAQ_DATABASE.length} Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setHomepageShowAll(!homepageShowAll)}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-2"
              >
                <span>{homepageShowAll ? 'Show 4 FAQs' : `Expand All ${FAQ_DATABASE.length} FAQs`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Full variant footer card */}
      {variant === 'full' && (
        <div className="max-w-3xl mx-auto mt-8 p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold text-emerald-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Still have an unanswered question?</span>
            </div>
            <div className="text-sm font-bold text-white">
              Our clinical informatics team is available to assist.
            </div>
            <div className="text-xs text-slate-300">
              Submit prescription samples or suggest regional drug name additions.
            </div>
          </div>
          {onNavigateToTab && (
            <button
              type="button"
              onClick={() => onNavigateToTab('contact')}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
