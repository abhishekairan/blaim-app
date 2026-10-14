// Progressive enhancement for the Rotunda theme: header state, mobile menu and scroll reveals.
// Everything renders and reads fine without this file; it only adds motion and the menu toggle.

export function initUi() {
  document.documentElement.classList.add("js");

  // Header: transparent over the hero, solid once the page scrolls.
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (header) {
    const update = () => header.toggleAttribute("data-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });

    const toggle = header.querySelector<HTMLButtonElement>("[data-menu-toggle]");
    const close = () => {
      header.removeAttribute("data-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("overflow-hidden");
    };
    toggle?.addEventListener("click", () => {
      const open = !header.hasAttribute("data-open");
      header.toggleAttribute("data-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.documentElement.classList.toggle("overflow-hidden", open);
    });
    header.querySelectorAll("[data-nav] a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
    window.matchMedia("(min-width: 1024px)").addEventListener("change", close);
  }

  // Scroll reveals (see .reveal in app.css). Siblings stagger by their index within a parent.
  const targets = document.querySelectorAll<HTMLElement>(".reveal");
  if (!targets.length || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const siblings = Array.from(el.parentElement?.children ?? []).filter((c) => c.classList.contains("reveal"));
        const index = Math.max(0, siblings.indexOf(el));
        el.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 70}ms`);
        el.classList.add("is-in");
        observer.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  targets.forEach((el) => observer.observe(el));
}
