import React, { useState } from 'react';
import {
  AlertTriangle,
  X,
  Camera,
  Search,
  Sparkles,
  HelpCircle,
  Stethoscope,
  ArrowRight,
} from 'lucide-react';
import { SamplePrescription, SAMPLE_PRESCRIPTIONS } from '../data/medicalData';
import { MedicineDetail } from '../types';

interface UnunderstoodMedicinePopupProps {
  onClose: () => void;
  onUploadNew: () => void;
  onSelectSample: (sample: SamplePrescription) => void;
  onConfirmMedicine: (
    newName: string,
    canonicalGeneric?: string,
    extraDetails?: Partial<MedicineDetail>
  ) => void;
}

export const UnunderstoodMedicinePopup: React.FC<UnunderstoodMedicinePopupProps> = ({
  onClose,
  onUploadNew,
  onSelectSample,
  onConfirmMedicine,
}) => {
  const [manualInput, setManualInput] = useState('');
  const [genericInput, setGenericInput] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    onConfirmMedicine(manualInput.trim(), genericInput.trim() || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-amber-300">
        {/* Header Alert Strip */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Handwriting Could Not Be Deciphered
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                Clinical Safety Rule: Never guess ambiguous pen strokes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Our clinical models could not confirm the medicine names with 100% safety due to
            faint ink, severe cursive pen strokes, or low photo contrast. For your safety, we
            never invent or guess drug dosages.
          </p>

          {/* Option 1: Manual Name Input */}
          <form
            onSubmit={handleManualSubmit}
            className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Search className="w-4 h-4 text-amber-700" />
              <span>Know what the doctor said? Type it manually:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Medicine Brand (e.g. Augmentin)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <input
                type="text"
                value={genericInput}
                onChange={(e) => setGenericInput(e.target.value)}
                placeholder="Generic salt (optional)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!manualInput.trim()}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Verify &amp; Explain This Medicine
            </button>
          </form>

          {/* Option 2: Try 1-Click Sample Prescriptions */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Or Try A Verified 1-Click Sample Prescription:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {SAMPLE_PRESCRIPTIONS.slice(0, 2).map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => onSelectSample(sample)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                      {sample.title}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono line-clamp-1">
                      {sample.previewText}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onUploadNew}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Upload Clearer Photo</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
