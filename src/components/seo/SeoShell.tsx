import Link from "next/link";
import { SITE } from "@/data/portfolio";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/ai", label: "AI" },
  { href: "/experience", label: "Experience" },
  { href: "/opensource", label: "Open Source" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function SeoShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
      <header className="border-b-[3px] border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="font-pixel border-[3px] border-border bg-yellow px-2 py-1 text-[8px] text-black shadow-[2px_2px_0_var(--border)] uppercase"
          >
            {SITE.name}
          </Link>
          <nav className="flex flex-wrap gap-2" aria-label="Site">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-pixel text-[7px] uppercase opacity-70 hover:bg-electric hover:text-black hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/"
            className="font-pixel border-[2px] border-border px-2 py-1 text-[7px] uppercase"
          >
            Live Experience
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
      <footer className="border-t-[3px] border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs opacity-70 sm:px-6">
          <p>© {new Date().getFullYear()} Punya Mittal</p>
          <div className="flex gap-4">
            <a href={SITE.social.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <Link href="/resume">Resume</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
