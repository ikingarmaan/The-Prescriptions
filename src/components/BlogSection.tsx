import React, { useState, useEffect, useMemo } from 'react';
import {
  ALL_ARTICLES,
  BLOG_CATEGORIES,
  getArticleBySlug,
  getRelatedArticles,
  CategoryFilterItem,
} from '../data/blog/articlesIndex';
import { BlogArticle, BlogCategory } from '../data/blog/types';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  AlertTriangle,
  Info,
  ShieldAlert,
  Lightbulb,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Stethoscope,
  ChevronRight,
  Filter,
  FileText,
  Tag,
  ThumbsUp,
  Bookmark,
} from 'lucide-react';
import { trackBlogArticleView, trackPageView } from '../utils/analytics';

interface BlogSectionProps {
  onNavigateToScanner?: () => void;
  initialArticleSlug?: string | null;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onNavigateToScanner,
  initialArticleSlug,
}) => {
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(initialArticleSlug || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeTocId, setActiveTocId] = useState<string>('');

  // Synchronize with URL hash (e.g. #blog/doctor-handwriting-mystery)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '').split('?')[0];
        if (slug) {
          setSelectedArticleSlug(slug);
        }
      } else if (hash.includes('article=')) {
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const slug = params.get('article');
        if (slug) {
          setSelectedArticleSlug(slug);
        }
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Update hash when selecting an article
  const handleSelectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    window.location.hash = `blog/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticleSlug(null);
    window.location.hash = 'blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentArticle = useMemo(() => {
    if (!selectedArticleSlug) return null;
    return getArticleBySlug(selectedArticleSlug) || ALL_ARTICLES[0];
  }, [selectedArticleSlug]);

  // Track article views in Google Analytics
  useEffect(() => {
    if (currentArticle) {
      trackBlogArticleView(currentArticle.slug, currentArticle.title);
      trackPageView(`#blog/${currentArticle.slug}`, `${currentArticle.title} | Theprescription`);
    }
  }, [currentArticle?.slug]);

  // Filter articles for directory view
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((art) => {
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery =
        art.title.toLowerCase().includes(query) ||
        art.subtitle.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.tags.some((t) => t.toLowerCase().includes(query)) ||
        art.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_ARTICLES.length };
    for (const art of ALL_ARTICLES) {
      counts[art.category] = (counts[art.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Copy article link
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Track active section for table of contents
  useEffect(() => {
    if (!currentArticle) return;

    const handleScroll = () => {
      const sections = currentArticle.sections.map((s) => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveTocId(currentArticle.sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentArticle]);

  // Render callout icon and colors
  const renderCallout = (callout: { type: string; title: string; text: string }) => {
    switch (callout.type) {
      case 'danger':
      case 'emergency':
        return (
          <div className="my-6 p-5 rounded-2xl bg-rose-50/90 border-2 border-rose-400 text-rose-950 shadow-sm">
            <div className="flex items-center gap-2.5 font-bold text-rose-900 mb-2">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <span className="text-base">{callout.title}</span>
            </div>
            <p className="text-sm leading-relaxed text-rose-900/90">{callout.text}</p>
          </div>
        );
      case 'warning':
        return (
          <div className="my-6 p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-400 text-amber-950 shadow-sm">
            <div className="flex items-center gap-2.5 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-base">{callout.title}</span>
            </div>
            <p className="text-sm leading-relaxed text-amber-900/90">{callout.text}</p>
          </div>
        );
      case 'tip':
        return (
          <div className="my-6 p-5 rounded-2xl bg-emerald-50/90 border-2 border-emerald-400 text-emerald-950 shadow-sm">
            <div className="flex items-center gap-2.5 font-bold text-emerald-900 mb-2">
              <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-base">{callout.title}</span>
            </div>
            <p className="text-sm leading-relaxed text-emerald-900/90">{callout.text}</p>
          </div>
        );
      case 'clinical':
      case 'info':
      default:
        return (
          <div className="my-6 p-5 rounded-2xl bg-teal-50/90 border-2 border-teal-400 text-teal-950 shadow-sm">
            <div className="flex items-center gap-2.5 font-bold text-teal-900 mb-2">
              <Info className="w-5 h-5 text-teal-600 shrink-0" />
              <span className="text-base">{callout.title}</span>
            </div>
            <p className="text-sm leading-relaxed text-teal-900/90">{callout.text}</p>
          </div>
        );
    }
  };

  // ==========================================
  // ARTICLE READER VIEW
  // ==========================================
  if (currentArticle && selectedArticleSlug) {
    const relatedArticles = getRelatedArticles(currentArticle.id, 3);

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-20">
        {/* Top Header Bar / Breadcrumbs */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Articles</span>
            </button>

            <div className="flex items-center gap-3 text-xs">
              <span className="hidden sm:inline-block text-slate-400">
                {currentArticle.categoryLabel}
              </span>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 font-semibold transition-all cursor-pointer border border-teal-200"
                title="Copy article link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Article Hero Container */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          {/* Metadata Pill Row */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold mb-4">
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-200 font-bold uppercase tracking-wider text-[11px]">
              {currentArticle.categoryLabel}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {currentArticle.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              {currentArticle.wordCount.toLocaleString()} words
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {currentArticle.publishDate}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {currentArticle.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
            {currentArticle.subtitle}
          </p>

          {/* Author Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100/90 border border-slate-200/90">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white font-black text-base shadow-sm ring-2 ring-white">
                MA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <a
                    href={currentArticle.author.profileUrl || 'https://mohdarmaan.up.railway.app/#home'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm text-slate-900 hover:text-teal-600 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{currentArticle.author.name}</span>
                    <ExternalLink className="w-3 h-3 text-teal-600" />
                  </a>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Verified Author
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {currentArticle.author.role} & Clinical Informatics Advisory Team
                </p>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-500 hidden sm:block">
              <span className="block font-semibold text-slate-700">Clinical Review:</span>
              <span>Evidence-Based Pharmacology Standard</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 relative group">
            <img
              src={currentArticle.heroImage}
              alt={currentArticle.heroImageAlt}
              className="w-full aspect-video object-cover group-hover:scale-[1.01] transition-transform duration-500"
              loading="eager"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-4 text-xs text-slate-200">
              {currentArticle.heroImageAlt}
            </div>
          </div>
        </div>

        {/* Key Takeaways Box */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 text-white shadow-xl border border-teal-500/30">
            <div className="flex items-center gap-3 font-extrabold text-lg text-teal-300 mb-4">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <h2>Key Clinical Takeaways (At a Glance)</h2>
            </div>
            <ul className="space-y-3">
              {currentArticle.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content Layout (Sidebar TOC + Article Content) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Sidebar (TOC + Action Card) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-36 space-y-6">
            {/* Table of Contents */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-teal-600" />
                Table of Contents
              </h3>
              <nav className="space-y-1.5 text-xs">
                {currentArticle.tableOfContents.map((item) => {
                  const isActive = activeTocId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg transition-all leading-snug ${
                        isActive
                          ? 'bg-teal-50 text-teal-800 font-bold border-l-3 border-teal-600'
                          : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.title}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Quick Scanner Action Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-base mb-1.5">Decode Your Own Prescription</h4>
              <p className="text-xs text-teal-100 leading-relaxed mb-4">
                Upload a photo of your handwritten prescription slip to get plain-English generic salts, dosage schedules, and meal instructions.
              </p>
              <button
                onClick={onNavigateToScanner}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-teal-900 font-bold text-xs hover:bg-teal-50 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Launch Prescription Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>

          {/* Right Column: Article Text */}
          <article className="lg:col-span-8 space-y-12">
            {currentArticle.sections.map((section, sIdx) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                {/* Heading */}
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-5 pb-2 border-b border-slate-100 flex items-center gap-3">
                  <span className="w-2 h-6 rounded-full bg-teal-500 inline-block shrink-0" />
                  <span>{section.heading}</span>
                </h2>

                {/* Paragraphs */}
                <div className="space-y-4 text-slate-700 leading-relaxed text-base">
                  {section.content.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      dangerouslySetInnerHTML={{ __html: para }}
                      className="font-normal text-slate-700 leading-relaxed"
                    />
                  ))}
                </div>

                {/* Callout Box if present */}
                {section.callout && renderCallout(section.callout)}

                {/* Table if present */}
                {section.table && (
                  <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
                      <thead>
                        <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200 font-bold">
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-3 px-4 sm:px-5 uppercase tracking-wider text-[11px]">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {section.table.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={rIdx % 2 === 0 ? 'bg-white hover:bg-teal-50/40' : 'bg-slate-50/60 hover:bg-teal-50/40'}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`py-3 px-4 sm:px-5 ${
                                  cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-700'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Blockquote if present */}
                {section.quote && (
                  <blockquote className="my-8 p-6 rounded-2xl bg-gradient-to-r from-teal-500/10 via-slate-100 to-transparent border-l-4 border-teal-600 text-slate-800 italic">
                    <p className="text-base sm:text-lg font-medium mb-2 leading-relaxed">
                      “{section.quote.text}”
                    </p>
                    <footer className="text-xs font-bold text-teal-800 uppercase tracking-wider not-italic">
                      — {section.quote.author}
                    </footer>
                  </blockquote>
                )}
              </section>
            ))}

            {/* Tags Row */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
                  <Tag className="w-3.5 h-3.5" /> Tags:
                </span>
                {currentArticle.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-teal-50 hover:text-teal-700 transition-colors cursor-default border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Medical Disclaimer Banner */}
            <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-sm">
              <div className="flex items-center gap-3 font-bold text-amber-900 mb-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <h4 className="text-sm uppercase tracking-wider">Required Clinical Notice</h4>
              </div>
              <p className="text-xs leading-relaxed text-amber-900/90">
                {currentArticle.medicalDisclaimer}
              </p>
            </div>

            {/* Author Bio Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-md">
                MA
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-slate-900">
                    Written by {currentArticle.author.name}
                  </h4>
                  <a
                    href={currentArticle.author.profileUrl || 'https://mohdarmaan.up.railway.app/#home'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline inline-flex items-center gap-1"
                  >
                    View Portfolio <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentArticle.author.role}. Dedicated to bridging the clinical divide between physicians, pharmacists, and everyday patients through ethical artificial intelligence and high-clarity health informatics.
                </p>
                <p className="text-[11px] text-slate-400">
                  Clinical inquiries & corrections: <a href="mailto:theprescriptionn@gmail.com" className="text-teal-600 font-semibold hover:underline">theprescriptionn@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Bottom CTA Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white shadow-2xl text-center space-y-4 border border-teal-500/30">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Have a Doctor Prescription to Read Right Now?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Take a quick photo of your prescription slip. Our intelligent clinical OCR engine will decode the cursive handwriting, verify active generic salts, and organize your daily medicine schedule in seconds.
              </p>
              <div className="pt-2">
                <button
                  onClick={onNavigateToScanner}
                  className="py-3 px-8 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg hover:shadow-teal-500/25 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Analyze Prescription Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Related Articles Carousel / Grid */}
            <div className="pt-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <span>Related Clinical Guides</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => handleSelectArticle(rel.slug)}
                    className="group cursor-pointer rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={rel.heroImage}
                        alt={rel.heroImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-teal-700 tracking-wider">
                          {rel.categoryLabel}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 mt-1">
                          {rel.title}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                        <span>{rel.readTime}</span>
                        <span className="text-teal-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // ==========================================
  // CATALOG / DIRECTORY VIEW (ALL 17 ARTICLES)
  // ==========================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Main Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Clinical & Health Literacy Journal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Evidence-Based Medical & Prescription Guides
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Explore 17 comprehensive, human-written clinical guides to decoding doctor handwriting, understanding generic bioequivalence, preventing fatal drug interactions, and protecting your family’s medication safety.
          </p>
        </div>

        {/* Search Bar & Stats */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, drug name, abbreviation (e.g., OD, BD, statin, allergy)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg cursor-pointer transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {BLOG_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/25'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Spotlight Featured Article (Article 01) if viewing 'all' and no search */}
        {selectedCategory === 'all' && !searchQuery && (
          <div
            onClick={() => handleSelectArticle(ALL_ARTICLES[0].slug)}
            className="group cursor-pointer rounded-3xl bg-white border border-slate-200/90 shadow-lg hover:shadow-xl transition-all overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0"
          >
            <div className="md:col-span-7 aspect-video md:aspect-auto overflow-hidden bg-slate-900 relative">
              <img
                src={ALL_ARTICLES[0].heroImage}
                alt={ALL_ARTICLES[0].heroImageAlt}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-teal-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                Featured Spotlight
              </div>
            </div>
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
                  <span>{ALL_ARTICLES[0].categoryLabel}</span>
                  <span>•</span>
                  <span>{ALL_ARTICLES[0].readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug">
                  {ALL_ARTICLES[0].title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                  {ALL_ARTICLES[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px]">
                    MA
                  </div>
                  <span className="font-semibold">{ALL_ARTICLES[0].author.name}</span>
                </div>
                <span className="text-teal-600 font-bold text-xs group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filtered Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">
              {selectedCategory === 'all' && !searchQuery
                ? 'All Clinical & Patient Guides (17)'
                : `Matching Articles (${filteredArticles.length})`}
            </h2>
            <span className="text-xs text-slate-500">
              Showing {filteredArticles.length} of {ALL_ARTICLES.length} guides
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-base text-slate-800">No articles found matching your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for different keywords like 'generic', 'antibiotics', 'timing', or clear your category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => handleSelectArticle(article.slug)}
                  className="group cursor-pointer rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between hover:-translate-y-1 duration-200"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={article.heroImage}
                        alt={article.heroImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                        {article.categoryLabel}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                        <span>•</span>
                        <span>{article.wordCount} words</span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-600 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                        MA
                      </div>
                      <span className="font-medium text-[11px]">{article.author.name}</span>
                    </div>

                    <span className="text-teal-600 font-bold text-xs group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Article <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Global Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 text-white shadow-xl text-center space-y-4 border border-teal-500/30">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-World Healthcare Literacy In Action</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Never Struggle with Illegible Doctor Prescriptions Again
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our platform decodes physician handwriting in seconds, validates active generic salts, and produces plain-English daily schedules. Free, secure, and accessible on any smartphone.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToScanner}
              className="py-3 px-8 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-sm transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
            >
              <span>Try The Prescription Scanner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
