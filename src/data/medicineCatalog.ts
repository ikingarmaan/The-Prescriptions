/**
 * Comprehensive Pharmacopeia Catalog with Generic Salt & Company Brand Cross-Referencing
 * 
 * Supports:
 * - Active Generic Salt Molecules (INN / Pharmacopeia)
 * - Leading Pharmaceutical Company Brands (GSK, Sun Pharma, Cipla, Abbott, Pfizer,
 *   Torrent, Dr. Reddy's, Alkem, Mankind, Micro Labs, Lupin, Sanofi, AstraZeneca, etc.)
 * - Two-Way Cross Resolution:
 *     • If Generic written -> Shows popular Company Brand equivalents with manufacturer
 *     • If Company Brand written -> Shows Manufacturing Company + Active Generic Salt + Equivalent Brands
 */

export interface CompanyBrandDetail {
  brandName: string;
  companyName: string;
  standardStrength?: string;
  countryOrOrigin?: string;
}

export interface CatalogMedicine {
  genericSalt: string;
  category: string;
  therapeuticClass: string;
  standardStrengths: string[];
  forms: string[];
  shortForms: string[];
  misspellings: string[];
  companyBrands: CompanyBrandDetail[];
  description: string;
}

export const COMPREHENSIVE_MEDICINE_CATALOG: CatalogMedicine[] = [
  // ==========================================
  // 1. ANTIBIOTICS & ANTIMICROBIALS
  // ==========================================
  {
    genericSalt: 'Amoxicillin + Clavulanic Acid (Potassium Clavulanate)',
    category: 'Antibiotic (Penicillin + Beta-Lactamase Inhibitor)',
    therapeuticClass: 'Bacterial Infections (Ear, Throat, Chest, Sinus, Skin)',
    standardStrengths: ['625mg', '375mg', '1000mg / 1g', '228.5mg/5ml', '457mg/5ml'],
    forms: ['Tablet', 'Syrup', 'Dry Suspension', 'Injection'],
    shortForms: ['Augm', 'Aug', 'Amox-Clav', 'Clav', 'Augment', 'Amoxyclav'],
    misspellings: ['Augmentn', 'Augmantin', 'Augmintin', 'Agumentin', 'Augmetin', 'Augmentine'],
    companyBrands: [
      { brandName: 'Augmentin 625 Duo', companyName: 'GlaxoSmithKline (GSK)' },
      { brandName: 'Clavam 625', companyName: 'Alkem Laboratories' },
      { brandName: 'Moxikind-CV 625', companyName: 'Mankind Pharma' },
      { brandName: 'Mega-CV 625', companyName: 'Aristo Pharmaceuticals' },
      { brandName: 'Advent 625', companyName: 'Cipla' },
      { brandName: 'Curam', companyName: 'Sandoz / Novartis' },
      { brandName: 'Amoxyclav', companyName: 'Abbott' },
    ],
    description: 'Combines broad-spectrum penicillin with a beta-lactamase inhibitor to overcome antibiotic resistance.',
  },
  {
    genericSalt: 'Amoxicillin Trihydrate',
    category: 'Antibiotic (Broad-Spectrum Penicillin)',
    therapeuticClass: 'Bacterial Infections (Dental, Respiratory, ENT)',
    standardStrengths: ['250mg', '500mg', '125mg/5ml', '250mg/5ml'],
    forms: ['Capsule', 'Tablet', 'Syrup', 'Suspension'],
    shortForms: ['Amox', 'Amoxi', 'Amoxil', 'Amoxyn'],
    misspellings: ['Amoxcillin', 'Amoxacillin', 'Amoxicilin', 'Amoxillin', 'Amoxycillin'],
    companyBrands: [
      { brandName: 'Amoxil', companyName: 'GlaxoSmithKline (GSK)' },
      { brandName: 'Novamox 500', companyName: 'Cipla' },
      { brandName: 'Mox 500', companyName: 'Sun Pharma' },
      { brandName: 'Almox 500', companyName: 'Alkem Laboratories' },
      { brandName: 'Wymox', companyName: 'Pfizer' },
    ],
    description: 'Standard first-line antibiotic for mild to moderate bacterial ear, nose, throat, and dental infections.',
  },
  {
    genericSalt: 'Azithromycin Dihydrate',
    category: 'Antibiotic (Macrolide)',
    therapeuticClass: 'Respiratory, Throat, Typhoid & STD Infections',
    standardStrengths: ['250mg', '500mg', '100mg/5ml', '200mg/5ml'],
    forms: ['Tablet', 'Suspension', 'Eye Drops', 'Injection'],
    shortForms: ['Azith', 'Azi', 'Azithro', 'Azth'],
    misspellings: ['Azithromicin', 'Azithromycine', 'Azitromycin', 'Azithal', 'Azithrol'],
    companyBrands: [
      { brandName: 'Azithral 500', companyName: 'Alembic Pharmaceuticals' },
      { brandName: 'Azee 500', companyName: 'Cipla' },
      { brandName: 'Zithromax', companyName: 'Pfizer' },
      { brandName: 'Azax 500', companyName: 'Sun Pharma' },
      { brandName: 'Zady 500', companyName: 'Mankind Pharma' },
      { brandName: 'Azicip', companyName: 'Cipla' },
    ],
    description: 'Once-daily broad macrolide antibiotic commonly given as a 3 or 5-day course.',
  },
  {
    genericSalt: 'Ciprofloxacin Hydrochloride',
    category: 'Antibiotic (Fluoroquinolone)',
    therapeuticClass: 'Urinary Tract (UTI), Gastrointestinal & Eye Infections',
    standardStrengths: ['250mg', '500mg', '750mg', '0.3% Eye Drops'],
    forms: ['Tablet', 'Eye/Ear Drops', 'IV Infusion'],
    shortForms: ['Cipro', 'Cif', 'Cifro', 'Cpfx'],
    misspellings: ['Ciprofloxin', 'Ciprofloxacine', 'Cifran 500', 'Cipran', 'Ciproflaxin'],
    companyBrands: [
      { brandName: 'Cifran 500', companyName: 'Sun Pharma' },
      { brandName: 'Ciplox 500', companyName: 'Cipla' },
      { brandName: 'Cipro', companyName: 'Bayer Pharmaceuticals' },
      { brandName: 'Zoxan 500', companyName: 'FDC Limited' },
      { brandName: 'Ciproglen', companyName: 'Glenmark Pharmaceuticals' },
    ],
    description: 'Potent fluoroquinolone antibiotic targeting severe urinary, kidney, typhoid, and enteric infections.',
  },
  {
    genericSalt: 'Cefixime Trihydrate',
    category: 'Antibiotic (3rd Generation Cephalosporin)',
    therapeuticClass: 'Typhoid Fever, Bronchitis, UTI & Gonococcal Infections',
    standardStrengths: ['100mg', '200mg', '50mg/5ml'],
    forms: ['Tablet', 'Dispersible Tablet (DT)', 'Syrup'],
    shortForms: ['Cefix', 'Taxim', 'Cfix', 'Cefixm'],
    misspellings: ['Taxim O', 'Taximo', 'Cefixim', 'Cefaxime', 'Cefixyme'],
    companyBrands: [
      { brandName: 'Taxim-O 200', companyName: 'Alkem Laboratories' },
      { brandName: 'Zifi 200', companyName: 'FDC Limited' },
      { brandName: 'Mahacef 200', companyName: 'Mankind Pharma' },
      { brandName: 'Cefolac 200', companyName: 'Macleods Pharmaceuticals' },
      { brandName: 'Suprax', companyName: 'Lupin Pharmaceuticals' },
    ],
    description: 'Third-generation oral cephalosporin widely used for typhoid fever and resistant respiratory/urinary tract infections.',
  },
  {
    genericSalt: 'Cefpodoxime Proxetil',
    category: 'Antibiotic (3rd Generation Cephalosporin)',
    therapeuticClass: 'Severe Sinusitis, Pneumonia & Pediatric Infections',
    standardStrengths: ['100mg', '200mg', '50mg/5ml', '100mg/5ml'],
    forms: ['Tablet', 'Dispersible Tablet', 'Dry Syrup'],
    shortForms: ['Cefpod', 'Doxcef', 'Podox', 'Gudcef'],
    misspellings: ['Cefpodoxim', 'Cefpodoxime', 'Gudsef', 'Cepodem'],
    companyBrands: [
      { brandName: 'Gudcef 200', companyName: 'Mankind Pharma' },
      { brandName: 'Doxcef 200', companyName: 'Lupin Pharmaceuticals' },
      { brandName: 'Monocef-O 200', companyName: 'Aristo Pharmaceuticals' },
      { brandName: 'Cepodem 200', companyName: 'Sun Pharma' },
      { brandName: 'Vantin', companyName: 'Pfizer' },
    ],
    description: 'High-potency oral cephalosporin for difficult skin, lung, and urinary infections.',
  },
  {
    genericSalt: 'Ceftriaxone Sodium',
    category: 'Antibiotic (3rd Gen Cephalosporin Injection)',
    therapeuticClass: 'Severe Hospitalized Infections, Sepsis, Meningitis',
    standardStrengths: ['250mg', '500mg', '1000mg / 1g', '2g'],
    forms: ['IV / IM Injection'],
    shortForms: ['Ceftri', 'Monocef', 'Xone', 'Ctri'],
    misspellings: ['Ceftriaxon', 'Ceftriaxone', 'Monocef 1g', 'Rocefin'],
    companyBrands: [
      { brandName: 'Monocef 1g', companyName: 'Aristo Pharmaceuticals' },
      { brandName: 'Rocephin', companyName: 'Roche Pharmaceuticals' },
      { brandName: 'Oframax 1g', companyName: 'Sun Pharma' },
      { brandName: 'Ctri 1g', companyName: 'Cipla' },
      { brandName: 'Powercef', companyName: 'Wockhardt' },
    ],
    description: 'Hospital-grade injectable antibiotic for bloodstream infections, surgical prophylaxis, and meningitis.',
  },
  {
    genericSalt: 'Levofloxacin',
    category: 'Antibiotic (Fluoroquinolone)',
    therapeuticClass: 'Complicated Pneumonia, Sinusitis, Prostatitis & Pyelonephritis',
    standardStrengths: ['250mg', '500mg', '750mg'],
    forms: ['Tablet', 'Eye Drops', 'IV Infusion'],
    shortForms: ['Levo', 'L-Cin', 'Levomac', 'Lquin'],
    misspellings: ['Levoflox', 'Levofloxacine', 'Levofloxacin 500', 'Levomac 500'],
    companyBrands: [
      { brandName: 'Levaquin', companyName: 'Johnson & Johnson / Janssen' },
      { brandName: 'Glevo 500', companyName: 'Glenmark Pharmaceuticals' },
      { brandName: 'Levomac 500', companyName: 'Macleods Pharmaceuticals' },
      { brandName: 'Lquin 500', companyName: 'Cipla' },
      { brandName: 'Tavanic', companyName: 'Sanofi' },
    ],
    description: 'Broad respiratory fluoroquinolone offering coverage against atypical pathogens.',
  },
  {
    genericSalt: 'Ofloxacin + Ornidazole',
    category: 'Antibiotic & Antiprotozoal Combination',
    therapeuticClass: 'Gastroenteritis, Dysentery, Amoebiasis & Diarrhea',
    standardStrengths: ['200mg + 500mg'],
    forms: ['Tablet', 'Suspension', 'IV Infusion'],
    shortForms: ['O2', 'Oflo-Orn', 'Zenflox-OZ', 'Oflomac-OZ'],
    misspellings: ['O2 Tablet', 'Oflox OZ', 'Zenflox OZ', 'Ornof'],
    companyBrands: [
      { brandName: 'O2 Tablet', companyName: 'Medley Pharmaceuticals' },
      { brandName: 'Zenflox-OZ', companyName: 'Mankind Pharma' },
      { brandName: 'Oflomac-OZ', companyName: 'Macleods Pharmaceuticals' },
      { brandName: 'Ornof', companyName: 'Sun Pharma' },
      { brandName: 'Ciplox-OZ', companyName: 'Cipla' },
    ],
    description: 'Dual action targeting both anaerobic protozoal pathogens and aerobic bacteria in stomach infections.',
  },
  {
    genericSalt: 'Metronidazole',
    category: 'Antiprotozoal & Anaerobic Antibacterial',
    therapeuticClass: 'Amoebiasis, Giardiasis, Dental Abscess & Anaerobic Sepsis',
    standardStrengths: ['200mg', '400mg', '500mg', '200mg/5ml'],
    forms: ['Tablet', 'Suspension', 'Gel', 'IV Infusion'],
    shortForms: ['Metro', 'Flagyl', 'Metrogyl'],
    misspellings: ['Metronidazol', 'Metronidizole', 'Metrogil', 'Flagil'],
    companyBrands: [
      { brandName: 'Flagyl 400', companyName: 'Abbott Laboratories' },
      { brandName: 'Metrogyl 400', companyName: 'J.B. Chemicals & Pharmaceuticals' },
      { brandName: 'Aristogyl', companyName: 'Aristo Pharmaceuticals' },
      { brandName: 'Aldezole', companyName: 'Albert David' },
    ],
    description: 'Key anaerobic antibiotic and antiprotozoal medicine for amoebic dysentery, dental infections, and pelvic inflammation.',
  },
  {
    genericSalt: 'Doxycycline Hyclate / Monohydrate',
    category: 'Antibiotic (Tetracycline)',
    therapeuticClass: 'Acne, Chlamydia, Malaria Prophylaxis, Lyme Disease & Typhus',
    standardStrengths: ['100mg'],
    forms: ['Capsule', 'Tablet'],
    shortForms: ['Doxy', 'Dox', 'Doxy-1'],
    misspellings: ['Doxicycline', 'Doxycyclin', 'Doxy-100', 'Vibramicin'],
    companyBrands: [
      { brandName: 'Doxy-1 100mg', companyName: 'USV Private Limited' },
      { brandName: 'Doxypal 100', companyName: 'Micro Labs' },
      { brandName: 'Vibramycin', companyName: 'Pfizer' },
      { brandName: 'Minicycline', companyName: 'Lupin Pharmaceuticals' },
    ],
    description: 'Long-acting tetracycline antibiotic widely used for skin acne, atypical chest infections, and scrub typhus.',
  },
  {
    genericSalt: 'Cefuroxime Axetil',
    category: 'Antibiotic (2nd Generation Cephalosporin)',
    therapeuticClass: 'Pharyngitis, Tonsillitis, Acute Otitis Media & Lyme Disease',
    standardStrengths: ['250mg', '500mg', '125mg/5ml'],
    forms: ['Tablet', 'Dry Syrup', 'Injection'],
    shortForms: ['Cefur', 'Ceftum', 'Cefux'],
    misspellings: ['Cefuroxim', 'Ceftum 500', 'Cetil', 'Zinnat'],
    companyBrands: [
      { brandName: 'Ceftum 500', companyName: 'GlaxoSmithKline (GSK)' },
      { brandName: 'Cetil 500', companyName: 'Lupin Pharmaceuticals' },
      { brandName: 'Pulmocef 500', companyName: 'Micro Labs' },
      { brandName: 'Zinnat 500', companyName: 'GlaxoSmithKline (GSK)' },
      { brandName: 'Cefakind 500', companyName: 'Mankind Pharma' },
    ],
    description: 'Second-generation cephalosporin active against penicillin-resistant beta-lactamase bacterial strains.',
  },

  // ==========================================
  // 2. ANALGESICS, ANTIPYRETICS & ANTI-INFLAMMATORY
  // ==========================================
  {
    genericSalt: 'Paracetamol (Acetaminophen)',
    category: 'Analgesic & Antipyretic (Pain & Fever Reliever)',
    therapeuticClass: 'Fever, Headache, Mild-to-Moderate Musculoskeletal Pain',
    standardStrengths: ['500mg', '650mg', '1000mg', '120mg/5ml', '250mg/5ml'],
    forms: ['Tablet', 'Syrup', 'Drops', 'IV Infusion', 'Suppository'],
    shortForms: ['PCM', 'Para', 'APAP', 'Acetam', 'Dolo', 'Crocin', 'Calpol'],
    misspellings: ['Paracetmol', 'Paracetamole', 'Paracitamol', 'Paracip', 'Dolo-650', 'Doloo'],
    companyBrands: [
      { brandName: 'Dolo 650', companyName: 'Micro Labs' },
      { brandName: 'Calpol 650', companyName: 'GlaxoSmithKline (GSK)' },
      { brandName: 'Crocin 650 Advance', companyName: 'Haleon / GSK' },
      { brandName: 'Pacimol 650', companyName: 'Ipca Laboratories' },
      { brandName: 'Tylenol', companyName: 'Johnson & Johnson / Kenvue' },
      { brandName: 'Panadol', companyName: 'Haleon' },
      { brandName: 'Paracip 650', companyName: 'Cipla' },
    ],
    description: 'The global standard analgesic and antipyretic agent, gentlest on gastric lining when taken within recommended daily limits.',
  },
  {
    genericSalt: 'Ibuprofen',
    category: 'Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    therapeuticClass: 'Inflammatory Pain, Dental Pain, Arthritis, Dysmenorrhea',
    standardStrengths: ['200mg', '400mg', '600mg', '800mg', '100mg/5ml'],
    forms: ['Tablet', 'Capsule', 'Suspension', 'Gel'],
    shortForms: ['Ibu', 'Brufen', 'Ibugesic'],
    misspellings: ['Ibuprofin', 'Ibuprophen', 'Brufin', 'Ibuprufen'],
    companyBrands: [
      { brandName: 'Brufen 400', companyName: 'Abbott Laboratories' },
      { brandName: 'Combiflam [w/ Paracetamol]', companyName: 'Sanofi' },
      { brandName: 'Advil', companyName: 'Haleon / Pfizer' },
      { brandName: 'Motrin', companyName: 'Johnson & Johnson' },
      { brandName: 'Ibugesic Plus [w/ Paracetamol]', companyName: 'Cipla' },
    ],
    description: 'Classic NSAID that inhibits COX enzymes to alleviate pain, swelling, and fever.',
  },
  {
    genericSalt: 'Aceclofenac + Paracetamol',
    category: 'Combination NSAID & Analgesic',
    therapeuticClass: 'Osteoarthritis, Rheumatoid Arthritis, Ankylosing Spondylitis, Traumatic Pain',
    standardStrengths: ['100mg + 325mg', '100mg + 500mg'],
    forms: ['Tablet'],
    shortForms: ['Aceclo-P', 'Zerodol-P', 'Hifenac-P', 'Aceclo-Para'],
    misspellings: ['Zerodol P', 'Hifenac P', 'Aceclofenac P', 'Zerodal P'],
    companyBrands: [
      { brandName: 'Zerodol-P', companyName: 'Ipca Laboratories' },
      { brandName: 'Hifenac-P', companyName: 'Intas Pharmaceuticals' },
      { brandName: 'Aceclo Plus', companyName: 'Aristo Pharmaceuticals' },
      { brandName: 'Dolowin Plus', companyName: 'Micro Labs' },
      { brandName: 'Alzero-P', companyName: 'Alkem Laboratories' },
    ],
    description: 'Synergistic pain relief combining a selective COX-2 preferential NSAID with paracetamol.',
  },
  {
    genericSalt: 'Aceclofenac + Paracetamol + Serratiopeptidase',
    category: 'Triple Action NSAID, Analgesic & Proteolytic Enzyme',
    therapeuticClass: 'Post-Operative Edema, Sports Injury, Severe Inflammatory Swelling',
    standardStrengths: ['100mg + 325mg + 15mg'],
    forms: ['Tablet'],
    shortForms: ['Zerodol-SP', 'Hifenac-SP', 'Aceclo-SP', 'Signoflam'],
    misspellings: ['Zerodol SP', 'Hifenac SP', 'Zerodal SP', 'Signoflam SP'],
    companyBrands: [
      { brandName: 'Zerodol-SP', companyName: 'Ipca Laboratories' },
      { brandName: 'Hifenac-SP', companyName: 'Intas Pharmaceuticals' },
      { brandName: 'Signoflam', companyName: 'Lupin Pharmaceuticals' },
      { brandName: 'Dolowin Forte', companyName: 'Micro Labs' },
      { brandName: 'Flanzen-P', companyName: 'Mankind Pharma' },
    ],
    description: 'Added serratiopeptidase enzyme accelerates breakdown of inflammatory exudates and swelling.',
  },
  {
    genericSalt: 'Diclofenac Sodium / Potassium',
    category: 'Potent NSAID',
    therapeuticClass: 'Acute Musculoskeletal Sprains, Joint Pain, Renal Colic, Migraine',
    standardStrengths: ['50mg', '75mg', '100mg SR', '75mg/ml Injection'],
    forms: ['Tablet', 'Capsule', 'Gel / Emulgel', 'Injection', 'Suppository'],
    shortForms: ['Diclo', 'Voveran', 'Dynapar', 'Voltaren'],
    misspellings: ['Diclofenac', 'Diclofenack', 'Voveron', 'Dinapar'],
    companyBrands: [
      { brandName: 'Voveran 50 / SR 100', companyName: 'Novartis / Morepen' },
      { brandName: 'Dynapar AQ Injection', companyName: 'Troikaa Pharmaceuticals' },
      { brandName: 'Voltaren Gel', companyName: 'GlaxoSmithKline (GSK)' },
      { brandName: 'Reactin 50', companyName: 'Cipla' },
      { brandName: 'Zobid 50', companyName: 'Zydus Cadila' },
    ],
    description: 'High-potency NSAID for rapid reduction of acute joint stiffness and muscular inflammation.',
  },
  {
    genericSalt: 'Mefenamic Acid + Dicyclomine Hydrochloride',
    category: 'Antispasmodic & NSAID',
    therapeuticClass: 'Menstrual Cramps (Dysmenorrhea), Ureteral Spasms, Intestinal Colic',
    standardStrengths: ['250mg + 10mg', '500mg + 20mg'],
    forms: ['Tablet', 'Syrup', 'Injection'],
    shortForms: ['Meftal', 'Meftal-Spas', 'Cyclopam', 'Mef-Spas'],
    misspellings: ['Meftal Spas', 'Meftal-Sps', 'Mefenamic Spas', 'Cyclopan'],
    companyBrands: [
      { brandName: 'Meftal-Spas', companyName: 'Blue Cross Laboratories' },
      { brandName: 'Cyclopam', companyName: 'Indoco Remedies' },
      { brandName: 'Spasmo-Proxyvon Plus', companyName: 'Wockhardt' },
      { brandName: 'Colimex', companyName: 'Wallace Pharmaceuticals' },
    ],
    description: 'Targeted combination of smooth muscle antispasmodic (dicyclomine) and uterine prostaglandin inhibitor (mefenamic acid).',
  },
  {
    genericSalt: 'Tramadol Hydrochloride + Paracetamol',
    category: 'Opioid Analgesic & Antipyretic Combination',
    therapeuticClass: 'Moderate to Severe Post-Surgical, Orthopedic or Trauma Pain',
    standardStrengths: ['37.5mg + 325mg', '50mg', '100mg/2ml'],
    forms: ['Tablet', 'Injection'],
    shortForms: ['Tramad', 'Ultracet', 'Tram-P', 'Tra-P'],
    misspellings: ['Ultracet Tablet', 'Tramadole', 'Ultrasil', 'Tramazac'],
    companyBrands: [
      { brandName: 'Ultracet', companyName: 'Janssen / Johnson & Johnson' },
      { brandName: 'Tramazac Plus', companyName: 'Zydus Cadila' },
      { brandName: 'Supridol-P', companyName: 'Neon Laboratories' },
      { brandName: 'Calpol-T', companyName: 'GlaxoSmithKline (GSK)' },
    ],
    description: 'Centrally-acting synthetic opioid combined with paracetamol for pain unresponsive to ordinary NSAIDs.',
  },
  {
    genericSalt: 'Aspirin (Acetylsalicylic Acid)',
    category: 'Antiplatelet & NSAID',
    therapeuticClass: 'Cardiovascular Prophylaxis (Heart Attack / Stroke Prevention), Pain Relief',
    standardStrengths: ['75mg', '150mg', '325mg', '500mg'],
    forms: ['Enteric Coated Tablet', 'Soluble Tablet', 'Chewable'],
    shortForms: ['ASA', 'Asp', 'Ecosprin', 'Disprin'],
    misspellings: ['Asprin', 'Ecosprin 75', 'Ecosprin-150', 'Disprine'],
    companyBrands: [
      { brandName: 'Ecosprin 75 / 150', companyName: 'USV Private Limited' },
      { brandName: 'Disprin 325mg', companyName: 'Reckitt Benckiser' },
      { brandName: 'Bayer Aspirin', companyName: 'Bayer Pharmaceuticals' },
      { brandName: 'Loprin 75', companyName: 'Micro Labs' },
      { brandName: 'Delisprin', companyName: 'Aristo Pharmaceuticals' },
    ],
    description: 'Irreversible COX-1 inhibitor that prevents blood clots inside coronary and cerebral arteries.',
  },

  // ==========================================
  // 3. GASTROINTESTINAL & ACIDITY MEDICINES
  // ==========================================
  {
    genericSalt: 'Pantoprazole Sodium',
    category: 'Proton Pump Inhibitor (PPI)',
    therapeuticClass: 'GERD, Acid Reflux, Peptic Ulcer & Gastric Protection',
    standardStrengths: ['20mg', '40mg', '40mg IV Injection'],
    forms: ['Enteric Coated Tablet', 'Injection'],
    shortForms: ['Panto', 'Pan', 'Pan-40', 'Pantocid', 'Pantodac'],
    misspellings: ['Pantoprazol', 'Pantaprazole', 'Pan 40', 'Pantocit', 'Pantop 40'],
    companyBrands: [
      { brandName: 'Pan 40', companyName: 'Alkem Laboratories' },
      { brandName: 'Pantocid 40', companyName: 'Sun Pharma' },
      { brandName: 'Pantodac 40', companyName: 'Zydus Cadila' },
      { brandName: 'Protonix 40', companyName: 'Pfizer' },
      { brandName: 'Pantop 40', companyName: 'Aristo Pharmaceuticals' },
      { brandName: 'Pantocar 40', companyName: 'Micro Labs' },
    ],
    description: 'Selectively blocks stomach proton pump enzymes, reducing gastric hydrochloric acid output.',
  },
  {
    genericSalt: 'Pantoprazole + Domperidone (Sustained Release)',
    category: 'PPI & Prokinetic Combination',
    therapeuticClass: 'Acid Reflux, Dyspepsia, Nausea, Bloating & Heartburn',
    standardStrengths: ['40mg + 30mg SR', '40mg + 10mg'],
    forms: ['Capsule (SR)', 'Tablet'],
    shortForms: ['Pan-D', 'Pantocid-D', 'Panto-D', 'Pan DSR', 'Pantosec-D'],
    misspellings: ['Pan D', 'Pan-DSR', 'Pantocid DSR', 'Dompan', 'Pan D SR'],
    companyBrands: [
      { brandName: 'Pan-D / Pan-DSR', companyName: 'Alkem Laboratories' },
      { brandName: 'Pantocid-DSR', companyName: 'Sun Pharma' },
      { brandName: 'Pantosec-D SR', companyName: 'Cipla' },
      { brandName: 'Dompan SR', companyName: 'Medley Pharmaceuticals' },
      { brandName: 'Pantodac-DSR', companyName: 'Zydus Cadila' },
    ],
    description: 'Proton pump inhibitor stops acid while domperidone accelerates gastric emptying to stop reflux and nausea.',
  },
  {
    genericSalt: 'Omeprazole',
    category: 'Proton Pump Inhibitor (PPI)',
    therapeuticClass: 'Gastric & Duodenal Ulcers, Zollinger-Ellison, Heartburn',
    standardStrengths: ['10mg', '20mg', '40mg'],
    forms: ['Capsule', 'Tablet', 'IV Injection'],
    shortForms: ['Omez', 'Omep', 'Omee', 'Ocid'],
    misspellings: ['Omeprazol', 'Omes', 'Omez 20', 'Prilosec'],
    companyBrands: [
      { brandName: 'Omez 20', companyName: 'Dr. Reddy\'s Laboratories' },
      { brandName: 'Prilosec', companyName: 'Procter & Gamble / AstraZeneca' },
      { brandName: 'Ocid 20', companyName: 'Zydus Cadila' },
      { brandName: 'Omee 20', companyName: 'Alkem Laboratories' },
      { brandName: 'Nogacid', companyName: 'Cipla' },
    ],
    description: 'First-in-class proton pump inhibitor providing sustained 24-hour gastric acid suppression.',
  },
  {
    genericSalt: 'Rabeprazole Sodium + Levosulpiride / Domperidone',
    category: 'Next-Gen PPI & Prokinetic Combination',
    therapeuticClass: 'Severe Non-Ulcer Dyspepsia, Intractable GERD & Gastroparesis',
    standardStrengths: ['20mg + 75mg SR', '20mg + 30mg SR'],
    forms: ['Capsule (SR)'],
    shortForms: ['Razo-L', 'Razo-D', 'Rabekind-DSR', 'Happi-L', 'Rablet-D'],
    misspellings: ['Razo L', 'Razo D', 'Rabekind DSR', 'Happi D'],
    companyBrands: [
      { brandName: 'Razo-L / Razo-D', companyName: 'Dr. Reddy\'s Laboratories' },
      { brandName: 'Rablet-D / Rablet-L', companyName: 'Lupin Pharmaceuticals' },
      { brandName: 'Rabekind-DSR', companyName: 'Mankind Pharma' },
      { brandName: 'Happi-D / Happi-L', companyName: 'Zydus Cadila' },
      { brandName: 'Aciphex', companyName: 'Eisai Inc.' },
    ],
    description: 'Fast-onset rabeprazole acid blocker combined with levosulpiride or domperidone for gut motility.',
  },
  {
    genericSalt: 'Esomeprazole Magnesium',
    category: 'S-Isomer Proton Pump Inhibitor (PPI)',
    therapeuticClass: 'Erosive Esophagitis, Resistant GERD, H. Pylori Eradication',
    standardStrengths: ['20mg', '40mg'],
    forms: ['Tablet', 'Delayed-Release Capsule', 'Injection'],
    shortForms: ['Eso', 'Nexpro', 'Nexium', 'Sompraz'],
    misspellings: ['Esomeprazol', 'Nexpro 40', 'Nexium 40', 'Sompraz 40'],
    companyBrands: [
      { brandName: 'Nexpro 40', companyName: 'Torrent Pharmaceuticals' },
      { brandName: 'Nexium 40', companyName: 'AstraZeneca' },
      { brandName: 'Sompraz 40', companyName: 'Sun Pharma' },
      { brandName: 'Raciper 40', companyName: 'Sun Pharma' },
      { brandName: 'Esomac 40', companyName: 'Cipla' },
    ],
    description: 'Pure S-enantiomer of omeprazole delivering higher bioavailability and stronger acid control.',
  },
  {
    genericSalt: 'Ondansetron Hydrochloride',
    category: '5-HT3 Receptor Antagonist (Anti-Emetic)',
    therapeuticClass: 'Nausea & Vomiting (Chemotherapy, Post-Operative, Gastroenteritis)',
    standardStrengths: ['4mg', '8mg', '2mg/ml Injection', '2mg/5ml Syrup'],
    forms: ['Tablet', 'Melt / Orally Disintegrating Tablet (MD)', 'Syrup', 'Injection'],
    shortForms: ['Ondan', 'Emeset', 'Ondem', 'Vomikind'],
    misspellings: ['Ondansatron', 'Emeset 4', 'Ondem MD', 'Vomikind MD'],
    companyBrands: [
      { brandName: 'Emeset 4 / 8', companyName: 'Cipla' },
      { brandName: 'Zofran', companyName: 'Novartis / GlaxoSmithKline' },
      { brandName: 'Ondem 4 / MD', companyName: 'Alkem Laboratories' },
      { brandName: 'Vomikind 4 / MD', companyName: 'Mankind Pharma' },
      { brandName: 'Periset', companyName: 'Ipca Laboratories' },
    ],
    description: 'Blocks peripheral vagus nerve serotonin triggers in the gut and central chemoreceptor trigger zone.',
  },
  {
    genericSalt: 'Sucralfate + Oxetacaine',
    category: 'Mucosal Protective Agent & Local Anesthetic',
    therapeuticClass: 'Stomach Ulcers, Duodenal Erosion, Severe Heartburn & Burning Sensation',
    standardStrengths: ['1000mg + 20mg / 10ml'],
    forms: ['Suspension', 'Tablet'],
    shortForms: ['Sucral', 'Sucrafil', 'Ulgel', 'Carafate'],
    misspellings: ['Sucrafil O', 'Sucralfate O', 'Ulgel O', 'Sucral-O'],
    companyBrands: [
      { brandName: 'Sucrafil-O Gel', companyName: 'Fourrts Laboratories' },
      { brandName: 'Ulgel-A / O', companyName: 'Alembic Pharmaceuticals' },
      { brandName: 'Mucaine Gel', companyName: 'Pfizer' },
      { brandName: 'Carafate', companyName: 'Allergan' },
    ],
    description: 'Forms a physical polymer paste coating over gastric ulcers to protect from stomach acid while numbing burning pain.',
  },

  // ==========================================
  // 4. CARDIOVASCULAR, CHOLESTEROL & BLOOD PRESSURE
  // ==========================================
  {
    genericSalt: 'Telmisartan',
    category: 'Angiotensin II Receptor Blocker (ARB)',
    therapeuticClass: 'Hypertension (High Blood Pressure) & Cardiovascular Risk Reduction',
    standardStrengths: ['20mg', '40mg', '80mg'],
    forms: ['Tablet'],
    shortForms: ['Telma', 'Telmi', 'Micardis', 'Telmikind', 'Telpres'],
    misspellings: ['Telmasartan', 'Telma 40', 'Telma-40', 'Micardas'],
    companyBrands: [
      { brandName: 'Telma 40 / 80', companyName: 'Glenmark Pharmaceuticals' },
      { brandName: 'Micardis', companyName: 'Boehringer Ingelheim' },
      { brandName: 'Telmikind 40', companyName: 'Mankind Pharma' },
      { brandName: 'Telpres 40', companyName: 'Abbott Laboratories' },
      { brandName: 'Cresar 40', companyName: 'Cipla' },
      { brandName: 'Telsartan 40', companyName: 'Dr. Reddy\'s Laboratories' },
    ],
    description: 'Long-acting 24-hour blood pressure control with proven kidney protection in diabetic patients.',
  },
  {
    genericSalt: 'Telmisartan + Amlodipine',
    category: 'Dual Antihypertensive Combination (ARB + CCB)',
    therapeuticClass: 'Uncontrolled Hypertension Requiring Dual Drug Therapy',
    standardStrengths: ['40mg + 5mg', '80mg + 5mg'],
    forms: ['Tablet'],
    shortForms: ['Telma-AM', 'Telmikind-AM', 'Twynsta', 'Cresar-AM'],
    misspellings: ['Telma AM', 'Telmikind AM', 'Telpres AM', 'Telma-A'],
    companyBrands: [
      { brandName: 'Telma-AM', companyName: 'Glenmark Pharmaceuticals' },
      { brandName: 'Twynsta', companyName: 'Boehringer Ingelheim' },
      { brandName: 'Telmikind-AM', companyName: 'Mankind Pharma' },
      { brandName: 'Cresar-AM', companyName: 'Cipla' },
      { brandName: 'Amlokind-T', companyName: 'Mankind Pharma' },
    ],
    description: 'Combines arterial smooth muscle dilation (amlodipine) with angiotensin receptor blockade (telmisartan).',
  },
  {
    genericSalt: 'Amlodipine Besylate',
    category: 'Calcium Channel Blocker (Dihydropyridine CCB)',
    therapeuticClass: 'Essential Hypertension & Chronic Stable Angina Pectoris',
    standardStrengths: ['2.5mg', '5mg', '10mg'],
    forms: ['Tablet'],
    shortForms: ['Amlo', 'Norvasc', 'Amlopres', 'Amlodac', 'Stamlo'],
    misspellings: ['Amlodipin', 'Amlodac 5', 'Norvask', 'Amlopres 5'],
    companyBrands: [
      { brandName: 'Norvasc 5 / 10', companyName: 'Pfizer' },
      { brandName: 'Amlopres 5', companyName: 'Cipla' },
      { brandName: 'Stamlo 5', companyName: 'Dr. Reddy\'s Laboratories' },
      { brandName: 'Amlodac 5', companyName: 'Zydus Cadila' },
      { brandName: 'Amlokind 5', companyName: 'Mankind Pharma' },
    ],
    description: 'Relaxes vascular smooth muscle cells to decrease peripheral vascular resistance and lower blood pressure.',
  },
  {
    genericSalt: 'Atorvastatin Calcium',
    category: 'HMG-CoA Reductase Inhibitor (Statin)',
    therapeuticClass: 'Hypercholesterolemia, Dyslipidemia, Atherosclerosis & Stroke Prevention',
    standardStrengths: ['10mg', '20mg', '40mg', '80mg'],
    forms: ['Tablet'],
    shortForms: ['Atorva', 'Ator', 'Lipitor', 'Storvas', 'Tonact', 'Atocor'],
    misspellings: ['Atorvastin', 'Lipitor 10', 'Atorva 20', 'Storvas 10'],
    companyBrands: [
      { brandName: 'Lipitor 10 / 20 / 40', companyName: 'Pfizer' },
      { brandName: 'Atorva 10 / 20', companyName: 'Zydus Cadila' },
      { brandName: 'Storvas 10 / 20', companyName: 'Sun Pharma' },
      { brandName: 'Tonact 10 / 20', companyName: 'Lupin Pharmaceuticals' },
      { brandName: 'Atocor 10', companyName: 'Dr. Reddy\'s Laboratories' },
      { brandName: 'Lipicure 10', companyName: 'Intas Pharmaceuticals' },
    ],
    description: 'Gold-standard cholesterol-lowering statin that clears LDL bad cholesterol and stabilizes arterial plaques.',
  },
  {
    genericSalt: 'Rosuvastatin Calcium',
    category: 'High-Intensity Statin',
    therapeuticClass: 'Severe Hyperlipidemia, High Cardiovascular Risk, Plaque Regression',
    standardStrengths: ['5mg', '10mg', '20mg', '40mg'],
    forms: ['Tablet'],
    shortForms: ['Rosu', 'Rosuvas', 'Crestor', 'Rozucor', 'Rosave'],
    misspellings: ['Rosuvastin', 'Crestor 10', 'Rosuvas 10', 'Rozucor 10'],
    companyBrands: [
      { brandName: 'Crestor 10 / 20', companyName: 'AstraZeneca' },
      { brandName: 'Rosuvas 10 / 20', companyName: 'Sun Pharma' },
      { brandName: 'Rozucor 10', companyName: 'Torrent Pharmaceuticals' },
      { brandName: 'Rosave 10', companyName: 'Alkem Laboratories' },
      { brandName: 'Novastat 10', companyName: 'Lupin Pharmaceuticals' },
    ],
    description: 'Potent hydrophilic statin with minimal liver cytochrome interactions for aggressive LDL reduction.',
  },
  {
    genericSalt: 'Clopidogrel Bisulfate',
    category: 'P2Y12 Platelet Inhibitor (Blood Thinner)',
    therapeuticClass: 'Stent Thrombosis Prevention, Acute Coronary Syndrome, Ischemic Stroke',
    standardStrengths: ['75mg', '150mg', '300mg Loading'],
    forms: ['Tablet'],
    shortForms: ['Clopid', 'Plavix', 'Deplatt', 'Clopilet'],
    misspellings: ['Clopidogrel 75', 'Plavix 75', 'Deplat', 'Clopilet 75'],
    companyBrands: [
      { brandName: 'Plavix 75mg', companyName: 'Sanofi' },
      { brandName: 'Deplatt 75', companyName: 'Torrent Pharmaceuticals' },
      { brandName: 'Clopilet 75', companyName: 'Sun Pharma' },
      { brandName: 'Ceruvit 75', companyName: 'Micro Labs' },
      { brandName: 'Noklot 75', companyName: 'Zydus Cadila' },
    ],
    description: 'Inhibits ADP binding to platelet receptors to prevent clot formation inside heart stents and blood vessels.',
  },
  {
    genericSalt: 'Metoprolol Succinate / Tartrate',
    category: 'Selective Beta-1 Adrenergic Receptor Blocker',
    therapeuticClass: 'Angina Pectoris, Heart Failure, Arrhythmias & High Blood Pressure',
    standardStrengths: ['25mg ER', '50mg ER', '100mg ER'],
    forms: ['Extended Release Tablet (ER / XL)', 'Injection'],
    shortForms: ['Meto', 'Betaloc', 'Metolar', 'Lopressor', 'Seloken'],
    misspellings: ['Metoprolol ER', 'Betaloc 50', 'Metolar 50', 'Lopressor 50'],
    companyBrands: [
      { brandName: 'Betaloc 25 / 50 XL', companyName: 'AstraZeneca' },
      { brandName: 'Metolar 25 / 50 XR', companyName: 'Cipla' },
      { brandName: 'Lopressor', companyName: 'Novartis' },
      { brandName: 'Starpress-XL 25 / 50', companyName: 'Lupin Pharmaceuticals' },
      { brandName: 'Metpure-XL', companyName: 'Emcure Pharmaceuticals' },
    ],
    description: 'Slows resting heart rate and reduces cardiac workload to treat tachycardia and prevent heart strain.',
  },

  // ==========================================
  // 5. ANTIDIABETIC MEDICATIONS
  // ==========================================
  {
    genericSalt: 'Metformin Hydrochloride',
    category: 'Biguanide Antidiabetic',
    therapeuticClass: 'Type 2 Diabetes Mellitus, Pre-Diabetes & PCOS Insulin Resistance',
    standardStrengths: ['500mg', '850mg', '1000mg', '500mg SR / ER', '1000mg SR'],
    forms: ['Tablet', 'Sustained Release Tablet (SR / ER)'],
    shortForms: ['Met', 'Glycomet', 'Glucophage', 'Obimet', 'Riomet'],
    misspellings: ['Metformin SR', 'Glycomet 500', 'Glucofage', 'Glycomet-500SR'],
    companyBrands: [
      { brandName: 'Glycomet 500 / 1000 SR', companyName: 'USV Private Limited' },
      { brandName: 'Glucophage', companyName: 'Merck Healthcare' },
      { brandName: 'Obimet 500 SR', companyName: 'Abbott Laboratories' },
      { brandName: 'Cetapin 500 XR', companyName: 'Sanofi' },
      { brandName: 'Riomet', companyName: 'Sun Pharma' },
    ],
    description: 'First-line medication for Type 2 Diabetes that decreases hepatic glucose production and increases insulin sensitivity.',
  },
  {
    genericSalt: 'Metformin + Glimepiride',
    category: 'Dual Oral Antidiabetic Combination',
    therapeuticClass: 'Type 2 Diabetes Uncontrolled on Metformin Monotherapy',
    standardStrengths: ['500mg + 1mg', '500mg + 2mg', '1000mg + 2mg'],
    forms: ['Tablet (Sustained Release)'],
    shortForms: ['Glycomet-GP', 'Amaryl-M', 'Glimestar-M', 'Zoryl-M'],
    misspellings: ['Glycomet GP 1', 'Glycomet GP 2', 'Amaryl M', 'Glimestar M1'],
    companyBrands: [
      { brandName: 'Glycomet-GP 1 / GP 2', companyName: 'USV Private Limited' },
      { brandName: 'Amaryl M 1 / M 2', companyName: 'Sanofi' },
      { brandName: 'Glimestar-M 1 / M 2', companyName: 'Mankind Pharma' },
      { brandName: 'Zoryl-M 1 / M 2', companyName: 'Intas Pharmaceuticals' },
      { brandName: 'Gemer 1 / 2', companyName: 'Sun Pharma' },
    ],
    description: 'Combines insulin secretagogue (glimepiride) with hepatic insulin sensitizer (metformin).',
  },
  {
    genericSalt: 'Dapagliflozin Propanediol',
    category: 'SGLT2 Inhibitor (Gliflozin)',
    therapeuticClass: 'Type 2 Diabetes, Heart Failure with Reduced Ejection Fraction & Chronic Kidney Disease (CKD)',
    standardStrengths: ['5mg', '10mg'],
    forms: ['Tablet'],
    shortForms: ['Dapa', 'Forxiga', 'Oxra', 'Dapaone', 'Bexagliflozin'],
    misspellings: ['Forxiga 10', 'Dapagliflozin 10', 'Oxra 10', 'Dapaglyn'],
    companyBrands: [
      { brandName: 'Forxiga 10mg', companyName: 'AstraZeneca' },
      { brandName: 'Oxra 10mg', companyName: 'Sun Pharma' },
      { brandName: 'Dapaone 10', companyName: 'Micro Labs' },
      { brandName: 'Dapavel 10', companyName: 'Glenmark Pharmaceuticals' },
      { brandName: 'Dapanorm 10', companyName: 'Alkem Laboratories' },
    ],
    description: 'Blocks glucose reabsorption in the proximal renal tubules, eliminating excess sugar via urine with renal/cardiac protection.',
  },
  {
    genericSalt: 'Teneligliptin Hydrobromide Hydrate',
    category: 'DPP-4 Inhibitor (Gliptin)',
    therapeuticClass: 'Type 2 Diabetes Mellitus Blood Sugar Regulation',
    standardStrengths: ['20mg'],
    forms: ['Tablet'],
    shortForms: ['Teneli', 'Tendia', 'Ziten', 'Dynaglipt', 'Tenebite'],
    misspellings: ['Tendia 20', 'Ziten 20', 'Dynaglipt 20', 'Teneligliptin 20'],
    companyBrands: [
      { brandName: 'Tendia 20', companyName: 'Torrent Pharmaceuticals' },
      { brandName: 'Ziten 20', companyName: 'Glenmark Pharmaceuticals' },
      { brandName: 'Dynaglipt 20', companyName: 'Mankind Pharma' },
      { brandName: 'Tenalim 20', companyName: 'Abbott Laboratories' },
      { brandName: 'Tenebite 20', companyName: 'Micro Labs' },
    ],
    description: 'Increases incretin hormones (GLP-1 and GIP) to stimulate meal-dependent natural insulin release without causing hypoglycemia.',
  },

  // ==========================================
  // 6. ALLERGY, RESPIRATORY, COUGH & ASTHMA
  // ==========================================
  {
    genericSalt: 'Cetirizine Dihydrochloride',
    category: 'Second-Generation Antihistamine (H1 Blocker)',
    therapeuticClass: 'Allergic Rhinitis, Sneezing, Itchy Eyes, Urticaria & Hives',
    standardStrengths: ['5mg', '10mg', '5mg/5ml Syrup'],
    forms: ['Tablet', 'Syrup', 'Drops'],
    shortForms: ['Cetz', 'Cetzine', 'Zyrtec', 'Alerid', 'Okacet'],
    misspellings: ['Cetrizine', 'Cetzine 10', 'Zyrtec 10', 'Cetirizine 10'],
    companyBrands: [
      { brandName: 'Cetzine 10', companyName: 'GlaxoSmithKline (GSK)' },
      { brandName: 'Zyrtec', companyName: 'Johnson & Johnson / Kenvue' },
      { brandName: 'Alerid 10', companyName: 'Cipla' },
      { brandName: 'Okacet 10', companyName: 'Cipla' },
      { brandName: 'Incid-L', companyName: 'Bayer Pharmaceuticals' },
    ],
    description: 'Fast-acting peripheral H1 antihistamine with low sedation that calms allergic reactions for 24 hours.',
  },
  {
    genericSalt: 'Levocetirizine + Montelukast',
    category: 'Antihistamine & Leukotriene Receptor Antagonist Combination',
    therapeuticClass: 'Allergic Asthma, Chronic Sinusitis, Allergic Rhinitis & Night Cough',
    standardStrengths: ['5mg + 10mg', '2.5mg + 4mg Kid DT/Syrup'],
    forms: ['Tablet', 'Kid Tablet', 'Syrup'],
    shortForms: ['Montair-LC', 'Telekast-L', 'Montek-LC', 'Romilast-L'],
    misspellings: ['Montair LC', 'Telekast L', 'Montek LC', 'Montelukast-L'],
    companyBrands: [
      { brandName: 'Montair-LC', companyName: 'Cipla' },
      { brandName: 'Telekast-L', companyName: 'Lupin Pharmaceuticals' },
      { brandName: 'Montek-LC', companyName: 'Sun Pharma' },
      { brandName: 'Romilast-L', companyName: 'Sun Pharma' },
      { brandName: 'Levocet-M', companyName: 'Hetero Healthcare' },
    ],
    description: 'Dual anti-allergy formulation blocking both histamine release and leukotriene-mediated airway constriction.',
  },
  {
    genericSalt: 'Fexofenadine Hydrochloride',
    category: 'Non-Sedating Second-Generation Antihistamine',
    therapeuticClass: 'Seasonal Allergies, Hay Fever & Chronic Idiopathic Urticaria',
    standardStrengths: ['120mg', '180mg', '30mg/5ml'],
    forms: ['Tablet', 'Syrup'],
    shortForms: ['Fexo', 'Allegra', 'Fexova', 'Altifex'],
    misspellings: ['Allegra 120', 'Allegra 180', 'Fexofenadin', 'Alegra'],
    companyBrands: [
      { brandName: 'Allegra 120 / 180', companyName: 'Sanofi' },
      { brandName: 'Fexova 120 / 180', companyName: 'Torrent Pharmaceuticals' },
      { brandName: 'Altifex 120', companyName: 'Cipla' },
      { brandName: 'Histafree 120', companyName: 'Mankind Pharma' },
      { brandName: 'Fexy 120', companyName: 'Micro Labs' },
    ],
    description: 'Truly non-drowsy antihistamine that does not cross the blood-brain barrier.',
  },
  {
    genericSalt: 'Salbutamol (Albuterol) Inhaler',
    category: 'Short-Acting Beta-2 Agonist (SABA Bronchodilator)',
    therapeuticClass: 'Acute Asthma Bronchospasm, Wheezing & COPD Rescue',
    standardStrengths: ['100mcg per puff (200 MDI doses)', '2mg', '4mg'],
    forms: ['Metered Dose Inhaler (MDI)', 'Rotacaps', 'Respules', 'Syrup', 'Tablet'],
    shortForms: ['Asthalin', 'Ventolin', 'Salb', 'Proventil'],
    misspellings: ['Asthalin Inhaler', 'Ventolin Inhaler', 'Asthalin 100', 'Ventoline'],
    companyBrands: [
      { brandName: 'Asthalin Inhaler 100mcg', companyName: 'Cipla' },
      { brandName: 'Ventolin Evohaler', companyName: 'GlaxoSmithKline (GSK)' },
      { brandName: 'ProAir HFA', companyName: 'Teva Pharmaceuticals' },
      { brandName: 'Aerolin', companyName: 'GlaxoSmithKline (GSK)' },
    ],
    description: 'Rapid-acting emergency rescue inhaler that relaxes bronchial smooth muscle within 3-5 minutes.',
  },
  {
    genericSalt: 'Budesonide + Formoterol Fumarate',
    category: 'Inhaled Corticosteroid (ICS) + Long-Acting Beta-2 Agonist (LABA)',
    therapeuticClass: 'Maintenance Asthma Control & Chronic Obstructive Pulmonary Disease (COPD)',
    standardStrengths: ['200mcg + 6mcg', '400mcg + 6mcg'],
    forms: ['Inhaler (MDI)', 'Rotacaps / Dry Powder Inhaler', 'Respules'],
    shortForms: ['Foracort', 'Symbicort', 'Bude-Form', 'Maxiflo'],
    misspellings: ['Foracort 200', 'Foracort 400', 'Symbicort 160', 'Foracort Inhaler'],
    companyBrands: [
      { brandName: 'Foracort 200 / 400 Inhaler', companyName: 'Cipla' },
      { brandName: 'Symbicort Turbuhaler', companyName: 'AstraZeneca' },
      { brandName: 'Maxiflo 200', companyName: 'Cipla' },
      { brandName: 'Budamate 200', companyName: 'Lupin Pharmaceuticals' },
    ],
    description: 'Mainstay maintenance therapy preventing asthma attacks and reducing airway swelling.',
  },

  // ==========================================
  // 7. VITAMINS, MINERALS & NUTRITIONAL SUPPLEMENTS
  // ==========================================
  {
    genericSalt: 'Cholecalciferol (Vitamin D3)',
    category: 'Fat-Soluble Vitamin & Bone Regulator',
    therapeuticClass: 'Vitamin D Deficiency, Osteoporosis Prevention & Immune Health',
    standardStrengths: ['60,000 IU (Weekly Dose)', '1000 IU', '2000 IU'],
    forms: ['Softgel Capsule', 'Oral Drops', 'Granules Sachet', 'Injection'],
    shortForms: ['Vit-D3', 'D3-60K', 'Calcirol', 'D-Rise', 'Arachitol', 'Uprise-D3'],
    misspellings: ['Calcirol 60K', 'D Rise 60K', 'Arachitol 60K', 'Uprise D3', 'Vit D3 60000'],
    companyBrands: [
      { brandName: 'Calcirol 60000 IU', companyName: 'Cadila Pharmaceuticals' },
      { brandName: 'D-Rise 60K', companyName: 'USV Private Limited' },
      { brandName: 'Arachitol 60K', companyName: 'Abbott Laboratories' },
      { brandName: 'Uprise-D3 60K', companyName: 'Alkem Laboratories' },
      { brandName: 'Lumia 60K', companyName: 'Sun Pharma' },
    ],
    description: 'Promotes calcium absorption from the intestine, strengthens bone density, and supports immune cell health.',
  },
  {
    genericSalt: 'Calcium Carbonate + Vitamin D3',
    category: 'Bone Mineral & Vitamin Supplement',
    therapeuticClass: 'Hypocalcemia, Pregnancy Supplementation, Osteopenia & Fracture Healing',
    standardStrengths: ['500mg + 250 IU', 'HD (500mg + 500 IU)'],
    forms: ['Tablet', 'Suspension'],
    shortForms: ['Calc', 'Shel', 'Shelcal', 'Cipcal', 'Gemcal'],
    misspellings: ['Shelcal 500', 'Shelcal-500', 'Cipcal 500', 'Gemcal 500'],
    companyBrands: [
      { brandName: 'Shelcal 500 / HD', companyName: 'Torrent Pharmaceuticals' },
      { brandName: 'Cipcal 500', companyName: 'Cipla' },
      { brandName: 'Gemcal', companyName: 'Alkem Laboratories' },
      { brandName: 'Caltrate 600+D3', companyName: 'Pfizer / Haleon' },
      { brandName: 'Corcium 500', companyName: 'Sun Pharma' },
    ],
    description: 'Replenishes essential elemental calcium and optimizes skeletal mineralization.',
  },
  {
    genericSalt: 'B-Complex + Vitamin C + Zinc (Therapeutic Multivitamin)',
    category: 'Water-Soluble Vitamin & Zinc Mineral Complex',
    therapeuticClass: 'Mouth Ulcers, Antibiotic Recovery, Neuropathy & Post-Infection Convalescence',
    standardStrengths: ['Therapeutic Multi-B + 50mg Vit C + 41.4mg Zinc'],
    forms: ['Capsule', 'Tablet', 'Syrup'],
    shortForms: ['Becos', 'Becosules', 'B-Comp', 'Neurobion', 'Cobadex'],
    misspellings: ['Becosule', 'Becosules Z', 'Bicosules', 'Neurobion Forte', 'Becosul'],
    companyBrands: [
      { brandName: 'Becosules Z', companyName: 'Pfizer' },
      { brandName: 'Neurobion Forte', companyName: 'Procter & Gamble (P&G)' },
      { brandName: 'Cobadex Forte', companyName: 'Sun Pharma' },
      { brandName: 'Polyfam', companyName: 'Cipla' },
      { brandName: 'Zincovit', companyName: 'Apex Laboratories' },
    ],
    description: 'Essential micronutrients to heal mouth ulcers, restore cellular energy, and support nerves during illness.',
  },
  {
    genericSalt: 'Ferrous Ascorbate + Folic Acid + Zinc',
    category: 'Hematinic & Iron Supplement',
    therapeuticClass: 'Iron Deficiency Anemia, Pregnancy Nutritional Support & Low Hemoglobin',
    standardStrengths: ['100mg elemental iron + 1.5mg folic acid'],
    forms: ['Tablet', 'Syrup', 'Drops'],
    shortForms: ['Orofer-XT', 'Iron-FA', 'Livogen', 'Autrin', 'Cheri-XT'],
    misspellings: ['Orofer XT', 'Livogen XT', 'Cheri XT', 'OroferXT'],
    companyBrands: [
      { brandName: 'Orofer-XT', companyName: 'Emcure Pharmaceuticals' },
      { brandName: 'Autrin', companyName: 'Pfizer' },
      { brandName: 'Livogen-Z', companyName: 'Procter & Gamble (P&G)' },
      { brandName: 'Cheri-XT', companyName: 'Sun Pharma' },
      { brandName: 'Fefol-Z', companyName: 'GlaxoSmithKline (GSK)' },
    ],
    description: 'Ascorbate-bound elemental iron engineered for higher GI absorption with reduced stomach cramping or constipation.',
  },
  {
    genericSalt: 'Levothyroxine Sodium',
    category: 'Synthetic Thyroid Hormone (T4)',
    therapeuticClass: 'Hypothyroidism, Goiter & Thyroid Replacement Therapy',
    standardStrengths: ['25mcg', '50mcg', '75mcg', '100mcg', '125mcg'],
    forms: ['Tablet'],
    shortForms: ['Thyro', 'Eltroxin', 'Thyronorm', 'Synthroid'],
    misspellings: ['Thyronorm 50', 'Eltroxin 50', 'Thyroxine 50', 'Synthroid 50'],
    companyBrands: [
      { brandName: 'Thyronorm 25 / 50 / 100', companyName: 'Abbott Laboratories' },
      { brandName: 'Eltroxin 50 / 100', companyName: 'GlaxoSmithKline (GSK)' },
      { brandName: 'Synthroid', companyName: 'AbbVie' },
      { brandName: 'Euthyrox', companyName: 'Merck Healthcare' },
      { brandName: 'Lethal-T', companyName: 'Torrent Pharmaceuticals' },
    ],
    description: 'Identical to human T4 thyroid hormone, taken first thing in the morning with water 30 minutes before breakfast.',
  },
];

