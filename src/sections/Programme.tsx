// Programme & participation: three-day structure, call for contributions, focus and outcomes.

const kicker = "mb-[14px] text-gold text-[13px] font-bold tracking-[0.16em] uppercase";
const card = "bg-white/7 border border-white/16 rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.32)]";
const cardBody = "p-[clamp(24px,3vw,34px)]";
const cardTitle = "m-0 mb-[14px] text-white text-[clamp(25px,3vw,36px)] leading-[1.1] tracking-[-0.03em] font-extrabold";
const cardText = "m-0 mb-[18px] text-stone text-[16px] leading-[1.65]";
const meta = "flex flex-wrap gap-[10px] mt-[22px] mb-6";
const metaTag =
  "inline-flex items-center py-2 px-3 border border-white/18 bg-white/8 text-white rounded-full text-[13px] font-bold";
const buttons = "flex flex-wrap gap-3 lte-640:flex-col";
const btn =
  "inline-flex items-center justify-center min-h-[46px] py-[13px] px-[18px] rounded-full text-[13px] font-extrabold tracking-[0.06em] uppercase " +
  "transition-[transform,box-shadow,background] duration-220 ease-[ease] hover:-translate-y-0.5 lte-640:w-full";
const btnPrimary = `${btn} bg-gold text-on-gold shadow-[0_12px_28px_rgb(var(--rgb-gold)/0.24)] hover:text-on-gold hover:shadow-[0_16px_34px_rgb(var(--rgb-gold)/0.34)]`;
const btnSecondary = `${btn} bg-transparent text-white border border-white/35 hover:text-white hover:bg-white/11`;
const panel = "grid grid-cols-1 gap-6 items-center mt-[30px] bg-white/6 border border-white/14 rounded-3xl overflow-hidden";
const panelCopy = "p-[clamp(24px,4vw,42px)]";
const panelTitle = "m-0 mb-3 text-white text-[clamp(24px,3vw,38px)] leading-[1.12] tracking-[-0.03em] font-extrabold";
const panelText = "m-0 text-stone text-[16px] leading-[1.65]";
const panelTextNext = `${panelText} mt-[14px]`;

