// Abstract submissions: validation, storage (append-only JSON Lines file) and email notifications.
import { appendFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { abstractLimits, contributionTypes, participationModes, themes } from "../data/abstracts";
import { sendMail } from "./mailer";

/** Raw form values, kept as strings so the form can be re-rendered as typed. */
export type AbstractForm = {
  name: string;
  email: string;
  phone: string;
  affiliation: string;
  country: string;
  coAuthors: string;
  contributionType: string;
  theme: string;
  participation: string;
  title: string;
  abstract: string;
  keywords: string;
  originality: string;
  consent: string;
};

export type FieldErrors = Partial<Record<keyof AbstractForm, string>>;

export type Submission = Omit<AbstractForm, "keywords" | "originality" | "consent"> & {
  id: string;
  submittedAt: string;
  keywords: string[];
  wordCount: number;
};

const STORE_PATH = resolve(process.env.ABSTRACT_STORE_PATH || "data/abstracts.jsonl");
const NOTIFY_TO = process.env.ABSTRACT_NOTIFY_TO ?? "";

const fields: (keyof AbstractForm)[] = [
  "name", "email", "phone", "affiliation", "country", "coAuthors", "contributionType", "theme",
  "participation", "title", "abstract", "keywords", "originality", "consent",
];

export const emptyForm = (): AbstractForm =>
  Object.fromEntries(fields.map((f) => [f, ""])) as AbstractForm;

export function readForm(body: Record<string, unknown>): AbstractForm {
  const form = emptyForm();
  for (const f of fields) {
    const v = body[f];
    // Normalise newlines; strip control characters other than tab/newline.
    form[f] = typeof v === "string" ? v.replace(/\r\n?/g, "\n").replace(/[\x00-\x08\x0b-\x1f\x7f]/g, "").trim() : "";
  }
  return form;
}

export const countWords = (text: string) => (text.match(/\S+/g) ?? []).length;

const splitKeywords = (value: string) =>
  value
    .split(/[,;\n]/)
    .map((k) => k.trim())
    .filter(Boolean);

// Deliberately loose: one "@", no whitespace, a dot in the domain. Real validation is the confirmation email.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(form: AbstractForm): FieldErrors {
  const e: FieldErrors = {};
  const required = (f: keyof AbstractForm, label: string, max = 200) => {
    if (!form[f]) e[f] = `${label} is required.`;
    else if (form[f].length > max) e[f] = `${label} must be ${max} characters or fewer.`;
  };

  required("name", "Full name", 120);
  required("email", "Email", 254);
  if (!e.email && !EMAIL.test(form.email)) e.email = "Enter a valid email address.";
  if (form.phone.length > 40) e.phone = "Phone must be 40 characters or fewer.";
  required("affiliation", "Affiliation", 200);
  required("country", "Country", 80);
  if (form.coAuthors.length > 2000) e.coAuthors = "Co-authors must be 2,000 characters or fewer.";

  if (!contributionTypes.includes(form.contributionType)) e.contributionType = "Choose a contribution type.";
  if (!themes.includes(form.theme)) e.theme = "Choose a conference theme.";
  if (!participationModes.includes(form.participation)) e.participation = "Choose how you will present.";

  required("title", "Title", abstractLimits.titleMaxChars);

  const words = countWords(form.abstract);
  if (!form.abstract) e.abstract = "Abstract is required.";
  else if (words < abstractLimits.minWords) e.abstract = `Abstract must be at least ${abstractLimits.minWords} words (currently ${words}).`;
  else if (words > abstractLimits.maxWords) e.abstract = `Abstract must be ${abstractLimits.maxWords} words or fewer (currently ${words}).`;

  const kw = splitKeywords(form.keywords);
  if (kw.length < abstractLimits.minKeywords || kw.length > abstractLimits.maxKeywords) {
    e.keywords = `Enter ${abstractLimits.minKeywords} to ${abstractLimits.maxKeywords} keywords, separated by commas.`;
  } else if (kw.some((k) => k.length > 60)) e.keywords = "Each keyword must be 60 characters or fewer.";

  if (form.originality !== "yes") e.originality = "Please confirm this is your original, unpublished work.";
  if (form.consent !== "yes") e.consent = "Please agree so we can process your submission.";
  return e;
}

/** e.g. BLAIM27-7K3QX9MD. Crockford-style alphabet, no 0/O/1/I. */
function newId() {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = randomBytes(8);
  return "BLAIM27-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

/** Persists a validated form. Throws if the write fails: the caller must not report success then. */
export async function saveSubmission(form: AbstractForm): Promise<Submission> {
  const { keywords, originality: _o, consent: _c, ...rest } = form;
  const submission: Submission = {
    id: newId(),
    submittedAt: new Date().toISOString(),
    ...rest,
    keywords: splitKeywords(keywords),
    wordCount: countWords(form.abstract),
  };
  await mkdir(dirname(STORE_PATH), { recursive: true });
  await appendFile(STORE_PATH, JSON.stringify(submission) + "\n", "utf8");
  return submission;
}

function summary(s: Submission) {
  return [
    `Reference: ${s.id}`,
    `Submitted: ${s.submittedAt}`,
    "",
    `Title: ${s.title}`,
    `Contribution type: ${s.contributionType}`,
    `Theme: ${s.theme}`,
    `Participation: ${s.participation}`,
    `Keywords: ${s.keywords.join(", ")}`,
    "",
    `Presenting author: ${s.name} <${s.email}>`,
    `Phone: ${s.phone || "-"}`,
    `Affiliation: ${s.affiliation}, ${s.country}`,
    `Co-authors:\n${s.coAuthors || "-"}`,
    "",
    `Abstract (${s.wordCount} words):`,
    s.abstract,
  ].join("\n");
}

/**
 * Emails the conference office and the submitter. Call without awaiting, after the
 * submission is saved: SMTP round-trips take seconds and must not delay the response.
 * Never rejects (sendMail swallows its own errors).
 */
export async function notifySubmission(s: Submission) {
  // Subjects are single-line; drop anything that could look like a header break.
  const shortTitle = s.title.replace(/\s+/g, " ").slice(0, 80);
  await Promise.all([
    NOTIFY_TO
      ? sendMail({
          to: NOTIFY_TO,
          replyTo: s.email,
          subject: `[BLAIM 2027] New abstract ${s.id}: ${shortTitle}`,
          text: summary(s),
        })
      : Promise.resolve(false),
    sendMail({
      to: s.email,
      subject: `BLAIM 2027 abstract received (${s.id})`,
      text:
        `Dear ${s.name},\n\n` +
        `Thank you for submitting an abstract to BLAIM 2027, the 2nd International Conference on ` +
        `Mindfulness, Behavioural Science & Legal Innovation (Parul University, Vadodara, 27-29 January 2027).\n\n` +
        `Please quote your reference ${s.id} in any correspondence about this submission. ` +
        `The conference committee will contact you about the review outcome.\n\n` +
        `A copy of your submission follows.\n\n` +
        `----------------------------------------\n` +
        summary(s) +
        `\n----------------------------------------\n\n` +
        `BLAIM 2027 Conference Office\n`,
    }),
  ]);
}
