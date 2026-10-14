// Abstract submission form + confirmation. Plain HTML form POST: works without JavaScript;
// src/client/abstract-form.ts only adds a live word count.
import type { Child } from "hono/jsx";
import { abstractLimits, contributionTypes, participationModes, themes } from "../data/abstracts";
import type { AbstractForm, FieldErrors } from "../lib/abstracts";

export const ABSTRACT_PATH = "/abstract-submission/";

const section =
  "w-screen max-w-screen mx-[calc(50%-50vw)] overflow-hidden py-[clamp(56px,8vw,100px)] px-6 font-montserrat [background:radial-gradient(circle_at_20%_10%,rgb(var(--rgb-gold)/0.12),transparent_34%),radial-gradient(circle_at_90%_20%,rgb(var(--rgb-jade)/0.35),transparent_34%),linear-gradient(180deg,var(--color-ink)_0%,var(--color-pine)_100%)] lte-640:px-4";
const kicker = "mb-[14px] text-gold text-[13px] font-bold tracking-[0.16em] uppercase";
const pageTitle = "m-0 mb-4 text-white text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.04em] font-extrabold";
const lead = "max-w-[760px] m-0 text-stone text-[17px] leading-[1.65]";
const card = "mt-10 p-[clamp(20px,4vw,44px)] bg-white text-ink rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.32)] neural:border neural:border-line/30";
const fieldset = "m-0 mb-8 p-0 min-w-0";
const legend = "p-0 mb-5 text-pine text-[20px] font-extrabold tracking-[-0.01em]";
const grid = "grid grid-cols-2 gap-x-6 gap-y-5 lte-767:grid-cols-1";
const label = "block mb-[6px] text-ink text-[15px] font-bold leading-[1.4]";
const hint = "block mt-[6px] text-muted text-[13.5px] leading-[1.5]";
const errorText = "block mt-[6px] text-danger text-[13.5px] font-semibold leading-[1.5]";
const control =
  "block w-full py-3 px-[14px] text-ink text-[16px] leading-[1.4] font-montserrat bg-white border border-field rounded-xl " +
  "transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-jade focus:shadow-[0_0_0_3px_rgb(var(--rgb-jade)/0.22)] " +
  "aria-invalid:border-danger";
const btn =
  "inline-flex items-center justify-center min-h-[52px] py-[15px] px-7 rounded-full text-[13px] font-black tracking-[0.07em] uppercase " +
  "transition-[transform,box-shadow] duration-220 ease-[ease] hover:-translate-y-0.5 lte-640:w-full";
const btnPrimary = `${btn} bg-pine text-white shadow-[0_12px_28px_rgb(var(--rgb-pine)/0.28)] hover:text-white hover:shadow-[0_16px_34px_rgb(var(--rgb-pine)/0.36)]`;

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
    <div class={wide ? "col-span-full" : ""}>
      <label class={label} for={id}>
        {text}
        {required ? <span class="text-danger" aria-hidden="true"> *</span> : <span class="font-normal text-muted"> (optional)</span>}
      </label>
      {children({ id, name, required, "aria-invalid": err ? "true" : undefined, "aria-describedby": describedBy })}
      {hintText && <span class={hint} id={`${id}-hint`}>{hintText}</span>}
      {err && <span class={errorText} id={`${id}-error`}>{err}</span>}
    </div>
  );
}

function Select({
  options,
  value,
  attrs,
  numbered,
}: {
  options: string[];
  value: string;
  attrs: Record<string, unknown>;
  numbered?: boolean;
}) {
  return (
    <select class={`${control} appearance-auto`} {...attrs}>
      <option value="" selected={!value}>Select…</option>
      {options.map((o, i) => (
        <option value={o} selected={o === value}>{numbered ? `${i + 1}. ${o}` : o}</option>
      ))}
    </select>
  );
}

function Check({ name, value, errors, children }: { name: "originality" | "consent"; value: string; errors: FieldErrors; children: Child }) {
  const id = `abs-${name}`;
  const err = errors[name];
  return (
    <div>
      <label class="flex items-start gap-3 text-ink text-[15px] leading-[1.55] cursor-pointer" for={id}>
        <input
          class="flex-none w-5 h-5 mt-[3px] accent-pine"
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
      {err && <span class={`${errorText} ml-8`} id={`${id}-error`}>{err}</span>}
    </div>
  );
}

