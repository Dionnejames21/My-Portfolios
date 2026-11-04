import { useEffect, useState } from "react";

/**
 * Custom branded loading screen. Fades out once the page is fully loaded.
 * SSR-safe: hidden by default, mounts visibly only after hydration, then
 * fades and unmounts after the load event (or a short fallback timeout).
 */
export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const finish = () => {
      setHidden(true);
      window.setTimeout(() => setRemoved(true), 700);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { signal: controller.signal });
      // Fallback in case the load event already fired or stalls.
      window.setTimeout(finish, 2600);
    }

    return () => controller.abort();
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep transition-opacity duration-700 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[140px]" />

      <div className="relative flex flex-col items-center gap-5">
        {/* Monogram */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-brand/30" />
          <span className="relative grid h-16 w-16 place-items-center rounded-2xl border border-brand/40 bg-card font-display text-2xl font-extrabold text-brand shadow-lg shadow-brand/30">
            ET
          </span>
        </div>

        {/* Brand wordmark */}
        <div className="text-center">
          <p className="font-display text-lg font-bold text-white">Elli James Torres</p>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
            GoHighLevel Specialist
          </p>
        </div>

        {/* Loading bar */}
        <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-loading-slide rounded-full bg-linear-to-r from-brand to-violet-soft" />
        </div>
      </div>
    </div>
  );
}
