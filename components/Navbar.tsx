'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Topic } from '@/lib/types';

interface NavbarProps {
  topics: Topic[];
}

export default function Navbar({ topics }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-50 bg-parchment no-print" style={{ borderBottom: '3px solid #1A1A1A' }}>

      {/* ── Dateline Bar ── */}
      <div className="bg-parchment-dark border-b border-rule">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex items-center gap-3">
          <p className="text-[0.6rem] font-sans font-bold uppercase tracking-[0.2em] text-ink-muted hidden sm:block whitespace-nowrap">
            {today}
          </p>
          <span className="hidden md:block text-[0.55rem] font-sans text-ink-muted/40 whitespace-nowrap">
            Independent · Labor-Focused · Reader-Funded | Holding Power Accountable
          </span>

          <nav className="hidden md:flex items-center gap-3 ml-auto flex-shrink-0" aria-label="Secondary navigation">
            <Link href="/about/" className="text-[0.58rem] font-sans font-black uppercase tracking-[0.2em] text-ink-muted hover:text-crimson transition-colors px-2">
              About
            </Link>
            <a href="/rss.xml" className="text-[0.58rem] font-sans font-black uppercase tracking-[0.2em] text-ink-muted hover:text-crimson transition-colors px-2" aria-label="RSS Feed">
              RSS
            </a>
            <Link
              href="/donate"
              className="text-[0.58rem] font-sans font-black uppercase tracking-[0.2em] bg-ink text-parchment px-4 py-1.5 hover:bg-ink-soft transition-colors"
            >
              Donate
            </Link>
<a
  href="https://www.youtube.com/@thecommonertv"
  target="_blank"
  rel="noopener noreferrer"
  className="text-[0.62rem] font-sans font-black uppercase tracking-[0.2em] bg-crimson text-parchment px-4 py-2 hover:bg-crimson-light transition-colors"
  onClick={() => setMobileOpen(false)}
>
  Subscribe
</a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto p-1.5 text-ink-muted hover:text-ink transition-colors flex-shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="square" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Logo / Masthead ─────────────────────────────────────────────────
          The logo lives at /public/images/logo.png
          To swap it: replace that file. Recommended size: 800×280px PNG with
          transparent or parchment (#F5F0E8) background.
          ─────────────────────────────────────────────────────────────────── */}
      <div className="border-b border-rule">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-center">
          <Link href="/" aria-label="The Commoner — Home" className="block group">
            <Image
              src="/images/logo.png"
              alt="The Commoner"
              width={400}
              height={140}
              priority
              className="h-16 sm:h-20 md:h-[130px] w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
            />
          </Link>
        </div>
      </div>

      {/* ── Topic Navigation Bar ── */}
      <nav className="hidden md:block bg-ink" aria-label="Topic navigation">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center overflow-x-auto scrollbar-none">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}/`}
              className="group relative text-[0.65rem] font-sans font-black tracking-[0.18em] uppercase text-parchment/60 hover:text-parchment px-5 py-3.5 whitespace-nowrap transition-colors flex-shrink-0"
            >
              {/* Crimson underline slides in on hover */}
              <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-crimson scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              {topic.name}
            </Link>
          ))}

          {/* Right-aligned utility links */}
          <div className="ml-auto flex items-center border-l border-parchment/10 pl-4 gap-1 flex-shrink-0">
            <Link
              href="/about/"
              className="text-[0.6rem] font-sans font-black tracking-[0.2em] uppercase text-parchment/40 hover:text-parchment px-3 py-3.5 transition-colors whitespace-nowrap"
            >
              About
            </Link>
            <a
              href="/rss.xml"
              className="text-[0.6rem] font-sans font-black tracking-[0.2em] uppercase text-parchment/40 hover:text-parchment px-3 py-3.5 transition-colors"
            >
              RSS
            </a>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          className="md:hidden bg-ink text-parchment border-t border-parchment/10"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="divide-y divide-parchment/[0.07] px-6">
            {topics.map((topic, i) => (
              <li key={topic.slug}>
                <Link
                  href={`/topics/${topic.slug}/`}
                  className="group flex items-center justify-between py-4 text-[0.72rem] font-sans font-black uppercase tracking-[0.2em] text-parchment/60 hover:text-parchment transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-crimson/50 tabular-nums text-[0.55rem]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {topic.name}
                  </div>
                  <span className="text-parchment/20 group-hover:text-crimson group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-parchment/10 px-6 py-5 flex items-center gap-4 flex-wrap">
            <Link href="/about/" className="text-[0.62rem] font-sans font-black uppercase tracking-[0.2em] text-parchment/50 hover:text-parchment transition-colors" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <a href="/rss.xml" className="text-[0.62rem] font-sans font-black uppercase tracking-[0.2em] text-parchment/50 hover:text-parchment transition-colors">
              RSS
            </a>
            <div className="flex gap-3 ml-auto">
              <Link href="/donate" className="text-[0.62rem] font-sans font-black uppercase tracking-[0.2em] border border-parchment/30 text-parchment px-4 py-2 hover:bg-parchment/10 transition-colors" onClick={() => setMobileOpen(false)}>
                Donate
              </Link>
<a
  href="https://www.youtube.com/@thecommonertv"
  target="_blank"
  rel="noopener noreferrer"
  className="text-[0.62rem] font-sans font-black uppercase tracking-[0.2em] bg-crimson text-parchment px-4 py-2 hover:bg-crimson-light transition-colors"
  onClick={() => setMobileOpen(false)}
>
  Subscribe
</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
