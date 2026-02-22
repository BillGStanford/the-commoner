import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllWriters } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About — The Commoner',
  description:
    'The Commoner is an independent left publication committed to rigorous journalism, socialist theory, and solidarity.',
};

export default function AboutPage() {
  const writers = getAllWriters();

  const principles = [
    {
      label: 'Class Analysis',
      number: '01',
      body: 'We begin from the recognition that capitalist society is organized around an antagonism between those who own and those who work. This does not simplify our coverage — it clarifies it.',
    },
    {
      label: 'Anti-Imperialism',
      number: '02',
      body: 'We oppose the projection of military and economic power by wealthy states over poorer ones. We cover the Global South from the perspective of solidarity, not charity.',
    },
    {
      label: 'Feminist Politics',
      number: '03',
      body: 'We understand that reproductive labor, care work, and the gendered division of labor are central to any adequate account of how capitalism functions.',
    },
    {
      label: 'Rigor',
      number: '04',
      body: 'We correct errors. We distinguish between facts and analysis. We engage with our critics when they have substantive arguments to make.',
    },
  ];

  return (
    <div className="min-h-screen bg-parchment">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="border-b-[3px] border-ink bg-parchment">
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-crimson text-parchment text-[0.55rem] font-sans font-black uppercase tracking-[0.28em] px-3 py-1.5">
              The Manifesto
            </span>
            <div className="flex-1 h-px bg-rule" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-24 items-end">
            <div>
              <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.03em] text-ink mb-0">
                About<br />
                <span className="text-crimson">The Commoner.</span>
              </h1>
            </div>
            <div className="border-l-[3px] border-crimson pl-8 py-2">
              <p className="font-sans text-[1rem] text-ink-muted leading-relaxed">
                An independent left publication committed to rigorous journalism,
                socialist theory, and solidarity with working people everywhere.
              </p>
              <p className="text-[0.6rem] font-sans font-black uppercase tracking-[0.25em] text-ink-muted/60 mt-4">
                Est. in the spirit of the commons
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 py-14 md:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_340px] gap-0">

          {/* ── Left: Mission + Principles ── */}
          <div className="lg:pr-14 space-y-16">

            {/* Mission */}
            <section aria-labelledby="mission-heading">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">
                  Our Mission
                </span>
                <div className="flex-1 h-[2px] bg-ink" />
              </div>

              <div className="font-sans text-[1rem] text-ink-soft leading-[1.82] space-y-5 max-w-[680px]">
                <p>
                  We believe journalism has a side. The pretense of neutrality has always
                  served power. The Commoner names capitalism as the system that produces
                  the crises we cover, and names its alternatives without apology.
                </p>
                <p>
                  We are committed to factual, rigorous reporting and analysis. Being partisan
                  toward the working class does not mean being careless with evidence.
                  On the contrary: we hold ourselves to the highest standards of intellectual
                  honesty, because our readers deserve clarity, not propaganda.
                </p>
                <p>
                  The Commoner covers labor, economy, housing, international solidarity,
                  socialist theory, and the political terrain of the left. We do not take
                  advertising. We are not funded by foundations with political agendas.
                  We are supported by our readers.
                </p>
              </div>

              {/* Pull quote */}
              <blockquote className="mt-12 border-l-[4px] border-crimson pl-8 py-4">
                <p className="font-serif text-[1.7rem] font-black italic leading-[1.2] text-ink mb-3">
                  &ldquo;From each according to their ability, to each according to their need.&rdquo;
                </p>
                <cite className="text-[0.58rem] font-sans font-black uppercase tracking-[0.28em] text-ink-muted not-italic">
                  — The founding principle
                </cite>
              </blockquote>
            </section>

            {/* Editorial Principles */}
            <section aria-labelledby="principles-heading">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">
                  Editorial Principles
                </span>
                <div className="flex-1 h-[2px] bg-ink" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l border-rule">
                {principles.map((p) => (
                  <div
                    key={p.number}
                    className="border-b border-r border-rule p-8 group hover:bg-parchment-dark transition-colors"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <span className="font-sans text-[0.58rem] font-black uppercase tracking-[0.25em] text-crimson">
                        {p.label}
                      </span>
                      <span className="font-sans text-[2rem] font-black text-ink/[0.06] leading-none tabular-nums select-none">
                        {p.number}
                      </span>
                    </div>
                    <p className="font-sans text-[0.88rem] text-ink-soft leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section aria-labelledby="contact-heading">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">
                  Contact
                </span>
                <div className="flex-1 h-px bg-rule" />
              </div>

              <div className="flex items-stretch gap-0">
                <div className="w-1.5 bg-ink flex-shrink-0" />
                <div className="flex-1 border border-l-0 border-rule p-8 bg-parchment-dark">
                  <p className="font-sans text-[0.95rem] text-ink-soft leading-relaxed mb-2">
                    For editorial enquiries, pitches, or correspondence:
                  </p>
                  <a
                    href="mailto:editors@thecommoner.com"
                    className="font-serif text-[1.4rem] font-black text-ink hover:text-crimson transition-colors"
                  >
                    editors@thecommoner.com
                  </a>
                  <p className="font-sans text-[0.78rem] text-ink-muted mt-5 leading-relaxed max-w-[480px]">
                    We welcome pitches from writers with expertise in labor, political economy,
                    socialist theory, and international solidarity. Please include a short
                    description of your proposed piece and your relevant background.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Vertical rule */}
          <div className="hidden lg:block bg-rule" />

          {/* ── Right Sidebar: Contributors ── */}
          <aside className="hidden lg:block lg:pl-12" aria-label="Contributors">
            <div className="sticky top-28">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">
                  Contributors
                </span>
                <div className="flex-1 h-[2px] bg-ink" />
              </div>

              <ul className="divide-y divide-rule">
                {writers.map((writer, i) => (
                  <li key={writer.slug}>
                    <Link
                      href={`/writers/${writer.slug}/`}
                      className="group flex items-start justify-between py-5 gap-4"
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar initial */}
                        <div className="w-9 h-9 rounded-full bg-ink text-parchment flex items-center justify-center font-sans text-xs font-black flex-shrink-0 group-hover:bg-crimson transition-colors">
                          {writer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-serif text-[1rem] font-black text-ink group-hover:text-crimson transition-colors leading-tight">
                            {writer.name}
                          </p>
                          <p className="font-sans text-[0.65rem] italic text-ink-muted mt-0.5">
                            {writer.title}
                          </p>
                        </div>
                      </div>
                      <span className="text-ink/20 group-hover:text-crimson group-hover:translate-x-0.5 transition-all text-sm flex-shrink-0 mt-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Dispatch block */}
              <div className="mt-12 bg-ink text-parchment p-8 relative overflow-hidden">
                <span className="absolute -bottom-4 -right-2 font-serif font-black text-[7rem] leading-none text-parchment/[0.04] select-none pointer-events-none">
                  TC
                </span>
                <p className="text-[0.52rem] font-sans font-black uppercase tracking-[0.3em] text-crimson mb-3">
                  Dispatch
                </p>
                <p className="font-serif text-[1.05rem] font-black italic leading-snug mb-5">
                  Theory delivered. No algorithm between you and the analysis.
                </p>
                <Link
                  href="/subscribe"
                  className="inline-block border border-parchment/30 text-parchment px-5 py-2.5 font-sans text-[0.58rem] font-black uppercase tracking-[0.2em] hover:bg-crimson hover:border-crimson transition-colors"
                >
                  Get the Dispatch →
                </Link>
              </div>

              {/* Nav links */}
              <div className="mt-8 border-t border-rule pt-6 flex flex-col gap-3">
                <Link href="/" className="text-[0.62rem] font-sans font-black uppercase tracking-[0.22em] text-ink-muted hover:text-crimson transition-colors">
                  ← Back to Homepage
                </Link>
                <a href="/rss.xml" className="text-[0.62rem] font-sans font-black uppercase tracking-[0.22em] text-ink-muted hover:text-crimson transition-colors">
                  RSS Feed
                </a>
              </div>
            </div>
          </aside>

          {/* Mobile: contributors list (below main content) */}
          <div className="lg:hidden mt-16 pt-10 border-t-2 border-ink">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.55rem] font-sans font-black uppercase tracking-[0.3em] text-ink-muted whitespace-nowrap">
                Contributors
              </span>
              <div className="flex-1 h-[2px] bg-ink" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l border-rule">
              {writers.map((writer) => (
                <Link
                  key={writer.slug}
                  href={`/writers/${writer.slug}/`}
                  className="group border-b border-r border-rule p-6 flex items-center gap-4 hover:bg-parchment-dark transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-ink text-parchment flex items-center justify-center font-sans text-xs font-black flex-shrink-0 group-hover:bg-crimson transition-colors">
                    {writer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-serif font-black text-ink group-hover:text-crimson transition-colors">
                      {writer.name}
                    </p>
                    <p className="font-sans text-[0.65rem] italic text-ink-muted mt-0.5">{writer.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}