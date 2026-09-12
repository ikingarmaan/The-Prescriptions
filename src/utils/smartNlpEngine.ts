import {
  MEDICINE_DICTIONARY,
  BRAND_TO_GENERIC_MAP,
  DictionaryEntry,
} from '../data/medicineDictionary';
import { crossReferenceMedicine } from '../data/medicineCatalog';
import { findLearnedCorrection } from './hitlLearningEngine';
import {
  MedicineDetail,
  NLPConfidenceLevel,
  PrescriptionAnalysisResult,
  SmartNLPAlternativeCandidate,
  SmartNLPResolution,
  SmartNLPSummary,
} from '../types';

/**
 * =========================================================================
 * RAPIDFUZZ-EQUIVALENT FUZZY MATCHING SUITE
 * High-performance string metrics for messy medical prescription OCR tokens
 * =========================================================================
 */

/**
 * Computes Damerau-Levenshtein distance (accounts for insertions, deletions,
 * substitutions, and adjacent character transpositions/swaps common in OCR).
 */
export function damerauLevenshtein(a: string, b: string): number {
  const s1 = a.toLowerCase();
  const s2 = b.toLowerCase();
  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0) return len2;
  if (len2 === 0) return len1;

  const d: number[][] = [];
  for (let i = 0; i <= len1; i++) {
    d[i] = [];
    d[i][0] = i;
  }
  for (let j = 0; j <= len2; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
      );

      // Transposition check (swapped adjacent letters)
      if (
        i > 1 &&
        j > 1 &&
        s1[i - 1] === s2[j - 2] &&
        s1[i - 2] === s2[j - 1]
      ) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }

  return d[len1][len2];
}

/**
 * Standard Levenshtein Ratio (0 - 100)
 */
export function fuzzyRatio(s1: string, s2: string): number {
  const clean1 = s1.trim().toLowerCase();
  const clean2 = s2.trim().toLowerCase();
  if (clean1 === clean2) return 100;
  if (!clean1 || !clean2) return 0;

  const maxLen = Math.max(clean1.length, clean2.length);
  const dist = damerauLevenshtein(clean1, clean2);
  const score = ((maxLen - dist) / maxLen) * 100;
  return Math.max(0, Math.round(score));
}

/**
 * Partial Ratio: Finds the best matching substring in longer string
 */
export function partialRatio(s1: string, s2: string): number {
  const str1 = s1.trim().toLowerCase();
  const str2 = s2.trim().toLowerCase();
  if (str1 === str2) return 100;
  if (!str1 || !str2) return 0;

  const shorter = str1.length <= str2.length ? str1 : str2;
  const longer = str1.length <= str2.length ? str2 : str1;

  if (longer.includes(shorter)) return 100;

  const shortLen = shorter.length;
  let maxScore = 0;

  // Window slide across the longer string
  for (let i = 0; i <= longer.length - shortLen; i++) {
    const sub = longer.substring(i, i + shortLen);
    const score = fuzzyRatio(shorter, sub);
    if (score > maxScore) {
      maxScore = score;
      if (maxScore === 100) break;
    }
  }

  return maxScore;
}

/**
 * Token Sort Ratio: Tokenizes, alphabetically sorts, and matches
 * (e.g., "Augmentin 625" and "625 Augmentin" will match with 100%)
 */
export function tokenSortRatio(s1: string, s2: string): number {
  const tokenize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .sort()
      .join(' ');

  const sorted1 = tokenize(s1);
  const sorted2 = tokenize(s2);
  return fuzzyRatio(sorted1, sorted2);
}

/**
 * Token Set Ratio: Compares common tokens vs disjoint tokens
 * (Handles extra tokens like "Tab Augmentin 625mg" vs "Augmentin")
 */
export function tokenSetRatio(s1: string, s2: string): number {
  const tokens1 = new Set(
    s1.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(Boolean)
  );
  const tokens2 = new Set(
    s2.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(Boolean)
  );

  const intersection = Array.from(tokens1).filter((t) => tokens2.has(t)).sort();
  const diff1to2 = Array.from(tokens1).filter((t) => !tokens2.has(t)).sort();
  const diff2to1 = Array.from(tokens2).filter((t) => !tokens1.has(t)).sort();

  const interStr = intersection.join(' ');
  const s1Str = [...intersection, ...diff1to2].join(' ');
  const s2Str = [...intersection, ...diff2to1].join(' ');

  if (intersection.length > 0 && interStr) {
    const score1 = fuzzyRatio(interStr, s1Str);
    const score2 = fuzzyRatio(interStr, s2Str);
    const score3 = fuzzyRatio(s1Str, s2Str);
    return Math.max(score1, score2, score3, 90);
  }

  return tokenSortRatio(s1, s2);
}

