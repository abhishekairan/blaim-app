// The /about/ pages (Parul University, SCOPE, CEBPSI, BLAIM). Same Rotunda language as the homepage:
// a render-backed hero, dark editorial prose next to an arch, parchment bands for structured lists.
// All text comes from src/data/conference.ts (the brochure); nothing here adds new claims.
import type { Child } from "hono/jsx";
import { ABOUT_ORDER, ABOUT_PAGES, type AboutKey } from "../data/about";
import { about, conference, host, keyDates, themes } from "../data/conference";
import { ArchImage, Eyebrow, Title, container, brochureImg } from "../components/ui";
import { JoinCta, PageHero } from "../components/page";

const prose = "space-y-5 text-[16.5px] leading-[1.8] text-sand/85";
const chip = "border px-3 py-1.5 font-sans text-[10.5px] font-bold uppercase tracking-[0.14em]";
const index = (i: number) => String(i + 1).padStart(2, "0");

// --- Building blocks --------------------------------------------------------------------

type HeroProps = { page: AboutKey; eyebrow: string; title: string; subtitle?: string; meta?: string[]; slug: string; children?: Child };

function Hero({ page, ...props }: HeroProps) {
  return <PageHero crumbs={[{ label: "About" }, { label: ABOUT_PAGES[page].title.replace(/^About /, "") }]} {...props} />;
}

