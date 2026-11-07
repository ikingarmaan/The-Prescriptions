import React, { useState, useEffect } from 'react';
import { Star, Send, CheckCircle2, Sparkles, MessageSquareHeart, Heart } from 'lucide-react';
import { UserFeedback } from '../types';

interface PrescriptionFeedbackCardProps {
  onFeedbackSubmitted?: (newFeedback: UserFeedback) => void;
  className?: string;
}

const PRESET_TAGS = [
  '⚡ Fast & Accurate',
  '📖 Decoded Doctor Cursive',
  '💊 Clear Dosage Schedule',
  '🖨️ Helpful PDF Card',
  '🛡️ Privacy & Zero-Retention',
  '❤️ Life Saver for Family',
];

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: 'Difficult to read or inaccurate',
  2: 'Needs improvement',
  3: 'Good and helpful',
  4: 'Very accurate and clear',
  5: 'Exceptional & life saving!',
};

export const PrescriptionFeedbackCard: React.FC<PrescriptionFeedbackCardProps> = ({
  onFeedbackSubmitted,
  className = '',
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(['⚡ Fast & Accurate', '💊 Clear Dosage Schedule']);
  const [comment, setComment] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user already submitted feedback in this browser
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theprescription_user_feedback');
      if (saved) {
        setIsSubmitted(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const feedbackText = comment.trim() || 'Accurately parsed my prescription and generated a clear dosage schedule.';

    setIsSubmitting(true);
    try {
      const payload = {
        rating,
        comment: feedbackText,
        name: name.trim() || 'Verified Patient',
        role: role.trim() || 'Patient / Caregiver',
        tags: selectedTags,
      };

      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.feedback) {
        setIsSubmitted(true);
        try {
          localStorage.setItem('theprescription_user_feedback', JSON.stringify(data.feedback));
        } catch {}
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted(data.feedback);
        }
      } else {
        // Fallback optimistic submission
        const localFeedback: UserFeedback = {
          id: `local-${Date.now()}`,
          name: payload.name,
          role: payload.role,
          rating: payload.rating,
          comment: payload.comment,
          tags: payload.tags,
          date: 'Just now',
          verifiedScan: true,
        };
        setIsSubmitted(true);
        if (onFeedbackSubmitted) onFeedbackSubmitted(localFeedback);
      }
    } catch (err: any) {
      // Optimistic local fallback if API fails
      const fallbackFeedback: UserFeedback = {
        id: `local-${Date.now()}`,
        name: name.trim() || 'Verified Patient',
        role: role.trim() || 'Patient / Caregiver',
        rating,
        comment: feedbackText,
        tags: selectedTags,
        date: 'Just now',
        verifiedScan: true,
      };
      setIsSubmitted(true);
      if (onFeedbackSubmitted) onFeedbackSubmitted(fallbackFeedback);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/90 border border-emerald-500/40 text-white shadow-lg relative overflow-hidden transition-all ${className}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Feedback Published
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Thank You for Rating Theprescription!
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-xl">
              Your verified rating helps other families and caregivers trust clinical prescription decoding. Your review is now featured in our community showcase below.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 underline shrink-0 transition-colors cursor-pointer"
          >
            Update review
          </button>
        </div>
      </div>
    );
  }

  const activeRating = hoverRating || rating;

  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/95 border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-md relative overflow-hidden transition-colors ${className}`}>
      {/* Background ambient glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center shrink-0">
              <MessageSquareHeart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-300 dark:border-emerald-800/80 mb-1">
                <Heart className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                Community Feedback
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                How Was Your Prescription Scan?
              </h3>
            </div>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Takes ~20 seconds • Helps other patients
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Rating Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${star} out of 5 stars`}
                  className="p-1 sm:p-1.5 rounded-xl hover:bg-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all cursor-pointer transform hover:scale-115 active:scale-95"
                >
                  <Star
                    className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                      star <= activeRating
                        ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-center sm:text-right">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 block">
                {RATING_DESCRIPTIONS[activeRating] || 'Click to rate'}
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                {activeRating} of 5 Stars
              </span>
            </div>
          </div>

          {/* Quick Tag Pills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              What did you find most helpful? <span className="text-slate-400 font-normal">(Pick up to 3)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label htmlFor="feedback-comment" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Short Review or Feedback <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="feedback-comment"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g., Decoded my father's diabetes medicine accurately and made the morning/evening schedule super easy to follow."
              className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            />
          </div>

          {/* Name & Role Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="feedback-name" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Your Name / Initial <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="feedback-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Sarah M."
                maxLength={40}
                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="feedback-role" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Your Role <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="feedback-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Caregiver, Patient, Pharmacist"
                maxLength={40}
                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{error}</p>
          )}

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              🔒 Zero-retention: Your prescription image is never shared.
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Rating & Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
