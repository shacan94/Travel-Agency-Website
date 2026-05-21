import { cn } from "@/lib/utils";
import { buildWhatsAppLink, type WhatsAppContext } from "@/lib/whatsapp";

interface WhatsAppCTAProps {
  context?: WhatsAppContext;
  variant?: "pill" | "button" | "link" | "sticky-mobile";
  className?: string;
  children?: React.ReactNode;
}

/**
 * Three visual variants of the WhatsApp CTA. All deep-link via buildWhatsAppLink.
 * `sticky-mobile` is intentionally restrained — a calm pill anchored bottom-right,
 * not a noisy floating bubble.
 */
export function WhatsAppCTA({
  context = { kind: "general" },
  variant = "button",
  className,
  children,
}: WhatsAppCTAProps) {
  const href = buildWhatsAppLink(context);
  const label = children ?? "Chat on WhatsApp";

  const base =
    "inline-flex items-center gap-2 font-sans font-medium transition-colors duration-200";

  if (variant === "pill") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        data-event="whatsapp_click"
        className={cn(
          base,
          "h-9 rounded-full border border-success/30 bg-success/5 px-3.5 text-[0.8125rem] text-success hover:bg-success/10",
          className,
        )}
      >
        <WhatsAppGlyph />
        <span>{label}</span>
      </a>
    );
  }

  if (variant === "link") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-event="whatsapp_click"
        className={cn(
          base,
          "text-success underline-offset-4 hover:underline",
          className,
        )}
      >
        <WhatsAppGlyph />
        <span>{label}</span>
      </a>
    );
  }

  if (variant === "sticky-mobile") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        data-event="whatsapp_click"
        className={cn(
          base,
          "fixed right-4 bottom-4 z-40 h-12 rounded-full bg-success px-5 text-white shadow-[0_8px_28px_-8px_rgba(46,93,58,0.45)]",
          "md:hidden",
          className,
        )}
      >
        <WhatsAppGlyph />
        <span>WhatsApp</span>
      </a>
    );
  }

  // default "button" — used in section CTAs
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-event="whatsapp_click"
      className={cn(
        base,
        "h-12 rounded-full bg-success px-6 text-[0.9375rem] text-white hover:bg-success/90",
        className,
      )}
    >
      <WhatsAppGlyph />
      <span>{label}</span>
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      className="shrink-0"
      fill="currentColor"
    >
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.8-.9-3-1.7-4.2-3.7-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.2 4.5 1.9.8 2.7.9 3.6.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 15.1 3.7 13.6 3.7 12 3.7 7.4 7.4 3.7 12 3.7s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3z" />
    </svg>
  );
}
