import { Container } from "@/components/layout/container";
import { WhatsAppCTA } from "@/components/layout/whatsapp-cta";
import Globe from "@/components/ui/globe";
import ProceduralGroundBackground from "@/components/ui/procedural-ground-background";
import { ShinyButton } from "@/components/ui/shiny-button";

export function Hero() {
  return (
    <section
      id="hero"
      data-scroll-section
      className="relative isolate overflow-hidden bg-bone text-ink"
    >
      {/* WebGL procedural-ground background — topographic neon ripple shader,
       * scoped to the Hero only (absolute, not fixed). Sits at -z-10 inside
       * the section's isolate context so it stays behind the glows + content. */}
      <ProceduralGroundBackground />

      {/* Ambient blue glow — soft, off-center, picks up the WebGL background's cool tones */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[80vh] w-[60vw] rounded-full bg-[var(--primary)]/[0.05] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/3 -bottom-40 h-[40vh] w-[40vw] rounded-full bg-[var(--accent)]/40 blur-3xl"
      />

      <Container className="relative grid min-h-[88vh] items-center gap-12 py-20 md:min-h-[92vh] md:grid-cols-12 md:gap-16 md:py-28">
        {/* Editorial copy — left column on md:col-span-6 */}
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

        {/* Earth globe — right column. The supplied component is fixed at
         * 250×250; a CSS transform scales it up to read as a proper hero
         * visual without modifying the component's hardcoded dimensions
         * (which the box-shadow lighting depends on). The wrapper reserves
         * the post-scale footprint so the scaled visual doesn't overlap
         * the editorial copy column. */}
        <div
          className="relative flex items-center justify-center md:col-span-6"
          data-reveal
          style={{ animationDelay: "180ms" }}
        >
          <div className="flex h-[280px] w-[280px] items-center justify-center sm:h-[380px] sm:w-[380px] md:h-[420px] md:w-[420px] lg:h-[480px] lg:w-[480px]">
            <div className="origin-center scale-[1.1] sm:scale-[1.5] md:scale-[1.65] lg:scale-[1.9]">
              <Globe />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
