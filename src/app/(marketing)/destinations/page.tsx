import { PagePlaceholder } from "@/components/sections/page-placeholder";

export const metadata = { title: "Destinations" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Destinations"
      heading={<>Where we travel most often.</>}
      lede="An editorial index of the destinations we run trips in — Turkey, Dubai, the Northern Areas, and more — with the seasons we'd suggest and the packages we run there."
    />
  );
}
