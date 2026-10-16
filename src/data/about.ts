// The /about/ pages: one per institution behind the conference. Used by the server routes
// (src/index.tsx) and the page templates (src/pages/About.tsx). The nav labels live in menu.ts.

export const ABOUT_PAGES = {
  parul: {
    path: "/about/parul-university/",
    title: "About Parul University",
    description:
      "Parul University, Vadodara: NAAC A++ accredited, UGC Category 1, 70,500+ students from 75+ countries. Host institution of BLAIM 2.0, 27–30 January 2027.",
  },
  scope: {
    path: "/about/scope/",
    title: "About SCOPE",
    description:
      "SCOPE (Scientific Communication, Outreach & Public Engagement) at Parul University, organiser of BLAIM 2.0: five pillars, its labs and centres, and its alignment with the UN SDGs.",
  },
  cebpsi: {
    path: "/about/cebpsi/",
    title: "About CEBPSI",
    description:
      "The Centre for Evidence-Based Policing and Social Innovation (CEBPSI) at Parul University, developed with the Vadodara Police Commissionerate.",
  },
  blaim: {
    path: "/about/blaim/",
    title: "About BLAIM 2.0",
    description:
      "BLAIM 2.0, the 2nd International Multi-Disciplinary Conference on Mindfulness, Behavioural Science & Legal Innovation: aim, rationale, themes and key dates.",
  },
} as const;

export type AboutKey = keyof typeof ABOUT_PAGES;

/** Menu and cross-link order. */
export const ABOUT_ORDER: AboutKey[] = ["parul", "scope", "cebpsi", "blaim"];
