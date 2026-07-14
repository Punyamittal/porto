import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ACHIEVEMENTS, PROJECTS, SITE } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Open Source by Punya Mittal - Y-SoC & Community",
  description:
    "Open source work by Punya Mittal — founder of Y-SoC, mentor ecosystems, student builder programs, and GitHub projects.",
  path: "/opensource",
  keywords: ["Punya Mittal Open Source", "Y-SoC", "Punya Mittal GitHub"],
});

export default function OpenSourcePage() {
  const ysoc = PROJECTS.find((p) => p.id === "ysoc");
  const awards = ACHIEVEMENTS.filter((a) => a.unlocked).slice(0, 8);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Open Source", path: "/opensource" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Open Source", href: "/opensource" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Open Source Contributor — Punya Mittal
      </h1>
      <h2 className="font-display mt-4 text-xl font-bold uppercase">
        Y-SoC Founder · Community Builder
      </h2>
      <p className="mt-6 max-w-3xl text-base opacity-80">
        {ysoc?.longDescription ??
          "Student-led open-source seasons, mentorship, and public building."}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={SITE.social.ysoc}
          target="_blank"
          rel="noopener noreferrer"
          className="font-pixel border-[3px] border-border bg-neon px-3 py-2 text-[8px] text-black uppercase"
        >
          ysoc.in
        </a>
        <a
          href={SITE.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-pixel border-[3px] border-border bg-surface px-3 py-2 text-[8px] uppercase"
        >
          GitHub
        </a>
      </div>
      <h2 className="font-display mt-12 text-2xl font-black uppercase">Highlights</h2>
      <ul className="mt-4 space-y-2 text-sm opacity-80">
        {awards.map((award) => (
          <li key={award.id}>
            <strong>{award.title}</strong> — {award.description}
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm">
        <Link href="/projects" className="underline">
          Projects
        </Link>{" "}
        ·{" "}
        <Link href="/blog" className="underline">
          Blog
        </Link>
      </p>
    </>
  );
}
