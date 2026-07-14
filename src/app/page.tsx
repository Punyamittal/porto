import { PortfolioApp } from "@/components/PortfolioApp";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faq";
import { GEO_ANSWERS, GEO_ENTITY } from "@/data/geo";
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

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          faqJsonLd([...FAQS]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Punya Mittal",
            url: SITE_URL,
            about: { "@id": `${SITE_URL}/#person` },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".geo-identity-answer"],
            },
            mainEntity: { "@id": `${SITE_URL}/#person` },
          },
        ]}
      />

      {/* Server-rendered answers for crawlers + generative engines */}
      <section className="sr-only" aria-label="Punya Mittal identity for AI and search">
        <h1>Punya Mittal</h1>
        {ROLE_H2S.map((role) => (
          <h2 key={role}>{role}</h2>
        ))}
        <p className="geo-identity-answer">{GEO_ENTITY.oneLiner}</p>
        <p className="geo-identity-answer">{GEO_ENTITY.summary}</p>
        <p>{ABOUT.bio}</p>
        {GEO_ANSWERS.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
        {FAQS.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <nav>
          <a href="/about">About Punya Mittal</a>
          <a href="/faq">Who is Punya Mittal FAQ</a>
          <a href="/projects">AI Projects by Punya Mittal</a>
          <a href="/research">Research by Punya Mittal</a>
          <a href="/ai">AI Engineer Punya Mittal</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
          <a href="/llms.txt">llms.txt</a>
        </nav>
      </section>

      <PortfolioApp />
    </>
  );
}
