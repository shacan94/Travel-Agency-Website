# CLAUDE.md — [BRAND_NAME] Travel Agency Website

> This document is the single source of truth for Claude Code when building, editing, or extending this project. Read this entire file before generating, modifying, or refactoring code. When in doubt, prefer fewer, more refined components over many shallow ones. Quality over quantity — always.

---

## 0. Mission & Quality Bar

**Mission.** Build a fast, conversion-driven, premium-feeling website for **[BRAND_NAME]**, a mid-sized travel agency in Pakistan. The agency operates three revenue lines: outbound leisure packages (Dubai, Turkey, Thailand, Azerbaijan, and similar), domestic Northern Areas tours, and Umrah / Hajj operations. The site is the front door to an AI-assisted operations model: it captures leads, hands them to a 24/7 WhatsApp concierge, feeds an AI quote generator, and (Phase 3) drives a visa documentation portal.

**Strategic context.** Based on a diagnostic of the business, three operational bottlenecks define every product decision on this site:

1. **Slow quote turnaround.** Clients shop 3–4 agencies simultaneously on WhatsApp; the first credible quote wins. The site must move every inbound lead toward a structured brief that the AI quote generator can act on in minutes.
2. **WhatsApp inquiry overload.** ~70% of inbound leads arrive on WhatsApp. The site must integrate cleanly with the WhatsApp Business API and the AI concierge — never compete with it.
3. **Visa documentation chaos.** Visa-required destinations (Schengen, UK, US, Saudi for Umrah) drive refunds and negative Google reviews. Phase 3 introduces a client portal with AI document verification.

The website is not a brochure. It is the customer-facing layer of a small operations company that has chosen AI as its scaling lever.

**Quality bar (non-negotiable):**

- Visual: editorial layout, photography-led, generous whitespace, restrained motion. The site must look like the agency knows what it's doing — closer to a design studio than a tour-operator dashboard.
- Performance: Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, and SEO on a mid-tier Android device on 4G — a meaningful share of traffic is mobile in Pakistan.
- Accessibility: WCAG 2.2 AA. Keyboard navigable, screen-reader friendly, `prefers-reduced-motion` respected.
- Code: TypeScript strict, no `any`, no unused symbols, no dead routes. Components do one thing.
- Conversion: every page has a clear primary action — either "Inquire" (form) or "Chat on WhatsApp" (deep link). Never both with equal weight.
- Trust: real photography, real itineraries, real reviews when supplied. No stock placeholders that survive past Phase 1.

