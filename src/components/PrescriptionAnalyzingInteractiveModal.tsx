import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Pill,
  Heart,
  Activity,
  ShieldCheck,
  RefreshCw,
  Clock,
  CheckCircle2,
  Quote,
  Feather,
  Wind,
} from 'lucide-react';

interface PrescriptionAnalyzingInteractiveModalProps {
  isLoading: boolean;
  uploadedImage?: string | null;
}

interface ReassuringQuote {
  quote: string;
  subtext: string;
  category: string;
}

const REASSURING_QUOTES: ReassuringQuote[] = [
  {
    quote: "Please wait, good things take time...",
    subtext: "Carefully reading doctor's handwriting so you receive safe, accurate guidance.",
    category: "Patience & Care",
  },
  {
    quote: "Precision in medicine is worth every second.",
    subtext: "Double-checking dosage units (mg, ml) and Latin frequency codes for your safety.",
    category: "Clinical Accuracy",
  },
  {
    quote: "Take a gentle breath... We are doing the heavy reading for you.",
    subtext: "Decoding complex cursive strokes and converting them into plain English.",
    category: "Mindful Moment",
  },
  {
    quote: "Patience is medicine for the mind, precision is medicine for the body.",
    subtext: "Cross-referencing active generic salts against verified clinical databases.",
    category: "Care & Trust",
  },
  {
    quote: "Great health guidance is never rushed.",
    subtext: "Inspecting drug combinations, empty-stomach instructions, and meal relations.",
    category: "Patient Safety",
  },
  {
    quote: "Almost there — formatting your personalized daily schedule...",
    subtext: "Organizing your morning, afternoon, evening, and bedtime medication plan.",
    category: "Final Verification",
  },
];

const ANALYSIS_PHASES = [
  {
    step: 1,
    title: "Examining Handwriting Strokes",
    desc: "Isolating ink curves, doctor handwriting ligatures & text margins...",
  },
  {
    step: 2,
    title: "Translating Latin Shorthand",
    desc: "Decoding 1-0-1, OD, BD, TDS, AC (before food) & PC (after meals)...",
  },
  {
    step: 3,
    title: "Verifying Active Ingredients",
    desc: "Cross-referencing pharmaceutical company brands & generic molecules...",
  },
  {
    step: 4,
    title: "Formulating Daily Schedule",
    desc: "Generating safety precautions, side effects, and routine timelines...",
  },
];

