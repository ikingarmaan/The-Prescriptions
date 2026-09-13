import { PopularBrandEquivalent } from '../types';

/**
 * Pharmacological catalog cross-referencing brand names, pharmaceutical manufacturers,
 * active chemical molecules (salts), and market alternatives.
 */

export interface CrossReferenceResult {
  prescribedAs: 'brand' | 'generic';
  companyName?: string;
  activeGenericSalt: string;
  popularCompanyBrands: PopularBrandEquivalent[];
  therapeuticClass?: string;
}

interface MedicineCatalogEntry {
  brandName: string;
  genericSalt: string;
  companyName: string;
  therapeuticClass: string;
  alternativeBrands: PopularBrandEquivalent[];
}

const MEDICINE_CATALOG: MedicineCatalogEntry[] = [
  {
    brandName: 'Augmentin',
    genericSalt: 'Amoxicillin + Clavulanic Acid',
    companyName: 'GlaxoSmithKline (GSK)',
    therapeuticClass: 'Broad-Spectrum Penicillin Antibiotic',
    alternativeBrands: [
      { brandName: 'Moxikind-CV', companyName: 'Mankind Pharma' },
      { brandName: 'Clavam', companyName: 'Alkem Laboratories' },
      { brandName: 'Augmentin Duo', companyName: 'GSK' },
      { brandName: 'Sensiclav', companyName: 'Macacids' },
    ],
  },
  {
    brandName: 'Pantocid',
    genericSalt: 'Pantoprazole Sodium',
    companyName: 'Sun Pharma',
    therapeuticClass: 'Proton Pump Inhibitor',
    alternativeBrands: [
      { brandName: 'Pan 40', companyName: 'Alkem Laboratories' },
      { brandName: 'Pantop', companyName: 'Aristo Pharmaceuticals' },
      { brandName: 'Protonix', companyName: 'Pfizer' },
      { brandName: 'Pantosec', companyName: 'Cipla' },
    ],
  },
  {
    brandName: 'Pan 40',
    genericSalt: 'Pantoprazole Sodium',
    companyName: 'Alkem Laboratories',
    therapeuticClass: 'Proton Pump Inhibitor',
    alternativeBrands: [
      { brandName: 'Pantocid', companyName: 'Sun Pharma' },
      { brandName: 'Pantop', companyName: 'Aristo' },
      { brandName: 'Protonix', companyName: 'Pfizer' },
    ],
  },
  {
    brandName: 'Glycomet',
    genericSalt: 'Metformin Hydrochloride',
    companyName: 'USV Private Limited',
    therapeuticClass: 'Biguanide Antidiabetic',
    alternativeBrands: [
      { brandName: 'Glucophage', companyName: 'Merck' },
      { brandName: 'Obimet', companyName: 'Abbott' },
      { brandName: 'Cetapin', companyName: 'Sanofi' },
    ],
  },
  {
    brandName: 'Lipitor',
    genericSalt: 'Atorvastatin Calcium',
    companyName: 'Pfizer',
    therapeuticClass: 'HMG-CoA Reductase Inhibitor',
    alternativeBrands: [
      { brandName: 'Atorva', companyName: 'Zydus Cadila' },
      { brandName: 'Storvas', companyName: 'Sun Pharma' },
      { brandName: 'Tonact', companyName: 'Lupin' },
    ],
  },
  {
    brandName: 'Atorva',
    genericSalt: 'Atorvastatin Calcium',
    companyName: 'Zydus Cadila',
    therapeuticClass: 'HMG-CoA Reductase Inhibitor',
    alternativeBrands: [
      { brandName: 'Lipitor', companyName: 'Pfizer' },
      { brandName: 'Storvas', companyName: 'Sun Pharma' },
      { brandName: 'Tonact', companyName: 'Lupin' },
    ],
  },
  {
    brandName: 'Azithral',
    genericSalt: 'Azithromycin Dihydrate',
    companyName: 'Alembic Pharmaceuticals',
    therapeuticClass: 'Macrolide Antibiotic',
    alternativeBrands: [
      { brandName: 'Zithromax', companyName: 'Pfizer' },
      { brandName: 'Azee', companyName: 'Cipla' },
      { brandName: 'Azax', companyName: 'Sun Pharma' },
    ],
  },
  {
    brandName: 'Zithromax',
    genericSalt: 'Azithromycin Dihydrate',
    companyName: 'Pfizer',
    therapeuticClass: 'Macrolide Antibiotic',
    alternativeBrands: [
      { brandName: 'Azithral', companyName: 'Alembic' },
      { brandName: 'Azee', companyName: 'Cipla' },
    ],
  },
  {
    brandName: 'Dolo 650',
    genericSalt: 'Paracetamol (Acetaminophen)',
    companyName: 'Micro Labs Limited',
    therapeuticClass: 'Analgesic & Antipyretic',
    alternativeBrands: [
      { brandName: 'Calpol 650', companyName: 'GSK' },
      { brandName: 'Crocin 650', companyName: 'GSK Consumer' },
      { brandName: 'Tylenol', companyName: 'Kenvue' },
      { brandName: 'Pacimol', companyName: 'Ipca' },
    ],
  },
  {
    brandName: 'Calpol',
    genericSalt: 'Paracetamol (Acetaminophen)',
    companyName: 'GlaxoSmithKline (GSK)',
    therapeuticClass: 'Analgesic & Antipyretic',
    alternativeBrands: [
      { brandName: 'Dolo 650', companyName: 'Micro Labs' },
      { brandName: 'Crocin', companyName: 'GSK' },
      { brandName: 'Tylenol', companyName: 'Kenvue' },
    ],
  },
  {
    brandName: 'Cetzine',
    genericSalt: 'Cetirizine Hydrochloride',
    companyName: 'Dr. Reddy’s Laboratories',
    therapeuticClass: 'Antihistamine',
    alternativeBrands: [
      { brandName: 'Zyrtec', companyName: 'Johnson & Johnson' },
      { brandName: 'Alerid', companyName: 'Cipla' },
      { brandName: 'Okacet', companyName: 'Cipla' },
    ],
  },
  {
    brandName: 'Montair-LC',
    genericSalt: 'Montelukast Sodium + Levocetirizine',
    companyName: 'Cipla Limited',
    therapeuticClass: 'Anti-Allergic',
    alternativeBrands: [
      { brandName: 'Montek-LC', companyName: 'Sun Pharma' },
      { brandName: 'Telekast-L', companyName: 'Lupin' },
      { brandName: 'Levolin', companyName: 'Cipla' },
    ],
  },
  {
    brandName: 'Telma',
    genericSalt: 'Telmisartan',
    companyName: 'Glenmark Pharmaceuticals',
    therapeuticClass: 'Antihypertensive ARB',
    alternativeBrands: [
      { brandName: 'Micardis', companyName: 'Boehringer Ingelheim' },
      { brandName: 'Telmikind', companyName: 'Mankind' },
      { brandName: 'Telsartan', companyName: 'Dr. Reddy’s' },
    ],
  },
  {
    brandName: 'Amlong',
    genericSalt: 'Amlodipine Besylate',
    companyName: 'Micro Labs Limited',
    therapeuticClass: 'Calcium Channel Blocker',
    alternativeBrands: [
      { brandName: 'Norvasc', companyName: 'Pfizer' },
      { brandName: 'Amlovas', companyName: 'Macleods' },
      { brandName: 'Stamlo', companyName: 'Dr. Reddy’s' },
    ],
  },
];

