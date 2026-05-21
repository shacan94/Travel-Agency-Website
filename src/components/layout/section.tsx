import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical rhythm. `tight` uses py-12, `default` uses py-20/28/32. `flush` uses none. */
  spacing?: "default" | "tight" | "flush";
  /** Optional bleed — pulls the section flush left/right past the container. */
  bleed?: boolean;
  /** Background variant for the wrapper. */
  surface?: "bone" | "paper" | "sand" | "ink" | "forest";
}

const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  default: "py-20 md:py-28 lg:py-32",
  tight: "py-12 md:py-16",
  flush: "",
};

const surfaceMap: Record<NonNullable<SectionProps["surface"]>, string> = {
  bone: "bg-bone text-ink",
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-bone",
  forest: "bg-forest text-bone",
};

export function Section({
  spacing = "default",
  bleed = false,
  surface = "bone",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(spacingMap[spacing], surfaceMap[surface], className)} {...props}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
