import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PROJECTS } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Projects by Punya Mittal",
  description:
    "AI projects by Punya Mittal — AutoML, RAG systems, agri-AI twins, LLM security, EdTech, and full-stack products built at VIT Chennai and beyond.",
  path: "/projects",
  keywords: [
    "AI Projects by Punya Mittal",
    "Punya Mittal Projects",
    "Hackathons",
    "Machine Learning",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AI Projects by Punya Mittal",
            itemListElement: PROJECTS.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.title,
              url: `${SITE_URL}/projects#${project.id}`,
              description: project.description,
            })),
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        AI Projects by Punya Mittal
      </h1>
      <p className="mt-4 max-w-3xl text-base opacity-80">
        Research builds, hackathon winners, open-source systems, and product experiments
        across AI, full-stack, and social impact.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {["Research", "Hackathons", "Blockchain Projects", "Cloud Security", "Machine Learning"].map(
          (label) => (
            <span
              key={label}
              className="font-pixel border-[2px] border-border bg-surface px-2 py-1 text-[7px] uppercase"
            >
              {label}
            </span>
          ),
        )}
      </div>
      <div className="mt-10 space-y-6">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className="brutal-border bg-surface p-5"
          >
            <h2 className="font-display text-2xl font-black uppercase">
              {project.title}
            </h2>
            <p className="font-pixel mt-1 text-[8px] text-electric">{project.year}</p>
            <p className="mt-3 text-sm leading-relaxed opacity-80">
              {project.longDescription}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="border border-border px-2 py-0.5 font-pixel text-[7px] uppercase"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-4 text-sm">
              {project.liveUrl !== "#" && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live
                </a>
              )}
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-10 text-sm">
        Also explore{" "}
        <Link href="/ai" className="underline">
          AI work
        </Link>
        ,{" "}
        <Link href="/research" className="underline">
          research
        </Link>
        , and{" "}
        <Link href="/blockchain" className="underline">
          blockchain projects
        </Link>
        .
      </p>
    </>
  );
}
