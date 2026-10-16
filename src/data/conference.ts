// All conference content, transcribed from "BLAIM-2- Brochure - 13- OCT.pdf" (docs/). Nothing here
// is invented: where the brochure has a placeholder (registration/payment links) the value is null.

export const conference = {
  shortName: "BLAIM 2.0",
  year: 2027,
  edition: "2nd International Multi-Disciplinary Conference on",
  title: "Mindfulness, Behavioural Science & Legal Innovation",
  tagline: "Gen Z for Sustainable, Just and Human-Centred Futures",
  dates: { start: "2027-01-27", end: "2027-01-30", label: "27–30 January 2027" },
  mode: "Hybrid Mode",
  organiser: "SCOPE, Parul University",
  organiserLong: "Scientific Communication, Outreach and Public Engagement (SCOPE), Parul University",
  association: [
    "Parul Institute of Law",
    "Parul Institute of Ayurved & Research",
    "Parul Institute of Pharmacy & Research",
    "Parul Institute of Medical Sciences & Research",
  ],
  venue: {
    name: "Parul University",
    address: "Parul University, P.O. Limda, Ta. Waghodia, Dist. Vadodara, Gujarat, India.",
    city: "Vadodara",
    region: "Gujarat",
    country: "IN",
  },
  contacts: {
    organising: "info@blaim.co.in",
    programme: "programme@blaim.co.in",
  },
} as const;

export const about = {
  conference: [
    "The BLAIM 2027 International Conference is a multidisciplinary platform bringing together distinguished scholars, researchers, policymakers, practitioners, and change makers from across the globe. The conference explores the intersections of mindfulness, behavioural science, psychology, criminology, social and criminal justice, legal innovation, and emerging technologies, particularly artificial intelligence (AI), fostering academic dialogue, knowledge exchange, and international collaboration.",
    "Centred on the theme “Gen Z for Sustainable, Just and Human-Centred Futures,” the conference examines the role of younger generations in shaping contemporary social, technological, and institutional landscapes. It addresses key areas including mental health and psychological resilience, human rights, youth leadership, digital governance, AI accountability, social inclusion, and sustainable innovation.",
    "Organised by Scientific Communication, Outreach and Public Engagement (SCOPE), Parul University, in association with the Faculty of Law, Faculty of Ayurved, Faculty of Pharmacy, and Faculty of Medicine, the conference reflects a commitment to interdisciplinary research and human-centred development.",
    "Through keynote addresses, expert discussions, research presentations, and workshops, BLAIM 2027 aims to promote scholarly collaboration, innovative thinking, and practical approaches to contemporary societal challenges, contributing to a more inclusive, equitable, and sustainable future.",
  ],
  aim: "BLAIM 2027 aims to foster interdisciplinary dialogue integrating mindfulness, behavioural science, legal innovation, social and criminal justice, and emerging technologies to address contemporary societal challenges. The conference seeks to bridge individual awareness and institutional transformation by promoting psychological well-being, ethical leadership, evidence-based research, and human-centred governance. Particular emphasis is placed on responsible artificial intelligence, inclusive policymaking, youth participation, and sustainable development. Aligned with the United Nations Sustainable Development Goals (SDGs), the conference aspires to encourage scholarly collaboration, practical innovation, and meaningful societal change.",
  rationale:
    "Rapid technological advancement, changing behavioural patterns, mental health concerns, social inequalities, and declining institutional trust present increasingly complex challenges that extend beyond traditional disciplinary boundaries. The growing influence of artificial intelligence on social interactions, governance, and criminal justice further raises concerns regarding ethics, accountability, privacy, and human rights. BLAIM 2027 responds to these challenges by bringing together behavioural, psychological, legal, and technological perspectives to develop integrated and evidence-informed solutions. Recognising the evolving role of Generation Z in shaping digital culture, social values, and institutional expectations, the conference encourages innovative approaches to leadership, justice, education, and public service, contributing to a more equitable, resilient, and sustainable future.",
};

export type Theme = { title: string; topics: string[] };

