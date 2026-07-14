import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blockchain Projects by Punya Mittal",
  description:
    "Blockchain projects and experiments by Punya Mittal — ERC-20 tokens, Base network builds, and Web3 learning in public.",
  path: "/blockchain",
  keywords: ["Punya Mittal Blockchain", "ERC-20", "Base", "Web3"],
});

export default function BlockchainPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blockchain", path: "/blockchain" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blockchain", href: "/blockchain" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Blockchain Projects by Punya Mittal
      </h1>
      <h2 className="font-display mt-4 text-xl font-bold uppercase">
        Tokens · Base · Web3 Experiments
      </h2>
      <p className="mt-6 max-w-3xl text-base opacity-80">
        Blockchain is treated as an engineering practice: contracts, deployment discipline,
        documentation, and clear utility — not hype.
      </p>
      <div className="mt-10 space-y-5">
        <article className="brutal-border bg-surface p-5">
          <h2 className="font-display text-xl font-black uppercase">Hanix Token</h2>
          <p className="mt-2 text-sm opacity-80">
            Token experiment focused on readable contracts, distribution assumptions, and
            student-friendly Web3 learning loops.
          </p>
        </article>
        <article className="brutal-border bg-surface p-5">
          <h2 className="font-display text-xl font-black uppercase">
            ERC-20 on Base
          </h2>
          <p className="mt-2 text-sm opacity-80">
            End-to-end practice: mint rules, explorer verification, wallet UX, and safety
            checklist for small public deployments.
          </p>
        </article>
      </div>
      <p className="mt-10 text-sm">
        Related writing:{" "}
        <Link href="/blog/building-an-erc-20-token-on-base" className="underline">
          Building an ERC-20 Token on Base
        </Link>{" "}
        ·{" "}
        <Link href="/blog/building-hanix-token" className="underline">
          Building Hanix Token
        </Link>
      </p>
    </>
  );
}