function PageShell({ children }: { children: Child }) {
  return (
    <main id="content" class="bg-ink">
      <section class={section} aria-labelledby="abs-title">
        <div class="max-w-[980px] mx-auto">{children}</div>
      </section>
    </main>
  );
}

export function AbstractSubmissionPage({
  values,
  errors = {},
  formError,
}: {
  values: AbstractForm;
  errors?: FieldErrors;
  formError?: string;
}) {
  const errorCount = Object.keys(errors).length;
  const { minWords, maxWords, titleMaxChars, minKeywords, maxKeywords } = abstractLimits;
  return (
    <PageShell>
      <div class={kicker}>Call for Contributions</div>
      <h1 id="abs-title" class={pageTitle}>Submit your abstract</h1>
      <p class={lead}>
        BLAIM 2027 welcomes original research, practice and policy work across the nine conference
        themes. Hybrid conference, Parul University, Vadodara, 27-29 January 2027. You will receive a
        confirmation email with a reference number.
      </p>

      <div class={card}>
        {(errorCount > 0 || formError) && (
          <div class="mb-8 p-4 border border-danger-line bg-danger-soft rounded-xl text-danger-strong text-[15px] leading-[1.55]" role="alert" tabindex={-1} id="abs-errors">
            <strong class="block mb-1">{formError ?? "Your abstract was not submitted."}</strong>
            {errorCount > 0 && <span>Please correct the {errorCount === 1 ? "field" : `${errorCount} fields`} marked below.</span>}
          </div>
        )}

        <form method="post" action={ABSTRACT_PATH} data-abstract-form>
          {/* Honeypot: hidden from people, filled in by naive bots. */}
          <div class="absolute -left-[10000px] w-px h-px overflow-hidden" aria-hidden="true">
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
              <Field name="coAuthors" label="Co-authors" errors={errors} wide hint="One per line: name, institution, country.">
                {(a) => <textarea class={`${control} min-h-[96px] resize-y`} rows={3} maxlength={2000} {...a}>{values.coAuthors}</textarea>}
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
                hint={`${minWords}-${maxWords} words. Plain text: state the problem, method or approach, findings and implications.`}
              >
                {(a) => (
                  <>
                    <textarea class={`${control} min-h-[260px] resize-y`} rows={12} data-min-words={String(minWords)} data-max-words={String(maxWords)} {...a}>
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
              This abstract is the original work of the listed authors and has not been published elsewhere,
              and all co-authors have agreed to its submission.
            </Check>
            <Check name="consent" value={values.consent} errors={errors}>
              I agree that BLAIM 2027 may store these details and contact me about this submission, the review
              and the conference.
            </Check>
          </fieldset>

          <div class="flex flex-wrap items-center gap-4">
            <button type="submit" class={btnPrimary}>Submit abstract</button>
            <span class="text-muted text-[13.5px]">Fields marked * are required.</span>
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
      <div class={kicker}>Call for Contributions</div>
      <h1 id="abs-title" class={pageTitle}>Thank you, your abstract was received.</h1>
      <div class={card}>
        <p class="m-0 mb-2 text-muted text-[14px] font-bold tracking-[0.08em] uppercase">Your reference</p>
        <p class="m-0 mb-6 text-pine text-[clamp(24px,4vw,34px)] font-extrabold tracking-[0.02em]">{reference}</p>
        <p class="m-0 mb-8 text-[16px] leading-[1.65]">
          A confirmation with a copy of your abstract is on its way to the email address you gave. If it
          does not arrive within an hour, check your spam folder or contact the conference office, quoting
          your reference.
        </p>
        <div class="flex flex-wrap gap-3">
          <a class={btnPrimary} href="/">Back to BLAIM 2027</a>
          <a class={`${btn} bg-transparent text-pine border border-pine/40 hover:text-pine hover:bg-mist/50`} href={ABSTRACT_PATH}>
            Submit another abstract
          </a>
        </div>
      </div>
    </PageShell>
  );
}
