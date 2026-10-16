// Primary navigation: anchors into the homepage sections, plus the abstract form as the call to action.

export type MenuItem = { label: string; href: string; children?: MenuItem[] };

export const menu: MenuItem[] = [
  {
    label: "About",
    href: "/#about",
    children: [
      { label: "About Parul University", href: "/about/parul-university/" },
      { label: "About SCOPE", href: "/about/scope/" },
      { label: "About CEBPSI", href: "/about/cebpsi/" },
      { label: "About BLAIM", href: "/about/blaim/" },
    ],
  },
  { label: "Themes", href: "/#themes" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Committees", href: "/committees/" },
  { label: "Pre-conference", href: "/pre-conference/" },
  { label: "Schedule", href: "/schedule/" },
  { label: "Venue", href: "/#venue" },
];

export const cta: MenuItem = { label: "Submit abstract", href: "/abstract-submission/" };
