import { SeoShell } from "@/components/seo/SeoShell";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeoShell>{children}</SeoShell>;
}