/**
 * Combined RapidFuzz metric: balances partial ratio, token set ratio,
 * and standard Damerau-Levenshtein similarity.
 */
export function rapidFuzzScore(str1: string, str2: string): number {
  const ratio = fuzzyRatio(str1, str2);
  const partial = partialRatio(str1, str2);
  const tokenSet = tokenSetRatio(str1, str2);

  // Highest confidence when token set or ratio is high
  return Math.max(ratio, Math.round(tokenSet * 0.7 + partial * 0.3));
}

/**
 * Cleans medicine string to isolate the core brand/drug stem
 * by stripping dosages, formulation prefixes, and Latin shorthand.
 */
export function cleanMedicineStem(rawName: string): {
  stem: string;
  extractedDosage?: string;
  extractedForm?: string;
} {
  let cleaned = rawName.trim();

  // Extract common formulation prefixes
  let extractedForm: string | undefined;
  const formMatch = cleaned.match(
    /\b(tab|capsule|cap|syp|syrup|inj|injection|drops|oint|ointment|sachet|dt)\b/i
  );
  if (formMatch) {
    extractedForm = formMatch[0];
    cleaned = cleaned.replace(new RegExp(`\\b${formMatch[0]}\\b`, 'gi'), ' ');
  }

  // Extract strength/dosage e.g. 625mg, 500, 40mg, 10ml, 50mcg
  let extractedDosage: string | undefined;
  const dosageMatch = cleaned.match(/\b\d+(\.\d+)?\s*(mg|mcg|ml|g|gm|iu|%)?\b/i);
  if (dosageMatch && dosageMatch[0].length > 0 && !dosageMatch[0].match(/^[1-3]$/)) {
    extractedDosage = dosageMatch[0].trim();
    cleaned = cleaned.replace(dosageMatch[0], ' ');
  }

  // Strip Latin timing codes like 1-0-1, OD, BD, TDS
  cleaned = cleaned.replace(/\b(1-0-1|1-0-0|0-0-1|1-1-1|od|bd|bid|tds|tid|qid|hs|ac|pc|sos|stat)\b/gi, ' ');

  // Strip punctuation and extra spaces
  cleaned = cleaned.replace(/[^a-zA-Z0-9-]/g, ' ').replace(/\s+/g, ' ').trim();

  return {
    stem: cleaned || rawName.trim(),
    extractedDosage,
    extractedForm,
  };
}

/**
 * =========================================================================
 * SMART NLP MEDICINE RESOLUTION ENGINE
 * - Fuzzy Matching (RapidFuzz)
 * - Brand → Generic Mapping
 * - Medicine Dictionary & Short Form Resolution
 * - Confidence Scoring (High / Medium / Low) with Candidate Suggestions
 * =========================================================================
 */
