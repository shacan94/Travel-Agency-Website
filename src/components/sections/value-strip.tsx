import { Container } from "@/components/layout/container";

const VALUES = [
  {
    n: "01",
    headline: "Quotes in hours, not days.",
    body: "Every brief we receive goes straight into a structured pipeline, not a notebook. You hear back the same day, usually within hours.",
  },
  {
    n: "02",
    headline: "Real itineraries, no copy-paste.",
    body: "Every itinerary is shaped to who you're travelling with — pace, hotel tier, what you'd skip and what you'd repeat — not pulled from a template.",
  },
  {
    n: "03",
    headline: "Visa support that actually replies.",
    body: "Embassy-specific checklists, document review, and an agent who answers on WhatsApp through the application — and through the trip.",
  },
];

export function ValueStrip() {
  return (
    <section className="hairline-b bg-bone">
      <Container>
        <div className="grid divide-y divide-mist md:grid-cols-3 md:divide-x md:divide-y-0">
          {VALUES.map((v, i) => (
            <div
              key={v.n}
              className="flex flex-col gap-3 py-10 md:py-16 md:px-10 md:first:pl-0 md:last:pr-0"
              data-reveal
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="eyebrow">{v.n}</p>
              <p className="font-display text-2xl leading-tight md:text-[1.75rem]">{v.headline}</p>
              <p className="text-[0.9375rem] text-ink/65 leading-[1.65]">{v.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
