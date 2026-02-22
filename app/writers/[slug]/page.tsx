import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllWriters, getWriterBySlug, getArticlesByAuthor } from '@/lib/data';
import { generateWriterMetadata } from '@/lib/seo';
import ArticleCard from '@/components/ArticleCard';
import SectionLabel from '@/components/SectionLabel';

export async function generateStaticParams() {
  return getAllWriters().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const writer = getWriterBySlug(params.slug);
  if (!writer) return {};
  return generateWriterMetadata(writer);
}

export default function WriterPage({ params }: { params: { slug: string } }) {
  const writer = getWriterBySlug(params.slug);
  if (!writer) notFound();

  const articles = getArticlesByAuthor(writer.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Writer profile */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Avatar placeholder */}
            <div
              className="w-24 h-24 rounded-full bg-ink-muted mb-4 flex items-center justify-center text-parchment text-2xl font-serif font-bold"
              aria-hidden
            >
              {writer.name.charAt(0)}
            </div>
            <h1 className="font-serif text-2xl font-bold text-ink mb-1">{writer.name}</h1>
            <p className="text-sm font-sans italic text-crimson mb-4">{writer.title}</p>
            <p className="text-sm font-sans text-ink-soft leading-relaxed mb-4">{writer.bio}</p>
            {writer.twitter && (
              <a
                href={`https://twitter.com/${writer.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-semibold text-crimson hover:underline"
              >
                {writer.twitter}
              </a>
            )}
          </div>
        </aside>

        {/* Articles */}
        <div className="lg:col-span-3">
          <SectionLabel>
            {articles.length} Article{articles.length !== 1 ? 's' : ''} by {writer.name}
          </SectionLabel>

          {articles.length === 0 ? (
            <p className="font-sans text-ink-muted italic">No articles published yet.</p>
          ) : (
            articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                authorName={writer.name}
                size="default"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
