import { PagePlaceholder } from "@/components/sections/page-placeholder";

export const metadata = { title: "Northern Areas" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Northern Areas"
      heading={<>Hunza, Skardu, Naran — done at a real pace.</>}
      lede="Comfortable 4x4 transport, local KKH drivers, and stays we'd send our own family to."
    />
  );
}