export const themes: Theme[] = [
  {
    title: "Behaviour, Health and Well-being",
    topics: [
      "Mental Health, Psychological Resilience and Holistic Well-being",
      "Neuroscience, Cognition and Emerging Approaches to Mental Health",
      "Digital Lifestyles, Behavioural Patterns and Emerging Health Challenges",
      "Social Relationships, Emotional Intelligence and Adaptive Coping",
      "Integrative Healthcare, Traditional Medicine and Evidence-Based Therapeutic Innovations"
    ],
  },
  {
    title: "Law, Leadership and Justice",
    topics: [
      "Youth Leadership, Governance and Democratic Participation",
      "Human Rights, Social Justice and Inclusive Legal Frameworks",
      "Crime, Digital Justice and Transformations in Criminal Justice Systems",
      "Criminal Justice Reforms, Victimology and Restorative Justice","Cybercrime, Digital Justice and Emerging Challenges in Criminal Justice Systems"
    ],
  },
  {
    title: "AI, Algorithms and Accountability",
    topics: [
      "Artificial Intelligence, Ethics and Responsible Technological Innovation",
      "Machine Learning, Intelligent Systems and Human-Centred Applications",
      "Algorithmic Governance, Digital Rights and Accountability",
      "AI-Driven Transformations in Education, Employment and Society",
      "Emerging Technologies, Cyber-security and Sustainable Digital Innovation"
    ],
  },
  {
    title: "Inclusion, Innovation and Impact",
    topics: [
      "Social Inclusion, Equity and Sustainable Development",
      "Youth-Led Innovation, Entrepreneurship and Social Transformation",
      "Inclusive Education, Economic Empowerment and Global Partnerships",
      "Environmental Sustainability, Climate Justice and Community Resilience ","Public Policy, Social Innovation and Global Partnerships for Sustainable Development"
    ],
  },
  {
    title: "Media, Mindfulness and Meaningful Futures",
    topics: [
      "Digital Media, Identity and Contemporary Youth Culture",
      "Mindfulness, Emotional Awareness and Digital Well-being",
      "Media Literacy, Misinformation and Responsible Communication",
      "Media, Crime, Justice and Public Perceptions of Social Issues",
      "Ethical Living, Sustainable Lifestyles and Future Aspirations"
    ],
  },
];

export type Person = { name: string; role?: string; org?: string; tag?: string };

export const guests: Person[] = [
  { name: "Judge", org: "Supreme Court of India", tag: "Chief Guest" },
  { name: "Judge", org: "High Court of Gujarat", tag: "Guest of Honour" },
  { name: "Dr. Praveen Patil, Padma Shri", role: "General Manager", org: "Procurement, Heritage Foods Limited, India" },
];

