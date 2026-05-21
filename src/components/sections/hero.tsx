import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/layout/whatsapp-cta";

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=2400&q=80&auto=format&fit=crop",
  alt: "Hot-air balloons rising over the rock formations of Cappadocia at dawn",
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-bone">
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
        />
      </div>

      <Container className="relative flex min-h-[88vh] flex-col justify-end py-24 md:min-h-[92vh] md:py-32">
        <div className="grid items-end gap-16 md:grid-cols-12">
          <div className="flex flex-col gap-7 md:col-span-7" data-reveal>
            <p className="eyebrow text-clay">
              <span className="mr-3">01</span>
              <span className="mr-3 inline-block h-px w-10 align-middle bg-clay/60" />
              An invitation
            </p>
            <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.98] tracking-tight text-bone">
              The trip you've been
              <br />
              meaning to take.
            </h1>
            <p className="max-w-[48ch] text-[1.0625rem] leading-[1.65] text-bone/80">
              Tailored journeys from Pakistan — outbound leisure across Turkey, Dubai, and
              the Far East, Umrah groups inside the Haram precinct, and the Northern Areas
              done at the pace they deserve. One brief, one quote, one agent on WhatsApp.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4" data-reveal style={{ animationDelay: "120ms" }}>
              <Button asChild size="lg">
                <Link href="/inquire">Plan your trip →</Link>
              </Button>
              <WhatsAppCTA variant="link" className="text-bone/85 hover:text-bone">
                Or chat with us on WhatsApp
              </WhatsAppCTA>
            </div>
          </div>

          <aside
            className="hidden flex-col gap-6 border-l border-bone/15 pl-8 md:col-span-4 md:col-start-9 md:flex"
            data-reveal
            style={{ animationDelay: "240ms" }}
          >
            <p className="eyebrow text-bone/55">Currently in season</p>
            <p className="font-display text-2xl leading-tight text-bone">
              Turkey is hitting its shoulder window — long, warm days without the August
              crowd.
            </p>
            <Link
              href="/destinations/turkey"
              className="text-[0.8125rem] font-medium text-clay underline-offset-4 hover:underline"
            >
              See Turkey itineraries →
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  );
}