export function resolveMedicineNLP(
  rawMedicineName: string,
  existingGeneric?: string
): SmartNLPResolution {
  const { stem, extractedDosage } = cleanMedicineStem(rawMedicineName);
  const lowerStem = stem.toLowerCase();
  const lowerRaw = rawMedicineName.trim().toLowerCase();

  // 0. Human-in-the-Loop Learned Corrections Memory (Site Training)
  const learned = findLearnedCorrection(rawMedicineName) || findLearnedCorrection(stem);
  if (learned) {
    const brand = `${learned.confirmedMedicine}${extractedDosage && !learned.confirmedMedicine.includes(extractedDosage) ? ' ' + extractedDosage : ''}`;
    return {
      originalRawToken: rawMedicineName,
      matchedBrandOrDrug: brand,
      canonicalGeneric: learned.confirmedGeneric,
      brandToGenericMapped: true,
      confidenceLevel: 'high',
      confidenceScore: 100,
      matchAlgorithm: 'hitl_learned_memory',
      spellingCorrected: brand.toLowerCase() !== lowerStem,
      originalSpelling: rawMedicineName,
      userConfirmed: true,
    };
  }

  // 0b. Ambiguous / Illegible Scribble Check - ONLY when truly unreadable/illegible
  const rawLower = rawMedicineName.trim().toLowerCase();
  const isTrulyUnreadable =
    rawMedicineName.trim().length <= 1 ||
    rawLower === '?' ||
    rawLower === '...' ||
    rawLower === 'illegible' ||
    rawLower.includes('apologies') ||
    rawLower.includes("didn't understand") ||
    rawLower.includes('unidentified') ||
    rawLower.includes('undecipherable') ||
    rawLower.includes('scribble') ||
    rawLower.includes('illegible handwriting') ||
    rawLower.includes('handwriting unclear');

  if (isTrulyUnreadable) {
    return {
      originalRawToken: rawMedicineName,
      matchedBrandOrDrug: "Apologies, we didn't understand this medicine",
      canonicalGeneric: "Handwriting unclear — please verify or type manually",
      brandToGenericMapped: false,
      confidenceLevel: 'low',
      confidenceScore: 25,
      matchAlgorithm: 'fuzzy_rapidfuzz',
      spellingCorrected: false,
      originalSpelling: rawMedicineName,
    };
  }

  // 1. Direct Exact Match in Dictionary (Brand or Generic)
  for (const entry of MEDICINE_DICTIONARY) {
    if (
      lowerStem === entry.brandName.toLowerCase() ||
      lowerRaw.includes(entry.brandName.toLowerCase()) ||
      lowerStem === entry.genericName.toLowerCase()
    ) {
      return {
        originalRawToken: rawMedicineName,
        matchedBrandOrDrug: entry.brandName,
        canonicalGeneric: entry.genericName,
        brandToGenericMapped: true,
        confidenceLevel: 'high',
        confidenceScore: 98,
        matchAlgorithm: 'exact_dictionary',
        spellingCorrected: false,
      };
    }
  }

  // 2. Short Form & Doctor Shorthand Match
  for (const entry of MEDICINE_DICTIONARY) {
    for (const sf of entry.shortForms) {
      if (
        lowerStem === sf.toLowerCase() ||
        lowerRaw.startsWith(sf.toLowerCase()) ||
        lowerStem.startsWith(sf.toLowerCase())
      ) {
        return {
          originalRawToken: rawMedicineName,
          matchedBrandOrDrug: `${entry.brandName}${extractedDosage ? ' ' + extractedDosage : ''}`,
          canonicalGeneric: entry.genericName,
          brandToGenericMapped: true,
          confidenceLevel: 'high',
          confidenceScore: 94,
          matchAlgorithm: 'shorthand_expansion',
          spellingCorrected: true,
          originalSpelling: rawMedicineName,
        };
      }
    }
  }

  // 3. Known Common OCR Misspelling Match (e.g. "Amoxcillin" -> "Amoxicillin")
  for (const entry of MEDICINE_DICTIONARY) {
    for (const misspelling of entry.commonMisspellings) {
      if (
        lowerStem === misspelling.toLowerCase() ||
        lowerRaw.includes(misspelling.toLowerCase()) ||
        fuzzyRatio(lowerStem, misspelling.toLowerCase()) >= 90
      ) {
        return {
          originalRawToken: rawMedicineName,
          matchedBrandOrDrug: `${entry.brandName}${extractedDosage ? ' ' + extractedDosage : ''}`,
          canonicalGeneric: entry.genericName,
          brandToGenericMapped: true,
          confidenceLevel: 'high',
          confidenceScore: 92,
          matchAlgorithm: 'misspelling_correction',
          spellingCorrected: true,
          originalSpelling: rawMedicineName,
        };
      }
    }
  }

  // 4. RapidFuzz Scoring across All Dictionary Entries
  const candidateScores: {
    entry: DictionaryEntry;
    bestTarget: string;
    score: number;
  }[] = [];

  for (const entry of MEDICINE_DICTIONARY) {
    const targetsToTest = [
      entry.brandName,
      entry.genericName,
      ...(entry.regionalAliases || []),
      ...entry.shortForms,
      ...entry.commonMisspellings,
    ];

    let maxEntryScore = 0;
    let bestTargetMatched = entry.brandName;

    for (const target of targetsToTest) {
      const score = rapidFuzzScore(stem, target);
      if (score > maxEntryScore) {
        maxEntryScore = score;
        bestTargetMatched = target;
      }
    }

    if (maxEntryScore > 50) {
      candidateScores.push({
        entry,
        bestTarget: bestTargetMatched,
        score: maxEntryScore,
      });
    }
  }

  // Sort descending by score
  candidateScores.sort((a, b) => b.score - a.score);

  // Compile top 3 alternative candidates
  const alternativeCandidates: SmartNLPAlternativeCandidate[] = candidateScores
    .slice(0, 3)
    .map((c) => ({
      brandName: `${c.entry.brandName}${extractedDosage ? ' ' + extractedDosage : ''}`,
      genericName: c.entry.genericName,
      similarityScore: c.score,
    }));

  if (candidateScores.length > 0) {
    const best = candidateScores[0];
    const isSpellingDiff =
      best.score < 96 &&
      best.entry.brandName.toLowerCase() !== lowerStem &&
      best.entry.genericName.toLowerCase() !== lowerStem;

    let confidenceLevel: NLPConfidenceLevel = 'low';
    if (best.score >= 85) {
      confidenceLevel = 'high';
    } else if (best.score >= 68) {
      confidenceLevel = 'medium';
    } else {
      confidenceLevel = 'low';
    }

    const brandName = `${best.entry.brandName}${extractedDosage ? ' ' + extractedDosage : ''}`;

    return {
      originalRawToken: rawMedicineName,
      matchedBrandOrDrug: brandName,
      canonicalGeneric: best.entry.genericName,
      brandToGenericMapped: true,
      confidenceLevel,
      confidenceScore: best.score,
      matchAlgorithm: 'fuzzy_rapidfuzz',
      spellingCorrected: isSpellingDiff,
      originalSpelling: isSpellingDiff ? rawMedicineName : undefined,
      alternativeCandidates: alternativeCandidates.length > 1 ? alternativeCandidates : undefined,
    };
  }

  // 5. Fallback lookup in Brand-to-Generic Global Map
  const directMappedGeneric = BRAND_TO_GENERIC_MAP[lowerStem] || BRAND_TO_GENERIC_MAP[lowerRaw];
  if (directMappedGeneric) {
    return {
      originalRawToken: rawMedicineName,
      matchedBrandOrDrug: rawMedicineName,
      canonicalGeneric: directMappedGeneric,
      brandToGenericMapped: true,
      confidenceLevel: 'high',
      confidenceScore: 90,
      matchAlgorithm: 'pharmacopeia_synonym',
      spellingCorrected: false,
    };
  }

  // 6. Valid drug string extracted by AI (not listed in sample dictionary)
  return {
    originalRawToken: rawMedicineName,
    matchedBrandOrDrug: rawMedicineName,
    canonicalGeneric: existingGeneric || 'Pharmacological active agent',
    brandToGenericMapped: Boolean(existingGeneric && existingGeneric.length > 3),
    confidenceLevel: 'medium',
    confidenceScore: 78,
    matchAlgorithm: 'pharmacopeia_synonym',
    spellingCorrected: false,
    alternativeCandidates: alternativeCandidates.length > 0 ? alternativeCandidates : undefined,
  };
}

