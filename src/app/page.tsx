import { PortfolioApp } from "@/components/PortfolioApp";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faq";
import { ABOUT } from "@/data/portfolio";
import {
  createPageMetadata,
  faqJsonLd,
  ROLE_H2S,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Punya Mittal | AI Engineer | Full Stack Developer | VIT Chennai",
  description:
    "Punya Mittal is an AI Engineer, Full Stack Developer, and Computer Science student at VIT Chennai. Explore AI research, open-source projects, blockchain development, and software engineering work.",
  path: "/",
  keywords: ["Punya Mittal Portfolio", "Punya Mittal AI Engineer"],
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd([...FAQS])} />

      {/* Server-rendered identity for crawlers (interactive experience is client). */}
      <section className="sr-only" aria-label="Punya Mittal identity">
        <h1>Punya Mittal</h1>
        {ROLE_H2S.map((role) => (
          <h2 key={role}>{role}</h2>
        ))}
        <p>{ABOUT.bio}</p>
        {FAQS.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <nav>
          <a href="/about">About Punya Mittal</a>
          <a href="/projects">AI Projects by Punya Mittal</a>
          <a href="/research">Research by Punya Mittal</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>
      </section>

      <PortfolioApp />
    </>
  );
}
