import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsForTopics } from "@/data/faq";
import { HANIX } from "@/data/portfolio";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
} from "@/lib/seo";

const BLOCKCHAIN_FAQS = faqsForTopics([
  "blockchain",
  "hanix",
  "erc-20",
  "base",
  "web3",
]);

export const metadata = createPageMetadata({
  title: "Blockchain Projects by Punya Mittal — Hanix (HNX) on Base",
  description:
    "Blockchain projects by Punya Mittal including Hanix (HNX), a modern ERC-20 token on Base with Solidity contracts, wallet integration, and a live Web3 dashboard at hanix.website.",
  path: "/blockchain",
  keywords: [
    "Punya Mittal Blockchain",
    "Hanix",
    "HNX",
    "ERC-20",
    "Base",
    "Web3",
    "Solidity",
  ],
});

export default function BlockchainPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blockchain", path: "/blockchain" },
          ]),
          faqJsonLd(BLOCKCHAIN_FAQS),
        ]}
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
      <p className="geo-speakable mt-4 max-w-3xl text-lg font-medium leading-relaxed">
        Punya Mittal builds Web3 learning projects end-to-end — including Hanix
        (HNX), a modern ERC-20 on Base.
      </p>
      <h2 className="font-display mt-4 text-xl font-bold uppercase">
        Tokens · Base · Web3 Experiments
      </h2>
      <p className="mt-6 max-w-3xl text-base opacity-80">
        Blockchain is treated as an engineering practice: contracts, deployment
        discipline, documentation, and clear utility — not hype.
      </p>

      <article className="brutal-border mt-10 bg-surface p-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/50">
          Featured · Live
        </p>
        <h2 className="font-display mt-2 text-2xl font-black uppercase">
          {HANIX.name} ({HANIX.ticker})
        </h2>
        <p className="geo-speakable mt-3 max-w-2xl text-sm opacity-80">
          {HANIX.tagline}. Personal Web3 learning project covering Solidity ERC-20
          contracts (OpenZeppelin), Base deployment, Wagmi/Viem wallet connectivity,
          and a production Next.js interface with tokenomics, roadmap, whitepaper,
          and on-chain dashboard.
        </p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Network", HANIX.network],
            ["Standard", HANIX.standard],
            ["Total supply", HANIX.supply],
            ["Tax", "0%"],
            ["Mintable", "No (fixed supply)"],
            ["Stack", "Solidity · Next.js · Wagmi"],
          ].map(([k, v]) => (
            <div key={k} className="brutal-border bg-bg/40 px-3 py-2">
              <dt className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink/45">
                {k}
              </dt>
              <dd className="mt-1 text-sm font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm">
          <a
            href={HANIX.website}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Visit {HANIX.name} → hanix.website
          </a>
        </p>
      </article>

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
      <FaqSection title="Blockchain FAQ" items={BLOCKCHAIN_FAQS} id="blockchain-faq" />
    </>
  );
}
