// Article page — Server Component with full SSG
import type { Metadata } from 'next';
import type { Article } from '@/lib/types'; // 1. IMPORT ARTICLE TYPE
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles, getArticleWithAuthor, formatDate, getTopicName } from '@/lib/data';
import { generateArticleMetadata, generateArticleJsonLd } from '@/lib/seo';
import ShareButtons from '@/components/ShareButtons';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = getArticleWithAuthor(params.slug);
  if (!data) return {};
  return generateArticleMetadata(data, data.author.name);
}

// ─── Content renderer ─────────────────────────────────────────────────────────
function ArticleContent({ content }: { content: string }) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);

  if (isHtml) {
    return (
      <div
        className="article-prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Legacy fallback
  const blocks = content.split('\n\n').map((block, i) => {
    if (block.startsWith('## '))  return <h2 key={i}>{block.replace('## ', '')}</h2>;
    if (block.startsWith('### ')) return <h3 key={i}>{block.replace('### ', '')}</h3>;
    return <p key={i}>{block}</p>;
  });

  return <div className="article-prose">{blocks}</div>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const data = getArticleWithAuthor(params.slug);
  if (!data) notFound();

  const { author, ...article } = data;
  const topicName = getTopicName(article.topic);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thecommoner.com';
  const articleUrl = `${siteUrl}/articles/${article.slug}/`;

  // 2. CAST TO ARTICLE TYPE TO FIX THE ERROR
  const articleData = article as Article;
  const isLive = articleData.isLive || false;
  const displayTitle = isLive ? `Live: ${articleData.title}` : articleData.title;

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.topic === articleData.topic && a.slug !== articleData.slug)
    .slice(0, 3);
  const trendingArticles = allArticles
    .filter((a) => a.slug !== articleData.slug)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateArticleJsonLd(articleData, author.name) }}
      />

      <div className="min-h-screen bg-parchment">

        {/* ── FULL-BLEED HERO ────────────────────────────────────────────── */}
        {articleData.image ? (
          <div className="relative w-full overflow-hidden" style={{ height: 'clamp(340px, 55vh, 600px)' }}>
            <Image
              src={articleData.image}
              alt={articleData.imageAlt || articleData.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Dark gradient from bottom — text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

            {/* Top Left Badges Container */}
            <div className="absolute top-6 left-6 flex gap-3">
              {/* Live Badge (Conditionally Rendered) */}
              {isLive && (
                <span className="animate-pulse-slow bg-crimson text-parchment text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] px-3 py-1.5 border border-parchment/20 shadow-lg">
                  ● Live
                </span>
              )}
              
              {/* Topic Badge */}
              <Link
                href={`/topics/${articleData.topic}/`}
                className="inline-block bg-ink/80 text-parchment text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] px-3 py-1.5 hover:bg-parchment hover:text-ink transition-colors backdrop-blur-sm"
              >
                {topicName}
              </Link>
            </div>

            {/* Headline overlay at bottom of hero */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 max-w-[1400px] mx-auto">
              <h1 className="font-serif text-parchment text-[clamp(1.8rem,4.5vw,3.4rem)] font-black leading-[1.02] tracking-[-0.02em] drop-shadow-lg max-w-[820px]">
                {displayTitle}
              </h1>
            </div>
          </div>
        ) : (
          /* No image — ink header block */
          <div className="bg-ink border-b-[3px] border-crimson">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
              <div className="flex items-center gap-4 mb-6">
                 {isLive && (
                  <span className="animate-pulse-slow bg-crimson text-parchment text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] px-3 py-1.5 border border-parchment/20">
                    ● Live
                  </span>
                )}
                <Link
                  href={`/topics/${articleData.topic}/`}
                  className="inline-block bg-parchment text-ink text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] px-3 py-1.5 hover:bg-crimson hover:text-parchment transition-colors"
                >
                  {topicName}
                </Link>
              </div>
              <h1 className="font-serif text-parchment text-[clamp(1.8rem,4.5vw,3.4rem)] font-black leading-[1.02] tracking-[-0.02em] max-w-[820px]">
                {displayTitle}
              </h1>
            </div>
          </div>
        )}

        {/* ── ARTICLE META STRIP ────────────────────────────────────────── */}
        <div className="border-b-2 border-ink bg-parchment-dark">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-3">
              <ol className="flex items-center gap-2 text-[0.58rem] font-sans font-black uppercase tracking-[0.2em]">
                <li><Link href="/" className="text-ink-muted hover:text-crimson transition-colors">Home</Link></li>
                <li className="text-rule" aria-hidden>—</li>
                <li><Link href={`/topics/${articleData.topic}/`} className="text-crimson hover:text-ink transition-colors">{topicName}</Link></li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Byline */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center text-parchment text-sm font-black font-sans flex-shrink-0">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <Link
                    href={`/writers/${author.slug}/`}
                    className="text-[0.7rem] font-sans font-black uppercase tracking-[0.18em] text-ink hover:text-crimson transition-colors block"
                    rel="author"
                  >
                    {author.name}
                  </Link>
                  <p className="text-[0.6rem] font-sans italic text-ink-muted">{author.title}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3 text-[0.58rem] font-sans font-black uppercase tracking-widest text-ink-muted">
                  <time dateTime={articleData.date}>{formatDate(articleData.date)}</time>
                  <span className="text-rule">·</span>
                  <span>{articleData.readingTime} min read</span>
                </div>
                {/* Share inline */}
                <div className="flex items-center gap-2">
                  <ShareButtons url={articleUrl} title={displayTitle} />
                </div>
              </div>
            </div>

            {/* Deck / excerpt */}
            {articleData.excerpt && (
              <p className="mt-5 font-sans text-[1.05rem] text-ink leading-relaxed max-w-[720px] font-semibold border-l-[3px] border-crimson pl-5">
                {articleData.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* ── MAIN CONTENT + SIDEBAR ────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_300px] xl:grid-cols-[1fr_1px_320px] gap-0 items-start">

            {/* ══ LEFT: Article Body ════════════════════════════════════════ */}
            <article className="lg:pr-12 xl:pr-16">
              <ArticleContent content={articleData.content} />

              {/* End ornament */}
              <div className="my-14 flex items-center gap-5">
                <div className="flex-1 h-px bg-rule" />
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-crimson inline-block rotate-45" />
                  <span className="w-2 h-2 bg-crimson inline-block rotate-45" />
                  <span className="w-2 h-2 bg-crimson inline-block rotate-45" />
                </div>
                <div className="flex-1 h-px bg-rule" />
              </div>

              {/* Share row */}
              <div className="border-t-[3px] border-ink pt-6 pb-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted">
                    Share this dispatch
                  </p>
                  <ShareButtons url={articleUrl} title={displayTitle} />
                </div>
              </div>

              {/* Author bio */}
              <div className="relative overflow-hidden mt-2 mb-14">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson" />
                <div className="bg-parchment-dark pl-8 pr-8 py-8">
                  <p className="text-[0.52rem] font-sans font-black uppercase tracking-[0.35em] text-ink-muted mb-4">
                    About the author
                  </p>
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center text-parchment text-xl font-black font-sans flex-shrink-0">
                      {author.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/writers/${author.slug}/`}
                        className="font-serif text-[1.35rem] font-black text-ink hover:text-crimson transition-colors block leading-tight mb-1"
                      >
                        {author.name}
                      </Link>
                      <p className="font-sans text-[0.72rem] italic text-ink-muted mb-3">{author.title}</p>
                      <p className="font-sans text-[0.9rem] text-ink-soft leading-relaxed mb-4">{author.bio}</p>
                      <Link
                        href={`/writers/${author.slug}/`}
                        className="inline-flex items-center gap-2 text-[0.58rem] font-sans font-black uppercase tracking-[0.25em] text-crimson hover:text-ink transition-colors group"
                      >
                        All articles by {author.name}
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: More articles */}
              <div className="lg:hidden">
                <div className="flex items-center gap-4 mb-7 border-t-2 border-ink pt-8">
                  <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">More in {topicName}</span>
                  <div className="flex-1 h-[2px] bg-ink" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedArticles.slice(0, 2).map((rel) => (
                    <article key={rel.slug} className="group">
                      <Link href={`/articles/${rel.slug}/`} className="block">
                        {rel.image && (
                          <div className="relative w-full overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
                            <Image src={rel.image} alt={rel.imageAlt || rel.title} fill sizes="400px"
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                          </div>
                        )}
                        <p className="text-[0.55rem] font-sans font-black uppercase tracking-[0.25em] text-crimson mb-1.5">{getTopicName(rel.topic)}</p>
                        <h4 className="font-serif text-[1rem] font-black text-ink group-hover:text-crimson transition-colors leading-snug">{(rel as Article).isLive ? `Live: ${rel.title}` : rel.title}</h4>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </article>

            {/* Vertical divider */}
            <div className="hidden lg:block bg-rule" />

            {/* ══ RIGHT: Sidebar ════════════════════════════════════════════ */}
            <aside className="hidden lg:block lg:pl-10 xl:pl-12" aria-label="Article sidebar">
              <div className="sticky top-6 space-y-10">

                {/* ── Subscribe CTA ── */}
                <div className="border-t-[3px] border-crimson bg-parchment-dark p-7">
                  <p className="font-serif text-[1.15rem] font-black text-ink leading-tight mb-2">
                    Support Independent Journalism
                  </p>
                  <p className="font-sans text-[0.75rem] text-ink-muted leading-relaxed mb-5">
                    Subscribe to stay informed, join our community, and help us hold those in power accountable.
                  </p>
                  <Link
                    href="/subscribe"
                    className="block w-full bg-crimson text-parchment text-center py-3.5 font-sans text-[0.6rem] font-black uppercase tracking-[0.3em] hover:bg-ink transition-colors"
                  >
                    Subscribe
                  </Link>
                  <div className="flex items-center justify-center gap-5 mt-4 pt-4 border-t border-rule">
                    <span className="text-[0.55rem] font-sans font-black uppercase tracking-widest text-ink-muted">Follow us</span>
                    {/* Social icons */}
                    {[
                      { label: 'Twitter/X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                      { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                      { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' }
                    ].map(({ label, path }) => (
                      <a key={label} href="#" aria-label={label}
                        className="text-ink-muted hover:text-crimson transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path d={path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* ── Trending ── */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[0.52rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">Trending</span>
                    <div className="flex-1 h-[2px] bg-ink" />
                  </div>
                  <ul className="divide-y divide-rule">
                    {trendingArticles.map((a, i) => {
                      const tArt = a as Article;
                      return (
                        <li key={a.slug} className="group py-4">
                          <Link href={`/articles/${a.slug}/`} className="flex gap-3 items-start">
                            <span className="font-sans text-[1.6rem] font-black text-ink/[0.08] leading-none tabular-nums select-none flex-shrink-0 w-8 pt-0.5">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[0.52rem] font-sans font-black uppercase tracking-[0.22em] text-crimson mb-1">
                                {getTopicName(a.topic)}
                              </p>
                              <h4 className="font-sans text-[0.87rem] font-bold text-ink group-hover:text-crimson transition-colors leading-snug mb-1.5">
                                {tArt.isLive ? `Live: ${tArt.title}` : tArt.title}
                              </h4>
                              <p className="text-[0.55rem] font-sans font-black uppercase tracking-widest text-ink-muted/60">
                                {formatDate(a.date)}
                              </p>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Link href="/" className="inline-flex items-center gap-1.5 mt-4 text-[0.58rem] font-sans font-black uppercase tracking-[0.2em] text-ink-muted hover:text-crimson transition-colors group">
                    View all <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>

                {/* ── Pull quote accent ── */}
                <div className="bg-crimson text-parchment p-7 relative overflow-hidden">
                  <svg className="absolute top-4 left-5 w-12 h-12 text-parchment/10" fill="currentColor" viewBox="0 0 32 32" aria-hidden>
                    <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.654 1.346-3 3-3V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.654 1.346-3 3-3V8z"/>
                  </svg>
                  <p className="font-serif text-[1.1rem] font-black italic leading-[1.4] relative pt-5">
                    {articleData.excerpt || 'Rigorous analysis for the working class. No concessions.'}
                  </p>
                  <div className="mt-5 pt-4 border-t border-parchment/20 flex items-center justify-between">
                    <cite className="text-[0.52rem] font-sans font-black uppercase tracking-[0.25em] text-parchment/50 not-italic">
                      {topicName} · {formatDate(articleData.date)}
                    </cite>
                    <div className="w-6 h-6 bg-parchment/10 flex items-center justify-center">
                      <span className="text-parchment text-[0.6rem] font-black">TC</span>
                    </div>
                  </div>
                </div>

                {/* ── More in topic ── */}
                {relatedArticles.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[0.52rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">More in {topicName}</span>
                      <div className="flex-1 h-px bg-rule" />
                    </div>
                    <ul className="space-y-5">
                      {relatedArticles.map((rel) => {
                        const rArt = rel as Article;
                        return (
                          <li key={rel.slug} className="group">
                            <Link href={`/articles/${rel.slug}/`} className="block">
                              {rel.image && (
                                <div className="relative w-full overflow-hidden mb-3" style={{ aspectRatio: '16/8' }}>
                                  <Image src={rel.image} alt={rel.imageAlt || rel.title} fill sizes="320px"
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500" />
                                  <div className="absolute bottom-0 left-0 right-0 h-px bg-crimson opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              )}
                              <p className="text-[0.52rem] font-sans font-black uppercase tracking-[0.22em] text-crimson mb-1.5">{getTopicName(rel.topic)}</p>
                              <h5 className="font-sans text-[0.87rem] font-bold text-ink group-hover:text-crimson transition-colors leading-snug">
                                {rArt.isLive ? `Live: ${rArt.title}` : rArt.title}
                              </h5>
                            </Link>
                            <p className="text-[0.55rem] font-sans font-black uppercase tracking-widest text-ink-muted/60 mt-1.5">{formatDate(rel.date)}</p>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href={`/topics/${articleData.topic}/`}
                      className="inline-flex items-center gap-1.5 mt-6 text-[0.58rem] font-sans font-black uppercase tracking-[0.22em] border-b-2 border-crimson text-crimson hover:text-ink hover:border-ink transition-colors pb-0.5 group"
                    >
                      All {topicName} articles
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                )}

              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}