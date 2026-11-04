import { useEffect, useRef, type CSSProperties } from "react";
import { sectionBackgrounds, type SectionBgKey } from "../../lib/section-bg";

/**
 * Unified page parallax: ONE consistent, subtle parallax applied across the
 * whole page. Each section mounts this with a fixed-strength factor so the
 * background image drifts gently as the user scrolls — no per-section
 * different movements, just one smooth motion top to bottom.
 *
 * The image sits behind a dark navy scrim so text and cards stay readable.
 */
export function SectionBackground({
  section,
  strength = 0.18,
  scrim = "rgba(7,17,31,0.86)",
  className = "",
}: {
  section: SectionBgKey;
  /** 0 = static, 1 = strong. Kept small for a subtle, premium feel. */
  strength?: number;
  /** Overlay color to keep content legible over the photo. */
  scrim?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion: render static, no transform updates.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    function update() {
      frame = 0;
      const node = el;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // How far the section center is from the viewport center, normalized.
      const offset = (rect.top + rect.height / 2 - vh / 2) / vh;
      // Translate the image opposite to scroll for a parallax drift.
      const ty = Math.max(-1, Math.min(1, offset)) * strength * 100;
      node.style.transform = `translate3d(0, ${ty.toFixed(2)}%, 0) scale(1.12)`;
    }
    update();
    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        ref={ref}
        className="absolute inset-[-6%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url("${sectionBackgrounds[section]}")`,
          transform: "scale(1.12)",
          ...({ "--tw-bg-position": "center" } as CSSProperties),
        }}
      />
      {/* Scrim for legibility + brand tint */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${scrim} 0%, ${scrim} 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy-deep/40 via-transparent to-navy-deep/60" />
    </div>
  );
}