export const PrescriptionAnalyzingInteractiveModal: React.FC<PrescriptionAnalyzingInteractiveModalProps> = ({
  isLoading,
  uploadedImage,
}) => {
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [fadeAnim, setFadeAnim] = useState<boolean>(true);
  const [progressPercent, setProgressPercent] = useState<number>(14);
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  // Cycle reassuring quotes with smooth fade transition
  useEffect(() => {
    if (!isLoading) {
      setProgressPercent(14);
      setPhaseIndex(0);
      return;
    }

    const quoteTimer = setInterval(() => {
      setFadeAnim(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % REASSURING_QUOTES.length);
        setFadeAnim(true);
      }, 300);
    }, 4200);

    return () => clearInterval(quoteTimer);
  }, [isLoading]);

  // Smooth progress bar calculation
  useEffect(() => {
    if (!isLoading) return;

    const progressTimer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 95) return prev;
        const jump = Math.random() * 5 + 1.5;
        const next = Math.min(95, Math.round((prev + jump) * 10) / 10);

        if (next < 35) setPhaseIndex(0);
        else if (next < 65) setPhaseIndex(1);
        else if (next < 88) setPhaseIndex(2);
        else setPhaseIndex(3);

        return next;
      });
    }, 400);

    return () => clearInterval(progressTimer);
  }, [isLoading]);

  // Gentle breathing exercise animation cycle: 4s Inhale, 2s Hold, 4s Exhale
  useEffect(() => {
    if (!isLoading) return;

    let timer: NodeJS.Timeout;
    const runCycle = () => {
      setBreathPhase('Inhale');
      timer = setTimeout(() => {
        setBreathPhase('Hold');
        timer = setTimeout(() => {
          setBreathPhase('Exhale');
          timer = setTimeout(runCycle, 3500);
        }, 1800);
      }, 3500);
    };

    runCycle();
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading) return null;

  const currentQuote = REASSURING_QUOTES[quoteIndex];
  const currentPhase = ANALYSIS_PHASES[phaseIndex];

  const handleManualNextQuote = () => {
    setFadeAnim(false);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % REASSURING_QUOTES.length);
      setFadeAnim(true);
    }, 200);
  };

  return (
    <div
      id="prescription-analyzing-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="analyzing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden text-white my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Animated Neon Gradient Laser Progress Line */}
        <div className="h-1.5 w-full bg-slate-800 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-300 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
          <div className="absolute top-0 bottom-0 w-24 bg-white/40 blur-xs -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>

        <div className="p-6 sm:p-8 space-y-7">
          {/* Top Status Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>

              <div>
                <h2
                  id="analyzing-modal-title"
                  className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2"
                >
                  <span>Analyzing Prescription</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    {Math.round(progressPercent)}%
                  </span>
                </h2>
                <p className="text-xs text-emerald-400/90 font-medium">
                  {currentPhase.title}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Step {phaseIndex + 1}/4</span>
            </div>
          </div>

          {/* Centerpiece: Glowing Medical Scan Animation & Holographic Rings */}
          <div className="relative py-4 flex flex-col items-center justify-center">
            {/* Background Ambient Glow Halo */}
            <div className="absolute w-56 h-56 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none animate-pulse" />

            {/* Orbiting Concentric Animated Rings */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
              {/* Outer Slow-Spin Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/30 animate-[spin_12s_linear_infinite]" />

              {/* Middle Reverse-Spin Glowing Ring with Orbiting Pip */}
              <div className="absolute inset-2.5 rounded-full border border-teal-400/20 animate-[spin_8s_linear_infinite_reverse]">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
              </div>

              {/* Inner Pulsing Radar Circle */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-400/40 shadow-inner flex items-center justify-center">
                {/* ECG Heartbeat SVG Wave Animation */}
                <div className="relative flex items-center justify-center">
                  <Pill className="w-10 h-10 text-emerald-300 animate-bounce duration-1000 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                  
                  {/* Subtle Scanning Laser Line */}
                  <div className="absolute -left-12 -right-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_#22d3ee] animate-[scan_2s_ease-in-out_infinite]" />
                </div>
              </div>

              {/* Small floating sparkles */}
              <Sparkles className="absolute top-2 right-2 w-4 h-4 text-emerald-300 animate-pulse" />
              <Heart className="absolute bottom-2 left-2 w-4 h-4 text-teal-300 animate-pulse delay-300" />
            </div>

            {/* Micro Live-Scanning Status Subtitle */}
            <p className="mt-3 text-xs text-slate-300 font-medium text-center max-w-sm">
              {currentPhase.desc}
            </p>
          </div>

          {/* Beautiful Reassuring Quotes Card ("Please wait, good things take time...") */}
          <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-800/50 p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-lg overflow-hidden">
            {/* Soft decorative background quote mark */}
            <Quote className="absolute top-3 right-4 w-14 h-14 text-slate-700/20 pointer-events-none rotate-12" />

            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Feather className="w-3 h-3 text-emerald-400" />
                <span>{currentQuote.category}</span>
              </span>

              <button
                type="button"
                onClick={handleManualNextQuote}
                title="Read next inspiring quote"
                className="text-[11px] text-slate-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>Another thought</span>
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            {/* Animated Quote Text with smooth transition */}
            <div
              className={`transition-all duration-300 transform ${
                fadeAnim
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-1'
              }`}
            >
              <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed italic">
                "{currentQuote.quote}"
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-normal">
                {currentQuote.subtext}
              </p>
            </div>
          </div>

          {/* Interactive Gentle Breathing Guide (Calm While Waiting) */}
          <div className="bg-slate-950/60 p-3 sm:p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  breathPhase === 'Inhale'
                    ? 'bg-emerald-500/30 text-emerald-300 scale-110 ring-2 ring-emerald-400/50'
                    : breathPhase === 'Hold'
                    ? 'bg-teal-500/30 text-teal-300 scale-105'
                    : 'bg-slate-800 text-slate-400 scale-90'
                }`}
              >
                <Wind className="w-3.5 h-3.5 animate-pulse" />
              </div>

              <div>
                <span className="font-bold text-slate-200 block text-[11px]">
                  Calm breathing: <span className="text-emerald-300 uppercase tracking-wider">{breathPhase}</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  Relax your shoulders while AI transcribes the prescription.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-400/90 text-[11px] font-semibold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safe Decryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
