import { cta, menu } from "../data/menu";
import { conference } from "../data/conference";

// Fixed header. Transparent over the hero; src/client/ui.ts sets data-scrolled once the page moves
// and data-open when the mobile menu is open. Desktop (>=1024px) shows the inline nav.

const navLink =
  "relative inline-flex min-h-11 items-center font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-sand/85 transition-colors duration-300 hover:text-glow focus-visible:text-glow focus-visible:outline-none " +
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-300 hover:after:scale-x-100 " +
  "max-lg:min-h-0 max-lg:font-display max-lg:text-[clamp(1.5rem,6vw,2.2rem)] max-lg:font-extrabold max-lg:tracking-[-0.02em] max-lg:normal-case max-lg:tracking-normal max-lg:text-sand max-lg:after:hidden";

export function Header() {
  return (
    <header
      data-header
      class="group/h fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-500 data-scrolled:border-amber/15 data-scrolled:bg-night/85 data-scrolled:backdrop-blur-md data-open:bg-night"
    >
      <div class="mx-auto flex h-[76px] w-[min(1360px,calc(100%-2.5rem))] items-center justify-between gap-6">
        <a class="relative z-10 inline-flex items-center" href="/" aria-label={`${conference.shortName} home`}>
          <img
            class="h-9 w-auto md:h-10"
            src="/assets/brand/logo-white.svg"
            width="2966"
            height="1000"
            alt={conference.shortName}
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </a>

        <nav
          id="primary-navigation"
          data-nav
          class="flex items-center gap-7 max-lg:fixed max-lg:inset-0 max-lg:top-[76px] max-lg:hidden max-lg:flex-col max-lg:items-start max-lg:gap-5 max-lg:overflow-y-auto max-lg:border-t max-lg:border-amber/15 max-lg:bg-night max-lg:px-[max(1.25rem,calc(50%-680px))] max-lg:pt-10 max-lg:pb-16 max-lg:group-data-open/h:flex"
          aria-label="Primary"
        >
          {menu.map((item) => (
            <a class={navLink} href={item.href}>
              {item.label}
            </a>
          ))}
          <a
            class="inline-flex min-h-11 items-center gap-3 border border-amber/60 px-5 font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-glow transition-colors duration-300 hover:bg-amber hover:text-night focus-visible:bg-amber focus-visible:text-night focus-visible:outline-none max-lg:mt-6 max-lg:w-full max-lg:justify-center"
            href={cta.href}
          >
            {cta.label}
            <span class="inline-block h-[6px] w-[6px] rounded-full bg-signal" aria-hidden="true"></span>
          </a>
          <p class="mt-auto hidden pt-10 font-sans text-[11px] uppercase tracking-[0.24em] text-mist max-lg:block">
            {conference.dates.label} · {conference.mode} · Parul University, Vadodara
          </p>
        </nav>

        <button
          type="button"
          class="relative z-10 inline-flex h-11 items-center gap-3 font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-sand lg:hidden"
          data-menu-toggle
          aria-expanded="false"
          aria-controls="primary-navigation"
        >
          <span class="group-data-open/h:hidden">Menu</span>
          <span class="hidden group-data-open/h:inline">Close</span>
          <span class="grid w-6 gap-[5px]" aria-hidden="true">
            <span class="block h-px w-full bg-current transition-transform duration-300 group-data-open/h:translate-y-[6px] group-data-open/h:rotate-45"></span>
            <span class="block h-px w-full bg-current transition-opacity duration-300 group-data-open/h:opacity-0"></span>
            <span class="block h-px w-full bg-current transition-transform duration-300 group-data-open/h:-translate-y-[6px] group-data-open/h:-rotate-45"></span>
          </span>
        </button>
      </div>
    </header>
  );
}
