// Theme switching. The initial theme is applied by the inline bootstrap in <head> (src/theme.ts);
// this module wires the [data-theme-toggle] buttons and keeps open tabs in sync.

import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY, isThemeName, type ThemeName } from "../theme";

const names = Object.keys(THEMES) as ThemeName[];

export function currentTheme(): ThemeName {
  const theme = document.documentElement.dataset.theme;
  return isThemeName(theme) ? theme : DEFAULT_THEME;
}

function nextTheme(theme: ThemeName): ThemeName {
  return names[(names.indexOf(theme) + 1) % names.length]!;
}

function apply(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEMES[theme].themeColor);
  document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((toggle) => {
    toggle.setAttribute("aria-label", `Switch to ${THEMES[nextTheme(theme)].label} theme`);
    const label = toggle.querySelector("[data-theme-label]");
    if (label) label.textContent = THEMES[theme].label;
  });
  document.dispatchEvent(new CustomEvent("blaim:themechange", { detail: { theme } }));
}

export function setTheme(theme: ThemeName) {
  apply(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode, disabled cookies): the choice just won't persist.
  }
}

export function initTheme() {
  apply(currentTheme());

  document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", () => setTheme(nextTheme(currentTheme())));
  });

  window.addEventListener("storage", (event) => {
    if (event.key === THEME_STORAGE_KEY) apply(isThemeName(event.newValue) ? event.newValue : DEFAULT_THEME);
  });
}
