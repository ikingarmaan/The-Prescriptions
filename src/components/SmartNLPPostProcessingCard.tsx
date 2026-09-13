import React from 'react';
import { Sparkles, Brain, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { MedicineDetail } from '../types';

interface SmartNLPPostProcessingCardProps {
  medicines: MedicineDetail[];
  className?: string;
}

export const SmartNLPPostProcessingCard: React.FC<SmartNLPPostProcessingCardProps> = ({
  medicines = [],
  className = '',
}) => {
  if (!medicines || medicines.length === 0) return null;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
          <Brain className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Smart NLP Post-Processing &amp; Normalization
          </h4>
          <p className="text-xs text-slate-500">
            Pharmacopeia alignment, canonical fuzzy matching, and dosage resolution
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {medicines.map((med, idx) => {
          const nlp = med.nlpResolution;
          const score = nlp?.confidenceScore ?? 95;

          return (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>{med.name}</span>
                  {nlp?.brandToGenericMapped && (
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Mapped Salt
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  {med.genericName} • {med.dosage}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[11px] font-mono text-slate-600">
                  Confidence: <strong className="text-purple-700">{score.toFixed(1)}%</strong>
                </span>
                <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${Math.min(100, score)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
