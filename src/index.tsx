import { Hono, type Context } from "hono";
import { compress } from "hono/compress";
import { csrf } from "hono/csrf";
import { bodyLimit } from "hono/body-limit";
import { serveStatic } from "@hono/node-server/serve-static";
import { getConnInfo } from "@hono/node-server/conninfo";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { SITE_URL } from "./site";
import { ABSTRACT_PATH, AbstractSubmissionPage, AbstractSubmittedPage } from "./pages/AbstractSubmission";
import { emptyForm, notifySubmission, readForm, saveSubmission, validate, type AbstractForm, type FieldErrors } from "./lib/abstracts";

const app = new Hono();

app.use(compress());

if (import.meta.env.PROD) {
  // Hashed build output: cache forever.
  app.use(
    "/static/*",
    serveStatic({
      root: "./dist",
      onFound: (_path, c) => c.header("Cache-Control", "public, max-age=31536000, immutable"),
    }),
  );
  // Media/fonts copied from the original site: stable names, cache for 30 days.
  app.use(
    "/assets/*",
    serveStatic({
      root: "./dist",
      onFound: (_path, c) => c.header("Cache-Control", "public, max-age=2592000"),
    }),
  );
}

app.get("/", (c) => {
  c.header("Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
  return c.html(
    "<!doctype html>" +
      (
        <Layout>
          <Header />
          <Main />
          <Footer />
        </Layout>
      ),
  );
});

// --- Abstract submission ---------------------------------------------------------------

const abstractPage = (c: Context, values: AbstractForm, errors?: FieldErrors, formError?: string) =>
  c.html(
    "<!doctype html>" +
      (
        <Layout
          path={ABSTRACT_PATH}
          title="Abstract Submission"
          description="Submit an abstract to BLAIM 2.0, Parul University, Vadodara, 28-30 January 2027. Deadline 1 November 2026."
          noindex={!!(errors || formError)}
        >
          <Header />
          <AbstractSubmissionPage values={values} errors={errors} formError={formError} />
          <Footer />
        </Layout>
      ),
  );

// Per-IP submission limit, in memory (per process; resets on restart).
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
const recent = new Map<string, number[]>();

function clientIp(c: Context) {
  if (process.env.TRUST_PROXY === "true") {
    const fwd = c.req.header("x-forwarded-for")?.split(",")[0]?.trim();
    if (fwd) return fwd;
  }
  try {
    return getConnInfo(c).remote.address ?? "unknown";
  } catch {
    return "unknown"; // e.g. the Vite dev server, which has no Node socket info
  }
}

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) return true;
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 10_000) recent.clear(); // crude memory cap
  return false;
}

const REFERENCE = /^BLAIM27-[2-9A-HJ-NP-Z]{8}$/;

app.get(ABSTRACT_PATH, (c) => {
  c.header("Cache-Control", "no-store");
  const ref = c.req.query("submitted");
  if (ref && REFERENCE.test(ref)) {
    return c.html(
      "<!doctype html>" +
        (
          <Layout path={ABSTRACT_PATH} title="Abstract Received" noindex>
            <Header />
            <AbstractSubmittedPage reference={ref} />
            <Footer />
          </Layout>
        ),
    );
  }
  return abstractPage(c, emptyForm());
});
app.get(ABSTRACT_PATH.slice(0, -1), (c) => c.redirect(ABSTRACT_PATH, 301));

app.post(
  ABSTRACT_PATH,
  // Rejects cross-site form posts (Origin header must match this host).
  csrf(),
  bodyLimit({ maxSize: 64 * 1024, onError: (c) => c.text("Submission too large", 413) }),
  async (c) => {
    c.header("Cache-Control", "no-store");
    const body = await c.req.parseBody();
    const values = readForm(body);

    // Honeypot filled: pretend success so bots learn nothing, store nothing.
    if (typeof body.website === "string" && body.website !== "") {
      return c.redirect(`${ABSTRACT_PATH}?submitted=BLAIM27-XXXXXXXX`, 303);
    }

    const errors = validate(values);
    if (Object.keys(errors).length) {
      c.status(422);
      return abstractPage(c, values, errors);
    }

    if (rateLimited(clientIp(c))) {
      c.status(429);
      return abstractPage(c, values, undefined, "Too many submissions from your network. Please try again in a few minutes.");
    }

    let submission;
    try {
      submission = await saveSubmission(values);
    } catch (err) {
      console.error("[abstracts] could not save submission:", err);
      c.status(500);
      return abstractPage(c, values, undefined, "We could not save your abstract due to a server error. Please try again shortly.");
    }

    // Emails go out after the response; a slow or failing SMTP server never blocks or loses the submission.
    void notifySubmission(submission);

    return c.redirect(`${ABSTRACT_PATH}?submitted=${submission.id}`, 303);
  },
);

// --------------------------------------------------------------------------------------

app.get("/robots.txt", (c) =>
  c.text(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`),
);

app.get("/sitemap.xml", (c) => {
  c.header("Content-Type", "application/xml; charset=UTF-8");
  return c.body(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
      `<url><loc>${SITE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>` +
      `<url><loc>${SITE_URL}${ABSTRACT_PATH}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>` +
      `</urlset>\n`,
  );
});

export default app;
