/**
 * Core TypeScript definitions for Theprescription clinical deciphering engine.
 */

export type MealRelation =
  | 'before_meal'
  | 'after_meal'
  | 'with_meal'
  | 'empty_stomach'
  | 'anytime';

export interface ScheduleTimes {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  bedtime: boolean;
  asNeeded: boolean;
}

export interface NlpResolution {
  confidenceScore: number;
  originalRawToken?: string;
  brandToGenericMapped?: boolean;
  userConfirmed?: boolean;
  fuzzyMatchScore?: number;
  canonicalMatch?: string;
  reasoning?: string;
}

export interface PopularBrandEquivalent {
  brandName: string;
  companyName: string;
}

export interface MedicineDetail {
  name: string;
  genericName: string;
  form: string;
  strength: string;
  dosage: string;
  frequency: string;
  timingCode: string;
  mealRelation: MealRelation | string;
  mealRelationText: string;
  duration: string;
  scheduleTimes: ScheduleTimes;
  purposeAndUsage: string;
  howToTake: string;
  precautions: string[];
  commonSideEffects: string[];
  whenToContactDoctor?: string;
  // Clinical enrichment metadata
  nlpResolution?: NlpResolution;
  prescribedAs?: 'brand' | 'generic';
  companyName?: string;
  activeGenericSalt?: string;
  popularCompanyBrands?: PopularBrandEquivalent[];
}

export interface LabTestDetail {
  testName: string;
  category: string;
  whyDoctorOrdered: string;
  preparationInstructions: string;
  sampleRequired: string;
  fastingRequired: boolean;
  urgency?: string;
  commonNormalRangeContext?: string;
}

export interface TakingPlanMedicineItem {
  medicineName: string;
  genericName: string;
  dosage: string;
  instructions: string;
  isCriticalTiming?: boolean;
}

export interface ChronologicalTakingPlanSlot {
  timeLabel: string;
  slotName: string;
  title: string;
  description: string;
  items: TakingPlanMedicineItem[];
}

export interface MultiEngineStage {
  engineId: string;
  engineName: string;
  frameworkTag: string;
  engineRole: string;
  extractedSnippet: string;
  confidence: number;
  specialtyFocus: string;
  status: string;
}

export interface MultiEngineEnsembleResult {
  overallConfidence: number;
  ensembleAgreementPercent: number;
  engines: MultiEngineStage[];
  consensusTokens: string[];
  resolvedAmbiguities: string[];
  arbitrationExplanation: string;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WordToken {
  id: string;
  box: BoundingBox;
  text?: string;
  confidence?: number;
}

export interface SegmentedLine {
  id: string;
  lineIndex: number;
  box: BoundingBox;
  words: WordToken[];
  lineImageBase64?: string;
  recognizedText?: string;
}

export interface ImagePreprocessingReport {
  originalImage: string;
  enhancedImage: string;
  deskewedImage: string;
  adaptiveBinarizedImage: string;
  skewAngle: number;
  contrastEnhancementFactor: number;
  totalLinesDetected: number;
  totalWordsDetected: number;
  canvasWidth?: number;
  canvasHeight?: number;
  lines: SegmentedLine[];
}

export interface ScheduleSummary {
  morning: string[];
  afternoon: string[];
  evening: string[];
  bedtime: string[];
  asNeeded: string[];
}

export interface FoodAndDietaryRules {
  foodsToEat: string[];
  foodsToAvoidOrLimit: string[];
  hydrationAdvice: string;
}

export interface PrescriptionAnalysisResult {
  doctorSpecialtyOrClinic?: string;
  prescriptionDate?: string;
  suspectedCondition?: string;
  generalExplanation: string;
  medicines: MedicineDetail[];
  labTests: LabTestDetail[];
  chronologicalTakingPlan: ChronologicalTakingPlanSlot[];
  scheduleSummary: ScheduleSummary;
  potentialInteractionsOrSpacingAdvice: string[];
  foodAndDietaryRules: FoodAndDietaryRules;
  lifestyleAdvice: string[];
  unclearOrAmbiguousNotes?: string[];
  unableToDecipher?: boolean;
  multiEngineEnsemble?: MultiEngineEnsembleResult;
  medicalDisclaimer: string;
  imagePreprocessingReport?: ImagePreprocessingReport;
}
