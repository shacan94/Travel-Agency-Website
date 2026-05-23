import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ValueStrip } from "@/components/sections/value-strip";
import { FeaturedPackages } from "@/components/sections/featured-packages";
import { DestinationsRow } from "@/components/sections/destinations-row";
import { UmrahStrip } from "@/components/sections/umrah-strip";
import { NorthernAreasStrip } from "@/components/sections/northern-areas-strip";
import { Process } from "@/components/sections/process";
import { Proof } from "@/components/sections/proof";
import { InquiryCta } from "@/components/sections/inquiry-cta";
import { PageScrollProgress } from "@/components/layout/page-scroll-progress";
import { SectionNav, type SectionNavItem } from "@/components/layout/section-nav";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description:
    "Tailored travel from Pakistan — outbound leisure, Umrah, and the Northern Areas. Quotes in hours, not days.",
};

const NAV_ITEMS: SectionNavItem[] = [
  { id: "hero", label: "Welcome" },
  { id: "packages", label: "Packages" },
  { id: "destinations", label: "Destinations" },
  { id: "umrah", label: "Umrah" },
  { id: "northern-areas", label: "Northern Areas" },
  { id: "process", label: "How we plan" },
  { id: "plan", label: "Plan a trip" },
];

export default function HomePage() {
  return (
    <div className="relative w-full max-w-full overflow-x-hidden bg-gradient-to-br from-bone via-[var(--muted)]/30 to-bone">
      <PageScrollProgress />
      <SectionNav items={NAV_ITEMS} />

      <Hero />
      <ValueStrip />
      <FeaturedPackages />
      <DestinationsRow />
      <UmrahStrip />
      <NorthernAreasStrip />
      <Process />
      <Proof />
      <InquiryCta />
    </div>
  );
}
