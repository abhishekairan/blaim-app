// Building blocks shared by the inner pages (/about/*, /committees/, /schedule/, /pre-conference/):
// a render-backed hero with breadcrumbs, and the closing "Join BLAIM 2.0" call to action.
import type { Child } from "hono/jsx";
import { conference } from "../data/conference";
import { Backdrop, Button, Eyebrow, container } from "./ui";

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  /** Trail after "Home"; the last crumb is the current page. */
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: string[];
  slug: string;
  children?: Child;
};

export function PageHero({ crumbs, eyebrow, title, subtitle, meta, slug, children }: PageHeroProps) {
  return (
    <section class="relative isolate flex min-h-[72vh] items-end overflow-hidden bg-night" aria-labelledby="page-title">
      <Backdrop slug={slug} opacity="opacity-45" position="object-[center_35%]" />
      <div class={`${container} pt-40 pb-16 md:pb-20`}>
        <nav aria-label="Breadcrumb" class="mb-10 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-mist">
          <a class="transition-colors hover:text-glow" href="/">
            Home
          </a>
          {crumbs.map((c, i) => (
            <>
              <span class="mx-3 text-amber/60" aria-hidden="true">/</span>
              {i === crumbs.length - 1 ? (
                <span class="text-sand/85" aria-current="page">
                  {c.label}
                </span>
              ) : c.href ? (
                <a class="transition-colors hover:text-glow" href={c.href}>
                  {c.label}
                </a>
              ) : (
                <span>{c.label}</span>
              )}
            </>
          ))}
        </nav>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          id="page-title"
          class="max-w-[16ch] font-display text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-sand"
        >
          {title}
        </h1>
        {subtitle && <p class="mt-6 max-w-[40rem] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.6] text-sand/80">{subtitle}</p>}
        {children}
        {meta && (
          <ul class="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-amber">
            {meta.map((m, i) => (
              <li class="flex items-center gap-5">
                {i > 0 && <span class="inline-block h-[6px] w-[6px] rounded-full bg-signal" aria-hidden="true"></span>}
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/** Closing call to action used at the foot of every inner page. */
export function JoinCta() {
  return (
    <section class="relative isolate overflow-hidden bg-night" aria-labelledby="join-title">
      <Backdrop slug="dome-vertical-beam" opacity="opacity-35" />
      <div class={`${container} py-24 text-center md:py-32`}>
        <Eyebrow class="justify-center">{conference.dates.label}</Eyebrow>
        <h2 id="join-title" class="mx-auto max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-sand">
          Join {conference.shortName} at Parul University, Vadodara.
        </h2>
        <p class="mx-auto mt-6 max-w-[36rem] text-[16px] leading-[1.75] text-sand/80">“{conference.tagline}”</p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/abstract-submission/">Submit an abstract</Button>
          <Button href="/#registration" variant="ghost">
            Registration &amp; fees
          </Button>
        </div>
      </div>
    </section>
  );
}

/** "To be announced" notice for content the committee has not published yet. */
export function Announce({ children }: { children: Child }) {
  return (
    <p class="flex items-start gap-3 border border-amber/30 bg-char/70 px-5 py-4 text-[14.5px] leading-relaxed text-sand/85">
      <span class="mt-[0.5em] inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-signal" aria-hidden="true"></span>
      <span>{children}</span>
    </p>
  );
}
