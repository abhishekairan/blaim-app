// Key dates as a timeline: one hairline, red dots, dates set in the display serif.
import { keyDates } from "../data/conference";
import { Eyebrow, container } from "../components/ui";

export function KeyDates() {
  return (
    <section id="dates" class="border-y border-amber/15 bg-char" aria-labelledby="dates-title">
      <div class={`${container} py-14 md:py-16`}>
        <div class="flex flex-wrap items-end justify-between gap-4">
          <Eyebrow class="mb-0">Key dates</Eyebrow>
          <p id="dates-title" class="text-[14px] font-medium text-sand/70">
            Deadlines as published in the conference brochure
          </p>
        </div>
        <ol class="relative mt-10 grid gap-9 md:grid-cols-4 md:gap-6">
          <span class="rule-dot rule-dot-h absolute inset-x-0 top-[5px] hidden md:block" aria-hidden="true"></span>
          {keyDates.map((d) => (
            <li class="reveal relative pl-6 md:pl-0 md:pt-9">
              <span class="absolute top-[7px] left-0 h-[11px] w-[11px] rounded-full bg-signal md:top-0" aria-hidden="true"></span>
              <time datetime={d.iso} class="block font-display text-[1.65rem] font-extrabold leading-none tracking-[-0.02em] text-glow">
                {d.date}
              </time>
              <p class="mt-3 max-w-[14rem] font-sans text-[12px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-sand/80">
                {d.label}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
