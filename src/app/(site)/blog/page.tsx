import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS } from "@/data/blog";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog by Punya Mittal - AI, Blockchain & Engineering",
  description:
    "Engineering blog by Punya Mittal covering AI assistants, blockchain, cloud security, Next.js portfolios, VIT Chennai, and shipped products.",
  path: "/blog",
  keywords: ["Punya Mittal Blog", "AI Blog", "Blockchain Blog"],
});

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
      <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-black uppercase">
        Blog by Punya Mittal
      </h1>
      <p className="mt-4 max-w-3xl text-base opacity-80">
        Build logs and explainers for search engines, AI assistants, and other builders.
      </p>
      <div className="mt-10 space-y-5">
        {posts.map((post) => (
          <article key={post.slug} className="brutal-border bg-surface p-5">
            <h2 className="font-display text-xl font-black uppercase">
              <Link href={`/blog/${post.slug}`} className="hover:text-hot-pink">
                {post.title}
              </Link>
            </h2>
            <p className="font-pixel mt-1 text-[8px] text-electric">{post.publishedAt}</p>
            <p className="mt-2 text-sm opacity-80">{post.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}
