// /schedule/: the four event days. The session-by-session programme is not published yet, so the page
// shows what is known (dates, phases, formats, deadlines) and says the rest is to be announced.
import { conference, conferenceFormats, eventDays, keyDates } from "../data/conference";
import { Button, Eyebrow, Title, container } from "../components/ui";
import { Announce, JoinCta, PageHero } from "../components/page";

export const SCHEDULE_PATH = "/schedule/";

const weekday = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" });
const dayNumber = (iso: string) => String(Number(iso.slice(8, 10)));

const phases = [
  { key: "pre", title: "Pre-conference", note: "Pre-workshop and hackathon", href: "/pre-conference/" },
  { key: "conference", title: "Conference", note: `${conference.shortName} main conference`, href: "/#themes" },
] as const;

export function SchedulePage() {
  const deadlines = keyDates.filter((d) => d.iso < eventDays[0].iso);
  return (
    <main id="content">
      <PageHero
        crumbs={[{ label: "Schedule" }]}
        eyebrow="Programme"
        title="Schedule"
        subtitle="Four days at Parul University, Vadodara: two days of pre-conference workshop and hackathon, followed by the two-day conference."
        meta={[conference.dates.label, conference.mode]}
        slug="corridor-to-oculus"
      />

      <section class="bg-night" aria-labelledby="days-title">
        <div class={`${container} py-24 md:py-28`}>
          <Eyebrow>At a glance</Eyebrow>
          <Title id="days-title" class="reveal text-sand">
            Four days, two phases.
          </Title>
          <div class="mt-8 max-w-[44rem]">
            <Announce>
              The detailed session-by-session programme will be published here. For questions, write to{" "}
              <a class="text-glow underline-offset-4 hover:underline" href={`mailto:${conference.contacts.programme}`}>
                {conference.contacts.programme}
              </a>
              .
            </Announce>
          </div>

          <div class="mt-14 grid gap-10 lg:grid-cols-2">
            {phases.map((phase) => (
              <div class="reveal">
                <div class="flex items-baseline justify-between gap-4 border-b border-amber/20 pb-4">
                  <h3 class="flex items-center gap-3 font-display text-[1.4rem] font-extrabold text-glow">
                    <span class="inline-block h-[7px] w-[7px] rounded-full bg-signal" aria-hidden="true"></span>
                    {phase.title}
                  </h3>
                  <a class="font-sans text-[10.5px] font-bold uppercase tracking-[0.2em] text-amber hover:text-glow" href={phase.href}>
                    Details <span aria-hidden="true">→</span>
                  </a>
                </div>
                <ol class="mt-6 grid gap-px bg-amber/15 sm:grid-cols-2">
                  {eventDays
                    .filter((d) => d.phase === phase.key)
                    .map((d, i) => (
                      <li class="bg-night p-7">
                        <p class="font-sans text-[10.5px] font-bold uppercase tracking-[0.24em] text-mist">Day {i + 1}</p>
                        <time datetime={d.iso} class="mt-4 block">
                          <span class="block font-display text-[4.2rem] font-extrabold leading-[0.9] tracking-[-0.05em] text-sand">{dayNumber(d.iso)}</span>
                          <span class="mt-2 block font-sans text-[11.5px] font-bold uppercase tracking-[0.2em] text-amber">
                            {weekday(d.iso)} · January 2027
                          </span>
                        </time>
                        <p class="mt-5 border-t border-amber/15 pt-4 text-[14.5px] font-semibold text-sand/85">{d.label}</p>
                      </li>
                    ))}
                </ol>
                <p class="mt-4 text-[13px] text-mist">{phase.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="bg-parchment text-ink" aria-labelledby="formats-title">
        <div class={`${container} grid gap-14 py-24 md:py-28 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <Eyebrow class="text-ember">Format</Eyebrow>
            <Title id="formats-title" class="reveal">
              What the conference days hold.
            </Title>
            <ol class="mt-10 border-t border-l border-ink/12 sm:grid sm:grid-cols-2">
              {conferenceFormats.map((f, i) => (
                <li class="reveal border-r border-b border-ink/12 p-6">
                  <span class="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <p class="mt-3 font-display text-[1.2rem] font-extrabold leading-tight text-ink">{f}</p>
                </li>
              ))}
            </ol>
            <p class="mt-6 text-[14px] leading-relaxed text-ink/75">Sessions are organised around the five conference themes, in hybrid mode.</p>
          </div>
          <div>
            <Eyebrow class="text-ember">Before the event</Eyebrow>
            <h2 class="reveal font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">Key deadlines.</h2>
            <ol class="mt-10 divide-y divide-ink/12 border-y border-ink/12">
              {deadlines.map((d) => (
                <li class="reveal grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <time datetime={d.iso} class="font-display text-[1.15rem] font-extrabold text-ink">
                    {d.date}
                  </time>
                  <span class="font-sans text-[11.5px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-ink/75">{d.label}</span>
                </li>
              ))}
            </ol>
            <div class="mt-10">
              <Button href="/abstract-submission/" variant="ink">
                Submit an abstract
              </Button>
            </div>
          </div>
        </div>
      </section>

      <JoinCta />
    </main>
  );
}
