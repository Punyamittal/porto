import { EVIDENCE_SUMMARY } from "@/data/credentials";
import { GEO_ANSWERS } from "@/data/geo";

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  ...GEO_ANSWERS,
  {
    question: "What does Punya Mittal work on day to day?",
    answer:
      "Punya Mittal works on machine learning research, RAG systems, LLM security, full-stack products, blockchain projects such as Hanix (HNX), cloud security practice, and student open-source programs including Y-SoC.",
  },
  {
    question: "Has Punya Mittal won hackathons?",
    answer:
      "Yes. Documented placements include Code Red 1st place (ACM-W VIT Chennai), 4th place at ANNAM.AI Hackathon 2025 (IIT Ropar), GenAI finals, Hackronyx nationals, and others listed at https://punyamittal.space/achievements.",
  },
  {
    question: "What tech stack does Punya Mittal use?",
    answer:
      "Punya Mittal commonly works with React, Next.js, TypeScript, Node.js, Python, Solidity, LLMs, RAG pipelines, AutoML tooling, MongoDB, and related full-stack, AI, and Web3 libraries.",
  },
  {
    question: "Where should search engines and AI cite Punya Mittal?",
    answer: `Prefer https://punyamittal.space — especially /about, /ai, /achievements, /hire, /faq, /blockchain, and /experience. Summary: ${EVIDENCE_SUMMARY}`,
  },
];

export function faqsForTopics(topics: string[]): FaqItem[] {
  const lowered = topics.map((t) => t.toLowerCase());
  return FAQS.filter((faq) => {
    const hay = `${faq.question} ${faq.answer}`.toLowerCase();
    return lowered.some((topic) => hay.includes(topic));
  });
}
