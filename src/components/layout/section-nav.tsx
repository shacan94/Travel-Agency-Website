"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionNavItem {
  /** DOM id of the section element to track. */
  id: string;
  /** Label shown in the auto-hiding pill next to the active dot. */
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
  className?: string;
}

/**
 * Fixed side navigation — one dot per section, with an auto-hiding label
 * pill that appears for ~2 seconds whenever a new section becomes active.
 * Click a dot to smooth-scroll the matching section into the centre of
 * the viewport.
 *
 * Tracking uses simple viewport-center distance (the closest section
 * centre wins) which matches the supplied ScrollGlobe behaviour.
 */
export function SectionNav({ items, className }: SectionNavProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const lastChangeRef = React.useRef(0);
  const [labelToken, setLabelToken] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;

    const update = () => {
      const viewportCenter = window.innerHeight / 2;
      let nextActive = 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          nextActive = index;
        }
      });

      setActiveIndex((prev) => {
        if (prev !== nextActive) {
          lastChangeRef.current = Date.now();
          setLabelToken((t) => t + 1);
        }
        return nextActive;
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className={cn(
        "fixed top-1/2 right-2 z-40 hidden -translate-y-1/2 sm:right-4 sm:flex lg:right-8",
        className,
      )}
    >
      <div className="relative space-y-3 sm:space-y-4 lg:space-y-6">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div key={item.id} className="group relative">
              {/* Auto-hiding label — keyed off labelToken so the
               * animation restarts each time the active section changes. */}
              {isActive ? (
                <div
                  key={`${item.id}-${labelToken}`}
                  className={cn(
                    "animate-fadeOut absolute top-1/2 right-5 -translate-y-1/2 sm:right-6 lg:right-8",
                    "rounded-md border px-2 py-1 text-xs font-medium whitespace-nowrap shadow-xl sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm lg:px-4 lg:py-2",
                    "border-[var(--border)]/60 bg-bone/95 text-ink backdrop-blur-md",
                  )}
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span className="inline-block size-1 animate-pulse rounded-full bg-[var(--primary)] sm:size-1.5" />
                    <span>{item.label}</span>
                  </span>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => handleClick(item.id)}
                aria-label={`Go to ${item.label}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative h-2 w-2 rounded-full border-2 transition-all duration-300 hover:scale-125 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3",
                  "before:absolute before:inset-0 before:rounded-full before:transition-all before:duration-300",
                  isActive
                    ? "border-[var(--primary)] bg-[var(--primary)] shadow-lg before:animate-ping before:bg-[var(--primary)]/20"
                    : "border-[var(--muted-foreground)]/40 bg-transparent hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/10",
                )}
              />
            </div>
          );
        })}

        {/* Decorative vertical line behind the dots */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-1/2 -z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent"
        />
      </div>
    </nav>
  );
}
