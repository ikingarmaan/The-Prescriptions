import React, { useEffect, useState } from 'react';
import { Sparkles, Stethoscope, ShieldCheck, Activity, Brain, Check } from 'lucide-react';

interface PrescriptionAnalyzingInteractiveModalProps {
  isLoading: boolean;
  uploadedImage: string | null;
}

export const PrescriptionAnalyzingInteractiveModal: React.FC<PrescriptionAnalyzingInteractiveModalProps> = ({
  isLoading,
  uploadedImage,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Enhancing Pen Ink & Image Contrast', desc: 'Denoising paper background and boosting handwriting strokes' },
    { title: 'Analyzing Cursive Ligatures', desc: 'Isolating ambiguous pen loops, signatures, and cursive letters' },
    { title: 'Decoding Latin Medical Shorthand', desc: 'Translating 1-0-1, OD, BD, TDS, AC, PC, and meal codes' },
    { title: 'Verifying with Pharmacological Catalog', desc: 'Cross-referencing active chemical salts and patient safety guidelines' },
    { title: 'Assembling Daily Timeline & Routine', desc: 'Formatting schedule, food interactions, and lab investigations' },
  ];

  useEffect(() => {
    if (!isLoading) {
      setActiveStep(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, [isLoading, steps.length]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-white">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Prescription Scanner Window */}
        <div className="relative h-48 bg-slate-950 border-b border-slate-800 flex items-center justify-center overflow-hidden">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Prescription under analysis"
              className="w-full h-full object-contain opacity-40 blur-[0.5px]"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <Stethoscope className="w-10 h-10 text-emerald-500/50 animate-pulse" />
              <span className="text-xs font-mono">Multimodal Clinical Input</span>
            </div>
          )}

          {/* Animated Laser Scanning Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce pointer-events-none" />

          {/* Corner HUD Markers */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />

          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Multi-Stage OCR Engine</span>
          </div>
        </div>

        {/* Modal Progress Content */}
        <div className="p-6 space-y-5 relative z-10">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Deciphering Doctor Prescription</span>
            </div>
            <h3 className="text-xl font-black tracking-tight text-white mt-1">
              Analyzing Handwriting Strokes...
            </h3>
            <p className="text-xs text-slate-400">
              Cross-validating medical tokens across 5 clinical deciphering stages
            </p>
          </div>

          {/* Steps list */}
          <div className="space-y-2.5">
            {steps.map((step, idx) => {
              const isCompleted = idx < activeStep;
              const isCurrent = idx === activeStep;

              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                    isCurrent
                      ? 'bg-emerald-950/60 border-emerald-500/60 text-white shadow-sm'
                      : isCompleted
                      ? 'bg-slate-800/40 border-slate-700/60 text-slate-300'
                      : 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-500 text-slate-950'
                        : isCurrent
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 animate-pulse'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">{step.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-slate-400 italic">
              Please keep this tab open — decryption takes approximately 5–10 seconds.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
