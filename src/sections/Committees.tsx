// Steering, advisory, chairs, technical and organising committees (brochure pages 8, 14, 15).
import { committees } from "../data/conference";
import { Eyebrow, PersonCard, Title, container } from "../components/ui";

export function Committees() {
  const [steering, advisory, chairs, technical, organising] = committees;
  return (
    <section id="committees" class="relative bg-umber" aria-labelledby="committees-title">
      <div class={`${container} py-24 md:py-32`}>
        <Eyebrow>Committees</Eyebrow>
        <Title id="committees-title" class="reveal text-sand">
          The people behind {"​"}BLAIM 2.0.
        </Title>

        <div class="mt-14 grid gap-14 lg:grid-cols-3">
          {[steering!, advisory!, chairs!].map((group) => (
            <div class="reveal">
              <h3 class="flex items-center gap-3 border-b border-amber/20 pb-4 font-display text-[1.3rem] text-glow">
                <span class="inline-block h-[7px] w-[7px] rounded-full bg-signal" aria-hidden="true"></span>
                {group.title}
              </h3>
              <ul class="mt-7 space-y-7">
                {group.people.map((p) => (
                  <PersonCard person={p} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div class="mt-20 grid gap-14 border-t border-amber/15 pt-14">
          {[technical!, organising!].map((group) => (
            <div class="reveal">
              <h3 class="font-display text-[1.3rem] text-glow">{group.title}</h3>
              <ul class="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.people.map((p) => (
                  <li class="border-b border-amber/10 pb-3">
                    <span class="block font-sans text-[14px] font-bold leading-snug text-sand">{p.name}</span>
                    <span class="mt-0.5 block text-[13px] leading-snug text-amber">{p.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
