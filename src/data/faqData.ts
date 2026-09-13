/**
 * Frequently Asked Questions (FAQ) Comprehensive Knowledge Base for Theprescription.
 * Contains 60+ verified medical, pharmacological, technology, and patient safety Q&As.
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category:
    | 'Technology & Recognition'
    | 'Dosage & Doctor Codes'
    | 'Clinical Safety & Protocols'
    | 'Medicine Storage & Disposal'
    | 'Privacy & Data'
    | 'Features & Usage';
  popular?: boolean;
  tags?: string[];
}

export const FAQ_DATABASE: FAQItem[] = [
  // ==========================================
  // SECTION 1: TECHNOLOGY & RECOGNITION (1-12)
  // ==========================================
  {
    id: 'faq-1',
    question: 'How does Theprescription decipher messy doctor handwriting?',
    answer:
      'Theprescription employs a specialized 5-stage clinical handwriting recognition pipeline. Rather than treating a prescription as generic text, our neural pipeline analyzes cursive pen stroke ligatures, document layout geometry, Latin frequency shorthand (like 1-0-1 or BD), and metric dosage boundaries. The decoded tokens are cross-referenced against standard pharmacopeias and drug databases to reconcile handwritten ambiguities.',
    category: 'Technology & Recognition',
    popular: true,
    tags: ['handwriting', 'ocr', 'ai', 'cursive', 'technology'],
  },
  {
    id: 'faq-2',
    question: 'How does the system distinguish between brand names and active generic salts?',
    answer:
      'Doctors frequently write commercial trade names (e.g. Augmentin, Lipitor, Pan 40, Glycomet) rather than chemical salts. Our built-in pharmaceutical ontology automatically detects brand names, maps them to their standard generic active chemical molecules (e.g. Amoxicillin + Clavulanic Acid, Atorvastatin, Pantoprazole, Metformin), and identifies therapeutic equivalents to promote informed patient awareness.',
    category: 'Technology & Recognition',
    popular: true,
    tags: ['generic', 'brand', 'molecules', 'salts', 'catalog'],
  },
  {
    id: 'faq-3',
    question: 'What is RapidFuzz and how does it correct doctor spelling mistakes?',
    answer:
      'Doctors writing in rapid succession often abbreviate or slightly misspell drug names (e.g., "Amoxcillin" instead of "Amoxicillin", "Pantocit" instead of "Pantocid", or "Paracetmol"). Our Smart NLP layer utilizes token similarity algorithms (Levenshtein token distance and RapidFuzz weighting) to accurately associate partial or imperfectly spelled words with standardized medical dictionary entries.',
    category: 'Technology & Recognition',
    popular: false,
    tags: ['rapidfuzz', 'nlp', 'spelling', 'fuzzy matching'],
  },
  {
    id: 'faq-4',
    question: 'What image formats and lighting conditions produce the highest accuracy?',
    answer:
      'For best results, upload clear, well-lit JPEG, PNG, or WebP photos. Place the prescription slip flat on a contrasting background, avoid shadows from your mobile device, ensure natural or even overhead lighting, and keep the camera directly perpendicular to the page to minimize perspective distortion.',
    category: 'Technology & Recognition',
    popular: false,
    tags: ['image quality', 'lighting', 'camera', 'formats', 'photo'],
  },
  {
    id: 'faq-5',
    question: 'Can the system read printed e-prescriptions and hospital discharge summaries?',
    answer:
      'Yes. The AI engine processes both cursive doctor handwriting and digitally printed hospital discharge summaries, electronic medical records (EMR printouts), and clinical clinic slips with equal precision, categorizing each medication, dosage, and diagnostic investigation.',
    category: 'Technology & Recognition',
    popular: true,
    tags: ['printed', 'discharge summary', 'emr', 'hospital', 'e-prescription'],
  },
  {
    id: 'faq-6',
    question: 'How does Theprescription detect ordered diagnostic laboratory tests?',
    answer:
      'Doctors frequently include diagnostic investigation orders on the bottom or side of the prescription slip (under "Adv:", "Inv:", or "Tests:"). The system scans for standard diagnostic profiles (e.g., CBC, Lipid Profile, Liver Function Test, HbA1c, Thyroid Panel, Chest X-Ray) and provides patient-friendly preparation tips such as 10–12 hour overnight fasting instructions.',
    category: 'Technology & Recognition',
    popular: false,
    tags: ['lab tests', 'blood work', 'fasting', 'cbc', 'diagnostics'],
  },
  {
    id: 'faq-7',
    question: 'What happens when handwriting is completely unreadable or torn?',
    answer:
      'If pen strokes are too degraded, blurred, torn, or unintelligible, our system enforces a clinical safety halt: it flags the item with "Apologies, we didn\'t understand this medicine" and alerts the patient. We never invent or hallucinate dangerous medication names when confidence is insufficient.',
    category: 'Technology & Recognition',
    popular: true,
    tags: ['unclear', 'safety', 'illegible', 'hallucination', 'torn'],
  },
  {
    id: 'faq-8',
    question: 'What is the Human-in-the-Loop (HITL) learned handwriting feature?',
    answer:
      'When an ambiguous token is encountered, you can input the verbal confirmation given by your physician or pharmacist. The application preserves this verified mapping in your local browser storage so that future prescriptions with similar shorthand or doctor cursive are recognized with high priority.',
    category: 'Technology & Recognition',
    popular: false,
    tags: ['hitl', 'learning', 'browser memory', 'verification'],
  },
  {
    id: 'faq-9',
    question: 'Can Theprescription decipher regional, Indian, European, and US trade names?',
    answer:
      'Yes. The underlying pharmacopeia database includes widespread international, US FDA, UK NHS, and Indian National Formulary trade names (such as Dolo, Crocin, Calpol, Augmentin, Zithromax, Lipitor, Metcheck, Telma, and Ecosprin).',
    category: 'Technology & Recognition',
    popular: false,
    tags: ['regional', 'international', 'fda', 'india', 'uk', 'trade names'],
  },
  {
    id: 'faq-10',
    question: 'How does the multi-key failover and rotation architecture work?',
    answer:
      'To prevent rate limit interruptions (HTTP 429 quota exhaustion), the server distributes live requests in round-robin sequence across multiple independent Gemini neural engine keys. If one key hits its quota limit or encounters an issue, the system automatically and transparently completes the in-flight request on the secondary key.',
    category: 'Technology & Recognition',
    popular: false,
    tags: ['multi-key', 'failover', 'round-robin', 'rate limit', 'performance'],
  },
  {
    id: 'faq-11',
    question: 'Does the scanner work on multi-page prescriptions?',
    answer:
      'You can scan or upload each page of a multi-page prescription consecutively, or copy and paste transcribed clinical notes into the written notes box. Each page generates a structured medication list and chronological master schedule.',
    category: 'Technology & Recognition',
    popular: false,
    tags: ['multi-page', 'upload', 'long prescription', 'notes'],
  },
  {
    id: 'faq-12',
    question: 'Can it decipher veterinary or pet prescriptions?',
    answer:
      'The system is specialized for human clinical pharmacopeias. While it can decode handwritten Latin frequencies (OD, BD) on animal slips, veterinary-specific drugs, species-adjusted dosages, and pet formulations should strictly be confirmed with a licensed veterinarian.',
    category: 'Technology & Recognition',
    popular: false,
    tags: ['veterinary', 'pets', 'animals', 'dogs', 'cats'],
  },

  // ==========================================
  // SECTION 2: DOSAGE & DOCTOR CODES (13-26)
  // ==========================================
  {
    id: 'faq-13',
    question: 'What do doctor frequency codes 1-0-1, 1-0-0, 0-0-1, and 1-1-1 mean?',
    answer:
      'These are daily metric frequency matrices: "1-0-0" means 1 dose in the Morning only; "0-0-1" means 1 dose at Night only; "1-0-1" means 1 dose in the Morning and 1 dose at Night (Twice daily, spaced 12 hours apart); and "1-1-1" means 1 dose Morning, 1 dose Afternoon, and 1 dose Night (Three times daily, spaced 8 hours apart).',
    category: 'Dosage & Doctor Codes',
    popular: true,
    tags: ['1-0-1', '1-0-0', '0-0-1', '1-1-1', 'matrix', 'timing'],
  },
  {
    id: 'faq-14',
    question: 'What is the clinical difference between "OD" and "BD"?',
    answer:
      '"OD" stands for Omni Die (Latin for "Once Daily"), meaning the medication should be taken once every 24 hours at the same designated time. "BD" or "BID" stands for Bis in Die (Latin for "Twice Daily"), meaning the medication should be taken twice a day, typically 10 to 12 hours apart.',
    category: 'Dosage & Doctor Codes',
    popular: true,
    tags: ['od', 'bd', 'bid', 'omni die', 'bis in die', 'frequency'],
  },
  {
    id: 'faq-15',
    question: 'What does "TDS" or "TID" mean and how many hours apart should doses be?',
    answer:
      '"TDS" stands for Ter Die Sumendum and "TID" stands for Ter in Die, both meaning "Three times daily". For optimal therapeutic blood levels, doses should be spaced approximately 8 hours apart (e.g., 7:00 AM, 3:00 PM, and 11:00 PM), rather than taken grouped closely together.',
    category: 'Dosage & Doctor Codes',
    popular: false,
    tags: ['tds', 'tid', 'three times daily', 'spacing', '8 hours'],
  },
  {
    id: 'faq-16',
    question: 'What does "QID" or "QDS" mean?',
    answer:
      '"QID" (Quater in Die) or "QDS" (Quater Die Sumendum) denotes "Four times daily". Patients taking QID medications should space them approximately 4 to 6 hours apart throughout their waking hours (e.g., 8:00 AM, 1:00 PM, 6:00 PM, and bedtime).',
    category: 'Dosage & Doctor Codes',
    popular: false,
    tags: ['qid', 'qds', 'four times daily', 'intervals'],
  },
  {
    id: 'faq-17',
    question: 'What is "AC" (Ante Cibum) vs "PC" (Post Cibum)?',
    answer:
      '"AC" stands for Ante Cibum, meaning "Before Meals" (take 30 to 45 minutes prior to eating on an empty stomach to ensure maximum absorption or stomach protection). "PC" stands for Post Cibum, meaning "After Meals" (take with or immediately following food to protect against gastric irritation or nausea).',
    category: 'Dosage & Doctor Codes',
    popular: true,
    tags: ['ac', 'pc', 'ante cibum', 'post cibum', 'meals', 'food'],
  },
  {
    id: 'faq-18',
    question: 'What does "HS" or "QHS" signify on a prescription?',
    answer:
      '"HS" stands for Hora Somni, which translates to "At Bedtime". These medications (such as cholesterol statins, sedatives, or nighttime antiallergics) should be taken roughly 30 minutes before sleep.',
    category: 'Dosage & Doctor Codes',
    popular: false,
    tags: ['hs', 'qhs', 'hora somni', 'bedtime', 'night'],
  },
  {
    id: 'faq-19',
    question: 'What does "SOS" or "PRN" mean, and how often can I take it?',
    answer:
      '"SOS" (Si Opus Sit) and "PRN" (Pro Re Nata) indicate that the medication is "As Needed" only. It should not be taken around the clock like a daily pill, but only when specific symptoms (such as acute migraine, fever above 100°F, severe asthma wheezing, or acid reflux) occur. Always respect the minimum interval (e.g. at least 4 to 6 hours between doses).',
    category: 'Dosage & Doctor Codes',
    popular: true,
    tags: ['sos', 'prn', 'as needed', 'emergency', 'fever'],
  },
  {
    id: 'faq-20',
    question: 'What does "Stat" mean when written by a doctor?',
    answer:
      '"Stat" is derived from Statim, meaning "Immediately / Urgent". It refers to a single initial loading dose that must be administered right away to bring acute symptoms under control or rapidly establish therapeutic drug concentrations.',
    category: 'Dosage & Doctor Codes',
    popular: false,
    tags: ['stat', 'statim', 'immediately', 'urgent'],
  },
  {
    id: 'faq-21',
    question: 'What do BBF and ABF mean?',
    answer:
      '"BBF" indicates "Before Breakfast" (e.g. thyroid levothyroxine or proton-pump inhibitors taken on an empty stomach upon waking). "ABF" stands for "After Breakfast" (e.g. multivitamins or diabetes medications intended to work alongside morning glucose intake).',
    category: 'Dosage & Doctor Codes',
    popular: false,
    tags: ['bbf', 'abf', 'breakfast', 'morning'],
  },
  {
    id: 'faq-22',
    question: 'What do eye drop sidedness abbreviations (OD, OS, OU) mean?',
    answer:
      'In ophthalmology: "OD" (Oculus Dexter) means the Right Eye; "OS" (Oculus Sinister) means the Left Eye; and "OU" (Oculus Uterque) means Both Eyes. Note that in general medicine OD means once daily, but on eye drop prescriptions it denotes the right eye.',
    category: 'Dosage & Doctor Codes',
    popular: true,
    tags: ['eye drops', 'od', 'os', 'ou', 'ophthalmology', 'eyes'],
  },
  {
    id: 'faq-23',
    question: 'What do ear drop abbreviations (AD, AS, AU) stand for?',
    answer:
      'In otology: "AD" (Auris Dextra) refers to the Right Ear; "AS" (Auris Sinistra) refers to the Left Ear; and "AU" (Auris Utraque) means Both Ears.',
    category: 'Dosage & Doctor Codes',
    popular: false,
    tags: ['ear drops', 'ad', 'as', 'au', 'ears'],
  },
  {
    id: 'faq-24',
    question: 'What do clinical administration routes PO, SL, SC, IM, and IV mean?',
    answer:
      '"PO" (Per Os) = By mouth; "SL" (Sublingual) = Placed under tongue to dissolve into bloodstream; "SC" or "SQ" (Subcutaneous) = Injected into the fatty tissue beneath skin (e.g. insulin); "IM" (Intramuscular) = Injected deep into muscle tissue; and "IV" (Intravenous) = Infused directly into a vein.',
    category: 'Dosage & Doctor Codes',
    popular: false,
    tags: ['routes', 'po', 'sl', 'sc', 'im', 'iv', 'injections'],
  },
  {
    id: 'faq-25',
    question: 'What do dosage form short-forms (Tab, Cap, Syp, Susp, Oint, Gtt) mean?',
    answer:
      '"Tab" = Solid tablet; "Cap" = Gelatin capsule; "Syp" = Liquid syrup; "Susp" = Suspension liquid that requires vigorous shaking; "Oint" / "Ung" = Topical ointment; "Gtt" = Liquid drops; "Supp" = Rectal/vaginal suppository; and "Pulv" = Powder sachet.',
    category: 'Dosage & Doctor Codes',
    popular: false,
    tags: ['tab', 'cap', 'syp', 'susp', 'oint', 'gtt', 'dosage forms'],
  },
  {
    id: 'faq-26',
    question: 'What do "Rx", "c/o", "k/c/o", and "Adv / Ix" on prescription headers mean?',
    answer:
      '"Rx" originates from the Latin Recipe ("Take thou"); "c/o" denotes "Complaining of" (patient\'s primary symptoms); "k/c/o" means "Known case of" (pre-existing chronic conditions like hypertension or diabetes); and "Adv" / "Ix" denotes "Advice / Investigations" ordered.',
    category: 'Dosage & Doctor Codes',
    popular: false,
    tags: ['rx', 'c/o', 'k/c/o', 'ix', 'adv', 'header codes'],
  },

  // =======================================================
  // SECTION 3: CLINICAL SAFETY & GENERAL PROTOCOLS (27-44)
  // =======================================================
  {
    id: 'faq-27',
    question: 'What should I do if I accidentally miss a scheduled medicine dose?',
    answer:
      'As a general rule, take the missed dose as soon as you remember. However, if it is almost time for your next scheduled dose (within 2 to 4 hours), skip the missed dose and resume your regular timing. NEVER double up or take two doses at the same time to compensate for a forgotten pill.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['missed dose', 'forgot pill', 'double dose', 'safety'],
  },
  {
    id: 'faq-28',
    question: 'Why is it dangerous to double your dose if you missed a morning pill?',
    answer:
      'Doubling a dose can trigger severe drug toxicity, sudden hypotension (critically low blood pressure), severe hypoglycemia (dangerous drop in blood sugar), or internal bleeding. The body cannot metabolize two doses at once safely.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['double dose', 'toxicity', 'overdose', 'blood pressure', 'hypoglycemia'],
  },
  {
    id: 'faq-29',
    question: 'Why should Extended-Release (ER/XR) or Enteric-Coated (EC) tablets never be crushed?',
    answer:
      'Extended-Release (ER, XR, CR, SR) tablets are engineered with polymer matrices to slowly deliver medication over 12–24 hours. Enteric-Coated (EC) tablets have acid-resistant shells protecting your stomach or safeguarding the medicine from gastric acid. Crushing, chewing, or splitting these causes "dose dumping"—releasing 24 hours of medication into your bloodstream all at once, which can be fatal.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['crush tablet', 'extended release', 'er', 'xr', 'enteric coated', 'ec', 'dose dump'],
  },
  {
    id: 'faq-30',
    question: 'Why must I complete my full antibiotic course even if I feel 100% better?',
    answer:
      'Stopping antibiotics early kills only the weakest bacteria, allowing the strongest, most resilient strains to survive, mutate, and multiply. This creates antibiotic-resistant "superbugs" that will no longer respond to first-line medicines during your next infection.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['antibiotics', 'superbugs', 'resistance', 'full course', 'infection'],
  },
  {
    id: 'faq-31',
    question: 'How should antibiotics and probiotics or yogurt be spaced apart?',
    answer:
      'Antibiotics kill both harmful infection-causing bacteria and healthy gut flora. While probiotics or yogurt help prevent antibiotic-associated diarrhea, taking them simultaneously will cause the antibiotic to kill the beneficial bacteria in the probiotic. Always space probiotics at least 2 hours apart from your antibiotic dose.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['probiotics', 'antibiotics', 'yogurt', 'spacing', 'gut health'],
  },
  {
    id: 'faq-32',
    question: 'Why must NSAID pain relievers (Ibuprofen, Naproxen, Diclofenac) be taken with food?',
    answer:
      'NSAIDs inhibit COX-1 enzymes, which directly reduces the production of prostaglandins that protect the stomach mucosa from digestive acid. Taking NSAIDs on an empty stomach can cause gastritis, erosive stomach ulcers, and dangerous gastrointestinal bleeding.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['nsaids', 'ibuprofen', 'naproxen', 'ulcers', 'stomach', 'food'],
  },
  {
    id: 'faq-33',
    question: 'What is the grapefruit juice interaction and why is it dangerous?',
    answer:
      'Grapefruit and its juice contain furanocoumarins that irreversibly block the CYP3A4 digestive enzyme. This enzyme normally breaks down many medications (including statins like Atorvastatin, calcium-channel blockers like Amlodipine, and certain immunosuppressants). Without it, drug levels in the blood surge up to several times normal levels, risking organ damage.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['grapefruit', 'cyp3a4', 'interaction', 'atorvastatin', 'amlodipine', 'statins'],
  },
  {
    id: 'faq-34',
    question: 'Why is mixing alcohol with prescription medicines strictly prohibited?',
    answer:
      'Alcohol interacts unpredictably with pharmaceuticals. When combined with sedatives, antihistamines, or opioids, it can induce respiratory depression, coma, or death. Combined with Acetaminophen (Paracetamol), it accelerates liver failure. Combined with Metronidazole, it triggers severe disulfiram-like vomiting, tachycardia, and chest pain.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['alcohol', 'mixing', 'paracetamol', 'metronidazole', 'sedatives', 'liver'],
  },
  {
    id: 'faq-35',
    question: 'How should oral iron supplements be taken for optimal absorption?',
    answer:
      'Iron is best absorbed in an acidic gastric environment on an empty stomach with a glass of water or citrus juice (Vitamin C enhances iron uptake). Avoid taking iron with milk, calcium supplements, antacids, tea, or coffee, as tannins and calcium bind to iron and block its absorption by over 60%.',
    category: 'Clinical Safety & Protocols',
    popular: false,
    tags: ['iron', 'supplements', 'vitamin c', 'tea', 'calcium', 'absorption'],
  },
  {
    id: 'faq-36',
    question: 'What is the correct protocol for taking thyroid medication (Levothyroxine)?',
    answer:
      'Levothyroxine must be taken with a full glass of plain water first thing in the morning on an empty stomach, at least 30 to 60 minutes before breakfast, coffee, or other drinks. Calcium supplements, iron tablets, or multivitamins must be spaced at least 4 hours away.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['thyroid', 'levothyroxine', 'empty stomach', 'morning', 'coffee'],
  },
  {
    id: 'faq-37',
    question: 'How should multiple eye drops be spaced and applied?',
    answer:
      'When prescribed two different eye drop medications, always wait 5 to 10 minutes between the first and second drop. Administering them back-to-back causes the second drop to wash out the first before it can be absorbed. If an eye ointment is also prescribed, always apply drops first and ointment last.',
    category: 'Clinical Safety & Protocols',
    popular: false,
    tags: ['eye drops', 'spacing', '5 minutes', 'ointment', 'glaucoma'],
  },
  {
    id: 'faq-38',
    question: 'Why must I rinse my mouth after using corticosteroid inhalers?',
    answer:
      'Inhaled corticosteroids (like Budesonide, Fluticasone, or Beclomethasone) leave microscopic steroid residues in the oral cavity. If not thoroughly rinsed and spat out with water, these residues suppress local mucosal immunity, causing oral thrush (candidiasis fungal infection) and hoarseness.',
    category: 'Clinical Safety & Protocols',
    popular: false,
    tags: ['inhalers', 'rinse mouth', 'oral thrush', 'steroids', 'budesonide', 'asthma'],
  },
  {
    id: 'faq-39',
    question: 'How do I tell the difference between a mild side effect and an allergic reaction?',
    answer:
      'Mild expected side effects include mild drowsiness, metallic taste, or light nausea. A true medical allergic reaction (anaphylaxis) involves hives, widespread itchy red rash, swelling of lips, tongue, or throat, tightness in the chest, wheezing, and difficulty breathing. Anaphylaxis is a life-threatening medical emergency requiring immediate 911/112 care.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['allergy', 'anaphylaxis', 'side effects', 'swelling', 'hives', 'emergency'],
  },
  {
    id: 'faq-40',
    question: 'What is the immediate protocol for suspected medication overdose?',
    answer:
      'If someone has ingested excessive medication or accidental poison: immediately dial your local emergency services (911 in US, 112 in EU/India, 999 in UK) or Poison Control (1-800-222-1222 in US, 1800-116-117 in India). Do NOT induce vomiting unless instructed by poison specialists. Keep the medicine box with you to read the exact name and strength.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['overdose', 'poison control', 'emergency', 'poisoning'],
  },
  {
    id: 'faq-41',
    question: 'How should asthma rescue inhalers (Albuterol/Salbutamol) be used during flares?',
    answer:
      'During acute shortness of breath or bronchospasm, take 1–2 puffs of your fast-acting bronchodilator (waiting 1 minute between puffs, using a spacer if available). If symptoms do not improve within 10–15 minutes, seek immediate emergency medical care.',
    category: 'Clinical Safety & Protocols',
    popular: false,
    tags: ['asthma', 'albuterol', 'salbutamol', 'inhaler', 'wheezing'],
  },
  {
    id: 'faq-42',
    question: 'What are "red flag" medication symptoms that require urgent ER evaluation?',
    answer:
      'Red flag symptoms include: chest pain or palpitations, sudden shortness of breath, severe rash with skin peeling (Stevens-Johnson syndrome), persistent vomiting, yellowing of skin or eyes (jaundice/liver failure), black or tarry stools (internal GI bleeding), and sudden severe dizziness or fainting.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['red flags', 'emergency room', 'jaundice', 'bleeding', 'rash', 'chest pain'],
  },
  {
    id: 'faq-43',
    question: 'Can I stop taking blood pressure or diabetes medicines once numbers normalize?',
    answer:
      'No. Normal blood pressure or blood sugar readings mean your medication is actively working—not that the underlying condition is cured. Discontinuing antihypertensives can cause dangerous rebound hypertension, strokes, or hypertensive crises. Never adjust doses without doctor approval.',
    category: 'Clinical Safety & Protocols',
    popular: true,
    tags: ['blood pressure', 'hypertension', 'diabetes', 'stop medication', 'rebound'],
  },
  {
    id: 'faq-44',
    question: 'How do drug-drug interactions happen and how does this tool warn me?',
    answer:
      'Interactions occur when one drug alters the absorption, metabolism, or elimination of another (e.g. combining blood thinners like Warfarin with Aspirin dramatically spikes hemorrhage risk). Theprescription flags potential interactions and provides crucial spacing intervals.',
    category: 'Clinical Safety & Protocols',
    popular: false,
    tags: ['interactions', 'warfarin', 'aspirin', 'spacing', 'drug interactions'],
  },

  // =========================================================
  // SECTION 4: MEDICINE STORAGE & DISPOSAL PROTOCOLS (45-50)
  // =========================================================
  {
    id: 'faq-45',
    question: 'Where is the worst place in the house to store your medications?',
    answer:
      'The bathroom medicine cabinet and above the kitchen stove are the worst locations. The frequent heat, humidity, and steam cause chemical degradation of pills and rapid loss of potency. Store medicines in a cool, dry, dark place (like a high bedroom closet shelf) away from children and pets.',
    category: 'Medicine Storage & Disposal',
    popular: true,
    tags: ['storage', 'bathroom', 'humidity', 'heat', 'potency', 'closet'],
  },
  {
    id: 'faq-46',
    question: 'Which medications require strict refrigeration (2°C to 8°C)?',
    answer:
      'Unopened insulin pens/vials, certain eye drops (like Latanoprost before opening), reconstituted antibiotic suspensions, GLP-1 injectables (Semaglutide), and biologic injections require strict refrigeration between 2°C and 8°C (36°F to 46°F). Never allow them to freeze.',
    category: 'Medicine Storage & Disposal',
    popular: true,
    tags: ['refrigeration', 'insulin', 'semaglutide', 'temperature', 'fridge'],
  },
  {
    id: 'faq-47',
    question: 'What happens if refrigerated medicines like insulin accidentally freeze?',
    answer:
      'Freezing causes peptide proteins and biologic macromolecules to denature and precipitate out of solution, rendering insulin completely ineffective. If an insulin vial or prefilled pen has frozen, it must be discarded immediately even after thawing.',
    category: 'Medicine Storage & Disposal',
    popular: false,
    tags: ['freezing', 'insulin', 'denatured', 'damage', 'temperature'],
  },
  {
    id: 'faq-48',
    question: 'Is it safe to consume medications past their printed expiration date?',
    answer:
      'No. While some dry tablets may simply lose chemical potency, others (such as liquid antibiotics, insulin, nitroglycerin, and tetracyclines) degrade into toxic byproducts or fail to provide critical life-saving therapeutic thresholds. Discard all expired medicines safely.',
    category: 'Medicine Storage & Disposal',
    popular: true,
    tags: ['expired', 'expiration date', 'potency', 'toxicity', 'safety'],
  },
  {
    id: 'faq-49',
    question: 'How long are eye drops and reconstituted liquid antibiotic syrups good for after opening?',
    answer:
      'Most standard multi-dose eye drops contain preservatives that expire 28 to 30 days after breaking the bottle seal (mark the date opened on the bottle!). Reconstituted pediatric antibiotic dry syrups (like Amoxicillin suspension) typically expire after 7 to 14 days and must be refrigerated.',
    category: 'Medicine Storage & Disposal',
    popular: false,
    tags: ['eye drops', 'syrup', 'suspension', '28 days', 'opened bottle'],
  },
  {
    id: 'faq-50',
    question: 'How should expired or unused medications be safely disposed of?',
    answer:
      'Never flush medicines down the toilet or sink unless specifically instructed on FDA flush lists, as this contaminates waterways. Utilize pharmacy "drug take-back" dropboxes. If disposing in household trash, mix pills with unpalatable substances (used coffee grounds or cat litter) in a sealed bag.',
    category: 'Medicine Storage & Disposal',
    popular: false,
    tags: ['disposal', 'take back', 'environment', 'flush', 'trash'],
  },

  // ==========================================
  // SECTION 5: PRIVACY & DATA SECURITY (51-56)
  // ==========================================
  {
    id: 'faq-51',
    question: 'Is my prescription photo stored on public servers or sold to advertisers?',
    answer:
      'No. Theprescription operates on an ephemeral, zero-retention privacy model. Your uploaded images and extracted clinical text are analyzed in volatile memory for the duration of your active session and are never sold, monetized, or shared with third-party data brokers.',
    category: 'Privacy & Data',
    popular: true,
    tags: ['privacy', 'zero retention', 'data', 'advertisers', 'encryption'],
  },
  {
    id: 'faq-52',
    question: 'Is the website compliant with healthcare data security best practices?',
    answer:
      'Yes. All client-to-server traffic is protected using TLS 1.3 256-bit SSL transport encryption. Ephemeral memory buffers are purged after generation of your patient report.',
    category: 'Privacy & Data',
    popular: false,
    tags: ['hipaa', 'gdpr', 'security', 'ssl', 'encryption', 'tls'],
  },
  {
    id: 'faq-53',
    question: 'Can family members or employers see what prescriptions I check?',
    answer:
      'No. The application requires no mandatory social account linking or intrusive personal logins. Your searches remain private to your local browser tab.',
    category: 'Privacy & Data',
    popular: false,
    tags: ['confidentiality', 'private', 'employers', 'family', 'anonymous'],
  },
  {
    id: 'faq-54',
    question: 'Do you use my medical images to train public artificial intelligence models?',
    answer:
      'No. Uploaded prescription images are strictly treated as private customer session payloads and are not retained in public generative training datasets.',
    category: 'Privacy & Data',
    popular: false,
    tags: ['ai training', 'data privacy', 'safety', 'confidentiality'],
  },
  {
    id: 'faq-55',
    question: 'How do I completely clear my prescription history from my device?',
    answer:
      'Simply close your browser tab or clear your browser cache and local storage. Because data is handled ephemerally, closing the session purges active analysis results.',
    category: 'Privacy & Data',
    popular: false,
    tags: ['clear data', 'cache', 'browser storage', 'purge'],
  },
  {
    id: 'faq-56',
    question: 'Are PDF downloads and printed cards generated securely?',
    answer:
      'Yes. When you download a PDF or print your medication routine card, the generation is executed locally inside your client browser using client-side libraries (jsPDF), ensuring no external cloud server receives your formatted medication schedule.',
    category: 'Privacy & Data',
    popular: false,
    tags: ['pdf', 'client side', 'jspdf', 'local generation', 'security'],
  },

  // ==========================================
  // SECTION 6: FEATURES & USAGE (57-62)
  // ==========================================
  {
    id: 'faq-57',
    question: 'How do I download and print a physical medication routine card?',
    answer:
      'After deciphering a prescription or looking up medications, click the "Print Medication Card" button. You can choose from high-contrast printable PDF, standalone offline HTML sheet, or formatted summary text designed to stick on your refrigerator or medicine organizer box.',
    category: 'Features & Usage',
    popular: true,
    tags: ['print', 'pdf', 'routine card', 'fridge schedule', 'download'],
  },
  {
    id: 'faq-58',
    question: 'How does the single medicine directory lookup work?',
    answer:
      'If you don\'t have a prescription slip and only want to research a specific drug (e.g. Metformin, Pantoprazole, or Augmentin), switch to the "Medicine Lookup" tab. Type the medicine name to receive its pharmacological class, generic salt, food rules, side effects, and missed dose advice.',
    category: 'Features & Usage',
    popular: true,
    tags: ['lookup', 'directory', 'search', 'pharmacology', 'single medicine'],
  },
  {
    id: 'faq-59',
    question: 'Can I use Theprescription on mobile phones and tablets?',
    answer:
      'Yes. The user interface is responsive across all modern mobile browsers (iOS Safari, Android Chrome). You can take a direct photo using your smartphone camera or upload an image from your photo gallery.',
    category: 'Features & Usage',
    popular: true,
    tags: ['mobile', 'smartphone', 'camera', 'iphone', 'android', 'tablet'],
  },
  {
    id: 'faq-60',
    question: 'Is Theprescription free to use for patients and caregivers?',
    answer:
      'Yes. The core prescription handwriting deciphering tools, Latin shorthand dictionary, single medicine directory, and printable medication cards are completely free for patients, family caregivers, and healthcare seekers.',
    category: 'Features & Usage',
    popular: true,
    tags: ['free', 'cost', 'patients', 'caregivers', 'accessibility'],
  },
  {
    id: 'faq-61',
    question: 'How can caregivers use this tool to manage elderly family members\' medicines?',
    answer:
      'Caregivers can snap a photo of multiple clinic slips, review the combined chronological morning-to-bedtime schedule, and print a consolidated routine card with large, high-contrast fonts that can be kept next to the patient\'s weekly pill organizer box.',
    category: 'Features & Usage',
    popular: true,
    tags: ['caregivers', 'elderly', 'seniors', 'family', 'pill organizer'],
  },
  {
    id: 'faq-62',
    question: 'Can I copy the decoded prescription text directly to my clipboard?',
    answer:
      'Yes. Each deciphered result includes a one-click "Copy Summary" button that formats the medicines, timings, generic salts, and doctor advice into clean, shareable plain text for SMS, WhatsApp, or notes apps.',
    category: 'Features & Usage',
    popular: false,
    tags: ['copy', 'clipboard', 'share', 'whatsapp', 'text summary'],
  },
];
