"use client";

import * as React from "react";

/**
 * A 1px clay-colored line that tracks vertical scroll progress. Lives along
 * the bottom edge of the sticky header. Costs ~nothing — passive listener,
 * CSS transform only, no re-renders past the initial paint.
 */
export function ScrollProgress() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
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
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-px overflow-hidden"
    >
      <div
        ref={ref}
        className="h-full origin-left bg-clay"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
