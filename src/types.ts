export type MealRelation = 'before_meal' | 'after_meal' | 'with_meal' | 'empty_stomach' | 'anytime';

export type NLPConfidenceLevel = 'high' | 'medium' | 'low';

export interface SmartNLPAlternativeCandidate {
  brandName: string;
  genericName: string;
  similarityScore: number;
}

export interface SmartNLPResolution {
  originalRawToken?: string;
  matchedBrandOrDrug: string;
  canonicalGeneric: string;
  brandToGenericMapped: boolean;
  confidenceLevel: NLPConfidenceLevel;
  confidenceScore: number; // 0 - 100
  matchAlgorithm: 'exact_dictionary' | 'fuzzy_rapidfuzz' | 'shorthand_expansion' | 'misspelling_correction' | 'pharmacopeia_synonym' | 'hitl_learned_memory';
  spellingCorrected: boolean;
  originalSpelling?: string;
  userConfirmed?: boolean;
  alternativeCandidates?: SmartNLPAlternativeCandidate[];
}

export interface SmartNLPSummary {
  totalMedicinesProcessed: number;
  highConfidenceCount: number;
  mediumConfidenceCount: number;
  lowConfidenceCount: number;
  spellingsCorrectedCount: number;
  brandsMappedCount: number;
  requiresUserConfirmation: boolean;
  arbitrationNote?: string;
}

export interface ScheduleTimes {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  bedtime: boolean;
  asNeeded: boolean;
}

export interface CompanyMedicineBrand {
  brandName: string;
  companyName: string;
  standardStrength?: string;
  country?: string;
}

export interface MedicineDetail {
  id?: string;
  name: string;
  genericName: string;
  form: string;
  strength: string;
  dosage: string;
  frequency: string;
  timingCode: string;
  mealRelation: MealRelation;
  mealRelationText: string;
  duration: string;
  scheduleTimes: ScheduleTimes;
  purposeAndUsage: string;
  howToTake: string;
  precautions: string[];
  commonSideEffects: string[];
  whenToContactDoctor?: string;
  missedDoseGuidance?: string;
  storageRequirement?: string;
  nlpResolution?: SmartNLPResolution;
  // Two-way Generic vs Company Brand cross-reference
  prescribedAs?: 'brand' | 'generic';
  companyName?: string;
  activeGenericSalt?: string;
  popularCompanyBrands?: CompanyMedicineBrand[];
}

export interface LabTestDetail {
  id?: string;
  testName: string;
  category: 'Blood Investigation' | 'Radiology / Imaging' | 'Urine / Stool' | 'Cardiology / ECG' | 'Microbiology / Culture' | 'Biochemistry' | 'Other';
  whyDoctorOrdered: string;
  preparationInstructions: string;
  sampleRequired: string;
  fastingRequired: boolean;
  urgency: 'routine' | 'urgent' | 'follow_up';
  commonNormalRangeContext?: string;
}

export interface ChronologicalScheduleStep {
  timeLabel: string;
  slotName: 'morning_empty_stomach' | 'morning_after_breakfast' | 'afternoon_after_lunch' | 'evening_tea' | 'night_after_dinner' | 'bedtime' | 'as_needed';
  title: string;
  description: string;
  items: {
    medicineName: string;
    genericName: string;
    dosage: string;
    instructions: string;
    isCriticalTiming?: boolean;
  }[];
}

export interface MultiEngineOCRDetail {
  engineId:
    | 'stroke_ligature'
    | 'document_layout'
    | 'latin_shorthand'
    | 'dosage_metrics'
    | 'pharmacopeia_consensus'
    | 'trocr'
    | 'donut'
    | 'cnn_rnn'
    | 'paddle'
    | 'gemini_arbiter'
    | string;
  engineName: string;
  frameworkTag: string;
  engineRole: string;
  extractedSnippet: string;
  confidence: number;
  specialtyFocus: string;
  status: 'completed' | 'consensus_aligned' | string;
}

export interface MultiEngineEnsembleResult {
  overallConfidence: number;
  ensembleAgreementPercent: number;
  engines: MultiEngineOCRDetail[];
  consensusTokens: string[];
  resolvedAmbiguities: string[];
  arbitrationExplanation: string;
}

export interface PrescriptionAnalysisResult {
  unableToDecipher?: boolean;
  doctorSpecialtyOrClinic?: string;
  prescriptionDate?: string;
  suspectedCondition?: string;
  generalExplanation: string;
  medicines: MedicineDetail[];
  labTests?: LabTestDetail[];
  chronologicalTakingPlan?: ChronologicalScheduleStep[];
  scheduleSummary: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    bedtime: string[];
    asNeeded: string[];
  };
  potentialInteractionsOrSpacingAdvice: string[];
  foodAndDietaryRules?: {
    foodsToEat: string[];
    foodsToAvoidOrLimit: string[];
    hydrationAdvice: string;
  };
  lifestyleAdvice: string[];
  unclearOrAmbiguousNotes: string[];
  ocrTranscriptionNotes?: {
    engineUsed: string;
    rawTokensIdentified?: string[];
    confidenceAssessment?: string;
  };
  multiEngineEnsemble?: MultiEngineEnsembleResult;
  smartNlpSummary?: SmartNLPSummary;
  imagePreprocessingReport?: ImagePreprocessingReport;
  medicalDisclaimer: string;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WordSegment {
  id: string;
  box: BoundingBox;
  confidence?: number;
  extractedText?: string;
}

export interface LineSegment {
  id: string;
  lineIndex: number;
  box: BoundingBox;
  words: WordSegment[];
  lineImageBase64?: string;
  extractedText?: string;
}

export interface ImagePreprocessingReport {
  originalImage: string;
  enhancedImage: string; // Denoised + Contrast enhanced
  deskewedImage: string; // Straightened text orientation
  adaptiveBinarizedImage: string; // Sharp black-and-white
  skewAngle: number; // e.g., -2.4 degrees
  canvasWidth: number;
  canvasHeight: number;
  noiseReductionApplied: boolean;
  contrastEnhancementFactor: number;
  adaptiveThresholdWindow: number;
  lines: LineSegment[];
  totalWordsDetected: number;
  totalLinesDetected: number;
  processingTimeMs: number;
  statusMessage: string;
}

export interface MedicalAbbreviation {
  abbr: string;
  fullLatin?: string;
  englishMeaning: string;
  example: string;
  category:
    | 'frequency'
    | 'timing'
    | 'form'
    | 'route'
    | 'instructions'
    | 'lab_test'
    | 'clinical_directive'
    | 'measurement'
    | 'eye_ear';
}

