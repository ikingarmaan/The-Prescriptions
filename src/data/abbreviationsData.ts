export interface MedicalAbbreviation {
  abbr: string;
  englishMeaning: string;
  fullLatin?: string;
  category:
    | "frequency"
    | "timing"
    | "instructions"
    | "route"
    | "form"
    | "clinical_directive"
    | "lab_test"
    | "measurement";
  example: string;
}

export const MEDICAL_ABBREVIATIONS: MedicalAbbreviation[] = [
  // Frequency
  {
    abbr: "OD",
    englishMeaning: "Once daily (usually morning)",
    fullLatin: "Omni die",
    category: "frequency",
    example: "Tab. Telma 40mg - OD x 30 days",
  },
  {
    abbr: "BD / BID",
    englishMeaning: "Twice a day (morning and night, ~12 hrs apart)",
    fullLatin: "Bis in die",
    category: "frequency",
    example: "Cap. Augmentin 625 - 1 tab BD x 5 days",
  },
  {
    abbr: "TDS / TID",
    englishMeaning: "Three times a day (morning, afternoon, night, ~8 hrs apart)",
    fullLatin: "Ter die sumendum",
    category: "frequency",
    example: "Tab. Paracetamol 650mg - TDS for fever",
  },
  {
    abbr: "QDS / QID",
    englishMeaning: "Four times a day (~6 hrs apart)",
    fullLatin: "Quater in die",
    category: "frequency",
    example: "Syp. Sucralfate 10ml - QID before meals",
  },
  {
    abbr: "1-0-1",
    englishMeaning: "One in the morning, none in afternoon, one at night",
    fullLatin: "Morning - Afternoon - Night metric",
    category: "frequency",
    example: "Augmentin 625 [1-0-1] after food",
  },
  {
    abbr: "1-0-0",
    englishMeaning: "One dose in the morning only",
    fullLatin: "Morning metric",
    category: "frequency",
    example: "Pantocid 40 [1-0-0] empty stomach",
  },
  {
    abbr: "0-0-1",
    englishMeaning: "One dose at bedtime / night only",
    fullLatin: "Night metric",
    category: "frequency",
    example: "Atorva 10mg [0-0-1] after dinner",
  },
  {
    abbr: "QOD",
    englishMeaning: "Every other day / alternate days",
    fullLatin: "Quaque altera die",
    category: "frequency",
    example: "Tab. Vitamin D3 60,000 IU - QOD for 3 doses",
  },

  // Timing
  {
    abbr: "AC",
    englishMeaning: "Before meals / empty stomach",
    fullLatin: "Ante cibum",
    category: "timing",
    example: "Cap. Omeprazole 20mg - 1 cap AC in morning",
  },
  {
    abbr: "PC",
    englishMeaning: "After meals / food",
    fullLatin: "Post cibum",
    category: "timing",
    example: "Tab. Combiflam - 1 tab PC (never on empty stomach)",
  },
  {
    abbr: "HS",
    englishMeaning: "At bedtime / hour of sleep",
    fullLatin: "Hora somni",
    category: "timing",
    example: "Tab. Montair-LC - 1 tab HS x 10 days",
  },
  {
    abbr: "OM",
    englishMeaning: "Every morning",
    fullLatin: "Omni mane",
    category: "timing",
    example: "Tab. Thyronorm 50mcg - OM fasting",
  },
  {
    abbr: "ON",
    englishMeaning: "Every night",
    fullLatin: "Omni nocte",
    category: "timing",
    example: "Tab. Clonazepam 0.5mg - ON",
  },

  // Instructions
  {
    abbr: "SOS / PRN",
    englishMeaning: "Take only when necessary or as needed",
    fullLatin: "Si opus sit / Pro re nata",
    category: "instructions",
    example: "Tab. Dolo 650mg - 1 tab SOS for temp > 100°F",
  },
  {
    abbr: "Stat",
    englishMeaning: "Immediately / right now",
    fullLatin: "Statim",
    category: "instructions",
    example: "Tab. Ondansetron 4mg - 1 tab Stat for nausea",
  },
  {
    abbr: "NR",
    englishMeaning: "No refill without a new prescription",
    fullLatin: "Non repetatur",
    category: "instructions",
    example: "Antibiotic course - NR",
  },

  // Route
  {
    abbr: "PO",
    englishMeaning: "By mouth / orally",
    fullLatin: "Per os",
    category: "route",
    example: "Tab. Amoxicillin 500mg - PO TDS",
  },
  {
    abbr: "SL",
    englishMeaning: "Sublingually (dissolve under tongue)",
    fullLatin: "Sub lingua",
    category: "route",
    example: "Tab. Sorbitrate 5mg - SL for acute chest discomfort",
  },
  {
    abbr: "IV",
    englishMeaning: "Intravenous injection or infusion",
    fullLatin: "Intra venam",
    category: "route",
    example: "Inj. Pantoprazole 40mg - IV push",
  },
  {
    abbr: "IM",
    englishMeaning: "Intramuscular injection into muscle",
    fullLatin: "Intra musculum",
    category: "route",
    example: "Inj. Tetanus Toxoid (TT) 0.5ml - IM Stat",
  },

  // Form
  {
    abbr: "Tab",
    englishMeaning: "Tablet",
    category: "form",
    example: "Tab. Azithral 500mg",
  },
  {
    abbr: "Cap",
    englishMeaning: "Capsule",
    category: "form",
    example: "Cap. Amoxyclav 625mg",
  },
  {
    abbr: "Syp",
    englishMeaning: "Syrup / Oral liquid suspension",
    category: "form",
    example: "Syp. Ascoril-D 100ml - 5ml TDS",
  },
  {
    abbr: "Oint",
    englishMeaning: "Ointment (topical)",
    category: "form",
    example: "Oint. Mupirocin 2% - apply twice daily",
  },

  // Clinical Directives
  {
    abbr: "Rx",
    englishMeaning: "Prescription recipe / \"Take thou\"",
    fullLatin: "Recipe",
    category: "clinical_directive",
    example: "℞ Header on every formal doctor slip",
  },
  {
    abbr: "Sig",
    englishMeaning: "Write on label / patient directions",
    fullLatin: "Signa",
    category: "clinical_directive",
    example: "Sig: 1 puff twice daily",
  },

  // Lab Tests
  {
    abbr: "CBC",
    englishMeaning: "Complete Blood Count (RBC, WBC, Platelets, Hemoglobin)",
    category: "lab_test",
    example: "Adv: CBC with ESR to evaluate infection",
  },
  {
    abbr: "LFT",
    englishMeaning: "Liver Function Test (Bilirubin, SGOT, SGPT, ALP)",
    category: "lab_test",
    example: "Routine LFT monitoring before statin therapy",
  },
  {
    abbr: "KFT / RFT",
    englishMeaning: "Kidney / Renal Function Test (Creatinine, Blood Urea, BUN)",
    category: "lab_test",
    example: "KFT check for renal clearance",
  },
  {
    abbr: "HbA1c",
    englishMeaning: "Glycated Hemoglobin (3-month average blood glucose)",
    category: "lab_test",
    example: "HbA1c every 3 months for diabetes control",
  },

  // Measurement Units
  {
    abbr: "mg",
    englishMeaning: "Milligram (1/1000th of a gram)",
    category: "measurement",
    example: "500mg, 40mg, 10mg",
  },
  {
    abbr: "mcg / μg",
    englishMeaning: "Microgram (1/1,000,000th of a gram)",
    category: "measurement",
    example: "Thyronorm 50mcg, Fentanyl 25mcg",
  },
  {
    abbr: "ml",
    englishMeaning: "Milliliter (liquid volume)",
    category: "measurement",
    example: "5ml spoonful, 10ml measuring cup",
  },
  {
    abbr: "IU",
    englishMeaning: "International Units (biological activity)",
    category: "measurement",
    example: "Insulin 10 IU, Vitamin D3 60,000 IU",
  },
];
