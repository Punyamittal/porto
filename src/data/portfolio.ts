export const SITE = {
  name: "Punya Mittal",
  shortName: "PUNYA",
  title: "Full-Stack × AI Builder",
  subtitle:
    "Student at VIT · Founder @Y-SoC · Building AI systems that ship to the real world",
  email: "via LinkedIn / GitHub",
  location: "Greater Delhi Area / VIT Chennai",
  resumeUrl: "https://github.com/punyamittal",
  headline:
    "Student at VIT | Intern @JBN Technologies | Former @ANNAM.ai @Analytx4t | Co-founder @HackFinity @AUTOMATA | Founder @Y-SoC | 2× Hackathon Winner | Secretary @IE(I) VIT",
  social: {
    github: "https://github.com/punyamittal",
    linkedin: "https://www.linkedin.com/in/punyamittal",
    ysoc: "https://www.ysoc.in",
  },
};

export const NAV_LINKS = [
  { id: "hero", label: "HOME", href: "#hero" },
  { id: "about", label: "ABOUT", href: "#about" },
  { id: "projects", label: "WORK", href: "#projects" },
  { id: "skills", label: "SKILLS", href: "#skills" },
  { id: "experience", label: "XP", href: "#experience" },
  { id: "achievements", label: "ACHIEVE", href: "#achievements" },
  { id: "contact", label: "CONTACT", href: "#contact" },
] as const;

export const ABOUT = {
  bio: "B.Tech CSE student at VIT building at the intersection of AI, full-stack systems, and social impact. Founder of Y-SoC, co-founder of HackFinity & AUTOMATA, and a 2× hackathon winner who ships research-backed products — from agri-AI and healthcare RAG to rehab learning platforms and Formula Student optimization tools.",
  facts: [
    { label: "BASED IN", value: "Delhi / Chennai" },
    { label: "STUDIES", value: "VIT · B.Tech CSE" },
    { label: "CGPA", value: "8.6 / 10" },
    { label: "MODE", value: "Build · Ship · Lead" },
  ],
  timeline: [
    { year: "2026", event: "Full Stack Intern @ JBN · SRIP research · Hospital AI / RAG work" },
    { year: "2025", event: "Founded Y-SoC · ANNAM.AI winner · Code Red #1 · CTO @ AUTOMATA" },
    { year: "2024", event: "Started B.Tech at VIT · First GenAI workshop @ IIT Madras" },
    { year: "2010–24", event: "Sachdeva Public School · Sports Captain · CBSE" },
  ],
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AI / ML",
    "LLMs",
    "RAG",
    "AutoML",
    "MongoDB",
    "MySQL",
    "C++",
    "Java",
    "Streamlit",
    "Open Source",
  ],
};

