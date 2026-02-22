import type { MetadataRoute } from 'next';
import { getAllArticles, getAllTopics, getAllWriters } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thecommoner.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const topics = getAllTopics();
  const writers = getAllWriters();

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}/`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const topicEntries: MetadataRoute.Sitemap = topics.map((t) => ({
    url: `${SITE_URL}/topics/${t.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const writerEntries: MetadataRoute.Sitemap = writers.map((w) => ({
    url: `${SITE_URL}/writers/${w.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...articleEntries,
    ...topicEntries,
    ...writerEntries,
  ];
}