export function Programme() {
  return (
    <section
      id="sbmt-flagship-events"
      aria-labelledby="sbmt-flagship-events-title"
      class="w-screen max-w-screen mx-[calc(50%-50vw)] overflow-hidden py-[clamp(70px,9vw,120px)] px-6 text-white font-montserrat [background:radial-gradient(circle_at_20%_10%,rgb(var(--rgb-gold)/0.12),transparent_34%),radial-gradient(circle_at_90%_20%,rgb(var(--rgb-jade)/0.35),transparent_34%),linear-gradient(180deg,var(--color-ink)_0%,var(--color-pine)_55%,var(--color-ink)_100%)] lte-640:py-16 lte-640:px-[18px]"
    >
      <div class="max-w-[1240px] mx-auto">
        <div class={kicker}>Programme &amp; Participation</div>
        <h2
          id="sbmt-flagship-events-title"
          class="m-0 mb-5 text-white text-[clamp(34px,5vw,62px)] leading-[1.05] tracking-[-0.04em] font-extrabold"
        >
          Three days, nine themes, and an open call for contributions.
        </h2>
        <p class="max-w-[850px] m-0 mb-[46px] text-stone text-[clamp(17px,1.5vw,21px)] leading-[1.65]">
          All nine conference themes are distributed across 27, 28 and 29 January 2027. Each
          day combines invited talks, research exchange and hands-on workshops, so the
          conference moves from human-centred foundations to law and AI innovation, and then
          to governance, leadership and research methods.
        </p>
        <div class="grid grid-cols-2 gap-[26px] lte-980:grid-cols-1">
          {/* Three-day structure */}
          <article class={card} id="blaim-programme">
            <div class={cardBody}>
              <h3 class={cardTitle}>Three-day theme and workshop structure</h3>
              <p class={cardText}>
                <strong>27 January 2027 - Human development, behaviour &amp; values.</strong>{" "}
                Human Development, Victim Support &amp; Mindfulness; Deviance, Conflict &amp;
                Societal Transformation; Ethics, Human Rights &amp; Democratic Values.
                Workshops: mindfulness and resilience practice; victim-centred and restorative
                methods; ethical decision-making exercises.
              </p>
              <p class={cardText}>
                <strong>28 January 2027 - Law, AI &amp; digital society.</strong>{" "}
                Legal Innovation, Criminal Justice &amp; Systemic Reform; Artificial
                Intelligence, Social Control &amp; Human-Centred Innovation; Digital
                Citizenship, Media Literacy &amp; Social Cohesion. Workshops: AI-in-law and
                policy lab; responsible AI case exercises; misinformation and digital-literacy
                workshop.
              </p>
              <p class={cardText}>
                <strong>29 January 2027 - Governance, leadership &amp; research innovation.</strong>{" "}
                Global Governance, Sustainability &amp; Well-Being; Leadership, Organisations
                &amp; Public Service Transformation; Methodological Innovation. Workshops:
                governance simulation; mindful leadership and service design; mixed-methods
                and research-design clinic.
              </p>
              <p class={cardText}>
                The detailed programme is to be determined by the organising committee. The
                practical model includes an opening plenary, a cross-disciplinary plenary
                dialogue, parallel thematic sessions, policy and law roundtables, applied
                workshops, an innovation and AI showcase, a young researchers forum, and a
                closing synthesis.
              </p>
              <div class={meta}>
                <span class={metaTag}>27-29 January 2027</span>
                <span class={metaTag}>Nine themes</span>
                <span class={metaTag}>Hybrid sessions</span>
              </div>
              <div class={buttons}>
                <a class={btnPrimary} href="#blaim-themes">
                  Explore the Themes
                </a>
                <a class={btnSecondary} href="#blaim-contribute">
                  Call for Contributions
                </a>
              </div>
            </div>
          </article>
          {/* Call for contributions */}
          <article class={card} id="blaim-contribute">
            <div class={cardBody}>
              <h3 class={cardTitle}>Call for contributions</h3>
              <p class={cardText}>
                BLAIM 2027 welcomes original research, interdisciplinary scholarship, applied
                practice, policy analysis, case studies, innovation demonstrations and
                reflective practitioner perspectives that speak to one or more conference
                themes.
              </p>
              <p class={cardText}>
                <strong>Suggested contribution categories:</strong>{" "}
                full research papers; research-in-progress papers; practice and policy case
                studies; doctoral and early-career research presentations; panel proposals;
                roundtable proposals; workshops and applied masterclasses; technology and AI
                innovation demonstrations; poster or visual research presentations.
              </p>
              <p class={cardText}>
                <strong>A strong BLAIM contribution shows:</strong>{" "}
                a clear research or practice problem; a credible method, framework or evidence
                base; an interdisciplinary connection where relevant; implications for policy,
                law, behaviour, institutions, technology or community practice; and attention
                to ethics, human dignity and responsible innovation where applicable.
              </p>
              <p class={cardText}>
                Exact abstract length, paper format, review method, submission platform,
                deadlines and publication arrangements will be published once the conference
                committee confirms them.
              </p>
              <div class={meta}>
                <span class={metaTag}>Nine contribution formats</span>
                <span class={metaTag}>Peer review to be confirmed</span>
                <span class={metaTag}>Deadlines to be announced</span>
              </div>
              <div class={buttons}>
                <a class={btnPrimary} href="/contact/">
                  Contact the Conference Office
                </a>
                <a class={btnSecondary} href="#blaim-hackathon">
                  Join the BLAIM Hackathon
                </a>
              </div>
            </div>
          </article>
        </div>
        {/* Cross-cutting focus panel */}
        <div class={panel}>
          <div class={panelCopy}>
            <div class={kicker}>Cross-cutting Focus</div>
            <h3 class={panelTitle}>Translational neuroscience and neurotechnology as an additional focus.</h3>
            <p class={panelText}>
              Alongside the nine core themes, BLAIM 2027 carries a translational neuroscience
              and neurotechnology dimension that connects research, clinical practice, policy,
              innovation and responsible technology - bringing together physicians,
              neurosurgeons, engineers, researchers, policymakers, venture capitalists,
              philanthropists, patient advocates and industry leaders to fast-track
              therapeutics for neurological disorders.
            </p>
            <p class={panelTextNext}>
              Focus areas include brain mapping (intraoperative mapping, multimodality
              imaging, infrared thermography, UV and multispectral imaging, navigation);
              artificial intelligence and predictive modeling; nanoneuroscience;
              neuro-oncology; brain-computer interfaces; advanced computing (quantum,
              neuromorphic and supercomputing, AR/VR, advanced ultrasonic technology);
              cellular therapeutics; medical devices and clinical translation; and
              translational neuroscience.
            </p>
            <p class={panelTextNext}>
              Proposals may connect these areas with the nine core themes - for example AI
              ethics, legal innovation, public policy, human well-being, responsible medical
              devices, data governance and equitable access to healthcare innovation.
            </p>
          </div>
        </div>
        {/* Expected outcomes */}
        <div class={panel}>
          <div class={panelCopy}>
            <div class={kicker}>Expected Outcomes</div>
            <h3 class={panelTitle}>Usable knowledge, new collaborations and practical pathways.</h3>
            <p class={panelText}>
              Research papers are targeted for publication through University of Maribor
              Press, subject to editorial, peer-review and publication processes. The
              conference also delivers talks and expert sessions at Parul University, press
              and public-relations visibility around invited guests and conference activity,
              and hands-on training from invited guests in their respective research areas for
              students and faculty.
            </p>
            <p class={panelTextNext}>
              Further intended outcomes include new interdisciplinary research questions and
              collaborative projects; policy and legal insights that can inform regulatory and
              institutional reform; practice-oriented tools, frameworks and models for
              well-being, justice and public service; knowledge exchange on responsible and
              human-centred AI; and an enduring digital knowledge environment that keeps
              conference outputs accessible after the event.
            </p>
            <p class={panelTextNext}>
              Potential post-conference outputs: an edited academic volume or special issue; a
              policy brief series or conference policy compendium; practice notes and toolkits
              for institutions and professionals; recorded plenary or selected sessions,
              subject to consent and production arrangements; and a curated digital repository
              of abstracts, presentations, resources and conference highlights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
