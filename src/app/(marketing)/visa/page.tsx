import { PagePlaceholder } from "@/components/sections/page-placeholder";

export const metadata = { title: "Visa Services" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Visa Services"
      heading={<>Embassy-specific checklists and document support.</>}
      lede="Schengen, UK, US, Saudi for Umrah, Thailand, and more. Consultation, documentation review, and appointment support — we don't promise approvals, but we make the file as strong as possible."
    />
  );
}
