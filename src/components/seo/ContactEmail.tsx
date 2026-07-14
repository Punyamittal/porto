import { SITE } from "@/data/portfolio";

export function ContactEmail({
  className = "",
  label = SITE.email,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={`mailto:${SITE.email}?subject=Hire%20Punya%20Mittal`}
      className={
        className ||
        "font-pixel inline-block border-[3px] border-border bg-neon px-4 py-3 text-[9px] text-black uppercase shadow-[3px_3px_0_var(--border)] hover:bg-yellow"
      }
    >
      {label}
    </a>
  );
}