/** Speakers listed under each theme in the brochure (same order as the themes above). */
export const speakersByTheme: Person[][] = [
  [
    { name: "Dr. Mohammad Nami Md", role: "Associate Professor & Chair", org: "School of Health Science & Psychology, Canadian University, UAE" },
    { name: "Dr. Swapnil Chandrakant Raskar", role: "Professor and Head", org: "Department of Kaumarbhritya, Parul Institute of Ayurveda, Parul University, Gujarat, India" },
    { name: "Prof. Kamlesh Singh", role: "Professor", org: "Department of Humanities & Social Sciences, IIT Delhi, India" },
    { name: "Dr. Yogesh Thakker", role: "Assistant Clinical Professor", org: "Department of Psychiatry, University of Alberta, Canada" },
    { name: "Dr. Vikrant Pujari", role: "Head of Neurosciences", org: "Parul Institute of Medical Sciences & Research (PIMSR), Parul University, Gujarat, India" },
    { name: "Dr. Mitul Patel", role: "Consultant Medical Microbiologist", org: "Birmingham Women's & Children's NHS Foundation Trust, UK" },
    { name: "Prof. Dr. Asha Srivastava", role: "Professor of Practice and Dean", org: "School of Behavioural Forensics, NFSU, Gandhinagar, Gujarat, India" },
    { name: "Prof. Dr. Ritwik Banerjee", role: "Professor", org: "Behavioural Economics, Indian Institute of Management, Bangalore, Karnataka, India" },
    { name: "Prof. Dr. S. L. Vaya", role: "Lifetime Professor", org: "School of Behavioural Sciences and Forensic Investigations, Rashtriya Raksha University, Gujarat, India" },
    { name: "Dr. Sanjram Premjit Khanganba", role: "Professor", org: "Human-System Interaction, Human Factors & Applied Cognition Lab, IIT Indore, Madhya Pradesh, India" },
    { name: "Dr. Reshmi Gupta", role: "Associate Professor", org: "Psychology, IIT Bombay, Maharashtra, India" },
    { name: "Kirshan Kumar", role: "Additional Professor", org: "Department of Psychiatry, Post Graduate Institute of Medical Education and Research, Chandigarh, India" },
  ],
  [
    { name: "Dr. Vineet Kapoor (IPS)", role: "Deputy Inspector General of Police", org: "State Police HQ, Bhopal, Madhya Pradesh, India" },
    { name: "Shri Narasimha N. Komar (IPS)", role: "Commissioner of Police", org: "Vadodara City, Gujarat, India" },
    { name: "Prof. Dr. Beulah Shekhar", role: "Adjunct Professor", org: "Faculty of Liberal Arts, Parul University, Gujarat, India" },
    { name: "Prof. Carolyn Hoyle", role: "Professor", org: "Centre for Criminology, University of Oxford, UK" },
    { name: "Dr. Eleanor Neyroud", role: "Affiliated Lecturer", org: "Institute of Criminology, University of Cambridge, UK" },
    { name: "Prof. Dr. Gorazd Meško", role: "Professor", org: "Faculty of Criminal Justice & Security, University of Maribor, Slovenia" },
    { name: "Dr. Dawn Beichner Thomas", role: "Professor", org: "Criminal Justice Sciences Department, Illinois State University, USA" },
    { name: "Prof. Layla Skinns", role: "Professor", org: "School of Law, University of Sheffield, UK" },
    { name: "Dr. Sanja Kutnjak Ivkovich", role: "Professor", org: "School of Criminal Justice, Michigan State University, USA" },
    { name: "Prof. Dr. John Eterno", role: "Professor & Chair", org: "Criminal Justice & Legal Studies, Molloy University, USA" },
    { name: "Prof. Dr. Stephan Parmentier", role: "Emeritus Professor", org: "Leuven Institute of Criminology (LINC), KU Leuven, Belgium" },
    { name: "Prof. Dr. Robert Peacock", role: "Professor", org: "Department of Criminology, University of the Free State, South Africa" },
    { name: "Dr. Rok Hacin", role: "Associate Professor", org: "Faculty of Criminal Justice & Security, University of Maribor, Slovenia" },
    { name: "Prof. Dr. Ruwan Uduwerage-Perera", role: "Professor & Co-Director", org: "Centre for Solution-Oriented Practice, De Montfort University, UK" },
    { name: "Prof. Natti Ronel", role: "Professor", org: "Department of Criminology, Bar-Ilan University, Israel" },
  ],
  [
    { name: "Prof. Dr. Jemal H. Abawajy", role: "Professor", org: "School of Information Technology, Deakin University, Australia" },
    { name: "Prof. Veeky Baths", role: "Professor", org: "Department of Biological Sciences, BITS, Goa, India" },
    { name: "Prof. Dr. Yogendra Kumar Mishra", role: "Professor", org: "Mads Clausen Institute, University of Southern Denmark" },
    { name: "Prof. Dr. Tanmoy Chakraborty", role: "Professor", org: "Dept. of Electrical Engineering, IIT Delhi, India" },
    { name: "Dr. Sanjeev Nara", role: "Assistant Professor", org: "School of Biosciences and Bioengineering, IIT Mandi, Himachal Pradesh, India" },
    { name: "Prof. Dr. Sarangi Sarawagi", role: "Professor", org: "Department of Computer Science and Engineering, IIT Bombay, Maharashtra, India" },
  ],
  [
    { name: "Prof. Madhukarbhai S. Padvi", role: "Chairman", org: "Indian Council of Social Science Research, Delhi, India" },
    { name: "Prof. Dr. Daniel Briggs", role: "Professor", org: "Humanities and Social Sciences, Northumbria University, UK" },
    { name: "Dr. Matt Bowden", role: "Director & Senior Lecturer", org: "Technological University of Dublin, Ireland" },
    { name: "Dr. Katja Eman", role: "Associate Professor", org: "Faculty of Criminal Justice & Security, University of Maribor, Slovenia" },
    { name: "Prof. Amit Garg", role: "NIIF Chair in ESG", org: "Public Systems Group, IIM Ahmedabad, Gujarat, India" },
    { name: "Prof. Ankur Sarin", role: "Public Systems Group Economics", org: "Ravi J Matthai Centre for Education Innovation, IIM Ahmedabad, Gujarat, India" },
  ],
  [
    { name: "Dr. Ajay Umat", role: "Group Editor of Ahmedabad Mirror and NavGujarat Samay, India" },
    { name: "Shankaracharya" },
    { name: "Prof. Dr. Jyoti Belur", role: "Professor", org: "Department of Security and Crime Science, University College London, UK" },
    { name: "Prof. Carole McCartney", role: "Professor", org: "Leicester Law School, University of Leicester, England" },
    { name: "Prof. Christian Kaunert", role: "Professor", org: "International Centre for Policing and Security, University of South Wales, UK" },
    { name: "Shankaracharya" },
  ],
];

