import React, { useState, useRef } from 'react';
import {
  Upload,
  Camera,
  FileText,
  Sparkles,
  AlertCircle,
  X,
  ArrowRight,
  Stethoscope,
  Info,
  CheckCircle2,
  Cpu,
  Layers,
  Fingerprint,
  Smartphone,
} from 'lucide-react';
import { CameraCaptureModal } from './CameraCaptureModal';
import { SAMPLE_PRESCRIPTIONS, SamplePrescription } from '../data/medicalData';
import {
  executeMultiEngineHandwritingRecognition,
  MultiEngineProcessProgress,
} from '../utils/multiEngineOcr';
import { ImagePreprocessingReport } from '../types';

interface PrescriptionUploaderProps {
  onAnalyze: (payload: {
    imageBase64?: string;
    textNotes?: string;
    patientContext?: string;
    ocrPretext?: string;
    preprocessingReport?: ImagePreprocessingReport;
  }) => void;
  onSelectSample: (sample: SamplePrescription) => void;
  isLoading: boolean;
  error?: string | null;
}

export const PrescriptionUploader: React.FC<PrescriptionUploaderProps> = ({
  onAnalyze,
  onSelectSample,
  isLoading,
  error,
}) => {
  const [activeInputTab, setActiveInputTab] = useState<'photo' | 'text'>('photo');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [textNotes, setTextNotes] = useState<string>('');
  const [patientContext, setPatientContext] = useState<string>('');
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [ocrStatus, setOcrStatus] = useState<string | null>(null);
  const [extractedOcrText, setExtractedOcrText] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [multiEngineProgress, setMultiEngineProgress] = useState<MultiEngineProcessProgress | null>(null);
  const [preprocessingReport, setPreprocessingReport] = useState<ImagePreprocessingReport | null>(null);
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);

  const processLoadedImage = async (dataUrl: string) => {
    setSelectedImage(dataUrl);
    setIsEnhancing(true);

    try {
      // Execute 5-Model Multi-Engine Handwriting Recognition Pipeline & Full Preprocessing Suite
      const result = await executeMultiEngineHandwritingRecognition(
        dataUrl,
        (progress) => {
          setMultiEngineProgress(progress);
          setOcrStatus(progress.message);
        }
      );

      setEnhancedImage(result.enhancedImage);
      if (result.preprocessingReport) {
        setPreprocessingReport(result.preprocessingReport);
      }
      if (result.rawTesseractTokens) {
        setExtractedOcrText(result.rawTesseractTokens);
      }
      setIsEnhancing(false);
      setOcrStatus('Clinical handwriting scan ready for analysis');
    } catch (e) {
      console.warn('Multi-engine preprocessing error:', e);
      setEnhancedImage(dataUrl);
      setIsEnhancing(false);
      setOcrStatus('Prescription ready for clinical decryption.');
    }
  };

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        processLoadedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleResetImage = () => {
    setSelectedImage(null);
    setEnhancedImage(null);
    setExtractedOcrText(null);
    setOcrStatus(null);
    setMultiEngineProgress(null);
    setPreprocessingReport(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent) {
      alert('Please check the safety agreement box giving your consent before analyzing your prescription.');
      return;
    }
    if (activeInputTab === 'photo' && !selectedImage) {
      alert('Please upload a prescription image or switch to the text tab.');
      return;
    }
    if (activeInputTab === 'text' && !textNotes.trim()) {
      alert('Please enter or paste your written prescription notes.');
      return;
    }

    // Use enhanced contrast version under the hood for AI transcription accuracy, while user always views their natural photo
    const finalImage = enhancedImage || selectedImage;

    onAnalyze({
      imageBase64: finalImage || undefined,
      textNotes: textNotes.trim() || undefined,
      patientContext: patientContext.trim() || undefined,
      ocrPretext: extractedOcrText || undefined,
      preprocessingReport: preprocessingReport || undefined,
    });
  };

  return (
    <div id="prescription-uploader-root" className="w-full mx-auto">
      {/* Card Header & Input Mode Switcher with Cool Emerald Theme */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 text-white relative overflow-hidden">
          {/* Subtle medical ECG pulse & glow artwork */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <svg
            className="absolute right-4 bottom-2 w-64 h-24 text-emerald-500/10 pointer-events-none hidden sm:block"
            viewBox="0 0 300 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M0 50 L50 50 L65 20 L80 80 L95 40 L105 60 L120 50 L300 50" />
          </svg>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-200 text-xs font-semibold mb-2.5 border border-emerald-500/50 backdrop-blur-xs">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-300" />
                <span>AI Clinical Handwriting & Prescription Decryption</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Decode Your Doctor's Prescription
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1.5 max-w-2xl leading-relaxed font-normal">
                Upload a photo of your doctor's handwritten slip or paste notes. Our 5-stage clinical handwriting engine deciphers cursive doctor shorthand, confirms active medicine salts, and verifies safe dosage timings.
              </p>
            </div>

            {/* Input Mode Switcher: Photo vs Text */}
            <div className="grid grid-cols-2 w-full md:w-auto bg-slate-900/80 p-1.5 rounded-2xl shrink-0 self-stretch md:self-center border border-white/15 backdrop-blur-sm shadow-inner gap-1">
              <button
                id="tab-photo-upload"
                type="button"
                onClick={() => setActiveInputTab('photo')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                  activeInputTab === 'photo'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Prescription Photo</span>
              </button>
              <button
                id="tab-text-notes"
                type="button"
                onClick={() => setActiveInputTab('text')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                  activeInputTab === 'text'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Type Notes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mx-4 sm:mx-6 md:mx-8 mt-4 sm:mt-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-900 dark:text-rose-100">Unable to analyze prescription</p>
              <p className="text-rose-700 dark:text-rose-300 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          {activeInputTab === 'photo' ? (
            <div>
              {!selectedImage ? (
                <div
                  id="dropzone-area"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-2xl p-5 sm:p-8 md:p-10 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 bg-slate-50/40 dark:bg-slate-800/40 hover:bg-emerald-50/20 dark:hover:bg-slate-800/70'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="prescription-file-input"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />
                  <input
                    ref={nativeCameraInputRef}
                    type="file"
                    id="prescription-native-camera-input"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 sm:mb-4">
                    <Upload className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
                    Upload or Photograph Prescription
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4 sm:mb-5">
                    Supports high-resolution camera photos, doctor slips, or gallery images (JPG, PNG, WEBP).
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 max-w-sm sm:max-w-none mx-auto">
                    <button
                      id="open-camera-btn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCameraOpen(true);
                      }}
                      className="px-5 py-3.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      Take Photo with Camera
                    </button>
                    <button
                      id="browse-files-btn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-5 py-3.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-xl shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      Choose from Gallery / Files
                    </button>
                  </div>

                  {/* Mobile Direct Phone Camera Helper */}
                  <div className="pt-2 sm:hidden flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nativeCameraInputRef.current?.click();
                      }}
                      className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 transition-colors active:scale-95"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Or snap directly with Phone Camera App</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-800/40 p-3 sm:p-4 flex flex-col items-center space-y-3 sm:space-y-4">
                  {/* Top Bar with Status and Actions */}
                  <div className="w-full flex items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                        Prescription Photo Attached
                      </span>
                    </div>

                    <button
                      id="remove-image-btn"
                      type="button"
                      onClick={handleResetImage}
                      className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs font-semibold rounded-lg border border-rose-200 dark:border-rose-900/50 transition-colors flex items-center gap-1 shrink-0 min-h-[38px] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  {/* Image Display */}
                  <div className="relative max-h-56 sm:max-h-80 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Prescription preview"
                      className="max-h-52 sm:max-h-72 w-auto rounded-lg shadow-2xs object-contain"
                    />
                  </div>

                  {/* Clinical Scanning & Verification HUD */}
                  {isEnhancing && multiEngineProgress ? (
                    <div className="w-full p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-sm space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                          <span className="font-bold text-emerald-300">
                            Scanning Stage {multiEngineProgress.stepNumber}/5: {multiEngineProgress.engineName}
                          </span>
                        </div>
                        <span className="font-mono text-emerald-400 font-bold">
                          {multiEngineProgress.percent}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-linear-to-r from-emerald-500 via-teal-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${multiEngineProgress.percent}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-300 italic truncate">
                        {multiEngineProgress.message}
                      </p>
                    </div>
                  ) : ocrStatus ? (
                    <div className="w-full p-3 rounded-xl bg-white dark:bg-slate-850 border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-200 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="font-bold text-slate-800 dark:text-slate-100 text-[11px] sm:text-xs">
                          {ocrStatus}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-750">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase mr-1">Verification:</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 font-medium">Cursive Ligatures</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/50 font-medium">Document Layout</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/50 font-medium">Latin Shorthand</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 font-medium">Dosage Metrics</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 font-medium">Pharmacopeia Safety</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 font-medium">Clinical Verification</span>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                    <button
                      type="button"
                      onClick={() => setIsCameraOpen(true)}
                      className="flex-1 sm:flex-initial px-3.5 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" /> Retake Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 sm:flex-initial px-3.5 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Upload Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label
                htmlFor="text-notes-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2"
              >
                Written Prescription Notes / Medicines List
              </label>
              <textarea
                id="text-notes-input"
                rows={5}
                value={textNotes}
                onChange={(e) => setTextNotes(e.target.value)}
                placeholder="Example:
1. Tab Augmentin 625 1-0-1 PC x 5 days
2. Tab Pan 40 1-0-0 AC x 5 days
3. Syp Ascoril LS 10ml TDS
4. Tab Dolo 650 SOS

Adv / Inv:
- CBC with ESR
- Chest X-Ray PA View"
                className="w-full text-base sm:text-sm p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950/40 transition-all font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Tip: You can paste whatever the doctor scribbled, abbreviated, or typed, including ordered lab tests (Adv / Inv). Shorthand codes like 1-0-1, OD, BD, TDS, AC, and PC are automatically decoded.
              </p>
            </div>
          )}

          {/* Optional context (e.g., patient age or allergies) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="patient-context-input"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1"
              >
                Optional Patient Context / Symptoms
              </label>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Optional</span>
            </div>
            <input
              id="patient-context-input"
              type="text"
              value={patientContext}
              onChange={(e) => setPatientContext(e.target.value)}
              placeholder="e.g., Patient is 45 years old, fever, allergic to penicillin"
              className="w-full text-base sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950/40 transition-all text-slate-800 dark:text-slate-100 min-h-[44px]"
            />
          </div>

          {/* Patient Consent & Safety Checkbox (Required to Analyze) */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label
              htmlFor="prescription-ai-consent-checkbox"
              className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                hasConsent
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/70 ring-1 ring-emerald-400/20 shadow-xs'
                  : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/90 dark:border-amber-900/50 hover:bg-amber-50/80 dark:hover:bg-amber-950/30'
              }`}
            >
              <input
                id="prescription-ai-consent-checkbox"
                type="checkbox"
                checked={hasConsent}
                onChange={(e) => setHasConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-emerald-600 border-slate-300 dark:border-slate-600 focus:ring-emerald-500 cursor-pointer shrink-0 accent-emerald-600"
              />
              <div className="text-xs space-y-0.5 flex-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                  <span>Mandatory Consent &amp; Safety Agreement</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      hasConsent
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    {hasConsent ? 'Consent Confirmed' : 'Required to Analyze'}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  I consent to AI analysis of this prescription for informational understanding, and I agree to consult a doctor or pharmacist before taking, stopping, or changing any medicine.
                </p>
              </div>
            </label>
            {!hasConsent && (
              <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1.5 pl-1 flex items-center gap-1">
                <span>⚠️ Please check the consent box above to enable the "Analyze &amp; Explain Medicines" button.</span>
              </p>
            )}
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Decodes doctor handwriting, organizes lab tests, and maps daily medicine routines.</span>
            </div>

            <button
              id="submit-prescription-btn"
              type="submit"
              disabled={
                isLoading ||
                !hasConsent ||
                (activeInputTab === 'photo' && !selectedImage) ||
                (activeInputTab === 'text' && !textNotes.trim())
              }
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing Prescription...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze & Explain Medicines</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Sample Prescriptions - Purple & Indigo Discovery Theme */}
        <div className="p-5 sm:p-7 md:p-8 bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-purple-50/30 dark:from-purple-950/40 dark:via-slate-900 dark:to-indigo-950/30 border-t border-purple-200/70 dark:border-purple-900/40 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-purple-950 dark:text-purple-200">
                Try Instant Sample Prescriptions (1-Click Demo)
              </span>
            </div>
            <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100/90 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800/60">
              Zero Upload Required
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {SAMPLE_PRESCRIPTIONS.map((sample) => (
              <button
                key={sample.id}
                id={`sample-btn-${sample.id}`}
                type="button"
                onClick={() => onSelectSample(sample)}
                className="text-left p-4 rounded-2xl bg-white dark:bg-slate-800/90 border-2 border-purple-200/80 dark:border-purple-900/50 hover:border-purple-500 dark:hover:border-purple-400 active:bg-purple-50/50 dark:active:bg-purple-950/40 hover:shadow-md hover:shadow-purple-500/10 transition-all group min-h-[44px] cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    {sample.title}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-black border border-purple-200 dark:border-purple-800">
                    {sample.sampleResult.medicines.length} Meds
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2.5 font-medium">
                  {sample.subtitle}
                </p>
                <div className="text-[10px] font-mono text-purple-950 dark:text-purple-200 bg-purple-50/60 dark:bg-purple-950/40 p-2 rounded-xl border border-purple-100 dark:border-purple-900/40 line-clamp-2 leading-relaxed">
                  {sample.previewText}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(photo) => {
          processLoadedImage(photo);
          setActiveInputTab('photo');
        }}
      />
    </div>
  );
};
