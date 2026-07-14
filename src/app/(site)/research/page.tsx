import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PROJECTS, SKILL_CARDS } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

const RESEARCH_IDS = [
  "automl-pipeline",
  "kai",
  "llm-security",
  "crisproots",
  "hospital-rag",
];

export const metadata = createPageMetadata({
  title: "Research by Punya Mittal - AI & Machine Learning",
  description:
    "AI research by Punya Mittal spanning AutoML, LLM security, healthcare RAG, agri-AI digital twins, and emotion-aware systems.",
  path: "/research",
  keywords: ["Punya Mittal Research", "Machine Learning", "AutoML", "RAG"],
});

export default function ResearchPage() {
  const research = PROJECTS.filter((p) => RESEARCH_IDS.includes(p.id));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Research", path: "/research" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Research", href: "/research" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Research by Punya Mittal
      </h1>
      <h2 className="font-display mt-4 text-xl font-bold uppercase">
        Machine Learning · RAG · LLM Security · Agri-AI
      </h2>
      <p className="mt-6 max-w-3xl text-base opacity-80">
        Applied AI research with an engineering bias: systems that can be evaluated,
        defended, and shipped — from autonomous ML pipelines to hospital knowledge bases.
      </p>
      <div className="mt-10 space-y-5">
        {research.map((item) => (
          <article key={item.id} className="brutal-border bg-surface p-5">
            <h2 className="font-display text-xl font-black uppercase">{item.title}</h2>
            <p className="mt-2 text-sm opacity-80">{item.longDescription}</p>
          </article>
        ))}
      </div>
      <h2 className="font-display mt-12 text-2xl font-black uppercase">Core stack</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {SKILL_CARDS.map((skill) => (
          <li
            key={skill.id}
            className="border-[2px] border-border bg-surface px-2 py-1 font-pixel text-[7px] uppercase"
          >
            {skill.name} · {skill.level}
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm">
        See also{" "}
        <Link href="/ai" className="underline">
          AI projects
        </Link>{" "}
        and{" "}
        <Link href="/projects" className="underline">
          the full project index
        </Link>
        .
      </p>
    </>
  );
}