export const PROJECTS = [
  {
    id: "rehab",
    title: "REHAB",
    description:
      "Hindi-first interactive learning platform for rehabilitation centres — games, voice nav, emotion tracking, and facilitator dashboards.",
    longDescription:
      "REHAB (सीखो और बढ़ो) tackles engagement gaps in rehab programs for underaged children. Piloted at SPYM Rehabilitation Centre, Daryaganj under MY Bharat. Emotion feedback shifted from Confused → Happy; verified by the centre and supported by the District Youth Officer, Central Delhi.",
    tech: ["EdTech", "Voice UI", "Emotion AI", "Hindi-first"],
    sticker: "HOT" as const,
    liveUrl: "#",
    githubUrl: "https://github.com/punyamittal",
    color: "#FF2D95",
    year: "2026",
  },
  {
    id: "automl-pipeline",
    title: "AUTO ML PIPELINE",
    description:
      "Autonomous ML lifecycle from natural-language idea → deployable GitHub repo. Built at Merge Conflict 48hr hackathon.",
    longDescription:
      "Context-aware problem canonicalization, multi-gate ethics/feasibility checks, semantic dataset discovery, AutoML (RF / LightGBM / XGBoost), and automated code generation. Evaluated on 33 problems: Acc/R² 0.690, F1 0.746, ~5 min E2E, 85% unsafe-task filtering. Research paper in prep with Garv Bansal & Vaibhav Raj.",
    tech: ["LLMs", "AutoML", "Python", "Responsible AI"],
    sticker: "NEW" as const,
    liveUrl: "#",
    githubUrl: "https://github.com/punyamittal",
    color: "#00A3FF",
    year: "2026",
  },
  {
    id: "gear-lab",
    title: "GEAR LAB PRO",
    description:
      "Formula Student drivetrain optimization — genetic algorithms, PSO, simulated annealing, and an AI Pit Wall.",
    longDescription:
      "Constrained multi-objective gear-ratio optimization with traction limits, event simulation (Accel / Skidpad / Autocross), voice commands, offline fallback, mobile trackside UI, and RPM-driven engine sound synthesis. A digital race engineer for FS teams.",
    tech: ["React", "Optimization", "AI", "Motorsport"],
    sticker: "HOT" as const,
    liveUrl: "#",
    githubUrl: "https://github.com/punyamittal",
    color: "#FFE600",
    year: "2026",
  },
  {
    id: "hospital-rag",
    title: "HOSPITAL RAG",
    description:
      "Knowledge base + RAG chatbot for Tirath Ram Shah Hospital; explored self-hosted LLMs on on-prem servers.",
    longDescription:
      "Worked with hospital IT on digital pen / dot-paper digitization of handwritten records, vendor workflows, and AI/ML training for handwriting. Built a RAG chatbot over hospital docs and researched private open-source LLM deployment for healthcare privacy.",
    tech: ["RAG", "LLMs", "Healthcare IT", "Knowledge Base"],
    sticker: "NEW" as const,
    liveUrl: "#",
    githubUrl: "https://github.com/punyamittal",
    color: "#39FF14",
    year: "2026",
  },
  {
    id: "kai",
    title: "KAI",
    description:
      "Emotion-aware AI companion with hormonal modeling, memory, ethical boundaries, and hybrid rule + LLM architecture.",
    longDescription:
      "Kai simulates emotions, long-term memory, personality, and regulation — designed to feel less like a chatbot and more like a digital personality. Explores human-centric applied AI research.",
    tech: ["LLMs", "Python", "Memory Systems", "Ethics"],
    sticker: "BETA" as const,
    liveUrl: "#",
    githubUrl: "https://github.com/punyamittal",
    color: "#00A3FF",
    year: "2025",
  },
  {
    id: "llm-security",
    title: "LLM GUARD",
    description:
      "Production-grade AI security layer detecting prompt injection, jailbreaks, and fraud-style misuse.",
    longDescription:
      "Defense-in-depth: ML detector on 100k+ prompts, rule filters, benign whitelisting, confidence escalation. ~99–100% recall, <2% FN, >50% FP reduction. Hybrid verdict engine for agent/tool safety.",
    tech: ["ML", "LLM Security", "Python", "Cybersecurity"],
    sticker: "HOT" as const,
    liveUrl: "#",
    githubUrl: "https://github.com/punyamittal",
    color: "#FF2D95",
    year: "2025",
  },
  {
    id: "crisproots",
    title: "CRISPROOTS",
    description:
      "AgroTwin Nexus — AI precision agriculture project from ANNAM.AI / IIT Ropar internship.",
    longDescription:
      "Redesigning Indian agriculture with AI-powered precision: gene-editing insights + real-time digital twin ecosystems for sustainable farming. Featured on Annam AI's official blog.",
    tech: ["AgriTech", "AI", "Digital Twins", "Sustainability"],
    sticker: "NEW" as const,
    liveUrl: "https://annam.ai/blog/",
    githubUrl: "https://github.com/punyamittal",
    color: "#39FF14",
    year: "2025",
  },
  {
    id: "fated",
    title: "FATED.CHAT",
    description:
      "University blind-dating platform with form-driven compatibility scoring — 400+ students onboarded.",
    longDescription:
      "Campus-closed network where matches come from structured compatibility forms, not photo-first swipes. Experiment in engineering meaningful connections for university students.",
    tech: ["Full Stack", "Matching", "Campus Product"],
    sticker: "BETA" as const,
    liveUrl: "#",
    githubUrl: "https://github.com/punyamittal",
    color: "#FF2D95",
    year: "2025",
  },
  {
    id: "envirolink",
    title: "ENVIROLINK",
    description:
      "Sustainability web platform for eco-conscious living — SPECTRUM'25 finalist (30 / 2000+).",
    longDescription:
      "Built with Team SustainLabs (Ayush, Amrithesh, Shreyas). Interactive habit-tracking and eco features showcased at SPECTRUM'25 by V-NEST & CSED, VIT Chennai.",
    tech: ["Web", "Sustainability", "React"],
    sticker: "NEW" as const,
    liveUrl: "#",
    githubUrl: "https://github.com/punyamittal",
    color: "#39FF14",
    year: "2025",
  },
  {
    id: "ysoc",
    title: "Y-SOC",
    description:
      "Youth Season of Code — student-led open-source program with mentorship, projects, and global community.",
    longDescription:
      "Founded Y-SoC to help students go from idea → impact. 1000+ entries, top 20% selected, 60+ GitHub projects, workshops, hackathons, and partnerships (incl. GEMINATHON '26 with Google Gemini). Motto: You Code. You Create. You Collaborate.",
    tech: ["Open Source", "Community", "Leadership"],
    sticker: "HOT" as const,
    liveUrl: "https://www.ysoc.in",
    githubUrl: "https://github.com/punyamittal",
    color: "#00A3FF",
    year: "2025",
  },
];

