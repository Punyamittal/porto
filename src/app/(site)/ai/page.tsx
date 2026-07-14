import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PROJECTS } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

const AI_IDS = [
  "automl-pipeline",
  "kai",
  "llm-security",
  "crisproots",
  "hospital-rag",
  "rehab",
  "gear-lab",
];

export const metadata = createPageMetadata({
  title: "AI Engineer Punya Mittal - Machine Learning Work",
  description:
    "AI engineering work by Punya Mittal: AutoML, RAG, LLM security, emotion AI, agri-AI, and applied machine learning systems.",
  path: "/ai",
  keywords: ["Punya Mittal AI", "Punya Mittal AI Engineer", "Machine Learning"],
});

export default function AiPage() {
  const items = PROJECTS.filter((p) => AI_IDS.includes(p.id));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI", path: "/ai" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "AI", href: "/ai" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        AI Engineer — Punya Mittal
      </h1>
      <h2 className="font-display mt-4 text-xl font-bold uppercase">
        Machine Learning Systems that Ship
      </h2>
      <p className="mt-6 max-w-3xl text-base opacity-80">
        Punya Mittal builds AI products with production instincts: evaluation, safety,
        user impact, and clear technical writing.
      </p>
      <div className="mt-10 space-y-5">
        {items.map((item) => (
          <article key={item.id} className="brutal-border bg-surface p-5">
            <h2 className="font-display text-xl font-black uppercase">{item.title}</h2>
            <p className="mt-2 text-sm opacity-80">{item.description}</p>
          </article>
        ))}
      </div>
      <p className="mt-10 text-sm">
        Dig deeper in{" "}
        <Link href="/research" className="underline">
          research
        </Link>{" "}
        and{" "}
        <Link href="/projects" className="underline">
          all projects
        </Link>
        .
      </p>
    </>
  );
}
