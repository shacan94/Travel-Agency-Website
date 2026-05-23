import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { EyebrowHeading } from "@/components/layout/eyebrow-heading";
import { getFeaturedPackages } from "@/lib/content";

const CATEGORY_LABEL: Record<string, string> = {
  Outbound: "Outbound",
  Umrah: "Umrah",
  "Northern Areas": "Northern Areas",
};

export function FeaturedPackages() {
  const packages = getFeaturedPackages();

  return (
    <Section spacing="default" surface="bone" id="packages" data-scroll-section>
      <div className="flex flex-col gap-14">
        <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <EyebrowHeading
            number="02"
            eyebrow="Featured journeys"
            heading={
              <>
                A handful of trips
                <br />
                we'd send our own family on.
              </>
            }
          />
          <p className="max-w-[42ch] text-[0.9375rem] text-ink/65 leading-[1.65] md:justify-self-end md:text-right">
            Inquiry-first. We don't list prices because the right number depends on hotel
            tier, season, and how you actually want to travel.{" "}
            <Link href="/packages" className="text-clay underline-offset-4 hover:underline">
              Browse all packages →
            </Link>
          </p>
        </div>

        <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p, i) => (
            <li
              key={p.slug}
              data-reveal
              style={{ animationDelay: `${i * 60}ms` }}
              className={i % 2 === 1 ? "lg:translate-y-12" : undefined}
            >
              <Link
                href={`/packages/${p.slug}`}
                className="group flex flex-col gap-4"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <Image
                    src={p.heroImage.src}
                    alt={p.heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 88vw"
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center justify-between text-[0.6875rem] uppercase tracking-[0.18em] text-ink/55">
                  <span>{CATEGORY_LABEL[p.category]}</span>
                  <span>
                    {p.durationNights} {p.durationNights === 1 ? "night" : "nights"}
                  </span>
                </div>
                <h3 className="font-display text-[1.5rem] leading-tight text-ink transition-colors duration-300 group-hover:text-clay-deep">
                  {p.title}
                </h3>
                <p className="text-[0.875rem] text-ink/60 leading-[1.6]">{p.summary}</p>
                <span className="mt-1 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-clay underline-offset-4 group-hover:underline">
                  Request a quote →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
