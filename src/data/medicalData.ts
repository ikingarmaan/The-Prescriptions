import { MedicalAbbreviation, PrescriptionAnalysisResult } from '../types';

export const MEDICAL_ABBREVIATIONS: MedicalAbbreviation[] = [
  // Frequency & Timing Codes
  {
    abbr: 'OD / qd',
    fullLatin: 'Omni Die',
    englishMeaning: 'Once daily (every 24 hours at the same time)',
    example: 'Tab Pantocid 40mg OD (Take 1 tablet once a day in morning)',
    category: 'frequency',
  },
  {
    abbr: 'BD / BID',
    fullLatin: 'Bis in Die',
    englishMeaning: 'Twice daily (roughly every 12 hours)',
    example: 'Tab Augmentin 625 BD (Take 1 tablet twice a day - morning & night)',
    category: 'frequency',
  },
  {
    abbr: 'TDS / TID',
    fullLatin: 'Ter Die Sumendum',
    englishMeaning: 'Three times daily (roughly every 8 hours)',
    example: 'Tab Paracetamol 650mg TDS (Morning, afternoon, night)',
    category: 'frequency',
  },
  {
    abbr: 'QID / QDS',
    fullLatin: 'Quater in Die',
    englishMeaning: 'Four times daily (roughly every 6 hours)',
    example: 'Eye drops 1 drop QID (4 times spaced throughout the day)',
    category: 'frequency',
  },
  {
    abbr: '1-0-1',
    fullLatin: 'Morning - Afternoon - Night notation',
    englishMeaning: '1 dose morning, 0 afternoon, 1 dose night',
    example: 'Tab Metformin 500mg 1-0-1 (Take with breakfast & dinner)',
    category: 'frequency',
  },
  {
    abbr: '1-0-0',
    fullLatin: 'Morning only',
    englishMeaning: '1 dose in the morning, 0 afternoon, 0 night',
    example: 'Tab Thyronorm 50mcg 1-0-0 (Take morning on empty stomach)',
    category: 'frequency',
  },
  {
    abbr: '0-0-1',
    fullLatin: 'Night only',
    englishMeaning: '0 morning, 0 afternoon, 1 dose at bedtime',
    example: 'Tab Atorva 10mg 0-0-1 (Take at night before sleep)',
    category: 'frequency',
  },
  {
    abbr: '1-1-1',
    fullLatin: 'Thrice daily dosing notation',
    englishMeaning: '1 dose morning, 1 afternoon, 1 night',
    example: 'Syp Ascoril LS 10ml 1-1-1 (Take after meals 3 times a day)',
    category: 'frequency',
  },
  {
    abbr: 'Q4H / Q6H / Q8H',
    fullLatin: 'Quaque 4/6/8 Hora',
    englishMeaning: 'Every 4, 6, or 8 hours around the clock',
    example: 'Tab Ibuprofen 400mg Q6H (Take every 6 hours as needed)',
    category: 'frequency',
  },
  {
    abbr: 'QOD / EOD',
    fullLatin: 'Quaque Altera Die',
    englishMeaning: 'Every other day / alternate days',
    example: 'Tab Prednisolone 10mg QOD (Take once every two days)',
    category: 'frequency',
  },
  {
    abbr: 'AC',
    fullLatin: 'Ante Cibum',
    englishMeaning: 'Before meals (30–45 mins prior on empty stomach)',
    example: 'Cap Omeprazole 20mg AC (Take on empty stomach before breakfast)',
    category: 'timing',
  },
  {
    abbr: 'PC',
    fullLatin: 'Post Cibum',
    englishMeaning: 'After meals (to prevent gastric mucosal irritation)',
    example: 'Tab Ibuprofen 400mg PC (Take with or immediately after food)',
    category: 'timing',
  },
  {
    abbr: 'HS / QHS',
    fullLatin: 'Hora Somni',
    englishMeaning: 'At bedtime / immediately before going to sleep',
    example: 'Tab Montelukast 10mg HS (Take at night before sleeping)',
    category: 'timing',
  },
  {
    abbr: 'BBF',
    fullLatin: 'Before Breakfast',
    englishMeaning: 'Take first thing in the morning before breakfast',
    example: 'Tab Rabeprazole 20mg BBF (Take on empty stomach before breakfast)',
    category: 'timing',
  },
  {
    abbr: 'ABF',
    fullLatin: 'After Breakfast',
    englishMeaning: 'Take immediately after finishing morning breakfast',
    example: 'Tab Multivitamin ABF (Take with food to aid fat-soluble absorption)',
    category: 'timing',
  },
  {
    abbr: 'Mane / Nocte',
    fullLatin: 'Mane / Nocte',
    englishMeaning: 'In the morning (Mane) / At night (Nocte)',
    example: 'Tab 1 Mane, 1 Nocte (One in morning, one at night)',
    category: 'timing',
  },
  {
    abbr: 'ad lib.',
    fullLatin: 'Ad Libitum',
    englishMeaning: 'Freely, as desired, or as much as needed',
    example: 'Drink clean water and ORS ad lib.',
    category: 'timing',
  },

  // Prescribing Directives & Shorthand
  {
    abbr: 'Rx',
    fullLatin: 'Recipe',
    englishMeaning: 'Take thou (Traditional symbol preceding doctor prescription)',
    example: 'Rx: Tab Augmentin 625mg',
    category: 'clinical_directive',
  },
  {
    abbr: 'Sig / S.',
    fullLatin: 'Signa / Signetur',
    englishMeaning: 'Write on label / patient directions',
    example: 'Sig: 1 tab PO BD PC x 5 days',
    category: 'clinical_directive',
  },
  {
    abbr: 'Mitte',
    fullLatin: 'Mitte Tales',
    englishMeaning: 'Dispense or send this specific quantity',
    example: 'Mitte: 10 tablets',
    category: 'clinical_directive',
  },
  {
    abbr: 'c',
    fullLatin: 'Cum',
    englishMeaning: 'With (e.g., with water or with meals)',
    example: 'Take 1 tablet c water',
    category: 'clinical_directive',
  },
  {
    abbr: 's',
    fullLatin: 'Sine',
    englishMeaning: 'Without',
    example: 'Take s food (on an empty stomach)',
    category: 'clinical_directive',
  },
  {
    abbr: 'aa / ana',
    fullLatin: 'Ana',
    englishMeaning: 'Of each in equal quantities',
    example: 'Menthol & Camphor aa 5g',
    category: 'clinical_directive',
  },
  {
    abbr: 'qs',
    fullLatin: 'Quantum Sufficiat',
    englishMeaning: 'As much as suffices to produce required volume/strength',
    example: 'Aqua purificata qs to 100ml',
    category: 'clinical_directive',
  },
  {
    abbr: 'NPO',
    fullLatin: 'Nil Per Os',
    englishMeaning: 'Nothing by mouth (no food or drink, common pre-surgery)',
    example: 'NPO after midnight prior to endoscopy',
    category: 'clinical_directive',
  },
  {
    abbr: 'c/o',
    fullLatin: 'Complaining Of',
    englishMeaning: 'Presenting symptoms reported by the patient',
    example: 'c/o fever with chills x 3 days',
    category: 'clinical_directive',
  },
  {
    abbr: 'k/c/o',
    fullLatin: 'Known Case Of',
    englishMeaning: 'Pre-existing chronic diagnosed condition',
    example: 'k/c/o Type 2 Diabetes Mellitus & Hypertension',
    category: 'clinical_directive',
  },
  {
    abbr: 'h/o',
    fullLatin: 'History Of',
    englishMeaning: 'Medical background or prior disease episode',
    example: 'h/o bronchial asthma in childhood',
    category: 'clinical_directive',
  },
  {
    abbr: 'd/d or DDx',
    fullLatin: 'Differential Diagnosis',
    englishMeaning: 'Possible diseases explaining clinical signs',
    example: 'd/d: Viral URTI vs Acute Bacterial Sinusitis',
    category: 'clinical_directive',
  },
  {
    abbr: 'r/o',
    fullLatin: 'Rule Out',
    englishMeaning: 'Conduct tests to definitively exclude a serious condition',
    example: 'r/o Appendicitis or Acute Cholecystitis',
    category: 'clinical_directive',
  },
  {
    abbr: 'f/u',
    fullLatin: 'Follow Up',
    englishMeaning: 'Schedule review consultation or re-evaluation',
    example: 'f/u after 5 days with CBC report',
    category: 'clinical_directive',
  },
  {
    abbr: 'Adv / Ix / Inv',
    fullLatin: 'Advice / Investigations',
    englishMeaning: 'Doctor orders for diagnostic lab tests and home care',
    example: 'Adv: Rest, steam inhalation; Ix: CBC, ESR',
    category: 'clinical_directive',
  },
  {
    abbr: 'PRN / SOS',
    fullLatin: 'Pro Re Nata / Si Opus Sit',
    englishMeaning: 'As needed / only when emergency symptoms occur',
    example: 'Tab Ondansetron 4mg SOS (Take only if nausea occurs)',
    category: 'instructions',
  },
  {
    abbr: 'Stat',
    fullLatin: 'Statim',
    englishMeaning: 'Immediately / right now (single loading dose)',
    example: 'Tab Azithromycin 500mg Stat (Take initial dose immediately)',
    category: 'instructions',
  },

  // Routes of Administration
  {
    abbr: 'PO',
    fullLatin: 'Per Os',
    englishMeaning: 'By mouth / oral ingestion',
    example: 'Syrup 10ml PO (Swallow by mouth)',
    category: 'route',
  },
  {
    abbr: 'SL',
    fullLatin: 'Sub Lingua',
    englishMeaning: 'Sublingual (placed under tongue to dissolve into bloodstream)',
    example: 'Tab Sorbitrate 5mg SL (Dissolve under tongue for angina pain)',
    category: 'route',
  },
  {
    abbr: 'PR',
    fullLatin: 'Per Rectum',
    englishMeaning: 'Rectal administration (suppository or enema)',
    example: 'Suppository 1 PR for high pediatric fever',
    category: 'route',
  },
  {
    abbr: 'SC / SQ',
    fullLatin: 'Subcutis',
    englishMeaning: 'Subcutaneous injection (into fatty layer under skin)',
    example: 'Inj Insulin Glargine 12 units SC at bedtime',
    category: 'route',
  },
  {
    abbr: 'IM',
    fullLatin: 'Intra Musculum',
    englishMeaning: 'Intramuscular injection (into deep muscle tissue)',
    example: 'Inj Diclofenac 75mg IM for acute renal colic pain',
    category: 'route',
  },
  {
    abbr: 'IV / IVP / IVPB',
    fullLatin: 'Intra Venam',
    englishMeaning: 'Intravenous injection, push, or piggyback infusion',
    example: 'Inj Ceftriaxone 1g IV BD in 100ml NS',
    category: 'route',
  },
  {
    abbr: 'Top.',
    fullLatin: 'Topicalis',
    englishMeaning: 'Apply topically on external skin surface',
    example: 'Mupirocin Ointment apply Top. BD',
    category: 'route',
  },
  {
    abbr: 'Inh. / Neb.',
    fullLatin: 'Inhalatio / Nebulisatio',
    englishMeaning: 'Inhalation via inhaler or aerosolized nebulizer machine',
    example: 'Budecort 0.5mg respule Neb. BD',
    category: 'route',
  },

  // Eye & Ear Sidedness Notations
  {
    abbr: 'OD (Ophthalmology)',
    fullLatin: 'Oculus Dexter',
    englishMeaning: 'Right eye',
    example: 'Ciprofloxacin eye drops 1 drop in OD TDS',
    category: 'eye_ear',
  },
  {
    abbr: 'OS',
    fullLatin: 'Oculus Sinister',
    englishMeaning: 'Left eye',
    example: 'Timolol eye drops 1 drop in OS BD',
    category: 'eye_ear',
  },
  {
    abbr: 'OU',
    fullLatin: 'Oculus Uterque',
    englishMeaning: 'Both eyes',
    example: 'Carboxymethylcellulose drops 1 drop OU QID for dry eyes',
    category: 'eye_ear',
  },
  {
    abbr: 'AD / AS / AU',
    fullLatin: 'Auris Dextra / Sinistra / Uterque',
    englishMeaning: 'Right ear (AD) / Left ear (AS) / Both ears (AU)',
    example: 'Wax-dissolving drops 3 drops in AD TDS',
    category: 'eye_ear',
  },

  // Pharmaceutical Formulations
  {
    abbr: 'Tab / Cap / Syp',
    fullLatin: 'Tabella / Capsula / Syrupus',
    englishMeaning: 'Tablet / Capsule / Liquid Syrup formulation',
    example: 'Cap Amoxicillin 500mg (1 capsule)',
    category: 'form',
  },
  {
    abbr: 'Susp.',
    fullLatin: 'Suspensio',
    englishMeaning: 'Oral suspension (must shake well before measuring)',
    example: 'Susp Cefixime 100mg/5ml (Shake well before use)',
    category: 'form',
  },
  {
    abbr: 'Oint / Ung',
    fullLatin: 'Unguentum',
    englishMeaning: 'Ointment (greasy, oil-based topical preparation)',
    example: 'Ung Betamethasone apply thin layer',
    category: 'form',
  },
  {
    abbr: 'Supp. / Pess.',
    fullLatin: 'Suppositorium / Pessarium',
    englishMeaning: 'Suppository (rectal) / Pessary (vaginal)',
    example: 'Clotrimazole pessary 100mg 1 HS x 6 nights',
    category: 'form',
  },
  {
    abbr: 'Gtt.',
    fullLatin: 'Guttae',
    englishMeaning: 'Liquid drops (eye, ear, or pediatric oral drops)',
    example: 'Instill 2 gtt into affected ear',
    category: 'form',
  },
  {
    abbr: 'Pulv.',
    fullLatin: 'Pulvis',
    englishMeaning: 'Powder sachet to be mixed in water',
    example: 'Pulv Electral 1 sachet in 1 liter clean water',
    category: 'form',
  },

  // Dosages & Measurements
  {
    abbr: 'mg / mcg (µg)',
    fullLatin: 'Milligram / Microgram',
    englishMeaning: 'Active drug metric weight units (1 mg = 1000 mcg)',
    example: 'Levothyroxine 50mcg (0.05mg)',
    category: 'measurement',
  },
  {
    abbr: 'ml / L',
    fullLatin: 'Milliliter / Liter',
    englishMeaning: 'Liquid volume metric units (5ml = 1 standard teaspoon)',
    example: 'Take 5ml (1 tsp) twice daily',
    category: 'measurement',
  },
  {
    abbr: 'tsp / tbsp',
    fullLatin: 'Teaspoon / Tablespoon',
    englishMeaning: '1 teaspoon = approx 5ml; 1 tablespoon = approx 15ml',
    example: '1 tbsp (15ml) antacid gel after meals',
    category: 'measurement',
  },
  {
    abbr: 'IU / UI',
    fullLatin: 'International Units',
    englishMeaning: 'Standardized biological measurement unit (Vitamins, Insulin)',
    example: 'Vitamin D3 60,000 IU once weekly',
    category: 'measurement',
  },
  {
    abbr: 'ss',
    fullLatin: 'Semis',
    englishMeaning: 'One half (1/2 tablet)',
    example: 'Tab Metoprolol 50mg take ss (half tab = 25mg)',
    category: 'measurement',
  },

  // Diagnostic & Laboratory Investigations
  {
    abbr: 'CBC / TLC / DLC',
    fullLatin: 'Complete Blood Count / Total & Differential Leukocyte Count',
    englishMeaning: 'Measures RBC, hemoglobin, platelets, and white blood cell subtypes to detect anemia or bacterial vs viral infection',
    example: 'Adv: CBC with ESR (elevated neutrophils indicate bacterial infection)',
    category: 'lab_test',
  },
  {
    abbr: 'ESR / CRP',
    fullLatin: 'Erythrocyte Sedimentation Rate / C-Reactive Protein',
    englishMeaning: 'Inflammatory biomarkers measuring systemic inflammation or bacterial infection severity',
    example: 'Inv: High-sensitivity CRP (checks vascular inflammation)',
    category: 'lab_test',
  },
  {
    abbr: 'LFT',
    fullLatin: 'Liver Function Test',
    englishMeaning: 'Checks SGOT (AST), SGPT (ALT), Bilirubin, Alkaline Phosphatase, and Albumin to evaluate hepatic metabolism',
    example: 'Adv: LFT before initiating statins or hepatotoxic drugs',
    category: 'lab_test',
  },
  {
    abbr: 'KFT / RFT',
    fullLatin: 'Kidney / Renal Function Test',
    englishMeaning: 'Assesses renal filtration through Serum Creatinine, Blood Urea Nitrogen (BUN), eGFR, and Uric Acid',
    example: 'Inv: KFT (essential when prescribing ACE inhibitors or antibiotics)',
    category: 'lab_test',
  },
  {
    abbr: 'FBS & PPBS / RBS',
    fullLatin: 'Fasting, Post-Prandial & Random Blood Sugar',
    englishMeaning: 'Fasting sugar (8-10 hr fast), PPBS (2 hrs after meal), and RBS for diabetes assessment',
    example: 'Adv: FBS (<100 mg/dL normal) and PPBS (<140 mg/dL normal)',
    category: 'lab_test',
  },
  {
    abbr: 'HbA1c',
    fullLatin: 'Glycated Hemoglobin',
    englishMeaning: 'Measures average glucose control over past 2 to 3 months (<5.7% normal, >=6.5% diabetic)',
    example: 'Adv: HbA1c every 3 months for glycemic tracking',
    category: 'lab_test',
  },
  {
    abbr: 'Lipid Profile',
    fullLatin: 'Serum Lipid Panel (TC, LDL, HDL, TG, VLDL)',
    englishMeaning: 'Assesses cardiovascular risk; checks Total Cholesterol, LDL ("bad"), HDL ("good"), and Triglycerides (requires 10-12 hr fasting)',
    example: 'Adv: Fasting Lipid Profile to monitor statin response',
    category: 'lab_test',
  },
  {
    abbr: 'CXR (PA View)',
    fullLatin: 'Chest X-Ray (Postero-Anterior)',
    englishMeaning: 'Radiological scan imaging lungs, bronchi, cardiac silhouette, and ribs for pneumonia or congestion',
    example: 'Inv: CXR PA view for persistent cough and fever',
    category: 'lab_test',
  },
  {
    abbr: 'ECG / EKG',
    fullLatin: 'Electrocardiogram',
    englishMeaning: '12-lead electrical tracing detecting cardiac arrhythmias, ischemia, or chamber enlargement',
    example: 'Adv: 12-Lead ECG for chest tightness or hypertension',
    category: 'lab_test',
  },
  {
    abbr: '2D Echo / TMT',
    fullLatin: '2D Echocardiography / Treadmill Exercise Stress Test',
    englishMeaning: 'Cardiac ultrasound visualizing heart valves, ejection fraction, and exercise stress testing',
    example: 'Adv: 2D Echo to measure Left Ventricular Ejection Fraction (LVEF)',
    category: 'lab_test',
  },
  {
    abbr: 'USG Abd & Pelvis',
    fullLatin: 'Ultrasonography Abdomen & Pelvis',
    englishMeaning: 'High-frequency soundwave imaging of liver, gallbladder, kidneys, appendix, bladder, and pelvic organs',
    example: 'Adv: USG Abdomen (full bladder required for pelvic scan)',
    category: 'lab_test',
  },
  {
    abbr: 'CT / HRCT',
    fullLatin: 'High-Resolution Computed Tomography',
    englishMeaning: 'Cross-sectional 3D X-ray imaging of chest or brain to detect lung parenchymal disease or hemorrhage',
    example: 'Adv: HRCT Chest to check for interstitial lung disease or bronchiectasis',
    category: 'lab_test',
  },
  {
    abbr: 'Urine R/M & C/S',
    fullLatin: 'Urine Routine, Microscopy & Culture/Sensitivity',
    englishMeaning: 'Checks pus cells, RBCs, protein, glucose, and cultures bacteria to identify antibiotic susceptibility',
    example: 'Adv: Clean-catch midstream Urine R/M and C/S for burning micturition',
    category: 'lab_test',
  },
  {
    abbr: 'Stool R/M',
    fullLatin: 'Stool Routine & Microscopy Examination',
    englishMeaning: 'Checks for fecal pus cells, occult blood, protozoal cysts, or ova in gastroenteritis',
    example: 'Adv: Stool R/M for amoebiasis or bacterial dysentery',
    category: 'lab_test',
  },
  {
    abbr: 'TSH / Thyroid Profile',
    fullLatin: 'Thyroid Stimulating Hormone (TSH, FT3, FT4)',
    englishMeaning: 'Endocrine panel diagnosing hypothyroidism (elevated TSH) or hyperthyroidism (suppressed TSH)',
    example: 'Inv: Serum TSH morning sample before thyroid medication',
    category: 'lab_test',
  },
  {
    abbr: 'Serum Electrolytes',
    fullLatin: 'Serum Sodium (Na+), Potassium (K+), Chloride (Cl-)',
    englishMeaning: 'Essential blood ions controlling hydration, nerve firing, and cardiac rhythm',
    example: 'Inv: Serum Electrolytes for dehydration or diuretic therapy',
    category: 'lab_test',
  },
  {
    abbr: 'Serum Ferritin / Iron Profile',
    fullLatin: 'Serum Ferritin, Iron, Total Iron Binding Capacity (TIBC)',
    englishMeaning: 'Measures body iron storage reserves to differentiate iron deficiency anemia from chronic disease',
    example: 'Adv: Serum Ferritin (<30 ng/ml indicates depleted iron stores)',
    category: 'lab_test',
  },
  {
    abbr: 'Vitamin D3 & B12',
    fullLatin: '25-Hydroxy Vitamin D & Serum Cyanocobalamin',
    englishMeaning: 'Critical micronutrients for bone mineralization, immune function, and peripheral nerve health',
    example: 'Adv: Serum Vit D3 (target >30 ng/ml) & Vit B12 (target >300 pg/ml)',
    category: 'lab_test',
  },
  {
    abbr: 'D-Dimer',
    fullLatin: 'Fibrin Degradation Fragment D-Dimer',
    englishMeaning: 'Biomarker ruled out for Deep Vein Thrombosis (DVT) and Pulmonary Embolism',
    example: 'Inv: Quantitative D-Dimer to rule out hypercoagulability',
    category: 'lab_test',
  },
  {
    abbr: 'Troponin-I / T',
    fullLatin: 'Cardiac Troponin-I / Troponin-T',
    englishMeaning: 'Gold-standard blood biomarker indicating myocardial cell death / heart attack (STEMI/NSTEMI)',
    example: 'Adv: STAT High-Sensitivity Troponin-I in acute chest pain',
    category: 'lab_test',
  },
  {
    abbr: 'PT / INR',
    fullLatin: 'Prothrombin Time / International Normalized Ratio',
    englishMeaning: 'Clotting time test monitoring anticoagulant therapy like Warfarin (target INR 2.0–3.0)',
    example: 'Adv: Monthly PT/INR for oral anticoagulant dosing',
    category: 'lab_test',
  },
  {
    abbr: 'PSA',
    fullLatin: 'Prostate-Specific Antigen',
    englishMeaning: 'Screening biomarker for benign prostatic hyperplasia (BPH) or prostate malignancy',
    example: 'Adv: Total PSA for urinary hesitancy in men over 50',
    category: 'lab_test',
  },
  {
    abbr: 'RA Factor & Anti-CCP',
    fullLatin: 'Rheumatoid Factor & Cyclic Citrullinated Peptide',
    englishMeaning: 'Autoimmune serology antibodies confirming Rheumatoid Arthritis',
    example: 'Inv: Anti-CCP antibodies (high specificity for erosive arthritis)',
    category: 'lab_test',
  },
  {
    abbr: 'ANA',
    fullLatin: 'Antinuclear Antibodies by IFA',
    englishMeaning: 'Primary screening test for systemic autoimmune diseases like Systemic Lupus Erythematosus (SLE)',
    example: 'Inv: ANA IFA titer and pattern for unexplained joint pain and rash',
    category: 'lab_test',
  },
  {
    abbr: 'eGFR',
    fullLatin: 'Estimated Glomerular Filtration Rate',
    englishMeaning: 'Calculated kidney filtration capacity in ml/min/1.73m² (Normal >90; CKD stage 3 <60)',
    example: 'eGFR calculated from Serum Creatinine, age, and biological sex',
    category: 'lab_test',
  },
];


