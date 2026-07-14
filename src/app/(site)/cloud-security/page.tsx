import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PROJECTS } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cloud Security - Punya Mittal",
  description:
    "Cloud security learning and hardening notes from Punya Mittal — identity, secrets, LLM/application defense, and practical DevSecOps habits.",
  path: "/cloud-security",
  keywords: ["Punya Mittal Cloud Security", "LLM Security", "DevSecOps"],
});

export default function CloudSecurityPage() {
  const security = PROJECTS.find((p) => p.id === "llm-security");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cloud Security", path: "/cloud-security" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Cloud Security", href: "/cloud-security" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Cloud Security — Punya Mittal
      </h1>
      <h2 className="font-display mt-4 text-xl font-bold uppercase">
        Identity · Secrets · LLM Defense
      </h2>
      <p className="mt-6 max-w-3xl text-base opacity-80">
        Security practice for builders: reduce attack surface early, log what matters, and
        treat AI systems as production services with misuse modes.
      </p>
      {security && (
        <article className="brutal-border mt-10 bg-surface p-5">
          <h2 className="font-display text-xl font-black uppercase">{security.title}</h2>
          <p className="mt-2 text-sm opacity-80">{security.longDescription}</p>
        </article>
      )}
      <ul className="mt-8 list-disc space-y-2 pl-5 text-sm opacity-80">
        <li>Least-privilege identity and access patterns</li>
        <li>Secret handling and environment isolation</li>
        <li>Prompt injection / jailbreak monitoring for LLM apps</li>
        <li>Threat modeling before feature demos</li>
      </ul>
      <p className="mt-10 text-sm">
        Read:{" "}
        <Link href="/blog/learning-cloud-security-from-scratch" className="underline">
          Learning Cloud Security from Scratch
        </Link>
      </p>
    </>
  );
}
