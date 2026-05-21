import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";

const NA_IMAGE = {
  src: "https://images.unsplash.com/photo-1591019479261-1a103585c559?w=1800&q=80&auto=format&fit=crop",
  alt: "Karakoram peaks rising above Hunza Valley at golden hour",
};

export function NorthernAreasStrip() {
  return (
    <Section spacing="default" surface="bone">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5 md:order-1" data-reveal style={{ animationDelay: "120ms" }}>
          <p className="eyebrow">
            <span className="mr-3">05</span>
            <span className="mr-3 inline-block h-px w-8 align-middle bg-clay/60" />
            Northern Areas
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05]">
            Hunza, Skardu, Naran —
            <br />
            at a pace that suits the road.
          </h2>
          <div className="prose-editorial mt-6 text-ink/70">
            <p>
              The Karakoram is a long drive done well, not a fast one done badly. We run
              comfortable 4x4 and SUV transport with local KKH drivers who've made the
              switchbacks a thousand times, and stays we've actually slept in.
            </p>
            <p>
              Hunza, Nagar, Khunjerab, Skardu, Naran, Kalam, Malam Jabba — across the
              spring blossom, summer green, and autumn copper. We fly you to Islamabad,
              we drive you the rest.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/northern-areas"
              className="inline-flex h-11 items-center rounded-full border border-ink px-6 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              See Northern Areas trips →
            </Link>
          </div>
        </div>

        <div className="md:col-span-7 md:order-2" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-sand md:aspect-[5/6]">
            <Image
              src={NA_IMAGE.src}
              alt={NA_IMAGE.alt}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
