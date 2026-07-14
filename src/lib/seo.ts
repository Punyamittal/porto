import type { Metadata } from "next";
import { SITE } from "@/data/portfolio";

export const SITE_URL = "https://punyamittal.space";

export const DEFAULT_KEYWORDS = [
  "Punya Mittal",
  "Punya Mittal AI",
  "Punya Mittal VIT",
  "Punya Mittal VIT Chennai",
  "Punya Mittal Portfolio",
  "Punya Mittal GitHub",
  "Punya Mittal AI Engineer",
  "Punya Mittal Full Stack Developer",
  "Punya Mittal Research",
  "Punya Mittal Blockchain",
  "Punya Mittal freelance",
  "hire Punya Mittal",
  "AI Engineer Chennai",
  "AI Engineer Delhi",
  "AI Engineer near me",
  "freelance website creation",
  "freelance website developer Chennai",
  "website developer VIT Chennai",
  "AI Engineer",
  "Full Stack Developer",
  "VIT Chennai",
  "Machine Learning",
  "Blockchain",
  "React",
  "Next.js",
  "Open Source",
] as const;

export const ROLE_H2S = [
  "AI Engineer",
  "Computer Science Student at VIT Chennai",
  "Full Stack Developer",
  "Open Source Contributor",
] as const;

export const SAME_AS = [
  SITE.social.github,
  SITE.social.linkedin,
  SITE.social.ysoc,
] as const;

export const SEO_ROUTES = [
  { path: "/", title: "Home", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", title: "About", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/projects", title: "Projects", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/research", title: "Research", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/experience", title: "Experience", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/ai", title: "AI", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blockchain", title: "Blockchain", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/cloud-security", title: "Cloud Security", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/opensource", title: "Open Source", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog", title: "Blog", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/contact", title: "Contact", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/resume", title: "Resume", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/faq", title: "FAQ", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/achievements", title: "Achievements", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/hire", title: "Hire", priority: 0.95, changeFrequency: "weekly" as const },
  {
    path: "/freelance-website-creation",
    title: "Freelance Website Creation",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/ai-engineer-chennai",
    title: "AI Engineer Chennai",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
] as const;

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const keywordList = [...new Set([...DEFAULT_KEYWORDS, ...keywords])];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywordList,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Punya Mittal",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Punya Mittal",
    alternateName: ["Punya Mittal AI", "Punya Mittal VIT"],
    url: SITE_URL,
    image: `${SITE_URL}/favicon.ico`,
    jobTitle: ["AI Engineer", "Full Stack Developer"],
    description:
      "Punya Mittal is an AI Engineer, Full Stack Developer, and Computer Science student at VIT Chennai. Founder of Y-SoC.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "VIT Chennai",
      sameAs: "https://chennai.vit.ac.in/",
    },
    affiliation: [
      { "@type": "Organization", name: "Y-SoC", url: "https://www.ysoc.in" },
      { "@type": "Organization", name: "VIT Chennai" },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Large Language Models",
      "Retrieval Augmented Generation",
      "Full Stack Development",
      "React",
      "Next.js",
      "Blockchain",
      "Cloud Security",
      "Open Source",
    ],
    nationality: { "@type": "Country", name: "India" },
    email: SITE.email,
    homeLocation: {
      "@type": "Place",
      name: "Greater Delhi Area / Chennai, India",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    sameAs: [...SAME_AS],
    mainEntityOfPage: SITE_URL,
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#services`,
    name: "Punya Mittal — Freelance AI & Website Development",
    url: `${SITE_URL}/hire`,
    image: `${SITE_URL}/favicon.ico`,
    description:
      "Freelance website creation, full-stack development, and AI engineering services by Punya Mittal — available in Chennai, Delhi NCR, and remote worldwide.",
    email: SITE.email,
    priceRange: "$$",
    founder: { "@id": `${SITE_URL}/#person` },
    employee: { "@id": `${SITE_URL}/#person` },
    areaServed: SITE.areasServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    availableLanguage: ["English", "Hindi"],
    sameAs: [...SAME_AS],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      url: `${SITE_URL}/contact`,
      availableLanguage: ["English", "Hindi"],
      areaServed: SITE.areasServed,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Freelance services by Punya Mittal",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Freelance website creation",
            description:
              "Custom portfolio, business, and product websites with Next.js, React, and SEO.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI engineering",
            description:
              "LLM apps, RAG systems, AutoML pipelines, and applied machine learning builds.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-stack product development",
            description:
              "End-to-end web apps for startups, campuses, and research teams.",
          },
        },
      ],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Punya Mittal",
    alternateName: "Punya Mittal Portfolio",
    url: SITE_URL,
    description:
      "Official portfolio of Punya Mittal — AI Engineer and Full Stack Developer at VIT Chennai.",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: "Punya Mittal",
      url: SITE_URL,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Person",
      name: "Punya Mittal",
    },
  };
}

export function faqJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
