// Country of a person, read from the end of their affiliation as written in the brochure
// ("…, Gujarat, India", "…, University of Oxford, UK"). Flags are the flag-icons SVGs (MIT, see
// public/assets/flags/LICENSE). Adding a country: add a pattern here and its <code>.svg there.

export type Country = { code: string; name: string };

const COUNTRIES: [RegExp, Country][] = [
  [/\b(India|Gujarat)$/, { code: "in", name: "India" }],
  [/\bUAE$/, { code: "ae", name: "United Arab Emirates" }],
  [/\bCanada$/, { code: "ca", name: "Canada" }],
  [/\bEngland$/, { code: "gb-eng", name: "England" }],
  [/\bUK$/, { code: "gb", name: "United Kingdom" }],
  [/\bUSA$/, { code: "us", name: "United States" }],
  [/\bSlovenia$/, { code: "si", name: "Slovenia" }],
  [/\bBelgium$/, { code: "be", name: "Belgium" }],
  [/\bIsrael$/, { code: "il", name: "Israel" }],
  [/\bAustralia$/, { code: "au", name: "Australia" }],
  [/\bIreland$/, { code: "ie", name: "Ireland" }],
  [/\bSouth Africa$/, { code: "za", name: "South Africa" }],
  [/\bDenmark$/, { code: "dk", name: "Denmark" }],
];

function match(text: string | undefined) {
  const tail = text?.trim().replace(/\.$/, "");
  return tail ? COUNTRIES.find(([pattern]) => pattern.test(tail))?.[1] : undefined;
}

/** The affiliation is checked first; a few people only carry their country in the role line. */
export const countryOf = (person: { org?: string; role?: string }) => match(person.org) ?? match(person.role);
