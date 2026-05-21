import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { WhatsAppCTA } from "@/components/layout/whatsapp-cta";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main" className="bg-bone">
        {children}
      </main>
      <Footer />
      <WhatsAppCTA variant="sticky-mobile" />
    </>
  );
}
