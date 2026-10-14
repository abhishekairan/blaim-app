// CTA click classification -> dataLayer "cta_click" events, ported from the original
// inline "wbmf-cta-intelligence" script. Only useful when GTM is enabled (GTM_ID).

type Classification = { cta_type: string; cta_stage: string; destination_type: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const pageContext = {
  organization: "ecosystem",
  program: "general",
  page_group: "homepage",
  page_type: "homepage",
};

const cleanText = (value: string) => (value || "").replace(/\s+/g, " ").trim().slice(0, 120);

function getLocation(el: Element) {
  if (el.closest('header, nav, .elementor-location-header, [data-elementor-type="header"], [role="navigation"]')) {
    return "header";
  }
  if (el.closest('footer, .elementor-location-footer, [data-elementor-type="footer"]')) return "footer";
  return "content";
}

function classifyCTA(href: string, text: string): Classification | null {
  const lowerHref = (href || "").toLowerCase();
  const lowerText = (text || "").toLowerCase();
  let host = "";
  let path = "";
  try {
    const u = new URL(href, window.location.href);
    host = u.hostname.toLowerCase().replace(/^www\./, "");
    path = u.pathname.toLowerCase();
  } catch {}

  if (lowerHref.startsWith("mailto:")) return { cta_type: "contact", cta_stage: "email_click", destination_type: "email" };
  if (lowerHref.startsWith("tel:")) return { cta_type: "contact", cta_stage: "phone_click", destination_type: "phone" };
  if (host === "donate.stripe.com") return { cta_type: "donation", cta_stage: "donation_start", destination_type: "stripe" };

  if (host.includes("eventify.io")) {
    return path.includes("/proposal/")
      ? { cta_type: "abstract", cta_stage: "submission_start", destination_type: "eventify" }
      : { cta_type: "registration", cta_stage: "registration_start", destination_type: "eventify" };
  }

  if (host === "docs.google.com" && path.includes("/forms")) {
    if (lowerText.includes("speaker") || lowerText.includes("topic")) {
      return { cta_type: "speaker", cta_stage: "speaker_interest_start", destination_type: "google_form" };
    }
    if (lowerText.includes("sponsor") || lowerText.includes("exhibit")) {
      return { cta_type: "sponsorship", cta_stage: "inquiry_start", destination_type: "google_form" };
    }
    return { cta_type: "form", cta_stage: "form_start", destination_type: "google_form" };
  }

  const internal = host === "worldbrainmapping.org";
  if (internal && path.startsWith("/register/")) {
    return { cta_type: "membership", cta_stage: "membership_checkout_start", destination_type: "memberpress" };
  }

  if (path.endsWith(".pdf") || lowerHref.includes(".pdf")) {
    if (lowerText.includes("prospectus") || lowerText.includes("sponsor") || lowerHref.includes("prospectus")) {
      return { cta_type: "sponsorship", cta_stage: "prospectus_download", destination_type: "pdf" };
    }
    return { cta_type: "download", cta_stage: "file_download", destination_type: "pdf" };
  }

  if (internal && path.includes("sbmt-event-sponsorship-packages")) {
    return { cta_type: "sponsorship", cta_stage: "sponsorship_view", destination_type: "internal" };
  }
  if (
    internal &&
    (path.includes("/become-a-member") || path.includes("/membership-services") || path.includes("/membership-spaces"))
  ) {
    return { cta_type: "membership", cta_stage: "membership_info_view", destination_type: "internal" };
  }
  if (internal && path.includes("speaker-benefits")) {
    return { cta_type: "speaker", cta_stage: "speaker_info_view", destination_type: "internal" };
  }
  if (internal && path.includes("24th-annual-neurotech-event-registration")) {
    return { cta_type: "registration", cta_stage: "registration_info_view", destination_type: "internal" };
  }

  if (lowerText.includes("donate") || lowerText.includes("make a gift") || lowerText.includes("give to wbmf")) {
    return { cta_type: "donation", cta_stage: "donation_start", destination_type: host || "unknown" };
  }
  if (lowerText.includes("sponsor") || lowerText.includes("sponsorship")) {
    return { cta_type: "sponsorship", cta_stage: "sponsorship_interest", destination_type: host || "unknown" };
  }
  return null;
}

export function initCtaTracking() {
  document.addEventListener(
    "click",
    (event) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>(
        'a,button,input[type="submit"],input[type="button"]',
      );
      if (!el) return;

      const location = getLocation(el);
      const href = el.getAttribute("href") || el.getAttribute("formaction") || "";
      const text = cleanText(el.innerText || (el as HTMLInputElement).value || el.getAttribute("aria-label") || "");
      const classification = classifyCTA(href, text);
      if (!classification) return; // ordinary navigation

      // Never send an email address or phone number into the measurement layer.
      const isContact = classification.destination_type === "email" || classification.destination_type === "phone";

      // Strip query strings/fragments from the destination to avoid accidental identifiers.
      let destination = "";
      if (!isContact) {
        try {
          const u = new URL(href, window.location.href);
          destination =
            u.hostname.replace(/^www\./, "").toLowerCase() === "worldbrainmapping.org" ? u.pathname : u.origin + u.pathname;
        } catch {}
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cta_click",
        ...pageContext,
        ...classification,
        cta_scope: location === "header" || location === "footer" ? "sitewide" : "page_specific",
        cta_location: location,
        cta_text: isContact ? "" : text,
        destination_path: destination,
      });
    },
    true,
  );
}