/**
 * =========================================================================
 * POST-PROCESSING PIPELINE FOR PRESCRIPTION ANALYSIS
 * Enriches each medicine with smart NLP metadata, fixes spelling errors,
 * maps brand to generic, and calculates clinical confidence summary.
 * =========================================================================
 */
export function postProcessPrescriptionResultWithNLP(
  result: PrescriptionAnalysisResult
): PrescriptionAnalysisResult {
  if (!result || !result.medicines || !Array.isArray(result.medicines)) {
    return result;
  }

  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  let correctedCount = 0;
  let brandMappedCount = 0;

  const processedMedicines: MedicineDetail[] = result.medicines.map((med) => {
    // If the medicine already has an NLP resolution preserved, reuse it
    if (med.nlpResolution) {
      if (med.nlpResolution.confidenceLevel === 'high') highCount++;
      else if (med.nlpResolution.confidenceLevel === 'medium') mediumCount++;
      else lowCount++;

      if (med.nlpResolution.spellingCorrected) correctedCount++;
      if (med.nlpResolution.brandToGenericMapped) brandMappedCount++;
      return med;
    }

    const nlpRes = resolveMedicineNLP(med.name, med.genericName);

    // If high confidence and spelling corrected, we can update or clarify the name
    let cleanName = med.name;
    let cleanGeneric = med.genericName;

    // Only intercept genuinely unreadable / illegible text strings
    const rawLower = (med.name || '').trim().toLowerCase();
    const isUnclearOrUnidentified =
      !med.name ||
      med.name.trim().length <= 1 ||
      rawLower === '?' ||
      rawLower === '...' ||
      rawLower === 'illegible' ||
      rawLower.includes('apologies') ||
      rawLower.includes("didn't understand") ||
      rawLower.includes('unidentified') ||
      rawLower.includes('undecipherable') ||
      rawLower.includes('scribble') ||
      rawLower.includes('illegible handwriting') ||
      rawLower.includes('handwriting unclear');

    if (isUnclearOrUnidentified) {
      cleanName = "Apologies, we didn't understand this medicine";
      cleanGeneric = "Handwriting unclear — please verify or type manually";
      nlpRes.matchedBrandOrDrug = "Apologies, we didn't understand this medicine";
      nlpRes.canonicalGeneric = "Handwriting unclear — please verify or type manually";
      nlpRes.confidenceLevel = 'low';
      nlpRes.confidenceScore = 20;
      nlpRes.brandToGenericMapped = false;
    } else if (nlpRes.confidenceScore >= 85 && nlpRes.spellingCorrected) {
      cleanName = nlpRes.matchedBrandOrDrug;
    }

    // If generic was generic placeholder or incomplete, fill from canonical dictionary
    if (
      !isUnclearOrUnidentified &&
      nlpRes.brandToGenericMapped &&
      (!cleanGeneric ||
        cleanGeneric.toLowerCase().includes('not specified') ||
        cleanGeneric.toLowerCase().includes('unknown') ||
        cleanGeneric.length < 5)
    ) {
      cleanGeneric = nlpRes.canonicalGeneric;
    }

    let updatedPurpose = med.purposeAndUsage;
    if (isUnclearOrUnidentified) {
      updatedPurpose =
        "Apologies, we didn't understand this medicine due to unclear doctor handwriting. Please confirm the medicine name or type it manually using the prompt above.";
    }

    if (nlpRes.confidenceLevel === 'high') highCount++;
    else if (nlpRes.confidenceLevel === 'medium') mediumCount++;
    else lowCount++;

    if (nlpRes.spellingCorrected) correctedCount++;
    if (nlpRes.brandToGenericMapped) brandMappedCount++;

    // Two-way Generic vs Company Brand Cross Reference
    const crossRef = crossReferenceMedicine(cleanName, cleanGeneric);

    return {
      ...med,
      name: cleanName,
      genericName: crossRef.activeGenericSalt || cleanGeneric,
      activeGenericSalt: crossRef.activeGenericSalt || cleanGeneric,
      purposeAndUsage: updatedPurpose,
      prescribedAs: crossRef.prescribedAs,
      companyName: crossRef.companyName,
      popularCompanyBrands: crossRef.popularCompanyBrands,
      nlpResolution: nlpRes,
    };
  });

  const summary: SmartNLPSummary = {
    totalMedicinesProcessed: processedMedicines.length,
    highConfidenceCount: highCount,
    mediumConfidenceCount: mediumCount,
    lowConfidenceCount: lowCount,
    spellingsCorrectedCount: correctedCount,
    brandsMappedCount: brandMappedCount,
    requiresUserConfirmation: lowCount > 0,
    arbitrationNote:
      correctedCount > 0
        ? `Smart NLP recovered ${correctedCount} medicine name(s) via RapidFuzz spelling correction & mapped active generic salt formulas.`
        : 'Prescription medicines validated against clinical pharmacopeia.',
  };

  // Count genuine valid medicines vs unreadable ones
  const validMedicines = processedMedicines.filter((m) => {
    const n = (m.name || '').toLowerCase();
    return (
      m.name &&
      m.name.trim().length > 1 &&
      !n.includes('apologies') &&
      !n.includes("didn't understand") &&
      !n.includes('unclear') &&
      !n.includes('illegible') &&
      !n.includes('unidentified')
    );
  });

  const totalValidMedicines = validMedicines.length;

  let updatedEnsemble = result.multiEngineEnsemble;
  // ONLY zero out confidence if ZERO valid medicines were found
  if (totalValidMedicines === 0 && updatedEnsemble) {
    updatedEnsemble = {
      ...updatedEnsemble,
      overallConfidence: 0,
      ensembleAgreementPercent: 0,
    };
  }

  // unableToDecipher is strictly true ONLY when the system has ZERO recognizable medicines
  const completelyUnableToDecipher = processedMedicines.length === 0 || totalValidMedicines === 0;

  return {
    ...result,
    unableToDecipher: completelyUnableToDecipher,
    medicines: processedMedicines,
    smartNlpSummary: summary,
    multiEngineEnsemble: updatedEnsemble,
  };
}
