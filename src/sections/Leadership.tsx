// Invited guest professors and host institution.

const sectionLabel = "mb-[10px] text-jade text-[12px] font-black tracking-[0.16em] uppercase";
const serifTitle = "mt-0 font-georgia";
const speakerCard =
  "bg-ink text-white rounded-[28px] overflow-hidden border border-ink/12 shadow-[0_26px_70px_rgb(var(--rgb-ink)/0.16)] neural:border-line/30";
const speakerText = "m-0 mb-[14px] text-white/90 text-[15.5px] leading-[1.68]";
const btn =
  "inline-flex items-center justify-center min-h-12 py-[13px] px-[19px] rounded-full text-[13px] font-black tracking-[0.06em] uppercase whitespace-nowrap " +
  "transition-[transform,box-shadow,background] duration-220 ease-[ease] hover:-translate-y-0.5 lte-760:w-full lte-760:whitespace-normal lte-760:text-center";

const speakers = [
  ["Matt Bowden", "Invited Guest Professor • TUD (Technological University Dublin), Ireland"],
  ["Robert Peacock", "Invited Guest Professor • Free University of South Africa, South Africa"],
  ["John Eterno", "Invited Guest Professor • Molloy University, New York, USA"],
];

export function Leadership() {
  return (
    <section
      id="sbmt-leadership-spotlight"
      aria-labelledby="sbmt-leadership-title"
      class="w-screen max-w-screen mx-[calc(50%-50vw)] overflow-hidden py-[clamp(70px,9vw,120px)] px-[22px] text-ink font-[Inter,Montserrat,Arial,sans-serif] [background:radial-gradient(circle_at_14%_8%,rgb(var(--rgb-gold)/0.14),transparent_34%),radial-gradient(circle_at_86%_14%,rgb(var(--rgb-jade)/0.10),transparent_36%),linear-gradient(180deg,var(--background-color-white)_0%,var(--color-stone)_44%,var(--background-color-white)_100%)] lte-760:py-[58px] lte-760:px-[18px]"
    >
      <div class="max-w-[1260px] mx-auto">
        <div class="inline-flex items-center gap-[10px] mb-[18px] py-2 px-[15px] rounded-full bg-stone text-pine text-[12px] font-black tracking-[0.14em] uppercase">
          Invited Guest Professors
        </div>
        <h2
          id="sbmt-leadership-title"
          class={`${serifTitle} mb-5 text-pine text-[clamp(36px,5vw,66px)] leading-[1.02] tracking-[-0.045em]`}
        >
          International academic engagement, expert sessions and hands-on training.
        </h2>
        <p class="max-w-[930px] m-0 mb-[46px] text-ink text-[clamp(17px,1.5vw,21px)] leading-[1.68]">
          Three invited guest professors are proposed to contribute to BLAIM 2027 through
          international academic engagement, expert sessions, student learning, institutional
          visibility and knowledge exchange. Their proposed contribution covers keynote and
          invited talks, expert interactions, hands-on training, research discussions,
          mentoring, and participation in the conference and associated student innovation
          activities.
        </p>
        <div class="max-w-[980px] m-0 mb-11 p-[clamp(24px,4vw,38px)] bg-ink text-white rounded-3xl shadow-[0_24px_64px_rgb(var(--rgb-ink)/0.16)] neural:border neural:border-line/30">
          <h3 class={`${serifTitle} mb-3 text-white text-[clamp(26px,3vw,40px)] leading-[1.1]`}>
            Participation is subject to institutional approval and the final programme.
          </h3>
          <p class="m-0 text-white/88 text-[16.5px] leading-[1.68]">
            Travel arrangements for the invited guest professors are subject to the applicable
            university approval and finance procedures. Final travel itinerary, class of
            travel, accommodation and budgetary details are processed through those
            procedures, and each speaker's sessions are confirmed with the final programme.
          </p>
        </div>
        {/* Invited guest professors */}
        <div class="max-w-[920px] mb-[30px]">
          <div class={sectionLabel}>Proposed Invited Speakers</div>
          <h3 class={`${serifTitle} mb-[14px] text-pine text-[clamp(32px,4vw,54px)] leading-[1.05] tracking-[-0.04em]`}>
            Three invited guest professors from Ireland, South Africa and the United States.
          </h3>
          <p class="m-0 text-ink text-[17px] leading-[1.68]">
            Each invited professor is proposed to contribute keynote or invited talks, expert
            interactions, hands-on training in their research area, research discussions and
            mentoring for students and faculty, alongside participation in the conference and
            its associated student innovation activities. Keynote and invited speakers beyond
            this list, together with the conference chair, co-chairs and organising committee,
            will be announced as confirmations arrive.
          </p>
        </div>
        <div class="grid grid-cols-1 gap-[30px] mb-[clamp(48px,7vw,80px)] gte-1041:grid-cols-3">
          {speakers.map(([name, role]) => (
            <article class={speakerCard}>
              <div class="p-[clamp(26px,4vw,36px)]">
                <h4 class={`${serifTitle} mb-[10px] text-white text-[clamp(28px,3vw,40px)] leading-[1.08] tracking-[-0.03em]`}>
                  {name}
                </h4>
                <p class={`${speakerText} font-bold`}>{role}</p>
                <p class={speakerText}>
                  Proposed contribution: keynote or invited talks, expert interactions, hands-on
                  training, research discussions and mentoring, together with participation in
                  the conference and its associated student innovation activities.
                </p>
                <div class="mt-[18px] py-[15px] px-4 bg-white/8 border-l-4 border-gold rounded-[14px] text-white/94 text-[15px] leading-[1.58]">
                  Session details, themes and workshop involvement will be published with the
                  final programme. Travel is subject to the applicable university approval and
                  finance procedures.
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* Host institution */}
        <aside class="grid grid-cols-1 gap-6 items-start p-[clamp(22px,3vw,32px)] bg-white border border-line/10 rounded-[26px] shadow-[0_22px_58px_rgb(var(--rgb-pine)/0.10)] gte-1041:grid-cols-[1fr_auto] gte-1041:items-center">
          <div>
            <div class={sectionLabel}>Host Institution</div>
            <h3 class={`${serifTitle} mb-[10px] text-pine text-[clamp(25px,3vw,36px)] leading-[1.1] tracking-[-0.03em]`}>
              Parul University, Vadodara
            </h3>
            <p class="m-0 text-ink text-[16px] leading-[1.65]">
              BLAIM 2027 is hosted at Parul University, Vadodara, India, from 27 to 29 January
              2027. The hybrid model enables international participation while retaining the
              on-campus academic and practical experience, including talks, workshops,
              demonstrations, networking, student engagement and applied research activities.
              Final venue details within the university, accommodation and travel guidance
              will be published as they are confirmed.
            </p>
          </div>
          <div class="flex flex-wrap gap-3 mt-0 lte-760:flex-col lte-760:w-full">
            <a class={`${btn} bg-pine text-white hover:bg-jade hover:text-white`} href="#blaim-programme">
              Programme Structure
            </a>
            <a
              class={`${btn} bg-gold text-on-gold shadow-[0_12px_28px_rgb(var(--rgb-gold)/0.28)] hover:text-on-gold hover:shadow-[0_18px_38px_rgb(var(--rgb-gold)/0.38)]`}
              href="/contact/"
            >
              Contact Conference Office
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
