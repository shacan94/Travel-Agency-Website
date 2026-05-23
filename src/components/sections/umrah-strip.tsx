import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";

const UMRAH_IMAGE = {
  src: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1800&q=80&auto=format&fit=crop",
  alt: "The Prophet's Mosque in Madinah under an evening sky",
};

export function UmrahStrip() {
  return (
    <Section spacing="default" surface="bone" id="umrah" data-scroll-section>
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-sand md:aspect-[5/6]">
            <Image
              src={UMRAH_IMAGE.src}
              alt={UMRAH_IMAGE.alt}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-5" data-reveal style={{ animationDelay: "120ms" }}>
          <p className="eyebrow">
            <span className="mr-3">04</span>
            <span className="mr-3 inline-block h-px w-8 align-middle bg-clay/60" />
            Umrah
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05]">
            Small Umrah groups,
            <br />
            hotels inside the Haram precinct.
          </h2>
          <div className="prose-editorial mt-6 text-ink/70">
            <p>
              We keep our Umrah groups intentionally small — large enough for company on
              the journey, small enough that the travel agent in Madinah knows everyone's
              name. Hotels are confirmed inside the Haram precinct walking distance, in
              the 4-star and 5-star tiers, not on the outskirts.
            </p>
            <p>
              Departures from Karachi, Lahore, and Islamabad across Shawwal, Ramadan, and
              off-season — with the Saudi visa, transport, ziyarah, and meals handled
              before you board.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/umrah"
              className="inline-flex h-11 items-center rounded-full border border-ink px-6 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              See Umrah groups →
            </Link>
            <Link
              href="/visa/saudi-umrah"
              className="text-[0.8125rem] font-medium text-clay underline-offset-4 hover:underline"
            >
              Saudi visa explained →
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
