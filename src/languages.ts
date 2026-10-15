// Language registry for the header switcher, shared by the server (Header) and the browser
// (src/client/translate.ts). The site is authored in English; other languages are machine-translated
// in the browser by the Google Translate widget, which is only loaded once a visitor picks one.
// The list covers the countries represented on the committees. Keep this module import-free: it is
// bundled into the client.

/** Keys are Google Translate language codes (Hebrew is still "iw" there). Labels are endonyms. */
export const LANGUAGES = {
  en: { label: "English", short: "EN" },
  hi: { label: "हिन्दी", short: "HI" },
  gu: { label: "ગુજરાતી", short: "GU" },
  ar: { label: "العربية", short: "AR" },
  iw: { label: "עברית", short: "HE" },
  fr: { label: "Français", short: "FR" },
  nl: { label: "Nederlands", short: "NL" },
  de: { label: "Deutsch", short: "DE" },
  sl: { label: "Slovenščina", short: "SL" },
  da: { label: "Dansk", short: "DA" },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

/** The language the pages are written in. */
export const SOURCE_LANGUAGE: LanguageCode = "en";

export const isLanguageCode = (value: unknown): value is LanguageCode =>
  typeof value === "string" && Object.hasOwn(LANGUAGES, value);
