import { defineConfig } from "vite";
import devServer, { defaultOptions } from "@hono/vite-dev-server";
import build from "@hono/vite-build/node";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Step 1 of `npm run build`: client assets (CSS + JS) with hashed names and a manifest.
  // public/ is copied into dist/ here.
  if (mode === "client") {
    return {
      plugins: [tailwindcss()],
      build: {
        outDir: "dist",
        emptyOutDir: true,
        assetsDir: "static",
        manifest: true,
        rollupOptions: {
          input: ["src/client/main.ts", "src/styles/app.css"],
        },
      },
    };
  }

  // Step 2: SSR server bundle -> dist/index.js (Node).
  return {
    plugins: [
      tailwindcss(),
      build({
        entry: "src/index.tsx",
        port: Number(process.env.PORT ?? 3000),
        // Static files are served by the app itself (src/index.tsx) so it can set cache headers.
        entryContentBeforeHooks: [],
      }),
      devServer({
        entry: "src/index.tsx",
        exclude: [...defaultOptions.exclude, /^\/assets\/.+/],
      }),
    ],
  };
});
