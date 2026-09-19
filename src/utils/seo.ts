import { useEffect } from 'react';
import { AppNavTab } from '../components/Navbar';
import { trackPageView } from './analytics';

interface PageSeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

export const SEO_METADATA_BY_TAB: Record<AppNavTab, PageSeoMetadata> = {
  prescription: {
    title: 'AI Doctor Prescription Reader Online - Read Doctor Handwriting | Theprescription',
    description:
      'Free AI doctor prescription reader & scanner. Decipher messy doctor handwriting, decode 1-0-1 dosage schedules, and identify generic medicines online.',
    keywords:
      'AI doctor prescription reader, prescription reader, AI prescription reader, doctor prescription reader, read doctor handwriting online, doctor handwriting scanner, handwritten prescription decoder, online prescription reader free, decipher doctor handwriting, medical prescription reader, Rx reader online',
    canonicalUrl: 'https://www.theprescription.in/',
  },
  lookup: {
    title: 'Medicine & Generic Salt Directory - Find Active Molecules & Brand Equivalents | Theprescription',
    description:
      'Search 5,000+ brand medicines and active generic salts. Find affordable equivalents, dosage forms, side effects, and safe food timing rules.',
    keywords:
      'generic medicine lookup, active pharmaceutical salt, brand to generic converter, medicine directory, Augmentin generic, Metformin salt, drug food interactions, prescription salts catalog',
    canonicalUrl: 'https://www.theprescription.in/#lookup',
  },
  abbreviations: {
    title: 'Doctor Abbreviation Dictionary - Latin Prescription Shorthand Decoded | Theprescription',
    description:
      'Decode doctor prescription abbreviations like 1-0-1, OD, BD, TDS, AC, and PC. Understand Latin medical shorthand and 24-hour daily dosage rules.',
    keywords:
      'doctor prescription abbreviations, 1-0-1 meaning, BD OD TDS medical meaning, Latin Rx shorthand dictionary, AC PC food timing, medical abbreviations decoder, prescription codes explained',
    canonicalUrl: 'https://www.theprescription.in/#abbreviations',
  },
  blog: {
    title: 'Clinical Blog & Prescription Guides - 17 In-Depth Health Articles | Theprescription',
    description:
      'Read expert clinical guides on deciphering doctor handwriting, generic vs brand drugs, 1-0-1 dosage codes, food-drug interactions, and safety.',
    keywords:
      'prescription blog, doctor handwriting mystery, generic vs brand drugs, Latin prescription codes, drug food interactions, 1-0-1 dosage meaning, LASA drugs, antibiotic resistance, chronotherapy, empty stomach medicine, pediatric dosing safety, polypharmacy elderly, healthcare AI OCR',
    canonicalUrl: 'https://www.theprescription.in/#blog',
  },
  about: {
    title: 'About Our Mission - Health Literacy & Prescription Safety | Theprescription',
    description:
      'Learn how Theprescription helps patients understand messy doctor handwriting and prescriptions. Explore our mission and zero-data-retention privacy.',
    keywords:
      'Theprescription mission, healthcare accessibility, health literacy platform, patient medication safety, medical handwriting technology, zero storage health AI',
    canonicalUrl: 'https://www.theprescription.in/#about',
  },
  faq: {
    title: 'Medical & Prescription FAQs - 62 Clinical Questions Answered | Theprescription',
    description:
      'Find answers to 62 common questions on prescription handwriting, generic medicines, food interactions, drug storage, and dosage safety.',
    keywords:
      'prescription FAQs, medicine questions and answers, medication safety guide, drug storage rules, missed dose protocol, antibiotic food spacing, patient health questions',
    canonicalUrl: 'https://www.theprescription.in/#faq',
  },
  contact: {
    title: 'Contact Clinical & Technical Support - Reach Our Team | Theprescription',
    description:
      'Contact Theprescription team for support, handwriting recognition feedback, or clinical questions. We are here to help patients and caregivers.',
    keywords:
      'contact Theprescription, prescription software support, medical feedback, pharmacist inquiries, handwriting recognition feedback',
    canonicalUrl: 'https://www.theprescription.in/#contact',
  },
  disclaimer: {
    title: 'Medical Application Disclaimer - Critical Safety Notice | Theprescription',
    description:
      'Educational notice: Theprescription is an AI health literacy tool and not a substitute for licensed medical advice. Always consult your doctor.',
    keywords:
      'medical disclaimer, AI health tool terms, not a medical device, clinical guidance policy, prescription verification requirement, patient safety warning',
    canonicalUrl: 'https://www.theprescription.in/#disclaimer',
  },
  privacy: {
    title: 'Privacy Policy - Ephemeral Zero-Storage Architecture | Theprescription',
    description:
      'Our zero-storage privacy policy guarantees that prescription images are processed ephemerally in RAM. No photos or medical data are ever saved.',
    keywords:
      'prescription privacy policy, HIPAA privacy standards, zero retention health AI, ephemeral image decryption, healthcare data protection, private medical tool',
    canonicalUrl: 'https://www.theprescription.in/#privacy',
  },
  terms: {
    title: 'Terms & Conditions of Service - User Agreement | Theprescription',
    description:
      'Review the terms of service governing access to Theprescription website, OCR handwriting deciphering utilities, and acceptable use policies.',
    keywords:
      'terms of service medical software, user agreement health app, digital prescription terms, legal conditions health literacy, acceptable use policy',
    canonicalUrl: 'https://www.theprescription.in/#terms',
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

    // Record virtual pageview in Google Analytics
    trackPageView(
      window.location.pathname + (activeTab === 'prescription' ? '' : '#' + activeTab),
      meta.title
    );
  }, [activeTab]);
}
