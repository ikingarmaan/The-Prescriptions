export type BlogCategory =
  | 'handwriting'
  | 'pharmacology'
  | 'drug-safety'
  | 'lab-tests'
  | 'dosage-timing'
  | 'patient-care'
  | 'generics'
  | 'abbreviations'
  | 'interactions'
  | 'safety'
  | 'diagnostics'
  | 'ai-health';

export interface AuthorInfo {
  name: string;
  role: string;
  avatarUrl?: string;
  profileUrl?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface BlogArticleSection {
  id: string;
  heading: string;
  content: string[]; // array of paragraphs (HTML formatted with <strong>, <em>, etc.)
  callout?: {
    type: 'tip' | 'warning' | 'clinical' | 'emergency' | 'info' | 'danger';
    title: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  quote?: {
    text: string;
    author: string;
  };
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: BlogCategory;
  categoryLabel: string;
  categoryColor: string;
  readTime: string;
  wordCount: number;
  publishDate: string;
  author: AuthorInfo;
  heroImage: string;
  heroImageAlt: string;
  tags: string[];
  tableOfContents: TableOfContentsItem[];
  keyTakeaways: string[];
  sections: BlogArticleSection[];
  medicalDisclaimer: string;
}
