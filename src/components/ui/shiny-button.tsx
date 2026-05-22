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
 * border that rotates continuously and intensifies on hover, with a Houdini
 * `@property` setup so each layer can be tween-able.
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
  return (
    <>
      <style jsx>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }

        @property --gradient-shine {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        .shiny-cta {
          --shiny-cta-bg: #000000;
          --shiny-cta-bg-subtle: #1a1818;
          --shiny-cta-fg: #ffffff;
          --shiny-cta-highlight: blue;
          --shiny-cta-highlight-subtle: #8484ff;
          --animation: gradient-angle linear infinite;
          --duration: 3s;
          --shadow-size: 2px;
          --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);

          isolation: isolate;
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline-offset: 4px;
          padding: 1.25rem 2.5rem;
          font-family: var(--font-inter), "Inter", system-ui, sans-serif;
          font-size: 1.125rem;
          line-height: 1.2;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          border: 1px solid transparent;
          border-radius: 360px;
          color: var(--shiny-cta-fg);
          background:
            linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
            conic-gradient(
                from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
                transparent,
                var(--shiny-cta-highlight) var(--gradient-percent),
                var(--gradient-shine) calc(var(--gradient-percent) * 2),
                var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
                transparent calc(var(--gradient-percent) * 4)
              )
              border-box;
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          transition: var(--transition);
          transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine;
        }

        .shiny-cta::before,
        .shiny-cta::after,
        .shiny-cta span::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        .shiny-cta:active {
          translate: 0 1px;
        }

        /* Dots pattern */
        .shiny-cta::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
              circle at var(--position) var(--position),
              white calc(var(--position) / 4),
              transparent 0
            )
            padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          z-index: -1;
        }

        /* Inner shimmer */
        .shiny-cta::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(
            -50deg,
            transparent,
            var(--shiny-cta-highlight),
            transparent
          );
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
        }

        .shiny-cta span {
          z-index: 1;
          position: relative;
        }

        .shiny-cta span::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
        }

        /* Animate */
        .shiny-cta,
        .shiny-cta::before,
        .shiny-cta::after {
          animation:
            var(--animation) var(--duration),
            var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }

        .shiny-cta:is(:hover, :focus-visible) {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
        }

        .shiny-cta:is(:hover, :focus-visible),
        .shiny-cta:is(:hover, :focus-visible)::before,
        .shiny-cta:is(:hover, :focus-visible)::after {
          animation-play-state: running;
        }

        .shiny-cta:is(:hover, :focus-visible) span::before {
          opacity: 1;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }

        @keyframes breathe {
          from,
          to {
            scale: 1;
          }
          50% {
            scale: 1.2;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shiny-cta,
          .shiny-cta::before,
          .shiny-cta::after,
          .shiny-cta span::before {
            animation: none !important;
          }
        }
      `}</style>

      {href ? (
        <Link
          className={`shiny-cta ${className}`}
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          <span>{children}</span>
        </Link>
      ) : (
        <button
          className={`shiny-cta ${className}`}
          onClick={onClick}
          type={type}
          aria-label={ariaLabel}
        >
          <span>{children}</span>
        </button>
      )}
    </>
  );
}
