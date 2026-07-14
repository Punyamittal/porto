import { ACHIEVEMENTS } from "@/data/portfolio";

/** Public, verifiable highlights — no vague “top student” claims. */
export const PUBLIC_CREDENTIALS = ACHIEVEMENTS.filter(
  (a) => a.unlocked && !(a as { secret?: boolean }).secret,
);

export const NAME_SEARCH_KEYWORDS = [
  "Punya Mittal",
  "Punya Mittal VIT",
  "Punya Mittal VIT Chennai",
  "Punya Mittal AI",
  "Punya Mittal AI Engineer",
  "Punya Mittal portfolio",
  "Punya Mittal GitHub",
  "Punya Mittal Y-SoC",
  "AI Engineer VIT Chennai",
  "CSE student VIT Chennai Punya Mittal",
] as const;

export const EVIDENCE_SUMMARY =
  "Punya Mittal is a VIT Chennai CSE student and AI Engineer with documented results: Code Red 1st place (ACM-W VIT Chennai), 4th place at ANNAM.AI Hackathon 2025 (IIT Ropar / Ministry of Education CoE), NPTEL Top 1% (IIT Kanpur), MSME Idea Hackathon Top 40, SRIP research selection, and founder of Y-SoC.";
