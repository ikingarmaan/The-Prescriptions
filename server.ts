import express, { type Request, type Response } from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { postProcessPrescriptionResultWithNLP } from "./src/utils/smartNlpEngine";

dotenv.config();

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    doctorSpecialtyOrClinic: {
      type: Type.STRING,
      description: "Detected clinic, hospital, or doctor specialty name if available, otherwise 'General Practice'",
    },
    prescriptionDate: {
      type: Type.STRING,
      description: "Date written on prescription if visible, otherwise 'Not specified'",
    },
    suspectedCondition: {
      type: Type.STRING,
      description: "Probable medical diagnosis or symptoms being treated by this medicine combination",
    },
    generalExplanation: {
      type: Type.STRING,
      description: "Warm, empathetic, plain-English summary explaining why the doctor prescribed these medicines together and how they work as a complete treatment plan.",
    },
    medicines: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "Brand name or medicine name as written (e.g., Augmentin 625, Pantocid 40). If the handwriting is illegible or you are unable to understand the medicine, DO NOT output 'Unidentified Medication (Requires Pharmacist Verification)' or similar robotic text; instead write: 'Apologies, we didn\'t understand this medicine'.",
          },
          genericName: { type: Type.STRING, description: "Active chemical ingredient(s) and salt (e.g., Amoxicillin + Clavulanic Acid)" },
          form: { type: Type.STRING, description: "Tablet, Capsule, Syrup, Eye Drops, Inhaler, Ointment, Injection, etc." },
          strength: { type: Type.STRING, description: "Dosage strength, e.g. 500mg, 40mg, 10ml, 5mg/5ml" },
          dosage: { type: Type.STRING, description: "Quantity per dose, e.g., '1 tablet', '2 puffs', '10 ml'" },
          frequency: { type: Type.STRING, description: "Daily frequency explained in plain English, e.g., 'Twice daily (Morning & Night)'" },
          timingCode: { type: Type.STRING, description: "Original shorthand code decoded, e.g., 'BD / 1-0-1' or 'OD / 1-0-0' or 'TDS'" },
          mealRelation: {
            type: Type.STRING,
            description: "Strictly one of: 'before_meal', 'after_meal', 'with_meal', 'empty_stomach', 'anytime'",
          },
          mealRelationText: {
            type: Type.STRING,
            description: "Exact plain-English instructions on when to take relative to food (e.g., 'Take 30 minutes before breakfast on an empty stomach' or 'Take immediately after food to prevent stomach irritation')",
          },
          duration: { type: Type.STRING, description: "Prescribed duration, e.g., '5 days', '10 days', 'Continuous / Long term'" },
          scheduleTimes: {
            type: Type.OBJECT,
            properties: {
              morning: { type: Type.BOOLEAN },
              afternoon: { type: Type.BOOLEAN },
              evening: { type: Type.BOOLEAN },
              bedtime: { type: Type.BOOLEAN },
              asNeeded: { type: Type.BOOLEAN },
            },
            required: ["morning", "afternoon", "evening", "bedtime", "asNeeded"],
          },
          purposeAndUsage: {
            type: Type.STRING,
            description: "Comprehensive, clear explanation of what this medicine treats, how it helps the patient feel better, and its therapeutic goal.",
          },
          howToTake: {
            type: Type.STRING,
            description: "Practical instructions on swallowing, hydration, measuring syrup, posture, not crushing enteric tablets, etc.",
          },
          precautions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Key safety guidelines, e.g., complete antibiotic course, avoid alcohol, sun sensitivity.",
          },
          commonSideEffects: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Mild, frequent side effects the patient might notice (e.g., mild nausea, drowsiness).",
          },
          whenToContactDoctor: {
            type: Type.STRING,
            description: "Red-flag symptoms requiring immediate medical advice.",
          },
        },
        required: [
          "name",
          "genericName",
          "form",
          "strength",
          "dosage",
          "frequency",
          "timingCode",
          "mealRelation",
          "mealRelationText",
          "duration",
          "scheduleTimes",
          "purposeAndUsage",
          "howToTake",
          "precautions",
          "commonSideEffects",
        ],
      },
    },
    labTests: {
      type: Type.ARRAY,
      description: "Any laboratory tests, blood work, radiology, ECG, or diagnostic investigations ordered by the doctor on this prescription",
      items: {
        type: Type.OBJECT,
        properties: {
          testName: { type: Type.STRING, description: "Name of the test (e.g., Complete Blood Count (CBC), Chest X-Ray PA View, Fasting Blood Sugar, Serum Creatinine, Urine R/M)" },
          category: {
            type: Type.STRING,
            description: "Category: 'Blood Investigation', 'Radiology / Imaging', 'Urine / Stool', 'Cardiology / ECG', 'Microbiology / Culture', 'Biochemistry', 'Other'",
          },
          whyDoctorOrdered: { type: Type.STRING, description: "Clinical reason for ordering this test based on symptoms or monitoring" },
          preparationInstructions: { type: Type.STRING, description: "Patient preparation (e.g. 10-12 hours overnight fasting, full bladder for ultrasound, no special prep)" },
          sampleRequired: { type: Type.STRING, description: "Blood sample, midstream urine, radiography, etc." },
          fastingRequired: { type: Type.BOOLEAN, description: "True if fasting is required" },
          urgency: { type: Type.STRING, description: "routine, urgent, follow_up" },
          commonNormalRangeContext: { type: Type.STRING, description: "Contextual guidance on what results check" },
        },
        required: [
          "testName",
          "category",
          "whyDoctorOrdered",
          "preparationInstructions",
          "sampleRequired",
          "fastingRequired",
          "urgency",
        ],
      },
    },
    chronologicalTakingPlan: {
      type: Type.ARRAY,
      description: "Step-by-step master sequence showing the patient exactly when to take which medicine throughout the day from waking up to bedtime",
      items: {
        type: Type.OBJECT,
        properties: {
          timeLabel: { type: Type.STRING, description: "e.g., '7:00 AM – Before Breakfast', '8:30 AM – After Breakfast', '1:30 PM – After Lunch', '8:00 PM – After Dinner', '10:00 PM – Bedtime', 'As Needed (SOS)'" },
          slotName: { type: Type.STRING, description: "e.g., 'morning_empty_stomach', 'morning_after_breakfast', 'afternoon_after_lunch', 'night_after_dinner', 'bedtime', 'as_needed'" },
          title: { type: Type.STRING, description: "Short title like 'Morning: Empty Stomach (Before Food)'" },
          description: { type: Type.STRING, description: "Timing note, e.g. 'Take 30-45 minutes before eating or drinking coffee'" },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                medicineName: { type: Type.STRING },
                genericName: { type: Type.STRING },
                dosage: { type: Type.STRING },
                instructions: { type: Type.STRING },
                isCriticalTiming: { type: Type.BOOLEAN },
              },
              required: ["medicineName", "genericName", "dosage", "instructions"],
            },
          },
        },
        required: ["timeLabel", "slotName", "title", "description", "items"],
      },
    },
    scheduleSummary: {
      type: Type.OBJECT,
      properties: {
        morning: { type: Type.ARRAY, items: { type: Type.STRING } },
        afternoon: { type: Type.ARRAY, items: { type: Type.STRING } },
        evening: { type: Type.ARRAY, items: { type: Type.STRING } },
        bedtime: { type: Type.ARRAY, items: { type: Type.STRING } },
        asNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["morning", "afternoon", "evening", "bedtime", "asNeeded"],
    },
    potentialInteractionsOrSpacingAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Crucial spacing rules between medicines (e.g., space probiotics 2 hrs from antibiotics, antacids 2 hrs apart).",
    },
    foodAndDietaryRules: {
      type: Type.OBJECT,
      properties: {
        foodsToEat: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Supportive foods (e.g. curd/yogurt, warm fluids, clear soups, electrolytes)" },
        foodsToAvoidOrLimit: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Foods or drinks that interact or worsen condition (e.g. alcohol, grapefruit, oily/spicy foods, caffeine)" },
        hydrationAdvice: { type: Type.STRING, description: "Daily fluid and water intake recommendations" },
      },
      required: ["foodsToEat", "foodsToAvoidOrLimit", "hydrationAdvice"],
    },
    lifestyleAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Recovery advice such as hydration, dietary restrictions, rest, and sleep.",
    },
    unclearOrAmbiguousNotes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Any faint or illegible doctor handwriting notes. Never use robotic phrases like 'Unidentified Medication (Requires Pharmacist Verification)'; state politely what was unclear, e.g. 'Apologies, we didn\'t understand the medicine on this line due to unclear doctor handwriting'.",
    },
    unableToDecipher: {
      type: Type.BOOLEAN,
      description: "Set to TRUE if the handwriting is unreadable, ambiguous, or if any medicine cannot be recognized with confidence. If true, do not output high confidence.",
    },
    multiEngineEnsemble: {
      type: Type.OBJECT,
      description: "Detailed 5-stage clinical handwriting verification metadata resolving cursive ligatures, document geometry, Latin shorthand, dosage metrics, and pharmacopeia consensus. IMPORTANT: Never include proprietary OCR model names.",
      properties: {
        overallConfidence: { type: Type.NUMBER, description: "Combined clinical verification confidence score (0.0 to 99.9). If handwriting is unreadable or medicine is not understood, set to 0.0 - NEVER show fake 80%+ accuracy when unable to understand!" },
        ensembleAgreementPercent: { type: Type.NUMBER, description: "Degree of token agreement across verification stages (0.0 to 100.0)" },
        engines: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              engineId: { type: Type.STRING, description: "stroke_ligature | document_layout | latin_shorthand | dosage_metrics | pharmacopeia_consensus" },
              engineName: { type: Type.STRING, description: "Human-readable clinical stage name (e.g. 'Neural Stroke & Cursive Ligature Analysis', 'Prescription Layout & Section Analyzer', etc.) - strictly NO proprietary OCR model names" },
              frameworkTag: { type: Type.STRING, description: "Functional focus tag, e.g. 'Cursive Ligature Attention', 'Document Geometry Hierarchy', 'Deep Sequence Lexicon Decoding', 'High-Precision Metric Boundaries', 'Multimodal Clinical Safety Engine'" },
              engineRole: { type: Type.STRING, description: "Specific role in the handwriting deciphering pipeline" },
              extractedSnippet: { type: Type.STRING, description: "Key raw or normalized tokens identified in this stage (no OCR brand names)" },
              confidence: { type: Type.NUMBER, description: "Confidence percentage (0-100)" },
              specialtyFocus: { type: Type.STRING, description: "Clinical specialty focus of this stage" },
              status: { type: Type.STRING, description: "completed | consensus_aligned" },
            },
            required: ["engineId", "engineName", "frameworkTag", "engineRole", "extractedSnippet", "confidence", "specialtyFocus", "status"],
          },
        },
        consensusTokens: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of key confirmed medical tokens (drugs, dosages, frequencies, lab tests) agreed upon by consensus",
        },
        resolvedAmbiguities: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Specific cursive ambiguities resolved (e.g. distinguishing 500mg vs 50mg, Augmentin vs Amoxicillin, OD vs BD) using clinical pharmacopeia",
        },
        arbitrationExplanation: {
          type: Type.STRING,
          description: "Clear clinical explanation of how the handwriting was decoded and verified across all stages without mentioning proprietary OCR model names",
        },
      },
      required: ["overallConfidence", "ensembleAgreementPercent", "engines", "consensusTokens", "resolvedAmbiguities", "arbitrationExplanation"],
    },
    medicalDisclaimer: {
      type: Type.STRING,
      description: "Clear standard medical safety reminder.",
    },
  },
  required: [
    "generalExplanation",
    "medicines",
    "labTests",
    "chronologicalTakingPlan",
    "scheduleSummary",
    "potentialInteractionsOrSpacingAdvice",
    "foodAndDietaryRules",
    "lifestyleAdvice",
    "multiEngineEnsemble",
    "medicalDisclaimer",
  ],
};

const singleMedicineSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    genericName: { type: Type.STRING },
    drugClass: { type: Type.STRING },
    primaryUses: { type: Type.ARRAY, items: { type: Type.STRING } },
    howItWorks: { type: Type.STRING },
    standardFormsAndStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    typicalDosageAndTiming: { type: Type.STRING },
    foodInstructions: { type: Type.STRING },
    mealRelation: { type: Type.STRING, description: "before_meal, after_meal, with_meal, empty_stomach, anytime" },
    precautionsAndWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
    commonSideEffects: { type: Type.ARRAY, items: { type: Type.STRING } },
    seriousSideEffectsToReport: { type: Type.ARRAY, items: { type: Type.STRING } },
    commonInteractionsToAvoid: { type: Type.ARRAY, items: { type: Type.STRING } },
    missedDoseAdvice: { type: Type.STRING },
    storageInstructions: { type: Type.STRING },
  },
  required: [
    "name",
    "genericName",
    "drugClass",
    "primaryUses",
    "howItWorks",
    "typicalDosageAndTiming",
    "foodInstructions",
    "precautionsAndWarnings",
    "commonSideEffects",
  ],
};

async function callGeminiWithRetry(params: {
  contents: any;
  config: any;
  primaryModel?: string;
}): Promise<string> {
  const ai = getGenAIClient();
  const modelsToTry = [
    params.primaryModel || "gemini-3.8-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
  ];
  let lastError: any = null;

  for (const model of modelsToTry) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const config = { ...params.config };
        // ThinkingLevel is only supported on Gemini 3 series models
        if (!model.startsWith("gemini-3") && config.thinkingConfig) {
          delete config.thinkingConfig;
        }
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config,
        });
        const text = response.text;
        if (text) {
          return text;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const isTransient =
          errMsg.includes("503") ||
          errMsg.includes("UNAVAILABLE") ||
          errMsg.includes("high demand") ||
          errMsg.includes("429") ||
          errMsg.includes("RESOURCE_EXHAUSTED");

        if (isTransient && attempt < 2) {
          // Backoff before retry
          await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
          continue;
        }
      }
    }
  }

  throw lastError || new Error("Failed to generate content from AI model.");
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10) || 3000;

  // Body parser with 25MB limit for high-res prescription photos
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb", extended: true }));

  // API Health Check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // API Endpoint: Analyze Prescription (Image or Text notes)
  app.post("/api/analyze-prescription", async (req: Request, res: Response) => {
    try {
      const {
        imageBase64,
        mimeType = "image/jpeg",
        textNotes,
        patientContext,
        ocrPretext,
        preprocessingReport,
        learnedCorrections,
      } = req.body;

      if (!imageBase64 && (!textNotes || !textNotes.trim())) {
        res.status(400).json({
          error: "Please provide either a prescription photo or written prescription notes.",
        });
        return;
      }

      const systemPrompt = `You are a certified Senior Clinical Pharmacist and Medical Prescription Decryption Expert with advanced expertise in deciphering doctor handwriting, pharmacology, diagnostic investigations, and patient safety.

Your task is to examine doctor prescriptions (which may contain cursive handwriting, abbreviations, Latin terms, and diagnostic orders) and provide a comprehensive, patient-friendly medical explanation.

CRITICAL 5-STAGE CLINICAL HANDWRITING & CONSENSUS ARCHITECTURE:
You operate as the primary Clinical Consensus Arbiter presiding over a 5-stage clinical handwriting recognition pipeline:
1. Stage 1 ('stroke_ligature'): Neural Stroke & Cursive Ligature Analysis - Resolves cursive loops, pen tilt, ascender/descender slurs, and handwritten brand prefixes.
2. Stage 2 ('document_layout'): Prescription Layout & Section Analyzer - Parses clinic letterhead, patient metadata, structured Rx medication order lines, and Adv/Inv diagnostic blocks.
3. Stage 3 ('latin_shorthand'): Medical Shorthand & Timing Decoder - Deep sequence decoding of compressed Latin medical shorthand and rapid doctor penmanship (1-0-1, OD, BD, TDS, AC, PC, HS, SOS).
4. Stage 4 ('dosage_metrics'): Dosage Metrics & Unit Precision Parser - High-precision extraction of dosage strengths (mg, mcg, ml, g, tab, cap), frequencies, and numeric treatment duration boundaries.
5. Stage 5 ('pharmacopeia_consensus'): Clinical Pharmacopeia Cross-Validation - Reconciles candidate hypotheses across all verification stages with certified pharmacology, therapeutic dosage limits, and drug safety databases.

SMART NLP POST-PROCESSING & DRUG NAME RECOVERY DIRECTIVES:
Even if doctor handwriting or OCR output is messy, illegible, or distorted, you MUST recover correct medicine names using:
1. Fuzzy matching (RapidFuzz equivalent) → fix common doctor and OCR spelling mistakes (e.g., "Amoxcillin" → "Amoxicillin", "Augmentn" → "Augmentin", "Paracetmol" → "Paracetamol", "Pantocit" → "Pantocid", "Azithromicin" → "Azithral / Azithromycin").
2. Brand → Generic mapping → For every detected brand name, automatically map to its exact generic active chemical salt combination (e.g., Augmentin → Amoxicillin + Clavulanic Acid, Pan-D → Pantoprazole + Domperidone, Dolo / Crocin → Paracetamol, Glycomet → Metformin, Telma → Telmisartan).
3. Medicine dictionary integration → include short forms (e.g. "Amox", "PCM", "Azith", "Panto", "Cipro", "Metfor"), misspellings, and regional trade names.
4. Confidence scoring → Always assess clarity as High / Medium / Low, noting any cursive ambiguity so patients are prompted to confirm when appropriate.

CRITICAL DIRECTIVE - HANDLING UNCLEAR / UNREADABLE MEDICINES:
- ONLY set "unableToDecipher": true if you are COMPLETELY unable to identify ANY medicine from the prescription (e.g. completely illegible scribbles across the whole page, blank or corrupted image, or zero recognizable medicine names).
- If at least ONE medicine can be read or recognized on the prescription, set "unableToDecipher": false! Do NOT mark the whole prescription as undecipherable just because one line or note was unclear.
- If a specific individual line or word is completely illegible scribble that cannot be identified as any known pharmaceutical drug:
  * Only for that specific unreadable line, set its medicine name to "Apologies, we didn't understand this medicine" and genericName to "Handwriting unclear".
  * For all other recognized medicines, extract their exact names, dosages, and instructions normally.
- In 'multiEngineEnsemble':
  * If the entire prescription was completely undecipherable with no recognized medicines: set 'overallConfidence' to 0 and 'ensembleAgreementPercent' to 0.
  * If valid medicines were successfully recognized: calculate real confidence (e.g. 92.0% - 99.4%) based on token clarity. Never zero out confidence when valid medicines were identified!

CRITICAL DIRECTIVE - NO OCR MODEL NAMES TO USERS:
Do NOT mention any proprietary, open-source, or third-party OCR model names (such as TrOCR, Donut, Paddle, Tesseract, HuggingFace, Baidu, PyTorch, etc.) anywhere in your output, explanations, snippets, or JSON fields. Always identify stages strictly by their clinical function: "Neural Stroke & Cursive Ligature Analysis", "Prescription Layout & Section Analyzer", "Medical Shorthand & Timing Decoder", "Dosage Metrics & Unit Precision Parser", and "Clinical Pharmacopeia Cross-Validation".

You MUST populate the 'multiEngineEnsemble' object in the JSON response:
- If medicines were successfully recognized: provide realistic overall confidence (e.g. 94.0 - 99.4%) and agreement percent.
- If handwriting was NOT recognized or unreadable: set overallConfidence to 0.0 and ensembleAgreementPercent to 0.0. Do NOT show fake 80% accuracy!
- Provide all 5 stage objects ('stroke_ligature', 'document_layout', 'latin_shorthand', 'dosage_metrics', 'pharmacopeia_consensus') detailing their extracted snippets, individual confidence, and specialty focuses.
- List confirmed consensus tokens (e.g., "Augmentin 625", "1-0-1", "PC", "CBC", "Pantocid 40").
- Document any resolved ambiguities (e.g. "Distinguished cursive 'Augm' from 'Amox' based on 625mg dosage strength matching Augmentin").

EXPANDED MEDICAL ABBREVIATION & TERMINOLOGY KNOWLEDGE:
You possess exhaustive knowledge of Latin prescription shorthand and clinical codes:
- Frequency & Timing:
  * OD / qd = Omni Die (Once daily, every 24h at same time)
  * BD / BID = Bis in Die (Twice daily, ~12h apart)
  * TDS / TID = Ter Die Sumendum (Three times daily, ~8h apart)
  * QID / QDS = Quater in Die (Four times daily, ~6h apart)
  * Q4H / Q6H / Q8H = Every 4, 6, or 8 hours
  * QOD = Quaque Altera Die (Every other day)
  * 1-0-1 = Morning 1, Afternoon 0, Night 1
  * 1-0-0 = Morning only
  * 0-0-1 = Night only
  * 1-1-1 = Morning 1, Afternoon 1, Night 1
  * AC = Ante Cibum (Before meals / empty stomach, 30-45 mins before food)
  * PC = Post Cibum (After meals, with or immediately after food)
  * HS / QHS = Hora Somni (At bedtime)
  * BBF = Before Breakfast
  * ABF = After Breakfast
  * Mane / Nocte = Morning / Night
  * SOS / PRN = Si Opus Sit / Pro Re Nata (As needed / only when symptoms occur)
  * Stat = Statim (Immediately / single loading dose)
  * ad lib. = Ad libitum (Freely / as desired)
- Routes & Formulations:
  * PO = Per Os (By mouth)
  * SL = Sublingual (Under tongue)
  * PR = Per Rectum (Rectally)
  * SC / SQ = Subcutaneous injection
  * IM = Intramuscular injection
  * IV / IVP / IVPB = Intravenous infusion / push
  * Top. = Topical application
  * Inh. / Neb. = Inhalation / Nebulizer
  * Tab = Tablet, Cap = Capsule, Syp = Syrup, Susp = Suspension, Oint/Ung = Ointment, Supp = Suppository, Gtt = Drops, Pulv = Powder sachet
- Sidedness:
  * OD = Oculus Dexter (Right eye)
  * OS = Oculus Sinister (Left eye)
  * OU = Oculus Uterque (Both eyes)
  * AD = Auris Dextra (Right ear), AS = Left ear, AU = Both ears
- Clinical Directives:
  * Rx = Recipe (Take thou)
  * Sig / S. = Signa (Label directions)
  * Mitte = Dispense this quantity
  * c = Cum (With)
  * s = Sine (Without)
  * aa = Ana (Of each in equal parts)
  * qs = Quantum Sufficiat (As much as suffices)
  * NPO = Nil Per Os (Nothing by mouth)
  * c/o = Complaining of, k/c/o = Known case of, h/o = History of, d/d = Differential diagnosis, r/o = Rule out, f/u = Follow up
  * Adv / Inv / Ix = Advice / Investigations ordered

LABORATORY & DIAGNOSTIC TESTS DETECTION:
Scan the prescription thoroughly for any diagnostic workup written under "Adv:", "Inv:", "Investigations:", "Lab:", "Tests:", "Rx/Ix:":
- Complete Blood Count (CBC / TLC / DLC), ESR, CRP
- Liver Function Test (LFT: SGOT, SGPT, Bilirubin, ALP, Albumin)
- Kidney / Renal Function Test (KFT / RFT: Creatinine, BUN, Uric Acid, eGFR)
- Fasting & Post-Prandial Blood Sugar (FBS, PPBS), HbA1c
- Fasting Lipid Profile (Total Cholesterol, LDL, HDL, Triglycerides)
- Chest X-Ray (CXR PA View), 12-Lead ECG / EKG, 2D Echocardiography, TMT
- Ultrasound (USG Abdomen & Pelvis), CT / HRCT Chest
- Urine Routine & Microscopy (Urine R/M), Urine Culture & Sensitivity (Urine C/S)
- Stool Routine (Stool R/M), Serum Electrolytes (Na/K/Cl), Thyroid Profile (TSH, FT3, FT4)
- Serum Ferritin, Vitamin D3, Vitamin B12, D-Dimer, Cardiac Troponin, PT/INR, PSA, RA Factor, Anti-CCP, ANA.

CHRONOLOGICAL MASTER TAKING PLAN:
Generate an exact, patient-centric 'chronologicalTakingPlan' from waking to sleep (e.g. Morning Empty Stomach, Morning Post-Breakfast, Afternoon Post-Lunch, Evening, Bedtime, As-Needed).

FOOD, DIETARY & DRUG INTERACTION RULES:
Provide clear dietary instructions (probiotics/yogurt, hydration, foods to avoid like alcohol or grapefruit) and spacing intervals (e.g., antacids vs antibiotics 2 hours apart).`;

      const parts: any[] = [];

      // Multimodal image part if provided
      if (imageBase64) {
        let cleanBase64 = imageBase64;
        let detectedMime = mimeType;
        const match = imageBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (match) {
          detectedMime = match[1];
          cleanBase64 = match[2];
        }

        parts.push({
          inlineData: {
            mimeType: detectedMime || "image/jpeg",
            data: cleanBase64,
          },
        });
      }

      let userPrompt = "Please analyze this doctor prescription thoroughly.";
      if (ocrPretext && ocrPretext.trim()) {
        userPrompt += `\n\n[OCR Pre-Extracted Handwriting Tokens]:\n"""\n${ocrPretext.trim()}\n"""\n(Cross-reference these extracted OCR text tokens with the image strokes to ensure 100% handwriting accuracy).`;
      }
      if (textNotes && textNotes.trim()) {
        userPrompt += `\n\nPrescription Notes / Doctor Text provided:\n"""\n${textNotes.trim()}\n"""`;
      }
      if (patientContext && patientContext.trim()) {
        userPrompt += `\n\nPatient Context & Concerns:\n"""\n${patientContext.trim()}\n"""`;
      }
      if (preprocessingReport) {
        userPrompt += `\n\n[Advanced Image Preprocessing & Handwriting Segmentation Analysis]:\n` +
          `- Noise reduction: Completed (3x3 spatial filter + speckle elimination)\n` +
          `- Contrast enhancement: Boosted ink darkness by ${preprocessingReport.contrastEnhancementFactor || '1.6'}x\n` +
          `- Deskewing: Straightened tilted text lines by ${preprocessingReport.skewAngle || 0}°\n` +
          `- Adaptive thresholding: Bradley-Roth integral binarization computed\n` +
          `- Line & Word Segmentation: ${preprocessingReport.totalLinesDetected || preprocessingReport.lines?.length || 0} distinct text lines and ${preprocessingReport.totalWordsDetected || 0} word spans detected.\n` +
          `Carefully review the prescription line-by-line across all segmented sections to capture every medication, dosage strength, Latin abbreviation, and diagnostic investigation.`;
      }

      if (learnedCorrections && Array.isArray(learnedCorrections) && learnedCorrections.length > 0) {
        userPrompt += `\n\n[Human-in-the-Loop Learned Doctor Handwriting Patterns (Site Trained Memory)]:`;
        for (const corr of learnedCorrections.slice(0, 12)) {
          userPrompt += `\n- Ambiguous Handwriting token "${corr.rawToken}" was previously patient-verified as "${corr.confirmedMedicine}" (${corr.confirmedGeneric || ''})`;
        }
        userPrompt += `\nIf you see similar cursive handwriting strokes or short-forms in this prescription, match them with high priority to avoid dangerous misidentification.`;
      }

      parts.push({ text: userPrompt });

      const responseText = await callGeminiWithRetry({
        contents: { parts },
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: analysisSchema,
          temperature: 0.1,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const parsedData = JSON.parse(responseText.trim());
      // Apply Smart NLP Post-Processing layer (RapidFuzz, Brand->Generic, Dictionary, Confidence Scoring)
      const enrichedData = postProcessPrescriptionResultWithNLP(parsedData);
      if (preprocessingReport) {
        enrichedData.imagePreprocessingReport = preprocessingReport;
      }
      res.json({ success: true, data: enrichedData });
    } catch (err: any) {
      console.error("Error analyzing prescription:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to analyze prescription.",
      });
    }
  });

  // API Endpoint: Look up single medicine usage & details
  app.post("/api/check-single-medicine", async (req: Request, res: Response) => {
    try {
      const { medicineName } = req.body;
      if (!medicineName || !medicineName.trim()) {
        res.status(400).json({ error: "Medicine name is required." });
        return;
      }

      const prompt = `Provide a comprehensive, patient-friendly medical profile and usage guide for the medicine: "${medicineName.trim()}".
Include its generic name, primary uses, mechanism of action, typical dosage forms, food instructions, meal relations, precautions, common side effects, red-flag symptoms, interactions, and missed dose advice.`;

      const responseText = await callGeminiWithRetry({
        contents: prompt,
        config: {
          systemInstruction: "You are an expert pharmacist creating patient education guides for medications.",
          responseMimeType: "application/json",
          responseSchema: singleMedicineSchema,
          temperature: 0.1,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const parsedData = JSON.parse(responseText.trim());
      res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error("Error checking medicine:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to retrieve medicine details.",
      });
    }
  });

  // Vite / Static middleware setup
  const distPath = fs.existsSync(path.join(process.cwd(), "dist", "index.html"))
    ? path.join(process.cwd(), "dist")
    : typeof __dirname !== "undefined" && fs.existsSync(path.join(__dirname, "index.html"))
    ? __dirname
    : typeof __dirname !== "undefined" && fs.existsSync(path.join(__dirname, "..", "dist", "index.html"))
    ? path.join(__dirname, "..", "dist")
    : path.join(process.cwd(), "dist");

  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(path.join(distPath, "index.html"));

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Prescription Medicine Checker server listening on http://0.0.0.0:${PORT} (env: ${process.env.NODE_ENV || "development"})`);
  });

  // Graceful shutdown for container environments (Railway, Docker, etc.)
  const shutdown = () => {
    console.log("Shutting down server gracefully...");
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
    setTimeout(() => {
      console.error("Forcefully shutting down after timeout.");
      process.exit(1);
    }, 5000);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer().catch((err) => {
  console.error("Server startup error:", err);
  process.exit(1);
});
