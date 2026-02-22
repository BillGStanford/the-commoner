# The Commoner

**Independent Left Journalism**

A production-grade, statically generated digital publication platform built with Next.js 14 App Router, TypeScript, and TailwindCSS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | TailwindCSS |
| Rendering | Server Components + SSG |
| Data | Local JSON files |
| Deployment | Vercel / Netlify (static export) |

---

## Project Structure

```
/app
  layout.tsx              → Root layout (fonts, GA, navbar, footer)
  page.tsx                → Homepage
  not-found.tsx           → 404 page
  sitemap.ts              → Auto-generated sitemap.xml
  robots.ts               → robots.txt
  /articles/[slug]/
    page.tsx              → Article pages (SSG)
  /topics/[slug]/
    page.tsx              → Topic pages (SSG)
  /writers/[slug]/
    page.tsx              → Writer profile pages (SSG)
  /about/
    page.tsx              → About page

/components
  Navbar.tsx              → Sticky navbar with dynamic topics (client)
  Footer.tsx              → Institutional footer with topic nav
  ArticleCard.tsx         → Reusable card (3 sizes: large/default/small)
  ShareButtons.tsx        → Social share buttons (client)
  SectionLabel.tsx        → Editorial section header

/lib
  types.ts                → TypeScript interfaces
  data.ts                 → Data access layer (all content queries)
  seo.ts                  → Metadata + JSON-LD generators

/data
  articles.json           → All articles
  writers.json            → Contributor profiles
  topics.json             → Topic definitions

/styles
  globals.css             → Global styles, typography, custom properties

/public
  /images                 → Article and writer images
```

---

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/the-commoner.git
cd the-commoner

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Content Management

All content lives in `/data/`. No CMS, no database.

### Adding an Article

Edit `/data/articles.json` and add a new object:

```json
{
  "slug": "your-article-slug",
  "title": "Your Article Title",
  "excerpt": "A compelling summary under 200 characters.",
  "content": "Full article content. Use \\n\\n to separate paragraphs. ## for H2, ### for H3.",
  "authorSlug": "writer-slug",
  "topic": "economy",
  "date": "2024-04-01",
  "featured": false,
  "image": "/images/articles/your-image.jpg",
  "imageAlt": "Descriptive alt text for the image",
  "readingTime": 8
}
```

Only one article should have `"featured": true` — this becomes the homepage hero.

### Adding a Writer

Edit `/data/writers.json`:

```json
{
  "slug": "firstname-lastname",
  "name": "First Last",
  "bio": "Short biography...",
  "title": "Role / Title",
  "image": "/images/writers/firstname-lastname.jpg",
  "twitter": "@handle"
}
```

### Adding a Topic

Edit `/data/topics.json`:

```json
{
  "slug": "topic-slug",
  "name": "Topic Name",
  "description": "Brief description of what this topic covers."
}
```

Topics automatically populate: navbar, footer, topic pages, and article metadata.

---

## SEO Implementation

### Per-page Metadata
Every page generates unique:
- `<title>` with site name template
- `<meta name="description">`
- Canonical URL
- OpenGraph tags (og:title, og:description, og:image, og:type)
- Twitter Card (summary_large_image)
- Article-specific: publishedTime, author, section

### JSON-LD Structured Data
Article pages include `schema.org/NewsArticle` structured data with:
- headline, description, datePublished, dateModified
- author (Person) with URL
- publisher (Organization) with logo
- mainEntityOfPage
- image

### Sitemap
Auto-generated at `/sitemap.xml` via `app/sitemap.ts`. Includes all articles, topics, writer pages, and static pages with appropriate priority and changeFrequency.

### Performance
- Server Components for all content pages
- Static generation at build time
- Minimal client JS (only Navbar mobile menu + ShareButtons)
- No heavy UI libraries
- Google Fonts loaded with preconnect

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SITE_URL` → your domain (e.g., `https://thecommoner.com`)
- `NEXT_PUBLIC_GA_ID` → your GA4 Measurement ID (optional)

### Netlify

```bash
# Build command
npm run build

# Publish directory
out
```

The `next.config.js` is configured with `output: 'export'` for full static export compatible with any static host.

### Self-hosted / GitHub Pages

```bash
npm run build
# Upload the /out directory to your server or GitHub Pages
```

---

## Analytics

Google Analytics 4 is integrated in `app/layout.tsx` via Next.js Script component.

To enable:
1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

Analytics scripts only load in production when `NEXT_PUBLIC_GA_ID` is set.

---

## Future Extensions

The architecture is prepared for:

| Feature | Notes |
|---|---|
| MDX articles | Replace JSON content strings with `.mdx` files |
| Newsletter | Add form component + Buttondown/Mailchimp API |
| Dark mode | CSS variables already structured for theme switching |
| RSS feed | Add `/app/rss.xml/route.ts` returning XML |
| Search | Add Fuse.js client-side search over articles JSON |
| PWA | Add `next-pwa` package and `manifest.json` |
| Comments | Integrate utterances or Disqus |

---

## License

Content: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)  
Code: MIT
