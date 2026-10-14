// Hero + conference overview: pathway, pillars, themes, SDGs, hackathon and audience.
// Dark sections use white text on Ink/Pine; "light" sections (pillars, SDGs, audience) use Pine/Ink on Stone/Mist.

const wrap = "w-[min(1180px,calc(100%-40px))] mx-auto lte-640:w-[min(100%-28px,1180px)]";
const section = "relative w-full max-w-full py-[clamp(64px,8vw,110px)]";
const sectionHead = "max-w-[870px] mb-[clamp(30px,5vw,54px)]";
const eyebrow = "mt-0 mb-[14px] text-[0.78rem] font-extrabold tracking-[0.16em] uppercase";
const h2 = "mt-0 text-[clamp(2rem,4.3vw,4rem)] leading-[1.05] tracking-[-0.045em] font-black text-balance";
// Font size is kept separate: two font-size utilities on one element resolve by Tailwind's sort order, not class order.
const h3Base = "mt-0 leading-[1.15] tracking-[-0.025em] font-[850]";
const h3 = `${h3Base} text-[clamp(1.25rem,2vw,1.65rem)]`;
const lede = "max-w-[780px] mt-0 text-[clamp(1.08rem,1.55vw,1.32rem)] leading-[1.75]";
const btnRow = "flex flex-wrap gap-[14px] mt-7";
const btn =
  "inline-flex items-center justify-center gap-[10px] min-h-[52px] py-[15px] px-[22px] rounded-full border text-[0.86rem] font-[850] tracking-[0.08em] uppercase " +
  "transition-[transform,background,border-color,box-shadow] duration-220 ease-[ease] hover:-translate-y-0.5 focus-visible:-translate-y-0.5 lte-640:w-full";
const primaryShadow =
  "shadow-[0_16px_40px_rgb(var(--rgb-gold)/0.23)] hover:shadow-[0_22px_56px_rgb(var(--rgb-gold)/0.38)] focus-visible:shadow-[0_22px_56px_rgb(var(--rgb-gold)/0.38)]";

// On dark sections
const btnPrimary = `${btn} bg-gold text-on-gold border-gold hover:text-on-gold hover:border-white focus-visible:border-white ${primaryShadow}`;
const btnDark = `${btn} bg-white/10 text-white border-white/34 hover:text-white hover:border-white focus-visible:border-white`;
// On light sections
const btnPrimaryLight = `${btn} bg-gold text-on-gold border-gold hover:text-on-gold hover:border-jade focus-visible:border-jade ${primaryShadow}`;
const btnDarkLight = `${btn} bg-pine text-white border-pine hover:text-white hover:bg-jade hover:border-jade focus-visible:bg-jade focus-visible:border-jade`;

const pillarCard =
  "relative overflow-hidden min-h-[360px] p-[30px] border border-line/14 rounded-3xl bg-white shadow-[0_18px_50px_rgb(var(--rgb-pine)/0.10)] " +
  "before:content-[''] before:absolute before:inset-0 before:h-[6px]";
const pillarLabel =
  "inline-flex mb-5 py-2 px-3 rounded-full bg-mist text-pine text-[0.73rem] font-[850] tracking-[0.12em] uppercase";
const pillarTitle = `${h3Base} mb-[18px] text-pine text-[clamp(1.55rem,2.4vw,2.15rem)]`;
const pillarWord = "absolute left-[30px] bottom-[26px] text-pine text-[0.82rem] font-black tracking-[0.16em] uppercase";

const step = "grid grid-cols-[46px_1fr] gap-4 items-start p-[18px] border border-white/16 rounded-[18px] bg-white/5";
const stepNum = "grid place-items-center w-[46px] h-[46px] rounded-full bg-gold text-on-gold font-[950]";
const stepTitle = `${h3Base} mb-1 text-white text-[1.15rem]`;
const stepText = "mt-0 mb-0 text-mist";

const themeCard = "min-h-0 p-[22px] border border-white/16 rounded-[20px] bg-white/6";
const themeNum =
  "inline-flex items-center justify-center w-[34px] h-[34px] mb-4 rounded-full bg-gold/16 text-gold font-black";
