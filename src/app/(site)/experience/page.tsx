import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsForTopics } from "@/data/faq";
import { EXPERIENCE, IEI } from "@/data/portfolio";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
} from "@/lib/seo";

const EXPERIENCE_FAQS = faqsForTopics([
  "work",
  "intern",
  "ie(i)",
  "jbn",
  "secretary",
  "experience",
]);

export const metadata = createPageMetadata({
  title: "Experience - Punya Mittal AI Engineer & Full Stack Developer",
  description:
    "Work experience of Punya Mittal — Full Stack Intern at JBN Technologies, Secretary at IE(I) VIT Chennai, founder of Y-SoC, and AI / full-stack product roles.",
  path: "/experience",
  keywords: [
    "Punya Mittal Experience",
    "Punya Mittal Intern",
    "Punya Mittal IE(I)",
    "Punya Mittal JBN",
  ],
});

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Experience", path: "/experience" },
          ]),
          faqJsonLd(EXPERIENCE_FAQS),
        ]}
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
      <p className="geo-speakable mt-4 max-w-3xl text-lg font-medium leading-relaxed">
        Punya Mittal is a Full Stack Intern at JBN Technologies and Secretary of
        the IE(I) VIT Chennai Student Chapter, with roles spanning AI research and
        student leadership.
      </p>
      <p className="mt-3 max-w-3xl text-base opacity-80">
        Roles spanning full-stack engineering, AI research, and campus organizations
        such as Y-SoC and {IEI.name}.
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
            {job.id === "iei" && (
              <a
                href={IEI.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel mt-3 inline-block text-[7px] uppercase underline opacity-70"
              >
                Chapter site →
              </a>
            )}
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
        </Link>{" "}
        ·{" "}
        <Link href="/hire" className="underline">
          Hire
        </Link>
      </p>
      <FaqSection
        title="Experience FAQ"
        items={EXPERIENCE_FAQS}
        id="experience-faq"
      />
    </>
  );
}
