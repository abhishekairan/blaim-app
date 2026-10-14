// Header menu behaviour (ported from the original inline header scripts).
// State is expressed as data-open attributes, which the Tailwind classes in Header.tsx react to.

export function initHeader() {
  const header = document.getElementById("sbmt-lightweight-header");
  if (!header) return;

  const menuToggle = header.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const mobileQuery = window.matchMedia("(max-width: 1199px)");
  const desktopQuery = window.matchMedia("(min-width: 1200px)");
  const parents = Array.from(header.querySelectorAll<HTMLElement>("[data-has-children]"));
  const clickOpenItems = parents.filter((item) => item.hasAttribute("data-click-open"));

  function setItemOpen(item: Element, open: boolean) {
    item.toggleAttribute("data-open", open);
    item.querySelector(":scope > [data-submenu-toggle]")?.setAttribute("aria-expanded", String(open));
    if (item.hasAttribute("data-click-open")) item.querySelector(":scope > a")?.setAttribute("aria-expanded", String(open));
  }

  const closeSubmenus = () => parents.forEach((item) => setItemOpen(item, false));

  function closeMenu() {
    header!.removeAttribute("data-open");
    document.documentElement.classList.remove("sbmt-lh-menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    closeSubmenus();
  }

  menuToggle?.addEventListener("click", () => {
    const willOpen = !header.hasAttribute("data-open");
    header.toggleAttribute("data-open", willOpen);
    document.documentElement.classList.toggle("sbmt-lh-menu-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
  });

  // Mobile: +/- buttons expand submenus.
  parents.forEach((item) => {
    item.querySelector(":scope > [data-submenu-toggle]")?.addEventListener("click", () => {
      if (mobileQuery.matches) setItemOpen(item, !item.hasAttribute("data-open"));
    });
  });

  // Desktop: mega-menu parents open on click instead of navigating.
  clickOpenItems.forEach((item) => {
    item.querySelector(":scope > a")?.addEventListener("click", (event) => {
      if (!desktopQuery.matches) return;
      event.preventDefault();
      const willOpen = !item.hasAttribute("data-open");
      clickOpenItems.forEach((other) => setItemOpen(other, false));
      if (willOpen) setItemOpen(item, true);
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (mobileQuery.matches && header.hasAttribute("data-open") && !header.contains(target)) closeMenu();
    if (desktopQuery.matches && !target?.closest("[data-click-open]")) {
      clickOpenItems.forEach((item) => setItemOpen(item, false));
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  mobileQuery.addEventListener("change", closeMenu);
  desktopQuery.addEventListener("change", closeSubmenus);
}
