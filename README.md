# BLAIM 2.0 conference site (Hono + Vite, SSR)

Website for **BLAIM 2.0**, the 2nd International Multi-Disciplinary Conference on Mindfulness,
Behavioural Science & Legal Innovation (SCOPE, Parul University, Vadodara, 28–30 January 2027,
hybrid). A server-rendered [Hono](https://hono.dev) app with Tailwind CSS v4.

Content and visual theme follow the conference brochure in `docs/BLAIM-2- Brochure - 13- OCT.pdf`.
The brochure's background renders are in `docs/img/` (originals) and `public/assets/brochure/`
(WebP, two sizes each, generated with sharp).

## Commands

```bash
npm install
npm run dev        # Vite dev server with SSR, http://localhost:5173
npm run build      # client assets (dist/static) + server bundle (dist/index.js)
npm start          # production server, reads .env if present, http://localhost:3000
npm run typecheck
```

`npm start` must run from the project root because static files are served from `./dist`.
`PORT` is baked in at build time (`vite.config.ts`).

## Configuration (`.env`, see `.env.example`)

| Var        | Purpose                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| `SITE_URL` | Origin used for canonical, Open Graph, JSON-LD and sitemap URLs.        |
| `GTM_ID`   | Google Tag Manager container. Analytics are rendered only when this is set. |
| `SMTP_*`   | Outgoing mail (nodemailer). Unset `SMTP_HOST` = mail is logged, not sent. |
| `ABSTRACT_*`, `TRUST_PROXY` | Abstract submission settings, see `.env.example`. |

## Content

Everything the homepage says comes from `src/data/conference.ts`, transcribed from the brochure:
dates, theme line, organiser and associated institutes, about/aim/rationale, the five themes,
guests and speakers per theme, committees, abstract guidelines, fellowship, fees, key dates,
host institution texts, venue, hotel guide and Vadodara attractions.

- Registration and payment links are placeholders in the brochure. They are `null` in
  `links` and render as "To be announced"; set the URL to publish a link.
- Speaker portraits are not available as separate files, so people get initials monograms.

## Abstract submission (`/abstract-submission/`)

A plain HTML form (works without JS) in `src/pages/AbstractSubmission.tsx`, handled in `src/index.tsx`,
logic in `src/lib/abstracts.ts`, options and limits in `src/data/abstracts.ts` (themes come from
`conference.ts`; 200–300 words; at most three authors, as per the brochure).

- Each valid submission is appended to `ABSTRACT_STORE_PATH` (default `data/abstracts.jsonl`, one JSON
  object per line) **before** the success redirect. This file is the record of submissions: it needs a
  persistent disk and backups.
- Emails (conference office at `ABSTRACT_NOTIFY_TO`, confirmation to the submitter) are sent after the
  response by `src/lib/mailer.ts`; an SMTP failure is logged and does not lose the submission.
- Protection: same-origin check (`hono/csrf`), 64 KB body limit, honeypot field, 5 submissions per IP per
  10 minutes (in memory).
- `npm run smtp:check` verifies SMTP settings; `npm run smtp:check -- you@example.org` also sends a test mail.

## Layout

```
src/
  index.tsx            routes: /, /abstract-submission/, /robots.txt, /sitemap.xml, static files
  site.ts              SEO metadata and JSON-LD (Organization, WebSite, WebPage, Event)
  assets.ts            dev paths vs hashed production assets (Vite manifest)
  data/conference.ts   all brochure content
  data/menu.ts         header navigation (section anchors + CTA)
  data/abstracts.ts    abstract form options and limits
  components/
    Layout.tsx         <html>/<head>: meta, OG/Twitter, icons, preloads, JSON-LD, optional GTM
    Header.tsx         fixed header, transparent over the hero, mobile menu
    Footer.tsx         organiser, association, venue, contacts
    Main.tsx           homepage section order
    ui.tsx             shared pieces: container, Eyebrow, Title, Button, ArchImage, Backdrop, PersonCard
  sections/            Hero, KeyDates, About, Themes, Speakers, Committees, Abstracts,
                       Registration, Host, Venue
  client/              the only client JS: header/menu/scroll reveals (ui.ts), CTA dataLayer
                       events, abstract word count
  styles/app.css       Tailwind entry: theme tokens, base styles, reveal/arch/rule components
  styles/fonts.css     self-hosted Montserrat (800 for display, 400-600 for text)
public/assets/brand/     logos, favicon, share image
public/assets/brochure/  background renders (WebP)
public/assets/uploads/   Montserrat woff2 (from the original site)
```

## Theme ("The Rotunda")

Defined in `@theme` in `src/styles/app.css`: dark stone surfaces (`night`, `char`, `umber`, `bark`),
amber light (`ember`, `amber`, `glow`), parchment for light sections (`sand`, `parchment`, `linen`),
text (`ink`, `ash`, `mist`) and the brochure's red point accent (`signal`). Type is Montserrat
throughout, after the logo's heavy geometric letterforms: weight 800 with tight tracking for
display, 400-600 for text.

Recurring motifs from the brochure, as components in `app.css`: `.arch-outline` (thin arch with a
red dot at the apex), `.rule-dot` (hairline ending in a red dot), `.red-initial` (red first letter on
theme titles), `.drop-cap`. Portrait renders are masked into arches with `rounded-t-full`
(`ArchImage`) or used as dimmed full-bleed backdrops (`Backdrop`).

### Theme provider

Two themes share one token set: **Rotunda** (dark, the default, as in the brochure) and
**Daylight** (white, after the brochure's cream pages). The registry is `src/theme.ts`; the active
theme is `<html data-theme="…">`. `:root[data-theme="daylight"]` in `app.css` only re-points the
custom properties (surfaces go white/linen, the amber "light" tokens become deep ambers that read
on white, text tokens become ink, `--color-shade` keeps shadows warm, `--hero-image` swaps the
hero render), so no component branches on the theme. The one structural exception is the logo
file, swapped with the `light:` variant.

The header toggle (`[data-theme-toggle]`) is wired by `src/client/theme.ts`; the choice is kept in
`localStorage` and applied by an inline script in `<head>` before first paint, so pages stay
cacheable and never flash the default. Adding a theme: one entry in `THEMES` and one
`:root[data-theme="…"]` block.

Motion: hero entrance (`animate-rise`), a slow light beam (`animate-beam`), and scroll reveals via
`.reveal` + `IntersectionObserver` (only active when `<html class="js">`, so nothing is hidden
without JavaScript). All of it respects `prefers-reduced-motion`.

`scripts/convert.mjs` is the one-off script that produced the first version from a WordPress export.
It predates this design; don't re-run it.
