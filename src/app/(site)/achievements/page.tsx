import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { EvidenceList } from "@/components/seo/EvidenceList";
import { JsonLd } from "@/components/seo/JsonLd";
import { EVIDENCE_SUMMARY, NAME_SEARCH_KEYWORDS, PUBLIC_CREDENTIALS } from "@/data/credentials";
import { SITE } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Punya Mittal Achievements | VIT Chennai AI & Hackathons",
  description: EVIDENCE_SUMMARY,
  path: "/achievements",
  keywords: [
    ...NAME_SEARCH_KEYWORDS,
    "Punya Mittal hackathon",
    "Code Red VIT Chennai",
    "ANNAM.AI Punya Mittal",
    "Y-SoC founder",
  ],
});

export default function AchievementsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Achievements", path: "/achievements" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Achievements of Punya Mittal",
            description: EVIDENCE_SUMMARY,
            itemListElement: PUBLIC_CREDENTIALS.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              description: item.description,
              url: `${SITE_URL}/achievements#${item.id}`,
            })),
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Achievements", href: "/achievements" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Achievements — Punya Mittal
      </h1>
      <p className="geo-speakable mt-4 max-w-3xl text-lg font-medium leading-relaxed">
        {EVIDENCE_SUMMARY}
      </p>
      <p className="mt-4 max-w-3xl text-sm opacity-70">
        CSE · VIT Chennai · AI Engineer · Founder @ Y-SoC ·{" "}
        <a href={`mailto:${SITE.email}`} className="underline">
          {SITE.email}
        </a>
      </p>
      <EvidenceList title="Record of placements & programs" />
      <p className="mt-10 text-sm">
        <Link href="/about" className="underline">
          About
        </Link>{" "}
        ·{" "}
        <Link href="/ai" className="underline">
          AI work
        </Link>{" "}
        ·{" "}
        <Link href="/hire" className="underline">
          Hire
        </Link>
      </p>
    </>
  );
}