/** Dark editorial spread: an arch on one side, the brochure paragraphs on the other. */
function Prose({ id, eyebrow, title, paragraphs, slug, aside }: { id: string; eyebrow: string; title: string; paragraphs: readonly string[]; slug: string; aside?: Child }) {
  return (
    <section class="relative bg-night" aria-labelledby={id}>
      <div class={`${container} grid gap-14 py-24 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <div class="relative lg:sticky lg:top-28 lg:self-start">
          <ArchImage slug={slug} ratio="3/4" outline class="reveal mx-auto w-[min(100%,380px)]" />
          <span class="rule-dot rule-dot-v absolute -left-6 top-10 hidden h-[60%] lg:block" aria-hidden="true"></span>
          {aside}
        </div>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title id={id} class="reveal text-sand">
            {title}
          </Title>
          <div class={`mt-10 ${prose}`}>
            {paragraphs.map((p, i) => (
              <p class={`reveal ${i === 0 ? "drop-cap" : ""}`}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Parchment band with a numbered grid: pillars, focus areas, methods. */
function Numbered({ id, eyebrow, title, items, cols = "md:grid-cols-2 lg:grid-cols-3" }: { id: string; eyebrow: string; title: string; items: readonly string[]; cols?: string }) {
  return (
    <section class="bg-parchment text-ink" aria-labelledby={id}>
      <div class={`${container} py-24 md:py-28`}>
        <Eyebrow class="text-ember">{eyebrow}</Eyebrow>
        <Title id={id} class="reveal max-w-[22ch]">
          {title}
        </Title>
        {/* Borders rather than a gap-coloured background, so an incomplete last row leaves no filled cell. */}
        <ol class={`mt-14 grid border-t border-l border-ink/12 ${cols}`}>
          {items.map((item, i) => (
            <li class="reveal relative border-r border-b border-ink/12 p-7 md:p-9">
              <span class="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-signal">{index(i)}</span>
              <p class="mt-5 font-display text-[1.35rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Dark band of chips under a heading. */
function Chips({ id, eyebrow, title, groups }: { id: string; eyebrow: string; title: string; groups: { label: string; items: readonly string[] }[] }) {
  return (
    <section class="border-y border-amber/15 bg-char" aria-labelledby={id}>
      <div class={`${container} py-20 md:py-24`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title id={id} class="reveal max-w-[24ch] text-sand">
          {title}
        </Title>
        <div class={`mt-12 grid gap-12 ${groups.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {groups.map((g) => (
            <div class="reveal">
              <h3 class="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-mist">{g.label}</h3>
              <ul class="mt-5 flex flex-wrap gap-2.5">
                {g.items.map((item) => (
                  <li class={`${chip} border-amber/35 text-sand/90`}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Large figures on parchment, as on the homepage host block. */
/** Label/value rows as written in conference.ts (`[value, label]` or `[label, value]` pairs). */
type Pairs = readonly (readonly string[])[];

function Stats({ id, eyebrow, title, stats }: { id: string; eyebrow: string; title: string; stats: Pairs }) {
  return (
    <section class="bg-parchment text-ink" aria-labelledby={id}>
      <div class={`${container} py-24 md:py-28`}>
        <Eyebrow class="text-ember">{eyebrow}</Eyebrow>
        <Title id={id} class="reveal">
          {title}
        </Title>
        <dl class="mt-14 grid grid-cols-2 gap-px bg-ink/12 md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div class="reveal bg-parchment px-6 py-8 md:px-8 md:py-10">
              <dt class="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">{value}</dt>
              <dd class="mt-3 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-ash">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Two-column label/value list, used for facts and recognitions. */
function Facts({ items, light }: { items: Pairs; light?: boolean }) {
  return (
    <dl class={`divide-y ${light ? "divide-ink/12 border-y border-ink/12" : "divide-amber/15 border-y border-amber/15"}`}>
      {items.map(([label, value]) => (
        <div class="reveal grid gap-1 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
          <dt class={`font-sans text-[11px] font-bold uppercase tracking-[0.22em] ${light ? "text-ember" : "text-amber"}`}>{label}</dt>
          <dd class={`text-[16px] leading-relaxed ${light ? "text-ink" : "text-sand/90"}`}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** SDG badges: the brochure names the goal numbers only. */
function Sdgs({ goals }: { goals: readonly number[] }) {
  return (
    <ul class="flex flex-wrap gap-3" aria-label="Sustainable Development Goals">
      {goals.map((n) => (
        <li class="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full border border-amber/50">
          <span class="font-sans text-[9px] font-bold uppercase leading-none tracking-[0.2em] text-mist">SDG</span>
          <span class="font-display text-[1.35rem] font-extrabold leading-none text-glow">{n}</span>
        </li>
      ))}
    </ul>
  );
}

/** Cards to the other three about pages, then the conference call to action. */
function MoreAbout({ current }: { current: AboutKey }) {
  const slugs: Record<AboutKey, string> = {
    parul: "light-floating-sun",
    scope: "pillars-dome-oculus",
    cebpsi: "columns-deep-shadow",
    blaim: "arch-mosaic-walls",
  };
  return (
    <>
      <section class="bg-umber" aria-labelledby="more-title">
        <div class={`${container} py-24 md:py-28`}>
          <Eyebrow>Keep exploring</Eyebrow>
          <Title id="more-title" class="reveal text-sand">
            More about BLAIM 2.0
          </Title>
          <ul class="mt-12 grid gap-6 md:grid-cols-3">
            {ABOUT_ORDER.filter((k) => k !== current).map((key) => {
              const { src, srcset } = brochureImg(slugs[key]);
              return (
                <li class="reveal">
                  <a
                    class="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden border border-amber/20 p-7 transition-colors duration-300 hover:border-amber"
                    href={ABOUT_PAGES[key].path}
                  >
                    <img
                      class="absolute inset-0 -z-10 h-full w-full object-cover object-top opacity-40 transition-[opacity,transform] duration-700 group-hover:scale-105 group-hover:opacity-55 light:opacity-25"
                      src={src}
                      srcset={srcset}
                      sizes="(min-width: 768px) 33vw, 90vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_20%,var(--color-night)_95%)]" aria-hidden="true"></span>
                    <span class="absolute top-0 left-7 h-[3px] w-10 bg-signal" aria-hidden="true"></span>
                    <span class="font-display text-[1.45rem] font-extrabold leading-tight tracking-[-0.02em] text-glow">{ABOUT_PAGES[key].title}</span>
                    <span class="mt-4 inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber">
                      Read more
                      <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <JoinCta />
    </>
  );
}

function AboutShell({ children, page }: { children: Child; page: AboutKey }) {
  return (
    <main id="content">
      {children}
      <MoreAbout current={page} />
    </main>
  );
}

// --- Pages ------------------------------------------------------------------------------

export function AboutParulPage() {
  const p = host.parul;
  return (
    <AboutShell page="parul">
      <Hero
        page="parul"
        eyebrow="Host institution"
        title="Parul University"
        subtitle="A multi-disciplinary destination of learning and innovation in Vadodara, Gujarat."
        meta={["NAAC A++", "UGC Category 1", "Est. 2015"]}
        slug="light-floating-sun"
      />
      <Prose id="parul-story" eyebrow="The university" title="Heritage, research and a global campus." paragraphs={p.paragraphs} slug="pillars-diagonal-light" />
      <Stats id="parul-numbers" eyebrow="At a glance" title="Parul University in numbers." stats={p.stats} />
      <section class="bg-night" aria-labelledby="parul-recognition">
        <div class={`${container} grid gap-14 py-24 md:py-28 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <Eyebrow>Recognition</Eyebrow>
            <Title id="parul-recognition" class="reveal text-sand">
              Rankings and accreditation.
            </Title>
            <div class="mt-10">
              <Facts items={p.recognition} />
            </div>
          </div>
          <div>
            <Eyebrow>Profile</Eyebrow>
            <h2 class="reveal font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-sand">
              Status and research output.
            </h2>
            <div class="mt-10">
              <Facts items={p.facts} />
            </div>
            <dl class="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {p.research.map(([value, label]) => (
                <div class="reveal border-t border-amber/25 pt-4">
                  <dt class="font-display text-[1.6rem] font-extrabold leading-none tracking-[-0.03em] text-glow">{value}</dt>
                  <dd class="mt-2 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-mist">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </AboutShell>
  );
}

export function AboutScopePage() {
  const s = host.scope;
  return (
    <AboutShell page="scope">
      <Hero
        page="scope"
        eyebrow="Organiser of BLAIM 2.0"
        title="SCOPE"
        subtitle="Scientific Communication, Outreach & Public Engagement at Parul University."
        meta={["Research", "Communication", "Collaboration", "Engagement"]}
        slug="pillars-dome-oculus"
      />
      <Prose
        id="scope-story"
        eyebrow="About SCOPE"
        title="Bridging scientific discovery and real-world impact."
        paragraphs={s.paragraphs}
        slug="corridor-to-oculus"
      />
      <Numbered id="scope-pillars" eyebrow="Five pillars" title="What SCOPE is built on." items={s.pillars} cols="sm:grid-cols-2 lg:grid-cols-5" />
      <Chips
        id="scope-ecosystem"
        eyebrow="Ecosystem"
        title="Labs, centres and programmes."
        groups={[
          { label: "Labs and centres", items: s.ecosystem },
          { label: "Disciplines it integrates", items: s.disciplines },
        ]}
      />
      <section class="bg-night" aria-labelledby="scope-sdgs">
        <div class={`${container} grid items-center gap-12 py-24 md:py-28 lg:grid-cols-[1fr_auto] lg:gap-20`}>
          <div>
            <Eyebrow>Global goals</Eyebrow>
            <Title id="scope-sdgs" class="reveal text-sand">
              Aligned with the UN Sustainable Development Goals.
            </Title>
            <p class="mt-6 max-w-[38rem] text-[16px] leading-[1.75] text-sand/80">
              Inspired by MIT D-Lab's human-centred, participatory innovation approach, SCOPE encourages community-driven solutions, responsible
              research and sustainable development.
            </p>
            <p class="mt-6">
              <a class="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber hover:text-glow" href={ABOUT_PAGES.cebpsi.path}>
                Read about CEBPSI, a SCOPE centre <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>
          <div class="reveal">
            <Sdgs goals={s.sdgs} />
          </div>
        </div>
      </section>
    </AboutShell>
  );
}

export function AboutCebpsiPage() {
  const c = host.cebpsi;
  return (
    <AboutShell page="cebpsi">
      <Hero
        page="cebpsi"
        eyebrow="A SCOPE centre"
        title="CEBPSI"
        subtitle={c.title + " at Parul University."}
        meta={[`In collaboration with the ${c.partner}`]}
        slug="columns-deep-shadow"
      />
      <Prose
        id="cebpsi-story"
        eyebrow="About the centre"
        title="Bridging research, policing practice and communities."
        paragraphs={c.paragraphs}
        slug="narrow-corridor-beam"
        aside={
          <div class="reveal mx-auto mt-10 w-[min(100%,380px)]">
            <p class="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-mist">Contributing to</p>
            <div class="mt-4">
              <Sdgs goals={[16]} />
            </div>
            <p class="mt-3 text-[14px] text-sand/75">Peace, Justice and Strong Institutions</p>
          </div>
        }
      />
      <Numbered id="cebpsi-focus" eyebrow="Focus areas" title="Where the Centre concentrates its work." items={c.focus} />
      <Chips
        id="cebpsi-how"
        eyebrow="How it works"
        title="Methods and research strengths."
        groups={[
          { label: "Approach", items: c.methods },
          { label: "Parul University research strengths", items: c.strengths },
        ]}
      />
      <section class="bg-parchment text-ink" aria-labelledby="cebpsi-inspiration">
        <div class={`${container} py-24 md:py-28`}>
          <Eyebrow class="text-ember">International practice</Eyebrow>
          <Title id="cebpsi-inspiration" class="reveal max-w-[24ch]">
            Drawing on internationally recognised approaches.
          </Title>
          <ul class="mt-12 grid gap-px bg-ink/12 md:grid-cols-3">
            {c.inspirations.map((name, i) => (
              <li class="reveal bg-parchment p-7 md:p-9">
                <span class="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-signal">{index(i)}</span>
                <p class="mt-5 text-[17px] font-semibold leading-snug text-ink">{name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AboutShell>
  );
}

export function AboutBlaimPage() {
  return (
    <AboutShell page="blaim">
      <Hero
        page="blaim"
        eyebrow={conference.edition}
        title={conference.title}
        meta={[conference.dates.label, conference.mode, "Parul University, Vadodara"]}
        slug="dome-oculus-beam-wide"
      >
        <p class="mt-6 font-display text-[clamp(1.1rem,1.8vw,1.4rem)] font-bold italic text-glow">“{conference.tagline}”</p>
      </Hero>
      <Prose
        id="blaim-story"
        eyebrow="About the conference"
        title="A multidisciplinary platform for scholars, practitioners and change makers."
        paragraphs={about.conference}
        slug="arch-mosaic-walls"
      />
      <section class="bg-parchment text-ink" aria-labelledby="blaim-purpose">
        <div class={`${container} py-24 md:py-28`}>
          <Eyebrow class="text-ember">Purpose</Eyebrow>
          <Title id="blaim-purpose" class="reveal">
            Aim and rationale.
          </Title>
          <div class="mt-14 grid gap-px bg-ink/12 lg:grid-cols-2">
            {[
              ["Aim", about.aim],
              ["Rationale", about.rationale],
            ].map(([heading, text], i) => (
              <article class="reveal bg-parchment p-7 md:p-10">
                <h3 class="flex items-baseline gap-3 font-display text-[1.5rem] font-extrabold text-ink">
                  <span class="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-signal">{index(i)}</span>
                  {heading}
                </h3>
                <p class="mt-5 text-[15.5px] leading-[1.8] text-ink/85">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section class="bg-night" aria-labelledby="blaim-themes">
        <div class={`${container} py-24 md:py-28`}>
          <Eyebrow>Conference themes</Eyebrow>
          <Title id="blaim-themes" class="reveal text-sand">
            Five themes, fifteen sub-themes.
          </Title>
          <ol class="mt-12 divide-y divide-amber/15 border-y border-amber/15">
            {themes.map((t, i) => (
              <li class="reveal grid gap-4 py-8 md:grid-cols-[5rem_1fr_1.3fr] md:gap-8">
                <span class="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-signal">Theme {i + 1}</span>
                <h3 class="red-initial font-display text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em] text-glow">{t.title}</h3>
                <ul class="space-y-1.5 text-[14.5px] leading-relaxed text-sand/80">
                  {t.topics.map((topic) => (
                    <li>{topic}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section class="border-y border-amber/15 bg-char" aria-labelledby="blaim-dates">
        <div class={`${container} grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <Eyebrow>Key dates</Eyebrow>
            <Title id="blaim-dates" class="reveal text-sand">
              Plan your participation.
            </Title>
            <ol class="mt-10 space-y-6">
              {keyDates.map((d) => (
                <li class="reveal flex items-baseline gap-5">
                  <span class="inline-block h-[9px] w-[9px] shrink-0 rounded-full bg-signal" aria-hidden="true"></span>
                  <time datetime={d.iso} class="w-40 shrink-0 font-display text-[1.2rem] font-extrabold text-glow">
                    {d.date}
                  </time>
                  <span class="font-sans text-[11.5px] font-semibold uppercase tracking-[0.14em] text-sand/80">{d.label}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <Eyebrow>Organised by</Eyebrow>
            <p class="reveal font-display text-[1.6rem] font-extrabold leading-tight text-sand">{conference.organiserLong}</p>
            <p class="mt-10 font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-mist">In association with</p>
            <ul class="mt-4 space-y-2.5">
              {conference.association.map((a) => (
                <li class="reveal flex items-center gap-3 text-[15.5px] text-sand/85">
                  <span class="h-px w-5 bg-amber/60" aria-hidden="true"></span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </AboutShell>
  );
}

export const ABOUT_COMPONENTS: Record<AboutKey, typeof AboutParulPage> = {
  parul: AboutParulPage,
  scope: AboutScopePage,
  cebpsi: AboutCebpsiPage,
  blaim: AboutBlaimPage,
};
