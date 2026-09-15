import React, { useState, useEffect } from 'react';
import { Navbar, AppNavTab } from './components/Navbar';
import { PrescriptionUploader } from './components/PrescriptionUploader';
import { PrescriptionResultView } from './components/PrescriptionResultView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { InteractiveMedicalBackground } from './components/InteractiveMedicalBackground';
import { GlowingCursor } from './components/GlowingCursor';
import { SamplePrescription, SAMPLE_PRESCRIPTIONS } from './data/medicalData';
import { PrescriptionAnalysisResult, ImagePreprocessingReport, MedicineDetail } from './types';
import { ShieldCheck, Stethoscope, Heart, AlertCircle, Sparkles, AlertTriangle, ArrowRight, Lock, BookOpen, Search, FileText, PhoneCall, Newspaper } from 'lucide-react';
import { postProcessPrescriptionResultWithNLP } from './utils/smartNlpEngine';
import { createSamplePreprocessingReport } from './utils/imagePreprocessing';
import { getLearnedCorrections } from './utils/hitlLearningEngine';
import { UnunderstoodMedicinePopup } from './components/UnunderstoodMedicinePopup';
import { PrescriptionAnalyzingInteractiveModal } from './components/PrescriptionAnalyzingInteractiveModal';
import type { InfoPageType } from './components/InfoPages';
import { FaqSection } from './components/FaqSection';
import { ThePrescriptionLogo } from './components/ThePrescriptionLogo';
import { HowItWorksGuide } from './components/HowItWorksGuide';
import { Footer } from './components/Footer';
import { HomeSeoArticle } from './components/HomeSeoArticle';
import { useSeoMetadata } from './utils/seo';

// Lazy-load non-critical tabs and heavy PDF generation bundles to minimize initial load time
const MedicineLookup = React.lazy(() => import('./components/MedicineLookup').then((m) => ({ default: m.MedicineLookup })));
const AbbreviationDictionary = React.lazy(() => import('./components/AbbreviationDictionary').then((m) => ({ default: m.AbbreviationDictionary })));
const PrintableMedicationCard = React.lazy(() => import('./components/PrintableMedicationCard').then((m) => ({ default: m.PrintableMedicationCard })));
const InfoPages = React.lazy(() => import('./components/InfoPages').then((m) => ({ default: m.InfoPages })));
const BlogSection = React.lazy(() => import('./components/BlogSection').then((m) => ({ default: m.BlogSection })));

const TabLoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[360px] py-16 px-4">
    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center animate-pulse">
      <Sparkles className="w-6 h-6 text-emerald-600 animate-spin" style={{ animationDuration: '3s' }} />
    </div>
    <p className="mt-4 text-sm font-semibold text-slate-700">Loading section...</p>
    <p className="text-xs text-slate-400 mt-1">Fetching resources safely</p>
  </div>
);
import {
  initGA,
  trackPrescriptionAnalysis,
  trackSamplePrescriptionSelected,
  trackPrintCardOpened,
} from './utils/analytics';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppNavTab>('prescription');
  useSeoMetadata(activeTab);
  const [analysisResult, setAnalysisResult] = useState<PrescriptionAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analyzingImage, setAnalyzingImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Synchronize activeTab with URL hash (#blog, #lookup, #abbreviations, etc.)
  useEffect(() => {
    // Initialize Google Analytics 4
    initGA();

    const handleHash = () => {
      const h = window.location.hash.toLowerCase();
      if (h.startsWith('#blog')) {
        setActiveTab('blog');
      } else if (h.includes('lookup')) {
        setActiveTab('lookup');
      } else if (h.includes('abbreviation') || h.includes('codes')) {
        setActiveTab('abbreviations');
      } else if (['about', 'faq', 'contact', 'disclaimer', 'privacy', 'terms'].some((p) => h.includes(p))) {
        for (const p of ['about', 'faq', 'contact', 'disclaimer', 'privacy', 'terms'] as const) {
          if (h.includes(p)) {
            setActiveTab(p);
            break;
          }
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Helper to determine if prescription analysis resulted in completely ununderstood prescription
  // ONLY show when completely unable to identify ANY medicine name on the prescription
  const isPrescriptionUnunderstood = Boolean(
    analysisResult &&
      (!analysisResult.medicines ||
        analysisResult.medicines.length === 0 ||
        (analysisResult.unableToDecipher &&
          analysisResult.medicines.every((m) => {
            const n = (m.name || '').toLowerCase();
            return (
              !m.name ||
              m.name.trim().length <= 1 ||
              n.includes('apologies') ||
              n.includes("didn't understand") ||
              n.includes('unclear') ||
              n.includes('illegible') ||
              n.includes('unidentified')
            );
          })) ||
        analysisResult.medicines.every((m) => {
          const n = (m.name || '').toLowerCase();
          return (
            !m.name ||
            m.name.trim().length <= 1 ||
            n.includes('apologies') ||
            n.includes("didn't understand") ||
            n.includes('unclear') ||
            n.includes('illegible') ||
            n.includes('unidentified')
          );
        }))
  );

  const handleAnalyze = async (payload: {
    imageBase64?: string;
    textNotes?: string;
    patientContext?: string;
    ocrPretext?: string;
    preprocessingReport?: ImagePreprocessingReport;
  }) => {
    setIsLoading(true);
    setAnalyzingImage(payload.imageBase64 || null);
    setError(null);

    try {
      const learnedCorrections = getLearnedCorrections();
      const response = await fetch('/api/analyze-prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          learnedCorrections,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze prescription.');
      }

      // Apply Smart NLP Post-Processing layer (RapidFuzz, Brand->Generic, Dictionary, Confidence Scoring)
      const enrichedResult = postProcessPrescriptionResultWithNLP(data.data);
      if (enrichedResult && payload.preprocessingReport && !enrichedResult.imagePreprocessingReport) {
        enrichedResult.imagePreprocessingReport = payload.preprocessingReport;
      }
      setAnalysisResult(enrichedResult);

      // Track prescription analysis event in Google Analytics
      trackPrescriptionAnalysis({
        method: payload.imageBase64 ? 'photo' : 'text',
        medicinesCount: enrichedResult.medicines?.length || 0,
        hasPatientContext: Boolean(payload.patientContext),
      });

      // Smooth scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(
        err.message ||
          'Failed to decipher prescription. Please ensure the image is clear or enter the written medicine names directly.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sample: SamplePrescription | number) => {
    setError(null);
    const resolvedSample: SamplePrescription | undefined =
      typeof sample === 'number'
        ? SAMPLE_PRESCRIPTIONS[sample] || SAMPLE_PRESCRIPTIONS[0]
        : sample;

    if (!resolvedSample || !resolvedSample.sampleResult) {
      console.warn('Sample prescription could not be resolved:', sample);
      return;
    }

    // Enrich sample with Smart NLP layer
    const enrichedSample = postProcessPrescriptionResultWithNLP(resolvedSample.sampleResult);
    if (!enrichedSample) {
      console.warn('Could not enrich sample result');
      return;
    }

    if (!enrichedSample.imagePreprocessingReport) {
      enrichedSample.imagePreprocessingReport = createSamplePreprocessingReport(
        resolvedSample.title || 'Sample Prescription',
        resolvedSample.sampleResult.medicines?.map((m) => m.name) || []
      );
    }
    setAnalysisResult(enrichedSample);

    // Track sample selection in Google Analytics
    trackSamplePrescriptionSelected(resolvedSample.title || 'Sample Prescription');

    setActiveTab('prescription');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmOrEditMedicine = (
    index: number,
    newName: string,
    newGeneric?: string,
    extraDetails?: Partial<MedicineDetail>
  ) => {
    if (!analysisResult) return;

    let updatedMedicines = [...analysisResult.medicines];
    let targetMed = updatedMedicines[index];

    if (!targetMed) {
      // If medicine array was empty, construct first entry
      targetMed = {
        name: newName,
        genericName: newGeneric || 'Active Generic Salt',
        dosage: extraDetails?.dosage || '1 tablet',
        frequency: extraDetails?.frequency || 'As directed by physician',
        mealRelation: extraDetails?.mealRelation || 'after_food',
        mealRelationText: extraDetails?.mealRelationText || 'Take with water after meals',
        duration: extraDetails?.duration || 'As prescribed',
        purposeAndUsage: extraDetails?.purposeAndUsage || 'Medication verified by patient / caregiver.',
        prescribedAs: extraDetails?.prescribedAs || 'brand',
        companyName: extraDetails?.companyName,
        popularCompanyBrands: extraDetails?.popularCompanyBrands,
        activeGenericSalt: newGeneric || extraDetails?.activeGenericSalt,
        commonSideEffects: extraDetails?.commonSideEffects || [],
        precautions: extraDetails?.precautions || [],
        ...extraDetails,
      };
      updatedMedicines.push(targetMed);
    }

    const oldName = targetMed.name;
    const canonicalGeneric = newGeneric || targetMed.genericName;

    updatedMedicines[index] = {
      ...targetMed,
      ...extraDetails,
      name: newName,
      genericName: canonicalGeneric,
      activeGenericSalt: canonicalGeneric || extraDetails?.activeGenericSalt,
      nlpResolution: {
        ...(targetMed.nlpResolution || {
          originalRawToken: oldName,
          matchedBrandOrDrug: newName,
          canonicalGeneric: canonicalGeneric,
          confidenceScore: 100,
          confidenceLevel: 'high',
          spellingCorrected: false,
          brandToGenericMapped: true,
        }),
        matchedBrandOrDrug: newName,
        canonicalGeneric: canonicalGeneric,
        confidenceScore: 100,
        confidenceLevel: 'high',
        matchAlgorithm: 'hitl_learned_memory',
        userConfirmed: true,
      },
    };

    // Update chronologicalTakingPlan names if name changed
    const updatedPlan = analysisResult.chronologicalTakingPlan?.map((item) => {
      if (item.medicineName === oldName || item.medicineName?.toLowerCase().includes('apologies')) {
        return {
          ...item,
          medicineName: newName,
          genericName: canonicalGeneric,
        };
      }
      return item;
    });

    // Recompute smartNlpSummary
    const highConfidenceCount = updatedMedicines.filter(
      (m) => m.nlpResolution?.confidenceLevel === 'high'
    ).length;
    const mediumConfidenceCount = updatedMedicines.filter(
      (m) => m.nlpResolution?.confidenceLevel === 'medium'
    ).length;
    const lowConfidenceCount = updatedMedicines.filter(
      (m) => m.nlpResolution?.confidenceLevel === 'low'
    ).length;
    const spellingsCorrectedCount = updatedMedicines.filter(
      (m) => m.nlpResolution?.spellingCorrected
    ).length;
    const brandsMappedCount = updatedMedicines.filter(
      (m) => m.nlpResolution?.brandToGenericMapped
    ).length;

    setAnalysisResult({
      ...analysisResult,
      unableToDecipher: false,
      medicines: updatedMedicines,
      chronologicalTakingPlan: updatedPlan,
      multiEngineEnsemble: analysisResult.multiEngineEnsemble
        ? {
            ...analysisResult.multiEngineEnsemble,
            overallConfidence: 98.6,
            ensembleAgreementPercent: 99.0,
          }
        : undefined,
      smartNlpSummary: {
        totalMedicinesProcessed: updatedMedicines.length,
        highConfidenceCount,
        mediumConfidenceCount,
        lowConfidenceCount,
        spellingsCorrectedCount,
        brandsMappedCount,
        requiresUserConfirmation:
          lowConfidenceCount > 0 || mediumConfidenceCount > 0,
      },
    });
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative bg-slate-50/80 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Dynamic Mouse-Interactive Medical Background */}
      <InteractiveMedicalBackground />

      {/* Radiant Glowing Cursor Follower */}
      <GlowingCursor />

      {/* Top Navigation */}
      <div className="relative z-20">
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setError(null);
          }}
          hasResult={Boolean(analysisResult && !isPrescriptionUnunderstood)}
          onOpenPrintModal={() => {
            setIsPrintModalOpen(true);
            trackPrintCardOpened();
          }}
          hideOtherTabs={isPrescriptionUnunderstood}
        />
      </div>

      {/* Trust & Safety Banner */}
      <div className="relative z-10 bg-emerald-900/95 backdrop-blur-xs text-emerald-100 py-2 px-3 sm:px-4 text-[11px] sm:text-xs font-medium border-b border-emerald-800/60 print:hidden shadow-2xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-snug">
              Medical Handwriting Decryption: Identify medicines, dosage times & lab tests safely.
            </span>
          </div>
          <span className="text-[11px] text-emerald-300/80 hidden md:inline shrink-0">
            Clinical Reference & Safety Guidance
          </span>
        </div>
      </div>

      {/* Main Container with bottom clearance for mobile nav */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-28 sm:pb-12">
        {activeTab === 'prescription' && (
          <div className="space-y-6">
            {!analysisResult || isPrescriptionUnunderstood ? (
              <>
                <PrescriptionUploader
                  onAnalyze={handleAnalyze}
                  onSelectSample={handleSelectSample}
                  isLoading={isLoading}
                  error={error}
                />
                {isPrescriptionUnunderstood && (
                  <UnunderstoodMedicinePopup
                    onClose={handleReset}
                    onUploadNew={handleReset}
                    onSelectSample={handleSelectSample}
                    onConfirmMedicine={(newName, canonicalGeneric, extraDetails) => {
                      handleConfirmOrEditMedicine(0, newName, canonicalGeneric, extraDetails);
                    }}
                  />
                )}

                {/* Interactive Animated "How It Works" Guide - Displayed ONLY on Home Page */}
                <HowItWorksGuide
                  onStartUpload={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSelectSample={handleSelectSample}
                />

                {/* Homepage Embedded FAQ Section */}
                <FaqSection
                  variant="homepage"
                  onNavigateToTab={(tab) => setActiveTab(tab as AppNavTab)}
                />

                {/* High-Visibility Clinical Tools & Quick Actions directly below FAQ */}
                <div className="pt-6 pb-2">
                  <div className="text-center max-w-2xl mx-auto mb-6">
                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-full">
                      Clinical Exploration
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                      Fast Medical Tools & Databases
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Access our drug catalog, decode Latin abbreviations, or review medical safety policies.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Tool 1: Medicine Lookup */}
                    <button
                      type="button"
                      onClick={() => setActiveTab('lookup')}
                      className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all text-left group cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                          <Search className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                          Medicine Directory
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          Search 5,000+ brand names, active pharmacological molecules, side effects, and safe food timing.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-black text-blue-700">
                        <span>Search Medicines</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* Tool 2: Doctor Abbreviations */}
                    <button
                      type="button"
                      onClick={() => setActiveTab('abbreviations')}
                      className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-purple-500 shadow-sm hover:shadow-md transition-all text-left group cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-slate-900 text-base group-hover:text-purple-700 transition-colors">
                          Doctor Shorthand Codes
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          Decipher Latin prescription codes: 1-0-1, BD (twice daily), TDS, AC (before meals), PC, and SOS.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-black text-purple-700">
                        <span>Explore Codes</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* Tool 3: Articles & Health Guides */}
                    <button
                      type="button"
                      onClick={() => setActiveTab('blog')}
                      className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all text-left group cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                          <Newspaper className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                          Clinical Articles (17)
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          In-depth patient guides to doctor handwriting, generic drugs, food interactions, and dosing safety.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-black text-teal-700">
                        <span>Read Guides</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* Tool 4: Sample Prescriptions Test */}
                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all text-left group cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                          <FileText className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                          Check Handwriting
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          Upload a photo or choose from 6 realistic doctor clinic samples to see real-time AI transcription.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-black text-emerald-700">
                        <span>Back to Scanner</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Comprehensive SEO & Patient Health Literacy Guide (1,800+ Words) */}
                <HomeSeoArticle onNavigateToTab={(tab) => setActiveTab(tab as AppNavTab)} />
              </>
            ) : (
              <ErrorBoundary onReset={handleReset} fallbackTitle="Prescription Display Error">
                <PrescriptionResultView
                  result={analysisResult}
                  onReset={handleReset}
                  onOpenPrintModal={() => setIsPrintModalOpen(true)}
                  onConfirmOrEditMedicine={handleConfirmOrEditMedicine}
                />
              </ErrorBoundary>
            )}
          </div>
        )}

        <React.Suspense fallback={<TabLoadingFallback />}>
          {activeTab === 'lookup' && <MedicineLookup />}

          {activeTab === 'abbreviations' && <AbbreviationDictionary />}

          {activeTab === 'blog' && (
            <BlogSection onNavigateToScanner={() => setActiveTab('prescription')} />
          )}

          {/* Informational, Legal, and Contact Pages */}
          {['about', 'faq', 'contact', 'disclaimer', 'privacy', 'terms'].includes(activeTab) && (
            <InfoPages
              currentPage={activeTab as InfoPageType}
              onNavigate={(page) => setActiveTab(page as AppNavTab)}
            />
          )}
        </React.Suspense>
      </main>

      {/* Interactive HUD during Prescription Analysis */}
      <PrescriptionAnalyzingInteractiveModal
        isLoading={isLoading}
        uploadedImage={analyzingImage}
      />

      {/* Printable Medication Card Modal */}
      {isPrintModalOpen && analysisResult && (
        <React.Suspense fallback={null}>
          <PrintableMedicationCard
            prescription={analysisResult}
            onClose={() => setIsPrintModalOpen(false)}
          />
        </React.Suspense>
      )}

      {/* Modern Interactive Clinical Footer */}
      <Footer
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />
    </div>
  );
}
