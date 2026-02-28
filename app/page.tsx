// Homepage — Server Component
import { getAllArticles, getFeaturedArticle, getWriterBySlug, getAllTopics } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';

// ── Placeholder SVG for missing images ──────────────────────────────────────
const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'%3E%3Crect width='1200' height='630' fill='%231A1A1A'/%3E%3Crect x='0' y='0' width='8' height='630' fill='%238B1A1A'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia%2C serif' font-weight='900' font-size='72' fill='%23F5F0E8' opacity='0.07'%3ETHE COMMONER%3C/text%3E%3C/svg%3E`;

function ArticleImage({
  src,
  alt,
  sizes,
  className = '',
}: {
  src?: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      src={src || PLACEHOLDER}
      alt={alt}
      fill
      sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
      className={`object-cover transition-all duration-700 ${className}`}
      unoptimized={!src || src.startsWith('data:')}
    />
  );
}

export default function HomePage() {
  const featured = getFeaturedArticle();
  const allArticles = getAllArticles();
  const topics = getAllTopics();

  const latestArticles = allArticles.filter((a) => !a.featured).slice(0, 5);

  const topicHighlights = topics
    .map((topic) => {
      const article = allArticles.find((a) => a.topic === topic.slug && !a.featured);
      return article ? { topic, article } : null;
    })
    .filter(Boolean)
    .slice(0, 4) as Array<{
      topic: { slug: string; name: string; description: string };
      article: (typeof allArticles)[0];
    }>;

  const secondaryArticles = allArticles.filter((a) => !a.featured).slice(5, 8);

  return (
    <div className="min-h-screen bg-parchment selection:bg-crimson selection:text-parchment">
      
      {/* ── HERO FEATURED ARTICLE ─────────────────────────────────────────── */}
      {featured && (() => {
        const author = getWriterBySlug(featured.authorSlug);
        if (!author) return null;
        return (
          <section aria-label="Featured article" className="border-b-2 border-ink">
            <div className="max-w-[1400px] mx-auto px-6">

              <div className="flex items-center gap-4 py-5 border-b border-rule">
                <span className="bg-crimson text-parchment text-[0.55rem] font-sans font-black uppercase tracking-[0.28em] px-3 py-1.5">
                  Priority Dispatch
                </span>
                <div className="flex-1 h-px bg-rule" />
                <span className="text-[0.6rem] font-sans font-black uppercase tracking-[0.2em] text-ink-muted">
                  {featured.topic?.replace(/-/g, ' ')}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 py-10 md:py-14">

                <div className="lg:pr-12 lg:border-r lg:border-rule">
                  <Link href={`/articles/${featured.slug}/`} className="group block">
                    <div className="relative w-full overflow-hidden mb-8" style={{ aspectRatio: '16/9' }}>
                      <ArticleImage
                        src={featured.image}
                        alt={featured.imageAlt || featured.title}
                        sizes="(max-width: 768px) 100vw, 70vw"
                        className="group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 border-b-4 border-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <p className="text-[0.62rem] font-sans font-black uppercase tracking-[0.3em] text-crimson mb-4">
                      {featured.topic?.replace(/-/g, ' ')}
                    </p>

                    <h2
                      className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.02] tracking-[-0.02em] text-ink group-hover:text-crimson transition-colors mb-5"
                    >
                      {featured.isLive ? `Live: ${featured.title}` : featured.title}
                    </h2>
                  </Link>

                  {featured.excerpt && (
                    <p className="font-sans text-[1.05rem] text-ink-muted leading-relaxed max-w-[640px] mb-8 border-l-[3px] border-crimson pl-5">
                      {featured.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-4 pt-5 border-t border-rule">
                    <div className="w-9 h-9 rounded-full bg-ink flex items-center justify-center text-parchment text-xs font-black font-sans flex-shrink-0">
                      {author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-sans font-black uppercase tracking-[0.18em] text-ink">
                        {author.name}
                      </p>
                      <p className="text-[0.62rem] font-sans text-ink-muted uppercase tracking-widest">
                        {featured.date} · {featured.readingTime} min read
                      </p>
                    </div>
                    <Link
                      href={`/articles/${featured.slug}/`}
                      className="ml-auto text-[0.62rem] font-sans font-black uppercase tracking-[0.2em] text-crimson border-b-2 border-crimson hover:text-ink hover:border-ink transition-colors pb-0.5"
                    >
                      Read in full →
                    </Link>
                  </div>
                </div>

                <aside className="hidden lg:flex flex-col pl-12 pt-2 gap-10">

                  <blockquote className="border-l-[4px] border-crimson pl-7 py-4">
                    <p className="font-serif text-[1.45rem] font-black italic leading-[1.28] text-ink mb-3">
                      &ldquo;The analysis capital fears most is the one that names it plainly.&rdquo;
                    </p>
                    <cite className="text-[0.58rem] font-sans font-black uppercase tracking-[0.28em] text-ink-muted not-italic">
                      — The Editors
                    </cite>
                  </blockquote>

                  <div className="flex-1">
                    <p className="text-[0.55rem] font-sans font-black uppercase tracking-[0.28em] text-ink-muted mb-5">
                      More in {featured.topic?.replace(/-/g, ' ')}
                    </p>
                    <ul className="space-y-5">
                      {allArticles
                        .filter((a) => a.topic === featured.topic && !a.featured)
                        .slice(0, 3)
                        .map((a) => (
                          <li key={a.slug} className="group">
                            <Link href={`/articles/${a.slug}/`} className="flex gap-4 items-start">
                              <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden">
                                <ArticleImage
                                  src={a.image}
                                  alt={a.imageAlt || a.title}
                                  sizes="80px"
                                  className="group-hover:scale-105"
                                />
                              </div>
                              <p className="font-sans text-[0.82rem] font-bold text-ink group-hover:text-crimson leading-snug transition-colors">
                                {a.isLive ? `Live: ${a.title}` : a.title}
                              </p>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="border-t border-rule pt-6">
                    <p className="text-[0.55rem] font-sans font-black uppercase tracking-[0.28em] text-ink-muted mb-4">Browse Sections</p>
                    <div className="flex flex-wrap gap-2">
                      {topics.slice(0, 6).map((topic) => (
                        <Link
                          key={topic.slug}
                          href={`/topics/${topic.slug}/`}
                          className="text-[0.58rem] font-sans font-black uppercase tracking-[0.18em] border border-ink text-ink px-3 py-1.5 hover:bg-ink hover:text-parchment transition-colors"
                        >
                          {topic.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── MAIN CONTENT AREA ─────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_360px] gap-0">

          <section className="lg:pr-12" aria-label="Latest articles">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">
                Recent Files
              </span>
              <div className="flex-1 h-[2px] bg-ink" />
            </div>

            <div className="divide-y divide-rule">
              {latestArticles.map((article, i) => {
                const author = getWriterBySlug(article.authorSlug);
                if (!author) return null;
                return (
                  <article key={article.slug} className="group py-8 flex gap-6 items-start">
                    <span className="font-sans text-[2.5rem] font-black text-ink/[0.06] leading-none select-none flex-shrink-0 w-12 text-right pt-1 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-[0.58rem] font-sans font-black uppercase tracking-[0.25em] text-crimson mb-2">
                        {article.topic?.replace(/-/g, ' ')}
                      </p>
                      <Link href={`/articles/${article.slug}/`} className="block">
                        <h3 className="font-serif text-[1.35rem] font-black leading-[1.15] tracking-tight text-ink group-hover:text-crimson transition-colors mb-2">
                          {article.isLive ? `Live: ${article.title}` : article.title}
                        </h3>
                      </Link>
                      {article.excerpt && (
                        <p className="font-sans text-[0.87rem] text-ink-muted leading-relaxed mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-[0.6rem] font-sans uppercase tracking-widest">
                        <span className="font-black text-ink">{author.name}</span>
                        <span className="text-rule">·</span>
                        <span className="text-ink-muted">{article.date}</span>
                        <span className="text-rule">·</span>
                        <span className="text-ink-muted">{article.readingTime} min</span>
                      </div>
                    </div>

                    <Link
                      href={`/articles/${article.slug}/`}
                      className="flex-shrink-0 relative w-28 h-20 sm:w-36 sm:h-24 overflow-hidden"
                      aria-hidden="true"
                      tabIndex={-1}
                    >
                      <ArticleImage
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        sizes="160px"
                        className="grayscale group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 flex items-stretch gap-0">
              <div className="w-1.5 bg-crimson flex-shrink-0" />
              <div className="flex-1 border border-l-0 border-rule p-8 flex items-center justify-between gap-6 bg-parchment-dark">
                <div>
                  <p className="font-serif text-[1.6rem] font-black italic text-ink leading-tight mb-1">
                    The archive grows.
                  </p>
                  <p className="font-sans text-[0.8rem] text-ink-muted leading-relaxed max-w-xs">
                    Rigorous class analysis. Independent theory. No concessions to comfort.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="flex-shrink-0 bg-ink text-parchment px-7 py-3 font-sans text-[0.6rem] font-black uppercase tracking-[0.22em] hover:bg-crimson transition-colors"
                >
                  Our Manifesto →
                </Link>
              </div>
            </div>

            {secondaryArticles.length > 0 && (
              <div className="mt-14">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">
                    From the Archive
                  </span>
                  <div className="flex-1 h-px bg-rule" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {secondaryArticles.map((article) => {
                    const author = getWriterBySlug(article.authorSlug);
                    if (!author) return null;
                    return (
                      <article key={article.slug} className="group">
                        <Link href={`/articles/${article.slug}/`} className="block">
                          <div className="relative w-full overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
                            <ArticleImage
                              src={article.image}
                              alt={article.imageAlt || article.title}
                              sizes="(max-width: 640px) 100vw, 33vw"
                              className="grayscale group-hover:grayscale-0 group-hover:scale-105"
                            />
                          </div>
                          <p className="text-[0.55rem] font-sans font-black uppercase tracking-[0.25em] text-crimson mb-2">
                            {article.topic?.replace(/-/g, ' ')}
                          </p>
                          <h4 className="font-serif text-[1.05rem] font-black leading-snug text-ink group-hover:text-crimson transition-colors">
                            {article.isLive ? `Live: ${article.title}` : article.title}
                          </h4>
                        </Link>
                        <p className="font-sans text-[0.62rem] font-black uppercase tracking-widest text-ink-muted mt-2">
                          {author.name}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          <div className="hidden lg:block bg-rule" />

          <aside className="lg:pl-12 space-y-14" aria-label="Topics and highlights">

            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">
                  Subject Highlights
                </span>
                <div className="flex-1 h-[2px] bg-ink" />
              </div>

              <div className="divide-y divide-rule">
                {topicHighlights.map(({ topic, article }) => {
                  const author = getWriterBySlug(article.authorSlug);
                  if (!author) return null;
                  return (
                    <article key={article.slug} className="group py-6">
                      <Link href={`/articles/${article.slug}/`} className="block relative w-full overflow-hidden mb-4" style={{ aspectRatio: '16/8' }}>
                        <ArticleImage
                          src={article.image}
                          alt={article.imageAlt || article.title}
                          sizes="360px"
                          className="grayscale group-hover:grayscale-0 group-hover:scale-[1.03]"
                        />
                        <span className="absolute bottom-0 left-0 bg-crimson text-parchment text-[0.52rem] font-sans font-black uppercase tracking-[0.22em] px-3 py-1.5">
                          {topic.name}
                        </span>
                      </Link>

                      <Link href={`/articles/${article.slug}/`}>
                        <h4 className="font-serif text-[1.1rem] font-black leading-[1.2] text-ink group-hover:text-crimson transition-colors mb-2">
                          {article.isLive ? `Live: ${article.title}` : article.title}
                        </h4>
                      </Link>
                      <p className="text-[0.62rem] font-sans font-black uppercase tracking-widest text-ink-muted">
                        {author.name}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">
                  Central Index
                </span>
                <div className="flex-1 h-px bg-rule" />
              </div>
              <nav aria-label="Topic index">
                <ul>
                  {topics.map((topic, i) => (
                    <li key={topic.slug}>
                      <Link
                        href={`/topics/${topic.slug}/`}
                        className="group flex items-center justify-between py-3 border-b border-rule hover:border-crimson transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-sans text-[0.53rem] font-black text-crimson/40 group-hover:text-crimson transition-colors tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-sans text-[0.7rem] font-black uppercase tracking-[0.2em] text-ink group-hover:text-crimson transition-colors">
                            {topic.name}
                          </span>
                        </div>
                        <span className="text-ink/20 group-hover:text-crimson group-hover:translate-x-0.5 transition-all text-sm">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="bg-ink text-parchment p-8 relative overflow-hidden">
              <span className="absolute -bottom-6 -right-4 font-serif font-black text-[8rem] leading-none text-parchment/[0.04] select-none pointer-events-none">
                TC
              </span>

              <p className="text-[0.52rem] font-sans font-black uppercase tracking-[0.32em] text-crimson mb-3">
                Dispatch
              </p>
              <p className="font-serif text-[1.2rem] font-black italic leading-snug mb-4 relative">
                Theory delivered. No algorithm between you and the analysis.
              </p>
              <p className="font-sans text-[0.75rem] text-parchment/50 leading-relaxed mb-7">
                Join readers who refuse the mediated mainstream. Independent nodes, active.
              </p>
              <Link
                href="/subscribe"
                className="inline-block border border-parchment/30 text-parchment px-5 py-2.5 font-sans text-[0.58rem] font-black uppercase tracking-[0.22em] hover:bg-crimson hover:border-crimson transition-colors"
              >
                Get the Dispatch →
              </Link>
            </div>

            <div className="border-l-[3px] border-crimson pl-5 py-1">
              <p className="text-[0.52rem] font-sans font-black uppercase tracking-[0.28em] text-ink-muted mb-1.5">
                System Status
              </p>
              <p className="font-sans text-[0.72rem] font-bold italic text-ink-muted leading-relaxed">
                Independent nodes active. All theoretical frameworks verified. Propagating socialist analysis since establishment.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}