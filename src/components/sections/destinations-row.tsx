import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { EyebrowHeading } from "@/components/layout/eyebrow-heading";
import { getDestinations } from "@/lib/content";

export function DestinationsRow() {
  const destinations = getDestinations();

  return (
    <Section spacing="default" surface="bone" bleed>
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="mb-12 grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <EyebrowHeading
            number="03"
            eyebrow="Destinations"
            heading={
              <>
                Where we travel
                <br />
                most often.
              </>
            }
          />
          <Link
            href="/destinations"
            className="text-[0.875rem] font-medium text-clay underline-offset-4 hover:underline md:justify-self-end"
          >
            All destinations →
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex gap-6 px-[var(--container-px)] pb-2">
          {destinations.map((d, i) => (
            <li
              key={d.slug}
              data-reveal
              style={{ animationDelay: `${i * 80}ms` }}
              className="snap-start"
            >
              <Link
                href={`/destinations/${d.slug}`}
                className="group block w-[78vw] max-w-[420px] min-w-[280px]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <Image
                    src={d.heroImage.src}
                    alt={d.heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 78vw"
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
                  />
                  <div className="absolute right-5 bottom-5 left-5 text-bone">
                    <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-bone/75">
                      {d.region}
                    </p>
                    <p className="mt-1 font-display text-3xl leading-tight">{d.name}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
