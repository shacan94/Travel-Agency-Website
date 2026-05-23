import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/layout/whatsapp-cta";

export function InquiryCta() {
  return (
    <section id="plan" data-scroll-section className="bg-ink text-bone">
      <Container className="py-24 md:py-32">
        <div className="mx-auto flex max-w-[60ch] flex-col items-center gap-8 text-center" data-reveal>
          <p className="eyebrow text-clay">08 · Plan your trip</p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] text-bone">
            Tell us where you'd like to be,
            <br />
            roughly when, and with whom.
          </h2>
          <p className="max-w-[52ch] text-[1.0625rem] leading-[1.65] text-bone/70">
            Five minutes on a structured brief is usually all it takes for an agent to
            come back with a tailored quote the same day. No price-shopping. No template
            itineraries.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-5">
            <Button asChild size="lg" className="bg-clay hover:bg-clay-deep border-clay">
              <Link href="/inquire">Plan your trip →</Link>
            </Button>
            <WhatsAppCTA variant="link" className="text-bone/85 hover:text-bone">
              Or chat with us on WhatsApp
            </WhatsAppCTA>
          </div>
        </div>
      </Container>
    </section>
  );
}
