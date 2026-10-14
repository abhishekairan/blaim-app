// One-off converter: WordPress/Elementor index.html -> Hono JSX components + purged CSS + local assets.
// Reads SRC (never modified). Writes only inside OUT.
import fs from "node:fs";
import path from "node:path";
import { parse } from "parse5";
import { PurgeCSS } from "purgecss";

const SRC_DIR = process.argv[2];
const OUT = process.argv[3];
const DRY = process.argv.includes("--dry");
if (!SRC_DIR || !OUT) throw new Error("usage: node convert.mjs <srcSiteDir> <outAppDir> [--dry]");

const ORIGIN = "";
const html = fs.readFileSync(path.join(SRC_DIR, "index.html"), "utf8");
const doc = parse(html);

const log = (...a) => console.log(...a);
const written = [];
function writeOut(rel, content) {
  const p = path.join(OUT, rel);
  written.push(rel);
  if (DRY) return;
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
}

// ---------- tree helpers ----------
const isEl = (n) => n && n.tagName !== undefined;
const attr = (n, name) => n.attrs?.find((a) => a.name === name)?.value;
const hasClass = (n, c) => (attr(n, "class") || "").split(/\s+/).includes(c);
function walk(n, fn) {
  fn(n);
  (n.childNodes || []).forEach((c) => walk(c, fn));
  if (n.content) walk(n.content, fn);
}
function find(n, pred) {
  let r = null;
  walk(n, (x) => {
    if (!r && isEl(x) && pred(x)) r = x;
  });
  return r;
}
function textOf(n) {
  let s = "";
  walk(n, (x) => {
    if (x.nodeName === "#text") s += x.value;
  });
  return s;
}
const htmlEl = doc.childNodes.find((n) => n.tagName === "html");
const head = htmlEl.childNodes.find((n) => n.tagName === "head");
const body = htmlEl.childNodes.find((n) => n.tagName === "body");

