// Abstract submission form + confirmation. Plain HTML form POST: works without JavaScript;
// src/client/abstract-form.ts only adds a live word count.
import type { Child } from "hono/jsx";
import { abstractLimits, contributionTypes, participationModes, themes } from "../data/abstracts";
import { abstractGuidelines, conference } from "../data/conference";
import { Backdrop, Eyebrow } from "../components/ui";
import type { AbstractForm, FieldErrors } from "../lib/abstracts";

export const ABSTRACT_PATH = "/abstract-submission/";

const pageTitle = "font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-sand";
const lead = "mt-5 max-w-[42rem] text-[16px] leading-[1.75] text-sand/80";
const card = "mt-12 bg-linen p-6 text-ink shadow-[0_50px_100px_-40px_color-mix(in_oklab,var(--color-shade)_80%,transparent)] md:p-12";
const fieldset = "m-0 mb-10 min-w-0 p-0";
const legend = "mb-6 font-display text-[1.25rem] font-extrabold tracking-[-0.02em] text-ink";
const grid = "grid gap-x-6 gap-y-5 md:grid-cols-2";
const label = "mb-1.5 block font-sans text-[13px] font-bold text-ink";
const hint = "mt-1.5 block text-[12.5px] leading-relaxed text-ash";
const errorText = "mt-1.5 block text-[12.5px] font-semibold leading-relaxed text-danger";
const control =
  "block w-full border border-ink/25 bg-white px-3.5 py-3 font-sans text-[15px] leading-normal text-ink " +
  "transition-[border-color,box-shadow] duration-150 focus:border-ember focus:shadow-[0_0_0_3px_rgba(184,120,58,0.25)] focus:outline-none " +
  "aria-invalid:border-danger";
const btn =
  "inline-flex min-h-12 items-center justify-center gap-3 px-7 py-3 font-sans text-[12.5px] font-bold uppercase tracking-[0.16em] transition-[transform,background-color] duration-300 hover:-translate-y-0.5";
const btnPrimary = `${btn} bg-ink text-parchment hover:bg-bark`;
const btnGhost = `${btn} border border-ink/30 text-ink hover:bg-ink hover:text-parchment`;

type FieldProps = {
  name: keyof AbstractForm;
  label: string;
  errors: FieldErrors;
  hint?: string;
  required?: boolean;
  wide?: boolean;
  children: (attrs: Record<string, string | boolean | undefined>) => Child;
};

/** Label + control + hint/error, with the aria wiring between them. */
function Field({ name, label: text, errors, hint: hintText, required, wide, children }: FieldProps) {
  const id = `abs-${name}`;
  const err = errors[name];
  const describedBy = [hintText && `${id}-hint`, err && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div class={wide ? "md:col-span-full" : ""}>
      <label class={label} for={id}>
        {text}
        {required ? (
          <span class="text-signal" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span class="font-normal text-ash"> (optional)</span>
        )}
      </label>
      {children({ id, name, required, "aria-invalid": err ? "true" : undefined, "aria-describedby": describedBy })}
      {hintText && (
        <span class={hint} id={`${id}-hint`}>
          {hintText}
        </span>
      )}
      {err && (
        <span class={errorText} id={`${id}-error`}>
          {err}
        </span>
      )}
    </div>
  );
}

function Select({ options, value, attrs, numbered }: { options: string[]; value: string; attrs: Record<string, unknown>; numbered?: boolean }) {
  return (
    <select class={`${control} appearance-auto`} {...attrs}>
      <option value="" selected={!value}>
        Select…
      </option>
      {options.map((o, i) => (
        <option value={o} selected={o === value}>
          {numbered ? `${i + 1}. ${o}` : o}
        </option>
      ))}
    </select>
  );
}

