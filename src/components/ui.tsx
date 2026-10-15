// Shared building blocks for the Rotunda theme: containers, type styles, buttons, arch-framed
// images and person cards. Keep this the single place where recurring class strings live.
import type { Child } from "hono/jsx";
import { countryOf } from "../data/countries";
import { personSlug } from "../lib/people";
import { PEOPLE_PHOTOS } from "./photos.data";

export const container = "mx-auto w-[min(1200px,calc(100%-2.5rem))]";

type WithChildren = { children?: Child; class?: string };

export function Eyebrow({ children, class: cls = "" }: WithChildren) {
  return (
    <p class={`mb-5 flex items-center gap-3 font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-amber ${cls}`}>
      <span class="inline-block h-px w-8 bg-amber/60" aria-hidden="true"></span>
      {children}
    </p>
  );
}

/** Section title. Colour comes from the surrounding section (text-sand on dark, text-ink on light). */
export function Title({ children, class: cls = "", id }: WithChildren & { id?: string }) {
  return (
    <h2 id={id} class={`font-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-extrabold leading-[1.05] tracking-[-0.03em] ${cls}`}>
      {children}
    </h2>
  );
}

export function Lede({ children, class: cls = "" }: WithChildren) {
  return <p class={`mt-6 max-w-[42rem] text-[17px] leading-[1.75] ${cls}`}>{children}</p>;
}

type ButtonProps = WithChildren & { href: string; variant?: "primary" | "ghost" | "ink" | "parchment" };

const btnBase =
  "group inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 font-sans text-[12.5px] font-bold uppercase tracking-[0.16em] transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-expo hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

const btnVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-amber text-night shadow-[0_12px_32px_-8px_rgba(217,166,107,0.55)] hover:bg-glow",
  ghost: "border border-sand/30 text-sand hover:border-amber hover:text-amber",
  ink: "bg-ink text-parchment hover:bg-bark",
  parchment: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-parchment",
};

