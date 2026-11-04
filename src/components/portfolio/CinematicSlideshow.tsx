import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Premium Full-Width Cinematic Technology Slideshow.
 *
 * ADD-ONLY: this is a self-contained new section. It does not modify or
 * reference any existing portfolio content. It sits between the Hero and the
 * Work & Projects section as a visual showcase of the GoHighLevel ecosystem.
 *
 * Effects: crossfade transitions, subtle Ken-Burns zoom + pan, discreet dot
 * navigation, auto-advance (~6s), pause on hover, reduced-motion safe.
 */

type Slide = {
  src: string;
  alt: string;
  pan: "left" | "right" | "up" | "down";
};

const SLIDES: Slide[] = [
  {
    src: "https://vibe.filesafe.space/1793286545658653540/assets/eb96bcd6-ede6-4d6b-b468-69a5873bf0a0.png",
    alt: "Cinematic CRM dashboard with sales pipeline and deal stages",
    pan: "right",
  },
  {
    src: "https://vibe.filesafe.space/1793286545658653540/assets/365e05bc-8677-4cda-836d-bab5bf1ac796.png",
    alt: "Workflow automation diagram with connected triggers and actions",
    pan: "left",
  },
  {
    src: "https://vibe.filesafe.space/1793286545658653540/assets/074f91fc-c117-47f4-b105-52b7b0e7afdd.png",
    alt: "Sales funnel and landing page design mockup",
    pan: "right",
  },
  {
    src: "https://vibe.filesafe.space/1793286545658653540/assets/6d6d7c29-438b-4a47-8555-2efe65550abe.png",
    alt: "Lead management and appointment scheduling system",
    pan: "down",
  },
  {
    src: "https://vibe.filesafe.space/1793286545658653540/assets/839dcb23-30c0-4965-867c-28f73532c08a.png",
    alt: "Automated SMS and email follow-up workflow",
    pan: "left",
  },
  {
    src: "https://vibe.filesafe.space/1793286545658653540/assets/8a6cb148-c368-4d1a-9078-d8d8a4ae421f.png",
    alt: "Integrated digital business system hub",
    pan: "up",
  },
];

const AUTO_MS = 6000;

export function CinematicSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timer = useRef<number | null>(null);

  // Read reduced-motion preference after hydration (SSR-safe).
  useEffect(() => {
    setReduceMotion(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);

  const go = useCallback((next: number) => {
    setActive((prev) => {
      const n = (next + SLIDES.length) % SLIDES.length;
      return n === prev ? prev : n;
    });
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused || reduceMotion) return;
    timer.current = window.setInterval(() => {
      setActive((p) => (p + 1) % SLIDES.length);
    }, AUTO_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, reduceMotion]);

  return (
    <section
      id="cinematic-showcase"
      aria-label="Cinematic technology showcase"
      className="relative w-full overflow-hidden bg-navy-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Stage */}
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9] lg:aspect-[16/5] xl:aspect-[16/4]">
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          return (
            <div
              key={slide.src}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.src}
                alt={isActive ? slide.alt : ""}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`h-full w-full object-cover ${
                  isActive && !reduceMotion ? `cine-kenburns cine-pan-${slide.pan}` : ""
                }`}
                draggable={false}
              />
            </div>
          );
        })}

        {/* Cinematic scrims for legibility + depth — soft top blend to merge with hero */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/20 to-navy-deep/80" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy-deep/70 via-transparent to-navy-deep/70" />
        {/* Subtle brand vignette */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_60px_rgba(7,17,31,0.85)]" />

        {/* Eyebrow / caption strip */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-center px-4 pb-6 sm:pb-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-navy-deep/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur-md sm:text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
              GoHighLevel Ecosystem in Motion
            </span>
          </div>
        </div>
      </div>

      {/* Discreet dot navigation */}
      <div className="absolute inset-x-0 top-0 z-20 flex justify-center pt-3 sm:pt-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-navy-deep/50 px-3 py-2 backdrop-blur-md">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show slide ${i + 1}: ${slide.alt}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-7 bg-brand shadow-[0_0_12px_-2px_var(--color-brand)]"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
