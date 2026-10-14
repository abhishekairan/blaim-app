# BLAIM 2027 homepage (Hono + Vite, SSR)

The homepage from `../www.worldbrainmapping.org/index.html`, converted from WordPress/Elementor into
a server-rendered [Hono](https://hono.dev) app. Only the homepage is included. Links to other pages
still point to `/...`.

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

## Abstract submission (`/abstract-submission/`)

A plain HTML form (works without JS) in `src/pages/AbstractSubmission.tsx`, handled in `src/index.tsx`,
logic in `src/lib/abstracts.ts`, options (themes, contribution types, word limit) in `src/data/abstracts.ts`.

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
  index.tsx            routes: /, /robots.txt, /sitemap.xml, static files + cache headers
  site.ts              SEO metadata and JSON-LD (Organization, WebSite, WebPage, Event)
  assets.ts            dev paths vs hashed production assets (Vite manifest)
  data/menu.ts         header navigation (labels + links)
  components/
    Layout.tsx         <html>/<head>: meta, OG/Twitter, preloads, JSON-LD, optional GTM
    Header.tsx         sticky header, desktop dropdowns / mega-menus, mobile menu
    Main.tsx           top video + the sections below
    Footer.tsx         footer
    icons.tsx          inline SVG icons (Font Awesome Free glyphs, no webfont)
  sections/            one component per homepage section
  client/              the only client JS: header menu + CTA dataLayer events (~2 KB gzip)
  styles/app.css       Tailwind entry: theme tokens, breakpoints, base styles
  styles/fonts.css     self-hosted Montserrat / Orbitron
public/assets/         images, videos and fonts copied from the original site
public/assets/brand/   cropped copies of public/logo.svg and logo_white.svg (used by header/footer)
```

## Styling (Tailwind CSS v4)

All styling is Tailwind utility classes in the TSX. There are no component stylesheets.

- **Colours**: `pine`, `jade`, `mist`, `stone`, `gold`, `ink` (e.g. `bg-pine`, `text-gold`), defined
  in `@theme` in `src/styles/app.css`.
- **Breakpoints** match the original CSS exactly and are inclusive: `lte-980:` means
  `@media (max-width: 980px)`, `gte-1200:` means `(min-width: 1200px)`. They are listed widest
  first in `app.css` because registration order is cascade order.
- **No preflight.** The base layer reproduces the original site's globals (e.g. `body` 20px/1.6em
  Montserrat, heading margins, `a` colour). Utilities override it.
- **Don't put two utilities for the same property on one element** (e.g. two `text-[…]` sizes).
  Tailwind resolves them by its own sort order, not class order. Shared class strings in the
  components are split so that never happens.
- Header open/closed state is a `data-open` attribute set by `src/client/header.ts`, styled with
  `group-data-open/…` variants.

## Logos

`public/logo.svg` (dark) and `public/logo_white.svg` (white) have a lot of empty canvas around
the wordmark. `public/assets/brand/` holds copies with the viewBox trimmed to the artwork. The
header uses the white one and the footer the dark one. The production server only serves
`/static/*` and `/assets/*`, so files at the `public/` root aren't reachable there.

`scripts/convert.mjs` is the one-off script that produced the first (pre-Tailwind) version from
the WordPress export. **Don't re-run it**: it would overwrite the Tailwind components.
