import type { Metadata } from 'next';
import Script from 'next/script';
import '@/styles/globals.css';
import { getAllTopics } from '@/lib/data';
import { baseMetadata } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Re-export base metadata (favicons are now configured here)
export const metadata: Metadata = baseMetadata;

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch topics server-side for navbar/footer (executed at build time)
  const topics = getAllTopics();

  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />

        {/* RSS autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Commoner RSS Feed"
          href="/rss.xml"
        />

        {/* 
           REMOVED: Manual favicon links.
           These are now handled automatically by the `icons` property in baseMetadata (lib/seo.ts).
        */}

        {/* Google Analytics 4 */}
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-crimson focus:text-parchment focus:px-4 focus:py-2 focus:text-sm focus:font-sans"
        >
          Skip to main content
        </a>

        <Navbar topics={topics} />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer topics={topics} />
      </body>
    </html>
  );
}