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
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description:
    "Tailored travel from Pakistan — outbound leisure, Umrah, and the Northern Areas. Quotes in hours, not days.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <FeaturedPackages />
      <DestinationsRow />
      <UmrahStrip />
      <NorthernAreasStrip />
      <Process />
      <Proof />
      <InquiryCta />
    </>
  );
}
