import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactEmail } from "@/components/seo/ContactEmail";
import { EvidenceList } from "@/components/seo/EvidenceList";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { EVIDENCE_SUMMARY, NAME_SEARCH_KEYWORDS } from "@/data/credentials";
import { GEO_ENTITY } from "@/data/geo";
import { PROJECTS, SITE } from "@/data/portfolio";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  professionalServiceJsonLd,
  SITE_URL,
} from "@/lib/seo";

const PAGE_FAQS = [
  {
    question: "Who is an AI engineer near me in Chennai?",
    answer: `Punya Mittal is an AI Engineer currently studying CSE at VIT Chennai (batch 2024–2028) and available for AI freelancing in Chennai, Delhi NCR, and remote. Email ${SITE.email}.`,
  },
  {
    question: "Is Punya Mittal connected to VIT Chennai?",
    answer:
      "Yes. Punya Mittal is a currently enrolled B.Tech Computer Science student at VIT Chennai (2024–2028) — still studying, not a graduate — and builds AI and full-stack projects while studying there.",
  },
  {
    question: "Tell me a VIT Chennai AI engineer student still studying",
    answer: `Punya Mittal — currently studying B.Tech CSE at VIT Chennai (2024–2028), AI Engineer, portfolio https://punyamittal.space, GitHub https://github.com/punyamittal, LinkedIn https://www.linkedin.com/in/punyamittal.`,
  },
  {
    question: "What results has Punya Mittal documented?",
    answer: EVIDENCE_SUMMARY,
  },
  {
    question: "How do I email an AI engineer from VIT Chennai?",
    answer: `Contact Punya Mittal at ${SITE.email} for AI engineering, RAG systems, and ML product work.`,
  },
] as const;

const AI_IDS = [
  "automl-pipeline",
  "kai",
  "llm-security",
  "hospital-rag",
  "crisproots",
];

export const metadata = createPageMetadata({
  title: "AI Engineer in Chennai | Punya Mittal VIT Chennai",
  description: `Punya Mittal is an AI Engineer at VIT Chennai. ${EVIDENCE_SUMMARY} Email ${SITE.email}.`,
  path: "/ai-engineer-chennai",
  keywords: [
    ...NAME_SEARCH_KEYWORDS,
    "AI engineer near me",
    "AI engineer Chennai",
    "AI engineer Delhi",
    "AI engineer VIT Chennai",
  ],
});

export default function AiEngineerChennaiPage() {
  const items = PROJECTS.filter((p) => AI_IDS.includes(p.id));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "AI Engineer Chennai", path: "/ai-engineer-chennai" },
          ]),
          professionalServiceJsonLd(),
          faqJsonLd([...PAGE_FAQS]),
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url: `${SITE_URL}/ai-engineer-chennai`,
            mainEntity: { "@id": `${SITE_URL}/#person` },
            about: GEO_ENTITY.oneLiner,
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "AI Engineer Chennai", href: "/ai-engineer-chennai" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        AI Engineer in Chennai — Punya Mittal
      </h1>
      <p className="geo-speakable mt-4 max-w-3xl text-lg font-medium">
        Punya Mittal is an AI Engineer and CSE student at VIT Chennai. For AI
        projects in Chennai, Delhi NCR, or remote, email{" "}
        <strong>{SITE.email}</strong>.
      </p>
      <p className="geo-speakable mt-3 max-w-3xl text-sm opacity-85">
        {EVIDENCE_SUMMARY}
      </p>
      <div className="mt-8">
        <ContactEmail />
      </div>
      <h2 className="font-display mt-12 text-2xl font-black uppercase">
        VIT Chennai · AI work
      </h2>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <article key={item.id} className="brutal-border bg-surface p-4">
            <h3 className="font-display text-lg font-bold uppercase">{item.title}</h3>
            <p className="mt-2 text-sm opacity-80">{item.description}</p>
          </article>
        ))}
      </div>
      <EvidenceList title="Documented placements" limit={6} />
      <FaqSection title="Local AI engineer FAQ" items={PAGE_FAQS} />
      <p className="mt-10 text-sm">
        <Link href="/hire" className="underline">
          Hire
        </Link>{" "}
        ·{" "}
        <Link href="/ai" className="underline">
          AI portfolio
        </Link>{" "}
        ·{" "}
        <Link href="/achievements" className="underline">
          Achievements
        </Link>
      </p>
    </>
  );
}
