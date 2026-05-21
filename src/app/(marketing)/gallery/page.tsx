import { PagePlaceholder } from "@/components/sections/page-placeholder";

export const metadata = { title: "Gallery" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Gallery"
      heading={<>An editorial of trips, in our clients' own frames.</>}
      lede="A masonry gallery of agency-supplied photography. Coming once the agency hands over its image library."
    />
  );
}
