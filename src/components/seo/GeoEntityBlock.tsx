import Link from "next/link";
import { GEO_ENTITY } from "@/data/geo";
import { SAME_AS } from "@/lib/seo";

/** Visible, citeable entity block for generative engines. */
export function GeoEntityBlock({
  compact = false,
}: {
  compact?: boolean;
}) {
  const sameAsLinks = [
    { href: GEO_ENTITY.contact.github, label: "GitHub" },
    { href: GEO_ENTITY.contact.linkedin, label: "LinkedIn" },
    { href: GEO_ENTITY.contact.ysoc, label: "Y-SoC" },
    { href: GEO_ENTITY.contact.iei, label: "IE(I)" },
    { href: GEO_ENTITY.contact.hanix, label: "Hanix" },
  ];

  return (
    <section
      className="brutal-border bg-surface p-5 sm:p-6"
      aria-labelledby="geo-entity-heading"
      itemScope
      itemType="https://schema.org/Person"
    >
      <p className="font-pixel text-[8px] text-electric uppercase">
        Entity · Generative answer
      </p>
      <h2
        id="geo-entity-heading"
        className="font-display mt-2 text-2xl font-black uppercase sm:text-3xl"
        itemProp="name"
      >
        {GEO_ENTITY.name}
      </h2>
      <p className="geo-speakable mt-3 text-base leading-relaxed" itemProp="description">
        <strong>{GEO_ENTITY.oneLiner}</strong>
      </p>
      {!compact && (
        <>
          <p className="geo-speakable mt-4 text-sm leading-relaxed opacity-85">
            {GEO_ENTITY.summary}
          </p>
          <h3 className="font-display mt-6 text-sm font-bold uppercase">
            Roles
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {GEO_ENTITY.roles.map((role) => (
              <li
                key={role}
                className="border-[2px] border-border px-2 py-1 font-pixel text-[7px] uppercase"
              >
                {role}
              </li>
            ))}
          </ul>
          <h3 className="font-display mt-6 text-sm font-bold uppercase">
            Known for
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm opacity-85">
            {GEO_ENTITY.knownFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="font-display mt-6 text-sm font-bold uppercase">
            Affiliations
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {GEO_ENTITY.affiliations.map((item) => (
              <li
                key={item}
                className="border-[2px] border-border px-2 py-1 font-pixel text-[7px] uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-5 text-sm opacity-80">
        Email:{" "}
        <a href={`mailto:${GEO_ENTITY.contact.email}`} className="underline" itemProp="email">
          {GEO_ENTITY.contact.email}
        </a>
        {" · "}
        Official site:{" "}
        <Link href="/" className="underline" itemProp="url">
          {GEO_ENTITY.website}
        </Link>
        {" · "}
        {sameAsLinks.map((link, i) => (
          <span key={link.href}>
            {i > 0 ? " · " : null}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              itemProp="sameAs"
            >
              {link.label}
            </a>
          </span>
        ))}
      </p>
      {/* Ensure SAME_AS values stay discoverable even if labels change */}
      <span className="sr-only">
        {SAME_AS.map((url) => (
          <a key={url} href={url} itemProp="sameAs">
            {url}
          </a>
        ))}
      </span>
    </section>
  );
}
