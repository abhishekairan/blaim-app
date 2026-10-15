import { cta, menu } from "../data/menu";
import { conference } from "../data/conference";
import { DEFAULT_THEME, THEMES } from "../theme";
import { LANGUAGES, SOURCE_LANGUAGE, type LanguageCode } from "../languages";

const languageCodes = Object.keys(LANGUAGES) as LanguageCode[];

const themeNames = Object.keys(THEMES) as (keyof typeof THEMES)[];
const nextThemeLabel = THEMES[themeNames[(themeNames.indexOf(DEFAULT_THEME) + 1) % themeNames.length]!].label;

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
        <a class="relative z-10 inline-flex items-center" href="/" translate="no" aria-label={`${conference.shortName} home`}>
          {/* The logo is the one element that swaps per theme: white wordmark on Rotunda, black on Daylight. */}
          <img
            class="h-9 w-auto light:hidden md:h-10"
            src="/assets/brand/logo-white.svg"
            width="2966"
            height="1000"
            alt={conference.shortName}
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          <img class="hidden h-9 w-auto light:block md:h-10" src="/assets/brand/logo.svg" width="2966" height="1000" alt="" decoding="async" />
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

        <div class="relative z-10 flex items-center gap-4 max-sm:gap-2.5">
          {/* Driven by src/client/translate.ts. translate="no" keeps Google from translating the language names. */}
          <div class="relative" translate="no">
            <label for="language-select" class="sr-only">
              Language
            </label>
            <select
              id="language-select"
              data-language-select
              class="notranslate h-9 cursor-pointer appearance-none border border-amber/40 bg-transparent pr-7 pl-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.2em] text-sand/85 transition-colors duration-300 hover:border-amber hover:text-glow focus-visible:border-amber focus-visible:outline-none max-sm:max-w-[6.5rem]"
            >
              {languageCodes.map((code) => (
                <option class="bg-night text-sand normal-case tracking-normal" value={code} selected={code === SOURCE_LANGUAGE}>
                  {LANGUAGES[code].label}
                </option>
              ))}
            </select>
            <span
              class="pointer-events-none absolute top-1/2 right-2.5 h-1.5 w-1.5 -translate-y-3/4 rotate-45 border-r border-b border-amber"
              aria-hidden="true"
            ></span>
            {/* Mount point for Google's own (hidden) widget. */}
            <div id="google_translate_element" class="hidden"></div>
          </div>

          {/* Label and aria-label are kept in sync with the active theme by src/client/theme.ts. */}
          <button
            type="button"
            data-theme-toggle
            class="inline-flex h-9 items-center gap-2.5 border border-amber/40 px-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.2em] text-sand/85 transition-colors duration-300 hover:border-amber hover:text-glow focus-visible:border-amber focus-visible:outline-none"
            aria-label={`Switch to ${nextThemeLabel} theme`}
          >
            <span
              class="inline-block h-3 w-3 rounded-full border border-amber bg-[linear-gradient(90deg,var(--color-amber)_50%,transparent_50%)]"
              aria-hidden="true"
            ></span>
            <span data-theme-label class="max-sm:sr-only">{THEMES[DEFAULT_THEME].label}</span>
          </button>

        <button
          type="button"
          class="inline-flex h-11 items-center gap-3 font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-sand lg:hidden"
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
      </div>
    </header>
  );
}
