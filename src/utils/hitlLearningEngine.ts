import { MEDICINE_DICTIONARY, BRAND_TO_GENERIC_MAP, DictionaryEntry } from '../data/medicineDictionary';
import { fuzzyRatio } from './smartNlpEngine';

export interface LearnedCorrection {
  id: string;
  rawToken: string;
  normalizedKey: string;
  confirmedMedicine: string;
  confirmedGeneric: string;
  category?: string;
  strength?: string;
  form?: string;
  count: number;
  isUserTrained: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'clinical_hitl_learned_memory_v1';

// Pre-seeded clinical doctor handwriting shorthands and ligatures
const SEED_CORRECTIONS: Omit<LearnedCorrection, 'id' | 'timestamp'>[] = [
  {
    rawToken: 'Augm 625',
    normalizedKey: 'augm 625',
    confirmedMedicine: 'Augmentin 625 Duo',
    confirmedGeneric: 'Amoxicillin + Clavulanic Acid (Potassium Clavulanate)',
    category: 'Antibiotic (Penicillin + Beta-Lactamase Inhibitor)',
    strength: '625mg',
    form: 'Tablet',
    count: 3,
    isUserTrained: false,
  },
  {
    rawToken: 'PCM 650',
    normalizedKey: 'pcm 650',
    confirmedMedicine: 'Dolo 650',
    confirmedGeneric: 'Paracetamol (Acetaminophen)',
    category: 'Antipyretic & Analgesic',
    strength: '650mg',
    form: 'Tablet',
    count: 5,
    isUserTrained: false,
  },
  {
    rawToken: 'Panto 40',
    normalizedKey: 'panto 40',
    confirmedMedicine: 'Pan 40',
    confirmedGeneric: 'Pantoprazole Sodium',
    category: 'Proton Pump Inhibitor (Acid Reducer)',
    strength: '40mg',
    form: 'Tablet',
    count: 4,
    isUserTrained: false,
  },
  {
    rawToken: 'Azith 500',
    normalizedKey: 'azith 500',
    confirmedMedicine: 'Azithral 500',
    confirmedGeneric: 'Azithromycin Dihydrate',
    category: 'Antibiotic (Macrolide)',
    strength: '500mg',
    form: 'Tablet',
    count: 3,
    isUserTrained: false,
  },
  {
    rawToken: 'Mont-LC',
    normalizedKey: 'mont-lc',
    confirmedMedicine: 'Montair-LC',
    confirmedGeneric: 'Montelukast Sodium + Levocetirizine Hydrochloride',
    category: 'Anti-Allergic & Bronchodilator',
    strength: '10mg + 5mg',
    form: 'Tablet',
    count: 2,
    isUserTrained: false,
  },
  {
    rawToken: 'Telmi 40',
    normalizedKey: 'telmi 40',
    confirmedMedicine: 'Telma 40',
    confirmedGeneric: 'Telmisartan',
    category: 'Antihypertensive (Angiotensin II Receptor Blocker)',
    strength: '40mg',
    form: 'Tablet',
    count: 2,
    isUserTrained: false,
  },
];

function normalizeKey(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Retrieves all learned handwriting corrections from localStorage with defaults.
 */
export function getLearnedCorrections(): LearnedCorrection[] {
  if (typeof window === 'undefined') {
    return SEED_CORRECTIONS.map((c, i) => ({
      ...c,
      id: `seed-${i}`,
      timestamp: Date.now(),
    }));
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: LearnedCorrection[] = SEED_CORRECTIONS.map((c, i) => ({
        ...c,
        id: `seed-${i}`,
        timestamp: Date.now() - (i + 1) * 86400000,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load learned corrections memory:', e);
    return [];
  }
}

/**
 * Searches the learned memory for a match against an ambiguous or low-confidence token.
 */
export function findLearnedCorrection(token: string): LearnedCorrection | null {
  if (!token || !token.trim()) return null;
  const memory = getLearnedCorrections();
  const normalized = normalizeKey(token);

  // 1. Exact normalized match
  const exact = memory.find((item) => item.normalizedKey === normalized);
  if (exact) return exact;

  // 2. Contains or Substring match
  const contains = memory.find(
    (item) =>
      (normalized.length >= 4 && item.normalizedKey.includes(normalized)) ||
      (item.normalizedKey.length >= 4 && normalized.includes(item.normalizedKey))
  );
  if (contains) return contains;

  // 3. High fuzzy ratio match (>= 88%)
  for (const item of memory) {
    const ratio = fuzzyRatio(normalized, item.normalizedKey);
    if (ratio >= 88) {
      return item;
    }
  }

  return null;
}

/**
 * Trains the site by saving a user-confirmed handwriting correction into local memory.
 */
export function saveLearnedCorrection(
  rawToken: string,
  confirmedMedicine: string,
  confirmedGeneric?: string,
  extra?: Partial<LearnedCorrection>
): LearnedCorrection {
  const memory = getLearnedCorrections();
  const normalized = normalizeKey(rawToken || confirmedMedicine);
  const now = Date.now();

  // Find generic fallback if not provided
  let generic = confirmedGeneric;
  if (!generic) {
    const lower = confirmedMedicine.toLowerCase();
    const dict = MEDICINE_DICTIONARY.find(
      (d) => d.brandName.toLowerCase() === lower || d.genericName.toLowerCase() === lower
    );
    if (dict) {
      generic = dict.genericName;
    } else {
      generic = BRAND_TO_GENERIC_MAP[lower] || 'Consult Pharmacist / Doctor';
    }
  }

  const existingIndex = memory.findIndex((item) => item.normalizedKey === normalized);

  let result: LearnedCorrection;

  if (existingIndex >= 0) {
    result = {
      ...memory[existingIndex],
      confirmedMedicine,
      confirmedGeneric: generic,
      count: memory[existingIndex].count + 1,
      isUserTrained: true,
      timestamp: now,
      ...extra,
    };
    memory[existingIndex] = result;
  } else {
    result = {
      id: `learned-${now}-${Math.random().toString(36).substring(2, 7)}`,
      rawToken,
      normalizedKey: normalized,
      confirmedMedicine,
      confirmedGeneric: generic,
      count: 1,
      isUserTrained: true,
      timestamp: now,
      ...extra,
    };
    memory.unshift(result);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
    } catch (e) {
      console.error('Failed to persist learned correction:', e);
    }
  }

  return result;
}

/**
 * Deletes a learned correction from memory.
 */
export function deleteLearnedCorrection(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const memory = getLearnedCorrections().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch (e) {
    console.error('Failed to delete learned correction:', e);
  }
}

/**
 * Resets memory to default seeds.
 */
export function resetLearnedMemory(): void {
  if (typeof window === 'undefined') return;
  try {
    const initial: LearnedCorrection[] = SEED_CORRECTIONS.map((c, i) => ({
      ...c,
      id: `seed-${i}`,
      timestamp: Date.now(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {
    console.error('Failed to reset learned memory:', e);
  }
}

/**
 * Provides comprehensive clinical explanation and guidance for any confirmed or manually typed medicine.
 */
export function getClinicalExplanationForMedicine(
  medicineName: string,
  genericName?: string
): {
  purposeAndUsage: string;
  howToTake: string;
  precautions: string[];
  commonSideEffects: string[];
  whenToContactDoctor: string;
  storageRequirement: string;
  mealRelationText: string;
} {
  const lower = medicineName.toLowerCase().trim();
  const genericLower = (genericName || '').toLowerCase().trim();

  // 1. Check medicine dictionary match
  const dict = MEDICINE_DICTIONARY.find(
    (d) =>
      d.brandName.toLowerCase() === lower ||
      d.genericName.toLowerCase().includes(lower) ||
      d.regionalAliases?.some((a) => a.toLowerCase() === lower) ||
      d.shortForms.some((s) => s.toLowerCase() === lower)
  );

  if (dict) {
    const isAntibiotic = dict.category.toLowerCase().includes('antibiotic');
    const isAcidReducer = dict.category.toLowerCase().includes('acid') || dict.category.toLowerCase().includes('proton pump');
    const isPainRelief = dict.category.toLowerCase().includes('analgesic') || dict.category.toLowerCase().includes('pain') || dict.category.toLowerCase().includes('nsaid');
    const isBloodPressure = dict.category.toLowerCase().includes('hypertensive') || dict.category.toLowerCase().includes('blood pressure');
    const isDiabetes = dict.category.toLowerCase().includes('diabetic') || dict.category.toLowerCase().includes('glycemic');

    if (isAntibiotic) {
      return {
        purposeAndUsage: `Prescribed to eliminate bacterial infection (${dict.genericName}). It stops bacterial multiplication and relieves infection symptoms.`,
        howToTake: 'Take strictly at scheduled intervals with a full glass of water. Complete the entire course even if symptoms resolve earlier to prevent bacterial resistance.',
        precautions: [
          'Complete the full antibiotic duration prescribed by doctor.',
          'Do not skip doses; maintain even intervals (e.g., every 8 or 12 hours).',
          'Inform doctor if watery diarrhea or abdominal cramping occurs.',
        ],
        commonSideEffects: ['Mild nausea', 'Loose stools', 'Stomach discomfort', 'Altered taste'],
        whenToContactDoctor: 'Contact doctor immediately if severe allergic rash, facial swelling, or persistent watery diarrhea develops.',
        storageRequirement: 'Store in a cool, dry place below 25°C away from direct sunlight and moisture.',
        mealRelationText: 'Take with or immediately after food to prevent gastric discomfort.',
      };
    }

    if (isAcidReducer) {
      return {
        purposeAndUsage: `Reduces excess gastric acid production (${dict.genericName}). Treats hyperacidity, GERD, heartburn, and protects stomach lining against ulceration.`,
        howToTake: 'Take 30–60 minutes before breakfast with plain water. Swallow whole; do not chew or crush.',
        precautions: [
          'Best taken on an empty stomach in the morning for maximum acid suppression.',
          'Avoid excessive tea, coffee, smoking, and oily foods which increase acid secretion.',
        ],
        commonSideEffects: ['Mild headache', 'Flatulence', 'Dry mouth', 'Slight constipation or loose stool'],
        whenToContactDoctor: 'Seek medical attention if difficulty swallowing, unexplained weight loss, or persistent vomiting occurs.',
        storageRequirement: 'Store at room temperature away from heat and moisture.',
        mealRelationText: 'Take 30 to 60 minutes before food in the morning.',
      };
    }

    if (isPainRelief) {
      return {
        purposeAndUsage: `Relieves pain, inflammation, body aches, and fever (${dict.genericName}).`,
        howToTake: 'Take strictly after meals with water to protect the gastric mucosa from acidity or irritation.',
        precautions: [
          'Never take on an empty stomach.',
          'Do not combine with alcohol or other duplicate paracetamol/NSAID products.',
          'Take only as needed or as prescribed; do not exceed recommended daily limits.',
        ],
        commonSideEffects: ['Mild stomach acidity', 'Heartburn', 'Drowsiness'],
        whenToContactDoctor: 'Contact healthcare provider if pain persists beyond 3 days or if black tarry stools occur.',
        storageRequirement: 'Store in original packaging at room temperature.',
        mealRelationText: 'Always take after food or with milk.',
      };
    }

    if (isBloodPressure) {
      return {
        purposeAndUsage: `Controls blood pressure and supports cardiovascular protection (${dict.genericName}).`,
        howToTake: 'Take once daily at the same time every day, with or without food. Maintain regular daily routine.',
        precautions: [
          'Do not stop taking suddenly, as rebound blood pressure spikes can occur.',
          'Stand up slowly from sitting or lying positions to prevent dizziness.',
          'Monitor blood pressure periodically at home or local clinic.',
        ],
        commonSideEffects: ['Mild dizziness', 'Fatigue', 'Slight lightheadedness'],
        whenToContactDoctor: 'Consult doctor if severe dizziness, fainting, or swelling of hands/feet occurs.',
        storageRequirement: 'Store tightly closed in cool, dry conditions.',
        mealRelationText: 'Can be taken with or without food, but take consistently at the same time each day.',
      };
    }

    if (isDiabetes) {
      return {
        purposeAndUsage: `Controls blood glucose levels and improves insulin sensitivity (${dict.genericName}).`,
        howToTake: 'Take with or immediately after meals to reduce gastrointestinal side effects and maintain stable glucose.',
        precautions: [
          'Do not skip prescribed meals to prevent hypoglycemia (low blood sugar).',
          'Keep glucose tablets or candy accessible in case of trembling or sweating.',
          'Have HbA1c and kidney function monitored as advised by your physician.',
        ],
        commonSideEffects: ['Mild stomach fullness', 'Metallic taste', 'Nausea'],
        whenToContactDoctor: 'Seek immediate attention if severe hypoglycemia symptoms (confusion, extreme shakiness) arise.',
        storageRequirement: 'Keep in cool, dry environment away from moisture.',
        mealRelationText: 'Take with or immediately following your main meals.',
      };
    }
  }

  // Generic fallback explanation
  return {
    purposeAndUsage: `Therapeutic medication (${genericName || medicineName}) prescribed by your physician for clinical symptom management and healing.`,
    howToTake: 'Take strictly as prescribed with plain water. Maintain regular daily timing and follow doctor instructions.',
    precautions: [
      'Take only the dose specified on your prescription.',
      'Check with your pharmacist if taking other prescription or OTC drugs.',
      'Do not discontinue treatment early without consulting your physician.',
    ],
    commonSideEffects: ['Mild nausea', 'Drowsiness', 'Stomach discomfort'],
    whenToContactDoctor: 'Contact your prescribing physician or pharmacist if unexpected adverse reactions occur.',
    storageRequirement: 'Store in a cool, dry place below 25°C protected from direct sunlight.',
    mealRelationText: 'Take as directed by doctor or pharmacist.',
  };
}