/**
 * Fast cross-referencing function:
 * Looks up ANY medicine name (whether written as generic or as company brand)
 * and returns BOTH cleanly with explanation.
 */
export interface MedicineCrossReferenceResult {
  prescribedAs: 'brand' | 'generic';
  writtenName: string;
  companyName?: string; // Manufacturing company of the prescribed brand (if brand written)
  activeGenericSalt: string; // The pure chemical molecule
  primaryBrandName?: string; // The primary brand name
  popularCompanyBrands: CompanyBrandDetail[]; // Equivalent brands from top pharma companies
  category: string;
  therapeuticClass: string;
  summaryExplanation: string;
}

export function crossReferenceMedicine(
  inputName: string,
  fallbackGeneric?: string
): MedicineCrossReferenceResult {
  const cleanInput = (inputName || '').trim();
  const lowerInput = cleanInput.toLowerCase();

  // Strip dosage and form keywords for matching
  const stripped = lowerInput
    .replace(/\b(tab|tablets?|caps?|capsules?|syp|syrup|inj|injection|drops?|susp|suspension|mg|mcg|ml|g|gm|iu|dt|sr|er|xl|xr|md|od|bd|tds|duo|plus|forte)\b/gi, '')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Guard: If input is an unrecognized or apologies token, return clear unmapped status
  if (
    lowerInput.includes('apologies') ||
    lowerInput.includes('unidentified') ||
    lowerInput.includes('pharmacist') ||
    lowerInput.includes('unclear') ||
    lowerInput.includes('illegible') ||
    lowerInput.includes('scribble')
  ) {
    return {
      prescribedAs: 'generic',
      writtenName: "Apologies, we didn't understand this medicine",
      activeGenericSalt: "Handwriting unclear — please verify or type manually",
      category: 'Unclear Handwriting',
      therapeuticClass: 'Manual Verification Needed',
      popularCompanyBrands: [],
      summaryExplanation: "Apologies, we didn't understand this medicine due to unclear doctor handwriting.",
    };
  }

  // 1. Search through the comprehensive pharmacopeia
  for (const item of COMPREHENSIVE_MEDICINE_CATALOG) {
    const genericLower = item.genericSalt.toLowerCase();

    // Check if input was written as the GENERIC salt
    const isGenericMatch =
      lowerInput.includes(genericLower) ||
      genericLower.includes(stripped) ||
      (stripped.length >= 4 && genericLower.includes(stripped));

    if (isGenericMatch) {
      return {
        prescribedAs: 'generic',
        writtenName: cleanInput,
        activeGenericSalt: item.genericSalt,
        category: item.category,
        therapeuticClass: item.therapeuticClass,
        popularCompanyBrands: item.companyBrands,
        summaryExplanation: `Prescribed by Active Generic Salt (${item.genericSalt}). In pharmacies, it is sold under these brand names by trusted pharmaceutical companies.`,
      };
    }

    // Check if input was written as a COMPANY BRAND
    for (const brand of item.companyBrands) {
      const bLower = brand.brandName.toLowerCase();
      const bClean = bLower.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim();

      if (
        lowerInput.includes(bLower) ||
        bLower.includes(lowerInput) ||
        stripped === bClean ||
        (stripped.length >= 3 && bClean.startsWith(stripped))
      ) {
        return {
          prescribedAs: 'brand',
          writtenName: cleanInput,
          companyName: brand.companyName,
          primaryBrandName: brand.brandName,
          activeGenericSalt: item.genericSalt,
          category: item.category,
          therapeuticClass: item.therapeuticClass,
          popularCompanyBrands: item.companyBrands.filter((b) => b.brandName !== brand.brandName),
          summaryExplanation: `Prescribed by Company Brand (${brand.brandName} by ${brand.companyName}). The active chemical medicine is ${item.genericSalt}.`,
        };
      }
    }

    // Check short forms & misspellings
    for (const sf of item.shortForms) {
      if (stripped === sf.toLowerCase() || lowerInput.startsWith(sf.toLowerCase())) {
        const topBrand = item.companyBrands[0];
        return {
          prescribedAs: 'brand',
          writtenName: cleanInput,
          companyName: topBrand?.companyName,
          primaryBrandName: topBrand?.brandName,
          activeGenericSalt: item.genericSalt,
          category: item.category,
          therapeuticClass: item.therapeuticClass,
          popularCompanyBrands: item.companyBrands,
          summaryExplanation: `Recognized shorthand for ${topBrand?.brandName || item.genericSalt}. Active ingredient is ${item.genericSalt}.`,
        };
      }
    }

    for (const mis of item.misspellings) {
      if (lowerInput.includes(mis.toLowerCase()) || stripped === mis.toLowerCase()) {
        const topBrand = item.companyBrands[0];
        return {
          prescribedAs: 'brand',
          writtenName: cleanInput,
          companyName: topBrand?.companyName,
          primaryBrandName: topBrand?.brandName,
          activeGenericSalt: item.genericSalt,
          category: item.category,
          therapeuticClass: item.therapeuticClass,
          popularCompanyBrands: item.companyBrands,
          summaryExplanation: `Prescription handwriting resolved to ${topBrand?.brandName || item.genericSalt} (${item.genericSalt}).`,
        };
      }
    }
  }

  // 2. Fallback heuristic if not found in catalog directly
  const genericText = fallbackGeneric || cleanInput;
  const looksLikeGeneric =
    genericText.toLowerCase().includes('+') ||
    genericText.toLowerCase().includes('acid') ||
    genericText.toLowerCase().includes('hydrochloride') ||
    genericText.toLowerCase().includes('sodium') ||
    genericText.toLowerCase().includes('potassium') ||
    genericText.toLowerCase().includes('hydrate') ||
    cleanInput.toLowerCase() === genericText.toLowerCase();

  return {
    prescribedAs: looksLikeGeneric ? 'generic' : 'brand',
    writtenName: cleanInput,
    companyName: looksLikeGeneric ? undefined : 'Pharmaceutical Formulation',
    activeGenericSalt: fallbackGeneric || cleanInput,
    category: 'Therapeutic Formulation',
    therapeuticClass: 'General Medical Treatment',
    popularCompanyBrands: [],
    summaryExplanation: looksLikeGeneric
      ? `Prescribed by generic molecule (${fallbackGeneric || cleanInput}).`
      : `Prescribed by brand name (${cleanInput}). Active salt: ${fallbackGeneric || 'As prescribed'}.`,
  };
}
