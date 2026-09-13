import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface HomeSeoArticleProps {
  onNavigateToTab?: (tab: string) => void;
}

export const HomeSeoArticle: React.FC<HomeSeoArticleProps> = () => {
  return (
    <section id="emergency-protocols" className="mt-10 space-y-4 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">Emergency Protocol</span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Emergency Medical Situations vs. Educational Review: Clear Boundaries
          </h3>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        Theprescription is engineered to champion patient health literacy, explain technical pharmacological terminology, and encourage proactive, informed dialogues between patients and certified clinicians. However, digital educational software must establish unequivocal clinical boundaries.
      </p>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        If you, a family member, or a person under your care experiences sudden acute symptoms — such as sudden respiratory distress, acute anaphylactic swelling of lips or throat, crushing chest pain radiating to the neck or arm, sudden motor weakness, severe confusion, uncontrolled hemorrhaging, or an accidental overdose — <strong>do not upload images or read online articles</strong>. Immediately telephone your regional emergency hotline (e.g. 911 in the USA, 112 in Europe, 999 in the UK) or proceed directly to the nearest hospital emergency department.
      </p>

      <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
        <p className="font-semibold text-white mb-1">Our Educational Commitment:</p>
        <p>
          Theprescription does not dispense medicines, provide official medical diagnoses, formulate treatment plans, or alter clinical prescriptions. Always treat the physical label attached by your registered pharmacist as the primary authoritative instruction, and consult your physician for all personalized diagnostic and dosing decisions.
        </p>
      </div>
    </section>
  );
};
