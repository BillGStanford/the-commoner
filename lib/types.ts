// ─── Core Data Types for The Commoner ──────────────────────────────────────

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorSlug: string;
  topic: string;
  date: string;
  featured: boolean;
  image: string;
  imageAlt: string;
  readingTime: number;
  isLive?: boolean; // ← ADD THIS LINE
}

export interface Writer {
  slug: string;
  name: string;
  bio: string;
  title: string;
  image: string;
  twitter?: string;
}

export interface Topic {
  slug: string;
  name: string;
  description: string;
}

// Enriched article with resolved author
export interface ArticleWithAuthor extends Article {
  author: Writer;
}