const themeTitle = `${h3Base} mb-[10px] text-white text-[1.12rem]`;
const themeText = "mt-0 mb-0 text-mist text-[0.98rem]";

const sdgItem = "py-[22px] px-[18px] border border-line/16 rounded-[18px] bg-stone text-center";
const sdgNum = "block text-pine text-[2rem] leading-none font-[950]";
const sdgText = "block mt-3 text-ink text-[0.84rem] font-bold";

const metric = "min-h-[125px] p-6 bg-ink/72 backdrop-blur-[8px]";
const metricValue = "block text-white text-[clamp(1.8rem,3vw,2.7rem)] leading-none font-black tracking-[-0.04em]";
const metricLabel = "block mt-3 text-mist text-[0.82rem] font-extrabold tracking-[0.11em] uppercase";

const audienceCard =
  "p-[30px] border border-line/14 rounded-3xl bg-white shadow-[0_18px_50px_rgb(var(--rgb-pine)/0.08)]";

const themes = [
  {
    title: "Human Development, Victim Support & Mindfulness",
    text: "Mindfulness-based interventions for institutional transformation and community well-being; trauma-informed and victim-centred frameworks; mental health in high-stress professions such as policing, the judiciary, prisons and healthcare; self-regulation, compassion, empathy and professional resilience; mindfulness in education and youth development.",
  },
  {
    title: "Deviance, Conflict & Societal Transformation",
    text: "Deviance, conflict resolution, restorative practices and self-help strategies across urban and rural contexts; polarisation, misinformation and trust-building; risk assessment, resilience-building and crime prevention in digital and physical environments; community safety and social cohesion.",
  },
  {
    title: "Legal Innovation, Criminal Justice & Systemic Reform",
    text: "Innovations in criminal justice, policing, criminology and restorative justice; legal responses to cybercrime, AI misuse and transnational threats; public sector innovation and regulatory reform; access to justice, procedural fairness and institutional legitimacy; alternative dispute resolution and justice-system redesign.",
  },
  {
    title: "Artificial Intelligence, Social Control & Human-Centred Innovation",
    text: "Ethical, legal and behavioural implications of AI in decision-making and public policy; AI in policing, crime prevention and public/private security; AI in legal, educational and governance systems; AI for social good in health, justice, education and sustainability; human oversight, transparency, explainability and accountability.",
  },
  {
    title: "Ethics, Human Rights & Democratic Values",
    text: "Human rights in the age of AI and automated decision-making; institutional trust, transparency and accountability; ethical frameworks for digital transformation and behavioural interventions; privacy, autonomy, dignity and non-discrimination; democratic participation and legitimacy in technology-enabled societies.",
  },
  {
    title: "Global Governance, Sustainability & Well-Being",
    text: "Sustainability initiatives, climate action and ecological well-being; global cooperation on digital, environmental and social risks; resilient communities and green governance in times of crisis; policy innovation for long-term social and environmental resilience; well-being as a dimension of sustainable public value.",
  },
  {
    title: "Leadership, Organisations & Public Service Transformation",
    text: "Mindful leadership and organisational well-being; public administration development and service delivery innovation; workplace well-being, mental health, burnout prevention and compassionate management; ethical leadership and reflective decision-making; behavioural insights for better public services.",
  },
  {
    title: "Digital Citizenship, Media Literacy & Social Cohesion",
    text: "Behavioural and legal responses to misinformation and digital manipulation; media literacy, critical thinking and civic empowerment; digital citizenship and inclusive online communities; platform governance, online safety and social trust; resilience against manipulation and polarisation.",
  },
  {
    title: "Methodological Innovation",
    text: "Mixed-methods research in behavioural, legal and criminal justice studies; experimental design in behavioural science and public policy; data ethics, privacy and responsible research practices; participatory and community-based methods; AI-assisted research, reproducibility and transparency.",
  },
];

