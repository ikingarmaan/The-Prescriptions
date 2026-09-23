import { BlogArticle, BlogCategory } from './types';
import { article01 } from './articles/article01';
import { article02 } from './articles/article02';
import { article03 } from './articles/article03';
import { article04 } from './articles/article04';
import { article05 } from './articles/article05';
import { article06 } from './articles/article06';
import { article07 } from './articles/article07';
import { article08 } from './articles/article08';
import { article09 } from './articles/article09';
import { article10 } from './articles/article10';
import { article11 } from './articles/article11';
import { article12 } from './articles/article12';
import { article13 } from './articles/article13';
import { article14 } from './articles/article14';
import { article15 } from './articles/article15';
import { article16 } from './articles/article16';
import { article17 } from './articles/article17';
import { article18 } from './articles/article18';
import { article19 } from './articles/article19';
import { article20 } from './articles/article20';
import { article21 } from './articles/article21';
import { article22 } from './articles/article22';
import { article23 } from './articles/article23';
import { article24 } from './articles/article24';

export const ALL_ARTICLES: BlogArticle[] = [
  article01,
  article02,
  article03,
  article04,
  article05,
  article06,
  article07,
  article08,
  article09,
  article10,
  article11,
  article12,
  article13,
  article14,
  article15,
  article16,
  article17,
  article18,
  article19,
  article20,
  article21,
  article22,
  article23,
  article24,
];

export interface CategoryFilterItem {
  id: BlogCategory | 'all';
  label: string;
  description: string;
  color: string;
}

export const BLOG_CATEGORIES: CategoryFilterItem[] = [
  { id: 'all', label: 'All Articles', description: 'Browse all clinical and prescription guides', color: 'slate' },
  { id: 'handwriting', label: 'Doctor Handwriting', description: 'Decoding cursive, penmanship, and unreadable scripts', color: 'emerald' },
  { id: 'abbreviations', label: 'Prescription Codes', description: 'Latin shorthand, OD/BD/TDS, and anatomy of a script', color: 'amber' },
  { id: 'interactions', label: 'Drug & Food Interactions', description: 'CYP enzymes, grapefruit, meal timing, and chronotherapy', color: 'rose' },
  { id: 'generics', label: 'Generic Pharmacology', description: 'Bioequivalence, active salts, excipients, and cost savings', color: 'blue' },
  { id: 'safety', label: 'Patient Safety & Protocols', description: 'LASA drugs, antibiotics, steroids, pediatrics, and polypharmacy', color: 'red' },
  { id: 'diagnostics', label: 'Diagnostic Lab Tests', description: 'Understanding CBC, liver enzymes, kidney markers, and lipids', color: 'purple' },
  { id: 'ai-health', label: 'AI & Digital Health', description: 'Computer vision, OCR, and the future of healthcare literacy', color: 'teal' },
  { id: 'pharmacology', label: 'Pharmacology & Therapeutics', description: 'Deep dives into medication classes, mechanisms, and modern treatments', color: 'indigo' },
];

export function getAllArticles(): BlogArticle[] {
  return ALL_ARTICLES;
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return ALL_ARTICLES.find(article => article.slug === slug || article.id === slug);
}

export function getArticlesByCategory(category: BlogCategory | 'all'): BlogArticle[] {
  if (category === 'all') return ALL_ARTICLES;
  return ALL_ARTICLES.filter(article => article.category === category);
}

export function getRelatedArticles(currentId: string, limit = 3): BlogArticle[] {
  const current = ALL_ARTICLES.find(a => a.id === currentId || a.slug === currentId);
  if (!current) return ALL_ARTICLES.slice(0, limit);

  const sameCategory = ALL_ARTICLES.filter(a => a.id !== current.id && a.category === current.category);
  const otherCategory = ALL_ARTICLES.filter(a => a.id !== current.id && a.category !== current.category);

  return [...sameCategory, ...otherCategory].slice(0, limit);
}
