// About, Aim and Rationale (brochure pages 5-6), set as an editorial spread next to a render.
import { about } from "../data/conference";
import { ABOUT_PAGES } from "../data/about";
import { ArchImage, Eyebrow, ReadMore, Title, container } from "../components/ui";

export function About() {
  return (
    <section id="about" class="relative isolate bg-night" aria-labelledby="about-title">
      <div class={`${container} grid gap-14 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <div class="relative lg:sticky lg:top-28 lg:self-start">
          <ArchImage slug="arch-mosaic-walls" alt="" ratio="3/4" outline class="reveal mx-auto w-[min(100%,380px)]" />
          <span class="rule-dot rule-dot-v absolute -left-6 top-10 hidden h-[60%] lg:block" aria-hidden="true"></span>
        </div>

        <div>
          <Eyebrow>About the conference</Eyebrow>
          <Title id="about-title" class="text-sand reveal">
            A multidisciplinary platform for scholars, practitioners and change makers.
          </Title>
          <div class="mt-10 space-y-5 text-[16.5px] leading-[1.8] text-sand/85">
            {about.conference.map((p, i) => (
              <p class={`reveal ${i === 0 ? "drop-cap" : ""}`}>{p}</p>
            ))}
            <div class="text-amber">
              <ReadMore href={ABOUT_PAGES.blaim.path}>More about BLAIM 2.0</ReadMore>
            </div>
          </div>

          <div class="mt-16 grid gap-10 border-t border-amber/15 pt-10 md:grid-cols-2">
            <div class="reveal">
              <h3 class="flex items-baseline gap-3 font-display text-[1.5rem] text-glow">
                <span class="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-signal">01</span>
                Aim
              </h3>
              <p class="mt-4 text-[15px] leading-[1.8] text-sand/80">{about.aim}</p>
            </div>
            <div class="reveal">
              <h3 class="flex items-baseline gap-3 font-display text-[1.5rem] text-glow">
                <span class="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-signal">02</span>
                Rationale
              </h3>
              <p class="mt-4 text-[15px] leading-[1.8] text-sand/80">{about.rationale}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
