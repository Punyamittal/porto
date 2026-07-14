"use client";

import { PUBLIC_CREDENTIALS } from "@/data/credentials";

export function EvidenceList({
  title = "Documented results",
  limit,
}: {
  title?: string;
  limit?: number;
}) {
  const items =
    typeof limit === "number"
      ? PUBLIC_CREDENTIALS.slice(0, limit)
      : PUBLIC_CREDENTIALS;

  return (
    <section className="mt-12" aria-labelledby="evidence-heading">
      <h2
        id="evidence-heading"
        className="font-display text-2xl font-black uppercase sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm opacity-70">
        Competition placements, certifications, and programs — listed as recorded,
        not ranked claims.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id} id={item.id} className="brutal-border bg-surface p-4">
            <p className="font-pixel text-[8px] text-electric uppercase">
              {item.title}
            </p>
            <p className="mt-2 text-sm opacity-85">{item.description}</p>
            {"url" in item && typeof item.url === "string" && item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel mt-3 inline-block text-[7px] uppercase underline opacity-70 hover:opacity-100"
              >
                Official page →
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
