import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ABOUT, SITE } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata, ROLE_H2S } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Punya Mittal - AI Engineer at VIT Chennai",
  description:
    "About Punya Mittal: AI Engineer, Full Stack Developer, and Computer Science student at VIT Chennai. Founder of Y-SoC and builder of AI products.",
  path: "/about",
  keywords: ["About Punya Mittal", "Punya Mittal VIT Chennai"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
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
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {ROLE_H2S.map((role) => (
          <h2 key={role} className="font-display text-xl font-bold uppercase">
            {role}
          </h2>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-base leading-relaxed opacity-80">{ABOUT.bio}</p>
      <p className="mt-4 max-w-3xl text-sm opacity-70">{SITE.headline}</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {ABOUT.facts.map((fact) => (
          <li key={fact.label} className="brutal-border bg-surface p-4">
            <p className="font-pixel text-[8px] text-hot-pink">{fact.label}</p>
            <p className="mt-1 font-display font-bold">{fact.value}</p>
          </li>
        ))}
      </ul>
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
        <Link href="/projects" className="font-pixel text-[8px] uppercase underline">
          AI Projects by Punya Mittal
        </Link>
        <Link href="/research" className="font-pixel text-[8px] uppercase underline">
          Research
        </Link>
        <Link href="/contact" className="font-pixel text-[8px] uppercase underline">
          Contact
        </Link>
      </div>
      <FaqSection />
    </>
  );
}
