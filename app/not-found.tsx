import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-40 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Glitch Element */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[30vw] font-black leading-none">ERROR</span>
      </div>

      <div className="relative z-10">
        <div className="inline-block bg-crimson text-parchment px-4 py-1 text-xs font-black tracking-[0.5em] uppercase mb-8 shadow-[4px_4px_0_0_#000]">
          Status: 404 // File Not Found
        </div>
        
        <h1 className="font-serif text-7xl md:text-9xl font-black text-ink mb-6 tracking-tighter leading-none uppercase">
          Lost to <br />
          <span className="text-crimson">History</span>
        </h1>
        
        <div className="max-w-lg mx-auto mb-12 border-y-2 border-ink/10 py-8">
          <p className="font-sans text-xl md:text-2xl text-ink font-bold leading-tight italic">
            The requested document does not exist in our archives, or has been 
            reassigned to a different sector.
          </p>
        </div>

        <Link
          href="/"
          className="group relative inline-flex items-center gap-6 bg-ink text-parchment px-10 py-5 transition-all hover:bg-crimson shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none"
        >
          <span className="font-sans font-black text-sm tracking-[0.3em] uppercase">
            Return to Homepage
          </span>
          <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}