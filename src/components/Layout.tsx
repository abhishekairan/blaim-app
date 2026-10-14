import type { Child } from "hono/jsx";
import { GTM_ID, SITE_URL, abs, jsonLd, page } from "../site";
import { clientAssets } from "../assets";
import { DEFAULT_THEME, THEMES, themeBootstrap } from "../theme";

const gtmEnabled = /^GTM-[A-Z0-9]+$/.test(GTM_ID);

// Consent defaults from the original page: everything denied (no consent banner is shipped).
const consentDefaults = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",wait_for_update:500});`;
const gtmLoader = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f)})(window,document,"script","dataLayer","${GTM_ID}");`;

// Our own static data; "<" is escaped so the JSON can never close the script tag.
const ldJson = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

type LayoutProps = {
  children: Child;
  /** Path of this page, used for canonical/og:url. Defaults to the homepage. */
  path?: string;
  title?: string;
  description?: string;
  /** Keep the page out of search results (e.g. form result pages). */
  noindex?: boolean;
};

export function Layout({ children, path = "/", title, description, noindex }: LayoutProps) {
  const { css, js } = clientAssets();
  const isHome = path === "/";
  const ogTitle = title ?? page.ogTitle;
  const ogDescription = description ?? page.ogDescription;
  return (
    <html lang={page.lang} data-theme={DEFAULT_THEME}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} | BLAIM 2027` : page.title}</title>
        <meta name="description" content={description ?? page.description} />
        <link rel="canonical" href={SITE_URL + path} />
        <meta
          name="robots"
          content={noindex ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"}
        />
        <meta name="theme-color" content={THEMES[DEFAULT_THEME].themeColor} />
        {/* Before any styled content: applies the visitor's saved theme without a flash of the default. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + path} />
        <meta property="og:site_name" content={page.siteName} />
        <meta property="og:locale" content={page.locale} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={abs(page.shareImage.path)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content={String(page.shareImage.width)} />
        <meta property="og:image:height" content={String(page.shareImage.height)} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={abs(page.shareImage.path)} />

        <link rel="icon" href={page.favicon32} sizes="32x32" />
        <link rel="icon" href={page.shareImage.path} sizes="192x192" />
        <link rel="apple-touch-icon" href={page.shareImage.path} />

        {/* LCP: hero poster (homepage only) + header logo */}
        {isHome && <link rel="preload" as="image" href={page.heroPoster} fetchpriority="high" />}
        <link rel="preload" as="image" href={page.logo} />
        <link rel="stylesheet" href={css} />
        <script type="module" src={js}></script>

        {isHome && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson }} />}

        {gtmEnabled && (
          <>
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
            <script dangerouslySetInnerHTML={{ __html: consentDefaults }} />
            <script dangerouslySetInnerHTML={{ __html: gtmLoader }} />
          </>
        )}
      </head>
      <body>
        {gtmEnabled && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style="display: none; visibility: hidden"
            ></iframe>
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
