import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/data/portfolio";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Punya Mittal",
  description:
    "Contact Punya Mittal — AI Engineer and Full Stack Developer at VIT Chennai. Reach out via LinkedIn, GitHub, or Y-SoC.",
  path: "/contact",
  keywords: ["Contact Punya Mittal"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Contact Punya Mittal
      </h1>
      <p className="mt-4 max-w-2xl text-base opacity-80">
        Collaborations, open-source, research, and internship conversations welcome.
      </p>
      <ul className="mt-8 space-y-4">
        {Object.entries(SITE.social).map(([key, url]) => (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel border-[3px] border-border bg-surface px-4 py-3 text-[9px] uppercase shadow-[3px_3px_0_var(--border)] hover:bg-neon hover:text-black"
            >
              {key}
            </a>
          </li>
        ))}
      </ul>
      <FaqSection title="Before you reach out" />
    </>
  );
}
