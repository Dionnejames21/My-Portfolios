import { useEffect, useState } from "react";

/**
 * Thin brand scroll-progress bar fixed to the top of the viewport.
 * SSR-safe: starts hidden, becomes visible on mount.
 * Performance: throttled with requestAnimationFrame so scroll only triggers
 * one state update per frame instead of dozens per scroll gesture.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0);
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div
        className="h-full bg-linear-to-r from-brand to-violet-soft transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
