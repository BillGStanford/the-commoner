import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { formatDate, getTopicName } from '@/lib/data';

interface ArticleCardProps {
  article: Article;
  authorName: string;
  size?: 'default' | 'large' | 'small';
}

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'%3E%3Crect width='1200' height='630' fill='%231a1a1a'/%3E%3Crect x='0' y='0' width='12' height='630' fill='%238B1A1A'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='64' fill='%23F5F0E8' opacity='0.05'%3ETHE COMMONER%3C/text%3E%3C/svg%3E`;

function ArticleImage({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const imgSrc = src || PLACEHOLDER_SVG;
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
      className={`object-cover grayscale hover:grayscale-0 transition-all duration-700 ${className ?? ''}`}
      unoptimized={imgSrc.startsWith('data:')}
    />
  );
}

export default function ArticleCard({
  article,
  authorName,
  size = 'default',
}: ArticleCardProps) {
  const topicName = getTopicName(article.topic);
  const isLive = article.isLive || false;
  const displayTitle = isLive ? `Live: ${article.title}` : article.title;

  if (size === 'large') {
    return (
      <article className="article-card group border-l-[12px] border-ink bg-white/5 p-6 md:p-10 mb-12 shadow-[12px_12px_0_0_#8B1A1A]">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3">
            <Link
              href={`/articles/${article.slug}/`}
              className="block relative w-full mb-0 overflow-hidden border-4 border-ink"
              style={{ aspectRatio: '16/8' }}
              aria-hidden="true"
              tabIndex={-1}
            >
              <ArticleImage
                src={article.image}
                alt={article.imageAlt}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="group-hover:scale-105 transition-transform duration-700"
              />
            </Link>
          </div>
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              {isLive && (
                <span className="animate-pulse-slow bg-crimson text-parchment text-[0.6rem] font-black tracking-widest uppercase px-2 py-0.5">
                  ● Live
                </span>
              )}
              <Link href={`/topics/${article.topic}/`} className="text-[0.65rem] font-black tracking-[0.2em] uppercase text-ink/40 hover:text-crimson transition-colors">
                {topicName}
              </Link>
            </div>
            <Link href={`/articles/${article.slug}/`} className="block">
              <h2 className="font-serif text-4xl md:text-5xl font-black text-ink group-hover:text-crimson transition-colors leading-[0.9] mb-6 tracking-tighter">
                {displayTitle}
              </h2>
            </Link>
            <p className="font-sans text-lg text-ink-soft leading-tight mb-8 font-bold italic border-l-2 border-ink/10 pl-4">
              {article.excerpt}
            </p>
            <ArticleMeta
              authorSlug={article.authorSlug}
              authorName={authorName}
              date={article.date}
              readingTime={article.readingTime}
            />
          </div>
        </div>
      </article>
    );
  }

  if (size === 'small') {
    return (
      <article className="article-card group border-b-2 border-ink/10 pb-6 mb-6 hover:border-crimson transition-colors">
        <div className="flex gap-4 items-center">
          <Link
            href={`/articles/${article.slug}/`}
            className="block relative flex-shrink-0 overflow-hidden border-2 border-ink w-24 h-24 sm:w-32 sm:h-32"
            aria-hidden="true"
            tabIndex={-1}
          >
            <ArticleImage
              src={article.image}
              alt={article.imageAlt}
              sizes="128px"
              className="group-hover:rotate-3 transition-transform duration-500"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
               {isLive && (
                <span className="animate-pulse-slow bg-crimson text-parchment text-[0.5rem] font-black tracking-widest uppercase px-1.5 py-0.5">
                  ● Live
                </span>
              )}
              <Link href={`/topics/${article.topic}/`} className="text-[0.6rem] font-black tracking-widest uppercase text-crimson">
                {topicName}
              </Link>
            </div>
            <Link href={`/articles/${article.slug}/`} className="block">
              <h3 className="font-serif text-xl font-black text-ink group-hover:underline decoration-4 decoration-crimson leading-none mb-2 tracking-tight">
                {displayTitle}
              </h3>
            </Link>
            <div className="flex items-center gap-3 text-[0.65rem] font-black tracking-widest uppercase text-ink/40">
              <span className="text-ink">{authorName}</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default card
  return (
    <article className="article-card group flex flex-col mb-12">
      <div className="relative mb-6">
        <Link
          href={`/articles/${article.slug}/`}
          className="block relative w-full overflow-hidden border-b-8 border-ink"
          style={{ aspectRatio: '4/3' }}
          aria-hidden="true"
          tabIndex={-1}
        >
          <ArticleImage
            src={article.image}
            alt={article.imageAlt}
            sizes="(max-width: 768px) 100vw, 45vw"
            className="group-hover:scale-110 transition-transform duration-1000"
          />
        </Link>
        <div className="absolute top-0 right-0 bg-ink text-parchment text-[0.6rem] font-black px-3 py-1 uppercase tracking-widest">
          Report // {String(article.readingTime).padStart(2, '0')}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        {isLive && (
            <span className="animate-pulse-slow bg-crimson text-parchment text-[0.55rem] font-black tracking-widest uppercase px-2 py-0.5">
              ● Live
            </span>
        )}
        <Link href={`/topics/${article.topic}/`} className="text-xs font-black tracking-[0.3em] uppercase text-crimson">
          {topicName}
        </Link>
      </div>
      
      <Link href={`/articles/${article.slug}/`} className="block group">
        <h3 className="font-serif text-3xl font-black text-ink group-hover:text-crimson transition-colors leading-[0.85] mb-4 tracking-tighter">
          {displayTitle}
        </h3>
      </Link>
      <p className="font-sans text-base text-ink-muted leading-snug mb-6 line-clamp-3 font-medium">
        {article.excerpt}
      </p>
      <div className="mt-auto pt-4 border-t border-ink/10">
        <ArticleMeta
          authorSlug={article.authorSlug}
          authorName={authorName}
          date={article.date}
          readingTime={article.readingTime}
        />
      </div>
    </article>
  );
}

function ArticleMeta({
  authorSlug,
  authorName,
  date,
  readingTime,
}: {
  authorSlug: string;
  authorName: string;
  date: string;
  readingTime: number;
}) {
  return (
    <div className="flex items-center gap-4 text-[0.65rem] font-black tracking-widest uppercase text-ink/50 flex-wrap">
      <span>
        BY{' '}
        <Link
          href={`/writers/${authorSlug}/`}
          className="text-ink hover:text-crimson underline decoration-1 underline-offset-2 transition-colors"
        >
          {authorName}
        </Link>
      </span>
      <span className="h-1 w-1 bg-ink/20 rounded-full" />
      <time dateTime={date}>{formatDate(date)}</time>
    </div>
  );
}