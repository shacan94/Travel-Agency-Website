import { Section } from "@/components/layout/section";

interface Testimonial {
  quote: string;
  attribution: string;
  trip?: string;
}

/**
 * Placeholder testimonials are deliberately empty — CLAUDE.md §15 prohibits
 * fake testimonials. The section renders nothing until the agency supplies
 * real reviews. (Hooking this up to the Google Business API is a Phase 2 task.)
 */
const TESTIMONIALS: Testimonial[] = [];

export function Proof() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section spacing="default" surface="bone">
      <div className="grid items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">07 · In our clients' words</p>
        </div>
        <ul className="md:col-span-8 md:space-y-16">
          {TESTIMONIALS.map((t, i) => (
            <li key={i} data-reveal>
              <blockquote className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.25] text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="mt-5 text-[0.8125rem] uppercase tracking-[0.18em] text-ink/55">
                {t.attribution}
                {t.trip ? ` · ${t.trip}` : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
