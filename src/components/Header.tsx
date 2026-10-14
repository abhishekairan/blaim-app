import { menu, type MenuItem } from "../data/menu";
import { DEFAULT_THEME, THEMES } from "../theme";

// Sticky site header. Desktop (>=1200px): inline menu with hover/click dropdowns.
// Mobile (<=1199px): "Menu" button opens a panel; submenus expand with the +/- buttons.
// Open state is a data-open attribute set by src/client/header.ts.

const MEGA_COLUMNS: Record<string, string> = {
  initiatives: "grid-cols-4",
  events: "grid-cols-3",
};

const topLink =
  "inline-flex items-center min-h-[42px] py-2 px-[clamp(7px,0.7vw,12px)] rounded-full text-white text-[clamp(12px,0.85vw,14px)] font-[720] leading-[1.15] whitespace-nowrap " +
  "transition-[color,background-color,transform] duration-160 ease-[ease] hover:text-white hover:bg-white/14 focus-visible:text-white focus-visible:bg-white/14 focus-visible:outline-none " +
  "lte-1370:px-[7px] lte-1370:text-[12px] " +
  "lte-1199:min-h-[50px] lte-1199:py-3 lte-1199:rounded-lg lte-1199:text-[14px] lte-1199:whitespace-normal lte-1199:text-ink lte-1199:hover:text-jade lte-1199:hover:bg-stone lte-1199:focus-visible:text-jade lte-1199:focus-visible:bg-stone";

const chevron =
  "after:content-[''] after:w-[7px] after:h-[7px] after:-mt-1 after:ml-2 after:border-r-[1.5px] after:border-b-[1.5px] after:border-current after:rotate-45 lte-1199:after:hidden";

// Position, width and columns are set by either `dropdown` or `megaPosition`, never both:
// two utilities for the same property resolve by Tailwind's sort order, not class order.
const subMenuBase =
  "absolute top-full z-100 grid invisible gap-[10px] max-h-[min(72vh,720px)] p-[18px] overflow-auto " +
  "bg-white border border-mist rounded-[18px] shadow-[0_18px_42px_rgb(var(--rgb-pine)/0.16)] opacity-0 translate-y-2 pointer-events-none transition-[opacity,transform,visibility] duration-150 ease-[ease] " +
  "group-hover/item:visible group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto " +
  "group-focus-within/item:visible group-focus-within/item:opacity-100 group-focus-within/item:translate-y-0 group-focus-within/item:pointer-events-auto " +
  "gte-1200:group-data-open/item:visible gte-1200:group-data-open/item:opacity-100 gte-1200:group-data-open/item:translate-y-0 gte-1200:group-data-open/item:pointer-events-auto " +
  "lte-1199:static lte-1199:hidden lte-1199:visible lte-1199:col-span-full lte-1199:grid-cols-1 lte-1199:w-full lte-1199:max-h-none lte-1199:pt-2 lte-1199:px-2 lte-1199:pb-[14px] lte-1199:overflow-visible " +
  "lte-1199:border-0 lte-1199:rounded-none lte-1199:shadow-none lte-1199:opacity-100 lte-1199:translate-y-0 lte-1199:pointer-events-auto lte-1199:group-data-open/item:grid";

const dropdown = "left-0 w-[min(380px,calc(100vw-32px))] grid-cols-[minmax(250px,1fr)]";
const megaPosition = "right-[clamp(18px,3vw,48px)] left-[clamp(18px,3vw,48px)] w-auto gte-1200:top-[calc(100%-24px)]";

const subLinkHover =
  "hover:text-pine hover:bg-white hover:outline-2 hover:outline-solid hover:outline-jade/18 focus-visible:text-pine focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-jade/18";

