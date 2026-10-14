import { Icon } from "./icons";
import type { GlyphName } from "./icons.data";

// Site footer: four columns, social links, legal row.
// Column widths follow the original Elementor layout: 12/38.85/24.13/25% on desktop,
// two columns at 768-1024px, stacked below 768px.

const column = "flex flex-wrap content-start w-full p-5 gte-768:lte-1024:w-1/2";
const heading = "w-full m-0 text-heading text-[18px] font-extrabold leading-[1.2]";
const listLink = "group/link flex items-center w-full";

const contacts: { icon: GlyphName; label: string; href: string }[] = [
  { icon: "phone-alt", label: "(310) 500-6196", href: "tel:3105006196" },
  { icon: "envelope", label: "Contact Us", href: "/contact-form/" },
];

const aboutLinks: { icon: GlyphName; label: string; href: string }[] = [
  { icon: "question", label: "What Is Brain Mapping", href: "/about/what-is-brain-mapping/" },
  { icon: "question", label: "About", href: "/about/" },
  { icon: "exclamation", label: "Become a Member", href: "/home/about-old/become-a-member/" },
];

const socialIcon =
  "inline-flex items-center justify-center w-[30px] h-[30px] rounded-[10%] text-ink fill-current transition-opacity duration-300 hover:opacity-90";