const sdgs = [
  ["3", "Good Health and Well-Being: mindfulness, mental well-being, trauma-informed practice, workplace well-being and resilient communities"],
  ["4", "Quality Education: mindful learning, media literacy, critical thinking, research capacity and inclusive digital education"],
  ["5", "Gender Equality: human rights, inclusive institutions and equitable access to justice and public services"],
  ["10", "Reduced Inequalities: equity in justice, technology access, public services and human-centred innovation"],
  ["11", "Sustainable Cities and Communities: community well-being, social cohesion, resilience and urban/rural approaches to safety and conflict"],
  ["13", "Climate Action: climate governance, ecological well-being and resilience under conditions of global risk"],
  ["16", "Peace, Justice and Strong Institutions: rule of law, access to justice, accountable institutions, social trust and responsible digital governance"],
  ["17", "Partnerships for the Goals: international, interdisciplinary and cross-sector collaboration"],
];

const pathway = [
  ["Inner awareness", "Mindfulness, self-regulation, attention, reflective practice, resilience and ethical awareness."],
  ["Behaviour and relationships", "Decision-making, conflict, trust, communication, social behaviour, victim support and community interaction."],
  ["Institutions and law", "Policy, regulation, policing, courts, public administration, governance, organisational systems and accountability."],
  ["Technology and futures", "AI, digital citizenship, automation, cyber risk, data ethics, sustainability and future-ready institutions."],
];

