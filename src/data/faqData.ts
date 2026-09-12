export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Technology & Recognition' | 'Dosage & Doctor Codes' | 'Clinical Safety' | 'Privacy & Data' | 'Features & Usage';
  popular?: boolean;
}

export const FAQ_DATABASE: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does Theprescription decipher doctor handwriting?',
    answer:
      'Theprescription utilizes a multi-stage clinical transcription engine. First, it processes the image with adaptive thresholding to filter ink strokes, pen pressures, and background paper texture. Next, neural vision models extract candidate cursive ligatures and segment Rx headers, medicine rows, and signature blocks. Finally, an NLP pharmacopeia engine cross-references extracted drug names against authoritative clinical databases to resolve misspelled brand names into verified generic molecules and standard dosages.',
    category: 'Technology & Recognition',
    popular: true,
  },
  {
    id: 'faq-2',
    question: 'What happens if a medicine name is an illegible scribble?',
    answer:
      'Safety is our top priority. If a doctor handwritten line is truly indecipherable or falls below safety confidence thresholds, Theprescription refuses to guess randomly. It clearly marks the line as "Handwriting unclear" and displays an inline Human-in-the-Loop verification tool allowing you to type or select the verified name from your pharmacy receipt or medicine carton.',
    category: 'Clinical Safety',
    popular: true,
  },
  {
    id: 'faq-3',
    question: 'What do common doctor dosing codes like "1-0-1" or "1-1-1" mean?',
    answer:
      'Doctor dosing numbers represent times of day in sequential order: Morning — Afternoon — Night. For example:\n• "1-0-1" = Take 1 tablet in the morning and 1 tablet at night (total 2/day).\n• "1-0-0" = 1 tablet in the morning only.\n• "0-0-1" = 1 tablet at bedtime only.\n• "1-1-1" = 1 tablet morning, 1 afternoon, 1 night (total 3/day).\n• "0-1-0" = 1 tablet in the afternoon only.',
    category: 'Dosage & Doctor Codes',
    popular: true,
  },
  {
    id: 'faq-4',
    question: 'What do Latin abbreviations like OD, BD, TDS, and QID stand for?',
    answer:
      'These are traditional Latin prescription shorthand instructions:\n• OD (Omni Die): Once daily (every 24 hours).\n• BD or BID (Bis in Die): Twice daily (typically ~12 hours apart).\n• TDS or TID (Ter Die Sumendum): Three times daily (typically ~8 hours apart).\n• QID (Quater in Die): Four times daily (every 6 hours).\n• SOS / PRN (Pro Re Nata): As needed or during emergency symptoms only (e.g. fever or pain).\n• STAT: Take immediately.',
    category: 'Dosage & Doctor Codes',
    popular: true,
  },
  {
    id: 'faq-5',
    question: 'What is the difference between AC and PC instructions?',
    answer:
      'AC stands for "Ante Cibum", which means take BEFORE food/meals (typically 30–60 minutes prior, common for antacids like Pantoprazole or thyroid medication like Levothyroxine). PC stands for "Post Cibum", which means take AFTER meals (with or immediately following food to prevent stomach irritation, common for pain relievers like Ibuprofen or Paracetamol).',
    category: 'Dosage & Doctor Codes',
  },
  {
    id: 'faq-6',
    question: 'Is my uploaded prescription image stored or sold to third parties?',
    answer:
      'No. Theprescription enforces strict ephemeral processing. Uploaded prescription images are processed in volatile temporary memory solely to perform OCR, NLP matching, and generate your schedule. We do not store an archive of your private prescription papers, and we never sell, share, or monetize personal health data with pharmaceutical companies or advertisers.',
    category: 'Privacy & Data',
    popular: true,
  },
  {
    id: 'faq-7',
    question: 'Can Theprescription diagnose medical conditions or change my medicine dosage?',
    answer:
      'No. Theprescription is strictly an informational transcription and health-literacy decision-support tool. It cannot diagnose diseases, prescribe medications, or alter doctor-recommended doses. Any medication changes must be discussed with your licensed treating physician.',
    category: 'Clinical Safety',
    popular: true,
  },
  {
    id: 'faq-8',
    question: 'Why does Theprescription display active generic chemical names alongside brand names?',
    answer:
      'Brand names vary significantly across different pharmaceutical manufacturers, regions, and countries (for example, "Dolo 650", "Calpol", and "Tylenol" all contain Paracetamol/Acetaminophen). Showing the verified generic chemical molecule helps patients avoid accidental duplicate dosing, simplifies discussions with pharmacists, and enables finding cost-effective bioequivalent options.',
    category: 'Technology & Recognition',
  },
  {
    id: 'faq-9',
    question: 'How does the system prevent confusing Look-Alike / Sound-Alike (LASA) drugs?',
    answer:
      'Dangerous medication mix-ups frequently occur with sound-alike drug pairs (such as Hydralazine vs Hydroxyzine, or Metformin vs Metronidazole). Theprescription employs clinical entity validation that verifies drug strength, dosage form (tablets vs drops vs ointments), and co-prescribed clinical context to guard against erroneous substitutions.',
    category: 'Clinical Safety',
  },
  {
    id: 'faq-10',
    question: 'Does Theprescription work with printed clinic computer receipts and hospital discharge summaries?',
    answer:
      'Yes. While our algorithms are specially tuned for fast-cursive doctor handwriting, Theprescription also deciphers printed digital e-prescriptions, outpatient clinic receipts, discharge medication orders, and veterinary prescriptions with high accuracy.',
    category: 'Features & Usage',
  },
  {
    id: 'faq-11',
    question: 'What photo quality or camera angle provides the best deciphering results?',
    answer:
      'For maximum accuracy:\n1. Ensure good overhead lighting without heavy hand shadows.\n2. Lay the prescription paper flat on a contrasting surface.\n3. Frame the camera directly parallel to the paper (avoid steep angles).\n4. Ensure the camera is focused sharply on the handwritten medicine lines and doctor signature.',
    category: 'Features & Usage',
  },
  {
    id: 'faq-12',
    question: 'How do I use the Printable Medication Card?',
    answer:
      'Once your prescription is parsed, tap the "Print Medication Card" button in the top navigation or on the results page. The app generates a formatted, high-contrast pocket reference card with morning, afternoon, evening, and bedtime checkboxes, dosage notes, and food instructions that can be printed or pinned to your refrigerator for daily adherence.',
    category: 'Features & Usage',
  },
  {
    id: 'faq-13',
    question: 'Can I search for a medicine manually without uploading a prescription?',
    answer:
      'Yes! Navigate to the "Medicine Lookup" tab in the header. You can type any brand name or active generic salt (such as "Amoxicillin", "Metformin", "Atorvastatin", or "Pantoprazole") to view therapeutic category, standard usage guidelines, common side effects, and precautions.',
    category: 'Features & Usage',
  },
  {
    id: 'faq-14',
    question: 'What should I do if the AI output conflicts with what my doctor verbally told me?',
    answer:
      'Always follow the direct verbal and clinical instructions of your prescribing physician or dispensing pharmacist. Software transcription is an assistive reference tool; your healthcare provider possesses the full clinical context of your medical history.',
    category: 'Clinical Safety',
    popular: true,
  },
  {
    id: 'faq-15',
    question: 'Does Theprescription require creating an account or paying a subscription fee?',
    answer:
      'No. Theprescription is free and accessible without mandatory account registration. You can immediately upload or take a photo of your prescription to review your medication directions safely.',
    category: 'Privacy & Data',
  },
  {
    id: 'faq-16',
    question: 'Can Theprescription detect lab tests and diagnostic scans prescribed on the paper?',
    answer:
      'Yes! Prescriptions frequently include lab investigations alongside medications (such as CBC, HbA1c, Lipid Profile, Thyroid Panel, Kidney Function Tests, or Ultrasound). Theprescription extracts these diagnostic tests into a dedicated "Lab Investigations" panel with clinical purpose descriptions.',
    category: 'Technology & Recognition',
  },
  {
    id: 'faq-17',
    question: 'What do route abbreviations like "PO", "SL", or "PR" mean?',
    answer:
      'These abbreviations describe how the medicine should be administered:\n• "PO" (Per Os): By mouth / swallowed orally with water.\n• "SL" (Sublingual): Placed under the tongue to dissolve (e.g. Nitroglycerin tablets for chest discomfort).\n• "Top" (Topical): Applied directly to the skin, eye, or ear (creams, gels, or drops).\n• "PR" (Per Rectum): Administered rectally (suppositories).\n• "Inh" (Inhalation): Inhaled through a spacer or nebulizer (asthma inhalers).\n• "SC" / "IM" / "IV": Injections (Subcutaneous, Intramuscular, or Intravenous).',
    category: 'Dosage & Doctor Codes',
  },
  {
    id: 'faq-18',
    question: 'Does Theprescription check for dangerous drug-drug interactions?',
    answer:
      'Yes. When multiple medications are deciphered on a single prescription, Theprescription checks for notable clinical contraindications (for example, concurrent use of dual NSAID painkillers like Ibuprofen + Naproxen that increase ulcer risk, or overlapping sedatives). Any potential risk is highlighted with an amber or red clinical safety advisory for discussion with your pharmacist.',
    category: 'Clinical Safety',
    popular: true,
  },
  {
    id: 'faq-19',
    question: 'What do common dosage form abbreviations like "Tab", "Cap", "Syp", and "Oint" mean?',
    answer:
      'Doctors frequently prepend dosage forms to medicine names:\n• "Tab" = Tablet (swallowed whole unless marked chewable or dispersible).\n• "Cap" = Capsule (gelatin capsule; never crush or open unless instructed).\n• "Syp" / "Susp" = Syrup or Oral Suspension (liquid formulation; shake well before measuring).\n• "Oint" / "Crm" = Ointment or Cream (for external topical application).\n• "Gtt" / "Drops" = Drops (for ophthalmic eye or otic ear instillation).',
    category: 'Dosage & Doctor Codes',
  },
  {
    id: 'faq-20',
    question: 'How does Theprescription handle decimal points and avoid 10-fold dosage errors?',
    answer:
      'Faint handwriting can easily turn "5.0 mg" into "50 mg", leading to dangerous overdoses. Following strict Joint Commission and FDA safety guidelines, our handwriting parser enforces "Do Not Use" trailing zero rules, verifies standard therapeutic ranges for each molecule, and flags abnormal dosage orders for explicit patient and pharmacist review.',
    category: 'Clinical Safety',
  },
  {
    id: 'faq-21',
    question: 'Does the system work if my prescription has wrinkles, creases, or folds?',
    answer:
      'Yes. The app includes an automated image pre-processing stage that adjusts contrast, straightens slight rotation angles, and filters linear crease shadows before passing ink strokes to our neural recognition pipeline.',
    category: 'Technology & Recognition',
  },
  {
    id: 'faq-22',
    question: 'What is the difference between a Brand Name and a Generic Name?',
    answer:
      'The "Generic Name" is the actual pharmacological active chemical ingredient that produces the medical effect (e.g. Paracetamol, Metformin, Amoxicillin). The "Brand Name" is the commercial trade name chosen by a specific pharmaceutical manufacturer (e.g. Tylenol, Glucophage, Augmentin). Both contain the bioequivalent therapeutic chemical.',
    category: 'Technology & Recognition',
  },
  {
    id: 'faq-23',
    question: 'How does Theprescription handle pediatric (children\'s) and geriatric (senior) dosages?',
    answer:
      'Pediatric medications are often dosed by exact body weight (e.g. mg/kg/dose) in oral syrups or drops. Theprescription identifies liquid formulations, dosage dropper amounts, and flags pediatric prescriptions with a dedicated reminder that children\'s doses must be double-checked with calibrated dosing syringes rather than kitchen spoons.',
    category: 'Clinical Safety',
  },
  {
    id: 'faq-24',
    question: 'Can I print or save a PDF of my medication schedule for a caregiver or family member?',
    answer:
      'Yes! Tap the "Print Medication Card" button. You can print directly to any connected home printer or save as a clean, high-contrast PDF. The card includes large text, meal instructions, timing checkboxes, and emergency notes designed for easy bedside or refrigerator reference.',
    category: 'Features & Usage',
    popular: true,
  },
  {
    id: 'faq-25',
    question: 'What should I do if my prescription is written in another language or mixed English?',
    answer:
      'Doctors around the world frequently combine English drug trade names with regional shorthand or Latin abbreviations. Theprescription is trained across international prescription styles (including Indian, UK NHS, US, Australian, Middle Eastern, and Southeast Asian clinical layouts).',
    category: 'Technology & Recognition',
  },
  {
    id: 'faq-26',
    question: 'How do I report a transcription error or suggest a missing local medicine?',
    answer:
      'You can use the Human-in-the-Loop "Edit / Confirm" button directly on the medicine card to correct any name, or visit our "Contact Us" page and select "Prescription Feedback" to submit the brand name so our pharmacology team can index it in the next catalog update.',
    category: 'Features & Usage',
  },
];