function cleanName(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/\b\d+(\.\d+)?\s*(mg|mcg|g|ml|iu|tablet|tab|cap|capsule)?\b/gi, '')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .toLowerCase();
}

export function crossReferenceMedicine(
  name: string,
  genericName?: string
): CrossReferenceResult {
  const normInput = cleanName(name);
  const normGeneric = cleanName(genericName || '');

  for (const item of MEDICINE_CATALOG) {
    const itemBrand = cleanName(item.brandName);
    const itemGen = cleanName(item.genericSalt);

    if (normInput.includes(itemBrand) || itemBrand.includes(normInput)) {
      return {
        prescribedAs: 'brand',
        companyName: item.companyName,
        activeGenericSalt: item.genericSalt,
        popularCompanyBrands: item.alternativeBrands,
        therapeuticClass: item.therapeuticClass,
      };
    }

    if (normGeneric && (normGeneric.includes(itemGen) || itemGen.includes(normGeneric))) {
      return {
        prescribedAs: 'generic',
        companyName: item.companyName,
        activeGenericSalt: item.genericSalt,
        popularCompanyBrands: [
          { brandName: item.brandName, companyName: item.companyName },
          ...item.alternativeBrands,
        ],
        therapeuticClass: item.therapeuticClass,
      };
    }
  }

  const genericSuffixes = [
    'cillin', 'prazole', 'statin', 'sartan', 'olol', 'mycin', 'floxacin',
    'tidine', 'pril', 'pine', 'dipine', 'zole', 'gliflozin', 'gliptin',
    'asone', 'olone', 'triptan', 'xaban', 'mab', 'paracetamol', 'metformin'
  ];

  const looksGeneric = genericSuffixes.some((suf) => normInput.endsWith(suf) || normInput.includes(suf));

  if (looksGeneric) {
    return {
      prescribedAs: 'generic',
      activeGenericSalt: genericName || name,
      popularCompanyBrands: [
        { brandName: 'Standard Generic Molecule', companyName: 'Multiple Manufacturers' },
      ],
      therapeuticClass: 'Pharmacological Agent',
    };
  }

  return {
    prescribedAs: 'brand',
    activeGenericSalt: genericName && genericName.trim().length > 0 ? genericName : name,
    popularCompanyBrands: [
      { brandName: 'Clinical Bioequivalent Formulations', companyName: 'Licensed Dispensary' },
    ],
    therapeuticClass: 'Therapeutic Formulation',
  };
}
