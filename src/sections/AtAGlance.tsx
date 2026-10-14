// "Conference at a Glance": aim, format and the cross-cutting principle.

const card =
  "bg-white/92 border border-line/14 border-t-[6px] rounded-3xl shadow-[0_22px_60px_rgb(var(--rgb-pine)/0.10)] p-[clamp(26px,4vw,42px)]";
const label =
  "inline-flex items-center gap-2 border rounded-full py-2 px-[13px] mb-[18px] text-[12px] font-extrabold tracking-[0.08em] uppercase";
const cardTitle =
  "m-0 mb-[14px] text-pine text-[clamp(25px,3vw,36px)] leading-[1.12] tracking-[-0.03em] font-extrabold";
const body = "m-0 mb-4 text-ink text-[16.5px] leading-[1.7]";
const bullets = "grid gap-3 list-none p-0 mt-[22px] mx-0 mb-0";
const bullet =
  "relative pl-7 text-ink text-[15.5px] leading-[1.55] before:content-['✓'] before:absolute before:left-0 before:top-0 before:text-jade before:font-black";
const buttonRow = "flex flex-wrap gap-3 lte-640:flex-col";
const btn =
  "inline-flex items-center justify-center min-h-12 py-[13px] px-[19px] rounded-full text-[13px] font-black tracking-[0.06em] uppercase whitespace-nowrap " +
  "transition-[transform,box-shadow,background] duration-220 ease-[ease] hover:-translate-y-0.5 lte-640:w-full lte-640:whitespace-normal lte-640:text-center";
const btnDark = `${btn} bg-pine text-white hover:bg-jade hover:text-white`;
const btnGold = `${btn} bg-gold text-on-gold shadow-[0_12px_28px_rgb(var(--rgb-gold)/0.28)] hover:text-on-gold hover:shadow-[0_18px_38px_rgb(var(--rgb-gold)/0.38)]`;
const btnLight = `${btn} bg-transparent text-white border border-white/42 hover:bg-white/12 hover:text-white`;

