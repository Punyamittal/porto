import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { LorSection } from "@/components/seo/LorSection";
import { ABOUT, EXPERIENCE, SITE } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Resume - Punya Mittal AI Engineer",
  description:
    "Resume overview for Punya Mittal — AI Engineer, Full Stack Developer, VIT Chennai CSE student, Y-SoC founder. Includes letters of recommendation.",
  path: "/resume",
  keywords: [
    "Punya Mittal Resume",
    "Punya Mittal CV",
    "Punya Mittal letter of recommendation",
  ],
});

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Resume", href: "/resume" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Resume — Punya Mittal
      </h1>
      <p className="mt-4 max-w-3xl text-base opacity-80">{SITE.headline}</p>
      <a
        href={SITE.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-pixel mt-6 inline-block border-[3px] border-border bg-electric px-4 py-3 text-[9px] text-black uppercase"
      >
        Open GitHub / Resume links
      </a>
      <h2 className="font-display mt-12 text-2xl font-black uppercase">Summary</h2>
      <p className="mt-3 max-w-3xl text-sm opacity-80">{ABOUT.bio}</p>
      <h2 className="font-display mt-10 text-2xl font-black uppercase">Experience</h2>
      <ul className="mt-4 space-y-3">
        {EXPERIENCE.map((job) => (
          <li key={job.id} className="text-sm">
            <strong>{job.role}</strong> — {job.company} ({job.period})
          </li>
        ))}
      </ul>
      <LorSection />
      <h2 className="font-display mt-10 text-2xl font-black uppercase">Skills</h2>
      <p className="mt-3 text-sm opacity-80">{ABOUT.skills.join(" · ")}</p>
      <p className="mt-10 text-sm">
        Detailed pages:{" "}
        <Link href="/experience" className="underline">
          Experience
        </Link>
        ,{" "}
        <Link href="/projects" className="underline">
          Projects
        </Link>
        .
      </p>
    </>
  );
}
