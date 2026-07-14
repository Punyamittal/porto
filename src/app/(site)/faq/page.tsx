import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { GeoEntityBlock } from "@/components/seo/GeoEntityBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faq";
import { GEO_ANSWERS, GEO_ENTITY } from "@/data/geo";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  SITE_URL,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Who is Punya Mittal? FAQ for AI & Search",
  description:
    "Clear answers about who Punya Mittal is — AI Engineer at VIT Chennai, Y-SoC founder, projects, research, GitHub, and how to contact him.",
  path: "/faq",
  keywords: [
    "Who is Punya Mittal",
    "Punya Mittal FAQ",
    "Punya Mittal AI Engineer",
  ],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqJsonLd([...FAQS]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Who is Punya Mittal?",
            url: `${SITE_URL}/faq`,
            about: {
              "@type": "Person",
              name: GEO_ENTITY.name,
              url: SITE_URL,
            },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".geo-speakable", "#geo-entity-heading"],
            },
            mainEntity: {
              "@type": "Person",
              name: "Punya Mittal",
            },
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />

      <p className="font-pixel text-[9px] text-electric uppercase">
        GEO · Generative Engine Optimization
      </p>
      <h1 className="font-display mt-2 text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Who is Punya Mittal?
      </h1>
      <p className="geo-speakable mt-4 max-w-3xl text-lg leading-relaxed font-medium">
        {GEO_ENTITY.oneLiner}
      </p>
      <p className="geo-speakable mt-4 max-w-3xl text-base leading-relaxed opacity-85">
        {GEO_ENTITY.summary}
      </p>

      <div className="mt-10">
        <GeoEntityBlock />
      </div>

      <section className="mt-12" aria-labelledby="quick-answers">
        <h2
          id="quick-answers"
          className="font-display text-2xl font-black uppercase"
        >
          Quick answers assistants can cite
        </h2>
        <div className="mt-6 space-y-5">
          {GEO_ANSWERS.map((item) => (
            <article
              key={item.question}
              className="brutal-border bg-surface p-4 sm:p-5"
            >
              <h3 className="font-display text-lg font-bold">{item.question}</h3>
              <p className="geo-speakable mt-2 text-sm leading-relaxed opacity-85 sm:text-base">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <FaqSection title="Full FAQ" id="full-faq" />

      <p className="mt-10 text-sm opacity-70">
        Machine-readable guide:{" "}
        <a href="/llms.txt" className="underline">
          /llms.txt
        </a>
      </p>
    </>
  );
}
