// Host institution: Parul University, SCOPE and CEBPSI (brochure pages 2-4).
import { host } from "../data/conference";
import { ABOUT_PAGES } from "../data/about";
import { ArchImage, Eyebrow, ReadMore, Title, container } from "../components/ui";

export function Host() {
  return (
    <section id="host" class="relative bg-parchment text-ink" aria-labelledby="host-title">
      <div class={`${container} py-24 md:py-32`}>
        <Eyebrow class="text-ember">Host institution</Eyebrow>
        <Title id="host-title" class="reveal">
          {host.parul.title}
        </Title>

        <div class="mt-12 grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div class="space-y-5 text-[16px] leading-[1.8] text-ink/85">
            {host.parul.paragraphs.map((p, i) => (
              <p class={`reveal ${i === 0 ? "drop-cap" : ""}`}>{p}</p>
            ))}
            <ReadMore href={ABOUT_PAGES.parul.path}>More about Parul University</ReadMore>
          </div>
          <div class="reveal">
            <ArchImage slug="light-floating-sun" alt="" ratio="3/3.4" class="mx-auto w-[min(100%,320px)]" sizes="320px" />
            <dl class="mt-8 grid grid-cols-2 gap-px bg-ink/12">
              {host.parul.stats.map(([value, label]) => (
                <div class="bg-parchment px-4 py-5">
                  <dt class="font-display text-[1.6rem] font-extrabold leading-none tracking-[-0.03em] text-ink">{value}</dt>
                  <dd class="mt-1.5 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-ash">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div class="mt-20 grid gap-14 border-t border-ink/12 pt-16 lg:grid-cols-2 lg:gap-20">
          <article id="about-scope" class="reveal">
            <h3 class="font-display text-[1.5rem] leading-tight text-ink">{host.scope.title}</h3>
            <ul class="mt-5 flex flex-wrap gap-2">
              {host.scope.pillars.map((p) => (
                <li class="border border-ink/20 px-3 py-1 font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink/75">{p}</li>
              ))}
            </ul>
            <div class="mt-6 space-y-4 text-[15px] leading-[1.8] text-ink/85">
              {host.scope.paragraphs.map((p) => (
                <p>{p}</p>
              ))}
            </div>
            <ReadMore href={ABOUT_PAGES.scope.path}>More about SCOPE</ReadMore>
          </article>
          <article id="about-cebpsi" class="reveal">
            <h3 class="font-display text-[1.5rem] leading-tight text-ink">{host.cebpsi.title}</h3>
            <div class="mt-6 space-y-4 text-[15px] leading-[1.8] text-ink/85">
              {host.cebpsi.paragraphs.map((p) => (
                <p>{p}</p>
              ))}
            </div>
            <ReadMore href={ABOUT_PAGES.cebpsi.path}>More about CEBPSI</ReadMore>
          </article>
        </div>
      </div>
    </section>
  );
}