export function Overview() {
  return (
    <div
      id="sbmt-home-v3"
      class="w-screen max-w-screen mx-[calc(50%-50vw)] overflow-x-hidden bg-ink text-white font-inter leading-[1.6]"
    >
      <section
        class="relative isolate flex items-center w-full max-w-full min-h-[min(850px,88vh)] overflow-hidden pt-[clamp(100px,13vw,170px)] pb-[clamp(70px,8vw,120px)] bg-pine before:content-[''] before:absolute before:inset-0 before:-z-3 before:[background:radial-gradient(circle_at_72%_34%,rgb(var(--rgb-gold)/0.16),transparent_28%),linear-gradient(90deg,rgb(var(--rgb-pine)/0.96)_0%,rgb(var(--rgb-pine)/0.90)_38%,rgb(var(--rgb-pine)/0.68)_72%,rgb(var(--rgb-pine)/0.86)_100%),linear-gradient(180deg,rgb(var(--rgb-pine)/0.42)_0%,rgb(var(--rgb-pine)/0.90)_100%)] after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[180px] after:-z-2 after:bg-[linear-gradient(180deg,transparent,var(--color-ink))]"
        aria-label="BLAIM 2027 conference hero"
      >
        <div
          class="absolute inset-0 w-full h-full -z-5 [background:linear-gradient(135deg,rgb(var(--rgb-pine)/0.65),rgb(var(--rgb-jade)/0.2)),url('/assets/uploads/2025/08/web-1-sbmt.webp')_center/cover_no-repeat]"
          aria-hidden="true"
        ></div>
        <video
          class="absolute inset-0 w-full h-full object-cover -z-4"
          autoplay
          muted
          loop
          playsinline
          webkit-playsinline
          preload="metadata"
          aria-hidden="true"
          poster="/assets/uploads/2025/08/web-1-sbmt.webp"
        >
          <source src="/assets/uploads/2025/07/AdobeStock_1525825758.webm" type="video/webm" />
        </video>
        <div class={wrap}>
          <div class="relative max-w-[1000px] p-[34px] border-l-[3px] border-gold bg-[linear-gradient(90deg,rgb(var(--rgb-pine)/0.72),rgb(var(--rgb-pine)/0.22))] backdrop-blur-[4px] shadow-[0_20px_80px_rgba(0,0,0,0.25)] lte-640:p-6">
            <p class={`${eyebrow} text-gold`}>
              BLAIM2 · 2027 · Parul University, Vadodara · 27-29 January 2027 · Hybrid
            </p>
            <h1 class="max-w-[980px] mt-0 text-white text-[clamp(2.6rem,6.6vw,6rem)] leading-[0.98] tracking-[-0.06em] font-black text-balance text-shadow-[0_4px_34px_rgba(0,0,0,0.75),0_2px_6px_rgba(0,0,0,0.9)]">
              BLAIM 2027: Mindful minds. Smarter systems. <span class="text-gold">Just futures.</span>
            </h1>
            <p class={`${lede} text-white text-shadow-[0_2px_18px_rgba(0,0,0,0.8)]`}>
              The 2nd International Conference on Mindfulness, Behavioural Science &amp; Legal
              Innovation brings together global thinkers and practitioners to explore how
              mindfulness, behavioural science, law, public policy, institutional reform and
              responsible AI can work together to address contemporary societal risks.
            </p>
            <div class={btnRow}>
              <a class={btnPrimary} href="#blaim-themes">Explore Themes</a>
              <a class={btnDark} href="#blaim-contribute">Call for Contributions</a>
              <a class={btnDark} href="/contact/">Register Interest</a>
            </div>
            <p class="max-w-[860px] mt-6 mb-0 text-mist text-[0.96rem] text-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
              Connecting policy, law, innovation, mindfulness and AI for human-centred
              systems. Hosted by Parul University, Vadodara, as a three-day hybrid conference
              with physical and online participation.
            </p>
          </div>
          <div
            class="grid grid-cols-4 gap-px mt-[34px] overflow-hidden border border-white/16 rounded-3xl bg-white/16 lte-980:grid-cols-2 lte-640:grid-cols-1"
            aria-label="BLAIM 2027 conference facts"
          >
            <div class={metric}>
              <strong class={metricValue}>27-29</strong>
              <span class={metricLabel}>January 2027</span>
            </div>
            <div class={metric}>
              <strong class={metricValue}>3</strong>
              <span class={metricLabel}>Conference days</span>
            </div>
            <div class={metric}>
              <strong class={metricValue}>9</strong>
              <span class={metricLabel}>Conference themes</span>
            </div>
            <div class={metric}>
              <strong class={metricValue}>Hybrid</strong>
              <span class={metricLabel}>On campus + online</span>
            </div>
          </div>
        </div>
      </section>

      <section class={`${section} [background:radial-gradient(circle_at_20%_10%,rgb(var(--rgb-jade)/0.28),transparent_30%),var(--color-ink)]`}>
        <div class={`${wrap} grid grid-cols-[0.95fr_1.05fr] gap-[clamp(32px,6vw,74px)] items-start lte-980:grid-cols-1`}>
          <div>
            <p class={`${eyebrow} text-gold`}>Conference logic: from inner change to system change</p>
            <h2 class={`${h2} text-white`}>
              A four-layer pathway, connected rather than separated into isolated tracks.
            </h2>
            <p class={`${lede} text-stone`}>
              In an era marked by complexity, disruption and global uncertainty, BLAIM 2027
              fosters dialogue, insight and collaboration that bridge the gap between
              individual awareness and systemic transformation. The conference explores how
              inner transformation through mindfulness can influence external systems - legal,
              behavioural, technological and societal.
            </p>
          </div>
          <div class="p-[clamp(26px,4vw,42px)] border border-white/16 rounded-3xl bg-white/6 shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
            <div class="grid gap-3">
              {pathway.map(([title, text], i) => (
                <div class={step}>
                  <b class={stepNum}>{i + 1}</b>
                  <div>
                    <h3 class={stepTitle}>{title}</h3>
                    <p class={stepText}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section class={`${section} bg-stone`}>
        <div class={wrap}>
          <div class={sectionHead}>
            <p class={`${eyebrow} text-ink`}>Three strategic pillars</p>
            <h2 class={`${h2} text-pine`}>Human-centred. System-aware. Future-ready.</h2>
            <p class={`${lede} text-ink`}>
              BLAIM 2027 emerges in response to the need for systemic integration: societies
              face challenges - polarisation, mental health pressures, inequitable access to
              justice, trauma-informed service gaps, declining institutional trust, AI in
              social control and policing, global risks and governance deficits - that exceed
              the capacity of traditional disciplines or institutions acting alone.
            </p>
          </div>
          <div class="grid grid-cols-3 gap-[18px] lte-980:grid-cols-1">
            <article class={`${pillarCard} before:bg-jade`}>
              <span class={pillarLabel}>Pillar one</span>
              <h3 class={pillarTitle}>Human-centred</h3>
              <p class="mt-0 text-ink">
                Start with human dignity, well-being, agency, inclusion and lived realities.
                Mindfulness, contemplative practices and self-regulation are examined not as
                isolated wellness topics but as part of a wider inquiry into how human
                awareness shapes external systems and decision-making.
              </p>
              <span class={pillarWord}>Awareness</span>
            </article>
            <article class={`${pillarCard} before:bg-pine`}>
              <span class={pillarLabel}>Pillar two</span>
              <h3 class={pillarTitle}>System-aware</h3>
              <p class="mt-0 text-ink">
                Connect behaviour and inner development with law, institutions, governance and
                social conditions. The conference promotes human-centred legal and
                technological innovations aligned with behavioural insights and societal
                values, and reimagines leadership, education, justice and public service.
              </p>
              <span class={pillarWord}>Systems</span>
            </article>
            <article class={`${pillarCard} before:bg-gold`}>
              <span class={pillarLabel}>Pillar three</span>
              <h3 class={pillarTitle}>Future-ready</h3>
              <p class="mt-0 text-ink">
                Examine AI and emerging technologies with attention to ethics, accountability,
                public value and social impact - exploring responsible AI as both an object of
                regulation and a tool for public value, social good and institutional
                improvement.
              </p>
              <span class={pillarWord}>Futures</span>
            </article>
          </div>
        </div>
      </section>

      <section
        class={`${section} [background:radial-gradient(circle_at_80%_15%,rgb(var(--rgb-gold)/0.14),transparent_28%),linear-gradient(180deg,var(--color-pine),var(--color-jade))]`}
        id="blaim-themes"
      >
        <div class={wrap}>
          <div class={sectionHead}>
            <p class={`${eyebrow} text-gold`}>Conference themes</p>
            <h2 class={`${h2} text-white`}>
              Nine thematic areas create breadth while maintaining a common intellectual core.
            </h2>
            <p class={`${lede} text-stone`}>
              Contributions may be empirical, conceptual, doctrinal, mixed-methods,
              comparative, technological, qualitative, quantitative or practice-based, and are
              encouraged to make the connection between individual behaviour, institutional
              design, law, policy, technology and societal outcomes explicit.
            </p>
          </div>
          <div class="grid grid-cols-3 gap-4 lte-980:grid-cols-2 lte-640:grid-cols-1">
            {themes.map((theme, i) => (
              <article class={themeCard}>
                <span class={themeNum}>{i + 1}</span>
                <h3 class={themeTitle}>{theme.title}</h3>
                <p class={themeText}>{theme.text}</p>
              </article>
            ))}
          </div>
          <div class={btnRow}>
            <a class={btnPrimary} href="#blaim-contribute">Submit to a Theme</a>
            <a class={btnDark} href="#blaim-programme">See Themes by Day</a>
          </div>
        </div>
      </section>

      <section class={`${section} bg-mist`}>
        <div class={wrap}>
          <div class={sectionHead}>
            <p class={`${eyebrow} text-ink`}>Sustainable Development Goals</p>
            <h2 class={`${h2} text-pine`}>
              BLAIM 2027 is framed to contribute intellectually and practically to the SDG
              agenda.
            </h2>
            <p class={`${lede} text-ink`}>
              The alignment below is proposed for communications and programme design. It is
              not a claim of formal UN affiliation or endorsement.
            </p>
          </div>
          <div class="grid grid-cols-4 gap-3 mt-[30px] lte-980:grid-cols-2 lte-640:grid-cols-1">
            {sdgs.map(([goal, text]) => (
              <div class={sdgItem}>
                <strong class={sdgNum}>{goal}</strong>
                <span class={sdgText}>{text}</span>
              </div>
            ))}
          </div>
          <div class={btnRow}>
            <a class={btnDarkLight} href="#blaim-themes">Explore the Themes</a>
            <a class={btnDarkLight} href="#blaim-participate">Who the Conference Is For</a>
          </div>
        </div>
      </section>

      <section
        class={`${section} [background:linear-gradient(135deg,rgb(var(--rgb-ink)/0.92),rgb(var(--rgb-pine)/0.90)),url('/assets/uploads/2025/08/28.jpg')_center/cover_fixed]`}
        id="blaim-hackathon"
      >
        <div class={wrap}>
          <div class="max-w-[950px] p-[clamp(30px,5vw,56px)] border border-white/22 rounded-3xl bg-ink/52 backdrop-blur-[8px]">
            <p class={`${eyebrow} text-gold`}>Conference working mode</p>
            <h2 class={`${h2} text-white`}>
              A three-month thematic hackathon turns the run-up into a living laboratory.
            </h2>
            <p class={`${lede} text-stone`}>
              BLAIM 2027 uses November 2026, December 2026 and January 2027 as an active
              pre-conference innovation cycle. Each month, all nine conference themes are open
              for hackathon participation: participants may propose, build, test or
              demonstrate an idea, prototype, research intervention, policy concept,
              technology application, legal innovation, behavioural solution or social-impact
              project connected to one or more themes. At the end of each monthly round,
              submissions close and a winner - or winners, as determined by the organisers -
              receives a suitable reward or recognition. The cycle then reopens, with the
              January round planned to conclude before the main three-day programme.
            </p>
            <p class={`${lede} text-stone`}>
              The recommended operating model is a single central submission portal with theme
              tagging, short-form project summaries, monthly judging, public progress
              highlights, mentor interactions and a final BLAIM 2027 showcase during the
              conference. Exact rules, judging criteria, reward structure, mentors and
              submission deadlines are to be approved separately.
            </p>
            <div class={btnRow}>
              <a class={btnPrimary} href="#blaim-themes">See the Nine Themes</a>
              <a class={btnDark} href="/contact/">
                Ask About the Hackathon
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class={`${section} bg-stone`} id="blaim-participate">
        <div class={wrap}>
          <div class={sectionHead}>
            <p class={`${eyebrow} text-ink`}>Who the conference is for</p>
            <h2 class={`${h2} text-pine`}>
              A diverse international community, with deliberate space for dialogue between
              disciplines.
            </h2>
          </div>
          <div class="grid grid-cols-3 gap-[18px] lte-980:grid-cols-1">
            <article class={audienceCard}>
              <h3 class={`${h3} text-pine`}>Researchers and academics</h3>
              <p class="mt-0 text-ink">
                Universities, law schools, public policy and behavioural science researchers;
                doctoral researchers, early-career scholars and postgraduate students; and
                those advancing methodological innovation across behavioural, legal and
                criminal justice studies.
              </p>
              <a class={btnDarkLight} href="#blaim-contribute">
                Contribution Categories
              </a>
            </article>
            <article class={audienceCard}>
              <h3 class={`${h3} text-pine`}>Justice, policy and public service</h3>
              <p class="mt-0 text-ink">
                Legal practitioners, judges, justice-sector professionals and criminology
                experts; police, prison, corrections, victim-support and community-safety
                practitioners; public administrators, regulators, policymakers and government
                innovation teams.
              </p>
              <a class={btnPrimaryLight} href="#blaim-programme">Programme Structure</a>
            </article>
            <article class={audienceCard}>
              <h3 class={`${h3} text-pine`}>Technology, health and civil society</h3>
              <p class="mt-0 text-ink">
                AI, cybersecurity, data governance and responsible innovation specialists;
                healthcare, education, social care and mental well-being professionals; civil
                society, community organisations, social-impact practitioners and civic-sector
                leaders.
              </p>
              <a class={btnDarkLight} href="/contact/">
                Contact the Conference Office
              </a>
            </article>
          </div>
          <div class="mt-7 p-5 border-l-4 border-gold bg-white text-ink text-[0.96rem]">
            Participation principle: the conference makes room for multiple forms of
            expertise. Academic rigour, lived experience, professional practice, policy
            insight and technical knowledge can be brought into structured dialogue without
            collapsing their different evidentiary standards.
          </div>
        </div>
      </section>
    </div>
  );
}
