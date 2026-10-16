// Abstract submission options. Themes and limits follow the BLAIM 2.0 brochure (13 Oct 2026);
// contribution types and presentation modes predate it and are unchanged.
import { themes as conferenceThemes } from "./conference";

export const themes = conferenceThemes.map((t) => t.title);

export const contributionTypes = [
  "Full research paper",
  "Research-in-progress paper",
  "Practice or policy case study",
  "Doctoral / early-career research presentation",
  "Panel proposal",
  "Roundtable proposal",
  "Workshop or applied masterclass",
  "Technology or AI innovation demonstration",
  "Poster or visual research presentation",
];

export const participationModes = ["In person (Parul University, Vadodara)", "Online"];

/** Brochure: "at least 200 words but not exceed 300 words", "a maximum of three authors". */
export const abstractLimits = {
  minWords: Number(process.env.ABSTRACT_MIN_WORDS || 200),
  maxWords: Number(process.env.ABSTRACT_MAX_WORDS || 300),
  maxAuthors: 3,
  titleMaxChars: 200,
  minKeywords: 3,
  maxKeywords: 6,
};
