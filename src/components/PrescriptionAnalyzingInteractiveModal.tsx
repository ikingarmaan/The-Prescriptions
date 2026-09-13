import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Stethoscope,
  Heart,
  Droplets,
  Clock,
  ChevronRight,
  ChevronLeft,
  Smile,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface PrescriptionAnalyzingInteractiveModalProps {
  isLoading: boolean;
  uploadedImage: string | null;
}

interface InteractiveQuote {
  id: number;
  badge: string;
  headline: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const UPLIFTING_QUOTES: InteractiveQuote[] = [
  {
    id: 1,
    badge: 'Good Things Take Time',
    headline: 'Deciphering doctor handwriting is an art! 🎨',
    body: 'Doctors write with urgency and passion; we take a few careful seconds to read every curve so your dosage and timings are crystal clear.',
    icon: Sparkles,
    color: 'from-emerald-400 to-teal-400',
  },
  {
    id: 2,
    badge: 'Patience & Safety',
    headline: 'Patience is medicine for the mind ⏳',
    body: 'Taking a few seconds today to understand your prescription prevents dangerous medication mistakes tomorrow. Accuracy always comes first.',
    icon: ShieldCheck,
    color: 'from-blue-400 to-indigo-400',
  },
  {
    id: 3,
    badge: 'Hydration Check',
    headline: 'Take a quick sip of water while you wait! 💧',
    body: 'Staying hydrated improves medicine absorption and boosts your energy. Small everyday habits build long-term wellness.',
    icon: Droplets,
    color: 'from-cyan-400 to-sky-400',
  },
  {
    id: 4,
    badge: 'Doctor Penmanship',
    headline: 'Untangling cursive loops and Latin codes... ✍️',
    body: 'From 1-0-1 to BD and TDS, our AI is converting traditional physician shorthand into straightforward morning, noon, and evening schedules.',
    icon: Clock,
    color: 'from-purple-400 to-pink-400',
  },
  {
    id: 5,
    badge: 'Peace of Mind',
    headline: 'A moment of care brings lasting wellness 🌿',
    body: 'Good health is not just about taking pills — it is about knowing exactly what each tablet does and how to take it safely with food.',
    icon: Heart,
    color: 'from-rose-400 to-amber-400',
  },
  {
    id: 6,
    badge: 'Nearly Ready',
    headline: 'Double-checking active salts & safety rules 🔍',
    body: 'Almost ready! We are organizing your printable schedule, meal timings, and lab tests so you can review everything with confidence.',
    icon: Smile,
    color: 'from-emerald-400 to-cyan-400',
  },
];

export const PrescriptionAnalyzingInteractiveModal: React.FC<PrescriptionAnalyzingInteractiveModalProps> = ({
  isLoading,
  uploadedImage,
}) => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [waterSips, setWaterSips] = useState<number>(0);
  const [showSipCheer, setShowSipCheer] = useState<boolean>(false);

  // Auto-cycle quotes every 3.2 seconds
  useEffect(() => {
    if (!isLoading) {
      setActiveQuoteIndex(0);
      setSecondsElapsed(0);
      setWaterSips(0);
      setShowSipCheer(false);
      return;
    }

    const quoteInterval = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % UPLIFTING_QUOTES.length);
    }, 3200);

    const timerInterval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(timerInterval);
    };
  }, [isLoading]);

  const handleNextQuote = () => {
    setActiveQuoteIndex((prev) => (prev + 1) % UPLIFTING_QUOTES.length);
  };

  const handlePrevQuote = () => {
    setActiveQuoteIndex((prev) => (prev - 1 + UPLIFTING_QUOTES.length) % UPLIFTING_QUOTES.length);
  };

  const handleDrinkWater = () => {
    setWaterSips((prev) => prev + 1);
    setShowSipCheer(true);
    setTimeout(() => setShowSipCheer(false), 2000);
  };

  if (!isLoading) {
    return null;
  }

  const currentQuote = UPLIFTING_QUOTES[activeQuoteIndex];
  const QuoteIcon = currentQuote.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-white">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Prescription Scanner Window */}
        <div className="relative h-44 bg-slate-950 border-b border-slate-800 flex items-center justify-center overflow-hidden">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Prescription under analysis"
              className="w-full h-full object-contain opacity-40 blur-[0.5px]"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <Stethoscope className="w-10 h-10 text-emerald-500/50 animate-pulse" />
              <span className="text-xs font-mono">Deciphering Medical Notes</span>
            </div>
          )}

          {/* Animated Laser Scanning Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce pointer-events-none" />

          {/* Corner HUD Markers */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />

          {/* Live Progress Tag */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Analyzing ({secondsElapsed}s)</span>
          </div>

          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/60 text-[10px] text-slate-300 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Good things take time</span>
          </div>
        </div>

        {/* Modal Interactive Content */}
        <div className="p-6 space-y-5 relative z-10">
          
          {/* Active Interactive Quote Card */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-inner min-h-[160px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <QuoteIcon className="w-3 h-3" />
                  <span>{currentQuote.badge}</span>
                </span>

                <span className="text-[11px] font-mono text-slate-500">
                  {activeQuoteIndex + 1} of {UPLIFTING_QUOTES.length}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                {currentQuote.headline}
              </h4>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {currentQuote.body}
              </p>
            </div>

            {/* Interactive Quote Cycler Controls */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                {UPLIFTING_QUOTES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveQuoteIndex(idx)}
                    aria-label={`View thought ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeQuoteIndex === idx
                        ? 'w-6 bg-emerald-400'
                        : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevQuote}
                  aria-label="Previous quote"
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextQuote}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Next thought</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Hydration & Wellness Action */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-teal-950/30 to-emerald-950/40 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-200">
                  {showSipCheer ? '🎉 Hydrated! Great job!' : 'Waiting for doctor calligraphy?'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {waterSips > 0
                    ? `You've logged ${waterSips} sip${waterSips > 1 ? 's' : ''} of water! 💧`
                    : 'Take a quick sip of water while AI reads your notes.'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDrinkWater}
              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer hover:scale-105 shrink-0 flex items-center gap-1.5"
            >
              <Check className="w-3 h-3" />
              <span>Sipped water!</span>
            </button>
          </div>

          <div className="text-center pt-1">
            <span className="text-[11px] text-slate-400 italic">
              ✨ Please stay on this tab — precision analysis usually finishes in 5–10 seconds.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
