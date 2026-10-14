// Shared building blocks for the Rotunda theme: containers, type styles, buttons, arch-framed
// images and person cards. Keep this the single place where recurring class strings live.
import type { Child } from "hono/jsx";

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

export function Monogram({ name, size = "h-14 w-14 text-[1rem]" }: { name: string; size?: string }) {
  return (
    <span
      class={`grid shrink-0 place-items-center rounded-full border border-amber/40 bg-[radial-gradient(circle_at_30%_25%,var(--color-ember),var(--color-bark)_70%)] font-display font-bold tracking-tight text-glow shadow-[inset_0_0_0_3px_var(--color-night)] ${size}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

export type PersonLike = { name: string; role?: string; org?: string; tag?: string };

/** Name, role and affiliation next to a monogram. `light` flips the text for parchment sections. */
export function PersonCard({ person, light }: { person: PersonLike; light?: boolean }) {
  return (
    <li class="flex items-start gap-4">
      <Monogram name={person.name} />
      <div class="min-w-0">
        {person.tag && (
          <span class={`mb-1 inline-block font-sans text-[10px] font-bold uppercase tracking-[0.22em] ${light ? "text-ember" : "text-amber"}`}>
            {person.tag}
          </span>
        )}
        <p class={`font-sans text-[15px] font-bold leading-snug ${light ? "text-ink" : "text-glow"}`}>{person.name}</p>
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
