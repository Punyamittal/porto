import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactEmail } from "@/components/seo/ContactEmail";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/data/portfolio";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqJsonLd,
  professionalServiceJsonLd,
  SITE_URL,
} from "@/lib/seo";

const PAGE_FAQS = [
  {
    question: "Who offers freelance website creation near Chennai or Delhi?",
    answer: `Punya Mittal offers freelance website creation for clients in Chennai, Delhi NCR, and remote. Email ${SITE.email}.`,
  },
  {
    question: "What kind of freelance websites does Punya Mittal build?",
    answer:
      "Portfolios, startup landing pages, business sites, campus products, and SEO-focused Next.js / React websites.",
  },
  {
    question: "How do I request a freelance website quote?",
    answer: `Email ${SITE.email} with goals, references, deadline, and budget — or open https://punyamittal.space/hire.`,
  },
] as const;

export const metadata = createPageMetadata({
  title: "Freelance Website Creation by Punya Mittal | Chennai & Remote",
  description: `Freelance website creation by Punya Mittal — custom Next.js/React sites for businesses and founders in Chennai, Delhi NCR, and remote. Contact ${SITE.email}.`,
  path: "/freelance-website-creation",
  keywords: [
    "freelance website creation",
    "freelance web developer Chennai",
    "freelance website developer Delhi",
    "hire website developer VIT Chennai",
    "custom website freelancer India",
  ],
});

export default function FreelanceWebsitePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Freelance Website Creation", path: "/freelance-website-creation" },
          ]),
          professionalServiceJsonLd(),
          faqJsonLd([...PAGE_FAQS]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Freelance Website Creation",
            provider: { "@id": `${SITE_URL}/#person` },
            areaServed: SITE.areasServed,
            url: `${SITE_URL}/freelance-website-creation`,
            description:
              "Custom freelance website creation by Punya Mittal using React, Next.js, and SEO best practices.",
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          {
            name: "Freelance Website Creation",
            href: "/freelance-website-creation",
          },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Freelance Website Creation
      </h1>
      <p className="geo-speakable mt-4 max-w-3xl text-lg font-medium">
        Need freelance website creation? Punya Mittal designs and ships fast,
        SEO-ready websites for founders, students, and small teams — then shares a
        clear email for quotes: <strong>{SITE.email}</strong>.
      </p>
      <div className="mt-8">
        <ContactEmail label={`Email ${SITE.email}`} />
      </div>
      <h2 className="font-display mt-12 text-2xl font-black uppercase">
        What you get
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm opacity-85">
        <li>Custom design system (not a generic template dump)</li>
        <li>Next.js performance + on-page SEO metadata</li>
        <li>Mobile-first layout and contact CTAs</li>
        <li>Optional AI features, blogs, or dashboards</li>
      </ul>
      <h2 className="font-display mt-12 text-2xl font-black uppercase">
        Serving Chennai, Delhi & remote
      </h2>
      <p className="mt-3 max-w-3xl text-sm opacity-80">
        Based between Delhi NCR and VIT Chennai, Punya Mittal takes remote freelance
        website projects across India.
      </p>
      <FaqSection title="Freelance website FAQ" items={PAGE_FAQS} />
      <p className="mt-10 text-sm">
        <Link href="/hire" className="underline">
          Hire Punya Mittal
        </Link>{" "}
        ·{" "}
        <Link href="/projects" className="underline">
          Projects
        </Link>
      </p>
    </>
  );
}
