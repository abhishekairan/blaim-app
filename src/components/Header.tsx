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

/** Square icon-only control for the language and theme switchers. */
const iconButton =
  "grid h-8 w-8 shrink-0 place-items-center border border-amber/40 text-sand/85 transition-colors duration-300 hover:border-amber hover:text-glow";

const subLink =
  "block whitespace-nowrap px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-sand/85 transition-colors duration-300 hover:bg-amber/10 hover:text-glow focus-visible:bg-amber/10 focus-visible:text-glow focus-visible:outline-none " +
  "max-lg:p-0 max-lg:text-[15px] max-lg:font-semibold max-lg:normal-case max-lg:tracking-normal max-lg:text-sand/75 max-lg:hover:bg-transparent";

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
          class="flex items-center gap-7 max-lg:fixed max-lg:inset-0 max-lg:top-[76px] max-lg:hidden max-lg:flex-col max-lg:items-start max-lg:gap-5 max-lg:overflow-y-auto max-lg:border-t max-lg:border-amber/15 max-lg:bg-night max-lg:px-[max(1.25rem,calc(50%-680px))] max-lg:pt-10 max-lg:pb-16 max-lg:group-data-open/h:flex max-lg:*:shrink-0"
          aria-label="Primary"
        >
          {menu.map((item) =>
            item.children ? (
              // Desktop: dropdown on hover or keyboard focus, no JS. Mobile: children listed under the parent.
              <div class="group/sub relative max-lg:flex max-lg:flex-col max-lg:gap-3">
                <a class={navLink} href={item.href}>
                  {item.label}
                  <span
                    class="ml-2 inline-block h-[5px] w-[5px] -translate-y-0.5 rotate-45 border-r border-b border-current transition-transform duration-300 group-hover/sub:translate-y-0 group-hover/sub:-rotate-135 max-lg:hidden"
                    aria-hidden="true"
                  ></span>
                </a>
                <div class="lg:invisible lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:pt-3 lg:opacity-0 lg:transition-[opacity,visibility] lg:duration-200 lg:group-hover/sub:visible lg:group-hover/sub:opacity-100 lg:group-focus-within/sub:visible lg:group-focus-within/sub:opacity-100 max-lg:border-l max-lg:border-amber/25 max-lg:pl-4">
                  <ul class="lg:min-w-60 lg:border lg:border-amber/20 lg:bg-night/95 lg:py-2 lg:shadow-[0_24px_50px_-20px_color-mix(in_oklab,var(--color-shade)_80%,transparent)] lg:backdrop-blur-md max-lg:space-y-2.5">
                    {item.children.map((child) => (
                      <li>
                        <a class={subLink} href={child.href}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <a class={navLink} href={item.href}>
                {item.label}
              </a>
            ),
          )}
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

        <div class="relative z-10 flex items-center gap-2">
          {/* Driven by src/client/translate.ts. translate="no" keeps Google from translating the language names. */}
          {/* Icon only: the native <select> sits invisibly over the globe, so a click opens the real list. */}
          <div
            class={`${iconButton} relative focus-within:border-amber focus-within:text-glow`}
            translate="no"
            title="Language"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
            </svg>
            <label for="language-select" class="sr-only">
              Language
            </label>
            <select
              id="language-select"
              data-language-select
              class="notranslate absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
            >
              {languageCodes.map((code) => (
                <option class="bg-night text-sand" value={code} selected={code === SOURCE_LANGUAGE}>
                  {LANGUAGES[code].label}
                </option>
              ))}
            </select>
            {/* Mount point for Google's own (hidden) widget. */}
            <div id="google_translate_element" class="hidden"></div>
          </div>

          {/* Label and aria-label are kept in sync with the active theme by src/client/theme.ts. */}
          <button
            type="button"
            data-theme-toggle
            class={`${iconButton} focus-visible:border-amber focus-visible:outline-none`}
            aria-label={`Switch to ${nextThemeLabel} theme`}
            title="Switch theme"
          >
            <span
              class="inline-block h-3.5 w-3.5 rounded-full border border-amber bg-[linear-gradient(90deg,var(--color-amber)_50%,transparent_50%)]"
              aria-hidden="true"
            ></span>
            <span data-theme-label class="sr-only">{THEMES[DEFAULT_THEME].label}</span>
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
