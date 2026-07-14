import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { EvidenceList } from "@/components/seo/EvidenceList";
import { FaqSection } from "@/components/seo/FaqSection";
import { GeoEntityBlock } from "@/components/seo/GeoEntityBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { LorSection } from "@/components/seo/LorSection";
import {
  EVIDENCE_SUMMARY,
  NAME_SEARCH_KEYWORDS,
} from "@/data/credentials";
import { FAQS } from "@/data/faq";
import { GEO_ENTITY } from "@/data/geo";
import { ABOUT, SITE } from "@/data/portfolio";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  ROLE_H2S,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Punya Mittal | AI Engineer VIT Chennai",
  description: `${GEO_ENTITY.oneLiner} ${EVIDENCE_SUMMARY}`,
  path: "/about",
  keywords: [...NAME_SEARCH_KEYWORDS, "About Punya Mittal", "Who is Punya Mittal"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          faqJsonLd(FAQS.slice(0, 10)),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        About Punya Mittal
      </h1>
      <p className="geo-speakable mt-4 max-w-3xl text-lg font-medium leading-relaxed">
        {GEO_ENTITY.oneLiner}
      </p>
      <p className="geo-speakable mt-3 max-w-3xl text-base leading-relaxed opacity-90">
        {EVIDENCE_SUMMARY}
      </p>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {ROLE_H2S.map((role) => (
          <h2 key={role} className="font-display text-xl font-bold uppercase">
            {role}
          </h2>
        ))}
      </div>
      <div className="mt-8">
        <GeoEntityBlock />
      </div>
      <p className="mt-8 max-w-3xl text-base leading-relaxed opacity-80">
        {ABOUT.bio}
      </p>
      <p className="mt-4 max-w-3xl text-sm opacity-70">{SITE.headline}</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {ABOUT.facts.map((fact) => (
          <li key={fact.label} className="brutal-border bg-surface p-4">
            <p className="font-pixel text-[8px] text-hot-pink">{fact.label}</p>
            <p className="mt-1 font-display font-bold">{fact.value}</p>
          </li>
        ))}
      </ul>
      <EvidenceList title="Results at a glance" limit={8} />
      <LorSection />
      <h2 className="font-display mt-12 text-2xl font-black uppercase">Timeline</h2>
      <ol className="mt-4 space-y-3">
        {ABOUT.timeline.map((item) => (
          <li key={item.year} className="flex gap-4 text-sm">
            <span className="font-pixel w-16 shrink-0 text-[8px] text-electric">
              {item.year}
            </span>
            <span className="opacity-80">{item.event}</span>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/resume" className="font-pixel text-[8px] uppercase underline">
          Resume & LORs
        </Link>
        <Link href="/achievements" className="font-pixel text-[8px] uppercase underline">
          Full achievements
        </Link>
        <Link href="/ai" className="font-pixel text-[8px] uppercase underline">
          AI Engineer work
        </Link>
        <Link href="/hire" className="font-pixel text-[8px] uppercase underline">
          Hire
        </Link>
        <Link href="/faq" className="font-pixel text-[8px] uppercase underline">
          FAQ
        </Link>
      </div>
      <FaqSection title="About Punya Mittal — FAQ" />
    </>
  );
}
