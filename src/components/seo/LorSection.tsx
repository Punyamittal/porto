import { LETTERS_OF_RECOMMENDATION } from "@/data/portfolio";

export function LorSection({
  title = "Letters of recommendation",
}: {
  title?: string;
}) {
  return (
    <section className="mt-12" aria-labelledby="lor-heading">
      <h2
        id="lor-heading"
        className="font-display text-2xl font-black uppercase sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm opacity-70">
        PDFs hosted publicly — Uber and Black Duck letters are from employees I
        worked with; Analytx4t and DYO Central Delhi as labeled.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {LETTERS_OF_RECOMMENDATION.map((lor) => (
          <li key={lor.id} className="brutal-border bg-surface p-4">
            <p className="font-pixel text-[8px] text-hot-pink uppercase">
              {lor.org}
            </p>
            <p className="font-display mt-1 text-base font-bold uppercase">
              {lor.title}
            </p>
            <p className="mt-2 text-xs opacity-70">{lor.detail}</p>
            <a
              href={lor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel mt-3 inline-block border-[2px] border-border bg-electric px-2 py-1 text-[7px] text-black uppercase"
            >
              Open PDF →
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
