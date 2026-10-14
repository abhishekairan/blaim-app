// Guests and speakers (brochure pages 9-12), grouped by theme as in the brochure. The brochure's
// portraits are not available as separate files, so each person gets a monogram.
import { guests, speakersByTheme, themes } from "../data/conference";
import { Backdrop, Eyebrow, Monogram, PersonCard, Title, container } from "../components/ui";

export function Speakers() {
  return (
    <section id="speakers" class="relative isolate bg-night" aria-labelledby="speakers-title">
      <Backdrop slug="dome-oculus-beam-wide" opacity="opacity-25" position="object-[center_30%]" />
      <div class={`${container} py-24 md:py-32`}>
        <Eyebrow>Our guests</Eyebrow>
        <Title id="speakers-title" class="reveal text-sand">
          Guests of honour and invited speakers.
        </Title>

        <ul class="mt-12 grid gap-6 md:grid-cols-3">
          {guests.map((g) => (
            <li class="reveal relative border border-amber/20 bg-char/70 p-7 backdrop-blur-sm">
              <span class="absolute top-0 left-7 h-[3px] w-10 bg-signal" aria-hidden="true"></span>
              <Monogram name={g.name} size="h-16 w-16 text-[1.2rem]" />
              {g.tag && <p class="mt-5 font-sans text-[10.5px] font-bold uppercase tracking-[0.24em] text-amber">{g.tag}</p>}
              <p class="mt-1 font-display text-[1.2rem] font-extrabold leading-tight tracking-[-0.02em] text-glow">{g.name}</p>
              {g.role && <p class="mt-1 text-[13.5px] text-sand/85">{g.role}</p>}
              {g.org && <p class="mt-0.5 text-[13px] text-mist">{g.org}</p>}
            </li>
          ))}
        </ul>

        <div class="mt-24 space-y-20">
          {themes.map((t, i) => (
            <div class="reveal grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-14">
              <div class="lg:sticky lg:top-28 lg:self-start">
                <span class="inline-flex items-center gap-2 bg-amber px-3 py-1.5 font-sans text-[10.5px] font-bold uppercase tracking-[0.24em] text-night">
                  Theme <span class="text-signal">{i + 1}</span>
                </span>
                <h3 class="red-initial mt-4 font-display text-[1.45rem] leading-[1.1] text-sand">{t.title}</h3>
                <p class="mt-3 font-sans text-[11px] uppercase tracking-[0.2em] text-mist">
                  {speakersByTheme[i]!.length} speakers
                </p>
              </div>
              <ul class="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                {speakersByTheme[i]!.map((p) => (
                  <PersonCard person={p} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