// ---------- asset handling ----------
const assetMap = new Map(); // public rel path -> source descriptor
function localCandidates(urlPath, query) {
  const base = path.join(SRC_DIR, decodeURIComponent(urlPath));
  const c = [base];
  if (query) c.push(base + "@" + query + path.extname(urlPath));
  c.push(base + ".html");
  return c;
}
/** Map a site URL (absolute or root-relative) to a local public path, registering it for copy/download. */
function mapAsset(u) {
  let url;
  try {
    url = new URL(u, ORIGIN + "/");
  } catch {
    return u;
  }
  if (url.hostname !== "www.worldbrainmapping.org") return u;
  if (!url.pathname.startsWith("/wp-content/") && !url.pathname.startsWith("/wp-includes/")) return u;
  const rel = url.pathname.replace(/^\/wp-content\//, "").replace(/^\/wp-includes\//, "wp-includes/");
  const pub = "/assets/" + rel;
  if (!assetMap.has(pub)) {
    assetMap.set(pub, { url: url.origin + url.pathname, candidates: localCandidates(url.pathname, url.search.slice(1)) });
  }
  return pub + url.hash.replace(/^#t=0$/, "#t=0");
}

// ---------- CSS collection (document order) ----------
const CSS_SKIP = [
  /memberpress/, /better-payment/, /toastr/, /weekly-class/, /embedpress/, /metform/, /admin-bar/,
  /mouse-cursor/, /pro-form-reset-button/, /particles/, /simple-tags/, /sticky-header-effects/,
  /header-search/, /header-offcanvas/, /header-info/, /widget-mega-menu/, /widget-nav-menu/,
  /elementskit-lite\/widgets\/init\/assets\/css\/nav-menu/, /post-22036\.css/, /post-14857\.css/,
  /post-979\.css/, /post-7991\.css/, /wpr-link-animations/, /text-animations/,
];
const INLINE_SKIP_IDS = [
  /^bp-/, /^memberpress-/, /^wcs-timetable/, /^wcs_styles/, /^wpr_lightbox/,
];
const cssChunks = []; // {label, text, baseUrl, localFile}
function readLocalCss(href) {
  const url = new URL(href, ORIGIN + "/");
  for (const c of localCandidates(url.pathname, url.search.slice(1))) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return { text: fs.readFileSync(c, "utf8"), file: c, url };
  }
  return { text: null, file: null, url };
}
const pendingDownloads = [];
function addLink(n) {
  const href = attr(n, "href");
  if (!href || CSS_SKIP.some((r) => r.test(href))) return;
  if (href === "style.css") {
    cssChunks.push({ label: "theme style.css", text: fs.readFileSync(path.join(SRC_DIR, "style.css"), "utf8"), baseUrl: ORIGIN + "/style.css" });
    return;
  }
  const r = readLocalCss(href);
  const chunk = { label: href.replace(ORIGIN, ""), text: r.text, baseUrl: r.url.href, localFile: r.file, media: attr(n, "media") };
  if (r.text === null) pendingDownloads.push(chunk);
  cssChunks.push(chunk);
}
function addInlineStyle(n, label) {
  const id = attr(n, "id") || "";
  if (INLINE_SKIP_IDS.some((r) => r.test(id))) return;
  const t = textOf(n);
  if (/\.e-con\.e-parent:nth-of-type\(n \+ 4\):not\(\.e-lazyloaded\)/.test(t)) return; // Elementor bg lazyload (JS removed)
  if (/\.mpcs-classroom/.test(t)) return; // MemberPress classroom colours
  if (!t.trim()) return;
  cssChunks.push({ label: label || "inline " + id, text: t, baseUrl: ORIGIN + "/" });
}
for (const n of head.childNodes) {
  if (!isEl(n)) continue;
  if (n.tagName === "link" && attr(n, "rel") === "stylesheet") addLink(n);
  if (n.tagName === "style") addInlineStyle(n);
}

// ---------- body pruning ----------
const DROP_ATTRS = new Set([
  "data-settings", "data-element_type", "data-e-type", "data-widget_type", "data-id",
  "data-interaction-id", "data-interactions", "data-elementor-post-type",
]); // data-elementor-id stays: Elementor CSS selects on [data-elementor-id]
const BODY_CLASS_DROP = new Set(["admin-bar", "no-customize-support"]);

const GLOBAL_URL = ORIGIN + "/global-physicians-and-scientists/";
const HELP_IMPACT_URL = ORIGIN + "/wbmf-world-brain-mapping-foundation/";
const SPEAKER_URL = ORIGIN + "/events/24th-annual-neurotech-event-registration/speaker-benefits-sbmt-2027/";
const norm = (t) => (t || "").replace(/\s+/g, " ").trim().toLowerCase();

// Collect body <style>/<link> in document order as CSS, then strip from markup.
function harvestBodyCss(n) {
  walk(n, (x) => {
    if (!isEl(x)) return;
    if (x.tagName === "style" && x.namespaceURI === "http://www.w3.org/1999/xhtml") addInlineStyle(x, "section css");
    if (x.tagName === "link" && attr(x, "rel") === "stylesheet") addLink(x);
  });
}

// ---------- JSX emitter ----------
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const BLOCK = new Set([
  "div", "section", "article", "aside", "ul", "ol", "li", "p", "h1", "h2", "h3", "h4", "h5", "h6", "header", "footer",
  "nav", "main", "style", "script", "video", "source", "figure", "form", "table", "tr", "td", "th", "tbody", "thead",
]);
const escText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/{/g, "&#123;").replace(/}/g, "&#125;");
function jsxAttrValue(v) {
  if (/["\\{}<>&\n]/.test(v)) return "{" + JSON.stringify(v) + "}";
  return '"' + v + '"';
}
function rewriteUrlAttr(name, v) {
  if (name === "src" || name === "poster" || name === "data-src") return mapAsset(v);
  if (name === "srcset") return v.split(",").map((p) => { const [u, d] = p.trim().split(/\s+/); return mapAsset(u) + (d ? " " + d : ""); }).join(", ");
  if (name === "href" && (v === ORIGIN + "/" || v === ORIGIN)) return "/";
  if (name === "style") return v.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, u) => `url(${q}${mapAsset(u)}${q})`);
  return v;
}
function patchAnchor(n) {
  if (n.tagName !== "a") return;
  const t = norm(textOf(n));
  let url = null;
  if (t.includes("global physicians")) url = GLOBAL_URL;
  if (t.includes("help us make an impact")) url = HELP_IMPACT_URL;
  if (t.includes(norm("Speaker Benefits SBMT 2027"))) url = SPEAKER_URL;
  if (!url) return;
  n.attrs = n.attrs.filter((a) => a.name !== "target");
  const h = n.attrs.find((a) => a.name === "href");
  if (h) h.value = url; else n.attrs.push({ name: "href", value: url });
}
function attrName(a) {
  if (a.prefix) return a.prefix + ":" + a.name;
  return a.name;
}

