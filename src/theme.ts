// Theme registry, shared by the server (Layout) and the browser (src/client/theme.ts).
// A theme is a block of CSS custom properties keyed off <html data-theme="…">; see src/styles/app.css.
// Adding a theme: add an entry here and a matching :root[data-theme="…"] block in app.css.
// Keep this module import-free: it is bundled into the client.

export const THEMES = {
  classic: { label: "Classic", themeColor: "#16564E" },
  neural: { label: "Neural", themeColor: "#0A4A26" },
} as const;

export type ThemeName = keyof typeof THEMES;

export const DEFAULT_THEME: ThemeName = "classic";

/** localStorage key holding the visitor's choice. Client-side only, so pages stay cacheable. */
export const THEME_STORAGE_KEY = "blaim-theme";

export const isThemeName = (value: unknown): value is ThemeName =>
  typeof value === "string" && Object.hasOwn(THEMES, value);

const themeColors = Object.fromEntries(Object.entries(THEMES).map(([name, t]) => [name, t.themeColor]));

/**
 * Inline <head> script: applies the saved theme before first paint so it never flashes the default.
 * Must run after <meta name="theme-color"> has been parsed. Only our own static data is embedded.
 */
export const themeBootstrap =
  `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}),c=${JSON.stringify(themeColors)};` +
  `if(t&&Object.prototype.hasOwnProperty.call(c,t)){document.documentElement.dataset.theme=t;` +
  `var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",c[t])}}catch(e){}`;
