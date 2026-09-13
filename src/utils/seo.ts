import { useEffect } from 'react';
import { AppNavTab } from '../components/Navbar';

interface PageSeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

export const SEO_METADATA_BY_TAB: Record<AppNavTab, PageSeoMetadata> = {
  prescription: {
    title: 'Theprescription - AI Prescription & Doctor Handwriting Deciphering Assistant',
    description:
      'AI-powered prescription assistant that deciphers messy doctor handwriting, explains generic medicine salts, organizes dosage timing rules (1-0-1, BD, TDS), and creates printable schedules.',
    keywords:
      'AI prescription reader, decipher doctor handwriting online, understand handwritten prescription, medicine schedule generator, doctor handwriting decoder, prescription checker, pharmacy notes deciphering',
    canonicalUrl: 'https://theprescriptions.up.railway.app/',
  },
  lookup: {
    title: 'Medicine & Generic Salt Directory - Find Active Molecules & Brand Equivalents | Theprescription',
    description:
      'Explore 5,000+ brand medicines and their active generic pharmaceutical salts. Learn therapeutic equivalents, dosage forms, safe food timings, and precautions.',
    keywords:
      'generic medicine lookup, active pharmaceutical salt, brand to generic converter, medicine directory, Augmentin generic, Metformin salt, drug food interactions, prescription salts catalog',
    canonicalUrl: 'https://theprescriptions.up.railway.app/#lookup',
  },
  abbreviations: {
    title: 'Doctor Abbreviation Dictionary - Latin Prescription Shorthand Decoded | Theprescription',
    description:
      'Decipher doctor Latin abbreviations including 1-0-1, OD, BD, TDS, AC, PC, SOS, HS, and STAT. Understand physician handwriting codes and 24-hour daily timing schedules.',
    keywords:
      'doctor prescription abbreviations, 1-0-1 meaning, BD OD TDS medical meaning, Latin Rx shorthand dictionary, AC PC food timing, medical abbreviations decoder, prescription codes explained',
    canonicalUrl: 'https://theprescriptions.up.railway.app/#abbreviations',
  },
  about: {
    title: 'About Our Mission - Health Literacy & Prescription Safety | Theprescription',
    description:
      'Discover why Theprescription was built to bridge the gap between doctor penmanship and patient understanding. Learn about our zero-retention privacy and patient safety philosophy.',
    keywords:
      'Theprescription mission, healthcare accessibility, health literacy platform, patient medication safety, medical handwriting technology, zero storage health AI',
    canonicalUrl: 'https://theprescriptions.up.railway.app/#about',
  },
  faq: {
    title: 'Medical & Prescription FAQs - 62 Clinical Questions Answered | Theprescription',
    description:
      'Find answers to 62 essential questions regarding prescription deciphering, generic vs. brand medicines, food-drug interactions, storage protocols, and emergency safety.',
    keywords:
      'prescription FAQs, medicine questions and answers, medication safety guide, drug storage rules, missed dose protocol, antibiotic food spacing, patient health questions',
    canonicalUrl: 'https://theprescriptions.up.railway.app/#faq',
  },
  contact: {
    title: 'Contact Clinical & Technical Support - Reach Our Team | Theprescription',
    description:
      'Have questions, feedback on handwriting recognition, or clinical inquiries? Reach out to Theprescription team for support, bug reports, and partnership inquiries.',
    keywords:
      'contact Theprescription, prescription software support, medical feedback, pharmacist inquiries, handwriting recognition feedback',
    canonicalUrl: 'https://theprescriptions.up.railway.app/#contact',
  },
  disclaimer: {
    title: 'Medical Application Disclaimer - Critical Safety Notice | Theprescription',
    description:
      'Important regulatory, medical, and legal notice: Theprescription is an educational AI assistance platform and not a certified medical device. Always consult a doctor or pharmacist.',
    keywords:
      'medical disclaimer, AI health tool terms, not a medical device, clinical guidance policy, prescription verification requirement, patient safety warning',
    canonicalUrl: 'https://theprescriptions.up.railway.app/#disclaimer',
  },
  privacy: {
    title: 'Privacy Policy - Ephemeral Zero-Storage Architecture | Theprescription',
    description:
      'Read our strict zero-data-retention privacy policy. We process prescription images ephemerally in RAM with zero cloud archiving, zero user profiling, and zero medical data storage.',
    keywords:
      'prescription privacy policy, HIPAA privacy standards, zero retention health AI, ephemeral image decryption, healthcare data protection, private medical tool',
    canonicalUrl: 'https://theprescriptions.up.railway.app/#privacy',
  },
  terms: {
    title: 'Terms & Conditions of Service - User Agreement | Theprescription',
    description:
      'Review the terms of service governing access to Theprescription website, OCR handwriting deciphering utilities, intellectual property, and acceptable use policies.',
    keywords:
      'terms of service medical software, user agreement health app, digital prescription terms, legal conditions health literacy, acceptable use policy',
    canonicalUrl: 'https://theprescriptions.up.railway.app/#terms',
  },
};

export function useSeoMetadata(activeTab: AppNavTab) {
  useEffect(() => {
    const meta = SEO_METADATA_BY_TAB[activeTab] || SEO_METADATA_BY_TAB.prescription;

    document.title = meta.title;

    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', meta.keywords);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonicalUrl);
  }, [activeTab]);
}