/**
 * Emit JSX for node n. `extract(n)` may return a component tag name to replace the subtree.
 */
function emit(n, depth, ctx) {
  const pad = "  ".repeat(depth);
  if (n.nodeName === "#comment") {
    const c = n.data.trim();
    if (c && c.length < 90 && !c.includes("\n")) return pad + "{/* " + c.replace(/\*\//g, "* /") + " */}\n";
    return "";
  }
  if (n.nodeName === "#text") {
    const raw = n.value;
    const collapsed = raw.replace(/\s+/g, " ");
    const parent = n.parentNode;
    const sibs = parent.childNodes;
    const i = sibs.indexOf(n);
    const live = (s) => (isEl(s) && !s.removed) || (s.nodeName === "#text" && s.value.trim());
    const prev = sibs.slice(0, i).reverse().find(live);
    const next = sibs.slice(i + 1).find(live);
    const parentBlock = BLOCK.has(parent.tagName);
    if (collapsed === " " || collapsed === "") {
      if (ctx.inSvg) return "";
      const blockish = (s) => !s || (isEl(s) && BLOCK.has(s.tagName));
      if (blockish(prev) && blockish(next)) return "";
      if (parentBlock && (!prev || !next)) return ""; // leading/trailing space inside a block never renders
      return pad + '{" "}\n';
    }
    let out = "";
    // leading/trailing whitespace at the start/end of a block (or next to a block sibling) does not render
    const blockSib = (s) => !s || (isEl(s) && BLOCK.has(s.tagName));
    const lead = /^\s/.test(raw) && !(parentBlock && blockSib(prev)) && !(!prev && parentBlock);
    const trail = /\s$/.test(raw) && !(parentBlock && blockSib(next)) && !(!next && parentBlock);
    if (lead) out += pad + '{" "}\n';
    // wrap long text on word boundaries; JSX joins lines with a single space
    const words = escText(collapsed.trim()).split(" ");
    let line = "";
    for (const w of words) {
      if (line && (pad.length + line.length + w.length + 1) > 96) { out += pad + line + "\n"; line = w; }
      else line = line ? line + " " + w : w;
    }
    if (line) out += pad + line + "\n";
    if (trail) out += pad + '{" "}\n';
    return out;
  }
  if (!isEl(n)) return "";
  if (n.removed) return "";
  const replaced = ctx.extract?.(n, depth);
  if (replaced) return replaced;

  const tag = n.tagName;
  const inSvg = ctx.inSvg || tag === "svg";
  // <source> pointing at a WordPress page (not a media file) only costs a failed request
  if (tag === "source" && !/\.(webm|mp4|ogg|ogv|mov)(#|\?|$)/i.test(attr(n, "src") || "")) return "";
  patchAnchor(n);
  const attrs = [];
  for (const a of n.attrs) {
    const name = attrName(a);
    if (DROP_ATTRS.has(name)) continue;
    let v = rewriteUrlAttr(name, a.value);
    if (tag === "body" && name === "class") v = v.split(/\s+/).filter((c) => !BODY_CLASS_DROP.has(c)).join(" ");
    if (tag === "video" && name === "preload" && v === "auto") v = "metadata";
    if (v === "" && ["autoplay", "muted", "loop", "playsinline", "webkit-playsinline", "controls", "defer", "async", "hidden"].includes(name)) attrs.push(name);
    else attrs.push(name + "=" + jsxAttrValue(v));
  }
  // footer / below-the-fold images: lazy-load
  if (tag === "img" && ctx.lazyImages && !n.attrs.some((a) => a.name === "loading")) attrs.push('loading="lazy"', 'decoding="async"');

  if (tag === "style") {
    // only svg-internal styles reach here (html styles are harvested + removed)
    return pad + "<style" + (attrs.length ? " " + attrs.join(" ") : "") + " dangerouslySetInnerHTML={{ __html: " + JSON.stringify(textOf(n)) + " }} />\n";
  }
  const open = "<" + tag + (attrs.length ? " " + attrs.join(" ") : "");
  const oneLine = open.length + pad.length < 100;
  const openStr = oneLine ? open : "<" + tag + "\n" + attrs.map((a) => pad + "  " + a).join("\n") + "\n" + pad;
  if (VOID.has(tag)) return pad + openStr + (oneLine ? " />\n" : "/>\n");
  const kids = (n.childNodes || []).map((c) => emit(c, depth + 1, { ...ctx, inSvg })).join("");
  if (!kids.trim()) return pad + openStr + "></" + tag + ">\n";
  // compact short single-line content: <strong>27-29</strong>
  const kidLines = kids.split("\n").filter(Boolean);
  if (oneLine && kidLines.length === 1 && !kidLines[0].includes('{" "}')) {
    const compact = pad + openStr + ">" + kidLines[0].trim() + "</" + tag + ">";
    if (compact.length <= 100) return compact + "\n";
  }
  return pad + openStr + ">\n" + kids + pad + "</" + tag + ">\n";
}

function markRemovedStylesAndScripts(root) {
  walk(root, (x) => {
    if (!isEl(x)) return;
    if ((x.tagName === "style" && x.namespaceURI === "http://www.w3.org/1999/xhtml") || x.tagName === "script" || (x.tagName === "link" && attr(x, "rel") === "stylesheet")) x.removed = true;
  });
}

function component(name, jsxBody, imports = []) {
  return (
    `// Generated from the original WordPress/Elementor homepage markup.\n` +
    imports.map((i) => i + "\n").join("") +
    (imports.length ? "\n" : "") +
    `export function ${name}() {\n  return (\n${jsxBody.replace(/\n$/, "")}\n  );\n}\n`
  );
}

// ---------- locate parts ----------
const header = find(body, (n) => n.tagName === "header" && attr(n, "id") === "sbmt-lightweight-header");
const main = find(body, (n) => n.tagName === "main");
const footer = find(body, (n) => n.tagName === "footer");

// CSS in body order (section styles + footer styles)
harvestBodyCss(main);
harvestBodyCss(footer);
for (const r of [header, main, footer]) markRemovedStylesAndScripts(r);

// Header
writeOut("src/components/Header.tsx", component("Header", emit(header, 2, {})));

// Main: each Elementor HTML widget becomes a section component
const SECTION_NAMES = {
  "sbmt-identity-clarity": "AtAGlance",
  "sbmt-home-v3": "Overview",
  "sbmt-flagship-events": "Programme",
  "sbmt-leadership-spotlight": "Leadership",
  "sbmt-home-conclusion": "Conclusion",
};
const sectionImports = [];
// Elementor HTML widgets: keep the wrapper div in Main, move its children into a section component.
function extractWidget(n, depth) {
  if (!hasClass(n, "elementor-widget-html")) return null;
  const first = n.childNodes.find((c) => isEl(c) && !c.removed);
  const key = first && attr(first, "id");
  const name = SECTION_NAMES[key];
  if (!name) throw new Error("unmapped html widget: " + key);
  const inner = n.childNodes.map((c) => emit(c, 3, {})).join("");
  writeOut(`src/sections/${name}.tsx`, component(name, "    <>\n" + inner + "    </>\n"));
  sectionImports.push(`import { ${name} } from "../sections/${name}";`);
  const pad = "  ".repeat(depth);
  const attrs = n.attrs.filter((a) => !DROP_ATTRS.has(a.name)).map((a) => a.name + "=" + jsxAttrValue(a.value));
  return `${pad}<div ${attrs.join(" ")}>\n${pad}  <${name} />\n${pad}</div>\n`;
}
writeOut("src/components/Main.tsx", component("Main", emit(main, 2, { extract: extractWidget }), sectionImports));

// Footer
writeOut("src/components/Footer.tsx", component("Footer", emit(footer, 2, { lazyImages: true })));

// Body attributes for Layout
const bodyClass = (attr(body, "class") || "").split(/\s+/).filter((c) => c && !BODY_CLASS_DROP.has(c)).join(" ");

// ---------- plain HTML for PurgeCSS content ----------
function toHtml(n) {
  if (n.nodeName === "#text") return n.value.replace(/</g, "&lt;");
  if (!isEl(n) || n.removed) return "";
  const a = (n.attrs || []).map((x) => ` ${attrName(x)}="${String(x.value).replace(/"/g, "&quot;")}"`).join("");
  if (VOID.has(n.tagName)) return `<${n.tagName}${a}>`;
  return `<${n.tagName}${a}>${(n.childNodes || []).map(toHtml).join("")}</${n.tagName}>`;
}
const purgeHtml = `<html lang="en-US" class="sbmt-lh-menu-open"><body class="${bodyClass}">${toHtml(header)}${toHtml(main)}${toHtml(footer)}</body></html>`;

// ---------- download missing CSS ----------
async function fetchText(u) {
  const r = await fetch(u);
  if (!r.ok) throw new Error(r.status + " " + u);
  return r.text();
}
for (const c of pendingDownloads) {
  try {
    c.text = await fetchText(c.baseUrl);
    log("downloaded css", c.label);
  } catch (e) {
    log("WARN css unavailable", c.label, e.message);
    c.text = "";
  }
}

// ---------- url() rewriting inside CSS ----------
function rewriteCssUrls(text, baseUrl) {
  return text.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (m, q, u) => {
    if (u.startsWith("data:") || u.startsWith("#")) return m;
    const abs = new URL(u, baseUrl);
    if (abs.hostname !== "www.worldbrainmapping.org") return m;
    return `url(${q}${mapAsset(abs.href)}${q})`;
  });
}
let combined = "";
for (const c of cssChunks) {
  let t = rewriteCssUrls(c.text || "", c.baseUrl);
  if (c.media && c.media !== "all") t = `@media ${c.media}{${t}}`;
  combined += `\n/* ---- ${c.label.replace(/\*\//g, "")} ---- */\n${t}\n`;
}

// ---------- purge ----------
const purged = await new PurgeCSS().purge({
  content: [{ raw: purgeHtml, extension: "html" }],
  css: [{ raw: combined }],
  fontFace: true,
  keyframes: true,
  variables: false,
  safelist: {
    standard: [/^sbmt-lh--open$/, /^sbmt-submenu-open$/, /^sbmt-lh-menu-open$/, /^sbmt-lh__submenu-toggle$/, /^sbmt-speaker-benefits-hotfix$/],
    greedy: [/sbmt-lh__submenu-toggle/, /sbmt-submenu-open/, /sbmt-lh--open/],
  },
});
let css = purged[0].css;

// collect assets still referenced from purged CSS
const cssAssets = new Set();
css.replace(/url\(\s*(['"]?)(\/assets\/[^'")?#]+)[^'")]*\1\s*\)/g, (m, q, u) => cssAssets.add(u));
writeOut("src/styles/app.css", "/* Generated: combined + purged CSS from the original homepage (document order preserved). */\n" + css);

// ---------- copy / download assets ----------
// markup assets + only those CSS-registered assets that survived the purge
const markupAssets = new Set();
purgeHtml.replace(/(?:src|poster)="([^"]+)"/g, (m, u) => { const p = mapAsset(u.split("#")[0]); if (p.startsWith("/assets/")) markupAssets.add(p); });
purgeHtml.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, u) => { const p = mapAsset(u); if (p.startsWith("/assets/")) markupAssets.add(p); });
const finalAssets = new Set([...markupAssets, ...cssAssets]);
const report = { copied: [], downloaded: [], missing: [] };
for (const pub of finalAssets) {
  const d = assetMap.get(pub.split("#")[0]);
  if (!d) { report.missing.push(pub + " (unmapped)"); continue; }
  const dest = path.join(OUT, "public", pub);
  const local = d.candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
  if (DRY) { (local ? report.copied : report.downloaded).push(pub); continue; }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (local) { fs.copyFileSync(local, dest); report.copied.push(pub); continue; }
  try {
    const r = await fetch(d.url);
    if (!r.ok) throw new Error(String(r.status));
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    report.downloaded.push(pub);
  } catch (e) {
    report.missing.push(pub + " " + e.message);
  }
}

writeOut("conversion-report.json", JSON.stringify({
  bodyClass,
  cssChunks: cssChunks.map((c) => ({ label: c.label, bytes: (c.text || "").length, local: !!c.localFile })),
  combinedBytes: combined.length,
  purgedBytes: css.length,
  assets: report,
  files: written,
}, null, 2));
log("combined css", combined.length, "-> purged", css.length);
log("assets", JSON.stringify(report, null, 1));
log("files", written.join("\n"));
