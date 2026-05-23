import Link from "next/link";
import { primaryNav } from "@/config/nav";
import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "./whatsapp-cta";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="hairline-b sticky top-0 z-30 bg-bone/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-[var(--container-px)] md:h-20">
        <Link
          href="/"
          aria-label={`${brand.name} home`}
          className="font-display text-xl tracking-tight text-ink md:text-[1.5rem]"
        >
          {brand.name}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex lg:items-center lg:gap-7 xl:gap-9"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.8125rem] font-medium text-ink/75 transition-colors hover:text-clay"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <WhatsAppCTA variant="pill" className="hidden md:inline-flex" />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/inquire">Plan your trip</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
