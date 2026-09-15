import { PrescriptionAnalysisResult, MedicineDetail } from '../types';
import { crossReferenceMedicine } from '../data/medicineCatalog';

/**
 * Smart NLP Post-Processing Engine:
 * Refines raw AI extractions, computes token confidence scores, resolves brand-to-generic mappings,
 * and flags ambiguous or ununderstood doctor handwriting tokens.
 */
export function postProcessPrescriptionResultWithNLP(
  result: PrescriptionAnalysisResult
): PrescriptionAnalysisResult {
  if (!result || typeof result !== 'object') {
    return result;
  }

  // Deep clone to avoid mutating input directly
  const enriched: PrescriptionAnalysisResult = JSON.parse(JSON.stringify(result));

  if (!enriched.medicines || !Array.isArray(enriched.medicines)) {
    enriched.medicines = [];
  }

  let totalScore = 0;
  let validCount = 0;

  enriched.medicines = enriched.medicines.map((med: MedicineDetail) => {
    const rawName = (med.name || '').trim();
    const rawGeneric = (med.genericName || '').trim();

    const isUnunderstood =
      !rawName ||
      rawName.length <= 1 ||
      rawName.toLowerCase().includes('apologies') ||
      rawName.toLowerCase().includes('unidentified') ||
      rawName.toLowerCase().includes('pharmacist') ||
      rawName.toLowerCase().includes('unclear') ||
      rawName.toLowerCase().includes('illegible') ||
      rawName.toLowerCase().includes('scribble') ||
      rawName.toLowerCase().includes('unknown');

    // Cross-reference with pharmacological catalog
    const catalogData = crossReferenceMedicine(rawName, rawGeneric);

    // Compute NLP confidence score
    let score = 95.0;
    if (isUnunderstood) {
      score = 0.0;
    } else {
      if (catalogData.activeGenericSalt && catalogData.activeGenericSalt !== rawName) {
        score = 98.0;
      }
      if (med.strength && med.strength.length > 1) {
        score = Math.min(99.5, score + 1.5);
      }
      if (med.timingCode && med.timingCode.length > 0) {
        score = Math.min(99.8, score + 0.5);
      }
    }

    if (!isUnunderstood) {
      totalScore += score;
      validCount++;
    }

    const nlpResolution = med.nlpResolution || {
      confidenceScore: score,
      originalRawToken: rawName,
      brandToGenericMapped: Boolean(catalogData.activeGenericSalt),
      userConfirmed: false,
      canonicalMatch: catalogData.activeGenericSalt || rawName,
    };

    return {
      ...med,
      prescribedAs: med.prescribedAs || catalogData.prescribedAs,
      companyName: med.companyName || catalogData.companyName,
      activeGenericSalt: med.activeGenericSalt || catalogData.activeGenericSalt,
      popularCompanyBrands:
        med.popularCompanyBrands && med.popularCompanyBrands.length > 0
          ? med.popularCompanyBrands
          : catalogData.popularCompanyBrands,
      nlpResolution,
    };
  });

  // Calculate ensemble overall confidence if missing or 0
  if (enriched.multiEngineEnsemble) {
    if (validCount > 0 && (!enriched.multiEngineEnsemble.overallConfidence || enriched.multiEngineEnsemble.overallConfidence === 0)) {
      enriched.multiEngineEnsemble.overallConfidence = Math.round((totalScore / validCount) * 10) / 10;
    } else if (validCount === 0) {
      enriched.multiEngineEnsemble.overallConfidence = 0.0;
    }
  }

  // Check if entire prescription is undecipherable
  const allUnunderstood =
    enriched.medicines.length === 0 ||
    enriched.medicines.every((m) => (m.nlpResolution?.confidenceScore ?? 0) === 0);

  if (allUnunderstood) {
    enriched.unableToDecipher = true;
    if (enriched.multiEngineEnsemble) {
      enriched.multiEngineEnsemble.overallConfidence = 0.0;
    }
  } else {
    enriched.unableToDecipher = false;
  }

  return enriched;
}