function Check({ name, value, errors, children }: { name: "originality" | "consent"; value: string; errors: FieldErrors; children: Child }) {
  const id = `abs-${name}`;
  const err = errors[name];
  return (
    <div>
      <label class="flex cursor-pointer items-start gap-3 text-[14.5px] leading-relaxed text-ink" for={id}>
        <input
          class="mt-[3px] h-5 w-5 flex-none accent-ember"
          type="checkbox"
          id={id}
          name={name}
          value="yes"
          checked={value === "yes"}
          required
          aria-invalid={err ? "true" : undefined}
          aria-describedby={err ? `${id}-error` : undefined}
        />
        <span>{children}</span>
      </label>
      {err && (
        <span class={`${errorText} ml-8`} id={`${id}-error`}>
          {err}
        </span>
      )}
    </div>
  );
}

function PageShell({ children }: { children: Child }) {
  return (
    <main id="content" class="relative isolate overflow-hidden bg-night">
      <Backdrop slug="narrow-corridor-beam" opacity="opacity-35" position="object-[center_25%]" />
      <section class="mx-auto w-[min(960px,calc(100%-2.5rem))] pt-36 pb-24 md:pb-32" aria-labelledby="abs-title">
        {children}
      </section>
    </main>
  );
}

export function AbstractSubmissionPage({ values, errors = {}, formError }: { values: AbstractForm; errors?: FieldErrors; formError?: string }) {
  const errorCount = Object.keys(errors).length;
  const { minWords, maxWords, maxAuthors, titleMaxChars, minKeywords, maxKeywords } = abstractLimits;
  return (
    <PageShell>
      <Eyebrow>Call for abstracts</Eyebrow>
      <h1 id="abs-title" class={pageTitle}>
        Submit your abstract
      </h1>
      <p class={lead}>
        {conference.shortName}, {conference.dates.label}, {conference.venue.name}, Vadodara, hybrid mode. Abstracts
        are due on or before {abstractGuidelines.deadline}; you will receive a confirmation email with a reference
        number.
      </p>

      <div class={card}>
        {(errorCount > 0 || formError) && (
          <div class="mb-8 border border-danger-line bg-danger-soft p-4 text-[14.5px] leading-relaxed text-danger-strong" role="alert" tabindex={-1} id="abs-errors">
            <strong class="mb-1 block">{formError ?? "Your abstract was not submitted."}</strong>
            {errorCount > 0 && <span>Please correct the {errorCount === 1 ? "field" : `${errorCount} fields`} marked below.</span>}
          </div>
        )}

        <form method="post" action={ABSTRACT_PATH} data-abstract-form>
          {/* Honeypot: hidden from people, filled in by naive bots. */}
          <div class="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Leave this field empty <input type="text" name="website" tabindex={-1} autocomplete="off" />
            </label>
          </div>

          <fieldset class={fieldset}>
            <legend class={legend}>Presenting author</legend>
            <div class={grid}>
              <Field name="name" label="Full name" errors={errors} required>
                {(a) => <input class={control} type="text" autocomplete="name" maxlength={120} value={values.name} {...a} />}
              </Field>
              <Field name="email" label="Email" errors={errors} required hint="Your confirmation is sent here.">
                {(a) => <input class={control} type="email" autocomplete="email" maxlength={254} value={values.email} {...a} />}
              </Field>
              <Field name="affiliation" label="Institution / organisation" errors={errors} required>
                {(a) => <input class={control} type="text" autocomplete="organization" maxlength={200} value={values.affiliation} {...a} />}
              </Field>
              <Field name="country" label="Country" errors={errors} required>
                {(a) => <input class={control} type="text" autocomplete="country-name" maxlength={80} value={values.country} {...a} />}
              </Field>
              <Field name="phone" label="Phone" errors={errors}>
                {(a) => <input class={control} type="tel" autocomplete="tel" maxlength={40} value={values.phone} {...a} />}
              </Field>
              <Field
                name="coAuthors"
                label="Co-authors"
                errors={errors}
                wide
                hint={`One per line: name, institution, country. An abstract can have a maximum of ${maxAuthors} authors, so list up to ${maxAuthors - 1} co-authors.`}
              >
                {(a) => (
                  <textarea class={`${control} min-h-[96px] resize-y`} rows={3} maxlength={2000} {...a}>
                    {values.coAuthors}
                  </textarea>
                )}
              </Field>
            </div>
          </fieldset>

          <fieldset class={fieldset}>
            <legend class={legend}>Contribution</legend>
            <div class={grid}>
              <Field name="contributionType" label="Contribution type" errors={errors} required>
                {(a) => <Select options={contributionTypes} value={values.contributionType} attrs={a} />}
              </Field>
              <Field name="participation" label="Presentation mode" errors={errors} required>
                {(a) => <Select options={participationModes} value={values.participation} attrs={a} />}
              </Field>
              <Field name="theme" label="Conference theme" errors={errors} required wide>
                {(a) => <Select options={themes} value={values.theme} attrs={a} numbered />}
              </Field>
            </div>
          </fieldset>

          <fieldset class={fieldset}>
            <legend class={legend}>Abstract</legend>
            <div class={grid}>
              <Field name="title" label="Title" errors={errors} required wide>
                {(a) => <input class={control} type="text" maxlength={titleMaxChars} value={values.title} {...a} />}
              </Field>
              <Field
                name="abstract"
                label="Abstract"
                errors={errors}
                required
                wide
                hint={`${minWords}-${maxWords} words. Structured and concise: objectives, methods, results and conclusions.`}
              >
                {(a) => (
                  <>
                    <textarea
                      class={`${control} min-h-[260px] resize-y`}
                      rows={12}
                      data-min-words={String(minWords)}
                      data-max-words={String(maxWords)}
                      {...a}
                    >
                      {values.abstract}
                    </textarea>
                    <span class={`${hint} hidden font-semibold data-over:text-danger`} data-word-count aria-live="polite"></span>
                  </>
                )}
              </Field>
              <Field name="keywords" label="Keywords" errors={errors} required wide hint={`${minKeywords}-${maxKeywords} keywords, separated by commas.`}>
                {(a) => <input class={control} type="text" maxlength={400} value={values.keywords} {...a} />}
              </Field>
            </div>
          </fieldset>

          <fieldset class={`${fieldset} grid gap-4`}>
            <legend class={legend}>Declarations</legend>
            <Check name="originality" value={values.originality} errors={errors}>
              This abstract is the original work of the listed authors and has not been previously published or
              presented elsewhere, and all co-authors have agreed to its submission.
            </Check>
            <Check name="consent" value={values.consent} errors={errors}>
              I agree that {conference.shortName} may store these details and contact me about this submission,
              the review and the conference.
            </Check>
          </fieldset>

          <div class="flex flex-wrap items-center gap-5">
            <button type="submit" class={btnPrimary}>
              Submit abstract
            </button>
            <span class="text-[13px] text-ash">Fields marked * are required.</span>
          </div>
        </form>
      </div>
    </PageShell>
  );
}

/** Shown after the POST redirects (so a refresh can't submit twice). Only the reference is in the URL. */
export function AbstractSubmittedPage({ reference }: { reference: string }) {
  return (
    <PageShell>
      <Eyebrow>Call for abstracts</Eyebrow>
      <h1 id="abs-title" class={pageTitle}>
        Thank you, your abstract was received.
      </h1>
      <div class={card}>
        <p class="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-ash">Your reference</p>
        <p class="mt-1 mb-6 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold tracking-[-0.02em] text-ember">{reference}</p>
        <p class="mb-8 text-[15.5px] leading-[1.75] text-ink/85">
          A confirmation with a copy of your abstract is on its way to the email address you gave. If it does not
          arrive within an hour, check your spam folder or contact the conference office at{" "}
          <a class="underline underline-offset-4" href={`mailto:${conference.contacts.programme}`}>
            {conference.contacts.programme}
          </a>
          , quoting your reference.
        </p>
        <div class="flex flex-wrap gap-3">
          <a class={btnPrimary} href="/">
            Back to {conference.shortName}
          </a>
          <a class={btnGhost} href={ABSTRACT_PATH}>
            Submit another abstract
          </a>
        </div>
      </div>
    </PageShell>
  );
}
