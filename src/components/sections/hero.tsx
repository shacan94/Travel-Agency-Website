import { Container } from "@/components/layout/container";
import { WhatsAppCTA } from "@/components/layout/whatsapp-cta";
import { Component as InteractiveGlobe } from "@/components/ui/interactive-globe";
import { ShinyButton } from "@/components/ui/shiny-button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-bone text-ink">
      {/* Ambient blue glow — soft, off-center, picks up the globe's cool tones */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[80vh] w-[60vw] rounded-full bg-[var(--primary)]/[0.05] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/3 -bottom-40 h-[40vh] w-[40vw] rounded-full bg-[var(--accent)]/40 blur-3xl"
      />

      <Container className="relative grid min-h-[88vh] items-center gap-12 py-20 md:min-h-[92vh] md:grid-cols-12 md:gap-16 md:py-28">
        {/* Editorial copy — left */}
        <div className="flex flex-col gap-7 md:col-span-6" data-reveal>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--accent)]/40 px-3 py-1 text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--accent-foreground)]">
            <span className="size-1.5 animate-pulse rounded-full bg-[var(--chart-2)]" />
            Now booking — Shawwal Umrah & summer Hunza
          </div>

          <h1 className="font-display text-[clamp(2.75rem,6.5vw,4.75rem)] leading-[1] tracking-tight text-ink">
            The trip you've been
            <br />
            <span className="bg-gradient-to-r from-[var(--primary)] to-[#5fb8f4] bg-clip-text text-transparent">
              meaning to take.
            </span>
          </h1>

          <p className="max-w-[48ch] text-[1.0625rem] leading-[1.65] text-ink/70">
            Tailored journeys from Pakistan — outbound leisure across Turkey, Dubai, and the
            Far East; Umrah groups inside the Haram precinct; the Northern Areas done at
            the pace they deserve. One brief, one quote, one agent on WhatsApp.
          </p>

          <div
            className="mt-2 flex flex-wrap items-center gap-4"
            data-reveal
            style={{ animationDelay: "120ms" }}
          >
            <ShinyButton href="/inquire">Plan your trip →</ShinyButton>
            <WhatsAppCTA variant="link">Or chat with us on WhatsApp</WhatsAppCTA>
          </div>

          {/* Stats strip */}
          <div
            className="mt-6 flex flex-wrap items-center gap-6 border-t border-[var(--border)] pt-6"
            data-reveal
            style={{ animationDelay: "240ms" }}
          >
            <div>
              <p className="font-display text-3xl leading-none text-ink">28+</p>
              <p className="mt-1.5 text-[0.6875rem] uppercase tracking-[0.18em] text-ink/55">
                Destinations
              </p>
            </div>
            <div className="h-10 w-px bg-[var(--border)]" />
            <div>
              <p className="font-display text-3xl leading-none text-ink">3</p>
              <p className="mt-1.5 text-[0.6875rem] uppercase tracking-[0.18em] text-ink/55">
                Departure cities
              </p>
            </div>
            <div className="h-10 w-px bg-[var(--border)]" />
            <div>
              <p className="font-display text-3xl leading-none text-ink">&lt;4h</p>
              <p className="mt-1.5 text-[0.6875rem] uppercase tracking-[0.18em] text-ink/55">
                Avg quote time
              </p>
            </div>
          </div>
        </div>

        {/* Interactive globe — right */}
        <div
          className="relative flex items-center justify-center md:col-span-6"
          data-reveal
          style={{ animationDelay: "180ms" }}
        >
          <div className="relative aspect-square w-full max-w-[540px]">
            <InteractiveGlobe size={540} className="!h-full !w-full" />
            <p
              aria-hidden
              className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[0.625rem] uppercase tracking-[0.22em] text-ink/40"
            >
              Drag the globe to explore — our active routes
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
