// Registration fees, pre-workshop/hackathon fee, links and payment links (brochure pages 16-17).
// Links the brochure leaves as placeholders render as "to be announced".
import { conference, fees, links, type FeeRow } from "../data/conference";
import { Backdrop, Eyebrow, Title, container } from "../components/ui";

function FeeTable({ title, rows, currency }: { title: string; rows: FeeRow[]; currency: string }) {
  return (
    <div class="reveal border border-amber/20 bg-char/80 backdrop-blur-sm">
      <div class="flex items-baseline justify-between gap-4 border-b border-amber/20 px-5 py-4">
        <h3 class="font-display text-[1.2rem] leading-tight text-glow">{title}</h3>
        <span class="font-sans text-[10.5px] uppercase tracking-[0.2em] text-mist">{currency}</span>
      </div>
      <table class="fee-table w-full border-collapse text-[14px]">
        <thead class="text-amber">
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Early bird</th>
            <th scope="col">Late bird</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr>
              <td class="text-sand/90">{r.category}</td>
              <td class="font-display text-[1rem] font-bold text-glow">{r.early}</td>
              <td class="font-display text-[1rem] font-bold text-sand/80">{r.late}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinkRow({ label, href }: { label: string; href: string | null }) {
  return (
    <li class="flex flex-wrap items-center justify-between gap-3 border-b border-amber/12 py-3">
      <span class="text-[14px] text-sand/90">{label}</span>
      {href ? (
        <a class="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-glow underline-offset-4 hover:underline" href={href}>
          Open link →
        </a>
      ) : (
        <span class="font-sans text-[10.5px] font-bold uppercase tracking-[0.18em] text-mist">To be announced</span>
      )}
    </li>
  );
}

export function Registration() {
  return (
    <section id="registration" class="relative isolate bg-night" aria-labelledby="registration-title">
      <Backdrop slug="arch-steps-dark" opacity="opacity-30" position="object-[center_40%]" />
      <div class={`${container} py-24 md:py-32`}>
        <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>Registration</Eyebrow>
            <Title id="registration-title" class="reveal text-sand">
              Fees and registration.
            </Title>
          </div>
          <p class="reveal text-[14px] font-medium text-sand/70 lg:text-right">
            Conference dates: {fees.dates}
          </p>
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-2">
          <FeeTable title="Indian participants" rows={fees.indian} currency="INR" />
          <FeeTable title="International participants" rows={fees.international} currency="USD" />
        </div>

        <ul class="reveal mt-6 space-y-2 text-[12.5px] leading-relaxed text-mist">
          {fees.notes.map((n) => (
            <li class="flex gap-3">
              <span class="mt-[0.55em] inline-block h-px w-4 shrink-0 bg-amber/60" aria-hidden="true"></span>
              {n}
            </li>
          ))}
        </ul>

        <div class="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="reveal border border-amber/20 bg-char/80 p-7 backdrop-blur-sm md:p-9">
            <h3 class="font-display text-[1.3rem] leading-tight text-glow">{fees.workshop.title}</h3>
            <dl class="mt-6 grid gap-px bg-amber/15 sm:grid-cols-3">
              {fees.workshop.rows.map((r) => (
                <div class="bg-char p-5">
                  <dt class="font-sans text-[10.5px] font-bold uppercase leading-relaxed tracking-[0.16em] text-mist">{r.category}</dt>
                  <dd class="mt-2 font-display text-[1.5rem] font-extrabold leading-none tracking-[-0.02em] text-glow">{r.fee}</dd>
                </div>
              ))}
            </dl>
            <p class="mt-6 text-[14px] leading-relaxed text-sand/85">{fees.workshop.includes}</p>
            <p class="mt-3 flex items-center gap-3 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-amber">
              <span class="inline-block h-[7px] w-[7px] rounded-full bg-signal" aria-hidden="true"></span>
              {fees.workshop.capacity}
            </p>
            <p class="mt-6 border-t border-amber/15 pt-4 text-[12.5px] leading-relaxed text-mist">Note: {fees.refund}</p>
          </div>

          <div class="reveal">
            <h3 class="font-display text-[1.3rem] leading-tight text-glow">Registration links</h3>
            <ul class="mt-4">
              <LinkRow label="Abstract submission" href={links.abstractSubmission} />
              <LinkRow label="Conference registration" href={links.conferenceRegistration} />
              <LinkRow label="Workshop and hackathon registration" href={links.workshopRegistration} />
            </ul>
            <h3 class="mt-10 font-display text-[1.3rem] leading-tight text-glow">Payment links</h3>
            <ul class="mt-4">
              <LinkRow label="Conference · International participants" href={links.payment.international} />
              <LinkRow label="Conference · Parul University" href={links.payment.parul} />
              <LinkRow label="Conference · Indian participants" href={links.payment.indian} />
              <LinkRow label="Pre-conference workshop" href={links.payment.workshop} />
            </ul>
            <p class="mt-8 text-[14px] leading-relaxed text-sand/85">
              If you need any assistance or information regarding the conference, please contact the
              conference organising committee at{" "}
              <a class="text-glow underline-offset-4 hover:underline" href={`mailto:${conference.contacts.programme}`}>
                {conference.contacts.programme}
              </a>{" "}
              or{" "}
              <a class="text-glow underline-offset-4 hover:underline" href={`mailto:${conference.contacts.organising}`}>
                {conference.contacts.organising}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
