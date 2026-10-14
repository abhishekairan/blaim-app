// Conference themes (brochure page 7) on parchment: large serif numerals, red initials, three
// focus areas per theme.
import { themes } from "../data/conference";
import { ArchImage, Button, Eyebrow, Title, container } from "../components/ui";

export function Themes() {
  return (
    <section id="themes" class="relative bg-parchment text-ink" aria-labelledby="themes-title">
      <div class={`${container} py-24 md:py-32`}>
        <div class="grid items-end gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <Eyebrow class="text-ember">Conference themes</Eyebrow>
            <Title id="themes-title" class="reveal">
              Five themes, each with three focus areas.
            </Title>
            <p class="reveal mt-6 max-w-[36rem] text-[16px] leading-[1.75] text-ink/75">
              Abstracts are invited under any of the themes below. Choose the theme that best fits your work
              when you submit.
            </p>
          </div>
          <ArchImage slug="light-split-circle" alt="" ratio="3/3.6" class="reveal hidden w-[260px] justify-self-end lg:block" sizes="260px" />
        </div>

        <ol class="mt-16 border-y border-ink/12 divide-y divide-ink/12">
          {themes.map((t, i) => (
            <li class="reveal grid gap-5 py-10 md:grid-cols-[110px_1fr_1.15fr] md:gap-8 md:py-12">
              <div class="flex items-baseline gap-3 md:block">
                <span class="font-sans text-[10.5px] font-bold uppercase tracking-[0.28em] text-ash">Theme</span>
                <span class="font-display text-[3rem] leading-none tracking-[-0.04em] text-signal md:mt-1 md:block md:text-[3.8rem]">{i + 1}</span>
              </div>
              <h3 class="red-initial font-display text-[clamp(1.35rem,1.9vw,1.7rem)] leading-[1.1] text-ink">{t.title}</h3>
              <ul class="space-y-3 text-[15px] leading-relaxed text-ink/80">
                {t.topics.map((topic) => (
                  <li class="flex gap-4">
                    <span class="mt-[0.8em] inline-block h-px w-6 shrink-0 bg-ember" aria-hidden="true"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div class="reveal mt-12 flex flex-wrap items-center gap-6">
          <Button href="/abstract-submission/" variant="ink">
            Submit to a theme
          </Button>
          <a class="font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-ink/70 underline-offset-4 hover:text-ink hover:underline" href="#abstracts">
            Read the submission guidelines
          </a>
        </div>
      </div>
    </section>
  );
}