export const committees: { title: string; people: Person[] }[] = [
  {
    title: "Steering Committee",
    people: [
      { name: "Dr. Devanshu Patel", tag: "Chief Patron", role: "President", org: "Parul University, Gujarat, India" },
      { name: "Dr. Geetika Madan Patel", tag: "Patron", role: "Vice President", org: "Parul University, Gujarat, India" },
      { name: "Prof. Dr. K.S. Madhusoodanan", tag: "Patron", role: "Provost", org: "Parul University, Gujarat, India" },
    ],
  },
  {
    title: "Advisory Committee",
    people: [
      { name: "Prof. Dr. Richa Mishra", tag: "Convenor", role: "Professor & Director", org: "Scientific Communication Outreach & Public Engagement, Parul University, Gujarat, India" },
      { name: "Dr. Iype Cherian", tag: "Co-Convenor", role: "Director of Neurosciences", org: "Parul Institute of Medical Sciences & Research, Parul University, Gujarat, India" },
      { name: "Prof. Dr. Alok Verma", tag: "Co-Convenor", role: "Professor & Dean", org: "Parul Institute of Law, Parul University, Gujarat, India" },
      { name: "Dr. Pawan Dwivedi", tag: "Co-Convenor", role: "Professor and Deputy Registrar", org: "Parul University, Gujarat, India" },
      { name: "Prof. Dr. Rajesh Kesarla", tag: "Co-Convenor", role: "Professor & Dean", org: "Parul Institute of Pharmacy, Parul University, Gujarat, India" },
      { name: "Dr. Hemant D. Toshikhane", tag: "Co-Convenor", role: "Professor & Dean", org: "Faculty of Ayurved, Parul University, Gujarat, India" },
    ],
  },
  {
    title: "Conference Chairs",
    people: [
      { name: "Prof. Dr. Gorazd Meško", tag: "Conference Chair", role: "Professor", org: "Faculty of Criminal Justice & Security, University of Maribor, Slovenia" },
      { name: "Prof. Dr. Jemal H. Abawajy", tag: "Conference Chair", role: "Professor", org: "School of Information Technology, Deakin University, Australia" },
      { name: "Prof. Dr. M. R. Yadav", tag: "Conference Chair", role: "Advisor (Research)", org: "Parul Institute of Pharmacy, Parul University, Gujarat, India" },
    ],
  },
  {
    title: "Technical Committee",
    people: [
      { name: "Prof. Dr. Debarati Halder", role: "Professor, Law" },
      { name: "Dr. Rajesh Singh", role: "Associate Professor, Law" },
      { name: "Mr. Shubhank Khare", role: "Assistant Director, TPC, Law" },
      { name: "Dr. Anand Somavanshi", role: "Assistant Professor, Physics" },
      { name: "Dr. Prashant Choudhary", role: "Assistant Professor, Physics" },
      { name: "Dr. Gajendra Singh", role: "Assistant Professor, Physics" },
      { name: "Dr. Sanjiv Bhatacharya", role: "Professor, Neurologist" },
      { name: "Dr. Mukul Jain", role: "Assistant Professor, Neuroscience" },
      { name: "Dr. Sheetal Thomas", role: "Associate Professor, Management" },
      { name: "Dr. Tejal Barkhade", role: "Assistant Professor, Health" },
      { name: "Dr. Noble George", role: "Assistant Professor, Forensic Science" },
      { name: "Dr. Pranav Desai", role: "Associate Professor, Management" },
      { name: "Dr. Meenakshi Pachori", role: "Assistant Professor, Statistics" },
      { name: "Dr. Nidhi Nalwaya", role: "Associate Professor, Commerce" },
      { name: "Dr. Vijendra Nath Pathak", role: "Associate Professor, Psychology" },
    ],
  },
  {
    title: "Organising Committee",
    people: [
      { name: "Dr. Nil Patil", role: "Programme Coordinator" },
      { name: "Dr. Prashant Tiwari", role: "Programme Coordinator" },
      { name: "Kavan H. Dave", role: "Programme Coordinator" },
      { name: "Gouri S. Nair", role: "Programme Coordinator" },
      { name: "Mhd. Munavvir", role: "Programme Coordinator" },
      { name: "Krishn Verma", role: "Design" },
      { name: "Shubham Yadav", role: "Tech." },
      { name: "Abhishek Airan", role: "Tech." },
      { name: "Mohsin Mansuri", role: "Design" },
      { name: "Pratham Shamnani", role: "Media" },
      { name: "Rushikesh Talekar", role: "Media" },
      { name: "Krisha Rajai", role: "Media" },
      { name: "Vishal Zala", role: "Outreach" },
      { name: "Artik Singh", role: "Outreach" },
      { name: "MD Mujahid", role: "Outreach" },
    ],
  },
];

