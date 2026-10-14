// Site-wide SEO configuration and JSON-LD. Facts come from src/data/conference.ts (the brochure).
import { conference } from "./data/conference";

/** Public origin used for canonical/OG/JSON-LD URLs. Set SITE_URL in production. */
export const SITE_URL = (process.env.SITE_URL ?? "").replace(/\/+$/, "");

/** Google Tag Manager container. Analytics are only rendered when this is set. */
export const GTM_ID = process.env.GTM_ID ?? "";

export const abs = (path: string) => SITE_URL + path;

const fullTitle = `${conference.edition} ${conference.title}`;

export const page = {
  title: `${conference.shortName} | ${fullTitle} | Parul University, Vadodara | ${conference.dates.label}`,
  description: `${conference.shortName}, the ${fullTitle}, organised by ${conference.organiser}, Vadodara, ${conference.dates.label}, hybrid mode. Theme: “${conference.tagline}”. Abstracts by 1 November 2026.`,
  ogTitle: `${conference.shortName}: ${conference.title}`,
  ogDescription: `${conference.dates.label} · ${conference.mode} · Parul University, Vadodara. “${conference.tagline}”`,
  siteName: conference.shortName,
  locale: "en_GB",
  lang: "en",
  heroImage: "/assets/brochure/columns-deep-shadow.webp",
  logo: "/assets/brand/logo-white.svg",
  shareImage: { path: "/assets/brand/share.jpg", width: 1200, height: 630 },
  themeColor: "#0c0a08",
};

const organization = {
  "@type": "Organization",
  "@id": abs("/#organization"),
  name: conference.organiserLong,
  alternateName: "SCOPE",
  url: SITE_URL + "/",
  email: conference.contacts.organising,
  parentOrganization: { "@type": "CollegeOrUniversity", name: "Parul University" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "P.O. Limda, Ta. Waghodia",
    addressLocality: conference.venue.city,
    addressRegion: conference.venue.region,
    addressCountry: conference.venue.country,
  },
};

const event = {
  "@type": "Event",
  "@id": abs("/#event"),
  name: `${conference.shortName}: ${fullTitle}`,
  alternateName: conference.shortName,
  description: page.description,
  startDate: conference.dates.start,
  endDate: conference.dates.end,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [
    {
      "@type": "Place",
      name: conference.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "P.O. Limda, Ta. Waghodia",
        addressLocality: conference.venue.city,
        addressRegion: conference.venue.region,
        addressCountry: conference.venue.country,
      },
    },
    { "@type": "VirtualLocation", url: SITE_URL + "/" },
  ],
  image: [abs(page.shareImage.path)],
  organizer: { "@id": abs("/#organization") },
  inLanguage: page.lang,
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": abs("/#website"),
      name: page.siteName,
      url: SITE_URL + "/",
      publisher: { "@id": abs("/#organization") },
      inLanguage: page.lang,
    },
    {
      "@type": "WebPage",
      "@id": abs("/#webpage"),
      name: page.ogTitle,
      description: page.description,
      url: SITE_URL + "/",
      isPartOf: { "@id": abs("/#website") },
      about: { "@id": abs("/#event") },
      primaryImageOfPage: abs(page.shareImage.path),
      inLanguage: page.lang,
    },
    event,
  ],
};
