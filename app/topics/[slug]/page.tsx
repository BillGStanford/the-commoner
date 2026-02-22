import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTopics, getTopicBySlug, getArticlesByTopic, getWriterBySlug } from '@/lib/data';
import { generateTopicMetadata } from '@/lib/seo';
import ArticleCard from '@/components/ArticleCard';
import SectionLabel from '@/components/SectionLabel';

export async function generateStaticParams() {
  return getAllTopics().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const topic = getTopicBySlug(params.slug);
  if (!topic) return {};
  return generateTopicMetadata(topic);
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);
  if (!topic) notFound();

  const articles = getArticlesByTopic(topic.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 selection:bg-crimson selection:text-parchment">
      {/* Institutional Header */}
      <header className="border-l-[12px] border-ink pl-6 md:pl-12 mb-16 md:mb-24">
        <span className="inline-block bg-crimson text-parchment text-[0.6rem] font-black tracking-[0.4em] uppercase px-3 py-1 mb-6 shadow-[4px_4px_0_0_#1a1a1a]">
          Subject Classification
        </span>
        <h1 className="font-serif text-6xl md:text-8xl font-black text-ink mb-6 tracking-tighter leading-none">
          {topic.name}<span className="text-crimson">.</span>
        </h1>
        <p className="font-sans text-xl md:text-2xl text-ink font-bold leading-tight max-w-3xl italic opacity-80">
          {topic.description}
        </p>
      </header>

      {/* Article Count & Listing */}
      <div className="relative">
        <SectionLabel className="mb-12">
          Found Entries // {String(articles.length).padStart(2, '0')}
        </SectionLabel>

        {articles.length === 0 ? (
          <div className="p-12 border-2 border-dashed border-ink/20 text-center">
            <p className="font-sans text-ink-muted italic font-bold">No articles currently filed under this classification.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            {articles.map((article) => {
              const author = getWriterBySlug(article.authorSlug);
              if (!author) return null;
              return (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  authorName={author.name}
                  size="default"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}