// /committees/: every committee in full, each member as a PersonCard with its hover card.
import { committees } from "../data/conference";
import { countryOf } from "../data/countries";
import { Eyebrow, PersonCard, container } from "../components/ui";
import { JoinCta, PageHero } from "../components/page";

export const COMMITTEES_PATH = "/committees/";

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function CommitteesPage() {
  const members = committees.reduce((n, c) => n + c.people.length, 0);
  const countries = new Set(committees.flatMap((c) => c.people.map((p) => countryOf(p)?.code).filter(Boolean))).size;
  return (
    <main id="content">
      <PageHero
        crumbs={[{ label: "Committees" }]}
        eyebrow="Committees"
        title="The people behind BLAIM 2.0."
        meta={[`${committees.length} committees`, `${members} members`, `${countries} countries`]}
        slug="columns-deep-shadow"
      >
        <nav aria-label="Committees on this page" class="mt-10">
          <ul class="flex flex-wrap gap-2.5">
            {committees.map((c) => (
              <li>
                <a
                  class="inline-flex min-h-10 items-center border border-amber/35 px-4 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-sand/90 transition-colors hover:border-amber hover:bg-amber hover:text-night"
                  href={`#${slug(c.title)}`}
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {committees.map((c, i) => (
        <section id={slug(c.title)} class={i % 2 ? "bg-umber" : "bg-night"} aria-labelledby={`${slug(c.title)}-title`}>
          <div class={`${container} grid gap-10 py-20 md:py-24 lg:grid-cols-[260px_1fr] lg:gap-16`}>
            <div class="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
              <h2 id={`${slug(c.title)}-title`} class="reveal font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-sand">
                {c.title}
              </h2>
              <p class="mt-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-mist">{c.people.length} members</p>
            </div>
            <ul class="reveal grid gap-x-8 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
              {c.people.map((p) => (
                <PersonCard person={p} context={c.title} />
              ))}
            </ul>
          </div>
        </section>
      ))}

      <JoinCta />
    </main>
  );
}