export const abstractGuidelines = {
  deadline: "1 November 2026",
  notice:
    "Abstracts must be submitted on or before 1st November 2026. Abstracts submitted after this date will be rejected directly without any reviews.",
  rules: [
    "Abstracts must be submitted online via the link provided below.",
    "The submission must include a title, abstract, keywords and author information.",
    "Abstracts should be structured and concise, typically containing objectives, methods, results, and conclusions. Although not all abstracts will conform to this format, they should all contain enough information to frame the problem and orient the conclusions.",
    "The abstract should be at least 200 words but not exceed 300 words.",
    "The abstract submitted can only have a maximum of three authors.",
    "The authors will receive the abstract review result on or before 10th December 2026.",
    "Please ensure that the submitted abstracts are original works and have not been previously published or presented elsewhere.",
    "Please refrain from submitting papers that are purely descriptive or merely provide an overview of a topic. Originality is highly valued, so avoid any form of plagiarism in your abstract.",
  ],
};

export const fellowship = {
  title: "BLAIM 2.0 Fellowship",
  paragraphs: [
    "BLAIM 2.0 2027 is pleased to announce fellowships for 15 dedicated full-time student participants, including undergraduate (UG) students, postgraduate (PG) students, and Ph.D./Research scholars, attending our upcoming conference. This initiative aims to support participants facing financial constraints, enabling them to engage fully in the conference without financial burden.",
    "The fellowship will cover the full conference fees and provide shared accommodation for three nights for conference only participants and 5 nights for both pre-conference workshop and conference participants. A total of 15 fellowships are available, five each under each of the categories; undergraduate (UG) students, postgraduate (PG) students, and Ph.D./Research scholars.",
    "This fellowship is designed to motivate student participants, enhance their academic knowledge, and provide an invaluable opportunity to participate in a vibrant scholarly environment.",
  ],
};

export const journals = ["Journal of Criminal Investigation and Criminology / Revija za kriminalistiko in kriminologijo"];

export type FeeRow = { category: string; early: string; late: string };

export const fees = {
  dates: "29th & 30th January 2027 (pre-workshop and hackathon: 27th & 28th January 2027)",
  indian: [
    { category: "UG/PG Students", early: "Rs. 3,000", late: "Rs. 4,000" },
    { category: "Research Scholars", early: "Rs. 3,500", late: "Rs. 4,500" },
    { category: "Faculty Members and Working Professionals", early: "Rs. 4,500", late: "Rs. 5,500" },
    { category: "Accompanying Person", early: "Rs. 3,000", late: "Rs. 4,000" },
  ] as FeeRow[],
  international: [
    { category: "UG/PG Students", early: "$60", late: "$80" },
    { category: "Research Scholars", early: "$80", late: "$100" },
    { category: "Faculty Members and Working Professionals", early: "$80", late: "$100" },
    { category: "Accompanying Person", early: "$60", late: "$80" },
  ] as FeeRow[],
  notes: [
    "Parul University faculty and students can attend the conference on special registration sent through internal mail.",
    "Participants registering under the UG/PG Students and Ph.D./Research Scholars categories must be enrolled in a full-time course at a recognised college or university. Part-time or distance education students and scholars are considered general participants and will pay the registration fee as applicable to working professionals. The conference committee reserves the right to request proof of student status or Ph.D. registration to verify eligibility.",
  ],
  workshop: {
    title: "Pre-Workshop and Hackathon Registration Fee",
    rows: [
      { category: "Indian Participants (UG/PG)", fee: "Rs. 1,000" },
      { category: "Indian Participants (Research Scholars)", fee: "Rs. 1,500" },
      { category: "International Participants", fee: "$35" },
    ],
    includes:
      "Pre-conference workshop registration fee includes access to the workshop sessions, lunch, and certificate of participation.",
    capacity: "Only 60 students and scholars are allowed on a first-come, first-served basis.",
  },
  refund:
    "The registration fee, once paid, is non-refundable and non-transferrable for both conference and pre-workshops and Hackathon.",
};

