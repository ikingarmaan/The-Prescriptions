/**
 * Comprehensive Medical Pharmacopeia & Drug Dictionary
 * Supporting:
 * - Brand Names & Trade Names (Global, Indian, US, UK)
 * - Active Generic Salt Formulations
 * - Common Doctor Handwriting Short Forms & Shorthand
 * - Common OCR Misspellings & Letter Confusions (0/O, 1/l, rn/m, cl/d)
 * - Drug Categories & Standard Strengths
 */

export interface DictionaryEntry {
  brandName: string;
  genericName: string;
  category: string;
  standardStrengths: string[];
  forms: string[];
  shortForms: string[];
  commonMisspellings: string[];
  regionalAliases?: string[];
}

export const MEDICINE_DICTIONARY: DictionaryEntry[] = [
  // Antibiotics & Antimicrobials
  {
    brandName: 'Augmentin',
    genericName: 'Amoxicillin + Clavulanic Acid (Potassium Clavulanate)',
    category: 'Antibiotic (Penicillin + Beta-Lactamase Inhibitor)',
    standardStrengths: ['625mg', '375mg', '1000mg / 1g', '228mg/5ml', '457mg/5ml'],
    forms: ['Tablet', 'Syrup', 'Dry Suspension', 'Injection'],
    shortForms: ['Augm', 'Aug', 'Amox-Clav', 'Clav', 'Augment'],
    commonMisspellings: ['Augmentn', 'Augmantin', 'Augmintin', 'Agumentin', 'Augmetin', 'Augmentine', 'Augmenten', 'Augmnetin'],
    regionalAliases: ['Clavam', 'Moxikind-CV', 'Mega-CV', 'Advent', 'Amoxyclav', 'Curam'],
  },
  {
    brandName: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Antibiotic (Broad-Spectrum Penicillin)',
    standardStrengths: ['250mg', '500mg', '125mg/5ml', '250mg/5ml'],
    forms: ['Capsule', 'Tablet', 'Syrup', 'Suspension'],
    shortForms: ['Amox', 'Amoxi', 'Amoxil', 'Amoxyn'],
    commonMisspellings: ['Amoxcillin', 'Amoxacillin', 'Amoxicilin', 'Amoxillin', 'Amoxycillin', 'Amoxcicillin', 'Amoxcylin'],
    regionalAliases: ['Amoxil', 'Novamox', 'Mox', 'Almox', 'Wymox'],
  },
  {
    brandName: 'Azithral',
    genericName: 'Azithromycin Dihydrate',
    category: 'Antibiotic (Macrolide)',
    standardStrengths: ['250mg', '500mg', '100mg/5ml', '200mg/5ml'],
    forms: ['Tablet', 'Suspension', 'Syrup', 'Eye Drops'],
    shortForms: ['Azith', 'Azi', 'Azithro', 'Azth'],
    commonMisspellings: ['Azithromicin', 'Azithromycine', 'Azitromycin', 'Azithral 500', 'Azithal', 'Azithrol', 'Azethral'],
    regionalAliases: ['Azee', 'Zithromax', 'Azax', 'Azicip', 'Zady'],
  },
  {
    brandName: 'Cifran',
    genericName: 'Ciprofloxacin Hydrochloride',
    category: 'Antibiotic (Fluoroquinolone)',
    standardStrengths: ['250mg', '500mg', '750mg', '0.3% Eye/Ear Drops'],
    forms: ['Tablet', 'Eye/Ear Drops', 'Injection'],
    shortForms: ['Cipro', 'Cif', 'Cifro', 'Cpfx'],
    commonMisspellings: ['Ciprofloxin', 'Ciprofloxacine', 'Cifran 500', 'Cipran', 'Cipron', 'Ciproflaxin'],
    regionalAliases: ['Cipro', 'Ciplox', 'Ciproglen', 'Zoxan'],
  },
  {
    brandName: 'Taxim-O',
    genericName: 'Cefixime Trihydrate',
    category: 'Antibiotic (3rd Gen Cephalosporin)',
    standardStrengths: ['100mg', '200mg', '50mg/5ml'],
    forms: ['Tablet', 'DT (Dispersible Tablet)', 'Dry Syrup'],
    shortForms: ['Cefix', 'Taxim', 'Cfix', 'Cefixm'],
    commonMisspellings: ['Taxim O', 'Taximo', 'Cefixim', 'Cefaxime', 'Cefixyme', 'Taxim-0'],
    regionalAliases: ['Zifi', 'Mahacef', 'Cefolac', 'Omnicef', 'Suprax'],
  },
  {
    brandName: 'Norflox-TZ',
    genericName: 'Norfloxacin + Tinidazole',
    category: 'Antibacterial & Antiprotozoal',
    standardStrengths: ['400mg + 600mg'],
    forms: ['Tablet'],
    shortForms: ['Nor-TZ', 'NFTZ', 'Norflox', 'Norf-TZ'],
    commonMisspellings: ['Norfloxtz', 'Norflox TZ', 'Norflox-Tz', 'Norfloxacine', 'Norflax'],
    regionalAliases: ['Nor-Metrogyl', 'Gramoneg', 'Norilet-TZ'],
  },

  // Antipyretics, Analgesics & NSAIDs
  {
    brandName: 'Dolo',
    genericName: 'Paracetamol (Acetaminophen)',
    category: 'Antipyretic & Analgesic (Pain & Fever)',
    standardStrengths: ['500mg', '650mg', '120mg/5ml', '250mg/5ml'],
    forms: ['Tablet', 'Drops', 'Syrup', 'Suppository'],
    shortForms: ['Para', 'PCM', 'Paracet', 'Dolo-650', 'APAP'],
    commonMisspellings: ['Doloo', 'Dolo 650', 'Paracetmol', 'Paracetamole', 'Paracitamol', 'Paracetamol 650', 'Paracetamal'],
    regionalAliases: ['Crocin', 'Calpol', 'Tylenol', 'Panadol', 'Pacimol', 'P-650'],
  },
  {
    brandName: 'Crocin',
    genericName: 'Paracetamol (Acetaminophen)',
    category: 'Antipyretic & Analgesic',
    standardStrengths: ['500mg', '650mg', 'Advance 500mg', '120mg/5ml'],
    forms: ['Tablet', 'Drops', 'Suspension'],
    shortForms: ['Crocin-Adv', 'Crocin 650', 'Croc'],
    commonMisspellings: ['Crocin 650', 'Crosin', 'Crocin Advance', 'Crocen', 'Crocin Pain Relief'],
    regionalAliases: ['Dolo', 'Calpol', 'Panadol'],
  },
  {
    brandName: 'Meftal-Spas',
    genericName: 'Mefenamic Acid + Dicyclomine Hydrochloride',
    category: 'Antispasmodic & NSAID (Abdominal Cramps / Colic)',
    standardStrengths: ['250mg + 10mg', '500mg + 20mg'],
    forms: ['Tablet', 'Syrup', 'Injection'],
    shortForms: ['Meftal', 'Mef-Spas', 'M-Spas', 'Meftal-S'],
    commonMisspellings: ['Meftal Spas', 'Meftal-Spass', 'Mefatal Spas', 'Meftalspas', 'Meptal Spas'],
    regionalAliases: ['Colimex', 'Cyclopam', 'Spasmonil', 'Baralgan-M'],
  },
  {
    brandName: 'Combiflam',
    genericName: 'Ibuprofen + Paracetamol',
    category: 'NSAID & Analgesic Combination',
    standardStrengths: ['400mg + 325mg', '100mg + 162.5mg/5ml'],
    forms: ['Tablet', 'Suspension'],
    shortForms: ['Combi', 'Ibu-Para', 'C-Flam'],
    commonMisspellings: ['Combiflame', 'Combiflam Tab', 'Combiflam Plus', 'Combeflam', 'Combyflam'],
    regionalAliases: ['Ibugesic Plus', 'Flexon', 'Brufen Plus'],
  },
  {
    brandName: 'Ecosprin',
    genericName: 'Aspirin (Acetylsalicylic Acid - Enteric Coated)',
    category: 'Antiplatelet & Blood Thinner (Cardioprotective)',
    standardStrengths: ['75mg', '150mg', '325mg'],
    forms: ['Tablet (Enteric Coated)'],
    shortForms: ['Asp', 'ASA', 'Eco-75', 'Eco-150'],
    commonMisspellings: ['Ecosprin 75', 'Ecosprin 150', 'Ecospirin', 'Ecosprin-AV', 'Ecosprine', 'Ecospirine'],
    regionalAliases: ['Disprin', 'Bayer Aspirin', 'Loprin', 'Delisprin'],
  },

  // Gastrointestinal & Antacids
  {
    brandName: 'Pantocid',
    genericName: 'Pantoprazole Sodium',
    category: 'Proton Pump Inhibitor (PPI - Acid Reflux & Ulcers)',
    standardStrengths: ['20mg', '40mg', 'IV 40mg'],
    forms: ['Tablet (Enteric Coated)', 'Injection (IV)'],
    shortForms: ['Panto', 'Pantop', 'Panto-40', 'PAN'],
    commonMisspellings: ['Pantocid 40', 'Pantocit', 'Pantoprazol', 'Pantozol', 'Pantacide', 'Pantocide', 'Pantocyd'],
    regionalAliases: ['Pan', 'Pantop', 'Pantodac', 'Protonix', 'Pantosec'],
  },
  {
    brandName: 'Pan-D',
    genericName: 'Pantoprazole + Domperidone (Sustained Release)',
    category: 'PPI + Prokinetic Antiemetic (GERD & Nausea)',
    standardStrengths: ['40mg + 30mg SR'],
    forms: ['Capsule (SR)'],
    shortForms: ['P-D', 'Pan D', 'Pantop-D', 'Panto-D'],
    commonMisspellings: ['Pan D', 'Pantocid-D', 'Pan-D SR', 'Pan D SR', 'Pandi', 'Pan D Cap'],
    regionalAliases: ['Pantocid DSR', 'Pantosec-D', 'Dompan', 'Nolpaza-D'],
  },
  {
    brandName: 'Omez',
    genericName: 'Omeprazole',
    category: 'Proton Pump Inhibitor (PPI)',
    standardStrengths: ['10mg', '20mg', '40mg'],
    forms: ['Capsule', 'Tablet', 'Injection'],
    shortForms: ['Ome', 'Omep', 'Omez-20'],
    commonMisspellings: ['Omez 20', 'Omeprazol', 'Omeze', 'Omes', 'Omeprazole 20mg'],
    regionalAliases: ['Prilosec', 'Losec', 'Omecip', 'Omee'],
  },
  {
    brandName: 'Razo',
    genericName: 'Rabeprazole Sodium',
    category: 'Proton Pump Inhibitor (PPI)',
    standardStrengths: ['10mg', '20mg'],
    forms: ['Tablet'],
    shortForms: ['Rabe', 'Rabep', 'Razo-20', 'R-20'],
    commonMisspellings: ['Razo 20', 'Rabeprazol', 'Razod', 'Razole', 'Razo-D'],
    regionalAliases: ['Parit', 'Aciphex', 'Happi', 'Rablet', 'Cyra'],
  },
  {
    brandName: 'Vomikind',
    genericName: 'Ondansetron Hydrochloride',
    category: 'Antiemetic (5-HT3 Receptor Antagonist)',
    standardStrengths: ['4mg', '8mg', '2mg/5ml', 'MD (Mouth Dissolving)'],
    forms: ['Tablet (MD)', 'Syrup', 'Injection'],
    shortForms: ['Onda', 'Ondy', 'Ondans', 'Vomi'],
    commonMisspellings: ['Vomikind MD', 'Ondansetron 4mg', 'Vomicind', 'Vomikend', 'Vomikind 4'],
    regionalAliases: ['Emset', 'Zofran', 'Ondem', 'Periset'],
  },

  // Allergy, Cough & Respiratory
  {
    brandName: 'Montek-LC',
    genericName: 'Montelukast Sodium + Levocetirizine Dihydrochloride',
    category: 'Antihistamine & Leukotriene Receptor Antagonist (Allergic Rhinitis/Asthma)',
    standardStrengths: ['10mg + 5mg', '4mg + 2.5mg (Kid)'],
    forms: ['Tablet', 'Kid Tablet', 'Syrup'],
    shortForms: ['Mont-LC', 'MLC', 'M-LC', 'Montelukast-L', 'Mont-L'],
    commonMisspellings: ['Montair-LC', 'Montek LC', 'Montair LC', 'Montac-LC', 'Montil-LC', 'Monte-LC'],
    regionalAliases: ['Montair-LC', 'Telekast-L', 'Levocet-M', 'Odimont-LC'],
  },
  {
    brandName: 'Allegra',
    genericName: 'Fexofenadine Hydrochloride',
    category: 'Non-Sedating Antihistamine (H1 Blocker)',
    standardStrengths: ['120mg', '180mg', '30mg/5ml'],
    forms: ['Tablet', 'Suspension'],
    shortForms: ['Fexo', 'Alleg', 'Fexof'],
    commonMisspellings: ['Allegra 120', 'Allegra 180', 'Alegra', 'Allegera', 'Fexofenadin'],
    regionalAliases: ['Telfast', 'Fexova', 'Fexy', 'Histafree'],
  },
  {
    brandName: 'Cetzine',
    genericName: 'Cetirizine Dihydrochloride',
    category: 'Second-Generation Antihistamine',
    standardStrengths: ['5mg', '10mg', '5mg/5ml'],
    forms: ['Tablet', 'Syrup', 'Drops'],
    shortForms: ['Cet', 'Cetz', 'Cetir', 'CTZ'],
    commonMisspellings: ['Cetzine 10', 'Cetirizine 10mg', 'Cetrizine', 'Setzine', 'Cetzina', 'Zyrtec'],
    regionalAliases: ['Zyrtec', 'Alerid', 'Okacet', 'Incid-L'],
  },
  {
    brandName: 'Ascoril-LS',
    genericName: 'Levosalbutamol + Ambroxol + Guaifenesin',
    category: 'Bronchodilator & Mucolytic Cough Expectorant',
    standardStrengths: ['1mg + 30mg + 50mg per 5ml'],
    forms: ['Syrup', 'Drops'],
    shortForms: ['Ascoril', 'Asc-LS', 'A-LS', 'Ascor'],
    commonMisspellings: ['Ascoril LS', 'Ascoril-D', 'Ascoril D', 'Ascoril Exp', 'Ascoryl', 'Ascorill'],
    regionalAliases: ['Bro-Zedex', 'Asthakind-LS', 'Macbery-LS', 'Alex-LS'],
  },

  // Cardiovascular & Metabolic (Hypertension & Diabetes)
  {
    brandName: 'Telma',
    genericName: 'Telmisartan',
    category: 'Antihypertensive (Angiotensin II Receptor Blocker - ARB)',
    standardStrengths: ['20mg', '40mg', '80mg'],
    forms: ['Tablet'],
    shortForms: ['Telmi', 'Telm', 'Telma-40', 'Telma-H'],
    commonMisspellings: ['Telma 40', 'Telma 20', 'Telmisartin', 'Telmasartan', 'Thelma', 'Telma H'],
    regionalAliases: ['Micardis', 'Telmikind', 'Cresar', 'Telsar', 'Telpres'],
  },
  {
    brandName: 'Amlong',
    genericName: 'Amlodipine Besylate',
    category: 'Antihypertensive (Calcium Channel Blocker - CCB)',
    standardStrengths: ['2.5mg', '5mg', '10mg'],
    forms: ['Tablet'],
    shortForms: ['Amlo', 'Amlod', 'Amlong-5'],
    commonMisspellings: ['Amlodipin', 'Amlong 5', 'Amlong 2.5', 'Amlong-AT', 'Amlodopine'],
    regionalAliases: ['Norvasc', 'Stamlo', 'Amlopin', 'Amcard'],
  },
  {
    brandName: 'Atorva',
    genericName: 'Atorvastatin Calcium',
    category: 'Lipid-Lowering Agent (HMG-CoA Reductase Inhibitor / Statin)',
    standardStrengths: ['10mg', '20mg', '40mg', '80mg'],
    forms: ['Tablet'],
    shortForms: ['Ator', 'Atorva-10', 'Atorva-20', 'Stat'],
    commonMisspellings: ['Atorva 10', 'Atorva 20', 'Atorvastin', 'Atorvastatin 10mg', 'Atorvastatine', 'Atrova'],
    regionalAliases: ['Lipitor', 'Storvas', 'Tonact', 'Atocor'],
  },
  {
    brandName: 'Glycomet',
    genericName: 'Metformin Hydrochloride',
    category: 'Antidiabetic (Biguanide for Type 2 Diabetes)',
    standardStrengths: ['500mg', '850mg', '1000mg', 'SR 500mg', 'SR 1000mg'],
    forms: ['Tablet', 'SR / ER (Sustained Release) Tablet'],
    shortForms: ['Metfor', 'Glyco', 'Met', 'Met-500'],
    commonMisspellings: ['Glycomet 500', 'Glycomet SR', 'Glycomet-500', 'Metformn', 'Metformine', 'Glicomet'],
    regionalAliases: ['Glucophage', 'Obimet', 'Cetapin', 'Glumet'],
  },
  {
    brandName: 'Thyronorm',
    genericName: 'Levothyroxine Sodium',
    category: 'Thyroid Hormone Replacement (Hypothyroidism)',
    standardStrengths: ['25mcg', '50mcg', '75mcg', '100mcg', '125mcg'],
    forms: ['Tablet'],
    shortForms: ['Thyro', 'L-Thyro', 'Thyronorm-50', 'Thyronorm-25'],
    commonMisspellings: ['Thyronorm 50', 'Thyronorm 25', 'Thyroxine', 'Thyronorme', 'Tyronorm', 'Thyronorm-100'],
    regionalAliases: ['Synthroid', 'Eltroxin', 'Thyrox', 'Levoxyl'],
  },

  // Vitamins, Supplements & Minerals
  {
    brandName: 'Zincovit',
    genericName: 'Multivitamins + Multiminerals with Zinc, Grape Seed Extract',
    category: 'Nutritional Supplement & Immunity Enhancer',
    standardStrengths: ['Tablet (Zinc 22.5mg)', 'Syrup (15ml)'],
    forms: ['Tablet', 'Syrup', 'Drops'],
    shortForms: ['Zinco', 'Zinc', 'Multi-Vit', 'Z-Vit'],
    commonMisspellings: ['Zincovite', 'Zincovit Tab', 'Zincovita', 'Zinkovit', 'Zencovit'],
    regionalAliases: ['Becozinc', 'A to Z NS', 'Supradyn', 'Centrum'],
  },
  {
    brandName: 'Becosules',
    genericName: 'Vitamin B-Complex (B1, B2, B3, B6, B12, Folic Acid) + Vitamin C',
    category: 'Vitamin Supplement (Mouth Ulcers & Neuropathy)',
    standardStrengths: ['Capsule standard formula'],
    forms: ['Capsule', 'Syrup'],
    shortForms: ['B-Comp', 'B-Complex', 'Beco', 'Becos'],
    commonMisspellings: ['Becosule', 'Becosules Z', 'Bicosules', 'Becosul', 'Becosules-Z'],
    regionalAliases: ['Cobadex', 'Neurobion Forte', 'Polyfam'],
  },
  {
    brandName: 'Limcee',
    genericName: 'Vitamin C (Ascorbic Acid + Sodium Ascorbate)',
    category: 'Antioxidant & Nutritional Supplement (Chewable)',
    standardStrengths: ['500mg Chewable'],
    forms: ['Chewable Tablet'],
    shortForms: ['Vit-C', 'Limc', 'Ascorbic'],
    commonMisspellings: ['Limcee 500', 'Limce', 'Lymcee', 'Limcee-500', 'Limsi'],
    regionalAliases: ['Celin', 'Suckcee', 'Chewcee'],
  },
  {
    brandName: 'Shelcal',
    genericName: 'Calcium Carbonate + Vitamin D3 (Cholecalciferol)',
    category: 'Bone Mineral & Vitamin Supplement',
    standardStrengths: ['500mg + 250 IU', 'HD (500mg + 500 IU)'],
    forms: ['Tablet', 'Syrup'],
    shortForms: ['Calc', 'Shel', 'Cal-D3', 'Shel-500'],
    commonMisspellings: ['Shelcal 500', 'Shelcal-500', 'Shelcal HD', 'Shellcal', 'Shelkal'],
    regionalAliases: ['Calcicad', 'Cipcal', 'Gemcal', 'Corcium'],
  },
  {
    brandName: 'Electral',
    genericName: 'Oral Rehydration Salts (WHO Formula: Sodium Chloride, Potassium Chloride, Sodium Citrate, Dextrose)',
    category: 'Electrolyte Replenisher (Dehydration & Diarrhea)',
    standardStrengths: ['21.8g sachet for 1 Litre', '4.4g sachet for 200ml'],
    forms: ['Powder Sachet', 'Ready to Drink Liquid'],
    shortForms: ['ORS', 'Elect', 'WHO-ORS'],
    commonMisspellings: ['Electral ORS', 'Electrol', 'Electral Powder', 'Elektra', 'Electrole'],
    regionalAliases: ['ORS', 'Pedialyte', 'Walyte', 'Prolyte'],
  }
];

/**
 * Fast lookup map for Brand -> Generic conversion
 */
export const BRAND_TO_GENERIC_MAP: Record<string, string> = {};
export const CANONICAL_DRUG_NAMES: string[] = [];

// Populate lookup structures on import
MEDICINE_DICTIONARY.forEach((entry) => {
  BRAND_TO_GENERIC_MAP[entry.brandName.toLowerCase()] = entry.genericName;
  CANONICAL_DRUG_NAMES.push(entry.brandName);
  CANONICAL_DRUG_NAMES.push(entry.genericName);

  if (entry.regionalAliases) {
    entry.regionalAliases.forEach((alias) => {
      BRAND_TO_GENERIC_MAP[alias.toLowerCase()] = entry.genericName;
      CANONICAL_DRUG_NAMES.push(alias);
    });
  }

  entry.shortForms.forEach((sf) => {
    BRAND_TO_GENERIC_MAP[sf.toLowerCase()] = entry.genericName;
  });

  entry.commonMisspellings.forEach((mis) => {
    BRAND_TO_GENERIC_MAP[mis.toLowerCase()] = entry.genericName;
  });
});