function SubMenu({ item, id }: { item: MenuItem; id: string }) {
  const mega = item.key ? MEGA_COLUMNS[item.key] : undefined;
  return (
    <ul
      id={id}
      data-submenu
      class={`m-0 list-none ${subMenuBase} ${mega ? `${megaPosition} ${mega}` : dropdown}`}
    >
      {item.children!.map((col) => (
        <li class="min-w-0 p-[11px] bg-stone border border-mist rounded-xl">
          <a href={col.href} class={`block text-ink text-[13px] font-extrabold leading-[1.3] ${subLinkHover}`}>
            {col.label}
          </a>
          {col.children && (
            <ul class="block mx-0 mb-0 mt-[9px] pt-[9px] px-0 pb-0 list-none border-t border-mist">
              {col.children.map((link) => (
                <li class="not-first:mt-[2px]">
                  <a
                    href={link.href}
                    class={`block py-[7px] px-2 rounded-[7px] text-jade text-[12.5px] font-[560] leading-[1.35] ${subLinkHover}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function TopItem({ item, index }: { item: MenuItem; index: number }) {
  const hasChildren = !!item.children?.length;
  const isMega = !!(item.key && MEGA_COLUMNS[item.key]);
  const isPortal = item.key === "abstract-submission";
  const submenuId = `sbmt-lh-submenu-${index}`;
  return (
    <li
      class={`group/item flex items-center min-h-12 lte-1199:relative lte-1199:grid lte-1199:grid-cols-[minmax(0,1fr)_46px] lte-1199:min-h-0 lte-1199:border-b lte-1199:border-mist ${isMega ? "static" : "relative"}`}
      data-has-children={hasChildren ? "" : undefined}
      data-click-open={isMega ? "" : undefined}
    >
      <a
        href={item.href}
        class={`${topLink} ${hasChildren ? chevron : ""} gte-1200:group-data-open/item:text-white gte-1200:group-data-open/item:bg-white/14 ${isPortal ? "border border-white/58 lte-1199:my-[6px] lte-1199:px-[14px] lte-1199:border-jade/32" : "lte-1199:px-[10px]"}`}
        aria-haspopup={isMega ? "true" : undefined}
        aria-expanded={isMega ? "false" : undefined}
      >
        {item.label}
      </a>
      {hasChildren && (
        <>
          <button
            type="button"
            data-submenu-toggle
            class="hidden p-0 lte-1199:relative lte-1199:block lte-1199:w-[38px] lte-1199:h-[38px] lte-1199:my-[6px] lte-1199:mx-1 lte-1199:text-ink lte-1199:bg-mist lte-1199:rounded-[9px] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-3 before:h-[2px] before:bg-current before:rounded-[2px] before:-translate-1/2 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-3 after:h-[2px] after:bg-current after:rounded-[2px] after:-translate-1/2 after:rotate-90 after:transition-transform after:duration-150 aria-expanded:after:rotate-0"
            aria-expanded="false"
            aria-controls={submenuId}
            aria-label={`Toggle ${item.label} submenu`}
          ></button>
          <SubMenu item={item} id={submenuId} />
        </>
      )}
    </li>
  );
}

export function Header() {
  return (
    <header
      id="sbmt-lightweight-header"
      class="group/lh sticky top-0 z-[99990] w-full text-white bg-pine border-b border-white/16 shadow-[0_8px_26px_rgb(var(--rgb-pine)/0.2)] motion-reduce:**:duration-[0.01ms]"
      role="banner"
    >
      <div class="relative flex items-center gap-[clamp(16px,2vw,34px)] w-[min(100%,1560px)] min-h-[94px] mx-auto py-[10px] px-[clamp(18px,3vw,48px)] lte-1370:gap-3 lte-1370:px-[18px] lte-1199:justify-between lte-1199:min-h-[78px]">
        <a class="inline-flex flex-none items-center text-white" href="/" rel="home">
          <img
            class="block h-[52px] w-auto object-contain lte-1370:h-12 lte-1199:h-11"
            src="/assets/brand/logo-white.svg"
            width="2966"
            height="1000"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            alt="BLAIM 2027"
          />
        </a>

        <button
          class="hidden items-center gap-[10px] py-[10px] px-[13px] text-pine bg-white rounded-[10px] text-[length:inherit] leading-[inherit] whitespace-nowrap lte-1199:inline-flex lte-1199:ml-auto"
          type="button"
          data-menu-toggle
          aria-expanded="false"
          aria-controls="sbmt-lightweight-navigation"
        >
          <span class="text-[13px] font-[750]">Menu</span>
          <span class="grid gap-1 w-[18px]" aria-hidden="true">
            <span class="block w-full h-[2px] bg-current rounded-[2px] transition-[transform,opacity] duration-160 ease-[ease] group-data-open/lh:translate-y-[6px] group-data-open/lh:rotate-45"></span>
            <span class="block w-full h-[2px] bg-current rounded-[2px] transition-[transform,opacity] duration-160 ease-[ease] group-data-open/lh:opacity-0"></span>
            <span class="block w-full h-[2px] bg-current rounded-[2px] transition-[transform,opacity] duration-160 ease-[ease] group-data-open/lh:-translate-y-[6px] group-data-open/lh:-rotate-45"></span>
          </span>
        </button>

        <nav
          id="sbmt-lightweight-navigation"
          data-nav
          class="flex flex-auto justify-end min-w-0 lte-1199:absolute lte-1199:top-full lte-1199:inset-x-0 lte-1199:hidden lte-1199:max-h-[calc(100vh-78px)] lte-1199:pt-3 lte-1199:px-4 lte-1199:pb-6 lte-1199:overflow-y-auto lte-1199:bg-white lte-1199:border-t lte-1199:border-mist lte-1199:shadow-[0_18px_42px_rgb(var(--rgb-pine)/0.16)] lte-1199:group-data-open/lh:block"
          aria-label="Primary navigation"
        >
          <ul class="flex items-center justify-end gap-[clamp(4px,0.55vw,10px)] w-full m-0 p-0 list-none lte-1370:gap-[2px] lte-1199:block">
            {menu.map((item, index) => (
              <TopItem item={item} index={index} />
            ))}
          </ul>
        </nav>

        {/* Label and aria-label are kept in sync with the active theme by src/client/theme.ts. */}
        <button
          type="button"
          data-theme-toggle
          class="inline-flex flex-none items-center gap-2 min-h-[42px] py-2 px-[14px] text-white text-[12px] font-[750] leading-none tracking-[0.08em] uppercase whitespace-nowrap border border-white/40 rounded-full transition-[background-color] duration-160 ease-[ease] hover:bg-white/14 focus-visible:bg-white/14 focus-visible:outline-none"
          aria-label={`Switch theme (current: ${THEMES[DEFAULT_THEME].label})`}
        >
          <span class="block w-[9px] h-[9px] rounded-full bg-gold shadow-[0_0_10px_var(--color-gold)]" aria-hidden="true"></span>
          <span data-theme-label>{THEMES[DEFAULT_THEME].label}</span>
        </button>
      </div>
    </header>
  );
}
