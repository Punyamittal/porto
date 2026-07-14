import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactEmail } from "@/components/seo/ContactEmail";
import { EvidenceList } from "@/components/seo/EvidenceList";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  EVIDENCE_SUMMARY,
  NAME_SEARCH_KEYWORDS,
} from "@/data/credentials";
import { PROJECTS, SITE } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";

const AI_IDS = [
  "automl-pipeline",
  "kai",
  "llm-security",
  "crisproots",
  "hospital-rag",
  "rehab",
  "gear-lab",
];

const AI_FAQS = [
  {
    question: "Is Punya Mittal an AI Engineer at VIT Chennai?",
    answer:
      "Yes. Punya Mittal is an AI Engineer and B.Tech CSE student at VIT Chennai. He builds AutoML pipelines, RAG systems, LLM security layers, and agri-AI research projects.",
  },
  {
    question: "What AI projects has Punya Mittal shipped?",
    answer:
      "Projects include an AutoML pipeline, Hospital RAG, Kai (emotion-aware companion), LLM Guard, Crisproots agri-AI work, and REHAB learning systems — see punyamittal.space/ai.",
  },
  {
    question: "Has Punya Mittal placed in AI-related competitions?",
    answer:
      "Yes. Documented results include 4th place at ANNAM.AI Hackathon 2025 (IIT Ropar), GenAI Hackathon finals (ML Mumbai), Code Red 1st place at VIT Chennai, and related national selections listed on his achievements page.",
  },
] as const;

export const metadata = createPageMetadata({
  title: "AI Engineer VIT Chennai | Punya Mittal Machine Learning",
  description: `Punya Mittal is an AI Engineer and CSE student at VIT Chennai. ${EVIDENCE_SUMMARY}`,
  path: "/ai",
  keywords: [
    ...NAME_SEARCH_KEYWORDS,
    "AI Engineer VIT Chennai",
    "Machine Learning VIT Chennai",
    "Punya Mittal RAG",
    "Punya Mittal AutoML",
  ],
});

export default function AiPage() {
  const items = PROJECTS.filter((p) => AI_IDS.includes(p.id));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "AI", path: "/ai" },
          ]),
          faqJsonLd([...AI_FAQS]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "AI", href: "/ai" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        AI Engineer — Punya Mittal
      </h1>
      <h2 className="font-display mt-4 text-xl font-bold uppercase">
        VIT Chennai · Machine Learning · Systems that Ship
      </h2>
      <p className="geo-speakable mt-6 max-w-3xl text-base opacity-90">
        Punya Mittal is an AI Engineer and Computer Science student at VIT Chennai.
        His work covers AutoML, RAG, LLM security, emotion-aware agents, and agri-AI
        research — with evaluation and deployment as first-class goals.
      </p>
      <p className="geo-speakable mt-4 max-w-3xl text-sm opacity-85">
        {EVIDENCE_SUMMARY}
      </p>
      <div className="mt-8">
        <ContactEmail label={`Email ${SITE.email}`} />
      </div>
      <h2 className="font-display mt-12 text-2xl font-black uppercase">
        AI projects
      </h2>
      <div className="mt-6 space-y-5">
        {items.map((item) => (
          <article key={item.id} className="brutal-border bg-surface p-5">
            <h3 className="font-display text-xl font-black uppercase">{item.title}</h3>
            <p className="mt-2 text-sm opacity-80">{item.longDescription}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {item.tech.map((tech) => (
                <li
                  key={tech}
                  className="border border-border px-2 py-0.5 font-pixel text-[7px] uppercase"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <EvidenceList title="Related placements" limit={6} />
      <p className="mt-10 text-sm">
        <Link href="/research" className="underline">
          Research
        </Link>{" "}
        ·{" "}
        <Link href="/achievements" className="underline">
          Achievements
        </Link>{" "}
        ·{" "}
        <Link href="/ai-engineer-chennai" className="underline">
          AI Engineer Chennai
        </Link>{" "}
        ·{" "}
        <Link href="/hire" className="underline">
          Hire
        </Link>
      </p>
    </>
  );
}
