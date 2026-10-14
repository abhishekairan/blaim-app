import { conference } from "../data/conference";
import { menu } from "../data/menu";
import { container } from "./ui";

// Site footer: the brochure's back page (organiser, association, venue, two committee mailboxes).

const label = "mb-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.24em] text-amber";
const link = "transition-colors duration-300 hover:text-glow";

export function Footer() {
  return (
    <footer class="relative border-t border-amber/15 bg-char text-sand">
      <div class={`${container} grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]`}>
        <div>
          <img class="h-10 w-auto light:hidden" src="/assets/brand/logo-white.svg" width="2966" height="1000" alt={conference.shortName} loading="lazy" decoding="async" />
          <img class="hidden h-10 w-auto light:block" src="/assets/brand/logo.svg" width="2966" height="1000" alt="" loading="lazy" decoding="async" />
          <p class="mt-6 max-w-[30rem] font-display text-[1.15rem] font-extrabold leading-snug tracking-[-0.02em] text-sand">
            {conference.edition} {conference.title}
          </p>
          <p class="mt-3 font-sans text-[12px] uppercase tracking-[0.2em] text-mist">
            {conference.dates.label} · {conference.mode}
          </p>
        </div>

        <div>
          <p class={label}>Organised by</p>
          <p class="font-display text-[1.1rem] font-extrabold leading-tight tracking-[-0.02em] text-glow">{conference.organiser}</p>
          <p class={`${label} mt-6`}>In association with</p>
          <ul class="space-y-1 text-[13.5px] text-sand/85">
            {conference.association.map((name) => (
              <li>{name}</li>
            ))}
          </ul>
        </div>

        <div>
          <p class={label}>Conference venue</p>
          <p class="text-[14px] leading-relaxed text-sand/85">{conference.venue.address}</p>
          <p class={`${label} mt-6`}>Contact</p>
          <ul class="space-y-2 text-[14px]">
            <li>
              <span class="block text-[11px] uppercase tracking-[0.16em] text-mist">Organising Committee</span>
              <a class={link} href={`mailto:${conference.contacts.organising}`}>
                {conference.contacts.organising}
              </a>
            </li>
            <li>
              <span class="block text-[11px] uppercase tracking-[0.16em] text-mist">Programme Committee</span>
              <a class={link} href={`mailto:${conference.contacts.programme}`}>
                {conference.contacts.programme}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class={label}>On this page</p>
          <ul class="space-y-2 text-[14px]">
            {menu.map((item) => (
              <li>
                <a class={link} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a class={`${link} text-glow`} href="/abstract-submission/">
                Submit an abstract
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-amber/10">
        <div class={`${container} flex flex-wrap items-center justify-between gap-3 py-5 font-sans text-[11.5px] text-mist`}>
          <p>
            © 2026 {conference.organiser}. {conference.shortName}.
          </p>
          <p class="flex items-center gap-2">
            <span class="inline-block h-[6px] w-[6px] rounded-full bg-signal" aria-hidden="true"></span>
            {conference.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
