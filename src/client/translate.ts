// Language switching via the Google Translate website widget. The widget script is loaded only when a
// non-English language is active, so English visitors never fetch anything from Google for this.
// The choice lives in Google's own "googtrans" cookie (/en/<code>), which the widget reads on start-up.

import { LANGUAGES, SOURCE_LANGUAGE, isLanguageCode, type LanguageCode } from "../languages";

declare global {
  interface Window {
    blaimTranslateInit?: () => void;
    google?: { translate: { TranslateElement: new (options: object, elementId: string) => unknown } };
  }
}

const COOKIE = "googtrans";
const WIDGET_SRC = "https://translate.google.com/translate_a/element.js?cb=blaimTranslateInit";
const ONE_YEAR = 60 * 60 * 24 * 365;

function currentLanguage(): LanguageCode {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/;]*\/([^;]+)/);
  const code = match ? decodeURIComponent(match[1]!) : SOURCE_LANGUAGE;
  return isLanguageCode(code) ? code : SOURCE_LANGUAGE;
}

/** Google writes the cookie both host-only and on the parent domain, so both copies are kept in step. */
function writeCookie(value: string, maxAge: number) {
  const base = `${COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = base;
  const host = location.hostname;
  if (host.includes(".") && !/^[\d.]+$/.test(host)) document.cookie = `${base}; domain=.${host}`;
}

let widgetRequested = false;

function loadWidget() {
  if (widgetRequested) return;
  widgetRequested = true;
  window.blaimTranslateInit = () => {
    new window.google!.translate.TranslateElement(
      { pageLanguage: SOURCE_LANGUAGE, includedLanguages: Object.keys(LANGUAGES).join(","), autoDisplay: false },
      "google_translate_element",
    );
  };
  const script = document.createElement("script");
  script.src = WIDGET_SRC;
  script.async = true;
  document.head.append(script);
}

function setLanguage(code: LanguageCode) {
  if (code === SOURCE_LANGUAGE) {
    // The widget has no clean "show original" call without its banner; dropping the cookie and
    // reloading always returns the untouched server-rendered page.
    writeCookie("", 0);
    location.reload();
    return;
  }
  writeCookie(`/${SOURCE_LANGUAGE}/${code}`, ONE_YEAR);
  const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (combo) {
    combo.value = code;
    combo.dispatchEvent(new Event("change"));
  } else {
    loadWidget(); // picks the language up from the cookie
  }
}

export function initTranslate() {
  const language = currentLanguage();
  const selects = document.querySelectorAll<HTMLSelectElement>("[data-language-select]");
  selects.forEach((select) => {
    select.value = language;
    select.addEventListener("change", () => {
      if (!isLanguageCode(select.value)) return;
      selects.forEach((other) => (other.value = select.value));
      setLanguage(select.value);
    });
  });
  if (language !== SOURCE_LANGUAGE) loadWidget();
}