export const SKILL_CARDS = [
  {
    id: "aiml",
    name: "AI / ML",
    rarity: "LEGENDARY" as const,
    level: 92,
    experience: "Applied research + hackathons",
    description:
      "LLMs, RAG, AutoML, agri-AI, emotion systems, and defensive ML for prompt injection.",
    related: ["AUTO ML PIPELINE", "KAI", "LLM GUARD", "CRISPROOTS"],
    color: "#00A3FF",
  },
  {
    id: "fullstack",
    name: "FULL STACK",
    rarity: "LEGENDARY" as const,
    level: 90,
    experience: "Internships + shipped products",
    description:
      "React, Node.js, APIs, MongoDB/MySQL — from campus products to enterprise internships.",
    related: ["FATED.CHAT", "Y-SOC", "GEAR LAB PRO"],
    color: "#39FF14",
  },
  {
    id: "python",
    name: "PYTHON",
    rarity: "EPIC" as const,
    level: 88,
    experience: "AI systems & tooling",
    description:
      "ML pipelines, Streamlit apps, data workflows, and research prototypes.",
    related: ["AUTO ML PIPELINE", "HOSPITAL RAG"],
    color: "#FFE600",
  },
  {
    id: "react",
    name: "REACT",
    rarity: "EPIC" as const,
    level: 88,
    experience: "Product UIs & portfolios",
    description:
      "Interactive frontends, motion-heavy portfolios, and optimization dashboards.",
    related: ["GEAR LAB PRO", "ENVIROLINK"],
    color: "#00A3FF",
  },
  {
    id: "leadership",
    name: "LEADERSHIP",
    rarity: "LEGENDARY" as const,
    level: 94,
    experience: "Founder · Secretary · Organizer",
    description:
      "Y-SoC, HackFinity, IE(I) Secretary, HackHub lead — communities, sponsors, and 500+ participant events.",
    related: ["Y-SOC"],
    color: "#FF2D95",
  },
  {
    id: "cpp",
    name: "C++ / JAVA",
    rarity: "RARE" as const,
    level: 80,
    experience: "DSA + systems foundations",
    description:
      "Problem-solving on LeetCode, Arduino/C, and core CS coursework at VIT.",
    related: ["GEAR LAB PRO"],
    color: "#68A063",
  },
];

