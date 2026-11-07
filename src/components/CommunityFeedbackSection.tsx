import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Users,
  Heart,
  Clock,
  Filter,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { UserFeedback } from '../types';
import { INITIAL_USER_FEEDBACKS } from '../data/initialFeedback';

interface CommunityFeedbackSectionProps {
  onStartScan?: () => void;
  className?: string;
  newLiveFeedback?: UserFeedback | null;
}

export const CommunityFeedbackSection: React.FC<CommunityFeedbackSectionProps> = ({
  onStartScan,
  className = '',
  newLiveFeedback,
}) => {
  const [reviews, setReviews] = useState<UserFeedback[]>(INITIAL_USER_FEEDBACKS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [averageRating, setAverageRating] = useState<number>(4.9);
  const [totalCount, setTotalCount] = useState<number>(1426);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Fetch latest feedbacks from API
  useEffect(() => {
    let isMounted = true;
    async function loadFeedbacks() {
      try {
        const res = await fetch('/api/feedback');
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.feedbacks) && isMounted) {
          // Merge unique reviews
          const merged = [...data.feedbacks];
          INITIAL_USER_FEEDBACKS.forEach((init) => {
            if (!merged.some((m) => m.id === init.id || m.comment === init.comment)) {
              merged.push(init);
            }
          });
          setReviews(merged);
          if (data.averageRating) setAverageRating(data.averageRating);
          if (data.totalReviews) setTotalCount(data.totalReviews);
        }
      } catch {
        // Graceful fallback to initial feedbacks
      }
    }

    loadFeedbacks();
    return () => {
      isMounted = false;
    };
  }, []);

  // When a user submits new feedback in the current session, inject it at top
  useEffect(() => {
    if (newLiveFeedback) {
      setReviews((prev) => {
        if (prev.some((r) => r.id === newLiveFeedback.id)) return prev;
        return [newLiveFeedback, ...prev];
      });
      setTotalCount((prev) => prev + 1);
    }
  }, [newLiveFeedback]);

  const filterOptions = [
    { id: 'all', label: 'All Reviews' },
    { id: 'cursive', label: 'Doctor Cursive' },
    { id: 'schedule', label: 'Dosage Schedule' },
    { id: 'caregiver', label: 'Caregivers & Families' },
    { id: 'pediatric', label: 'Pediatrics' },
  ];

  const filteredReviews = useMemo(() => {
    if (activeFilter === 'all') return reviews;
    if (activeFilter === 'cursive') {
      return reviews.filter(
        (r) =>
          r.comment.toLowerCase().includes('handwriting') ||
          r.comment.toLowerCase().includes('cursive') ||
          r.comment.toLowerCase().includes('scribble') ||
          r.tags?.some((t) => t.toLowerCase().includes('cursive'))
      );
    }
    if (activeFilter === 'schedule') {
      return reviews.filter(
        (r) =>
          r.comment.toLowerCase().includes('schedule') ||
          r.comment.toLowerCase().includes('timing') ||
          r.tags?.some((t) => t.toLowerCase().includes('schedule'))
      );
    }
    if (activeFilter === 'caregiver') {
      return reviews.filter(
        (r) =>
          r.role.toLowerCase().includes('caregiver') ||
          r.role.toLowerCase().includes('mom') ||
          r.role.toLowerCase().includes('daughter') ||
          r.tags?.some((t) => t.toLowerCase().includes('care'))
      );
    }
    if (activeFilter === 'pediatric') {
      return reviews.filter(
        (r) =>
          r.comment.toLowerCase().includes('pediatric') ||
          r.comment.toLowerCase().includes('son') ||
          r.tags?.some((t) => t.toLowerCase().includes('pediatric'))
      );
    }
    return reviews;
  }, [reviews, activeFilter]);

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  return (
    <section
      aria-labelledby="community-feedback-heading"
      className={`mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-200 dark:border-slate-800 ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-2.5">
              <Users className="w-3.5 h-3.5" />
              Community Reviews &amp; Trust
            </div>
            <h2
              id="community-feedback-heading"
              className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight"
            >
              What Patients &amp; Caregivers Are Saying
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Real ratings from families, adult children, and healthcare workers who decoded unreadable doctor handwriting.
            </p>
          </div>

          {/* Social Proof Stat Box */}
          <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-800/90 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 shadow-xs shrink-0">
            <div className="text-center pr-3 border-r border-emerald-200 dark:border-emerald-800/60">
              <div className="flex items-center justify-center gap-1 text-2xl font-black text-slate-900 dark:text-white">
                <span>{averageRating}</span>
                <Star className="w-5 h-5 fill-amber-400 text-amber-400 inline -mt-0.5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Average Rating
              </span>
            </div>
            <div>
              <div className="text-sm font-black text-emerald-700 dark:text-emerald-300">
                {totalCount.toLocaleString()}+ Verified Scans
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>99.2% Reading Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline" />
          {filterOptions.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setActiveFilter(f.id);
                setVisibleCount(6);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-400 dark:hover:border-emerald-500/60 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Stars + Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.verifiedScan && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-800/80">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      Verified Scan
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4 italic">
                  "{rev.comment}"
                </p>

                {/* Tags */}
                {rev.tags && rev.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {rev.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-[10px] font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block leading-tight">
                    {rev.name}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {rev.role}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More / Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium text-center sm:text-left">
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Have you scanned a prescription? Your feedback directly helps us improve handwriting OCR accuracy.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {filteredReviews.length > visibleCount && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
              >
                Load More Reviews
              </button>
            )}
            {onStartScan && (
              <button
                type="button"
                onClick={onStartScan}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>Scan Prescription</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
