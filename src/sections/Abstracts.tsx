// Call for abstracts: guidelines, fellowship and possible journal publication (brochure pages 13, 17).
import { abstractGuidelines, fellowship, journals, links } from "../data/conference";
import { Button, Eyebrow, Title, container } from "../components/ui";

export function Abstracts() {
  return (
    <section id="abstracts" class="relative bg-linen text-ink" aria-labelledby="abstracts-title">
      <div class={`${container} grid gap-16 py-24 md:py-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20`}>
        <div>
          <Eyebrow class="text-ember">Call for abstracts</Eyebrow>
          <Title id="abstracts-title" class="reveal">
            Guidelines for Abstract Submission
          </Title>

          <div class="reveal mt-10 grid gap-6 border-y border-ink/12 py-8 sm:grid-cols-[auto_1fr] sm:items-center">
            <div>
              <p class="font-sans text-[10.5px] font-bold uppercase tracking-[0.28em] text-ash">Submit on or before</p>
              <p class="mt-1 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-extrabold leading-none tracking-[-0.03em] text-signal">{abstractGuidelines.deadline}</p>
            </div>
            <p class="text-[14.5px] leading-relaxed text-ink/75 sm:border-l sm:border-ink/15 sm:pl-6">{abstractGuidelines.notice}</p>
          </div>

          <ol class="mt-10 space-y-6">
            {abstractGuidelines.rules.map((rule, i) => (
              <li class="reveal grid grid-cols-[3rem_1fr] gap-4">
                <span class="font-display text-[1.4rem] font-extrabold leading-none tracking-[-0.02em] text-ember">{String(i + 1).padStart(2, "0")}</span>
                <p class="text-[15.5px] leading-[1.75] text-ink/85">{rule}</p>
              </li>
            ))}
          </ol>

          <div class="reveal mt-12 flex flex-wrap items-center gap-6">
            {links.abstractSubmission && (
              <Button href={links.abstractSubmission} variant="ink">
                Submit your abstract
              </Button>
            )}
            <p class="text-[13px] text-ash">Online form · you receive a reference number by email.</p>
          </div>

          <div class="reveal mt-14 border-l-2 border-ember pl-6">
            <p class="font-sans text-[10.5px] font-bold uppercase tracking-[0.28em] text-ash">Possible journal publications</p>
            <ul class="mt-2 space-y-1">
              {journals.map((j) => (
                <li class="text-[1.05rem] font-semibold leading-snug text-ink">{j}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside class="reveal relative self-start bg-night p-8 text-sand shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] md:p-10 lg:sticky lg:top-28">
          <span class="absolute -top-3 left-10 h-[7px] w-[7px] rounded-full bg-signal" aria-hidden="true"></span>
          <span class="absolute left-10 top-0 h-px w-16 bg-amber/50" aria-hidden="true"></span>
          <Eyebrow>Fellowship</Eyebrow>
          <h3 class="font-display text-[1.6rem] leading-tight text-glow">{fellowship.title}</h3>
          <p class="mt-6 flex items-baseline gap-3">
            <span class="font-display text-[3.4rem] font-extrabold leading-none tracking-[-0.04em] text-amber">15</span>
            <span class="max-w-[12rem] font-sans text-[11px] font-bold uppercase leading-relaxed tracking-[0.2em] text-sand/75">
              fellowships for full-time student participants
            </span>
          </p>
          <div class="mt-6 space-y-4 text-[14.5px] leading-[1.75] text-sand/85">
            {fellowship.paragraphs.map((p) => (
              <p>{p}</p>
            ))}
          </div>
          <ul class="mt-7 grid grid-cols-3 gap-px bg-amber/20 text-center">
            {["UG students", "PG students", "Ph.D. / Research scholars"].map((cat) => (
              <li class="bg-night px-2 py-4">
                <span class="block font-display text-[1.6rem] font-extrabold leading-none text-glow">5</span>
                <span class="mt-1 block font-sans text-[10px] uppercase tracking-[0.14em] text-mist">{cat}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
