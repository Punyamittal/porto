import { PortfolioApp } from "@/components/PortfolioApp";
import { JsonLd } from "@/components/seo/JsonLd";
import { EVIDENCE_SUMMARY } from "@/data/credentials";
import { FAQS } from "@/data/faq";
import { GEO_ENTITY } from "@/data/geo";
import { ABOUT, SITE } from "@/data/portfolio";
import {
  createPageMetadata,
  faqJsonLd,
  ROLE_H2S,
  SITE_URL,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Punya Mittal | AI Engineer | Full Stack Developer | VIT Chennai",
  description: GEO_ENTITY.summary,
  path: "/",
  keywords: [
    "Punya Mittal Portfolio",
    "Punya Mittal AI Engineer",
    "Who is Punya Mittal",
  ],
  absoluteTitle: true,
});

const CRAWLER_LINKS = [
  { href: "/about", label: "About Punya Mittal" },
  { href: "/faq", label: "Who is Punya Mittal FAQ" },
  { href: "/achievements", label: "Achievements" },
  { href: "/hire", label: "Hire Punya Mittal" },
  { href: "/ai-engineer-chennai", label: "AI Engineer Chennai" },
  { href: "/vit-chennai-ai-engineer-student", label: "VIT Chennai AI student (current)" },
  { href: "/freelance-website-creation", label: "Freelance website creation" },
  { href: "/projects", label: "AI Projects by Punya Mittal" },
  { href: "/research", label: "Research by Punya Mittal" },
  { href: "/ai", label: "AI Engineer Punya Mittal" },
  { href: "/experience", label: "Experience" },
  { href: "/blockchain", label: "Blockchain / Hanix" },
  { href: "/opensource", label: "Open Source / Y-SoC" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "/llms.txt", label: "llms.txt" },
] as const;

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(FAQS),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Punya Mittal",
            url: SITE_URL,
            about: { "@id": `${SITE_URL}/#person` },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".geo-identity-answer", ".geo-speakable"],
            },
            mainEntity: { "@id": `${SITE_URL}/#person` },
            significantLink: CRAWLER_LINKS.map((l) => `${SITE_URL}${l.href}`),
          },
        ]}
      />

      {/* Visible, compact identity band — citeable without relying on sr-only alone */}
      <section
        className="relative z-[80] border-b-[3px] border-border bg-[var(--bg)] px-4 py-3 text-[var(--fg)] sm:px-8"
        aria-label="Punya Mittal identity"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="font-display text-lg font-black uppercase sm:text-xl">
              Punya Mittal
            </h1>
            <p className="geo-identity-answer geo-speakable mt-1 max-w-3xl text-sm leading-relaxed opacity-85">
              {GEO_ENTITY.oneLiner}
            </p>
            <p className="geo-identity-answer geo-speakable mt-1 max-w-3xl text-xs leading-relaxed opacity-70">
              {EVIDENCE_SUMMARY}
            </p>
          </div>
          <p className="shrink-0 text-xs opacity-70">
            <a href={`mailto:${SITE.email}`} className="underline">
              {SITE.email}
            </a>
            {" · "}
            <a href="/hire" className="underline">
              Hire
            </a>
            {" · "}
            <a href="/faq" className="underline">
              FAQ
            </a>
            {" · "}
            <a href="/about" className="underline">
              About
            </a>
          </p>
        </div>
      </section>

      {/* Extra structured answers for crawlers / assistants */}
      <section className="sr-only" aria-label="Additional entity answers for AI and search">
        {ROLE_H2S.map((role) => (
          <h2 key={role}>{role}</h2>
        ))}
        <p className="geo-identity-answer">{GEO_ENTITY.summary}</p>
        <p>{ABOUT.bio}</p>
        {FAQS.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <nav>
          {CRAWLER_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </section>

      <PortfolioApp />
    </>
  );
}
