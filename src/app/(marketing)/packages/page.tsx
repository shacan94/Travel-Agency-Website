import { PagePlaceholder } from "@/components/sections/page-placeholder";

export const metadata = { title: "Packages" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Packages"
      heading={<>Every itinerary we run, one filterable index.</>}
      lede="Outbound, Umrah, and Northern Areas packages together — filter by category, duration, and departure city. Always inquiry-first."
    />
  );
}
