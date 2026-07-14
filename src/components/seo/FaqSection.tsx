import { FAQS, type FaqItem } from "@/data/faq";

export function FaqSection({
  title = "Frequently asked questions",
  items = FAQS,
  id = "faq-heading",
}: {
  title?: string;
  items?: readonly FaqItem[];
  id?: string;
}) {
  return (
    <section
      className="mt-16 border-t-[3px] border-border pt-10"
      aria-labelledby={id}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2
        id={id}
        className="font-display text-2xl font-black uppercase sm:text-3xl"
      >
        {title}
      </h2>
      <dl className="mt-6 space-y-6">
        {items.map((faq) => (
          <div
            key={faq.question}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <dt
              className="font-display text-lg font-bold"
              itemProp="name"
            >
              {faq.question}
            </dt>
            <dd
              className="mt-2 max-w-3xl text-sm leading-relaxed opacity-80 sm:text-base"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <span itemProp="text">{faq.answer}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
