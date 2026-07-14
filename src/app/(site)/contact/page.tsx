import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactEmail } from "@/components/seo/ContactEmail";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqsForTopics } from "@/data/faq";
import { GEO_ENTITY } from "@/data/geo";
import { SITE } from "@/data/portfolio";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  professionalServiceJsonLd,
} from "@/lib/seo";

const CONTACT_FAQS = [
  ...faqsForTopics(["contact", "github", "linkedin", "reach"]),
  {
    question: "What is Punya Mittal’s email address?",
    answer: `Punya Mittal’s public email is ${SITE.email}. Use it for freelance website creation, AI engineering, and collaborations.`,
  },
] as const;

export const metadata = createPageMetadata({
  title: "Contact Punya Mittal | Email for Freelance & AI Work",
  description: `Contact Punya Mittal at ${SITE.email} — AI Engineer and freelance website developer in Chennai, Delhi NCR, and remote.`,
  path: "/contact",
  keywords: [
    "Contact Punya Mittal",
    "Punya Mittal email",
    "Punya Mittal LinkedIn",
    "hire AI engineer Chennai email",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqJsonLd([...CONTACT_FAQS]),
          professionalServiceJsonLd(),
        ]}
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
      <p className="geo-speakable mt-4 max-w-2xl text-lg font-medium">
        Email Punya Mittal at{" "}
        <a className="underline" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>{" "}
        for freelance website creation, AI engineering near Chennai/Delhi, and
        collaborations.
      </p>
      <div className="mt-8">
        <ContactEmail label={`Email ${SITE.email}`} />
      </div>
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
      <p className="mt-6 text-sm opacity-70">
        Official site: {GEO_ENTITY.website} · Areas: {SITE.areasServed.join(", ")}
      </p>
      <FaqSection title="Contact FAQ" items={CONTACT_FAQS} />
    </>
  );
}