const social: { label: string; href: string; icon: GlyphName | "x" | "smugmug" }[] = [
  { label: "Facebook", href: "https://www.facebook.com/WorldBrainMapping/", icon: "facebook-square" },
  { label: "X (Twitter)", href: "https://twitter.com/WorldBrainMap", icon: "x" },
  { label: "YouTube", href: "https://www.youtube.com/@brainmappingtv/videos", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/societyforbrainmappingtherapeutics", icon: "linkedin" },
  { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Society_for_Brain_Mapping_and_Therapeutics", icon: "wikipedia-w" },
  { label: "SmugMug", href: "https://brainmappingfoundation.smugmug.com/", icon: "smugmug" },
  { label: "Vimeo", href: "https://vimeo.com/brainmappingfoundation", icon: "vimeo" },
];

function SocialGlyph({ icon }: { icon: (typeof social)[number]["icon"] }) {
  if (icon === "x") {
    return (
      <svg class="block w-[25px] h-[25px]" viewBox="0 0 50 50" aria-hidden="true">
        <path
          fill="currentColor"
          d="M29.78,21.17L48.38,0h-4.41L27.82,18.38L14.92,0H0.04l19.51,27.8L0.04,50h4.41L21.5,30.58L35.12,50H50  M6.04,3.25h6.77l31.16,43.65H37.2"
        />
      </svg>
    );
  }
  if (icon === "smugmug") {
    return (
      <svg class="block w-[25px] h-[25px]" viewBox="0 0 96 96" aria-hidden="true">
        <defs>
          <clipPath id="smugmug-clip">
            <rect x="1" y="1.5" width="94" height="94" />
          </clipPath>
        </defs>
        <g clip-path="url(#smugmug-clip)">
          <path d="M66.9,47.6c-0.7,0-1.4,0-2,0.1c-10.5,0.6-21.1,1.2-31.6,1.7c-5.5,0.3-5.8,0.3-6.3,5.9  c-0.9,8.9,3.7,18.6,16.1,19c2-0.4,4.1-0.6,6-1.3c8.3-2.9,14.1-8.8,18.6-16.1c1-1.7,1.8-3.6,2.4-5.4C70.9,48.7,69.8,47.6,66.9,47.6" />
          <path d="M78.8,48.6c-0.7,4.4-2.7,8.3-5.2,12c-5.7,8.3-12.6,15.1-22,19c-2.8,1.2-5.9,1.6-8.8,2.4c0-0.1-0.1-0.3-0.1-0.4  c-6.2-0.1-11.3-2.5-15.1-7.4c-5.6-7.3-7.5-15.6-5.9-24.6c0.2-1.4,0.9-2.8,1.6-4.1c1-2,2.7-2.8,5-2.9C39.4,42,50.5,41.6,61.7,41  c2.7-0.1,5.4-0.5,8.2-0.8c0.8-0.1,1.6-0.1,2.4-0.1C77.4,40.6,79.6,43.5,78.8,48.6 M32.6,17.4c2.9-2.1,8.3-1.5,10.8,1  c2.3,2.3,2.1,5.8-0.5,8c-1.9,1.6-4.2,2.2-6.7,2.2c-0.8-0.1-1.7-0.1-2.5-0.3c-2.2-0.6-3.8-1.8-4.2-4.2C29.1,21.2,30.3,19,32.6,17.4   M63.1,16.2c3.1-1.6,6.3-1.6,9.2,0.4c3.8,2.5,3.7,7.6-0.4,9.7c-1.8,0.9-3.8,1.2-5.8,1.8c-3.7-0.3-6-1.8-6.7-4.5  C58.7,20.9,60.2,17.7,63.1,16.2 M84.6,1.5H11.4C5.7,1.5,1,6.2,1,11.9v73.1c0,5.8,4.7,10.4,10.4,10.4h73.1c5.8,0,10.4-4.7,10.4-10.4  V11.9C95,6.2,90.3,1.5,84.6,1.5" />
        </g>
      </svg>
    );
  }
  return (
    <span class="flex justify-center w-[25px] h-[25px]">
      <Icon name={icon} class="block h-[25px]" />
    </span>
  );
}

export function Footer() {
  return (
    <footer class="bg-stone pt-[50px] pb-[10px] text-ink">
      <div class="max-w-[1440px] mx-auto lte-1024:max-w-[1024px] lte-767:max-w-[767px]">
        <div class="flex flex-wrap">
          {/* Brand */}
          <div class={`${column} gte-768:w-[12%]`}>
            <div class="w-full h-[106px] mb-5" aria-hidden="true"></div>
            <a href="/" class="block w-full text-center" aria-label="BLAIM 2027 home">
              <img
                class="block w-full max-w-[201px] h-auto mx-auto"
                src="/assets/brand/logo.svg"
                width="2966"
                height="1000"
                alt="BLAIM 2027"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>

          {/* Headquarters */}
          <div class={`${column} gte-768:w-[38.853%]`}>
            <h3 class={heading}>Headquarters</h3>
            <div class="w-full mb-5 text-[18px] leading-[1.5] lte-1366:text-[16px]">
              2080 Century Park East, Suite 500, Los Angeles, CA, 90067
            </div>
            <ul class="w-full mb-5 p-0 list-none">
              {contacts.map((item) => (
                <li class="flex items-center">
                  <a href={item.href} class={`${listLink} text-[18px] lte-1366:text-[16px]`}>
                    <span class="flex w-[22.5px]">
                      <Icon name={item.icon} class="block h-[18px] text-ink transition-colors duration-300 group-hover/link:text-pine" />
                    </span>
                    <span class="pl-[5px] text-ink transition-colors duration-300 group-hover/link:text-pine">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div class="w-full text-[18px] lte-1366:text-[16px] lte-1024:text-[15px] lte-767:text-center">
              <p>
                The Society for Brain Mapping and Therapeutics (SBMT) was founded in 2004 to
                break boundaries in healthcare. The society promotes policies that support rapid,
                safe, and cost-effective translation of new technology into medicine.
              </p>
            </div>
          </div>

          {/* About */}
          <div class={`${column} gte-768:w-[24.126%]`}>
            <h3 class={heading}>
              <a href="/about/" class="text-inherit">
                About SBMT
              </a>
            </h3>
            <ul class="w-full p-0 list-none">
              {aboutLinks.map((item) => (
                <li class="flex items-center not-last:pb-[2.5px] not-first:mt-[2.5px]">
                  <a href={item.href} class={`${listLink} font-bold`}>
                    <span class="flex w-[21.25px]">
                      <Icon name={item.icon} class="block h-[17px] text-gold transition-colors duration-300 group-hover/link:text-pine" />
                    </span>
                    <span class="pl-[5px] text-ink transition-colors duration-300 group-hover/link:text-link-hover">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App */}
          <div class={`${column} gte-768:w-1/4`}>
            <img
              class="block w-[46%] h-auto mx-auto mb-5"
              src="/assets/uploads/2024/06/SBMT-App-Logo-1-1-1-1024x995.png"
              width="1024"
              height="995"
              alt="World Brain Mapping app"
              loading="lazy"
              decoding="async"
            />
            <a href="https://apps.apple.com/us/app/world-brain-mapping/id6503728837" class="group/badge block w-full mb-5">
              <img
                class="block w-[65%] h-auto mx-auto transition-opacity group-hover/badge:opacity-70"
                src="/assets/uploads/2024/06/Apple-Download-App-1-1-1-1-1-2048x643.png"
                width="2048"
                height="643"
                alt="Download on the App Store"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.eventify.brainmapping" class="group/badge block w-full">
              <img
                class="block w-[65%] h-auto mx-auto transition-opacity group-hover/badge:opacity-70"
                src="/assets/uploads/2024/06/Google-Download-App-1-1-1-1-2048x642.png"
                width="2048"
                height="642"
                alt="Get it on Google Play"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>

        {/* Social */}
        <div class="pt-[30px] px-5">
          <ul class="flex flex-wrap justify-center gap-[7px] m-0 p-0 list-none">
            {social.map((item) => (
              <li>
                <a class={socialIcon} href={item.href} target="_blank" rel="noopener" aria-label={item.label}>
                  <SocialGlyph icon={item.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div class="flex flex-wrap items-center">
          <div class="w-full p-5 gte-768:w-1/4 gte-768:lte-1024:w-[33%] lte-767:pt-5 lte-767:pb-0">
            <ul class="flex flex-wrap justify-end -mx-2 my-0 p-0 list-none lte-767:justify-center">
              <li class="flex items-center mx-2 not-last:after:content-[''] not-last:after:relative not-last:after:-right-2 not-last:after:h-[15px] not-last:after:border-l not-last:after:border-ink">
                <a href="/sitemap_index.xml" class="text-ink text-[12px] font-bold hover:text-pine">
                  Sitemap
                </a>
              </li>
              <li class="flex items-center mx-2">
                <a href="/privacy-policy/" class="text-ink text-[12px] font-bold hover:text-pine">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div class="w-full p-5 gte-768:w-3/4 gte-768:lte-1024:w-[67%]">
            <div class="text-faint text-[12px] font-bold leading-none lte-767:text-center">
              Copyright © 2026 Society for Brain Mapping and Therapeutics (SBMT). All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