/** Links are placeholders in the brochure: null until the committee publishes them. */
export const links = {
  abstractSubmission: "/abstract-submission/" as string | null,
  conferenceRegistration: null as string | null,
  workshopRegistration: null as string | null,
  payment: {
    international: null as string | null,
    parul: null as string | null,
    indian: null as string | null,
    workshop: null as string | null,
  },
};

/** The four event days (27–28 pre-workshop and hackathon, 29–30 conference). Session-level programme not yet published. */
export const eventDays = [
  { iso: "2027-01-27", phase: "pre", label: "Pre-Workshop and Hackathon" },
  { iso: "2027-01-28", phase: "pre", label: "Pre-Workshop and Hackathon" },
  { iso: "2027-01-29", phase: "conference", label: "Conference" },
  { iso: "2027-01-30", phase: "conference", label: "Conference" },
] as const;

/** Formats named in the brochure's About text ("keynote addresses, expert discussions, research presentations, and workshops"). */
export const conferenceFormats = ["Keynote addresses", "Expert discussions", "Research presentations", "Workshops"];

export const keyDates = [
  { label: "Abstract Submission Deadline", date: "1 Nov 2026", iso: "2026-11-01" },
  { label: "Deadline for Acceptance Notification", date: "1 Dec 2026", iso: "2026-12-01" },
  { label: "Early Bird Registration Deadline", date: "25 Dec 2026", iso: "2026-12-25" },
  { label: "Late Bird Registration Deadline", date: "10 Jan 2027", iso: "2027-01-10" },
  { label: "Pre-Workshop and Hackathon", date: "27–28 Jan 2027", iso: "2027-01-27" },
  { label: "Conference", date: "29–30 Jan 2027", iso: "2027-01-29" },
];