export const EXPERIENCE = [
  {
    id: "jbn",
    company: "JBN Technologies",
    role: "Full Stack Intern",
    period: "Apr 2026 — Present",
    location: "Janakpuri, Delhi · Hybrid",
    highlights: [
      "Building real-world full-stack features with React.js and Node.js",
      "Applying classroom concepts to production product work",
      "Growing across the stack in a hybrid engineering environment",
    ],
  },
  {
    id: "iei",
    company: "IE(I) VIT Chennai",
    role: "Secretary · Student Chapter",
    period: "Dec 2025 — Present",
    location: "Chennai · On-site",
    highlights: [
      "Lead coordination of technical events, workshops, and industry initiatives",
      "Drove inauguration of the IE(I) Student Chapter with IEI KLC leadership",
      "Foster professional ethics and engineering excellence among students",
    ],
  },
  {
    id: "automata",
    company: "AUTOMATA",
    role: "Chief Technology Officer",
    period: "Nov 2025 — Jun 2026",
    location: "India · On-site",
    highlights: [
      "Lead end-to-end technical vision for EcoAI (GenAI + ML architecture)",
      "Oversee data engineering pipelines and scalable model deployment",
      "Guide engineering toward climate-resilient, product-ready AI systems",
    ],
  },
  {
    id: "ysoc",
    company: "Y-SoC",
    role: "Founder & CEO",
    period: "Sep 2025 — Jun 2026",
    location: "Chennai · On-site",
    highlights: [
      "Built a 6-month open-source program for student innovators (ysoc.in)",
      "Scaled from 1000+ entries to mentorship, workshops, and 60+ GitHub projects",
      "Partnered GEMINATHON '26 and sponsored campus hackathons",
    ],
  },
  {
    id: "analytx",
    company: "Analytx4t Lab",
    role: "AI & Backend Development Intern",
    period: "Oct 2025 — Dec 2025",
    location: "Delhi · Remote",
    highlights: [
      "Built agentic AI systems and scalable backend architectures",
      "Integrated autonomous agents with real-world data pipelines and APIs",
      "Shipped mobile/software development work including HotelRBS",
    ],
  },
  {
    id: "hackfinity",
    company: "Hackfinity",
    role: "Co-Founder & CEO",
    period: "Jun 2025 — Sep 2025",
    location: "Chennai · Remote",
    highlights: [
      "Signed MoU with TECHhelp4U for community partnership",
      "Grew sponsor networks, mentor exchange, and hackathon infrastructure",
      "Organized and scaled student builder communities",
    ],
  },
  {
    id: "annam",
    company: "ANNAM.AI · IIT Ropar",
    role: "AI Intern (Hackathon Program)",
    period: "May 2025 — Jul 2025",
    location: "Remote",
    highlights: [
      "Built AI solutions for grassroots Indian agriculture challenges",
      "Shipped CRISPRoots AgroTwin Nexus — featured on Annam AI blog",
      "Advanced to mentored research & funding track (₹2L Phase II prize)",
    ],
  },
  {
    id: "voiceit",
    company: "Voice-IT Club",
    role: "Technical Lead",
    period: "Jun 2025 — Jul 2026",
    location: "Chennai · On-site",
    highlights: [
      "Led technical direction for club projects and initiatives",
      "Mentored members on engineering and delivery practices",
    ],
  },
  {
    id: "gssoc",
    company: "GSSoC '25",
    role: "Open Source Contributor",
    period: "Jul 2025 — Sep 2025",
    location: "Remote",
    highlights: [
      "Contributed to mentored open-source projects",
      "Strengthened version control and collaborative workflows",
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    id: "codered",
    title: "CODE RED #1",
    description: "1st place — ACM-W VIT Chennai hackathon",
    icon: "🏆",
    unlocked: true,
    points: 1000,
  },
  {
    id: "annam-win",
    title: "ANNAM.AI TOP 5",
    description: "4th place · ₹2,00,000 · Phase II research track @ IIT Ropar",
    icon: "🌾",
    unlocked: true,
    points: 950,
  },
  {
    id: "nptel",
    title: "NPTEL TOP 1%",
    description: "Conservation Economics · 100% · Top 1% of 5240 (IIT Kanpur)",
    icon: "📜",
    unlocked: true,
    points: 900,
  },
  {
    id: "msme",
    title: "MSME TOP 40",
    description: "MSME Idea Hackathon 5.0 — Top 40 nationwide (VIT Chennai)",
    icon: "💡",
    unlocked: true,
    points: 700,
  },
  {
    id: "genai-mumbai",
    title: "GENAI FINALIST",
    description: "Top 30 / 400+ · ML Mumbai GenAI Hackathon · FinTech build",
    icon: "🤖",
    unlocked: true,
    points: 650,
  },
  {
    id: "hackronyx",
    title: "HACKRONYX 35",
    description: "Top 35 / 8000+ · National finals with HackWithIndia",
    icon: "🎯",
    unlocked: true,
    points: 650,
  },
  {
    id: "hackhazards",
    title: "HACKHAZARDS 100",
    description: "Top 100 · World's largest community hackathon (25+ countries)",
    icon: "🌍",
    unlocked: true,
    points: 600,
  },
  {
    id: "spectrum",
    title: "SPECTRUM 30",
    description: "EnviroLink finalist — 30 teams from 2000+ entries",
    icon: "🌱",
    unlocked: true,
    points: 550,
  },
  {
    id: "shine",
    title: "SHINE SEMI",
    description: "Semi-finals — Shine Healthcare Hackathon 2025 (TN)",
    icon: "🏥",
    unlocked: true,
    points: 500,
  },
  {
    id: "srip",
    title: "SRIP 2026",
    description: "Selected — Summer Research Internship @ VIT (Dr. Renjith P N)",
    icon: "🔬",
    unlocked: true,
    points: 500,
  },
  {
    id: "ysoc-found",
    title: "Y-SOC FOUNDER",
    description: "Built open-source season · sponsored campus hackathons",
    icon: "🚀",
    unlocked: true,
    points: 800,
  },
  {
    id: "leetcode50",
    title: "LEETCODE 50",
    description: "50 Days Badge 2025 — consistency in DSA",
    icon: "💻",
    unlocked: true,
    points: 400,
  },
  {
    id: "konami",
    title: "KONAMI MASTER",
    description: "Unlocked Retro Mode via Konami Code",
    icon: "🎮",
    unlocked: false,
    points: 999,
    secret: true,
  },
  {
    id: "explorer",
    title: "PIXEL HUNTER",
    description: "Found the hidden pixel character",
    icon: "👾",
    unlocked: false,
    points: 250,
    secret: true,
  },
];

export const EDUCATION = [
  {
    school: "Vellore Institute of Technology",
    degree: "B.Tech — Computer Software Engineering",
    period: "Jul 2024 — Oct 2028",
    detail: "CGPA 8.6/10 · Basketball · Ideathons · Hackathons",
  },
  {
    school: "Sachdeva Public School",
    degree: "CBSE",
    period: "Jun 2010 — Mar 2024",
    detail: "Sports Captain",
  },
];

export const CERTIFICATIONS = [
  "Introduction to Programming Using Java — LearnQuest / Coursera",
  "Foundations of Coding Full-Stack — Microsoft / Coursera",
  "The Arduino Platform and C Programming — UC Irvine / Coursera",
  "Fundamentals of Gen AI — NVIDIA",
  "Azure AI Demystified — Microsoft Learn Student Ambassador",
  "Generative AI Workshop — IIT Madras (Techobytes)",
  "Tata Group Data Visualisation Job Simulation — Forage",
  "NPTEL Conservation Economics — IIT Kanpur (100%, Top 1%)",
];

export type ProjectSticker = "NEW" | "HOT" | "BETA";
export type SkillRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
