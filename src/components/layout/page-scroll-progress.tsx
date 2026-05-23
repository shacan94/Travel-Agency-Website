"use client";

import * as React from "react";

/**
 * A thin gradient bar fixed at the top of the viewport that tracks page
 * scroll progress. Ported from the supplied ScrollGlobe component.
 *
 * - Listens to window scroll with requestAnimationFrame throttling.
 * - Uses a transform scaleX for GPU-accelerated paint with no layout work.
 * - Sits at z-50 so it stays above the header.
 */
export function PageScrollProgress() {
  const fillRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = fillRef.current;
      if (!el) return;
      const max =
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
        window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${pct})`;
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
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 h-0.5 w-full bg-gradient-to-r from-[var(--border)]/20 via-[var(--border)]/40 to-[var(--border)]/20"
    >
      <div
        ref={fillRef}
        className="h-full origin-left bg-gradient-to-r from-[var(--primary)] via-[#3b82f6] to-[#1e3a8a] shadow-sm will-change-transform"
        style={{
          transform: "scaleX(0)",
          transition: "transform 150ms ease-out",
          filter: "drop-shadow(0 0 2px rgba(59, 130, 246, 0.35))",
        }}
      />
    </div>
  );
}
