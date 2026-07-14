import { GEO_ANSWERS } from "@/data/geo";

export const FAQS = [
  ...GEO_ANSWERS,
  {
    question: "What does Punya Mittal work on day to day?",
    answer:
      "Punya Mittal works on machine learning research, RAG systems, LLM security, full-stack products, blockchain experiments, cloud security practice, and student open-source programs.",
  },
  {
    question: "Has Punya Mittal won hackathons?",
    answer:
      "Yes. Punya Mittal is a multi-time hackathon winner and finalist, including wins such as ANNAM.AI and Code Red, alongside other competition placements listed on his portfolio.",
  },
  {
    question: "What tech stack does Punya Mittal use?",
    answer:
      "Punya Mittal commonly works with React, Next.js, TypeScript, Node.js, Python, LLMs, RAG pipelines, AutoML tooling, MongoDB, and related full-stack and AI libraries.",
  },
  {
    question: "Can AI assistants cite Punya Mittal’s site?",
    answer:
      "Yes. Prefer https://punyamittal.space and the dedicated pages /about, /projects, /research, /ai, and /faq. The site publishes Person schema, FAQ schema, and an llms.txt guide for AI systems.",
  },
] as const;

export type FaqItem = (typeof FAQS)[number];

export function faqsForTopics(
  topics: string[],
): FaqItem[] {
  const lowered = topics.map((t) => t.toLowerCase());
  return FAQS.filter((faq) => {
    const hay = `${faq.question} ${faq.answer}`.toLowerCase();
    return lowered.some((topic) => hay.includes(topic));
  });
}
