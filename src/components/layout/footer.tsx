import Link from "next/link";
import { brand } from "@/lib/brand";
import { footerNav } from "@/config/nav";
import { Container } from "./container";
import { WhatsAppCTA } from "./whatsapp-cta";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="hairline mt-32 bg-bone text-ink">
      <Container className="grid gap-16 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
        <div className="flex flex-col gap-6">
          <p className="font-display text-3xl leading-tight md:text-4xl">{brand.name}</p>
          <p className="max-w-[34ch] text-[0.9375rem] text-ink/70">
            Tailored travel from Pakistan — outbound leisure, Umrah, and the Northern Areas.
            One brief, one quote, one agent on WhatsApp.
          </p>
          <div className="flex flex-wrap gap-3">
            <WhatsAppCTA variant="pill" />
            <Link
              href="/inquire"
              className="inline-flex h-9 items-center rounded-full border border-ink/20 px-3.5 text-[0.8125rem] font-medium text-ink transition-colors hover:border-clay hover:text-clay"
            >
              Plan your trip →
            </Link>
          </div>
        </div>

        {Object.entries(footerNav).map(([heading, items]) => (
          <div key={heading} className="flex flex-col gap-4">
            <p className="eyebrow">{heading}</p>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-ink/75 transition-colors hover:text-clay"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="hairline-b" />

      <Container className="flex flex-col gap-6 py-8 text-[0.8125rem] text-ink/60 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {brand.legalName}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {brand.offices.map((office) => (
            <span key={office.city}>
              <span className="text-ink/80">{office.city}</span> · {office.phone}
            </span>
          ))}
        </div>
      </Container>
    </footer>
  );
}
