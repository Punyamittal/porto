import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactEmail } from "@/components/seo/ContactEmail";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
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
    answer: `Punya Mittal is an AI Engineer studying at VIT Chennai and available for AI freelancing in Chennai, Delhi NCR, and remote. Email ${SITE.email}.`,
  },
  {
    question: "Is Punya Mittal connected to VIT Chennai?",
    answer:
      "Yes. Punya Mittal is a B.Tech Computer Science student at VIT Chennai and builds AI and full-stack projects while studying there.",
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
  description: `Looking for an AI engineer near you in Chennai or Delhi? Punya Mittal is an AI Engineer at VIT Chennai. Email ${SITE.email} for freelance AI work.`,
  path: "/ai-engineer-chennai",
  keywords: [
    "AI engineer near me",
    "AI engineer Chennai",
    "AI engineer Delhi",
    "AI engineer VIT Chennai",
    "VIT Chennai AI student freelance",
    "hire AI engineer Chennai",
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
        Searching “AI engineer near me”, “AI engineer Chennai”, or “VIT Chennai AI”?
        Punya Mittal is an AI Engineer and CSE student at VIT Chennai. For projects,
        email <strong>{SITE.email}</strong>.
      </p>
      <div className="mt-8">
        <ContactEmail />
      </div>
      <h2 className="font-display mt-12 text-2xl font-black uppercase">
        VIT Chennai · AI work
      </h2>
      <p className="mt-3 max-w-3xl text-sm opacity-80">
        {GEO_ENTITY.summary} Local availability covers Chennai campus work plus Delhi
        NCR and remote clients.
      </p>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <article key={item.id} className="brutal-border bg-surface p-4">
            <h3 className="font-display text-lg font-bold uppercase">{item.title}</h3>
            <p className="mt-2 text-sm opacity-80">{item.description}</p>
          </article>
        ))}
      </div>
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
        <Link href="/about" className="underline">
          About
        </Link>
      </p>
    </>
  );
}
