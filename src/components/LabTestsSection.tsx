import React, { useState } from 'react';
import {
  TestTubes,
  Activity,
  AlertTriangle,
  CheckCircle,
  FileText,
  Info,
  Clock,
  Sparkles,
  ExternalLink,
  Search,
} from 'lucide-react';
import { LabTestDetail } from '../types';

interface LabTestsSectionProps {
  labTests?: LabTestDetail[];
  suspectedCondition?: string;
}

export const LabTestsSection: React.FC<LabTestsSectionProps> = ({
  labTests = [],
  suspectedCondition,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const hasTests = labTests && labTests.length > 0;

  const filteredTests = labTests.filter((test) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'blood' && test.category.toLowerCase().includes('blood')) ||
      (activeFilter === 'radiology' && (test.category.toLowerCase().includes('radiology') || test.category.toLowerCase().includes('x-ray') || test.category.toLowerCase().includes('imaging'))) ||
      (activeFilter === 'fasting' && test.fastingRequired);

    const matchesSearch =
      test.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.whyDoctorOrdered.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section
      id="laboratory-tests-section"
      className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-500/40 dark:border-amber-500/50 shadow-sm overflow-hidden"
    >
      {/* Header Banner with Warm Amber & Solar Orange Theme */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-orange-950 text-white p-5 sm:p-7 md:p-8 relative overflow-hidden">
        {/* Subtle lab beaker & test tubes glow artwork */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <svg
          className="absolute right-6 top-1/2 -translate-y-1/2 w-48 h-32 text-amber-500/10 pointer-events-none hidden sm:block"
          viewBox="0 0 160 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M40 20 L40 70 L25 100 L65 100 L50 70 L50 20 Z" />
          <path d="M90 20 L90 80 A15 15 0 0 0 120 80 L120 20 Z" />
          <line x1="35" y1="20" x2="55" y2="20" />
          <line x1="85" y1="20" x2="125" y2="20" />
        </svg>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2.5 border border-amber-400/30 backdrop-blur-xs">
              <TestTubes className="w-3.5 h-3.5 text-amber-400" />
              <span>Laboratory & Diagnostic Investigations</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Prescribed Medical Lab Tests & Scans
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-2xl leading-relaxed">
              Laboratory tests, diagnostic blood work, pathology, and imaging scans detected under doctor's notes (Adv / Inv / Investigations).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black border shadow-inner ${
                hasTests
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700'
              }`}
            >
              {hasTests ? `${labTests.length} Test${labTests.length !== 1 ? 's' : ''} Prescribed` : 'No Lab Tests on Slip'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7 md:p-8 space-y-6">
        {hasTests ? (
          <>
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-800 dark:hover:text-amber-300'
                  }`}
                >
                  All ({labTests.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('blood')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeFilter === 'blood'
                      ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-800 dark:hover:text-amber-300'
                  }`}
                >
                  Blood Work
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('radiology')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeFilter === 'radiology'
                      ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-800 dark:hover:text-amber-300'
                  }`}
                >
                  Imaging / Scans
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('fasting')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    activeFilter === 'fasting'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Fasting Required
                </button>
              </div>

              <div className="relative sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Test Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTests.map((test, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-indigo-100/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 hover:shadow-xs transition-all space-y-3.5"
                >
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/60 px-2 py-0.5 rounded-md">
                        {test.category}
                      </span>
                      <h3 className="text-base font-black text-slate-900 dark:text-white mt-1.5">
                        {test.testName}
                      </h3>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {test.urgency === 'urgent' && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-[10px] font-extrabold flex items-center gap-1 border border-rose-200 dark:border-rose-800">
                          <AlertTriangle className="w-3 h-3" />
                          Urgent
                        </span>
                      )}
                      {test.fastingRequired ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-[10px] font-bold border border-amber-200 dark:border-amber-800/60">
                          Fasting Needed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium">
                          No Fasting
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Why Doctor Ordered */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      Why Doctor Prescribed This Test
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {test.whyDoctorOrdered}
                    </p>
                  </div>

                  {/* Preparation Instructions */}
                  <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/60 text-xs space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                      Patient Preparation Required
                    </div>
                    <p className="text-amber-950 dark:text-amber-200 font-semibold leading-relaxed">
                      {test.preparationInstructions}
                    </p>
                  </div>

                  {/* Sample & Context Details */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Sample:</span>
                      <span>{test.sampleRequired || 'Standard collection'}</span>
                    </div>

                    {test.commonNormalRangeContext && (
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                        {test.commonNormalRangeContext}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty state when doctor did not prescribe lab tests */
          <div className="p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-100 dark:border-indigo-800/60">
              <TestTubes className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm md:text-base">
                No Diagnostic Laboratory Tests Identified on This Prescription
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                The doctor did not write any specific laboratory blood work, radiology scans (X-Ray/CT), or diagnostic pathology on this prescription slip.
              </p>
            </div>

            <div className="max-w-xl mx-auto p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 text-left text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="font-bold text-indigo-900 dark:text-indigo-400 flex items-center gap-1.5 text-xs">
                <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Medical Clinical Guidance:
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                If your symptoms persist, worsen, or do not improve within 48-72 hours of starting your medicines, your doctor may recommend baseline diagnostic investigations (such as Complete Blood Count, Inflammatory markers, or Imaging) to assess the condition further.
              </p>
            </div>
          </div>
        )}

        {/* Medical Knowledge Reference Drawer: Common Prescription Test Codes */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Medical Abbreviation Knowledge Base for Lab Tests
            </h4>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Standard Pathology Codes</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">CBC / FBC</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Complete Blood Count (Infection/Anemia)</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">LFT</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Liver Function Test (Bilirubin, SGOT/SGPT)</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">KFT / RFT</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Kidney Function Test (Creatinine, Urea)</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">FBS / PPBS</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Fasting & Post-Meal Blood Sugar</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">HbA1c</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">3-Month Average Glycemic Control</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">Lipid Profile</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Cholesterol & Triglycerides (Fasting)</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">CXR (PA View)</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Chest X-Ray (Lungs & Heart)</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100/80 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">Urine R/M</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Urine Routine & Microscopic Exam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
