import { PortfolioApp } from "@/components/PortfolioApp";
import { JsonLd } from "@/components/seo/JsonLd";
import { EVIDENCE_SUMMARY } from "@/data/credentials";
import { FAQS } from "@/data/faq";
import { GEO_ENTITY } from "@/data/geo";
import { ABOUT } from "@/data/portfolio";
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

      {/* Server-rendered for crawlers / generative engines — not shown in the exhibition UI */}
      <section className="sr-only" aria-label="Punya Mittal identity for AI and search">
        <h1>Punya Mittal</h1>
        {ROLE_H2S.map((role) => (
          <h2 key={role}>{role}</h2>
        ))}
        <p className="geo-identity-answer">{GEO_ENTITY.oneLiner}</p>
        <p className="geo-identity-answer">{EVIDENCE_SUMMARY}</p>
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
