// Site-wide SEO configuration. Values mirror the original homepage <head>.

/** Public origin used for canonical/OG/JSON-LD URLs. Set SITE_URL in production. */
export const SITE_URL = (process.env.SITE_URL ?? "").replace(/\/+$/, "");

/** Google Tag Manager container. Analytics are only rendered when this is set. */
export const GTM_ID = process.env.GTM_ID ?? "";

export const abs = (path: string) => SITE_URL + path;

export const page = {
  title:
    "BLAIM 2027 - 2nd International Conference on Mindfulness, Behavioural Science & Legal Innovation | Parul University, Vadodara | 27-29 January 2027",
  description:
    "BLAIM 2027, hosted by Parul University, Vadodara, brings together scholars, practitioners, policymakers, researchers and changemakers to examine the intersections of mindfulness, behavioural science, legal innovation, social justice and emerging technologies. Hybrid, 27-29 January 2027.",
  ogTitle: "BLAIM 2027 - 2nd International Conference on Mindfulness, Behavioural Science & Legal Innovation",
  ogDescription:
    "Parul University, Vadodara | 27-29 January 2027 | Hybrid. Mindful minds. Smarter systems. Just futures.",
  siteName: "Society for Brain Mapping and Therapeutics",
  locale: "en_US",
  lang: "en-US",
  heroPoster: "/assets/uploads/2025/08/web-1-sbmt.webp",
  logo: "/assets/brand/logo-white.svg",
  shareImage: {
    path: "/assets/uploads/2023/01/SBMT-App-Logo-1-1-1-1024x995-1.png",
    width: 1024,
    height: 995,
  },
  favicon32: "/assets/uploads/2023/01/SBMT-App-Logo-1-1-1-1024x995-1-150x150.png",
};

const organization = {
  "@type": "Organization",
  "@id": abs("/#organization"),
  name: "Society for Brain Mapping and Therapeutics",
  alternateName: "SBMT",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: abs("/assets/uploads/2025/07/cropped-Brainmapping-Logo-nuevo-270x270.png"),
    width: 270,
    height: 270,
  },
  description:
    "The Society for Brain Mapping and Therapeutics (SBMT) connects global leaders in brain mapping, neurotechnology, and therapeutics to advance brain health worldwide.",
  foundingDate: "2004",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2080 Century Park East, Suite 500",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    postalCode: "90067",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.facebook.com/BrainMapping/",
    "https://twitter.com/WorldBrainMap",
    "https://www.linkedin.com/company/society-for-brain-mapping-and-therapeutics/",
    "https://www.instagram.com/worldbrainmapping/",
    "https://www.youtube.com/@worldbrainmapping",
  ],
};

// Event facts are taken from the page copy (dates, venue, hybrid format).
const event = {
  "@type": "Event",
  "@id": abs("/#blaim-2027"),
  name: page.ogTitle,
  alternateName: "BLAIM 2027",
  description: page.description,
  startDate: "2027-01-27",
  endDate: "2027-01-29",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [
    {
      "@type": "Place",
      name: "Parul University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vadodara",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    { "@type": "VirtualLocation", url: SITE_URL + "/" },
  ],
  image: [abs(page.heroPoster)],
  organizer: { "@type": "CollegeOrUniversity", name: "Parul University" },
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
      url: SITE_URL,
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
      about: { "@id": abs("/#blaim-2027") },
      primaryImageOfPage: abs(page.heroPoster),
      inLanguage: page.lang,
    },
    event,
  ],
};
