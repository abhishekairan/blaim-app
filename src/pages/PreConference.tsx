// /pre-conference/: the pre-workshop and hackathon on 27–28 January 2027. Fees, inclusions, capacity and
// the refund rule come from the brochure; topics, timings and the registration link are not yet published.
import { conference, eventDays, fees, fellowship, links } from "../data/conference";
import { Button, Eyebrow, Title, container } from "../components/ui";
import { Announce, JoinCta, PageHero } from "../components/page";

export const PRE_CONFERENCE_PATH = "/pre-conference/";

const weekday = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" });

export function PreConferencePage() {
  const days = eventDays.filter((d) => d.phase === "pre");
  const w = fees.workshop;
  return (
    <main id="content">
      <PageHero
        crumbs={[{ label: "Pre-conference" }]}
        eyebrow="27–28 January 2027"
        title="Pre-Workshop & Hackathon"
        subtitle={`Two days of hands-on sessions before ${conference.shortName} opens, at Parul University, Vadodara.`}
        meta={["60 places", "First come, first served"]}
        slug="pendant-light-arch"
      />

      <section class="bg-night" aria-labelledby="pre-days-title">
        <div class={`${container} grid gap-14 py-24 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20`}>
          <div>
            <Eyebrow>When</Eyebrow>
            <Title id="pre-days-title" class="reveal text-sand">
              Two days ahead of the conference.
            </Title>
            <div class="mt-8">
              <Announce>Workshop topics, the hackathon challenge and session timings will be announced here.</Announce>
            </div>
          </div>
          <ol class="grid gap-px self-start bg-amber/15 sm:grid-cols-2">
            {days.map((d, i) => (
              <li class="reveal bg-night p-7 md:p-9">
                <p class="font-sans text-[10.5px] font-bold uppercase tracking-[0.24em] text-mist">Day {i + 1}</p>
                <time datetime={d.iso} class="mt-4 block">
                  <span class="block font-display text-[4.6rem] font-extrabold leading-[0.9] tracking-[-0.05em] text-sand">{Number(d.iso.slice(8))}</span>
                  <span class="mt-2 block font-sans text-[11.5px] font-bold uppercase tracking-[0.2em] text-amber">
                    {weekday(d.iso)} · January 2027
                  </span>
                </time>
                <p class="mt-5 border-t border-amber/15 pt-4 text-[14.5px] font-semibold text-sand/85">{d.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section class="bg-parchment text-ink" aria-labelledby="pre-fees-title">
        <div class={`${container} py-24 md:py-28`}>
          <Eyebrow class="text-ember">Registration</Eyebrow>
          <Title id="pre-fees-title" class="reveal">
            {w.title}.
          </Title>
          <dl class="mt-12 grid border-t border-l border-ink/12 sm:grid-cols-3">
            {w.rows.map((r) => (
              <div class="reveal flex flex-col justify-between gap-4 border-r border-b border-ink/12 p-7 md:p-9">
                <dt class="font-sans text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-ash">{r.category}</dt>
                <dd class="mt-4 font-display text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">{r.fee}</dd>
              </div>
            ))}
          </dl>

          <div class="mt-14 grid gap-10 lg:grid-cols-3">
            <div class="reveal">
              <h3 class="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-ember">Included</h3>
              <p class="mt-3 text-[15.5px] leading-[1.75] text-ink/85">{w.includes}</p>
            </div>
            <div class="reveal">
              <h3 class="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-ember">Places</h3>
              <p class="mt-3 text-[15.5px] leading-[1.75] text-ink/85">{w.capacity}</p>
            </div>
            <div class="reveal">
              <h3 class="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-ember">Refunds</h3>
              <p class="mt-3 text-[15.5px] leading-[1.75] text-ink/85">{fees.refund}</p>
            </div>
          </div>

          <div class="mt-14 flex flex-wrap items-center gap-6 border-t border-ink/12 pt-10">
            {links.workshopRegistration ? (
              <Button href={links.workshopRegistration} variant="ink">
                Register for the workshop
              </Button>
            ) : (
              <p class="inline-flex items-center gap-3 border border-ink/25 px-6 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-ink/70">
                <span class="inline-block h-[7px] w-[7px] rounded-full bg-signal" aria-hidden="true"></span>
                Registration link to be announced
              </p>
            )}
            <a class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-ember hover:text-ink" href="/#registration">
              Conference fees and payment links <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section class="border-y border-amber/15 bg-char" aria-labelledby="pre-fellowship-title">
        <div class={`${container} grid gap-10 py-20 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20`}>
          <div>
            <Eyebrow>Support</Eyebrow>
            <Title id="pre-fellowship-title" class="reveal text-sand">
              {fellowship.title}.
            </Title>
          </div>
          <div class="space-y-5 text-[15.5px] leading-[1.8] text-sand/85">
            {fellowship.paragraphs.slice(0, 2).map((p) => (
              <p class="reveal">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <JoinCta />
    </main>
  );
}
