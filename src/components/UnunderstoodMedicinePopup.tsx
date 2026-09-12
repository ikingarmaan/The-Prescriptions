import React, { useState } from 'react';
import {
  AlertTriangle,
  RotateCcw,
  Search,
  Check,
  X,
  Pill,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { MEDICINE_DICTIONARY, DictionaryEntry } from '../data/medicineDictionary';
import { crossReferenceMedicine } from '../data/medicineCatalog';
import { MedicineDetail } from '../types';

interface UnunderstoodMedicinePopupProps {
  onClose: () => void;
  onUploadNew: () => void;
  onSelectSample?: (sampleKey: 'antibiotic' | 'cardiac' | 'fever_cold') => void;
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
  const [isTypingManual, setIsTypingManual] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  // Filter dictionary based on query
  const suggestions = searchQuery.trim().length >= 2
    ? MEDICINE_DICTIONARY.filter(
        (m) =>
          m.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.shortForms.some((sf) => sf.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (m.regionalAliases &&
            m.regionalAliases.some((alias) =>
              alias.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      ).slice(0, 5)
    : [];

  const handleApplyMedicine = (entry?: DictionaryEntry) => {
    const chosen = entry || selectedEntry;
    if (chosen) {
      const cross = crossReferenceMedicine(chosen.brandName, chosen.genericName);
      onConfirmMedicine(chosen.brandName, chosen.genericName, {
        dosage: chosen.standardStrengths[0] || '1 tablet',
        frequency: 'As directed by physician',
        mealRelation: 'after_food',
        mealRelationText: 'Take with water after food',
        duration: 'As prescribed',
        purposeAndUsage: `Used for ${chosen.category.toLowerCase()}. Verified by patient / caregiver.`,
        activeGenericSalt: cross.activeGenericSalt || chosen.genericName,
        popularCompanyBrands: cross.popularCompanyBrands,
        prescribedAs: cross.prescribedAs,
        companyName: cross.companyName,
      });
    } else if (searchQuery.trim().length > 0) {
      const cross = crossReferenceMedicine(searchQuery.trim());
      onConfirmMedicine(searchQuery.trim(), cross.activeGenericSalt || 'Active Generic Salt', {
        dosage: '1 tablet',
        frequency: 'As directed by physician',
        mealRelationText: 'Take as directed with water',
        duration: 'As prescribed',
        purposeAndUsage: 'Medication confirmed by patient / caregiver.',
        activeGenericSalt: cross.activeGenericSalt,
        popularCompanyBrands: cross.popularCompanyBrands,
        prescribedAs: cross.prescribedAs,
        companyName: cross.companyName,
      });
    }
  };

  return (
    <div
      id="ununderstood-medicine-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ununderstood-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-amber-200/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Amber Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Centered Friendly Alert Icon */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-600 shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h3
                id="ununderstood-modal-title"
                className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
              >
                Apologies, we didn't understand this medicine
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The doctor's handwriting on this prescription was unclear or too faint to identify safely. For your safety, we do not make guesses on unreadable prescriptions.
              </p>
            </div>
          </div>

          {/* Manual Entry Form (if toggled) */}
          {isTypingManual ? (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="manual-medicine-input"
                  className="text-xs font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-blue-600" />
                  Type or search medicine name:
                </label>
                <button
                  type="button"
                  onClick={() => setIsTypingManual(false)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 font-medium"
                >
                  Cancel
                </button>
              </div>

              <div className="relative">
                <input
                  id="manual-medicine-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedEntry(null);
                  }}
                  placeholder="e.g. Augmentin, Paracetamol, Metformin, Pan-D..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
                  autoFocus
                />
              </div>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="space-y-1 pt-1 max-h-48 overflow-y-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                    Suggested Verified Medicines:
                  </span>
                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedEntry(item);
                        setSearchQuery(item.brandName);
                        handleApplyMedicine(item);
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between gap-2 group cursor-pointer"
                    >
                      <div>
                        <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-900 flex items-center gap-1.5">
                          <Pill className="w-3 h-3 text-emerald-600" />
                          <span>{item.brandName}</span>
                          <span className="text-[9px] bg-blue-50 text-blue-700 px-1 py-0.2 rounded border border-blue-200">
                            {item.category.split('(')[0].trim()}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {item.genericName}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {searchQuery.trim().length > 0 && suggestions.length === 0 && (
                <button
                  type="button"
                  onClick={() => handleApplyMedicine()}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Use "{searchQuery.trim()}"</span>
                </button>
              )}
            </div>
          ) : (
            /* Action Buttons */
            <div className="space-y-2.5">
              <button
                type="button"
                id="btn-upload-clearer-photo"
                onClick={onUploadNew}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Upload a Clearer Photo</span>
              </button>

              <button
                type="button"
                id="btn-type-medicine-manual"
                onClick={() => setIsTypingManual(true)}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Search className="w-4 h-4 text-blue-600" />
                <span>Type Medicine Name</span>
              </button>
            </div>
          )}

          {/* Sample Prescriptions (Testing Helper) */}
          {onSelectSample && (
            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 block mb-1.5">
                Or test with a sample clear prescription:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectSample('antibiotic')}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  Antibiotic Rx
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSample('cardiac')}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-800 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  Cardiac Rx
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSample('fever_cold')}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-purple-50 text-purple-800 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
                >
                  Fever & Cold Rx
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
