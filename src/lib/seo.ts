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
    name: "Punya Mittal",
    url: SITE_URL,
    jobTitle: "AI Engineer",
    description:
      "AI Engineer, Full Stack Developer, and Computer Science student at VIT Chennai.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "VIT Chennai",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Full Stack Development",
      "Blockchain",
      "Cloud Security",
      "Open Source",
    ],
    sameAs: [...SAME_AS],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Punya Mittal",
    url: SITE_URL,
    description:
      "Official portfolio of Punya Mittal — AI Engineer and Full Stack Developer at VIT Chennai.",
    author: { "@type": "Person", name: "Punya Mittal" },
    inLanguage: "en",
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
