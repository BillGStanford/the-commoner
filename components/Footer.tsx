'use client';

import Link from 'next/link';
import type { Topic } from '@/lib/types';

interface FooterProps {
  topics: Topic[];
}

export default function Footer({ topics }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-parchment mt-24 border-t-[12px] border-crimson no-print relative overflow-hidden">
      {/* Background Decorative Stamp */}
      <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none select-none hidden lg:block">
        <span className="text-[25rem] font-black leading-none tracking-tighter uppercase">
          TC
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand/Identity Column: Verticalized and Bold */}
          <div className="lg:col-span-5 flex flex-col items-start border-l-2 border-white/10 pl-6">
            <Link href="/" className="group mb-8">
              <div className="flex flex-col">
                <span className="masthead-title text-5xl md:text-6xl font-black text-crimson leading-[0.8]">
                  THE
                </span>
                <span className="masthead-title text-5xl md:text-6xl font-black text-parchment leading-[0.8]">
                  COMMONER
                </span>
              </div>
            </Link>
            
            <p className="text-lg font-bold font-sans leading-tight max-w-sm mb-6 text-parchment/80 italic">
              Independent left journalism covering economy, labor, politics, and
              socialist theory. Real analysis, no apologies.
            </p>

            <div className="space-y-2 group">
              <p className="text-[0.6rem] font-black tracking-[0.3em] uppercase text-crimson">
                Correspondence
              </p>
              <a
                href="mailto:editors@thecommoner.com"
                className="text-xl font-sans font-bold hover:text-crimson transition-colors underline decoration-2 underline-offset-4"
              >
                editors@thecommoner.com
              </a>
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Topics Column: Styled as an Index */}
            <div className="bg-white/5 p-8 border-t-2 border-crimson">
              <h3 className="text-xs font-sans font-black tracking-[0.4em] uppercase text-parchment/40 mb-8 flex items-center gap-2">
                <span className="h-2 w-2 bg-crimson" /> Section Index
              </h3>
              <nav aria-label="Footer topic navigation">
                <ul className="grid grid-cols-1 gap-y-3">
                  {topics.map((topic, index) => (
                    <li key={topic.slug}>
                      <Link
                        href={`/topics/${topic.slug}/`}
                        className="group flex items-center justify-between text-sm font-sans font-bold uppercase tracking-widest text-parchment/60 hover:text-parchment transition-all"
                      >
                        <span>{topic.name}</span>
                        <span className="text-[0.6rem] text-crimson opacity-0 group-hover:opacity-100 transition-opacity">
                          0{index + 1}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Links Column: High Contrast Labels */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-sans font-black tracking-[0.4em] uppercase text-parchment/40 mb-8 flex items-center gap-2">
                   <span className="h-2 w-2 bg-white/40" /> Publication
                </h3>
                <ul className="space-y-4">
                  {[
                    { label: "About The Commoner", href: "/about/" },
                    { label: "RSS Feed", href: "/rss.xml" },
                    { label: "Twitter / X", href: "https://twitter.com/TheCommonerHQ", external: true }
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        className="text-lg font-serif italic font-bold text-parchment/70 hover:text-crimson transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter placeholder: Industrial Input look */}
              <div className="mt-12 group">
                <div className="p-4 border-2 border-white/10 group-hover:border-crimson transition-colors">
                  <p className="text-[0.65rem] font-black tracking-widest uppercase text-crimson mb-1">
                    System Alert
                  </p>
                  <p className="text-xs text-parchment/40 font-sans font-bold">
                    Newsletter dispatch system coming soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: The Legal Manifesto */}
        <div className="mt-20 pt-12 border-t-2 border-white/5 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-md">
            <p className="text-[0.65rem] font-sans font-bold uppercase tracking-widest text-parchment/30 leading-loose">
              © {currentYear} The Commoner. Established for the propagation of socialist theory. 
              Content licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-parchment/60 underline decoration-crimson hover:text-crimson transition-colors"
              >
                CC BY-NC-SA 4.0
              </a>.
            </p>
          </div>
          
          <div className="text-right flex flex-col items-end">
            <div className="h-1 w-24 bg-crimson mb-4" />
            <p className="text-xl md:text-2xl font-serif font-black italic text-parchment/20 tracking-tighter leading-none">
              From each according to their ability, <br />
              to each according to their need.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}