"use client";

import Link from "next/link";
import type React from "react";

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  /** When set, the button renders as a Next.js Link for prefetching + right-click semantics. */
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

/**
 * Animated rotating-gradient CTA. Black background, white text, conic-gradient
 * border that rotates continuously and intensifies on hover.
 *
 * All styling lives in src/app/globals.css under `.shiny-cta` — the @property
 * Houdini declarations and @keyframes must live at top-level of the stylesheet
 * for the browser to register them as tween-able types. Scoping them via
 * styled-jsx breaks the interpolation and the button reads as static.
 *
 * Supports both <button onClick> and <Link href> forms via the `href` prop.
 */
export function ShinyButton({
  children,
  onClick,
  href,
  className = "",
  type = "button",
  ariaLabel,
}: ShinyButtonProps) {
  const classes = `shiny-cta ${className}`.trim();

  if (href) {
    return (
      <Link className={classes} href={href} onClick={onClick} aria-label={ariaLabel}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type} aria-label={ariaLabel}>
      <span>{children}</span>
    </button>
  );
}
