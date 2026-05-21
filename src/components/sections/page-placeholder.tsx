import Link from "next/link";
import { Section } from "@/components/layout/section";
import { EyebrowHeading } from "@/components/layout/eyebrow-heading";
import { Button } from "@/components/ui/button";

interface PagePlaceholderProps {
  eyebrow: string;
  heading: React.ReactNode;
  lede: React.ReactNode;
}

/**
 * Temporary placeholder for routes built out in later steps of the plan.
 * Keeps the nav links live and the chrome consistent during home-page review.
 */
export function PagePlaceholder({ eyebrow, heading, lede }: PagePlaceholderProps) {
  return (
    <Section spacing="default" surface="bone">
      <div className="min-h-[60vh] py-16 md:py-24" data-reveal>
        <EyebrowHeading eyebrow={eyebrow} heading={heading} lede={lede} />
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/inquire">Plan your trip →</Link>
          </Button>
          <Link
            href="/"
            className="inline-flex h-11 items-center text-[0.9375rem] text-ink/70 underline-offset-4 hover:text-clay hover:underline"
          >
            ← Back to home
          </Link>
        </div>
        <p className="mt-12 text-[0.6875rem] uppercase tracking-[0.18em] text-ink/40">
          This page is being built — placeholder for the home-page review checkpoint.
        </p>
      </div>
    </Section>
  );
}