**Inspiration reference:** [aalishaantravels.com](https://aalishaantravels.com/) is the structural reference for the **information architecture** (the page set — destinations, packages, Umrah, visa, gallery, contact, inquiry — is the local-market norm). **Do not copy** layout, components, copy, or visual style. The competitor site is busy, price-stamped, and visually loud; our reinterpretation is calm, editorial, and conversion-engineered.

---

## 1. Brand & Voice

**Brand placeholders.** Throughout the codebase use the following placeholders so they can be replaced in one pass later:

- `[BRAND_NAME]` — the agency name
- `[BRAND_TAGLINE]` — short tagline (≤ 8 words)
- `[CONTACT_EMAIL]`, `[CONTACT_PHONE]`, `[CONTACT_ADDRESS]`
- `[WHATSAPP_NUMBER_E164]` — for `wa.me/` deep links, in E.164 format (e.g. `923708228688`)
- `[WHATSAPP_BUSINESS_NUMBER]` — display string for the WhatsApp Business API line
- `[INSTAGRAM_URL]`, `[FACEBOOK_URL]`, `[YOUTUBE_URL]`, `[TIKTOK_URL]`, `[GOOGLE_BUSINESS_URL]`
- `[PAKISTAN_OFFICES]` — array of `{ city, address, phone }` for offices (Karachi, Lahore, Islamabad as relevant)

Centralize these in `src/lib/brand.ts` so updates happen in one place.

**Voice & tone.**

- Confident, plain-spoken, locally credible. Written in English, for Pakistani and regional travellers who are evaluating multiple agencies.
- Specific over superlative. "Six nights in Cappadocia, two of them in a cave hotel" beats "an unforgettable Turkey experience".
- Acknowledge the categories Pakistani travellers actually buy: outbound family trips, Umrah groups, Northern Areas honeymoons and family tours, visa support.
- Avoid: ALL CAPS package titles, exclamation marks, "world-class", "best", "amazing", "limited seats!!", price urgency, emoji-laden copy.
- Prefer: real durations, real inclusions, named hotels where contracted, named cities and experiences.

**Audience (in priority order).**

1. Pakistani middle- and upper-middle-class families and couples planning outbound trips (Dubai, Turkey, Thailand, Azerbaijan, Maldives, Sri Lanka, Europe).
2. Pakistani families and groups planning Umrah / Hajj.
3. Pakistani domestic travellers planning Northern Areas trips (Hunza, Skardu, Naran, Kalam).
4. Diaspora and regional clients (UAE, KSA, UK) booking trips that originate or transit through Pakistan.

The site is English-only at launch (per project decision). Urdu support is a Phase 2 consideration if data justifies it; the AI WhatsApp concierge already covers Urdu in the messaging channel.

**Pricing display policy.** Inquiry-only. No prices on any package or destination page. Every "From PKR X" is replaced with **"Request a quote"** that opens the inquiry form pre-filled with the package context. This is a deliberate departure from the local-market norm — it forces the AI quote generator into every conversion path and positions the agency above price-shoppers.

---

## 2. Tech Stack

| Layer            | Choice                                          | Notes                                                                 |
| ---------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| Framework        | **Next.js 15+ (App Router)**                    | React Server Components by default; client components only when needed |
| Language         | **TypeScript** (strict)                         | `"strict": true`, `"noUncheckedIndexedAccess": true`                  |
| Styling          | **Tailwind CSS v4** + CSS variables for tokens  | No CSS-in-JS. No styled-components.                                   |
| UI primitives    | **shadcn/ui** (Radix under the hood)            | Install per-component; restyle to match the design system.            |
| Icons            | **lucide-react**                                | Use sparingly; hairline strokes.                                      |
| Fonts            | `next/font` with **Cormorant Garamond** (serif display) + **Inter** (sans body) | Self-hosted, `display: swap`. |
| Images           | `next/image` + AVIF/WebP                        | Always provide `alt`, `sizes`, and explicit `width`/`height`.         |
| Animation        | **Framer Motion** (sparingly) + CSS transitions | Respect `prefers-reduced-motion`.                                     |
| Forms            | **react-hook-form** + **zod**                   | Server actions for submission; zod schemas shared with API routes.    |
| Content (Phase 1)| **MDX + typed loaders** in `src/content/`       | Easy to author; no CMS dependency at launch. Sanity in Phase 2.       |
| Email (forms)    | **Resend** via server action                    | Wrap in a `sendInquiry()` server function. CC the WhatsApp ops inbox. |
| Messaging        | **WhatsApp Business Cloud API**                 | Deep links sitewide; Phase 1 manual handoff, Phase 2 AI concierge.    |
| AI               | **Anthropic Claude API** (server-side only)     | Used by quote generator (Phase 2) and visa verification (Phase 3).    |
| Storage (Ph 3)   | **Vercel Blob** or **Supabase Storage**         | Client document uploads for the visa portal.                          |
| Database (Ph 2+) | **Postgres on Neon** (via Prisma)               | Lead records, quote drafts, visa file state. Not needed in Phase 1.   |
| Analytics        | **Vercel Analytics** + **Vercel Speed Insights** + **GA4** (optional) | Track inquiry conversion rate, WhatsApp click-throughs.   |
| Lint/Format      | **ESLint** (next/core-web-vitals) + **Prettier** + **prettier-plugin-tailwindcss** | Pre-commit via lint-staged. |
| Tests            | **Vitest** (unit) + **Playwright** (smoke e2e)  | Cover inquiry form, package detail, WhatsApp deep link, nav.          |
| Package manager  | **pnpm**                                        | `pnpm-lock.yaml` committed.                                           |
| Node             | LTS (≥ 20)                                      | Set in `.nvmrc` and `engines` field.                                  |

Do not introduce additional libraries without strong justification. Each dependency is a tax.

---

## 3. Project Structure

```
.
├── public/
│   ├── images/                # optimized hero & section imagery
│   ├── packages/              # package-specific photography
│   └── favicons/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                       # Home
│   │   │   ├── destinations/
│   │   │   │   ├── page.tsx                   # Index
│   │   │   │   └── [slug]/page.tsx            # Destination detail
│   │   │   ├── packages/
│   │   │   │   ├── page.tsx                   # All packages (outbound + domestic)
│   │   │   │   └── [slug]/page.tsx            # Package detail
│   │   │   ├── umrah/
│   │   │   │   ├── page.tsx                   # Umrah landing
│   │   │   │   └── [slug]/page.tsx            # Umrah group detail
│   │   │   ├── northern-areas/page.tsx        # Domestic landing
│   │   │   ├── visa/
│   │   │   │   ├── page.tsx                   # Visa services overview
│   │   │   │   └── [country]/page.tsx         # Per-country visa requirements
│   │   │   ├── about/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── inquire/page.tsx               # Inquiry form (primary CTA)
│   │   ├── (portal)/                          # Phase 3 — visa client portal (gated)
│   │   │   └── visa-portal/...
│   │   ├── api/
│   │   │   ├── inquiry/route.ts               # Lead capture endpoint
│   │   │   ├── quote/route.ts                 # Phase 2 — AI quote generator
│   │   │   └── visa/route.ts                  # Phase 3 — document verification
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx
│   ├── components/
│   │   ├── ui/                                # shadcn primitives
│   │   ├── layout/                            # Header, Footer, Container, WhatsAppCTA
│   │   ├── sections/                          # Hero, FeaturedPackages, ProcessStrip, etc.
│   │   └── forms/                             # InquiryForm and field components
│   ├── content/
│   │   ├── destinations/                      # MDX + frontmatter
│   │   ├── packages/                          # MDX + frontmatter
│   │   ├── umrah/                             # MDX + frontmatter
│   │   └── visa/                              # MDX + frontmatter
│   ├── lib/
│   │   ├── brand.ts                           # brand constants + WhatsApp helpers
│   │   ├── whatsapp.ts                        # wa.me deep-link builder
│   │   ├── seo.ts                             # default metadata helpers
│   │   ├── content.ts                         # MDX loaders, typed
│   │   ├── inquiry.ts                         # zod schema + server action
│   │   ├── quote.ts                           # (Phase 2) Claude prompt + PDF render
│   │   ├── visa.ts                            # (Phase 3) embassy rules + verification
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
├── tests/
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 4. Design System

### 4.1 Color tokens

Define in `globals.css` as CSS variables; Tailwind reads via `theme.extend.colors`. Names are semantic — never reference raw hex in components.

```
--color-ink:        #0F0E0C   /* near-black, body text */
--color-bone:       #F6F2EC   /* primary background */
--color-paper:      #FFFFFF
--color-sand:       #E7DFD2   /* soft surfaces */
--color-clay:       #B08A5B   /* primary accent — warm bronze, used on CTAs */
--color-clay-deep:  #8C6A3E
--color-forest:     #2E3A2C   /* secondary accent */
--color-mist:       #C9C3B8   /* hairlines, dividers */
--color-success:    #2E5D3A   /* WhatsApp CTA, success states */
--color-error:      #8C2F2F
```

Photography supplies the color. UI surfaces stay quiet so package and destination imagery does the heavy lifting.

### 4.2 Typography

- **Display:** Cormorant Garamond, 300/400 weights.
- **Body:** Inter, 400/500 weights, 16–17px base, 1.6–1.7 line-height.
- **Eyebrow:** Inter, 11–12px, uppercase, +0.18em letter-spacing.
- **Scale (rem):** `0.75 · 0.875 · 1 · 1.125 · 1.25 · 1.5 · 2 · 2.5 · 3.25 · 4.5 · 6`.
- H1 (hero): Cormorant, 4.5rem desktop / 2.75rem mobile, weight 300.
- H2: Cormorant, 3.25rem / 2.25rem.
- H3: Cormorant, 2rem / 1.5rem.
- Long-form prose uses a max measure of ~68ch.

### 4.3 Spacing, layout, motion

- 8px base grid. Section rhythm: `py-20 md:py-28 lg:py-32`.
- Container: max-width `1320px`, side padding `clamp(1.25rem, 4vw, 3rem)`.
- Hairline rules: `1px solid var(--color-mist)`.
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`; durations 250–500ms.
- No auto-rotating carousels. No parallax. No drop shadows except on focus rings and the floating WhatsApp CTA.

### 4.4 Imagery rules

- Photography only — no illustrations, no flag thumbnails, no stock-looking compositions.
- Aspect ratios: 3:4 (portrait), 4:5 (editorial), 16:9 (hero), 1:1 (utility).
- Every image has a meaningful `alt`. Decorative-only images get `alt=""` and `aria-hidden`.
- Always specify `sizes`. The current page's hero is `priority`.

### 4.5 The WhatsApp CTA component

WhatsApp is the agency's dominant channel and must be a first-class UI element, **not** a noisy floating bubble.

- Visible in the header on every page as a discrete pill ("Chat on WhatsApp") with the brand-success color.
- Repeated in the footer.
- Appears as a sticky bottom-right pill on mobile only, with `aria-label="Chat with us on WhatsApp"`, hidden when the inquiry form is in view.
- Every deep link is built by `buildWhatsAppLink({ context })` in `src/lib/whatsapp.ts` and pre-fills the message with the current page context (e.g. "Hi, I'd like more details on the 7-day Turkey package.").
- Tracked as a conversion event in analytics.

---

## 5. Information Architecture & Page Specs

### 5.1 Site map

```
Home
Destinations              → index + detail
Packages                  → index + detail  (outbound + domestic combined, filterable)
Umrah                     → landing + group detail pages
Northern Areas            → landing (domestic content)
Visa Services             → overview + per-country pages
About
Gallery
Contact
Inquire                   → primary form
WhatsApp                  → deep link (no page; CTA only)
Visa Portal (Phase 3)     → gated, post-booking
```

Primary nav: `Destinations · Packages · Umrah · Visa · About · Contact`. Two persistent CTAs anchor the header right: **Inquire** (button) and **WhatsApp** (pill). On mobile, both collapse into a sticky bottom bar.

### 5.2 Home page sections (in order)

1. **Hero.** Full-bleed photograph of a destination on rotation by season (not a slideshow — a single hero swapped at build time or by feature flag). One-line display headline. Eyebrow above. Two CTAs: **Plan your trip** (inquiry form) and **Chat on WhatsApp**.
2. **Value strip.** 3 short statements: "Quotes in hours, not days" · "Real itineraries, no copy-paste" · "Visa support that actually replies." (These are the diagnostic painpoints reframed as customer promises.)
3. **Featured packages.** Editorial grid of 4–8 curated packages spanning outbound, Umrah, and Northern Areas. Each card: photograph, country/region eyebrow, package title (sentence case, not ALL CAPS), duration (e.g. "7 nights"). No prices. CTA on card hover: "Request quote".
4. **Destinations.** Horizontal-scrolling row of destination cards (portrait 3:4). Tap-through to destination detail.
5. **Umrah strip.** Dedicated section with a single editorial image and a short paragraph — Umrah is its own product, not a footnote.
6. **Northern Areas strip.** Same treatment, domestic focus.
7. **How we plan.** 3 steps: **Share your brief** → **Get a tailored quote within hours** → **Travel with a dedicated agent on WhatsApp**. Each step gets a number, one short paragraph, and a tiny "Powered by AI" footnote on step 2 once Phase 2 ships.
8. **Press / Google reviews proof.** Pull-quotes with named clients (only when supplied) and the Google Business rating snippet.
9. **Inquiry CTA.** Full-bleed dark surface, one sentence, **Inquire** button. WhatsApp deep link as secondary text link.

Each section lives in its own component in `src/components/sections/`.

### 5.3 Package detail (`/packages/[slug]`)

Hero image · package title (e.g. "Seven nights in Turkey, Istanbul to Cappadocia") · duration · countries/cities · who it's for (1 sentence) · editorial summary · **day-by-day itinerary** in an accessible accordion · **inclusions / exclusions** as two clear lists · "Stays on this package" (named hotels where contracted) · gallery · **"Request quote"** primary CTA which opens the inquiry form pre-filled with the package slug · **"Chat on WhatsApp about this package"** as secondary CTA.

No price. The CTA always routes to the quote/inquiry pipeline.

### 5.4 Destination detail (`/destinations/[slug]`)

Hero · destination name · short editorial introduction · "When to go" sidebar · "Packages we run here" (linked package cards) · gallery · inquiry CTA.

### 5.5 Umrah (`/umrah` and `/umrah/[slug]`)

Umrah is the most reputation-sensitive product. The landing page must:

- Open with a calm, respectful hero — no neon overlays, no fireworks. Use editorial imagery of Madinah/Makkah with permission.
- Explain the agency's Umrah model in two paragraphs: group sizes, hotel categories (5-star / 4-star / 3-star tiers), departure cities (Karachi, Lahore, Islamabad), and what "shifting" means if relevant.
- List active group departures as cards (Shawwal, Ramadan, off-season) with departure city eyebrow, duration, hotel tier.
- "Request quote" → inquiry form with `intent=umrah` pre-set.
- Include a clear visa-process explainer linking to `/visa/saudi-umrah`.

### 5.6 Northern Areas (`/northern-areas`)

Domestic product. Same template as Umrah landing: editorial intro, active packages (Hunza, Skardu, Naran, Kalam, Malam Jabba), seasonal guidance, gallery, inquiry CTA.

### 5.7 Visa Services (`/visa` and `/visa/[country]`)

Overview page lists countries the agency actively supports (Schengen, UK, US, Saudi for Umrah, Thailand, Malaysia, Singapore, Azerbaijan, UAE, etc.). Each country detail page has:

- **What we help with** (consultation, documentation review, appointment booking, application support — never guarantees of approval).
- **Required documents** as a clear, embassy-specific checklist.
- **Processing times** as a range.
- **Common rejection reasons** (this builds trust and feeds directly into Phase 3 visa portal logic).
- **"Start your visa file"** CTA → inquiry form with `intent=visa&country=<slug>`.

No prices listed for visa services either. The form captures the country and routes the lead.

### 5.8 Inquiry form (`/inquire`)

This is the most important page on the site. Treat its UX as more important than the homepage.

Multi-step, single page, progressive disclosure, all on one URL with state in the URL hash for back-button support:

1. **What brings you here?** Outbound package · Umrah · Northern Areas · Visa support · Something else.
2. **Where & when.** Destination(s) — chip multi-select pre-populated from content · approximate dates · flexibility.
3. **Who's travelling.** Adults, children (with ages), travel style (family / couple / friends / solo / group).
4. **Budget guidance.** Ranges in PKR, not exact figures. ("Helps us match you to the right hotel tier — we'll never share this externally.")
5. **Your details.** Name · WhatsApp number (E.164, validated) · email (optional) · preferred contact method · preferred contact window.

On submit:

- Validate with zod on the server.
- Persist the lead (Phase 2+ to Postgres; Phase 1 to Resend email + a Google Sheet via webhook is acceptable).
- Send a Resend email to `[INQUIRY_RECIPIENT_EMAIL]` with a clean plain-text summary.
- Trigger the AI quote generator in Phase 2 (see §6.2).
- Show a calm full-page confirmation: "We've received your brief. An agent will reply on WhatsApp within [X] hours." Provide the WhatsApp deep link prominently on the confirmation page.

Anti-bot: honeypot field + Cloudflare Turnstile + server-side IP rate limit (5/hour).

### 5.9 About, Contact, Gallery

- **About:** Founder note, team photos, partner network, named hotel/airline relationships when supplied, Google rating snippet.
- **Contact:** Each office address, map embed, phone, email, WhatsApp, opening hours, response-time expectation.
- **Gallery:** Editorial masonry of agency-supplied photography. No watermarks. No client faces without consent.

---

## 6. AI Operations Layer

The website is the front-end to three AI-assisted workflows. Each is phased.

### 6.1 Phase 1 — WhatsApp lead routing (ships at launch)

- Every CTA that says "WhatsApp" uses `buildWhatsAppLink({ context })` in `src/lib/whatsapp.ts`.
- Context includes the page slug, package title (if any), and a referrer hint so the agent can answer with full context.
- Until Phase 2 lands, the inbox is human-staffed during office hours and queued after-hours.

### 6.2 Phase 2 — AI quote generator (post-launch, ~month 2)

- `src/lib/quote.ts` defines a server-side workflow:
  1. The inquiry payload (validated via zod) is loaded into a Claude prompt template alongside retrieval from an internal knowledge base of hotel rates, supplier contracts, flight options, and historical quotes.
  2. Claude returns a structured itinerary JSON (day-by-day, inclusions, exclusions, suggested hotels, indicative pricing).
  3. A React-PDF (or `@react-pdf/renderer`) template renders a branded PDF.
  4. The PDF is emailed to the agent (not the client) for a fast human review, then forwarded to the client via WhatsApp from the agent's number.
- All knowledge-base content lives outside the public repo, in private storage with restricted env access.
- Latency budget: PDF in hand to the agent in under 90 seconds.

### 6.3 Phase 3 — Visa documentation portal (~month 3)

- Gated route at `/visa-portal/[bookingId]` behind magic-link auth (Resend → magic link → JWT cookie).
- Per-booking, system generates an embassy-specific checklist from `src/lib/visa.ts` rules.
- Client uploads each document (Vercel Blob or Supabase Storage). On upload, a server action calls a vision-capable model (Claude with vision) against rule prompts:
  - Passport validity ≥ 6 months from intended return date.
  - Photo dimensions, background color, recency.
  - Bank statement date range, header presence, account holder match.
  - Signature consistency.
- Each document gets a status: `pending`, `verified`, `issue_found` (with human-readable fix instructions surfaced to the client and the agent).
- A staff dashboard at `/visa-portal/admin` shows every active file with a completion percentage.
- Auto-reminders sent via WhatsApp (Business API templates) for outstanding items.
- The visa officer intervenes on exceptions only.

### 6.4 AI guardrails (all phases)

- All AI calls are server-side. No API keys in the client bundle.
- Every AI-generated artifact — quote PDF, visa verdict — is reviewed by a human before reaching the client. The site never auto-sends AI output directly to clients.
- Log every prompt and response (redacted of PII) to a private bucket for review and tuning.
- Cost ceiling alerting on the Anthropic console; hard monthly cap configured.

---

## 7. Content Model (Phase 1: MDX)

Each content type lives in `src/content/<type>/<slug>.mdx` with typed frontmatter validated by zod in `src/lib/content.ts`.

```ts
// Destination
{
  slug: string;
  name: string;
  region: 'GCC' | 'South Asia' | 'Southeast Asia' | 'East Asia' | 'Europe' | 'Americas' | 'Africa' | 'Saudi (Umrah)' | 'Pakistan (Domestic)';
  heroImage: { src: string; alt: string; credit?: string };
  gallery: { src: string; alt: string; credit?: string }[];
  whenToGo: string;
  relatedPackages: string[];   // package slugs
  visaCountry?: string;        // visa country slug, if applicable
  seo: { title: string; description: string };
}

// Package (covers outbound, Umrah, Northern Areas)
{
  slug: string;
  title: string;               // sentence case, e.g. "Seven nights in Turkey"
  category: 'Outbound' | 'Umrah' | 'Northern Areas';
  destinations: string[];      // destination slugs
  departureCities: ('Karachi' | 'Lahore' | 'Islamabad')[];
  durationNights: number;
  heroImage: { src: string; alt: string };
  summary: string;
  whoItsFor: string;           // one sentence
  itinerary: { day: number; title: string; body: string }[];
  inclusions: string[];
  exclusions: string[];
  stays: { name: string; city: string; tier: '3-star' | '4-star' | '5-star' }[];
  seo: { title: string; description: string };
}

// Visa country
{
  slug: string;                // e.g. 'schengen', 'uk', 'us', 'saudi-umrah'
  country: string;
  embassy: string;
  requiredDocuments: { name: string; notes?: string }[];
  processingTimeDays: { min: number; max: number };
  commonRejectionReasons: string[];
  seo: { title: string; description: string };
}
```

No `price` field anywhere — pricing is never displayed on the site (see §1).

A Phase 2 migration to a headless CMS (Sanity recommended) should preserve the same shape.

---

## 8. Accessibility

- All interactive elements have visible focus states (2px `clay` ring, 2px offset).
- Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text and UI.
- Landmark regions (`<header>`, `<main>`, `<nav>`, `<footer>`) on every page.
- Skip-to-content link, visible on focus, above the header.
- Forms: labels associated with inputs, errors announced via `aria-live="polite"`, no error toasts that disappear.
- Accordions use Radix Accordion; carousels (destination row) are keyboard-operable with visible prev/next.
- Sticky mobile WhatsApp CTA has `aria-label` and does not trap focus.
- All animations honor `prefers-reduced-motion`.
- Run axe-core in CI (Playwright + `@axe-core/playwright`).

---

## 9. Performance

- LCP under 2.5s on a mid-tier Android device on 4G.
- CLS under 0.05 site-wide. Reserve image dimensions everywhere.
- Use `next/image` with `priority` only on the current page's hero.
- Default to server components. Add `"use client"` only where required (inquiry form steps, accordion, sticky WhatsApp pill).
- Total JS for the home page ≤ 140KB gzipped.
- Defer Cloudflare Turnstile until the inquiry form mounts.
- Preconnect to `wa.me` and the WhatsApp Business API origin.

---

## 10. SEO

- Per-page `generateMetadata()` in App Router. Title format: `{Page} — [BRAND_NAME]`. Home: `[BRAND_NAME] — [BRAND_TAGLINE]`.
- Open Graph and Twitter card images generated via `opengraph-image.tsx`.
- JSON-LD:
  - `TravelAgency` on home (with `areaServed: "PK"` and named departure cities).
  - `TouristTrip` on each package detail.
  - `Service` on each visa country page.
  - `Organization` site-wide with `sameAs` social URLs.
  - `LocalBusiness` per office on the Contact page.
- `sitemap.ts` and `robots.ts` generated from MDX content.
- Canonical URLs absolute. No trailing slash, enforced in `next.config.ts`.
- Index packages individually; the most valuable organic terms are package-shaped queries ("7 days Turkey from Karachi", "Umrah package from Lahore", "Hunza tour package").
- Add a Google Business Profile snippet on Home and Contact via JSON-LD `aggregateRating` once review counts justify it.

---

## 11. Forms, Email, Privacy, Messaging

- The inquiry form is the single most important interaction. See §5.8.
- Validate on the server with zod; never trust the client.
- Resend transactional email template: plain-text-first with a minimal HTML version. No images in the email — these often trip Pakistani inbox filters.
- The lead summary email must contain a one-line "AI-suggested next action" placeholder so Phase 2 can populate it without a template change.
- Store nothing client-side beyond in-flight form state. No `localStorage` of PII.
- Privacy notice under the submit button: "We use your details only to respond to your inquiry. We do not share with third parties."
- Honeypot field, Cloudflare Turnstile, server-side IP rate-limit (5/hour).
- WhatsApp deep links never carry PII in the URL — only package/destination context.

---

## 12. Repository, Branching, and Code Conventions

- GitHub. Default branch: `main`. Short-lived feature branches: `feat/...`, `fix/...`, `chore/...`.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- PRs must pass: typecheck, lint, unit tests, Playwright smoke, and a Lighthouse CI budget check.
- One reviewer required. Squash-merge.
- Code style:
  - Prefer named exports. Default exports only for Next.js page/layout/route files.
  - File names: `kebab-case.tsx` for components, `kebab-case.ts` for utilities.
  - Components are pure functions. Side effects live in server actions or `useEffect`.
  - No prop drilling more than two levels — extract or colocate.
  - No magic numbers. Constants live next to use or in `src/lib/constants.ts`.
- Lint: `next/core-web-vitals` + `@typescript-eslint/recommended-type-checked`. Treat warnings as errors in CI.

---

## 13. Deployment (Vercel)

- Connect the GitHub repo to a Vercel project.
- Environments:
  - **Production** — `main` branch → `[BRAND_NAME].com`.
  - **Preview** — every PR gets a preview URL, shareable with the agency for review.
- Environment variables (set in Vercel dashboard, mirrored in `.env.example`):
  - `RESEND_API_KEY`
  - `INQUIRY_RECIPIENT_EMAIL`
  - `WHATSAPP_BUSINESS_NUMBER`
  - `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - `NEXT_PUBLIC_SITE_URL`
  - `ANTHROPIC_API_KEY` (Phase 2)
  - `DATABASE_URL` (Phase 2)
  - `BLOB_READ_WRITE_TOKEN` (Phase 3)
  - `WHATSAPP_CLOUD_API_TOKEN` (Phase 2 concierge)
- Vercel features to enable: Speed Insights, Web Analytics, Image Optimization, Edge Network.
- Configure apex + `www` with `www` → apex 308 redirect.
- Add a Lighthouse CI step (`@lhci/cli`) and a Playwright smoke step via GitHub Actions.
- Region: pin Vercel functions to `bom1` (Mumbai) for lower latency to Pakistan.

---

## 14. Definition of Done (every feature)

Before marking a task complete:

1. TypeScript compiles with zero errors and zero warnings.
2. `pnpm lint` and `pnpm format --check` pass.
3. Unit tests added or updated; all green.
4. Playwright smoke covers any new critical path (inquiry form, WhatsApp CTA, package detail, visa portal).
5. New pages have `generateMetadata`, JSON-LD where applicable, and are reachable via the nav or sitemap.
6. Responsive at 360 / 768 / 1024 / 1440 / 1920.
7. Lighthouse on the changed page ≥ 90 in all four categories on simulated mobile 4G.
8. Screenshots (mobile + desktop) attached to the PR.
9. No new dependency without a one-line justification in the PR description.

---

## 15. What "Premium" Means Here (anti-patterns to avoid)

- ❌ Auto-rotating slideshows; floating WhatsApp **bubbles** that obscure content (we use a discrete pill).
- ❌ ALL-CAPS package titles, exclamation marks, "Only 2 left!" urgency banners.
- ❌ Price-stamped flag thumbnail grids.
- ❌ Generic "trust badges". Use named press logos, Google reviews, or nothing.
- ❌ Glassmorphism, neon gradients, drop shadows, emoji in copy.
- ❌ Hero text overlaid on photographs without a deliberate scrim.
- ❌ Five-CTA hero. The hero has **one** primary action and one secondary (WhatsApp).
- ❌ Stock placeholder photography surviving past Phase 1.
- ❌ Quoting prices on package pages. Always inquiry-first.

Premium is what you remove. When unsure, take something out.

---

## 16. Initial Build Order (suggested for Claude Code)

1. Scaffold Next.js + TypeScript + Tailwind + ESLint + Prettier + Playwright + Vitest + shadcn/ui.
2. Install `next/font` (Cormorant + Inter), shadcn primitives (button, input, label, accordion, dialog, sheet), lucide-react.
3. Implement `src/lib/brand.ts`, `src/lib/whatsapp.ts`, `globals.css` tokens, base typography utilities.
4. Build `Header`, `Footer`, `Container`, `Section`, `EyebrowHeading`, `WhatsAppCTA`, sticky mobile bottom bar.
5. Build the home page with placeholder MDX content (3 destinations, 2 outbound packages, 1 Umrah group, 1 Northern Areas package).
6. Build destination, package, Umrah, Northern Areas, and visa templates.
7. Build the inquiry form end-to-end: zod schema → server action → Resend email → confirmation page. Wire Turnstile + honeypot.
8. Add SEO (`generateMetadata`, JSON-LD, sitemap, robots, OG image).
9. Add Playwright smoke + Lighthouse CI.
10. Connect to GitHub; deploy to Vercel; configure preview deployments, env vars, and `bom1` region.
11. **Phase 2:** introduce Postgres, the AI quote generator pipeline, and the WhatsApp Business API concierge handoff.
12. **Phase 3:** build the visa portal — magic-link auth, document upload, AI verification, staff dashboard.

---

## 17. Working Agreement with Claude Code

- Ask clarifying questions when a requirement is ambiguous; do not invent brand specifics, package titles, prices, hotel names, or testimonials.
- When generating copy, prefer one strong sentence to three weak ones. Read every line aloud in your head.
- Never display a price on the site without explicit instruction. The pricing policy is inquiry-first.
- Never introduce a new dependency without noting why in the PR description.
- Never bypass TypeScript with `any` or `// @ts-ignore`. If a type is hard, fix the type.
- AI calls (Anthropic API) are server-side only. Human review sits between every AI output and the client.
- When in doubt, look at the **inspiration site only for IA**, never for visual or copy choices.

— End of CLAUDE.md
