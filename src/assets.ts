// Resolves client entry URLs: Vite source paths in dev, hashed files from the client manifest in prod.
type ManifestChunk = { file: string; css?: string[] };

// Inlined at server-build time (the client build runs first). Empty in dev.
const manifests = import.meta.glob<Record<string, ManifestChunk>>("/dist/.vite/manifest.json", {
  eager: true,
  import: "default",
});
const manifest = Object.values(manifests)[0];

const CSS_ENTRY = "src/styles/app.css";
const JS_ENTRY = "src/client/main.ts";

export function clientAssets() {
  if (!import.meta.env.PROD || !manifest) {
    return { css: "/" + CSS_ENTRY, js: "/" + JS_ENTRY };
  }
  return { css: "/" + manifest[CSS_ENTRY].file, js: "/" + manifest[JS_ENTRY].file };
}
