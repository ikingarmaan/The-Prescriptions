import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  MousePointer,
  CheckCircle2,
  Edit3,
  Printer,
  Search,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  Clock,
  Pill,
  FileText,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';
import { SamplePrescription, SAMPLE_PRESCRIPTIONS } from '../data/medicalData';

interface HowItWorksGuideProps {
  onStartUpload?: () => void;
  onSelectSample?: (sample: SamplePrescription | number) => void;
}

interface UserStep {
  id: number;
  stepNumber: string;
  actionTitle: string;
  quickSummary: string;
  instructions: string[];
  userTip: string;
  icon: React.ComponentType<{ className?: string }>;
  accentGradient: string;
  highlightTag: string;
}

const USER_STEPS: UserStep[] = [
  {
    id: 1,
    stepNumber: 'Step 1',
    actionTitle: 'Upload Your Prescription',
    quickSummary: 'Take a photo or upload an image file of your paper prescription.',
    instructions: [
      'Click on the large upload box or drag-and-drop your image (JPG, PNG, WEBP).',
      'Make sure the paper is flat and in good lighting so doctor handwriting is legible.',
      'No prescription right now? Click "Try Sample Prescription" below for an instant demo.',
    ],
    userTip: 'Tip: Photos taken from directly above with no heavy shadows yield the quickest results.',
    icon: UploadCloud,
    accentGradient: 'from-emerald-500 to-teal-500',
    highlightTag: 'Your Action: Upload or Pick Sample',
  },
  {
    id: 2,
    stepNumber: 'Step 2',
    actionTitle: 'Click "Decipher Prescription"',
    quickSummary: 'Press the decipher button and let the AI scan all handwriting in seconds.',
    instructions: [
      'Once your image is loaded, click the green "Decipher Prescription" button.',
      'The AI reads doctor handwriting, isolates each line, and identifies drug names.',
      'Doctor codes like 1-0-1, BD, and TDS are automatically converted into plain hours.',
    ],
    userTip: 'Tip: You can watch the real-time scanning radar while the AI parses each medicine.',
    icon: Sparkles,
    accentGradient: 'from-blue-500 to-indigo-500',
    highlightTag: 'Your Action: Trigger AI Scan',
  },
  {
    id: 3,
    stepNumber: 'Step 3',
    actionTitle: 'Review & Edit Any Medicine',
    quickSummary: 'Verify the detected medicine names and edit any scribbled or unclear word.',
    instructions: [
      'Check the extracted medicines displayed in your results card.',
      'If the doctor wrote a messy scribble, click the "Edit" pencil icon to type the correct name.',
      'Our intelligent medical dictionary will suggest verified generic formulas as you type.',
    ],
    userTip: 'Tip: You are always in control. Confirming unverified medicines ensures 100% accurate schedules.',
    icon: Edit3,
    accentGradient: 'from-amber-500 to-orange-500',
    highlightTag: 'Your Action: Verify & Edit',
  },
  {
    id: 4,
    stepNumber: 'Step 4',
    actionTitle: 'Check Food Timings & Safety',
    quickSummary: 'Read exact dosage schedules, meal instructions (AC/PC), and generic salts.',
    instructions: [
      'Review whether each tablet should be taken Before Food (AC) or After Food (PC).',
      'Look at the active generic salt listed under the brand name to know what you are taking.',
      'Read precautions, food interactions, and safe time gaps between doses.',
    ],
    userTip: 'Tip: Tap "Medicine Directory" in the top bar anytime to explore 5,000+ medicines and salts.',
    icon: Pill,
    accentGradient: 'from-purple-500 to-pink-500',
    highlightTag: 'Your Action: Check Daily Instructions',
  },
  {
    id: 5,
    stepNumber: 'Step 5',
    actionTitle: 'Download PDF or Print Medication Card',
    quickSummary: 'Export an official PDF medication schedule or print a daily routine for your wallet or fridge.',
    instructions: [
      'Click "Download Card" to immediately generate and download your official PDF schedule document.',
      'Or click "Print Medication Card" to preview and print a clean hard copy.',
      'Hang it on your refrigerator or hand it to family members and caregivers for safe dosing.',
    ],
    userTip: 'Tip: Use the checkbox columns on your printed or PDF card to mark off your doses each day.',
    icon: Printer,
    accentGradient: 'from-rose-500 to-red-500',
    highlightTag: 'Your Action: Download PDF or Print',
  },
];

