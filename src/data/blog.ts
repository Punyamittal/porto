export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-i-built-my-ai-assistant",
    title: "How I Built My AI Assistant",
    description:
      "Design notes from building Kai — an emotion-aware AI companion with memory, ethical boundaries, and hybrid rule + LLM architecture.",
    publishedAt: "2025-11-12",
    tags: ["AI", "LLM", "Punya Mittal"],
    body: [
      "Building an AI assistant is less about connecting an API and more about defining behaviour under pressure.",
      "With Kai, I focused on emotional continuity, long-term memory, and clear ethical boundaries so the system feels intentional rather than random.",
      "The architecture mixes deterministic rules with LLM generation — useful when you need reliability without giving up conversational flexibility.",
    ],
  },
  {
    slug: "building-an-erc-20-token-on-base",
    title: "Building an ERC-20 Token on Base",
    description:
      "A practical walkthrough of shipping a token experiment on Base, covering contracts, deployment mindset, and what students should learn first.",
    publishedAt: "2025-12-02",
    tags: ["Blockchain", "Base", "ERC-20"],
    body: [
      "Blockchain learning sticks when you ship something small end-to-end.",
      "An ERC-20 on Base is a strong first milestone: supply, mint constraints, explorer verification, and wallet UX all become concrete.",
      "I treat these experiments as engineering drills — not speculation — so the focus stays on systems thinking.",
    ],
  },
  {
    slug: "learning-cloud-security-from-scratch",
    title: "Learning Cloud Security from Scratch",
    description:
      "How I approach cloud security as an AI and full-stack builder: threat models, identity, secrets, and practical hardening habits.",
    publishedAt: "2026-01-18",
    tags: ["Cloud Security", "DevSecOps"],
    body: [
      "Cloud security is not a separate career track for builders — it is part of shipping safely.",
      "I start with identity, least privilege, secrets handling, and attack surface reduction before touching fancy tooling.",
      "Student projects get stronger when security requirements are written down early, not bolted on after a demo.",
    ],
  },
  {
    slug: "creating-an-ai-portfolio",
    title: "Creating an AI Portfolio",
    description:
      "Lessons from building punyamittal.space — combining cinematic UX with crawlable SEO pages Google and AI assistants can understand.",
    publishedAt: "2026-02-20",
    tags: ["Portfolio", "SEO", "Next.js"],
    body: [
      "An AI portfolio should show taste and make you discoverable.",
      "That means interactive work for humans plus structured pages, schema, and clear language for search engines and AI assistants.",
      "Consistency in name, roles, and project keywords matters more than keyword stuffing.",
    ],
  },
  {
    slug: "building-with-react-and-nextjs",
    title: "Building with React and Next.js",
    description:
      "Why React and Next.js remain my default for full-stack product work, hackathons, and SEO-friendly personal sites.",
    publishedAt: "2026-03-08",
    tags: ["React", "Next.js", "Full Stack"],
    body: [
      "React still wins for product velocity. Next.js adds routing, metadata, and rendering options that matter for SEO.",
      "For portfolios and apps alike, I care about fast first paint, clear server content, and components that stay maintainable under deadline.",
    ],
  },
  {
    slug: "my-journey-at-vit-chennai",
    title: "My Journey at VIT Chennai",
    description:
      "Studying CSE at VIT Chennai while building Y-SoC, shipping hackathon products, and doing AI research internships.",
    publishedAt: "2026-04-01",
    tags: ["VIT Chennai", "Student Life"],
    body: [
      "VIT Chennai has been a launchpad more than a backdrop.",
      "Between coursework, clubs, hackathons, and open-source seasons, the pattern is the same: start something, finish it, and write about it.",
    ],
  },
  {
    slug: "how-i-built-fated-chat",
    title: "How I Built Fated.chat",
    description:
      "Building a university blind-dating product with form-driven compatibility scoring and campus distribution.",
    publishedAt: "2025-09-15",
    tags: ["Full Stack", "Product", "Campus"],
    body: [
      "Fated.chat started from a product question: can campus matching feel more intentional than photo-first swipes?",
      "Compatibility forms, closed networks, and trust UX mattered more than flashy interfaces.",
      "Seeing hundreds of students onboard made the systems work feel real.",
    ],
  },
  {
    slug: "building-hanix-token",
    title: "Building Hanix Token",
    description:
      "Notes from a blockchain token experiment — contracts, distribution thinking, and what I would do differently next time.",
    publishedAt: "2026-05-10",
    tags: ["Blockchain", "Token", "Web3"],
    body: [
      "Token projects teach product and security discipline quickly.",
      "Hanix was a learning vessel: clarify utility, keep contracts readable, and document assumptions so future-you can debug honestly.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