export function AtAGlance() {
  return (
    <section
      id="sbmt-identity-clarity"
      aria-labelledby="sbmt-identity-title"
      class="w-screen max-w-screen mx-[calc(50%-50vw)] py-[clamp(58px,8vw,96px)] px-[22px] text-ink font-montserrat bg-[radial-gradient(circle_at_15%_10%,rgb(var(--rgb-gold)/0.14),transparent_32%),radial-gradient(circle_at_85%_20%,rgb(var(--rgb-jade)/0.12),transparent_34%),linear-gradient(180deg,var(--background-color-white)_0%,var(--color-stone)_100%)] lte-640:py-[54px] lte-640:px-[18px]"
    >
      <div class="max-w-[1220px] mx-auto">
        <div class="mb-[14px] text-jade text-[13px] font-extrabold tracking-[0.16em] uppercase">
          Conference at a Glance
        </div>
        <h2
          id="sbmt-identity-title"
          class="m-0 mb-5 text-pine text-[clamp(34px,5vw,58px)] leading-[1.05] tracking-[-0.04em] font-extrabold"
        >
          BLAIM 2027 connects inner transformation with external systems: policy, law,
          governance, behaviour and technology.
        </h2>
        <p class="max-w-[940px] m-0 mb-9 text-ink text-[clamp(17px,1.55vw,21px)] leading-[1.65]">
          The 2nd International Conference on Mindfulness, Behavioural Science &amp; Legal
          Innovation (BLAIM2 - 2027) is hosted by Parul University, Vadodara, from 27 to 29
          January 2027 as a three-day hybrid conference. It is international,
          interdisciplinary, research-led, practice-oriented and future-facing, with
          responsible AI as a cross-cutting enabler and challenge.
        </p>
        <div class="grid grid-cols-[1.1fr_0.9fr] gap-[26px] items-stretch lte-980:grid-cols-1">
          {/* Aim and objectives */}
          <article class={`${card} border-t-pine`}>
            <div class={`${label} bg-stone text-pine border-line/14`}>
              Aim &amp; Objectives
            </div>
            <h3 class={cardTitle}>From personal awareness to collective and systemic transformation.</h3>
            <p class={body}>
              The aim of BLAIM 2027 is to foster a global, interdisciplinary dialogue that
              integrates mindfulness, behavioural science, legal innovation, social and
              criminal justice, and emerging technologies to address complex societal
              challenges and contemporary risks affecting quality of life.
            </p>
            <p class={body}>
              BLAIM 2027 is a meeting point for scholars, practitioners, policymakers,
              researchers and changemakers working at the intersection of human awareness,
              behavioural science, legal innovation and emerging technology. The conference
              seeks to bridge the gap between personal development and collective, systemic
              transformation by:
            </p>
            <ul class={bullets}>
              <li class={bullet}>
                Encouraging research and practice that link individual awareness with
                institutional change.
              </li>
              <li class={bullet}>
                Exploring human-centred and ethically grounded solutions for public policy,
                legal systems and governance.
              </li>
              <li class={bullet}>
                Advancing collaborative, evidence-based approaches to innovation that promote
                well-being, equity and resilience.
              </li>
              <li class={bullet}>
                Connecting policy, law and institutional design with behavioural insight,
                mindfulness and responsible technology.
              </li>
              <li class={bullet}>
                Creating pathways for research to inform practice, regulation, public service
                and community action.
              </li>
            </ul>
            <div class={`${buttonRow} mt-6`}>
              <a class={btnDark} href="#blaim-themes">
                Explore the Nine Themes
              </a>
              <a class={btnDark} href="#blaim-programme">
                View Programme Structure
              </a>
            </div>
          </article>
          {/* Format, dates and working mode */}
          <aside class={`${card} border-t-gold`}>
            <div class={`${label} bg-gold/24 text-pine border-gold/55`}>
              Format, Dates &amp; Working Mode
            </div>
            <h3 class={cardTitle}>Hybrid participation: on campus in Vadodara or online.</h3>
            <p class={body}>
              The hybrid model is a core part of the conference design. Participants may
              engage in person at Parul University or join online, with talks, interaction,
              selected programme activities and knowledge resources designed for both
              audiences.
            </p>
            <ul class={bullets}>
              <li class={bullet}>Confirmed dates: 27, 28 and 29 January 2027.</li>
              <li class={bullet}>Format: hybrid - physical and online participation.</li>
              <li class={bullet}>Venue: Parul University, Vadodara, India.</li>
              <li class={bullet}>Duration: three days, with nine themes distributed across the programme.</li>
              <li class={bullet}>Host institution: Parul University, Vadodara.</li>
            </ul>
            <div class={`${buttonRow} mt-6`}>
              <a class={btnGold} href="#blaim-contribute">
                Call for Contributions
              </a>
            </div>
            <p class="mt-[14px] mx-0 mb-4 text-jade text-[13px] leading-[1.55]">
              Registration categories, fees, abstract deadlines and submission templates will
              be published once confirmed by the conference committee.
            </p>
          </aside>
        </div>
        {/* Cross-cutting principle */}
        <div class="grid grid-cols-[1fr_auto] gap-[22px] items-center mt-7 p-[clamp(22px,3vw,32px)] bg-ink text-white rounded-[22px] lte-980:grid-cols-1">
          <div>
            <h3 class="m-0 mb-[10px] text-white text-[clamp(23px,3vw,34px)] leading-[1.12] tracking-[-0.03em] font-extrabold">
              Cross-cutting principle: responsible innovation.
            </h3>
            <p class="m-0 text-mist text-[16.5px] leading-[1.7]">
              Technology and institutional change should be designed around human dignity,
              evidence, accountability, inclusion and measurable public value. The core
              conference question is this: how can mindful human development, behavioural
              science and legal innovation work together - supported by responsible AI - to
              improve the way people, institutions and communities respond to contemporary
              risks?
            </p>
          </div>
          <div class={`${buttonRow} mt-0 lte-980:mt-2`}>
            <a class={btnGold} href="#blaim-hackathon">
              BLAIM Hackathon
            </a>
            <a class={btnLight} href="/contact/">
              Contact the Conference Office
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
