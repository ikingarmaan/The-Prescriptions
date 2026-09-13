/**
 * Frequently Asked Questions (FAQ) database for Theprescription.
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  popular?: boolean;
  tags?: string[];
}

export const FAQ_DATABASE: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does Theprescription decipher messy doctor handwriting?',
    answer:
      'Theprescription employs a specialized 5-stage clinical handwriting recognition pipeline. Rather than treating a prescription as generic text, our model analyzes cursive pen stroke ligatures, spatial document geometry, Latin frequency shorthand (like 1-0-1 or BD), and metric dosage boundaries. The decoded tokens are then cross-referenced against standard pharmacopeia catalogs to ensure clinical accuracy.',
    category: 'Technology & Recognition',
    popular: true,
    tags: ['handwriting', 'ocr', 'ai', 'cursive'],
  },
  {
    id: 'faq-2',
    question: 'What do doctor codes like 1-0-1, OD, BD, and TDS mean?',
    answer:
      'These are traditional Latin prescription abbreviations specifying daily frequency: "OD" (Once Daily / 1-0-0) means morning; "BD" or "BID" (Twice Daily / 1-0-1) means morning and night; "TDS" or "TID" (Three Times Daily / 1-1-1) means morning, afternoon, and night; "HS" means at bedtime; and "SOS" means only as needed in emergency or distress.',
    category: 'Dosage & Doctor Codes',
    popular: true,
    tags: ['codes', 'latin', 'abbreviations', 'timing'],
  },
  {
    id: 'faq-3',
    question: 'Is Theprescription a substitute for a doctor or pharmacist?',
    answer:
      'No. Theprescription is an educational and patient decision-support assistant designed to improve medication literacy and clarify difficult handwriting. It does not provide definitive medical diagnoses or prescribe treatment. Always verify your medications and instructions with your treating physician or licensed dispensing pharmacist.',
    category: 'Clinical Safety',
    popular: true,
    tags: ['safety', 'disclaimer', 'doctor', 'pharmacist'],
  },
  {
    id: 'faq-4',
    question: 'What should I do if a medicine name cannot be understood?',
    answer:
      'If pen strokes are too faint, illegible, or obscured, our system will transparently flag: "Apologies, we didn\'t understand this medicine." When this occurs, our Human-in-the-Loop tool allows you to type what the doctor told you, or prompts you to bring the slip directly to your local pharmacy for verification before taking any doses.',
    category: 'Clinical Safety',
    popular: false,
    tags: ['unclear', 'verification', 'pharmacist', 'safety'],
  },
  {
    id: 'faq-5',
    question: 'How is my prescription photo and health data protected?',
    answer:
      'We practice ephemeral, encrypted processing. Uploaded prescription images and transcribed text are processed in volatile memory for your immediate session and are never sold, monetized, or stored in public training databases.',
    category: 'Privacy & Data',
    popular: false,
    tags: ['privacy', 'encryption', 'hipaa', 'security'],
  },
  {
    id: 'faq-6',
    question: 'Can I download and print a physical medication routine card?',
    answer:
      'Yes! Once your prescription is deciphered, click the "Print Medication Card" button. You can export a beautifully formatted high-contrast PDF, standalone offline HTML sheet, or text summary with meal schedules, food rules, and emergency contacts to stick on your refrigerator.',
    category: 'Features & Usage',
    popular: true,
    tags: ['pdf', 'print', 'routine', 'download'],
  },
  {
    id: 'faq-7',
    question: 'How does the system distinguish between brand names and active generic salts?',
    answer:
      'Doctors frequently write commercial brand names (e.g., Augmentin, Lipitor, Pan 40) rather than chemical salts. Our built-in pharmaceutical catalog automatically detects brand names, retrieves the manufacturer company name, identifies the active pharmacological molecules, and lists bioequivalent generic alternatives.',
    category: 'Technology & Recognition',
    popular: false,
    tags: ['generic', 'brand', 'molecules', 'catalog'],
  },
  {
    id: 'faq-8',
    question: 'Can Theprescription detect ordered lab tests and blood work?',
    answer:
      'Yes! Many doctor prescriptions include diagnostic lab tests (such as CBC, Lipid Profile, Thyroid Panel, or X-Rays). Theprescription automatically extracts these into a dedicated Lab Tests section detailing preparation rules, such as overnight fasting requirements.',
    category: 'Features & Usage',
    popular: false,
    tags: ['lab tests', 'blood work', 'fasting', 'diagnostics'],
  },
];