export function Button({ href, children, variant = "primary", class: cls = "" }: ButtonProps) {
  return (
    <a href={href} class={`${btnBase} ${btnVariants[variant]} ${cls}`}>
      {children}
      <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

/** Small text link with an arrow, e.g. from a homepage section to its /about/ page. Inherits text colour. */
export function ReadMore({ href, children }: { href: string; children: Child }) {
  return (
    <p class="mt-6">
      <a
        href={href}
        class="group inline-flex items-center gap-2 border-b border-current/30 pb-1 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-current transition-colors duration-300 hover:border-current"
      >
        {children}
        <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </p>
  );
}

/** Responsive sources for the brochure renders in public/assets/brochure (portrait, 941x1670). */
export function brochureImg(slug: string) {
  return {
    src: `/assets/brochure/${slug}.webp`,
    srcset: `/assets/brochure/${slug}-560.webp 560w, /assets/brochure/${slug}.webp 941w`,
  };
}

type ArchImageProps = {
  slug: string;
  alt?: string;
  /** Aspect ratio of the frame, e.g. "3/4.4". The image is cropped from its top. */
  ratio?: string;
  outline?: boolean;
  eager?: boolean;
  sizes?: string;
  class?: string;
};

/** A portrait render masked into an arch (the brochure's recurring frame). */
export function ArchImage({ slug, alt = "", ratio = "3/4.4", outline, eager, sizes = "(min-width: 1024px) 440px, 90vw", class: cls = "" }: ArchImageProps) {
  const { src, srcset } = brochureImg(slug);
  return (
    <figure class={`relative ${cls}`}>
      {outline && <span class="arch-outline" aria-hidden="true"></span>}
      <div class="overflow-hidden rounded-t-full bg-umber shadow-[0_40px_80px_-30px_color-mix(in_oklab,var(--color-shade)_80%,transparent)]" style={`aspect-ratio:${ratio}`}>
        <img
          class="h-full w-full object-cover object-top"
          src={src}
          srcset={srcset}
          sizes={sizes}
          width="941"
          height="1670"
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          fetchpriority={eager ? "high" : undefined}
          decoding="async"
        />
      </div>
    </figure>
  );
}

/** Full-bleed, dimmed background render for a section. The section must be `relative isolate`. */
export function Backdrop({ slug, opacity = "opacity-30", position = "object-center", class: cls = "" }: { slug: string; opacity?: string; position?: string; class?: string }) {
  const { src, srcset } = brochureImg(slug);
  return (
    <div class={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${cls}`} aria-hidden="true">
      <img class={`h-full w-full object-cover ${position} ${opacity} light:opacity-20`} src={src} srcset={srcset} sizes="100vw" alt="" loading="lazy" decoding="async" />
      <div class="absolute inset-0 bg-[linear-gradient(180deg,var(--color-night)_0%,color-mix(in_oklab,var(--color-night)_45%,transparent)_30%,color-mix(in_oklab,var(--color-night)_45%,transparent)_70%,var(--color-night)_100%)]"></div>
    </div>
  );
}

const TITLES = /^(prof\.?|dr\.?|mr\.?|ms\.?|mrs\.?|shri|smt\.?)$/i;

export function initials(name: string) {
  const words = name
    .replace(/\(.*?\)/g, "")
    .split(/[\s,]+/)
    .filter((w) => w && !TITLES.test(w));
  const [a = "", b = ""] = words;
  return ((a[0] ?? "") + (b[0] ?? "")).toUpperCase() || name[0]!.toUpperCase();
}

/** Portrait URLs for a person, or null when no photo has been added (see scripts/people-photos.ts). */
export function personPhoto(name: string) {
  const slug = personSlug(name);
  return PEOPLE_PHOTOS.has(slug) ? { small: `/assets/people/${slug}-160.webp`, large: `/assets/people/${slug}-600.webp` } : null;
}

/** The person's photo in a circle, or their initials when there is no photo yet. */
export function Monogram({ name, size = "h-14 w-14 text-[1rem]" }: { name: string; size?: string }) {
  const photo = personPhoto(name);
  return (
    <span
      class={`grid shrink-0 place-items-center overflow-hidden rounded-full border border-amber/40 bg-[radial-gradient(circle_at_30%_25%,var(--color-ember),var(--color-bark)_70%)] font-display font-bold tracking-tight text-glow shadow-[inset_0_0_0_3px_var(--color-night)] ${size}`}
      aria-hidden="true"
    >
      {photo ? <img class="h-full w-full object-cover" src={photo.small} width="160" height="160" alt="" loading="lazy" decoding="async" /> : initials(name)}
    </span>
  );
}

export type PersonLike = { name: string; role?: string; org?: string; tag?: string };

/** Country flag placed before a person's name; nothing when the brochure gives no country. */
export function Flag({ person }: { person: PersonLike }) {
  const country = countryOf(person);
  if (!country) return null;
  return (
    <img
      class="mr-2 inline-block h-[0.75em] w-auto align-[0.02em] shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-sand)_25%,transparent)]"
      src={`/assets/flags/${country.code}.svg`}
      width="16"
      height="12"
      alt={country.name}
      title={country.name}
      loading="lazy"
      decoding="async"
    />
  );
}

/** Classes for an element that shows a PersonHoverCard; also mark it with `data-person` (see app.css). */
export const personHost = "group/person relative hover:z-40";

/**
 * Details card that rises above a person on hover (pointer devices only; Tailwind's hover variants
 * are gated on `(hover: hover)`). Everything in it is also in the visible card, so it is aria-hidden.
 */
export function PersonHoverCard({ person, context }: { person: PersonLike; context?: string }) {
  const country = countryOf(person);
  const photo = personPhoto(person.name);
  return (
    <div
      class="pointer-events-none invisible absolute bottom-full left-0 z-40 mb-3 w-[min(21rem,calc(100vw-2.5rem))] translate-y-2 border border-amber/35 bg-night p-5 text-left opacity-0 shadow-[0_30px_60px_-20px_color-mix(in_oklab,var(--color-shade)_85%,transparent)] transition-[opacity,translate,visibility] duration-300 ease-expo group-hover/person:visible group-hover/person:delay-500 group-hover/person:translate-y-0 group-hover/person:opacity-100"
      aria-hidden="true"
    >
      <span class="absolute top-0 left-5 h-[3px] w-10 bg-signal"></span>
      <div class={photo ? "grid grid-cols-[8rem_1fr] items-end gap-4" : "flex items-center gap-4"}>
        {photo ? (
          // Large arch-framed portrait: the card circles are too small to recognise anyone.
          <img
            class="h-40 w-32 rounded-t-full object-cover ring-1 ring-amber/40"
            src={photo.large}
            width="480"
            height="600"
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Monogram name={person.name} size="h-12 w-12 text-[0.95rem]" />
        )}
        <div class="min-w-0">
          {person.tag && <p class="font-sans text-[9.5px] font-bold uppercase tracking-[0.22em] text-amber">{person.tag}</p>}
          <p class="font-display text-[1.05rem] font-extrabold leading-tight tracking-[-0.01em] text-glow">{person.name}</p>
        </div>
      </div>
      {(person.role || person.org) && (
        <div class="mt-4 space-y-1 border-t border-amber/15 pt-4">
          {person.role && <p class="text-[13.5px] font-semibold leading-snug text-sand">{person.role}</p>}
          {person.org && <p class="text-[13px] leading-snug text-sand/75">{person.org}</p>}
        </div>
      )}
      {(country || context) && (
        <div class="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
          {country && (
            <span class="inline-flex items-center gap-2">
              <img class="h-[11px] w-auto" src={`/assets/flags/${country.code}.svg`} width="15" height="11" alt="" loading="lazy" decoding="async" />
              {country.name}
            </span>
          )}
          {context && <span class="text-amber">{context}</span>}
        </div>
      )}
    </div>
  );
}

/** Name, role and affiliation next to a monogram. `light` flips the text for parchment sections. */
export function PersonCard({ person, light, context }: { person: PersonLike; light?: boolean; context?: string }) {
  return (
    <li class={`${personHost} flex items-start gap-4`} data-person>
      <PersonHoverCard person={person} context={context} />
      <Monogram name={person.name} />
      <div class="min-w-0">
        {person.tag && (
          <span class={`mb-1 inline-block font-sans text-[10px] font-bold uppercase tracking-[0.22em] ${light ? "text-ember" : "text-amber"}`}>
            {person.tag}
          </span>
        )}
        <p class={`font-sans text-[15px] font-bold leading-snug ${light ? "text-ink" : "text-glow"}`}>
          <Flag person={person} />
          {person.name}
        </p>
        {person.role && <p class={`mt-1 text-[13px] leading-snug ${light ? "text-ink/80" : "text-sand/85"}`}>{person.role}</p>}
        {person.org && <p class={`mt-0.5 text-[12.5px] leading-snug ${light ? "text-ash" : "text-mist"}`}>{person.org}</p>}
      </div>
    </li>
  );
}

/** Small red dot, the brochure's punctuation mark. */
export function Dot({ class: cls = "" }: { class?: string }) {
  return <span class={`inline-block h-[7px] w-[7px] rounded-full bg-signal align-middle ${cls}`} aria-hidden="true"></span>;
}
