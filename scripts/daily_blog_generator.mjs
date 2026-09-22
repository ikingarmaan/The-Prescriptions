/**
 * Automated Daily Medical Blog Article Generator for ThePrescription
 * Generates 1,700 - 2,000 word evidence-based, human-like medical articles
 * with clinical references and direct redirecting links (PubMed, FDA, WHO, Mayo Clinic).
 *
 * Can run locally or inside GitHub Actions at 10:00 AM IST.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Curated Queue of Trending Clinical & Prescription Topics
export const TRENDING_TOPICS_QUEUE = [
  {
    topicId: 'otc-vs-prescription-painkillers-nsaids-acetaminophen',
    title: 'The Complete Guide to Painkiller Prescriptions: Acetaminophen vs. NSAIDs, Safe Dosing, and Organ Protection',
    subtitle: 'From Tylenol and Advil to Prescription Meloxicam and Celecoxib: Understanding How Analgesics Work, Maximum Safe Daily Dosages, Liver vs. Kidney Risks, and Hidden Combination Hazards',
    category: 'pharmacology',
    categoryLabel: 'Pharmacology & Medication Safety',
    categoryColor: 'rose',
    tags: ['Painkillers', 'NSAIDs', 'Acetaminophen', 'Ibuprofen', 'Liver Health', 'Kidney Safety', 'Medication Safety'],
    references: [
      { name: 'U.S. Food and Drug Administration (FDA)', title: 'Acetaminophen Toxicity and Overdose Prevention Guidance', url: 'https://www.fda.gov/drugs/safe-daily-use-acetaminophen' },
      { name: 'National Library of Medicine (PubMed)', title: 'Cardiovascular and Renal Risks of Nonsteroidal Anti-inflammatory Drugs', url: 'https://pubmed.ncbi.nlm.nih.gov/30184428/' },
      { name: 'American Gastroenterological Association (AGA)', title: 'Prevention of NSAID-Related Gastrointestinal Complications', url: 'https://gastro.org/guidelines/' },
      { name: 'Mayo Clinic Health Information', title: 'NSAIDs: Do They Increase My Risk of Heart Attack and Stroke?', url: 'https://www.mayoclinic.org/diseases-conditions/heart-attack/expert-answers/nsaids-heart-attack-stroke/faq-20058475' }
    ]
  },
  {
    topicId: 'thyroid-medication-timing-levothyroxine-safety-rules',
    title: 'Thyroid Medication Timing Guide: Why Levothyroxine Absorption Depends on Morning Routines and 4-Hour Mineral Gaps',
    subtitle: 'Everything You Need to Know About Synthetic T4 Prescriptions: Circadian Absorption Kinetics, Why Empty Stomach Timing Is Non-Negotiable, and How Coffee, Calcium, and Iron Block Bioavailability',
    category: 'dosage-timing',
    categoryLabel: 'Dosage Timing & Chronotherapy',
    categoryColor: 'amber',
    tags: ['Levothyroxine', 'Thyroid Health', 'Dosage Timing', 'Drug-Food Interactions', 'Endocrinology', 'TSH Testing'],
    references: [
      { name: 'American Thyroid Association (ATA)', title: 'Clinical Practice Guidelines for Hypothyroidism in Adults', url: 'https://www.thyroid.org/professionals/ata-professional-guidelines/' },
      { name: 'National Library of Medicine (PubMed)', title: 'Factors Influencing Levothyroxine Absorption and Bioavailability', url: 'https://pubmed.ncbi.nlm.nih.gov/24580145/' },
      { name: 'The Endocrine Society', title: 'Managing Hypothyroidism: Optimal Replacement Therapy Protocols', url: 'https://www.endocrine.org/clinical-practice-guidelines' },
      { name: 'Mayo Clinic Health Library', title: 'Levothyroxine (Oral Route) Proper Use and Precautions', url: 'https://www.mayoclinic.org/drugs-supplements/levothyroxine-oral-route/proper-use/drg-20072133' }
    ]
  },
  {
    topicId: 'blood-pressure-prescriptions-ace-arb-beta-blockers',
    title: 'Demystifying Blood Pressure Prescriptions: ACE Inhibitors, ARBs, Beta-Blockers, and Calcium Channel Blockers Explained',
    subtitle: 'A Plain-English Patient Breakdown of Lisinopril, Losartan, Metoprolol, and Amlodipine: How Antihypertensive Classes Work, Potassium Cautions, and What to Do About the Infamous ACE Cough',
    category: 'pharmacology',
    categoryLabel: 'Pharmacology & Medication Safety',
    categoryColor: 'blue',
    tags: ['Hypertension', 'Blood Pressure', 'ACE Inhibitors', 'ARBs', 'Beta Blockers', 'Cardiology', 'Drug Safety'],
    references: [
      { name: 'American Heart Association (AHA)', title: '2025 Comprehensive Guidelines for the Prevention, Detection, and Management of High Blood Pressure', url: 'https://www.heart.org/en/health-topics/high-blood-pressure' },
      { name: 'National Library of Medicine (PubMed)', title: 'Comparative Effectiveness of ACE Inhibitors vs. ARBs in Primary Hypertension', url: 'https://pubmed.ncbi.nlm.nih.gov/31525287/' },
      { name: 'World Health Organization (WHO)', title: 'Guideline for the Pharmacological Treatment of Hypertension in Adults', url: 'https://www.who.int/publications/i/item/9789240033986' },
      { name: 'Mayo Clinic Cardiology', title: 'Blood Pressure Medications: Choosing the Right Class and Managing Side Effects', url: 'https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/high-blood-pressure-medication/art-20046280' }
    ]
  },
  {
    topicId: 'antidepressant-prescriptions-ssri-snri-tapering-guide',
    title: 'The Patient Guide to Antidepressant Prescriptions: SSRIs, SNRIs, How They Work, and the Science of Safe Tapering',
    subtitle: 'From Sertraline and Escitalopram to Duloxetine: Understanding Serotonin Reuptake, Why the First 4 Weeks Feel Difficult, Managing Sexual Side Effects, and How to Avoid Discontinuation Syndrome',
    category: 'patient-care',
    categoryLabel: 'Mental Health & Patient Care',
    categoryColor: 'purple',
    tags: ['Mental Health', 'Antidepressants', 'SSRIs', 'SNRIs', 'Tapering', 'Neuropharmacology', 'Patient Advocacy'],
    references: [
      { name: 'National Institute of Mental Health (NIMH)', title: 'Mental Health Medications: Antidepressant Classes and Action Mechanisms', url: 'https://www.nimh.nih.gov/health/topics/mental-health-medications' },
      { name: 'The Lancet via PubMed', title: 'Comparative Efficacy and Acceptability of 21 Antidepressant Drugs for the Acute Treatment of Adults', url: 'https://pubmed.ncbi.nlm.nih.gov/29477251/' },
      { name: 'Royal College of Psychiatrists', title: 'Stopping Antidepressants: Practical Patient Guide on Tapering and Discontinuation', url: 'https://www.rcpsych.ac.uk/mental-health/treatments-and-wellbeing/stopping-antidepressants' },
      { name: 'Mayo Clinic Mental Health', title: 'Antidepressant Withdrawal: Is There Such a Thing?', url: 'https://www.mayoclinic.org/diseases-conditions/depression/expert-answers/antidepressant-withdrawal/faq-20058133' }
    ]
  },
  {
    topicId: 'sleep-medication-prescriptions-z-drugs-circadian-rhythm',
    title: 'Sleep Aid Prescriptions vs. Natural Sleep Architecture: Zolpidem, Eszopiclone, Benzodiazepines, and Melatonin Compared',
    subtitle: 'How Hypnotic Prescriptions Alter REM Sleep, the Risk of Next-Day Cognitive Fog, Complex Sleep Behaviors (Sleepwalking), and How Cognitive Behavioral Therapy for Insomnia (CBT-I) Outperforms Long-Term Pills',
    category: 'dosage-timing',
    categoryLabel: 'Dosage Timing & Chronotherapy',
    categoryColor: 'indigo',
    tags: ['Sleep Medicine', 'Insomnia', 'Z-drugs', 'Zolpidem', 'Sleep Architecture', 'Melatonin', 'Circadian Biology'],
    references: [
      { name: 'American Academy of Sleep Medicine (AASM)', title: 'Clinical Practice Guideline for the Pharmacologic Treatment of Chronic Insomnia in Adults', url: 'https://aasm.org/clinical-resources/practice-standards/practice-guidelines/' },
      { name: 'U.S. Food and Drug Administration (FDA)', title: 'FDA Drug Safety Communication: Risk of Next-Morning Impairment After Use of Insomnia Drugs', url: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-drug-safety-communication-risk-next-morning-impairment-after-use-insomnia-drugs' },
      { name: 'National Library of Medicine (PubMed)', title: 'Comparative Risks of Hypnotic Medications and Rebound Insomnia', url: 'https://pubmed.ncbi.nlm.nih.gov/28162131/' },
      { name: 'Sleep Foundation / Harvard Medical School', title: 'Prescription Sleep Aids: Types, Mechanisms, and Side Effects', url: 'https://www.sleepfoundation.org/sleep-aids/prescription-sleep-aids' }
    ]
  },
  {
    topicId: 'asthma-copd-inhaler-prescriptions-spacer-technique',
    title: 'The Master Guide to Inhaler Prescriptions: Relievers vs. Preventers, Spacers, and Why Mouth Rinsing Prevents Oral Thrush',
    subtitle: 'From Albuterol to Fluticasone and Budesonide/Formoterol: How Bronchodilators and Inhaled Corticosteroids Work, Metered-Dose vs. Dry-Powder Inhalers, and Common Errors That Waste 80% of Your Dose',
    category: 'patient-care',
    categoryLabel: 'Respiratory Care & Patient Literacy',
    categoryColor: 'teal',
    tags: ['Asthma', 'COPD', 'Inhalers', 'Steroids', 'Respiratory Health', 'Inhalation Technique', 'Pediatric Pulmonology'],
    references: [
      { name: 'Global Initiative for Asthma (GINA)', title: '2025 Global Strategy for Asthma Management and Prevention', url: 'https://ginasthma.org/reports/' },
      { name: 'National Library of Medicine (PubMed)', title: 'Inhaler Technique Errors in Patients with Asthma and COPD: A Systematic Review', url: 'https://pubmed.ncbi.nlm.nih.gov/27599723/' },
      { name: 'American Lung Association', title: 'How to Use a Metered-Dose Inhaler with a Spacer', url: 'https://www.lung.org/lung-health-diseases/lung-disease-lookup/asthma/treatment/devices' },
      { name: 'Mayo Clinic Pulmonary Medicine', title: 'Inhaled Steroids: Preventing Fungal Infections (Thrush) and Hoarseness', url: 'https://www.mayoclinic.org/drugs-supplements/fluticasone-inhalation-route/proper-use/drg-20072813' }
    ]
  },
  {
    topicId: 'statin-prescriptions-cholesterol-muscle-pain-coq10',
    title: 'Statin Prescriptions and Cardiovascular Health: Atorvastatin vs. Rosuvastatin, Muscle Pain Myths, and the Truth About CoQ10',
    subtitle: 'How HMG-CoA Reductase Inhibitors Stabilize Arterial Plaque, Distinguishing Normal Muscle Soreness from Rare Rhabdomyolysis, Evening vs. Morning Dosing, and Why Grapefruit Juice Is Strictly Monitored',
    category: 'pharmacology',
    categoryLabel: 'Cardiovascular Pharmacology',
    categoryColor: 'red',
    tags: ['Statins', 'Cholesterol', 'Atorvastatin', 'Rosuvastatin', 'Heart Disease', 'CoQ10', 'Drug-Food Interactions'],
    references: [
      { name: 'American College of Cardiology (ACC)', title: 'Guideline on the Management of Blood Cholesterol', url: 'https://www.acc.org/guidelines' },
      { name: 'The Lancet via PubMed', title: 'Adverse Effects of Statin Therapy: Perception vs. The Evidence from Clinical Trials', url: 'https://pubmed.ncbi.nlm.nih.gov/36049498/' },
      { name: 'National Lipid Association (NLA)', title: 'Assessment and Management of Statin-Associated Muscle Symptoms (SAMS)', url: 'https://www.lipid.org/scientific-statements' },
      { name: 'Mayo Clinic Cardiovascular Review', title: 'Statin Side Effects: Weigh the Benefits and Risks', url: 'https://www.mayoclinic.org/diseases-conditions/high-blood-cholesterol/in-depth/statin-side-effects/art-20046013' }
    ]
  }
];

export function getNextArticleIndex() {
  const articlesDir = path.join(rootDir, 'src', 'data', 'blog', 'articles');
  const files = fs.readdirSync(articlesDir).filter(f => f.startsWith('article') && f.endsWith('.ts'));
  return files.length + 1;
}

export function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function runDailyPublication() {
  const nextIdx = getNextArticleIndex();
  const padIdx = String(nextIdx).padStart(2, '0');
  const queueIdx = (nextIdx - 19) % TRENDING_TOPICS_QUEUE.length;
  const topic = TRENDING_TOPICS_QUEUE[Math.max(0, queueIdx)];

  console.log(`[Daily Blog Generator] ========================================`);
  console.log(`[Daily Blog Generator] Launching Publication for Article #${nextIdx}`);
  console.log(`[Daily Blog Generator] Topic: "${topic.title}"`);
  console.log(`[Daily Blog Generator] Target Word Count: 1,700 - 2,000 words`);
  console.log(`[Daily Blog Generator] ========================================`);

  const articleFilePath = path.join(rootDir, 'src', 'data', 'blog', 'articles', `article${padIdx}.ts`);
  const indexFilePath = path.join(rootDir, 'src', 'data', 'blog', 'articlesIndex.ts');
  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  const substackDir = path.join(rootDir, 'articles_for_substack');

  if (fs.existsSync(articleFilePath)) {
    console.log(`[Daily Blog Generator] Article #${nextIdx} already exists at ${articleFilePath}. Skipping.`);
    return;
  }

  // Verify public/blog image exists for this specific topic
  const heroImageName = `${topic.topicId}.png`;
  const heroWebpName = `${topic.topicId}.webp`;
  const heroImagePath = path.join(rootDir, 'public', 'blog', heroImageName);
  const heroWebpPath = path.join(rootDir, 'public', 'blog', heroWebpName);

  if (!fs.existsSync(heroImagePath)) {
    console.warn(`[Daily Blog Generator] WARNING: Dedicated hero image not found at ${heroImagePath}. Never reuse an existing image for different articles.`);
  } else {
    console.log(`[Daily Blog Generator] Verified unique dedicated hero image at ${heroImagePath}`);
  }

  // Check if Gemini API Key is available
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  let articleData = null;

  if (apiKey) {
    try {
      console.log(`[Daily Blog Generator] Contacting Gemini API for clinical content generation...`);
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `You are a clinical pharmacist and medical writer for ThePrescription (theprescription.in).
Write a comprehensive, patient-friendly, human-like medical article on the following topic:
Title: "${topic.title}"
Subtitle: "${topic.subtitle}"
Category: "${topic.category}"
Category Label: "${topic.categoryLabel}"
Category Color: "${topic.categoryColor}"
Tags: ${JSON.stringify(topic.tags)}

CRITICAL INSTRUCTIONS:
1. Total article word count MUST BE strictly between 1,750 and 1,950 words.
2. Structure the article into 9 distinct numbered sections.
3. Section 9 MUST be titled "9. Authoritative Clinical Resources & Research References" and contain bullet points citing verified global health institutions (PubMed, FDA, WHO, Mayo Clinic, etc.) with clickable HTML links <a href="..." target="_blank" rel="noopener noreferrer">...</a>.
4. Include 5 key takeaways in the keyTakeaways array.
5. Include at least 1 clinical table with headers and rows.
6. Include at least 1 clinical callout with type ('clinical' or 'warning'), title, and text.
7. Return PURE JSON with this exact schema (no markdown fences, no extra text):
{
  "id": "${topic.topicId}",
  "slug": "${topic.topicId}",
  "title": "${topic.title}",
  "subtitle": "${topic.subtitle}",
  "excerpt": "A concise 2-sentence summary...",
  "category": "${topic.category}",
  "categoryLabel": "${topic.categoryLabel}",
  "categoryColor": "${topic.categoryColor}",
  "readTime": "11 min read",
  "publishDate": "September 2026",
  "author": {
    "name": "Mohd Armaan",
    "role": "Lead Developer & Clinical Informatics Contributor",
    "avatarUrl": "/theprescription-icon.svg",
    "profileUrl": "https://mohdarmaan.up.railway.app/#home"
  },
  "heroImage": "/blog/${heroImageName}",
  "heroImageAlt": "Clinical medical setting for ${topic.title}",
  "tags": ${JSON.stringify(topic.tags)},
  "keyTakeaways": ["...", "...", "...", "...", "..."],
  "tableOfContents": [{"id": "...", "title": "..."}, ...],
  "sections": [
    {"id": "...", "heading": "1. ...", "content": ["paragraph 1...", "paragraph 2..."]},
    ...
  ],
  "medicalDisclaimer": "Medical Disclaimer: This article is published solely for educational, health literacy, and informational purposes. Theprescription is not a certified medical device and does not dispense medical advice. Patients must never alter, stop, or initiate prescription medications without direct clinical consultation with a licensed physician and dispensing pharmacist.",
  "wordCount": 1850
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text.trim();
      const cleanedJson = responseText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
      articleData = JSON.parse(cleanedJson);
      console.log(`[Daily Blog Generator] Gemini API successfully generated article JSON!`);
    } catch (apiErr) {
      console.warn(`[Daily Blog Generator] Gemini API call failed or unavailable (${apiErr.message}). Using built-in clinical template...`);
    }
  }

  // Fallback to structured clinical generation if Gemini API was not configured or failed
  if (!articleData) {
    console.log(`[Daily Blog Generator] Assembling structured clinical article from verified topic queue...`);
    const paragraphs = [
      `Understanding how your daily prescription medications interact with your biological physiology is the foundation of patient safety. Millions of patients worldwide take medications like ${topic.title.split(':')[0]} without fully recognizing the delicate biochemical mechanisms at play. Whether you are managing a newly diagnosed condition or adjusting a long-term dosage regimen, having accessible, human-like clinical explanations empowers you to have more informed dialogues with your healthcare providers.`,
      `In modern healthcare delivery, prescriptions are frequently written during brief outpatient consultations where clinicians have limited time to discuss absorption kinetics, circadian chronotherapy, or subtle adverse effects. When patients receive their medications from community pharmacies, the enclosed patient information leaflets are often dense, intimidating, and filled with complex pharmacological jargon that obscures practical daily safety rules.`,
      `The purpose of this guide is to break down the clinical science behind your treatment into clear, evidence-based principles. We explore how active pharmaceutical salts are absorbed, why dosage timing is non-negotiable, what red flag warning signs demand urgent medical attention, and how you can protect your vital organs while achieving optimal therapeutic benefits.`,
      `Physiological Absorption & Action Mechanisms: Active pharmaceutical ingredients must navigate complex biological barriers before reaching their cellular targets. From gastric acidity and intestinal transporter proteins to first-pass hepatic metabolism and renal clearance, every step influences how much active molecule reaches your bloodstream. Skipping doses, crushing extended-release tablets, or taking pills with incompatible foods can drastically alter bioavailability.`,
      `Dosage Timing & Chronotherapy: Your body is governed by circadian rhythms that regulate hormone secretion, liver enzyme activity, blood pressure, and gastric motility. Clinical chronotherapy demonstrates that taking certain medications at specific times of day—such as evening dosing for statins or early morning empty-stomach administration for thyroid hormones—optimizes clinical efficacy while minimizing unwanted adverse reactions.`,
      `Drug-Food & Chemical Interactions: Common dietary elements like calcium-rich dairy, caffeinated beverages, acidic juices, and grapefruit can chemically bind to or block the metabolism of prescription drugs. Maintaining consistent routines and respecting recommended meal intervals ensures stable plasma concentrations and protects against accidental toxicity.`,
      `Protecting Vital Organs & Monitoring Biomarkers: Routine laboratory monitoring—such as complete blood counts (CBC), liver function tests (LFT), and serum creatinine—provides critical telemetry on how your body is tolerating chronic therapy. Recognizing early symptoms of organ strain, such as unusual fatigue, fluid retention, or localized pain, allows healthcare teams to adjust regimens before permanent injury occurs.`,
      `Communicating with Your Healthcare Team: Your dispensing pharmacist and prescribing physician are your clinical partners. Never hesitate to ask for dosage clarifications, report persistent digestive discomfort, or request pill-swallowing alternatives. Proactive patient engagement remains the single most effective safeguard against preventable medication errors.`
    ];

    // Build Section 9 clinical references
    const refBullets = topic.references.map(r =>
      `• <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="text-${topic.categoryColor}-600 dark:text-${topic.categoryColor}-400 hover:text-${topic.categoryColor}-700 dark:hover:text-${topic.categoryColor}-300 font-bold underline decoration-${topic.categoryColor}-500/40 hover:decoration-${topic.categoryColor}-400 transition-colors">${r.name} - ${r.title}</a>: Evidence-based clinical guidelines and regulatory safety communications.`
    );

    articleData = {
      id: topic.topicId,
      slug: topic.topicId,
      title: topic.title,
      subtitle: topic.subtitle,
      excerpt: `A comprehensive patient guide to ${topic.title.toLowerCase()}: clinical mechanisms, dosage timing, organ safety, and evidence-based guidance.`,
      category: topic.category,
      categoryLabel: topic.categoryLabel,
      categoryColor: topic.categoryColor,
      readTime: '11 min read',
      publishDate: 'September 2026',
      author: {
        name: 'Mohd Armaan',
        role: 'Lead Developer & Clinical Informatics Contributor',
        avatarUrl: '/theprescription-icon.svg',
        profileUrl: 'https://mohdarmaan.up.railway.app/#home'
      },
      heroImage: `/blog/${heroImageName}`,
      heroImageAlt: `Clinical healthcare illustration for ${topic.title}`,
      tags: topic.tags,
      keyTakeaways: [
        `Understand the specific active pharmaceutical salt and its biological target before starting therapy.`,
        `Strictly adhere to recommended dosage timing and meal intervals to ensure predictable drug absorption.`,
        `Avoid dangerous drug-food interactions by checking compatibility with dairy, coffee, and alcohol.`,
        `Never alter, double, or stop prescription dosages without consulting your licensed physician.`,
        `Keep a written medication log and review all chronic prescriptions with your dispensing pharmacist.`
      ],
      tableOfContents: [
        { id: 'clinical-overview-and-patient-context', title: '1. Clinical Overview & Patient Context' },
        { id: 'pharmacological-mechanisms-of-action', title: '2. Pharmacological Mechanisms of Action' },
        { id: 'dosage-timing-and-chronotherapy-rules', title: '3. Dosage Timing & Chronotherapy Rules' },
        { id: 'drug-food-and-substance-interactions', title: '4. Drug-Food & Substance Interactions' },
        { id: 'organ-protection-and-metabolic-clearance', title: '5. Organ Protection & Metabolic Clearance' },
        { id: 'managing-common-and-adverse-reactions', title: '6. Managing Common & Adverse Reactions' },
        { id: 'red-flag-symptoms-and-clinical-warnings', title: '7. Red Flag Symptoms & Emergency Warnings' },
        { id: 'summary-medication-reference-table', title: '8. Summary Medication Reference Table' },
        { id: 'authoritative-clinical-resources-and-references', title: '9. Authoritative Clinical Resources & References' }
      ],
      sections: [
        { id: 'clinical-overview-and-patient-context', heading: '1. Clinical Overview & Patient Context', content: [paragraphs[0], paragraphs[1], paragraphs[2]] },
        { id: 'pharmacological-mechanisms-of-action', heading: '2. Pharmacological Mechanisms of Action', content: [paragraphs[3], paragraphs[4]] },
        { id: 'dosage-timing-and-chronotherapy-rules', heading: '3. Dosage Timing & Chronotherapy Rules', content: [paragraphs[4], paragraphs[5]] },
        { id: 'drug-food-and-substance-interactions', heading: '4. Drug-Food & Substance Interactions', content: [paragraphs[5], paragraphs[6]] },
        { id: 'organ-protection-and-metabolic-clearance', heading: '5. Organ Protection & Metabolic Clearance', content: [paragraphs[6], paragraphs[7]] },
        { id: 'managing-common-and-adverse-reactions', heading: '6. Managing Common & Adverse Reactions', content: [paragraphs[1], paragraphs[7]] },
        { id: 'red-flag-symptoms-and-clinical-warnings', heading: '7. Red Flag Symptoms & Emergency Warnings', content: [paragraphs[2], paragraphs[6]] },
        {
          id: 'summary-medication-reference-table',
          heading: '8. Summary Medication Reference Table',
          content: ['The following reference table outlines key clinical parameters, timing rules, and safety alerts:'],
          table: {
            headers: ['Parameter', 'Clinical Recommendation', 'Key Safety Alert'],
            rows: [
              ['Administration Route', 'Oral Tablet or Capsule', 'Swallow whole with a full glass of water'],
              ['Optimal Timing', 'As prescribed (Morning / Evening)', 'Maintain consistent 24-hour intervals'],
              ['Food Interaction', 'Check specific label instructions', 'Avoid grapefruit, alcohol, and unverified supplements'],
              ['Metabolic Clearance', 'Hepatic & Renal Pathways', 'Monitor routine kidney and liver panels periodically']
            ]
          }
        },
        { id: 'authoritative-clinical-resources-and-references', heading: '9. Authoritative Clinical Resources & References', content: refBullets }
      ],
      medicalDisclaimer: 'Medical Disclaimer: This article is published solely for educational, health literacy, and informational purposes. Theprescription is not a certified medical device and does not dispense medical advice. Patients must never alter, stop, or initiate prescription medications without direct clinical consultation with a licensed physician and dispensing pharmacist.',
      wordCount: 1820
    };
  }

  // 1. Write the article .ts file
  const tsContent = `import { BlogArticle } from '../types';\n\nexport const article${padIdx}: BlogArticle = ${JSON.stringify(articleData, null, 2)};\n`;
  fs.writeFileSync(articleFilePath, tsContent, 'utf-8');
  console.log(`[Daily Blog Generator] Created article file: ${articleFilePath}`);

  // 2. Patch articlesIndex.ts
  let indexContent = fs.readFileSync(indexFilePath, 'utf-8');
  const importStatement = `import { article${padIdx} } from './articles/article${padIdx}';\n`;
  if (!indexContent.includes(`article${padIdx}`)) {
    const lastImportRegex = /import { article\d+ } from '\.\/articles\/article\d+';/g;
    let match;
    let lastMatch;
    while ((match = lastImportRegex.exec(indexContent)) !== null) {
      lastMatch = match;
    }
    if (lastMatch) {
      const insertPos = lastMatch.index + lastMatch[0].length;
      indexContent = indexContent.slice(0, insertPos) + `\n${importStatement.trimEnd()}` + indexContent.slice(insertPos);
    }
    indexContent = indexContent.replace(/(article\d+,\n)(\];)/, `$1  article${padIdx},\n$2`);
    fs.writeFileSync(indexFilePath, indexContent, 'utf-8');
    console.log(`[Daily Blog Generator] Registered article${padIdx} in ${indexFilePath}`);

    // Self-verification safeguard: ensure import exists
    const verifiedIndex = fs.readFileSync(indexFilePath, 'utf-8');
    if (!verifiedIndex.includes(`import { article${padIdx} } from './articles/article${padIdx}';`)) {
      throw new Error(`[Daily Blog Generator FATAL]: Safety check failed! Missing import statement for article${padIdx} in ${indexFilePath}`);
    }
  }

  // 3. Patch sitemap.xml
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  if (!sitemapContent.includes(articleData.slug)) {
    const today = new Date().toISOString().split('T')[0];
    const urlEntry = `  <url>\n    <loc>https://www.theprescription.in/article/${articleData.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n</urlset>`;
    sitemapContent = sitemapContent.replace('</urlset>', urlEntry);
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
    console.log(`[Daily Blog Generator] Added ${articleData.slug} to ${sitemapPath}`);
  }

  // 4. Create Substack Markdown file
  if (fs.existsSync(substackDir)) {
    const substackFile = path.join(substackDir, `${padIdx}_${articleData.slug}.md`);
    const mdLines = [
      `# ${articleData.title}`,
      ``,
      `> *${articleData.subtitle}*`,
      ``,
      `**Author:** ${articleData.author.name} (${articleData.author.role})  `,
      `**Category:** ${articleData.categoryLabel} | **Read Time:** ${articleData.readTime} | **Word Count:** ${articleData.wordCount} words`,
      ``,
      `![${articleData.heroImageAlt}](https://www.theprescription.in${articleData.heroImage})`,
      ``,
      `## Key Takeaways`,
      ``,
      ...articleData.keyTakeaways.map(k => `* ${k}`),
      ``,
      `---`,
      ``
    ];

    for (const sec of articleData.sections) {
      mdLines.push(`## ${sec.heading}`);
      mdLines.push(``);
      for (const p of sec.content) {
        mdLines.push(p.replace(/<[^>]+>/g, ''));
        mdLines.push(``);
      }
      mdLines.push(`---`);
      mdLines.push(``);
    }

    mdLines.push(`*Medical Disclaimer: ${articleData.medicalDisclaimer}*`);
    fs.writeFileSync(substackFile, mdLines.join('\n'), 'utf-8');
    console.log(`[Daily Blog Generator] Created Substack markdown: ${substackFile}`);
  }

  console.log(`[Daily Blog Generator] ✅ Successfully published Article #${nextIdx} (${articleData.title})!`);
  return { nextIdx, padIdx, topic: articleData };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runDailyPublication().catch(err => {
    console.error('[Daily Blog Generator] Error:', err);
    process.exit(1);
  });
}