export const host = {
  parul: {
    title: "About Parul University",
    paragraphs: [
      "A multi-disciplinary destination of learning and innovation, Parul University, situated in Vadodara, Gujarat, holds the distinction of being India's youngest private university to receive NAAC A++ accreditation (CGPA 3.55) in its first assessment cycle. Established in 2015, with institutional roots dating back to 1993, the University blends India's rich cultural heritage with modern educational practices, research, and technological advancement. Recognised as a UGC Category 1 University with Graded Autonomy and a Centre of Excellence by the Government of Gujarat, it offers over 200 academic programmes across diverse disciplines.",
      "With a vibrant academic community of over 70,500 students, including more than 6,000 international students from over 75 countries, the University fosters a globally inclusive learning environment. Its 250-acre campus, industry-integrated programmes, advanced research infrastructure, international collaborations, startup incubation initiatives, and network of over 2,200 recruiters contribute to academic excellence and professional development.",
      "Parul University has earned significant national and international recognition, ranking among the Top 50 institutions for Innovation, 41st in Pharmacy, and within the 101–150 University ranking band under NIRF 2025. It has also received the QS I-GAUGE Diamond Rating and secured a position in the QS Asia University Rankings 2026. With over 50 crore in external research funding, 545 patent filings, 10,000+ scientific publications, and more than 120 global academic collaborations, the University continues to advance interdisciplinary research, innovation, entrepreneurship, and sustainable societal development.",
    ],
    stats: [
      ["70,500+", "students"],
      ["75+", "countries represented"],
      ["250", "acre campus"],
      ["200+", "academic programmes"],
      ["A++", "NAAC accreditation"],
      ["545", "patent filings"],
    ],
    // The lists below restate the paragraphs above as structured data for the /about/ pages.
    facts: [
      ["Location", "Vadodara, Gujarat"],
      ["Established", "2015, with roots dating back to 1993"],
      ["Status", "UGC Category 1 University with Graded Autonomy"],
      ["Recognition", "Centre of Excellence, Government of Gujarat"],
    ],
    recognition: [
      ["NIRF 2025", "Top 50 institutions for Innovation"],
      ["NIRF 2025", "41st in Pharmacy"],
      ["NIRF 2025", "101–150 University ranking band"],
      ["QS I-GAUGE", "Diamond Rating"],
      ["QS Asia", "Position in the University Rankings 2026"],
      ["NAAC", "A++ (CGPA 3.55) in its first assessment cycle"],
    ],
    research: [
      ["50 crore+", "external research funding"],
      ["10,000+", "scientific publications"],
      ["120+", "global academic collaborations"],
      ["6,000+", "international students"],
      ["2,200+", "recruiters"],
    ],
  },
  scope: {
    title: "About SCOPE",
    paragraphs: [
      "SCOPE (Scientific Communication, Outreach & Public Engagement) at Parul University is an interdisciplinary initiative advancing scientific research, innovation, global collaboration and societal impact. Built on five pillars — Scientific Research & Innovation, Scientific Communication, Global Collaboration, Capacity Building, and Community Engagement — SCOPE bridges scientific discoveries with real-world applications. Its expanding ecosystem includes the Mind Lab, Sensor Development Lab, developing Neuro-Aging Lab, Ekagrata Centre for Mindfulness & Behavioural Studies, and Centre for Evidence-Based Policing & Social Innovation (CEBPSI). Through its international Mentor–Mentee (M²) Programme, SCOPE promotes interdisciplinary research, scientific outreach and knowledge exchange.",
      "Aligned with the United Nations Sustainable Development Goals (SDGs 3, 4, 9, 11, 16 and 17), SCOPE integrates neuroscience, mental health, behavioural sciences, artificial intelligence, advanced technologies, sustainability and social innovation. Inspired by MIT D-Lab's human-centred, participatory innovation approach, it encourages community-driven solutions, responsible research and sustainable development. Supporting BLAIM 2.0's vision of sustainable, just and human-centred futures, SCOPE strives to transform scientific knowledge into meaningful innovation, evidence-based policies, resilient institutions and measurable societal impact through collaborative research and public engagement.",
    ],
    pillars: [
      "Scientific Research & Innovation",
      "Scientific Communication",
      "Global Collaboration",
      "Capacity Building",
      "Community Engagement",
    ],
    ecosystem: [
      "Mind Lab",
      "Sensor Development Lab",
      "Neuro-Aging Lab (in development)",
      "Ekagrata Centre for Mindfulness & Behavioural Studies",
      "Centre for Evidence-Based Policing & Social Innovation (CEBPSI)",
      "International Mentor–Mentee (M²) Programme",
    ],
    sdgs: [3, 4, 9, 11, 16, 17],
    disciplines: [
      "Neuroscience",
      "Mental health",
      "Behavioural sciences",
      "Artificial intelligence",
      "Advanced technologies",
      "Sustainability",
      "Social innovation",
    ],
  },
  cebpsi: {
    title: "Centre for Evidence-Based Policing & Social Innovation",
    paragraphs: [
      "The Centre for Evidence-Based Policing and Social Innovation (CEBPSI) at Parul University is an interdisciplinary research and policy innovation initiative developed in collaboration with the Vadodara Police Commissionerate to bridge academic research, policing practice, and community engagement. Drawing inspiration from internationally recognised approaches advanced by the Cambridge Centre for Evidence-Based Policing, the Center for Problem-Oriented Policing at Arizona State University, and the George Mason University Center for Evidence-Based Crime Policy, CEBPSI seeks to translate scientific evidence into ethical, effective, and socially responsive policing practices.",
      "Integrating Parul University's research strengths in Criminology, Law, Behavioural Sciences, Psychology, Artificial Intelligence, Data Analytics, Forensic Sciences, and Social Innovation, the Centre focuses on crime prevention, police–community trust, victim-centred justice, cybercrime, officer mental well-being, and responsible technological innovation. Through collaborative field research, community safety assessments, capacity-building programmes, policy dialogues, and evidence-informed interventions, CEBPSI aims to develop context-sensitive solutions for contemporary challenges in policing and governance.",
      "Aligned with BLAIM 2.0's vision of sustainable, just, and human-centred futures, the Centre aspires to become a nationally significant platform for police–academia–community collaboration, contributing to SDG 16 (Peace, Justice and Strong Institutions) and advancing inclusive, accountable, and research-driven public safety.",
    ],
    partner: "Vadodara Police Commissionerate",
    focus: [
      "Crime prevention",
      "Police–community trust",
      "Victim-centred justice",
      "Cybercrime",
      "Officer mental well-being",
      "Responsible technological innovation",
    ],
    strengths: [
      "Criminology",
      "Law",
      "Behavioural Sciences",
      "Psychology",
      "Artificial Intelligence",
      "Data Analytics",
      "Forensic Sciences",
      "Social Innovation",
    ],
    methods: [
      "Collaborative field research",
      "Community safety assessments",
      "Capacity-building programmes",
      "Policy dialogues",
      "Evidence-informed interventions",
    ],
    inspirations: [
      "Cambridge Centre for Evidence-Based Policing",
      "Center for Problem-Oriented Policing, Arizona State University",
      "Center for Evidence-Based Crime Policy, George Mason University",
    ],
  },
};

