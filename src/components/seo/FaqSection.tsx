import { FAQS } from "@/data/faq";

export function FaqSection({
  title = "Frequently asked questions",
}: {
  title?: string;
}) {
  return (
    <section className="mt-16 border-t-[3px] border-border pt-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-2xl font-black uppercase sm:text-3xl">
        {title}
      </h2>
      <dl className="mt-6 space-y-6">
        {FAQS.map((faq) => (
          <div key={faq.question}>
            <dt className="font-display text-lg font-bold">{faq.question}</dt>
            <dd className="mt-2 max-w-3xl text-sm leading-relaxed opacity-80 sm:text-base">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
