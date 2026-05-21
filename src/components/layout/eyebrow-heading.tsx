import { cn } from "@/lib/utils";

interface EyebrowHeadingProps {
  number?: string;
  eyebrow: string;
  heading: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function EyebrowHeading({
  number,
  eyebrow,
  heading,
  lede,
  align = "left",
  className,
  as: Tag = "h2",
}: EyebrowHeadingProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="eyebrow flex items-center gap-3">
        {number ? (
          <>
            <span aria-hidden className="text-clay">
              {number}
            </span>
            <span aria-hidden className="h-px w-8 bg-clay/60" />
          </>
        ) : null}
        <span>{eyebrow}</span>
      </p>
      <Tag
        className={cn(
          "font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.05] text-ink",
          align === "center" && "mx-auto max-w-[24ch]",
        )}
      >
        {heading}
      </Tag>
      {lede ? (
        <p
          className={cn(
            "text-ink/70 text-[1.0625rem] leading-[1.65]",
            align === "center" ? "mx-auto max-w-[55ch]" : "max-w-[55ch]",
          )}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
