// ─── SEO Utilities ─────────────────────────────────────────────────────────
// Centralized metadata generation for maximum SEO quality.

import type { Metadata } from 'next';
import type { Article, Writer, Topic } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thecommoner.com';
const SITE_NAME = 'The Commoner';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

// ─── Base Metadata ──────────────────────────────────────────────────────────

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — Independent Left Publication`,
  },
  description:
    'Independent left journalism covering economy, labor, politics, and socialist theory. Real analysis, no apologies.',
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  
  // FIX: Added icons configuration
  // Ensure favicon.ico and apple-touch-icon.png are in your /public folder
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TheCommonerHQ',
    creator: '@TheCommonerHQ',
  },
};

// ─── Article Metadata ───────────────────────────────────────────────────────

export function generateArticleMetadata(
  article: Article,
  authorName: string
): Metadata {
  const url = `${SITE_URL}/articles/${article.slug}/`;
  const ogImage = article.image
    ? `${SITE_URL}${article.image}`
    : DEFAULT_OG_IMAGE;

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: authorName }],
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.excerpt,
      siteName: SITE_NAME,
      locale: 'en_US',
      publishedTime: new Date(article.date).toISOString(),
      authors: [authorName],
      section: article.topic,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

// ─── JSON-LD Structured Data ────────────────────────────────────────────────

export function generateArticleJsonLd(
  article: Article,
  authorName: string
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    author: {
      '@type': 'Person',
      name: authorName,
      url: `${SITE_URL}/writers/${article.authorSlug}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/articles/${article.slug}/`,
    },
    image: article.image
      ? `${SITE_URL}${article.image}`
      : DEFAULT_OG_IMAGE,
    articleSection: article.topic,
  };

  return JSON.stringify(schema);
}

// ─── Topic Metadata ─────────────────────────────────────────────────────────

export function generateTopicMetadata(topic: Topic): Metadata {
  const url = `${SITE_URL}/topics/${topic.slug}/`;
  return {
    title: `${topic.name}`,
    description: topic.description,
    openGraph: {
      type: 'website',
      url,
      title: `${topic.name} | ${SITE_NAME}`,
      description: topic.description,
      siteName: SITE_NAME,
    },
    alternates: { canonical: url },
  };
}

// ─── Writer Metadata ─────────────────────────────────────────────────────────

export function generateWriterMetadata(writer: Writer): Metadata {
  const url = `${SITE_URL}/writers/${writer.slug}/`;
  return {
    title: writer.name,
    description: writer.bio.substring(0, 160),
    openGraph: {
      type: 'profile',
      url,
      title: `${writer.name} | ${SITE_NAME}`,
      description: writer.bio.substring(0, 160),
      siteName: SITE_NAME,
    },
    alternates: { canonical: url },
  };
}