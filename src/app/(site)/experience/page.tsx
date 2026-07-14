import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { EXPERIENCE } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Experience - Punya Mittal AI Engineer & Full Stack Developer",
  description:
    "Work experience of Punya Mittal — internships, research, leadership roles, and product work across AI and full-stack engineering.",
  path: "/experience",
  keywords: ["Punya Mittal Experience", "Punya Mittal Intern"],
});

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Experience", href: "/experience" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Experience — Punya Mittal
      </h1>
      <p className="mt-4 max-w-3xl text-base opacity-80">
        Roles spanning full-stack engineering, AI research, and student leadership.
      </p>
      <div className="mt-10 space-y-5">
        {EXPERIENCE.map((job) => (
          <article key={job.id} className="brutal-border bg-surface p-5">
            <h2 className="font-display text-xl font-black uppercase">{job.role}</h2>
            <p className="font-pixel mt-1 text-[8px] text-hot-pink">
              {job.company} · {job.period}
            </p>
            <p className="mt-1 text-xs opacity-60">{job.location}</p>
            <ul className="mt-3 space-y-1.5 text-sm opacity-80">
              {job.highlights.map((highlight) => (
                <li key={highlight}>▸ {highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-10 text-sm">
        <Link href="/resume" className="underline">
          Resume
        </Link>{" "}
        ·{" "}
        <Link href="/about" className="underline">
          About
        </Link>
      </p>
    </>
  );
}