export interface SamplePrescription {
  id: string;
  title: string;
  subtitle: string;
  condition: string;
  previewText: string;
  sampleResult: PrescriptionAnalysisResult;
}

export const SAMPLE_PRESCRIPTIONS: SamplePrescription[] = [
  {
    id: 'sample-respiratory',
    title: 'Acute Bronchitis & Cough',
    subtitle: 'Antibiotic + Cough Syrup + Antihistamine + CBC & Chest X-Ray',
    condition: 'Upper Respiratory Tract Infection & Bronchial Irritation',
    previewText: `Rx:
1. Tab. Augmentin 625mg (Amox-Clav) - 1 tab BD PC x 5 days
2. Tab. Pantocid 40mg - 1 tab OD AC (Morning) x 5 days
3. Tab. Levocet M (Levocetirizine + Montelukast) - 1 tab HS x 7 days
4. Syp. Ascoril LS - 10ml TDS PC x 5 days
5. Tab. Dolo 650mg - 1 tab TDS SOS (if fever/body ache > 100°F)

Adv / Investigations:
• Complete Blood Count (CBC) with Differential
• Chest X-Ray (PA View)`,
    sampleResult: {
      doctorSpecialtyOrClinic: 'Pulmonology & General Medicine Clinic',
      prescriptionDate: 'Recent',
      suspectedCondition: 'Acute Upper Respiratory Tract Infection with Productive Cough and Fever',
      generalExplanation: 'This prescription treats an acute respiratory infection with bacterial involvement. It pairs a broad-spectrum antibiotic with an antacid to prevent stomach irritation, an evening allergy/airway medication to reduce nighttime coughing, a mucus-clearing cough syrup, and an as-needed pain/fever reliever. The doctor also ordered blood and chest imaging to confirm lung clearance.',
      medicines: [
        {
          name: 'Augmentin 625mg',
          genericName: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
          form: 'Tablet',
          strength: '625 mg',
          dosage: '1 tablet',
          frequency: 'Twice daily (approx. every 12 hours)',
          timingCode: 'BD / 1-0-1 PC',
          mealRelation: 'after_meal',
          mealRelationText: 'Take immediately after food or a meal to minimize gastric discomfort',
          duration: '5 days',
          scheduleTimes: { morning: true, afternoon: false, evening: true, bedtime: false, asNeeded: false },
          purposeAndUsage: 'Broad-spectrum antibiotic. Amoxicillin kills the bacteria causing infection in your respiratory tract, while clavulanic acid prevents bacteria from resisting the antibiotic.',
          howToTake: 'Swallow whole with a full glass of water. Do not chew or crush. Complete the full 5-day course even if you feel completely better.',
          precautions: [
            'Must complete the entire 5 days to prevent antibiotic resistance.',
            'Maintain good hydration throughout the day.',
            'Inform doctor if you experience severe diarrhea or skin rash.'
          ],
          commonSideEffects: ['Mild nausea', 'Soft stools', 'Mild stomach upset'],
          whenToContactDoctor: 'Severe watery diarrhea, hives/allergic swelling, or difficulty breathing.'
        },
        {
          name: 'Pantocid 40mg',
          genericName: 'Pantoprazole Sodium',
          form: 'Tablet',
          strength: '40 mg',
          dosage: '1 tablet',
          frequency: 'Once daily (in the morning)',
          timingCode: 'OD / 1-0-0 AC',
          mealRelation: 'empty_stomach',
          mealRelationText: 'Take 30 to 60 minutes before breakfast on an empty stomach with plain water',
          duration: '5 days',
          scheduleTimes: { morning: true, afternoon: false, evening: false, bedtime: false, asNeeded: false },
          purposeAndUsage: 'Proton Pump Inhibitor (PPI) that decreases stomach acid production to shield your stomach lining from irritation caused by antibiotics or illness.',
          howToTake: 'Swallow whole with water at least 30 minutes before having your morning meal or tea.',
          precautions: ['Do not crush or split the tablet as it has an acid-resistant enteric coating.'],
          commonSideEffects: ['Mild headache', 'Gas', 'Constipation or loose stools'],
          whenToContactDoctor: 'Severe abdominal cramping or prolonged dizziness.'
        },
        {
          name: 'Levocet M',
          genericName: 'Levocetirizine (5mg) + Montelukast (10mg)',
          form: 'Tablet',
          strength: '5mg / 10mg',
          dosage: '1 tablet',
          frequency: 'Once daily (at night)',
          timingCode: 'HS / 0-0-0-1',
          mealRelation: 'anytime',
          mealRelationText: 'Can be taken with or without food, preferably before bedtime',
          duration: '7 days',
          scheduleTimes: { morning: false, afternoon: false, evening: false, bedtime: true, asNeeded: false },
          purposeAndUsage: 'Dual anti-allergic and leukotriene blocker. Relieves sneezing, runny nose, throat itching, and relaxes bronchial airway swelling to prevent coughing at night.',
          howToTake: 'Take once daily in the evening or 30 minutes before sleep.',
          precautions: ['May cause mild drowsiness; avoid driving or operating machinery immediately after taking.'],
          commonSideEffects: ['Mild drowsiness', 'Dry mouth', 'Fatigue'],
          whenToContactDoctor: 'Unusual mood changes or persistent daytime sleepiness.'
        },
        {
          name: 'Ascoril LS Syrup',
          genericName: 'Levosalbutamol + Ambroxol + Guaiphenesin',
          form: 'Syrup / Liquid',
          strength: 'Standard therapeutic oral suspension',
          dosage: '10 ml (approx. 2 teaspoons)',
          frequency: 'Three times daily',
          timingCode: 'TDS / 1-1-1 PC',
          mealRelation: 'after_meal',
          mealRelationText: 'Take after meals with warm water',
          duration: '5 days',
          scheduleTimes: { morning: true, afternoon: true, evening: true, bedtime: false, asNeeded: false },
          purposeAndUsage: 'Expectorant and bronchodilator. Thins thick mucus and widens bronchial airways to make coughing productive and breathing easier.',
          howToTake: 'Use the measuring cup provided. Drink warm fluids after taking to help break up phlegm.',
          precautions: ['Shake bottle well before each dose.', 'May cause mild hand tremors or elevated heart rate in some patients.'],
          commonSideEffects: ['Mild tremor', 'Fast heartbeat sensation', 'Nausea'],
          whenToContactDoctor: 'Severe palpitations, dizziness, or chest tightness.'
        },
        {
          name: 'Dolo 650mg',
          genericName: 'Paracetamol / Acetaminophen',
          form: 'Tablet',
          strength: '650 mg',
          dosage: '1 tablet',
          frequency: 'As needed (maximum 3 times a day, separated by 6 hours)',
          timingCode: 'PRN / SOS',
          mealRelation: 'after_meal',
          mealRelationText: 'Take with or after food with plenty of water',
          duration: 'As needed for fever or pain',
          scheduleTimes: { morning: false, afternoon: false, evening: false, bedtime: false, asNeeded: true },
          purposeAndUsage: 'Analgesic and antipyretic. Lowers elevated body temperature (fever) and eases headache, throat discomfort, and general body aches.',
          howToTake: 'Take 1 tablet only if fever exceeds 100°F or body pain is present. Allow at least 6 hours between doses.',
          precautions: ['Do not exceed 3,000mg of paracetamol per day.', 'Avoid taking other cold medicines that also contain paracetamol to prevent overdose.'],
          commonSideEffects: ['Very well tolerated when taken as directed.'],
          whenToContactDoctor: 'Fever persisting over 3 days or rash.'
        }
      ],
      labTests: [
        {
          testName: 'Complete Blood Count (CBC) with Differential',
          category: 'Blood Investigation',
          whyDoctorOrdered: 'To measure White Blood Cell (WBC) count and neutrophil percentage to differentiate bacterial infection from viral bronchitis, and rule out severe leukocytosis.',
          preparationInstructions: 'No special fasting is required. Can be done at any time of day. Stay normally hydrated.',
          sampleRequired: 'Venous Blood Sample (EDTA purple-top tube)',
          fastingRequired: false,
          urgency: 'routine',
          commonNormalRangeContext: 'Total WBC normal range is 4,000–11,000 cells/mcL. Elevated levels indicate immune response to infection.'
        },
        {
          testName: 'Chest X-Ray (PA View)',
          category: 'Radiology / Imaging',
          whyDoctorOrdered: 'To examine bronchial lung fields, evaluate for potential consolidation (pneumonia), and rule out fluid effusion or lower respiratory complications.',
          preparationInstructions: 'Remove any metal necklaces, brassieres with underwire, or chest piercings prior to imaging.',
          sampleRequired: 'Digital Radiographic Imaging',
          fastingRequired: false,
          urgency: 'routine',
          commonNormalRangeContext: 'Clear lung fields with normal broncho-vascular markings and normal cardiac shadow.'
        }
      ],
      chronologicalTakingPlan: [
        {
          timeLabel: '7:00 AM – Waking / Empty Stomach',
          slotName: 'morning_empty_stomach',
          title: 'Morning: Empty Stomach (Before Food)',
          description: 'Take 30-45 minutes before having tea, coffee, or breakfast with a glass of plain water',
          items: [
            {
              medicineName: 'Pantocid 40mg',
              genericName: 'Pantoprazole Sodium',
              dosage: '1 tablet',
              instructions: 'Swallow whole. Shields stomach wall from acid irritation before meals.',
              isCriticalTiming: true
            }
          ]
        },
        {
          timeLabel: '8:30 AM – Morning (Post-Breakfast)',
          slotName: 'morning_after_breakfast',
          title: 'Morning: After Breakfast',
          description: 'Take within 15-30 minutes after completing your morning meal',
          items: [
            {
              medicineName: 'Augmentin 625mg',
              genericName: 'Amoxicillin + Clavulanic Acid',
              dosage: '1 tablet',
              instructions: 'Take immediately after food with plenty of water to prevent stomach upset.',
              isCriticalTiming: true
            },
            {
              medicineName: 'Ascoril LS Syrup',
              genericName: 'Levosalbutamol + Ambroxol + Guaiphenesin',
              dosage: '10 ml',
              instructions: 'Measure using the dosing cup. Drink warm water after to help dissolve phlegm.'
            }
          ]
        },
        {
          timeLabel: '1:30 PM – Afternoon (Post-Lunch)',
          slotName: 'afternoon_after_lunch',
          title: 'Afternoon: After Lunch',
          description: 'Take after your afternoon meal',
          items: [
            {
              medicineName: 'Ascoril LS Syrup',
              genericName: 'Levosalbutamol + Ambroxol + Guaiphenesin',
              dosage: '10 ml',
              instructions: 'Second cough syrup dose to keep airways dilated throughout the day.'
            }
          ]
        },
        {
          timeLabel: '8:30 PM – Evening (Post-Dinner)',
          slotName: 'night_after_dinner',
          title: 'Night: After Dinner',
          description: 'Take within 20 minutes after completing dinner',
          items: [
            {
              medicineName: 'Augmentin 625mg',
              genericName: 'Amoxicillin + Clavulanic Acid',
              dosage: '1 tablet',
              instructions: 'Second antibiotic dose, spaced roughly 12 hours from morning dose.',
              isCriticalTiming: true
            },
            {
              medicineName: 'Ascoril LS Syrup',
              genericName: 'Levosalbutamol + Ambroxol + Guaiphenesin',
              dosage: '10 ml',
              instructions: 'Third cough syrup dose.'
            }
          ]
        },
        {
          timeLabel: '10:00 PM – Bedtime (Before Sleep)',
          slotName: 'bedtime',
          title: 'Night: Bedtime',
          description: 'Take 20-30 minutes before going to sleep',
          items: [
            {
              medicineName: 'Levocet M',
              genericName: 'Levocetirizine + Montelukast',
              dosage: '1 tablet',
              instructions: 'Prevents nocturnal coughing, sneezing, and airway bronchospasm so you can sleep peacefully.'
            }
          ]
        },
        {
          timeLabel: 'As Needed (SOS / PRN)',
          slotName: 'as_needed',
          title: 'As Needed: Only When Required',
          description: 'Only take if fever exceeds 100°F or severe body ache occurs',
          items: [
            {
              medicineName: 'Dolo 650mg',
              genericName: 'Paracetamol',
              dosage: '1 tablet',
              instructions: 'Maximum 3 times daily. Keep a minimum gap of 6 hours between doses.'
            }
          ]
        }
      ],
      scheduleSummary: {
        morning: ['Pantocid 40mg (30 mins before breakfast - Empty stomach)', 'Augmentin 625mg (After breakfast)', 'Ascoril LS Syrup 10ml (After breakfast)'],
        afternoon: ['Ascoril LS Syrup 10ml (After lunch)'],
        evening: ['Augmentin 625mg (After dinner)', 'Ascoril LS Syrup 10ml (After dinner)'],
        bedtime: ['Levocet M 1 tablet (At night before sleeping)'],
        asNeeded: ['Dolo 650mg (Only if fever > 100°F or severe body ache; min 6 hours apart)']
      },
      potentialInteractionsOrSpacingAdvice: [
        'Take Pantocid 40mg 30 minutes before your breakfast, then take Augmentin 625mg after you finish breakfast.',
        'Drink plenty of warm water throughout the day to help the cough syrup liquefy chest secretions.',
        'Avoid taking additional over-the-counter flu tablets that contain paracetamol while using Dolo 650.'
      ],
      foodAndDietaryRules: {
        foodsToEat: [
          'Warm vegetable soups and clear bone or lentil broths',
          'Fresh curd / probiotic yogurt (to restore beneficial gut flora during antibiotic therapy)',
          'Warm water with honey and ginger to soothe the irritated throat lining',
          'Soft, easily digestible foods like oatmeal, khichdi, or steamed vegetables'
        ],
        foodsToAvoidOrLimit: [
          'Ice-cold drinks, ice creams, or refrigerated fruit juices',
          'Deep-fried, greasy, or excessively oily foods that trigger acid reflux and throat irritation',
          'Alcohol and tobacco/smoking (which paralyzes bronchial cilia and delays recovery)'
        ],
        hydrationAdvice: 'Drink 2.5 to 3.0 Liters of warm fluids daily to keep mucosal secretions thin and easier to cough out.'
      },
      lifestyleAdvice: [
        'Steam inhalation twice daily can provide significant airway relief.',
        'Drink at least 2 to 2.5 liters of warm fluids daily.',
        'Rest adequately and avoid cold, refrigerated beverages or deep-fried foods while throat is inflamed.'
      ],
      unclearOrAmbiguousNotes: [],
      multiEngineEnsemble: {
        overallConfidence: 98.6,
        ensembleAgreementPercent: 97.4,
        engines: [
          {
            engineId: 'stroke_ligature',
            engineName: 'Neural Stroke & Cursive Ligature Analysis',
            frameworkTag: 'Cursive Ligature Attention',
            engineRole: 'Deciphers cursive handwriting strokes, pen tilt, and letter ligatures',
            extractedSnippet: 'Augmentin 625 BD PC, Pantocid 40 OD AC, Levocet-M HS, Ascoril LS 10ml TDS, Dolo 650 SOS',
            confidence: 98.4,
            specialtyFocus: 'Cursive stroke recognition & continuous doctor handwriting',
            status: 'completed'
          },
          {
            engineId: 'document_layout',
            engineName: 'Prescription Layout & Section Analyzer',
            frameworkTag: 'Document Geometry Hierarchy',
            engineRole: 'Parses document hierarchy, doctor letterhead, and prescription tabular layout',
            extractedSnippet: 'Clinic: Pulmonology OPD | Rx: 5 items | Adv: CBC with Diff, Chest X-Ray PA View',
            confidence: 97.8,
            specialtyFocus: 'Prescription document layout & diagnostic investigation sections',
            status: 'completed'
          },
          {
            engineId: 'latin_shorthand',
            engineName: 'Medical Shorthand & Timing Decoder',
            frameworkTag: 'Deep Sequence Lexicon Decoding',
            engineRole: 'Performs sequence-level beam search against 3,500+ pharmaceutical dictionary terms',
            extractedSnippet: 'Augm-625 1-0-1 PC, Panto-40 1-0-0 AC, Levo-M 0-0-1, Ascoril-LS, Dolo-650',
            confidence: 98.1,
            specialtyFocus: 'Doctor shorthand, 1-0-1 timing codes, and Latin prescription notations',
            status: 'completed'
          },
          {
            engineId: 'dosage_metrics',
            engineName: 'Dosage Metrics & Unit Precision Parser',
            frameworkTag: 'High-Precision Metric Boundaries',
            engineRole: 'Accurate text boundary segmentation, units, numerals, and duration detection',
            extractedSnippet: '625mg, 40mg, 10ml, 650mg, 5 days, 7 days, Inv: CBC, Chest X-Ray PA',
            confidence: 98.9,
            specialtyFocus: 'Dosage strengths (mg, ml), numeric frequencies, and duration figures',
            status: 'completed'
          },
          {
            engineId: 'pharmacopeia_consensus',
            engineName: 'Clinical Pharmacopeia Cross-Validation',
            frameworkTag: 'Multimodal Clinical Safety Engine',
            engineRole: 'Arbitrates cross-stage hypotheses using pharmacology knowledge and drug safety rules',
            extractedSnippet: 'Amoxicillin+Clavulanate 625mg, Pantoprazole 40mg, Levocetirizine+Montelukast, Expectorant',
            confidence: 99.2,
            specialtyFocus: 'Pharmacological cross-validation, drug interactions, and medical sense checking',
            status: 'consensus_aligned'
          }
        ],
        consensusTokens: [
          'Augmentin 625mg',
          '1-0-1 (BD) PC',
          'Pantocid 40mg',
          '1-0-0 (OD) AC',
          'Levocet M',
          'Ascoril LS 10ml TDS',
          'Dolo 650 SOS',
          'CBC with Differential',
          'Chest X-Ray PA View'
        ],
        resolvedAmbiguities: [
          "Cursive stroke analysis distinguished 'Augmentin 625' from potential misread 'Ampicillin' based on matching 625mg formulation.",
          "Document layout verified 'Adv: CBC & Chest X-Ray' was an investigation block, not prescription medicine.",
          "Dosage boundary verification confirmed '1-0-1' dosage frequency aligned with twice-daily antibiotic administration."
        ],
        arbitrationExplanation: 'Multi-stage clinical verification cross-referenced cursive pen strokes with pharmaceutical databases, achieving a 98.6% combined consensus score across all 5 medications and 2 laboratory tests.'
      },
      medicalDisclaimer: 'This analysis provides general educational guidance based on standard pharmacopeia data. Always verify specific dosing, allergies, and contraindications with your attending physician or licensed pharmacist.'
    }
  },
  {
    id: 'sample-chronic-hypertension',
    title: 'Hypertension & Lipid Management',
    subtitle: 'Blood Pressure Control + Cholesterol + Aspirin + Lipid & Kidney Tests',
    condition: 'Essential Hypertension & Cardiovascular Risk Management',
    previewText: `Rx (Cardiology OPD):
1. Tab. Telma 40 (Telmisartan 40mg) - 1 tab OD morning (8 AM)
2. Tab. Amlodipine 5mg - 1 tab OD morning (8 AM)
3. Tab. Atorva 10 (Atorvastatin 10mg) - 1 tab OD HS (Bedtime)
4. Tab. Ecosprin 75mg (Enteric coated aspirin) - 1 tab OD PC (After lunch)

Adv / Diagnostic Workup:
• Fasting Lipid Profile (Total Chol, LDL, HDL, Triglycerides)
• Kidney Function Test (Serum Creatinine, Blood Urea, Electrolytes)
• 12-Lead Resting ECG`,
    sampleResult: {
      doctorSpecialtyOrClinic: 'Department of Cardiology & Internal Medicine',
      prescriptionDate: 'Recent',
      suspectedCondition: 'Essential Stage 1 Hypertension and Hyperlipidemia (Cardiovascular Protection)',
      generalExplanation: 'This is a standard chronic maintenance regimen designed to keep arterial blood pressure within normal targets (<130/80 mmHg), reduce circulating bad cholesterol (LDL), and prevent platelet clumping to guard against heart attack or stroke. Periodic kidney function and lipid testing are scheduled to ensure safety and drug efficacy.',
      medicines: [
        {
          name: 'Telma 40',
          genericName: 'Telmisartan',
          form: 'Tablet',
          strength: '40 mg',
          dosage: '1 tablet',
          frequency: 'Once daily (morning around 8 AM)',
          timingCode: 'OD / 1-0-0',
          mealRelation: 'anytime',
          mealRelationText: 'Can be taken with or without breakfast; take consistently at the same time each morning',
          duration: 'Continuous daily maintenance',
          scheduleTimes: { morning: true, afternoon: false, evening: false, bedtime: false, asNeeded: false },
          purposeAndUsage: 'Angiotensin II Receptor Blocker (ARB). Relaxes and dilates blood vessels, allowing blood to flow smoothly and reducing workload on the heart.',
          howToTake: 'Take every morning with water. Do not skip doses even if you feel completely healthy.',
          precautions: [
            'Do not discontinue abruptly without doctor consultation.',
            'Avoid potassium-rich salt substitutes unless advised by doctor.',
            'Regularly monitor blood pressure.'
          ],
          commonSideEffects: ['Occasional lightheadedness when standing up quickly', 'Back pain', 'Sinus congestion'],
          whenToContactDoctor: 'Severe dizziness, fainting, or swelling of lips or face.'
        },
        {
          name: 'Amlodipine 5mg',
          genericName: 'Amlodipine Besylate',
          form: 'Tablet',
          strength: '5 mg',
          dosage: '1 tablet',
          frequency: 'Once daily (morning)',
          timingCode: 'OD / 1-0-0',
          mealRelation: 'anytime',
          mealRelationText: 'Can be taken with or without food with your morning medication',
          duration: 'Continuous daily maintenance',
          scheduleTimes: { morning: true, afternoon: false, evening: false, bedtime: false, asNeeded: false },
          purposeAndUsage: 'Calcium Channel Blocker (CCB). Relaxes arterial smooth muscle cells to lower peripheral resistance and assist Telmisartan in blood pressure normalization.',
          howToTake: 'Take together with Telmisartan each morning.',
          precautions: ['Watch for ankle or foot swelling (edema); notify doctor if noticeable.'],
          commonSideEffects: ['Mild swelling in ankles/feet', 'Flushing sensation', 'Fatigue'],
          whenToContactDoctor: 'Marked leg swelling, chest pain, or rapid irregular heart rate.'
        },
        {
          name: 'Atorva 10',
          genericName: 'Atorvastatin Calcium',
          form: 'Tablet',
          strength: '10 mg',
          dosage: '1 tablet',
          frequency: 'Once daily (at night before bedtime)',
          timingCode: 'OD / HS',
          mealRelation: 'anytime',
          mealRelationText: 'Best taken after dinner or at bedtime because liver cholesterol synthesis peaks at night',
          duration: 'Continuous daily maintenance',
          scheduleTimes: { morning: false, afternoon: false, evening: false, bedtime: true, asNeeded: false },
          purposeAndUsage: 'HMG-CoA Reductase Inhibitor (Statin). Lowers "bad" LDL cholesterol and triglycerides in your bloodstream, stabilizing plaque inside arteries.',
          howToTake: 'Take every night before going to bed with a glass of water.',
          precautions: ['Avoid excessive intake of grapefruit or grapefruit juice.', 'Notify doctor if experiencing unexplained muscle ache.'],
          commonSideEffects: ['Mild digestive discomfort', 'Joint ache'],
          whenToContactDoctor: 'Unexplained severe muscle soreness, tenderness, or dark brown urine.'
        },
        {
          name: 'Ecosprin 75',
          genericName: 'Aspirin (Enteric-coated)',
          form: 'Tablet',
          strength: '75 mg',
          dosage: '1 tablet',
          frequency: 'Once daily (after lunch or main meal)',
          timingCode: 'OD / 0-1-0 PC',
          mealRelation: 'after_meal',
          mealRelationText: 'Must be taken after food with a glass of water to protect gastric mucosa',
          duration: 'Continuous daily maintenance',
          scheduleTimes: { morning: false, afternoon: true, evening: false, bedtime: false, asNeeded: false },
          purposeAndUsage: 'Low-dose antiplatelet agent. Inhibits blood clot formation inside coronary and cerebral arteries, preventing vascular events.',
          howToTake: 'Swallow whole with plenty of water immediately following a substantial meal. Do not crush or chew.',
          precautions: ['Enteric coating protects stomach lining; swallowing whole is vital.', 'Inform your dentist or surgeon that you take low-dose aspirin prior to procedures.'],
          commonSideEffects: ['Mild acid reflux', 'Easier minor bruising'],
          whenToContactDoctor: 'Black tarry stools, unusual bleeding, or persistent burning stomach ache.'
        }
      ],
      labTests: [
        {
          testName: 'Fasting Lipid Profile',
          category: 'Blood Investigation',
          whyDoctorOrdered: 'To monitor baseline and response to Atorvastatin therapy, ensuring target LDL (<70-100 mg/dL) and evaluating triglyceride levels.',
          preparationInstructions: 'Requires strict 10 to 12 hours overnight fasting. Water is allowed and encouraged. Avoid alcohol 24 hours prior.',
          sampleRequired: 'Venous Blood Sample',
          fastingRequired: true,
          urgency: 'routine',
          commonNormalRangeContext: 'Total Cholesterol < 200 mg/dL, LDL < 100 mg/dL, HDL > 40 mg/dL (men) / > 50 mg/dL (women), Triglycerides < 150 mg/dL.'
        },
        {
          testName: 'Kidney Function Test (KFT) & Serum Electrolytes',
          category: 'Blood Investigation',
          whyDoctorOrdered: 'Telmisartan (ARB) acts on the renin-angiotensin system and can alter renal hemodynamics and potassium retention. KFT monitors eGFR, creatinine, and serum potassium.',
          preparationInstructions: 'No strict fasting required, but maintain normal hydration. Avoid heavy red meat consumption the night before.',
          sampleRequired: 'Venous Blood Sample',
          fastingRequired: false,
          urgency: 'routine',
          commonNormalRangeContext: 'Serum Creatinine 0.7–1.3 mg/dL, Serum Potassium 3.5–5.0 mEq/L.'
        },
        {
          testName: '12-Lead Resting Electrocardiogram (ECG)',
          category: 'Cardiology / ECG',
          whyDoctorOrdered: 'To check for hypertensive heart disease, left ventricular hypertrophy (LVH), ST-T segment changes, or conduction abnormalities.',
          preparationInstructions: 'No special preparation. Wear comfortable clothing with easy access to wrists, ankles, and chest.',
          sampleRequired: 'Non-invasive Electrical Tracing',
          fastingRequired: false,
          urgency: 'routine',
          commonNormalRangeContext: 'Normal sinus rhythm with normal voltage and axis.'
        }
      ],
      chronologicalTakingPlan: [
        {
          timeLabel: '8:00 AM – Morning (Breakfast Time)',
          slotName: 'morning_after_breakfast',
          title: 'Morning: Blood Pressure Protection',
          description: 'Take together every morning at the same hour with water',
          items: [
            {
              medicineName: 'Telma 40',
              genericName: 'Telmisartan 40mg',
              dosage: '1 tablet',
              instructions: 'Relaxes vascular walls. Keeps 24-hour daytime arterial pressure controlled.',
              isCriticalTiming: true
            },
            {
              medicineName: 'Amlodipine 5mg',
              genericName: 'Amlodipine Besylate',
              dosage: '1 tablet',
              instructions: 'Calcium channel blocker; works synergistically with Telma.'
            }
          ]
        },
        {
          timeLabel: '1:30 PM – Afternoon (Post-Lunch)',
          slotName: 'afternoon_after_lunch',
          title: 'Afternoon: Cardioprotection',
          description: 'Take immediately after completing your midday meal with a full glass of water',
          items: [
            {
              medicineName: 'Ecosprin 75',
              genericName: 'Aspirin (Enteric-coated)',
              dosage: '1 tablet',
              instructions: 'Prevents blood clotting. Food in stomach prevents gastric irritation.',
              isCriticalTiming: true
            }
          ]
        },
        {
          timeLabel: '10:00 PM – Bedtime (Before Sleep)',
          slotName: 'bedtime',
          title: 'Night: Cholesterol Stabilization',
          description: 'Take 20-30 minutes before sleep with plain water',
          items: [
            {
              medicineName: 'Atorva 10',
              genericName: 'Atorvastatin 10mg',
              dosage: '1 tablet',
              instructions: 'Statin drug. Liver synthesizes cholesterol primarily at night; bedtime dosing maximizes plaque stabilization.',
              isCriticalTiming: true
            }
          ]
        }
      ],
      scheduleSummary: {
        morning: ['Telma 40 (1 tab at 8 AM)', 'Amlodipine 5mg (1 tab at 8 AM)'],
        afternoon: ['Ecosprin 75mg (1 tab immediately after lunch)'],
        evening: [],
        bedtime: ['Atorva 10 (1 tab at bedtime)'],
        asNeeded: []
      },
      potentialInteractionsOrSpacingAdvice: [
        'Take your blood pressure medicines (Telma & Amlodipine) consistently at the same hour each morning.',
        'Always take Ecosprin with food (e.g., after lunch) to avoid stomach irritation.',
        'Atorvastatin is most effective when taken in the evening before sleep.',
        'Avoid grapefruit and grapefruit juice as it increases atorvastatin blood concentration.'
      ],
      foodAndDietaryRules: {
        foodsToEat: [
          'DASH diet foods: Leafy greens, berries, whole grains, and lean proteins',
          'Garlic, oats, flaxseed, and walnuts (natural cardioprotective fiber)',
          'Potassium-balanced fruits like apples, oranges, and watermelon (avoid artificial potassium supplements)'
        ],
        foodsToAvoidOrLimit: [
          'Strictly restrict sodium: Limit added salt to under 2 grams (approx. 1/2 to 1 level teaspoon) per day',
          'Processed meats, pickles, papads, and canned soups with high sodium content',
          'Grapefruit and grapefruit juice (inhibits CYP3A4 metabolism of statins)',
          'Excessive alcohol consumption'
        ],
        hydrationAdvice: 'Maintain healthy hydration with 2 to 2.5 liters of plain water throughout the day.'
      },
      lifestyleAdvice: [
        'Maintain a low-sodium diet (under 2 grams of sodium / 1 teaspoon salt per day).',
        'Incorporate 30 minutes of brisk walking or moderate physical activity 5 days a week.',
        'Keep a daily blood pressure log in the morning and evening for review during your next doctor appointment.'
      ],
      unclearOrAmbiguousNotes: [],
      multiEngineEnsemble: {
        overallConfidence: 99.1,
        ensembleAgreementPercent: 98.6,
        engines: [
          {
            engineId: 'stroke_ligature',
            engineName: 'Neural Stroke & Cursive Ligature Analysis',
            frameworkTag: 'Cursive Ligature Attention',
            engineRole: 'Deciphers cursive handwriting strokes, pen tilt, and letter ligatures',
            extractedSnippet: 'Telma 40 OD M, Amlodipine 5mg OD M, Atorva 10 HS, Ecosprin 75 PC Lunch',
            confidence: 98.8,
            specialtyFocus: 'Cursive stroke recognition & continuous doctor handwriting',
            status: 'completed'
          },
          {
            engineId: 'document_layout',
            engineName: 'Prescription Layout & Section Analyzer',
            frameworkTag: 'Document Geometry Hierarchy',
            engineRole: 'Parses document hierarchy, doctor letterhead, and prescription tabular layout',
            extractedSnippet: 'Cardiology OPD | Rx: 4 items | Adv: Fasting Lipid Profile, Serum Creatinine, ECG',
            confidence: 99.0,
            specialtyFocus: 'Prescription document layout & diagnostic investigation sections',
            status: 'completed'
          },
          {
            engineId: 'latin_shorthand',
            engineName: 'Medical Shorthand & Timing Decoder',
            frameworkTag: 'Deep Sequence Lexicon Decoding',
            engineRole: 'Performs sequence-level beam search against 3,500+ pharmaceutical dictionary terms',
            extractedSnippet: 'Telma-40 1-0-0, Amlo-5 1-0-0, Atorva-10 0-0-1, Ecosprin-75 0-1-0 PC',
            confidence: 98.7,
            specialtyFocus: 'Doctor shorthand, 1-0-1 timing codes, and Latin prescription notations',
            status: 'completed'
          },
          {
            engineId: 'dosage_metrics',
            engineName: 'Dosage Metrics & Unit Precision Parser',
            frameworkTag: 'High-Precision Metric Boundaries',
            engineRole: 'Accurate text boundary segmentation, units, numerals, and duration detection',
            extractedSnippet: '40mg, 5mg, 10mg, 75mg, 30 days, Adv: Lipid Profile, Creatinine, ECG',
            confidence: 99.4,
            specialtyFocus: 'Dosage strengths (mg, ml), numeric frequencies, and duration figures',
            status: 'completed'
          },
          {
            engineId: 'pharmacopeia_consensus',
            engineName: 'Clinical Pharmacopeia Cross-Validation',
            frameworkTag: 'Multimodal Clinical Safety Engine',
            engineRole: 'Arbitrates cross-stage hypotheses using pharmacology knowledge and drug safety rules',
            extractedSnippet: 'Telmisartan 40mg, Amlodipine 5mg, Atorvastatin 10mg, Aspirin 75mg Enteric-Coated',
            confidence: 99.6,
            specialtyFocus: 'Pharmacological cross-validation, drug interactions, and medical sense checking',
            status: 'consensus_aligned'
          }
        ],
        consensusTokens: [
          'Telma 40 (Telmisartan)',
          'Amlodipine 5mg',
          'Atorva 10 (Atorvastatin)',
          'Ecosprin 75',
          'Fasting Lipid Profile',
          'Serum Creatinine & eGFR',
          '12-Lead ECG'
        ],
        resolvedAmbiguities: [
          "Stroke and dosage verification verified 'Atorva 10' timing is 'HS' (bedtime), corresponding to optimal nocturnal hepatic cholesterol synthesis.",
          "Confirmed 'Ecosprin 75' is enteric-coated formulation prescribed after lunch to minimize morning gastric acidity overlap.",
          "Document layout verified 'Adv: Fasting Lipid Profile & Creatinine' as 10-12 hour fasting blood tests."
        ],
        arbitrationExplanation: 'Multi-stage consensus verified chronic cardiovascular maintenance regimen, reconciling anti-hypertensive timing and nighttime statin dosing.'
      },
      medicalDisclaimer: 'This review is for patient educational purposes only. Never adjust or stop blood pressure or cardiovascular medications without direct approval from your prescribing cardiologist.'
    }
  },
  {
    id: 'sample-gastro-infection',
    title: 'Gastroenteritis & Acid Peptic Regimen',
    subtitle: 'Gut Antibiotic + Antacid + Probiotics + ORS + Stool & Electrolytes',
    condition: 'Acute Bacterial Gastroenteritis & Dehydration Prevention',
    previewText: `Rx:
1. Tab. Norflox TZ (Norfloxacin 400mg + Tinidazole 600mg) - 1 tab BD PC x 5 days
2. Cap. Omez 20mg (Omeprazole) - 1 cap OD AC (Morning) x 5 days
3. Cap. Darolac (Probiotics: Lactobacillus) - 1 cap BD (Space 2 hrs from antibiotic)
4. Tab. Cyclopam (Dicyclomine + Paracetamol) - 1 tab SOS for cramps
5. Electral ORS sachet - 1 sachet in 1 liter clean water

Adv / Diagnostic Tests:
• Stool Routine & Microscopic Examination (R/M)
• Serum Electrolytes (Na+, K+, Cl-)`,
    sampleResult: {
      doctorSpecialtyOrClinic: 'Gastroenterology & Family Medicine Clinic',
      prescriptionDate: 'Recent',
      suspectedCondition: 'Acute Bacterial Gastrointestinal Infection with Abdominal Cramps',
      generalExplanation: 'This prescription treats an intestinal infection causing loose stools or diarrhea. It provides an antibacterial/antiprotozoal drug to eliminate the pathogens, a stomach protector, a probiotic to replenish healthy gut flora, an antispasmodic for painful abdominal cramps, and oral rehydration salts to restore electrolytes. Diagnostic stool and electrolyte tests check pathogen type and hydration status.',
      medicines: [
        {
          name: 'Norflox TZ',
          genericName: 'Norfloxacin (400mg) + Tinidazole (600mg)',
          form: 'Tablet',
          strength: '400mg / 600mg',
          dosage: '1 tablet',
          frequency: 'Twice daily (Morning & Night)',
          timingCode: 'BD / 1-0-1 PC',
          mealRelation: 'after_meal',
          mealRelationText: 'Take after a light meal with plenty of water',
          duration: '5 days',
          scheduleTimes: { morning: true, afternoon: false, evening: true, bedtime: false, asNeeded: false },
          purposeAndUsage: 'Combination antimicrobial and antiprotozoal. Kills infection-causing bacteria and protozoa in the intestines that cause diarrhea, amoebiasis, and stomach bugs.',
          howToTake: 'Swallow whole with plenty of fluids. Take 1 tablet morning and 1 tablet night for all 5 days.',
          precautions: [
            'Strictly avoid alcohol during and for 3 days after taking Tinidazole as it causes severe vomiting/flushing.',
            'Finish the full 5 days even if diarrhea resolves early.'
          ],
          commonSideEffects: ['Metallic taste in mouth', 'Darkened urine (harmless)', 'Mild nausea'],
          whenToContactDoctor: 'Severe tendon pain, allergic reaction, or persistent high fever.'
        },
        {
          name: 'Omez 20mg',
          genericName: 'Omeprazole',
          form: 'Capsule',
          strength: '20 mg',
          dosage: '1 capsule',
          frequency: 'Once daily (morning)',
          timingCode: 'OD / 1-0-0 AC',
          mealRelation: 'empty_stomach',
          mealRelationText: 'Take 30 minutes before first meal of the day',
          duration: '5 days',
          scheduleTimes: { morning: true, afternoon: false, evening: false, bedtime: false, asNeeded: false },
          purposeAndUsage: 'Acid reducer (PPI). Prevents hyperacidity and protects the inflamed stomach wall while you recover.',
          howToTake: 'Swallow whole with water 30 minutes before breakfast.',
          precautions: ['Do not chew the capsule granules.'],
          commonSideEffects: ['Mild headache', 'Flatulence'],
          whenToContactDoctor: 'Severe allergic skin rash.'
        },
        {
          name: 'Darolac Probiotic',
          genericName: 'Lactobacillus, Bifidobacterium, Streptococcus Faecalis',
          form: 'Capsule',
          strength: 'Multi-strain beneficial bacteria',
          dosage: '1 capsule',
          frequency: 'Twice daily',
          timingCode: 'BD / 1-0-1',
          mealRelation: 'after_meal',
          mealRelationText: 'Take with food, at least 2 hours apart from the antibiotic',
          duration: '5 days',
          scheduleTimes: { morning: true, afternoon: false, evening: true, bedtime: false, asNeeded: false },
          purposeAndUsage: 'Restores beneficial microorganisms in the bowel that are depleted by infection and antibiotics, speeding up recovery and preventing antibiotic-associated diarrhea.',
          howToTake: 'Take 2 hours after taking Norflox TZ so the antibiotic does not kill the beneficial probiotic bacteria.',
          precautions: ['Keep in a cool, dry place away from heat.'],
          commonSideEffects: ['Generally very well tolerated; occasional mild gas for 1-2 days.'],
          whenToContactDoctor: 'Persistent abdominal distension.'
        },
        {
          name: 'Cyclopam',
          genericName: 'Dicyclomine Hydrochloride (20mg) + Paracetamol (500mg)',
          form: 'Tablet',
          strength: '20mg / 500mg',
          dosage: '1 tablet',
          frequency: 'As needed (SOS) for severe stomach cramping',
          timingCode: 'SOS / PRN',
          mealRelation: 'after_meal',
          mealRelationText: 'Take only when experiencing painful stomach cramps or spasm',
          duration: 'As needed (max 3 times/day)',
          scheduleTimes: { morning: false, afternoon: false, evening: false, bedtime: false, asNeeded: true },
          purposeAndUsage: 'Antispasmodic and pain reliever. Relaxes hyperactive smooth muscles in the gut to ease griping abdominal cramps and fever.',
          howToTake: 'Take 1 tablet with water when pain occurs. Do not take repeatedly unless cramps recur (minimum 6 hours gap).',
          precautions: ['May cause mild dry mouth or blurred vision.'],
          commonSideEffects: ['Dry mouth', 'Mild dizziness', 'Drowsiness'],
          whenToContactDoctor: 'Inability to urinate or severe eye pain.'
        },
        {
          name: 'Electral ORS',
          genericName: 'Oral Rehydration Salts (WHO Formula)',
          form: 'Oral Powder Sachet',
          strength: 'WHO standard osmolarity formula',
          dosage: '1 sachet dissolved in 1 Liter clean drinking water',
          frequency: 'Sip frequently throughout the day',
          timingCode: 'Ad libitum',
          mealRelation: 'anytime',
          mealRelationText: 'Drink whenever thirsty and after each loose bowel movement',
          duration: 'Until diarrhea ceases and hydration is restored',
          scheduleTimes: { morning: true, afternoon: true, evening: true, bedtime: true, asNeeded: true },
          purposeAndUsage: 'Replenishes water, sodium, potassium, and chloride lost through diarrhea to prevent dangerous dehydration and electrolyte imbalance.',
          howToTake: 'Dissolve entire sachet in 1 liter of boiled and cooled drinking water. Stir well. Discard any solution left over after 24 hours.',
          precautions: ['Do not mix with milk, juice, or soups — use clean water only.'],
          commonSideEffects: ['None when mixed in correct proportions.'],
          whenToContactDoctor: 'Signs of severe dehydration like sunken eyes, no urination for 6 hours, or confusion.'
        }
      ],
      labTests: [
        {
          testName: 'Stool Routine & Microscopy Examination (R/M)',
          category: 'Urine / Stool',
          whyDoctorOrdered: 'To detect microscopic presence of pus cells (leukocytes indicating invasive colitis), occult blood, and specific protozoal cysts or ova (e.g. Entamoeba histolytica or Giardia lamblia).',
          preparationInstructions: 'Collect fresh stool sample in the sterile container provided by the diagnostic lab. Avoid contamination with urine or toilet water.',
          sampleRequired: 'Fresh Stool Specimen in sterile container',
          fastingRequired: false,
          urgency: 'urgent',
          commonNormalRangeContext: 'Normal stool shows no RBCs, no pus cells, and no pathogenic parasites or cysts.'
        },
        {
          testName: 'Serum Electrolytes (Sodium, Potassium, Chloride)',
          category: 'Blood Investigation',
          whyDoctorOrdered: 'Profuse watery diarrhea causes rapid depletion of potassium and sodium. This test prevents cardiac arrhythmias and severe weakness caused by hypokalemia.',
          preparationInstructions: 'No fasting required. Continue drinking ORS fluids as instructed.',
          sampleRequired: 'Venous Blood Sample',
          fastingRequired: false,
          urgency: 'urgent',
          commonNormalRangeContext: 'Sodium 135–145 mEq/L, Potassium 3.5–5.0 mEq/L, Chloride 96–106 mEq/L.'
        }
      ],
      chronologicalTakingPlan: [
        {
          timeLabel: '7:00 AM – Waking / Empty Stomach',
          slotName: 'morning_empty_stomach',
          title: 'Morning: Gastric Acid Reduction',
          description: 'Take 30 minutes before first meal with water',
          items: [
            {
              medicineName: 'Omez 20mg',
              genericName: 'Omeprazole',
              dosage: '1 capsule',
              instructions: 'Shields inflamed gastric mucosa before eating.',
              isCriticalTiming: true
            }
          ]
        },
        {
          timeLabel: '8:30 AM – Morning (Post-Breakfast)',
          slotName: 'morning_after_breakfast',
          title: 'Morning: Gut Antimicrobial',
          description: 'Take after a light breakfast (toast, plain khichdi, or banana)',
          items: [
            {
              medicineName: 'Norflox TZ',
              genericName: 'Norfloxacin + Tinidazole',
              dosage: '1 tablet',
              instructions: 'Take after light food with plenty of water. Eliminates intestinal bacterial & protozoal infection.',
              isCriticalTiming: true
            }
          ]
        },
        {
          timeLabel: '10:30 AM – Mid-Morning (2 Hours Spacing)',
          slotName: 'evening_tea',
          title: 'Mid-Morning: Gut Flora Restoration',
          description: 'CRITICAL SPACING: Take exactly 2 hours after the antibiotic so live probiotic bacteria are not destroyed',
          items: [
            {
              medicineName: 'Darolac Probiotic',
              genericName: 'Multi-strain Probiotics',
              dosage: '1 capsule',
              instructions: 'Restores beneficial microflora in the gut. Must be spaced 2 hours from Norflox TZ.',
              isCriticalTiming: true
            }
          ]
        },
        {
          timeLabel: 'Throughout Day – Hydration Protocol',
          slotName: 'morning_empty_stomach',
          title: 'All Day: Oral Rehydration Salts (ORS)',
          description: 'Sip 1 Liter throughout the day, especially after each loose stool',
          items: [
            {
              medicineName: 'Electral ORS',
              genericName: 'Oral Rehydration Salts',
              dosage: 'Sip continuously',
              instructions: 'Dissolve 1 full sachet in 1 liter clean water. Replaces lost water, sodium, and potassium.'
            }
          ]
        },
        {
          timeLabel: '8:00 PM – Evening (Post-Dinner)',
          slotName: 'night_after_dinner',
          title: 'Night: Second Antimicrobial Dose',
          description: 'Take after light dinner with water',
          items: [
            {
              medicineName: 'Norflox TZ',
              genericName: 'Norfloxacin + Tinidazole',
              dosage: '1 tablet',
              instructions: 'Second antimicrobial dose (approx. 12 hours from morning dose).',
              isCriticalTiming: true
            }
          ]
        },
        {
          timeLabel: '10:00 PM – Bedtime (2 Hours Spacing)',
          slotName: 'bedtime',
          title: 'Bedtime: Night Probiotic',
          description: 'Take 2 hours after evening antibiotic before sleep',
          items: [
            {
              medicineName: 'Darolac Probiotic',
              genericName: 'Multi-strain Probiotics',
              dosage: '1 capsule',
              instructions: 'Second probiotic capsule to replenish healthy bowel flora overnight.',
              isCriticalTiming: true
            }
          ]
        },
        {
          timeLabel: 'As Needed (SOS / PRN)',
          slotName: 'as_needed',
          title: 'As Needed: Cramp Relief',
          description: 'Only take if painful abdominal spasm occurs',
          items: [
            {
              medicineName: 'Cyclopam',
              genericName: 'Dicyclomine + Paracetamol',
              dosage: '1 tablet',
              instructions: 'Relaxes intestine smooth muscles. Minimum 6 hours gap between doses.'
            }
          ]
        }
      ],
      scheduleSummary: {
        morning: ['Omez 20mg (30 mins before breakfast - Empty stomach)', 'Norflox TZ (After breakfast)', 'Darolac Probiotic (2 hours after breakfast)', 'Sip ORS solution throughout morning'],
        afternoon: ['Continue sipping ORS solution'],
        evening: ['Norflox TZ (After dinner)', 'Darolac Probiotic (2 hours after dinner)'],
        bedtime: ['Sip ORS if thirsty'],
        asNeeded: ['Cyclopam 1 tablet (Only if experiencing severe stomach cramping)']
      },
      potentialInteractionsOrSpacingAdvice: [
        'Crucial spacing: Take Darolac Probiotic 2 hours AFTER Norflox TZ to protect the live bacteria.',
        'Strictly do not consume alcohol while taking Norflox TZ/Tinidazole due to severe disulfiram-like reactions.',
        'Dissolve ORS in exact recommended water quantity (1 Liter per sachet).'
      ],
      foodAndDietaryRules: {
        foodsToEat: [
          'BRAT diet: Bananas, Boiled White Rice, Applesauce, and plain White Toast',
          'Diluted rice water (kanji), light moong dal khichdi, and tender coconut water',
          'Clean boiled and cooled water with ORS',
          'Fresh curd / yogurt after the first 24 hours to supply natural lactobacillus'
        ],
        foodsToAvoidOrLimit: [
          'Milk, heavy dairy cream, cheese, and butter (temporary secondary lactose intolerance during gut infections)',
          'Spicy, oily, deep-fried street foods and raw salads/uncooked vegetables',
          'Coffee, tea, alcohol, and sugary sodas which worsen diarrhea and dehydration',
          'Artificial sweeteners which draw water into the bowel'
        ],
        hydrationAdvice: 'Drink 100-200ml of ORS solution after every episode of loose stool to replace fluid volume immediately.'
      },
      lifestyleAdvice: [
        'Eat a bland BRAT diet: Bananas, Rice, Applesauce, and Toast or light khichdi.',
        'Avoid oily, spicy, dairy, or caffeinated foods until bowel movements normalize.',
        'Wash hands thoroughly with soap before meals and after using the restroom.'
      ],
      unclearOrAmbiguousNotes: [],
      multiEngineEnsemble: {
        overallConfidence: 98.9,
        ensembleAgreementPercent: 98.2,
        engines: [
          {
            engineId: 'stroke_ligature',
            engineName: 'Neural Stroke & Cursive Ligature Analysis',
            frameworkTag: 'Cursive Ligature Attention',
            engineRole: 'Deciphers cursive handwriting strokes, pen tilt, and letter ligatures',
            extractedSnippet: 'Norflox TZ BD PC, Omez 20 OD AC, Darolac BD (space 2h), Cyclopam SOS, Electral',
            confidence: 98.6,
            specialtyFocus: 'Cursive stroke recognition & continuous doctor handwriting',
            status: 'completed'
          },
          {
            engineId: 'document_layout',
            engineName: 'Prescription Layout & Section Analyzer',
            frameworkTag: 'Document Geometry Hierarchy',
            engineRole: 'Parses document hierarchy, doctor letterhead, and prescription tabular layout',
            extractedSnippet: 'Gastroenterology OPD | Rx: 5 items | Adv: Stool R/M, Serum Electrolytes',
            confidence: 98.8,
            specialtyFocus: 'Prescription document layout & diagnostic investigation sections',
            status: 'completed'
          },
          {
            engineId: 'latin_shorthand',
            engineName: 'Medical Shorthand & Timing Decoder',
            frameworkTag: 'Deep Sequence Lexicon Decoding',
            engineRole: 'Performs sequence-level beam search against 3,500+ pharmaceutical dictionary terms',
            extractedSnippet: 'Norflox-TZ 1-0-1, Omez-20 1-0-0, Darolac 1-0-1, Cyclopam SOS, Electral sachet',
            confidence: 98.5,
            specialtyFocus: 'Doctor shorthand, 1-0-1 timing codes, and Latin prescription notations',
            status: 'completed'
          },
          {
            engineId: 'dosage_metrics',
            engineName: 'Dosage Metrics & Unit Precision Parser',
            frameworkTag: 'High-Precision Metric Boundaries',
            engineRole: 'Accurate text boundary segmentation, units, numerals, and duration detection',
            extractedSnippet: '400mg/600mg, 20mg, 1 sachet / 1L water, 5 days, Inv: Stool R/M, Electrolytes',
            confidence: 99.2,
            specialtyFocus: 'Dosage strengths (mg, ml), numeric frequencies, and duration figures',
            status: 'completed'
          },
          {
            engineId: 'pharmacopeia_consensus',
            engineName: 'Clinical Pharmacopeia Cross-Validation',
            frameworkTag: 'Multimodal Clinical Safety Engine',
            engineRole: 'Arbitrates cross-stage hypotheses using pharmacology knowledge and drug safety rules',
            extractedSnippet: 'Norfloxacin+Tinidazole, Omeprazole, Probiotic spore complex, Dicyclomine, Oral Rehydration',
            confidence: 99.5,
            specialtyFocus: 'Pharmacological cross-validation, drug interactions, and medical sense checking',
            status: 'consensus_aligned'
          }
        ],
        consensusTokens: [
          'Norflox TZ (Norfloxacin + Tinidazole)',
          'Omez 20 (Omeprazole)',
          'Darolac Probiotic (space 2h)',
          'Cyclopam (SOS)',
          'Electral ORS (1L water)',
          'Stool Routine & Microscopy',
          'Serum Electrolytes (Na/K/Cl)'
        ],
        resolvedAmbiguities: [
          "Reconciled critical 2-hour spacing requirement between Darolac probiotic and Norflox TZ antibiotic to prevent bactericidal killing of beneficial probiotic flora.",
          "Confirmed 'Electral' preparation requires exactly 1 Liter of clean boiled/filtered water per sachet for iso-osmolar electrolyte absorption.",
          "Validated Stool R/M and Serum Electrolytes as the ordered laboratory panel to evaluate dehydration."
        ],
        arbitrationExplanation: 'Multi-stage consensus verified acute gastrointestinal anti-infective therapy, enforcing strict 2-hour separation for probiotic efficacy and correct ORS dilution.'
      },
      medicalDisclaimer: 'Medical guidance only. Seek urgent emergency care if there is blood in stool, severe uncontrollable vomiting preventing hydration, or very high fever.'
    }
  }
];
