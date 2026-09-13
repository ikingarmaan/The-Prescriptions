/**
 * Medical Dictionary of common prescription medications, brand names,
 * active salts, and forms for Human-in-the-Loop verification.
 */

export interface DictionaryEntry {
  brandName: string;
  genericName: string;
  shortForms: string[];
  regionalAliases?: string[];
  standardStrengths: string[];
  forms: string[];
  category: string;
}

export const MEDICINE_DICTIONARY: DictionaryEntry[] = [
  {
    brandName: 'Augmentin 625',
    genericName: 'Amoxicillin + Clavulanic Acid',
    shortForms: ['Aug', 'Aug 625', 'Amox-Clav', 'Augmentin', 'Clavam'],
    regionalAliases: ['Moxikind-CV', 'Clavam 625', 'Augmentin Duo'],
    standardStrengths: ['625mg', '375mg', '1000mg'],
    forms: ['Tablet', 'Syrup', 'Dry Syrup'],
    category: 'Antibiotic',
  },
  {
    brandName: 'Pantocid 40',
    genericName: 'Pantoprazole Sodium',
    shortForms: ['Pan', 'Panto', 'Pan 40', 'Pantocid', 'Pantop'],
    regionalAliases: ['Pan-D', 'Protonix', 'Pantosec'],
    standardStrengths: ['40mg', '20mg'],
    forms: ['Enteric Coated Tablet', 'Injection'],
    category: 'Gastrointestinal / Acid Reducer',
  },
  {
    brandName: 'Dolo 650',
    genericName: 'Paracetamol (Acetaminophen)',
    shortForms: ['Dolo', 'PCM', 'Para', 'Dolo 650', 'PCM 650'],
    regionalAliases: ['Calpol 650', 'Crocin 650', 'Pacimol', 'Tylenol'],
    standardStrengths: ['650mg', '500mg'],
    forms: ['Tablet', 'Syrup'],
    category: 'Analgesic & Antipyretic',
  },
  {
    brandName: 'Azithral 500',
    genericName: 'Azithromycin',
    shortForms: ['Azith', 'Azi', 'Azithro', 'Azee', 'Z-Pak'],
    regionalAliases: ['Zithromax', 'Azee 500', 'Azax'],
    standardStrengths: ['500mg', '250mg'],
    forms: ['Tablet', 'Suspension'],
    category: 'Antibiotic',
  },
  {
    brandName: 'Glycomet 500',
    genericName: 'Metformin Hydrochloride',
    shortForms: ['Glyco', 'Met', 'Metformin', 'Glycomet SR'],
    regionalAliases: ['Glucophage', 'Obimet', 'Cetapin'],
    standardStrengths: ['500mg', '850mg', '1000mg'],
    forms: ['Tablet', 'Sustained Release Tablet'],
    category: 'Antidiabetic',
  },
  {
    brandName: 'Atorva 10',
    genericName: 'Atorvastatin',
    shortForms: ['Ator', 'Atorva', 'Lipitor', 'Statin'],
    regionalAliases: ['Lipitor', 'Storvas', 'Tonact'],
    standardStrengths: ['10mg', '20mg', '40mg'],
    forms: ['Tablet'],
    category: 'Cardiovascular / Statin',
  },
  {
    brandName: 'Telma 40',
    genericName: 'Telmisartan',
    shortForms: ['Telma', 'Telmi', 'Telma-H', 'Telmikind'],
    regionalAliases: ['Micardis', 'Telsartan', 'Cresar'],
    standardStrengths: ['40mg', '20mg', '80mg'],
    forms: ['Tablet'],
    category: 'Antihypertensive',
  },
  {
    brandName: 'Amlong 5',
    genericName: 'Amlodipine',
    shortForms: ['Amlo', 'Amlong', 'Amlopin', 'Stamlo'],
    regionalAliases: ['Norvasc', 'Amlovas'],
    standardStrengths: ['5mg', '2.5mg', '10mg'],
    forms: ['Tablet'],
    category: 'Antihypertensive',
  },
  {
    brandName: 'Cetzine 10',
    genericName: 'Cetirizine Hydrochloride',
    shortForms: ['Cet', 'Cetzine', 'Zyrtec', 'Alerid'],
    regionalAliases: ['Okacet', 'Zyrtec', 'Incid-L'],
    standardStrengths: ['10mg', '5mg'],
    forms: ['Tablet', 'Syrup'],
    category: 'Antihistamine',
  },
  {
    brandName: 'Montair-LC',
    genericName: 'Montelukast + Levocetirizine',
    shortForms: ['Mont-LC', 'Montair', 'Montek-LC', 'Telekast-L'],
    regionalAliases: ['Montek-LC', 'Levolin', 'Romilast-L'],
    standardStrengths: ['10mg + 5mg'],
    forms: ['Tablet'],
    category: 'Respiratory Anti-Allergic',
  },
  {
    brandName: 'Allegra 120',
    genericName: 'Fexofenadine Hydrochloride',
    shortForms: ['Allegra', 'Fexo', 'Fexy'],
    regionalAliases: ['Telfast', 'Fexova'],
    standardStrengths: ['120mg', '180mg'],
    forms: ['Tablet'],
    category: 'Antihistamine',
  },
  {
    brandName: 'Ecosprin 75',
    genericName: 'Aspirin (Enteric Coated)',
    shortForms: ['Eco', 'Ecosprin', 'Asp'],
    regionalAliases: ['Loprin', 'Delisprin'],
    standardStrengths: ['75mg', '150mg'],
    forms: ['Tablet'],
    category: 'Cardiovascular Antiplatelet',
  },
  {
    brandName: 'Shelcal 500',
    genericName: 'Calcium + Vitamin D3',
    shortForms: ['Shelcal', 'Calc'],
    regionalAliases: ['Cipcal', 'Calcimax'],
    standardStrengths: ['500mg'],
    forms: ['Tablet'],
    category: 'Nutritional Supplement',
  },
];