export const HowItWorksGuide: React.FC<HowItWorksGuideProps> = ({
  onStartUpload,
  onSelectSample,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [simulatedSearchText, setSimulatedSearchText] = useState('Augmentin 625');
  const [simulatedUploaded, setSimulatedUploaded] = useState(false);

  const activeStep = USER_STEPS[activeStepIndex];

  // Auto-advance step timer (5 seconds per step)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = 50; // ms
    const duration = 5000; // 5s per step
    const stepIncrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStepIndex((current) => (current + 1) % USER_STEPS.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, activeStepIndex]);

  const handleSelectStep = (index: number) => {
    setActiveStepIndex(index);
    setProgress(0);
  };

  return (
    <section
      id="how-to-use-section"
      className="w-full my-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-5 sm:p-8 lg:p-10 border-2 border-slate-800 shadow-2xl relative overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>User Walkthrough</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How to Use This Website
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            A simple step-by-step guide on how to upload your prescription, review your deciphered medicines, and generate a printable routine.
          </p>
        </div>

        {/* Auto-Play Toggle & Step Status */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-xs font-bold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-Cycling Guide</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-slate-400" />
                <span>Paused (Click to Resume)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step Selector Pills */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 my-6">
        {USER_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const StepIcon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleSelectStep(idx)}
              className={`p-3 sm:p-4 rounded-2xl text-left transition-all relative overflow-hidden cursor-pointer border ${
                isActive
                  ? 'bg-slate-800/95 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              {/* Progress Bar inside active step */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all"
                  style={{ width: `${isPlaying ? progress : 100}%` }}
                />
              )}

              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <StepIcon className="w-3.5 h-3.5" />
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider ${
                    isActive ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {step.stepNumber}
                </span>
              </div>

              <div
                className={`text-xs font-bold leading-tight line-clamp-2 ${
                  isActive ? 'text-white font-black' : 'text-slate-300'
                }`}
              >
                {step.actionTitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Main Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Action Instructions for User (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activeStep.highlightTag}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {activeStep.stepNumber} of 5
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {activeStep.actionTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {activeStep.quickSummary}
            </p>

            {/* Instruction Checklist */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                What to do:
              </div>
              {activeStep.instructions.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Tip Box */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-emerald-300 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{activeStep.userTip}</span>
          </div>

          {/* Nav buttons */}
          <div className="pt-2 flex items-center justify-between gap-3 text-xs border-t border-slate-800">
            <button
              type="button"
              onClick={() => handleSelectStep((activeStepIndex - 1 + USER_STEPS.length) % USER_STEPS.length)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors cursor-pointer"
            >
              ← Previous Step
            </button>
            <button
              type="button"
              onClick={() => handleSelectStep((activeStepIndex + 1) % USER_STEPS.length)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Live Interactive Simulation of the Website (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border-2 border-slate-800 p-5 sm:p-7 relative overflow-hidden min-h-[380px] flex flex-col justify-center">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* SIMULATION 1: User uploading a file */}
          {activeStep.id === 1 && (
            <div className="relative z-10 w-full max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-slate-400 font-mono uppercase">
                  Website Screen Preview
                </span>
                <div className="text-xs font-black text-white">Homepage Prescription Uploader</div>
              </div>

              {/* Simulated Upload Box */}
              <div className="border-2 border-dashed border-emerald-500/60 bg-slate-900/90 rounded-2xl p-6 text-center space-y-3 relative group hover:border-emerald-400 transition-colors shadow-xl">
                {/* Simulated Floating Pointer */}
                <div className="absolute top-4 right-6 animate-bounce text-emerald-400 flex items-center gap-1 text-[11px] font-bold bg-slate-950/90 px-2 py-1 rounded-full border border-emerald-500/40">
                  <MousePointer className="w-3.5 h-3.5" />
                  <span>Click to upload</span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <UploadCloud className="w-6 h-6 animate-pulse" />
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white">
                    Drop prescription image here or browse
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports JPG, PNG, WEBP from phone or desktop
                  </p>
                </div>

                {/* Instant Sample Button Simulation */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectSample) onSelectSample(SAMPLE_PRESCRIPTIONS[0]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Try with a Sample Prescription</span>
                  </button>
                </div>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                🔒 Uploaded images are decrypted securely in memory with zero cloud storage.
              </div>
            </div>
          )}

          {/* SIMULATION 2: Triggering AI Scan */}
          {activeStep.id === 2 && (
            <div className="relative z-10 w-full max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-slate-400 font-mono uppercase">
                  Website Screen Preview
                </span>
                <div className="text-xs font-black text-white">One-Click Deciphering</div>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
                {/* Image preview thumbnail */}
                <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      Doctor_Prescription_Slip.jpg
                    </div>
                    <div className="text-[10px] text-slate-400">Handwritten Ink Detected</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>

                {/* Big Decipher Button with pulse animation */}
                <div className="relative">
                  <div className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-xl text-center text-sm shadow-lg flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Decipher Prescription Now</span>
                  </div>
                  {/* Cursor click simulation */}
                  <div className="absolute -bottom-2 right-8 flex items-center gap-1 text-[11px] font-black text-amber-300 bg-slate-900 px-2 py-0.5 rounded-md border border-amber-500/40">
                    <MousePointer className="w-3 h-3 text-amber-400" />
                    <span>Press Button</span>
                  </div>
                </div>

                {/* Progress bar simulation */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Reading cursive ligatures...</span>
                    <span className="text-emerald-400 font-bold">Done in ~2s</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                ⚡ Reads messy handwriting, dosage frequencies, and meal requirements.
              </div>
            </div>
          )}

          {/* SIMULATION 3: Review & Edit Medicines */}
          {activeStep.id === 3 && (
            <div className="relative z-10 w-full max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-slate-400 font-mono uppercase">
                  Website Screen Preview
                </span>
                <div className="text-xs font-black text-white">Reviewing & Confirming Medicines</div>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3 shadow-xl">
                {/* Result Card with Edit Button */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">
                        Augmentin 625mg Tablet
                      </span>
                    </div>
                    {/* Simulated Edit Button with pointer */}
                    <button
                      type="button"
                      className="px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center gap-1 border border-emerald-500/40 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Name</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">Generic:</span>
                    <span>Amoxicillin + Clavulanate</span>
                  </div>

                  {/* Inline Edit popup preview */}
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-900 border border-emerald-500/50 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Quick Edit / Confirmation:</span>
                      <span className="text-emerald-400 font-bold">Verified in Catalog</span>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-slate-950 text-white font-mono text-xs border border-slate-700 flex items-center justify-between">
                      <span>{simulatedSearchText}</span>
                      <span className="text-emerald-400 text-[10px]">✓ Match</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                ✏️ If anything looks uncertain, clicking "Edit" lets you confirm the medicine safely.
              </div>
            </div>
          )}

          {/* SIMULATION 4: Food Timing & Dosage */}
          {activeStep.id === 4 && (
            <div className="relative z-10 w-full max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-slate-400 font-mono uppercase">
                  Website Screen Preview
                </span>
                <div className="text-xs font-black text-white">Detailed Dosage & Food Guidance</div>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3.5 shadow-xl">
                {/* Timing Badge Showcase */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Daily Dose Timing</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      Decoded: 1-0-1
                    </span>
                  </div>

                  {/* Morning / Night Badges */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-500/40">
                      <div className="text-[10px] text-amber-300 font-bold">Morning</div>
                      <div className="font-black text-white text-xs mt-0.5">1 Tab</div>
                      <div className="text-[9px] text-amber-200 mt-0.5">After Food</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 opacity-50">
                      <div className="text-[10px] text-slate-400 font-bold">Noon</div>
                      <div className="font-black text-slate-400 text-xs mt-0.5">0 Tab</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">Skip</div>
                    </div>
                    <div className="p-2 rounded-lg bg-indigo-950/50 border border-indigo-500/40">
                      <div className="text-[10px] text-indigo-300 font-bold">Night</div>
                      <div className="font-black text-white text-xs mt-0.5">1 Tab</div>
                      <div className="text-[9px] text-indigo-200 mt-0.5">After Food</div>
                    </div>
                  </div>
                </div>

                {/* Meal Warning Box */}
                <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-600/40 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 font-bold">Food Guidance (PC): </strong>
                    Take with a meal or within 30 minutes after food to minimize stomach upset.
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                🍲 Always check whether pills are AC (Before Meals) or PC (After Meals).
              </div>
            </div>
          )}

          {/* SIMULATION 5: Printing & Exporting Card */}
          {activeStep.id === 5 && (
            <div className="relative z-10 w-full max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-slate-400 font-mono uppercase">
                  Website Screen Preview
                </span>
                <div className="text-xs font-black text-white">Printable Medication Card</div>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3.5 shadow-xl">
                {/* Print button click simulation */}
                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-white">
                      Print / Export Medication Card
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs font-black">
                    Print Now
                  </span>
                </div>

                {/* Printable Pocket Card Preview */}
                <div className="p-3 bg-white text-slate-900 rounded-xl shadow-lg border-2 border-slate-300 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b pb-1.5 border-slate-200">
                    <span className="font-black text-slate-900 text-xs">
                      Theprescription • Daily Routine
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Patient Card</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center">
                    <div className="font-bold text-slate-600 bg-slate-100 p-1 rounded">Medicine</div>
                    <div className="font-bold text-amber-800 bg-amber-50 p-1 rounded">Morning</div>
                    <div className="font-bold text-slate-500 bg-slate-100 p-1 rounded">Noon</div>
                    <div className="font-bold text-indigo-800 bg-indigo-50 p-1 rounded">Night</div>

                    <div className="font-bold text-slate-800 p-1 text-left truncate">Augmentin</div>
                    <div className="bg-amber-100/70 p-1 rounded font-bold">1 tab (PC)</div>
                    <div className="text-slate-400 p-1">-</div>
                    <div className="bg-indigo-100/70 p-1 rounded font-bold">1 tab (PC)</div>
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                🖨️ Fold and keep in your wallet or pin on the fridge for daily tracking.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">
            Ready to decipher your doctor's prescription?
          </div>
          <div className="text-xs text-slate-400">
            Follow Step 1 above: upload an image or test instantly with a pre-loaded sample.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onSelectSample && (
            <button
              type="button"
              onClick={() => onSelectSample(SAMPLE_PRESCRIPTIONS[0])}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors border border-slate-700 cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Try Pre-loaded Sample</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (onStartUpload) {
                onStartUpload();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-colors shadow-lg cursor-pointer flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Go to Upload Section</span>
          </button>
        </div>
      </div>
    </section>
  );
};
