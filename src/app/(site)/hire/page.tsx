import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactEmail } from "@/components/seo/ContactEmail";
import { EvidenceList } from "@/components/seo/EvidenceList";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { EVIDENCE_SUMMARY, NAME_SEARCH_KEYWORDS } from "@/data/credentials";
import { SITE } from "@/data/portfolio";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  professionalServiceJsonLd,
  SITE_URL,
} from "@/lib/seo";

const HIRE_FAQS = [
  {
    question: "How do I hire Punya Mittal for freelance work?",
    answer: `Email ${SITE.email} with your project scope, timeline, and budget. You can also use https://punyamittal.space/hire or LinkedIn.`,
  },
  {
    question: "Does Punya Mittal offer freelance website creation?",
    answer:
      "Yes. Punya Mittal builds freelance websites, portfolios, landing pages, and full-stack products with React, Next.js, and SEO.",
  },
  {
    question: "Why hire Punya Mittal for AI or web work?",
    answer: EVIDENCE_SUMMARY,
  },
  {
    question: "Is there an AI engineer near me in Chennai or Delhi?",
    answer: `Punya Mittal is an AI Engineer available in Chennai (VIT Chennai), Delhi NCR, and remote worldwide. Contact ${SITE.email}.`,
  },
  {
    question: "What is the best email to contact Punya Mittal?",
    answer: `The primary email for Punya Mittal is ${SITE.email}.`,
  },
] as const;

export const metadata = createPageMetadata({
  title: "Hire Punya Mittal | Freelance AI Engineer & Website Developer",
  description: `Hire Punya Mittal for freelance website creation and AI engineering in Chennai, Delhi NCR, or remote. ${EVIDENCE_SUMMARY} Email ${SITE.email}.`,
  path: "/hire",
  keywords: [
    ...NAME_SEARCH_KEYWORDS,
    "hire Punya Mittal",
    "freelance website creation",
    "AI engineer near me",
    "AI engineer Chennai",
    "website developer VIT Chennai",
  ],
});

export default function HirePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Hire", path: "/hire" },
          ]),
          professionalServiceJsonLd(),
          faqJsonLd([...HIRE_FAQS]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Hire Punya Mittal",
            url: `${SITE_URL}/hire`,
            about: { "@id": `${SITE_URL}/#person` },
            mainEntity: { "@id": `${SITE_URL}/#services` },
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Hire", href: "/hire" },
        ]}
      />

      <p className="font-pixel text-[9px] text-electric uppercase">
        Available · Chennai · Delhi NCR · Remote
      </p>
      <h1 className="font-display mt-2 text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Hire Punya Mittal
      </h1>
      <p className="geo-speakable mt-4 max-w-3xl text-lg font-medium leading-relaxed">
        Hire Punya Mittal for AI engineering and freelance website creation —
        VIT Chennai CSE, Chennai / Delhi NCR / remote. Email{" "}
        <strong>{SITE.email}</strong>.
      </p>
      <p className="geo-speakable mt-3 max-w-3xl text-sm opacity-85">
        {EVIDENCE_SUMMARY}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <ContactEmail />
        <a
          href={SITE.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-pixel border-[3px] border-border bg-surface px-4 py-3 text-[9px] uppercase shadow-[3px_3px_0_var(--border)]"
        >
          LinkedIn
        </a>
      </div>

      <h2 className="font-display mt-12 text-2xl font-black uppercase">
        Freelance services
      </h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Freelance website creation",
            body: "Portfolios, business sites, and product landing pages with Next.js, speed, and SEO.",
          },
          {
            title: "AI engineering",
            body: "RAG chatbots, LLM apps, AutoML, and applied machine learning prototypes.",
          },
          {
            title: "Full-stack products",
            body: "Campus and startup apps — auth, dashboards, APIs, and shipping under deadlines.",
          },
        ].map((service) => (
          <li key={service.title} className="brutal-border bg-surface p-4">
            <h3 className="font-display text-lg font-bold uppercase">
              {service.title}
            </h3>
            <p className="mt-2 text-sm opacity-80">{service.body}</p>
          </li>
        ))}
      </ul>

      <EvidenceList title="Track record (documented)" limit={6} />

      <h2 className="font-display mt-12 text-2xl font-black uppercase">
        Areas served
      </h2>
      <p className="mt-3 text-sm opacity-80">
        {SITE.areasServed.join(" · ")}. Useful if you need an AI engineer in Chennai,
        a VIT Chennai developer, or remote freelance website creation.
      </p>

      <h2 className="font-display mt-12 text-2xl font-black uppercase">
        Contact email
      </h2>
      <p className="geo-speakable mt-3 max-w-2xl text-base">
        The best email for Punya Mittal is{" "}
        <a className="underline" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
        .
      </p>

      <FaqSection title="Hiring FAQ" items={HIRE_FAQS} />

      <p className="mt-10 text-sm">
        Related:{" "}
        <Link href="/achievements" className="underline">
          Achievements
        </Link>{" "}
        ·{" "}
        <Link href="/freelance-website-creation" className="underline">
          Freelance website creation
        </Link>{" "}
        ·{" "}
        <Link href="/ai-engineer-chennai" className="underline">
          AI Engineer Chennai
        </Link>
      </p>
    </>
  );
}