export const vadodara = {
  intro:
    "Vadodara, known as Gujarat's cultural capital, features a compact map of tourist places centered around regal heritage, lush gardens, and spiritual spots. Top attractions include the magnificent Laxmi Vilas Palace, Sayaji Baug Zoo, and the unique EME Temple, all located within the city, with the UNESCO site Champaner-Pavagadh nearby.",
  city: [
    ["Laxmi Vilas Palace", "A sprawling Indo-Saracenic royal residence known for its architecture and museum, located in the heart of the city."],
    ["Sayaji Baug (Kamati Baug)", "A vast garden containing the Baroda Museum, Picture Gallery, and a zoo."],
    ["EME Temple (Dakshinamurti Temple)", "A modern, geodesic-style temple managed by the Indian Army."],
    ["Sursagar Lake", "A central lake featuring a 120-foot statue of Lord Shiva."],
    ["Maharaja Fateh Singh Museum", "Houses a significant collection of royal art and artifacts."],
    ["Kirti Mandir", "A cenotaph dedicated to the Gaekwad dynasty."],
    ["Mandvi Gate", "A historic monument located in the old city area."],
    ["Tapovan Temple", "A serene temple complex."],
  ],
  /** [name, description, distance from Vadodara as printed on the brochure map] */
  dayTrips: [
    ["Champaner-Pavagadh Archaeological Park", "A UNESCO World Heritage site with fortresses and temples.", "50 km"],
    ["Statue of Unity", "The world's tallest statue, located about 90 km from Vadodara.", "90 km"],
    ["Akshardham Temple, Gandhinagar", "", "140 km"],
    ["Jambughoda Wildlife Sanctuary", "", "50 km"],
    ["Saputara", "", "280 km"],
  ],
  recreation: [
    ["Inorbit Mall", "Major shopping destination."],
    ["Ajwa Water Park", "Popular recreational spot."],
    ["Baroda Prints", "Recommended for local textile shopping."],
  ],
};

export const hotels = {
  intro:
    "Whether you're visiting for a conference at Parul University or exploring other nearby locations, we have a thoughtfully curated selection of comfortable and convenient hotels to meet all your needs. Our list includes accommodations that cater to various preferences, ensuring that every guest finds a place that suits their taste and budget.",
  rows: [
    { name: "Vadpadrka Hotel and Resort", stars: 3, booking: "makemytrip.com", location: "Near Parul University, Vaghodia" },
    { name: "Divydrashti Resorts", stars: 3, booking: "goibibo.com", location: "Vaghodia, Gujarat" },
    { name: "Hotel Surya Palace", stars: 4, booking: "", location: "Vadodara (approx. 20 km from Vaghodia)" },
    { name: "Vivanta Vadodara", stars: 5, booking: "vivantahotels.com", location: "Vadodara city center (close to Vaghodia)" },
  ],
  why: [
    "Convenient access to conference venues",
    "Business-friendly amenities: Wi-Fi, meeting rooms, transfers",
    "Comfortable stay with dining and leisure options",
    "Close to attractions like Laxmi Vilas Palace and Sayaji Garden",
  ],
};
