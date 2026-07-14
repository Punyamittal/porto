import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Allow search + AI crawlers; keep API private. */
export default function robots(): MetadataRoute.Robots {
  const allowAll = {
    allow: "/",
    disallow: ["/api/"],
  };

  return {
    rules: [
      { userAgent: "*", ...allowAll },
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "ChatGPT-User", ...allowAll },
      { userAgent: "Google-Extended", ...allowAll },
      { userAgent: "anthropic-ai", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      { userAgent: "Claude-Web", ...allowAll },
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Applebot-Extended", ...allowAll },
      { userAgent: "CCBot", ...allowAll },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
