/**
 * Human-in-the-Loop (HITL) Learning Engine:
 * Persists user-verified handwriting corrections in browser local storage
 * and provides clinical educational templates for verified medications.
 */

export interface LearnedCorrection {
  id: string;
  rawToken: string;
  confirmedMedicine: string;
  confirmedGeneric?: string;
  count: number;
  metadata?: {
    strength?: string;
    form?: string;
    category?: string;
  };
  timestamp: number;
}

const STORAGE_KEY = 'theprescription_hitl_learned_memory';

/**
 * Saves a user-confirmed handwriting correction into local storage.
 */
export function saveLearnedCorrection(
  rawToken: string,
  confirmedMedicine: string,
  confirmedGeneric?: string,
  metadata?: { strength?: string; form?: string; category?: string }
): void {
  try {
    if (!rawToken || !confirmedMedicine) return;

    const existing = getLearnedCorrections();
    const existingIndex = existing.findIndex(
      (item) => item.rawToken.toLowerCase() === rawToken.toLowerCase()
    );

    let count = 1;
    let id = `hitl-${Date.now()}`;

    if (existingIndex >= 0) {
      count = (existing[existingIndex].count || 1) + 1;
      id = existing[existingIndex].id || id;
      existing.splice(existingIndex, 1);
    }

    const newEntry: LearnedCorrection = {
      id,
      rawToken: rawToken.trim(),
      confirmedMedicine: confirmedMedicine.trim(),
      confirmedGeneric: confirmedGeneric?.trim(),
      count,
      metadata,
      timestamp: Date.now(),
    };

    existing.unshift(newEntry);
    const trimmed = existing.slice(0, 50);

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    }
  } catch (err) {
    console.warn('Could not save learned correction to localStorage:', err);
  }
}

/**
 * Retrieves all stored learned handwriting corrections.
 */
export function getLearnedCorrections(): LearnedCorrection[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item, idx) => ({
      id: item.id || `hitl-${idx}-${item.timestamp || Date.now()}`,
      rawToken: item.rawToken || '',
      confirmedMedicine: item.confirmedMedicine || '',
      confirmedGeneric: item.confirmedGeneric || '',
      count: typeof item.count === 'number' ? item.count : 1,
      metadata: item.metadata,
      timestamp: item.timestamp || Date.now(),
    }));
  } catch (err) {
    console.warn('Could not read learned corrections:', err);
    return [];
  }
}

/**
 * Generates clinical instructions and safety advice for a confirmed medicine.
 */
export function getClinicalExplanationForMedicine(
  name: string,
  generic?: string
): {
  purposeAndUsage: string;
  howToTake: string;
  precautions: string[];
  commonSideEffects: string[];
  whenToContactDoctor: string;
  mealRelationText: string;
} {
  const medicineTitle = name || generic || 'This medication';

  return {
    purposeAndUsage: `${medicineTitle} is prescribed by your physician for therapeutic treatment and symptom relief.`,
    howToTake:
      'Take with a full glass of water as directed by your physician or pharmacist.',
    precautions: [
      'Strictly follow the prescribed duration and do not discontinue early without consulting your doctor.',
      'Inform your doctor if you have other medical conditions or are taking concurrent prescriptions.',
    ],
    commonSideEffects: [
      'Mild stomach fullness or nausea',
      'Mild headache or transient drowsiness',
    ],
    whenToContactDoctor:
      'Contact your physician immediately if you experience severe allergic skin rashes, facial swelling, or breathing difficulty.',
    mealRelationText:
      'Take as directed relative to meals with plenty of water.',
  };
}
