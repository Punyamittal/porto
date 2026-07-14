import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS, getPost } from "@/data/blog";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleJsonLd(post),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <article>
        <p className="font-pixel text-[8px] text-electric uppercase">
          {post.publishedAt} · Punya Mittal
        </p>
        <h1 className="font-display mt-3 text-[clamp(2rem,6vw,3.5rem)] font-black uppercase">
          {post.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base opacity-80">{post.description}</p>
        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed opacity-90">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="border border-border px-2 py-1 font-pixel text-[7px] uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
      </article>
      <p className="mt-12 text-sm">
        <Link href="/blog" className="underline">
          ← All posts
        </Link>
      </p>
    </>
  );
}
