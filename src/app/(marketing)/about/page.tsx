import { PagePlaceholder } from "@/components/sections/page-placeholder";

export const metadata = { title: "About" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="About"
      heading={<>A small operations team with a strong opinion on travel.</>}
      lede="Founder note, partner network, the named hotel and airline relationships we lean on, and the Google rating snippet once review counts justify it."
    />
  );
}
