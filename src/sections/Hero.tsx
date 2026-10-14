// Hero: the brochure cover. Dark stone, a beam of light, the title in the logo's heavy sans and
// the conference theme line with its red Z, next to a render framed as an arch.
import { conference } from "../data/conference";
import { ArchImage, Button, Dot, container } from "../components/ui";

export function Hero() {
  return (
    <section id="top" class="relative isolate overflow-hidden bg-night" aria-labelledby="hero-title">
      <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* --hero-image is set per theme in app.css (dark columns on Rotunda, the cream dome on Daylight),
            so only the active theme's render is downloaded. Layout preloads the default one. */}
        <div class="absolute inset-0 bg-[image:var(--hero-image)] bg-cover bg-[position:60%_center] opacity-60 light:opacity-100"></div>
        <div class="absolute inset-0 bg-[linear-gradient(90deg,var(--color-night)_0%,color-mix(in_oklab,var(--color-night)_72%,transparent)_40%,color-mix(in_oklab,var(--color-night)_20%,transparent)_100%)]"></div>
        <div class="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-night)_60%,transparent)_0%,color-mix(in_oklab,var(--color-night)_10%,transparent)_35%,var(--color-night)_100%)]"></div>
        <div class="absolute -top-1/4 left-[62%] h-[150%] w-[22%] -translate-x-1/2 rotate-[16deg] bg-[linear-gradient(180deg,rgba(241,207,154,0.26),rgba(241,207,154,0)_65%)] blur-3xl animate-beam motion-reduce:animate-none"></div>
      </div>

      <div class={`${container} grid min-h-[100svh] items-center gap-14 pt-32 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10`}>
        <div class="max-w-[46rem]">
          <p class="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-amber animate-rise [animation-delay:60ms]">
            <span>{conference.dates.label}</span>
            <Dot />
            <span>{conference.mode}</span>
            <Dot />
            <span>Parul University, Vadodara</span>
          </p>
          <p class="mt-9 text-[clamp(1rem,1.4vw,1.2rem)] font-medium text-glow/90 animate-rise [animation-delay:160ms]">
            {conference.edition}
          </p>
          <h1
            id="hero-title"
            class="mt-3 font-display text-[clamp(2.2rem,4.7vw,4.3rem)] font-extrabold leading-[1] tracking-[-0.035em] text-sand animate-rise [animation-delay:240ms]"
          >
            Mindfulness, Behavioural Science <span class="text-amber">&amp;</span> Legal Innovation
          </h1>
          <p class="mt-9 max-w-[32rem] border-l border-amber/50 pl-5 font-sans text-[15px] font-semibold leading-relaxed tracking-[0.03em] text-sand/90 animate-rise [animation-delay:330ms]">
            “Gen <span class="text-signal">Z</span> for Sustainable, Just and Human-Centred Futures”
          </p>
          <div class="mt-10 flex flex-wrap gap-3 animate-rise [animation-delay:420ms]">
            <Button href="/abstract-submission/">Submit an abstract</Button>
            <Button href="#registration" variant="ghost">
              Registration &amp; fees
            </Button>
          </div>

          <div class="mt-16 grid gap-6 border-t border-amber/15 pt-8 sm:grid-cols-[auto_1fr] sm:gap-10 animate-rise [animation-delay:520ms]">
            <div>
              <p class="font-sans text-[10.5px] font-bold uppercase tracking-[0.24em] text-mist">Organised by</p>
              <p class="mt-1 font-display text-[1.25rem] font-extrabold leading-tight tracking-[-0.02em] text-glow">{conference.organiser}</p>
            </div>
            <div>
              <p class="font-sans text-[10.5px] font-bold uppercase tracking-[0.24em] text-mist">In association with</p>
              <ul class="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-sand/80">
                {conference.association.map((name) => (
                  <li class="flex items-center gap-2">
                    <span class="inline-block h-px w-3 bg-amber/60" aria-hidden="true"></span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div class="relative mx-auto w-[min(100%,420px)] animate-rise [animation-delay:300ms] lg:justify-self-end">
          <ArchImage slug="arch-oculus-altar" alt="A stone rotunda lit from an oculus above a central table" eager outline />
          <p class="mt-6 flex items-center justify-between font-sans text-[10.5px] uppercase tracking-[0.24em] text-mist">
            <span>{conference.shortName}</span>
            <span>Vadodara · Gujarat · India</span>
          </p>
        </div>
      </div>
    </section>
  );
}
