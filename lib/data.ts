// ─── Data Access Layer ─────────────────────────────────────────────────────
// All content is served from local JSON files. No database, no CMS.
// These functions are used in Server Components and at build time for SSG.

import type { Article, Writer, Topic, ArticleWithAuthor } from './types';

// Import JSON data (resolved at build time)
import articlesData from '@/data/articles.json';
import writersData from '@/data/writers.json';
import topicsData from '@/data/topics.json';

const articles: Article[] = articlesData as Article[];
const writers: Writer[] = writersData as Writer[];
const topics: Topic[] = topicsData as Topic[];

// ─── Articles ───────────────────────────────────────────────────────────────

export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured);
}

export function getArticlesByTopic(topicSlug: string): Article[] {
  return getAllArticles().filter((a) => a.topic === topicSlug);
}

export function getArticlesByAuthor(authorSlug: string): Article[] {
  return getAllArticles().filter((a) => a.authorSlug === authorSlug);
}

export function getArticleWithAuthor(slug: string): ArticleWithAuthor | undefined {
  const article = getArticleBySlug(slug);
  if (!article) return undefined;

  const author = getWriterBySlug(article.authorSlug);
  if (!author) return undefined;

  return { ...article, author };
}

// ─── Writers ────────────────────────────────────────────────────────────────

export function getAllWriters(): Writer[] {
  return writers;
}

export function getWriterBySlug(slug: string): Writer | undefined {
  return writers.find((w) => w.slug === slug);
}

// ─── Topics ─────────────────────────────────────────────────────────────────

export function getAllTopics(): Topic[] {
  return topics;
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

// ─── Utilities ───────────────────────────────────────────────────────────────

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Capitalize topic name for display
export function getTopicName(slug: string): string {
  const topic = getTopicBySlug(slug);
  if (topic) return topic.name;
  // Fallback: capitalize slug
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('–');
}
