import { Section } from "@/components/layout/section";
import { EyebrowHeading } from "@/components/layout/eyebrow-heading";
import { brand } from "@/lib/brand";

const STEPS = [
  {
    n: "01",
    title: "Share your brief.",
    body: "A few minutes on a structured form — who's travelling, roughly when, and what kind of trip you have in mind. Or message us on WhatsApp; we'll capture the same details for you.",
  },
  {
    n: "02",
    title: "Get a tailored quote within hours.",
    body: "An agent builds an itinerary that fits — hotels at the tier you want, the right pacing, the inclusions that matter. Not a template; a real plan you can react to.",
    aiNote: true,
  },
  {
    n: "03",
    title: "Travel with a dedicated agent on WhatsApp.",
    body: "From booking through the trip itself, one agent handles you. Visa support, flight changes, the in-trip 'where do we eat tonight' — the same number, end to end.",
  },
];

export function Process() {
  return (
    <Section spacing="default" surface="sand" id="process" data-scroll-section>
      <div className="flex flex-col gap-14">
        <EyebrowHeading
          number="06"
          eyebrow="How we plan"
          heading={
            <>
              Three steps,
              <br />
              start to boarding pass.
            </>
          }
        />

        <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              data-reveal
              style={{ animationDelay: `${i * 100}ms` }}
              className="flex flex-col gap-5 border-t border-ink/15 pt-8"
            >
              <p className="font-display text-5xl text-clay md:text-6xl">{step.n}</p>
              <h3 className="font-display text-[1.625rem] leading-tight">{step.title}</h3>
              <p className="text-[0.9375rem] leading-[1.65] text-ink/70">{step.body}</p>
              {step.aiNote && brand.phase >= 2 ? (
                <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.18em] text-clay">
                  Powered by AI · reviewed by your agent
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
