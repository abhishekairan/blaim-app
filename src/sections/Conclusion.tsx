// Closing call to action.

const btn =
  "inline-flex items-center justify-center min-h-[52px] py-[15px] px-6 rounded-full text-[13px] font-black tracking-[0.07em] uppercase " +
  "transition-[transform,box-shadow,background] duration-220 ease-[ease] hover:-translate-y-[3px] lte-860:w-full";

const pathways = [
  [
    "Contribute Research",
    "Submit a paper, case study, panel, roundtable, workshop, innovation demonstration or poster to one or more of the nine conference themes.",
  ],
  [
    "Attend Hybrid",
    "Join on campus at Parul University, Vadodara, or online from 27 to 29 January 2027 for talks, thematic sessions and hands-on workshops.",
  ],
  [
    "Build in the Hackathon",
    "Take part in the monthly BLAIM hackathon rounds in November 2026, December 2026 and January 2027, with winning ideas showcased at the conference.",
  ],
];

export function Conclusion() {
  return (
    <section
      id="sbmt-home-conclusion"
      aria-labelledby="sbmt-home-conclusion-title"
      class="relative w-screen max-w-screen mx-[calc(50%-50vw)] overflow-hidden py-[clamp(78px,10vw,135px)] px-6 text-white font-montserrat [background:radial-gradient(circle_at_20%_12%,rgb(var(--rgb-gold)/0.16),transparent_34%),radial-gradient(circle_at_85%_22%,rgb(var(--rgb-jade)/0.40),transparent_36%),linear-gradient(135deg,var(--color-ink)_0%,var(--color-pine)_100%)] before:content-[''] before:absolute before:inset-0 before:opacity-22 before:pointer-events-none before:bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] before:bg-size-[54px_54px]"
    >
      <div class="relative z-2 max-w-[1180px] mx-auto text-center">
        <div class="mb-[18px] text-gold text-[13px] font-black tracking-[0.18em] uppercase">
          Join the Conversation
        </div>
        <h2
          id="sbmt-home-conclusion-title"
          class="max-w-[920px] mx-auto mt-0 mb-6 text-white text-[clamp(38px,6vw,78px)] leading-[1.02] tracking-[-0.055em] font-black"
        >
          Mindful minds. Smarter systems. Just futures.
        </h2>
        <p class="max-w-[920px] mx-auto mt-0 mb-6 text-stone text-[clamp(18px,1.7vw,23px)] leading-[1.68]">
          BLAIM 2027 is an international interdisciplinary conference connecting mindfulness,
          behavioural science, law, policy innovation and responsible AI to explore how
          human-centred transformation can reshape institutions and communities.
        </p>
        <p class="max-w-[860px] mx-auto mt-0 mb-[38px] text-mist text-[16.5px] leading-[1.72]">
          The conference begins from a simple but consequential proposition: systems are
          shaped by human behaviour, and human behaviour is shaped by the environments,
          institutions and technologies in which people live and work. Across its nine themes,
          BLAIM 2027 is designed to move from ideas to actionable knowledge and durable
          collaboration - generating research collaboration, institutional learning, policy
          insight and sustainable public value aligned with the United Nations Sustainable
          Development Goals.
        </p>
        <div
          class="grid grid-cols-3 gap-px max-w-[980px] mx-auto my-[42px] overflow-hidden bg-white/18 border border-white/18 rounded-3xl lte-860:grid-cols-1"
          aria-label="Three pathways to participate"
        >
          {pathways.map(([title, text]) => (
            <div class="py-7 px-[22px] bg-white/[0.075] text-center">
              <strong class="block mb-2 text-white text-[18px] font-black">{title}</strong>
              <span class="block text-mist text-[14.5px] leading-[1.55]">{text}</span>
            </div>
          ))}
        </div>
        <div class="flex flex-wrap justify-center gap-[14px] mt-[34px] lte-860:flex-col lte-860:items-stretch">
          <a
            class={`${btn} bg-gold text-on-gold shadow-[0_16px_36px_rgb(var(--rgb-gold)/0.30)] hover:text-on-gold hover:shadow-[0_22px_46px_rgb(var(--rgb-gold)/0.42)]`}
            href="#blaim-contribute"
          >
            Call for Contributions
          </a>
          <a
            class={`${btn} bg-white text-pine shadow-[0_16px_36px_rgba(0,0,0,0.18)] hover:text-pine hover:bg-stone`}
            href="#blaim-themes"
          >
            Explore the Nine Themes
          </a>
          <a
            class={`${btn} bg-transparent text-white border border-white/42 hover:text-white hover:bg-white/12`}
            href="/contact/"
          >
            Contact the Conference Office
          </a>
        </div>
        <p class="max-w-[760px] mt-7 mx-auto mb-0 text-white/74 text-[13.5px] leading-[1.65]">
          BLAIM 2027 is hosted by Parul University, Vadodara. Registration categories and
          fees, abstract deadlines and templates, the peer-review model, publication
          arrangements, the organising committee and the official conference email and social
          channels will be published on this page as they are confirmed. #BLAIM2027
        </p>
      </div>
    </section>
  );
}
