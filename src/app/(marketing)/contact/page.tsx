import { PagePlaceholder } from "@/components/sections/page-placeholder";

export const metadata = { title: "Contact" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      heading={<>Three offices, one WhatsApp inbox.</>}
      lede="Karachi, Lahore, Islamabad — addresses, phones, maps, and the response-time we hold ourselves to."
    />
  );
}
