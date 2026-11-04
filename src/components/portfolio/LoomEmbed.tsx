import { useEffect, useState } from "react";

type LoomEmbedProps = {
  label: string;
  title: string;
  description: string;
  embedUrl: string;
  shareUrl: string;
};

/**
 * Embedded Loom player in a responsive 16:9 frame, with a linked fallback.
 *
 * Performance: uses a click-to-load facade. No iframe is mounted until the
 * visitor clicks Play, so the page never eagerly spins up multiple Loom
 * players. The facade is a lightweight thumbnail + play button. SSR-safe.
 */
export function LoomEmbed({ label, title, description, embedUrl, shareUrl }: LoomEmbedProps) {
  const [activated, setActivated] = useState(false);
  const [thumb, setThumb] = useState<string | null>(null);

  // Derive a Loom thumbnail URL from the share id (best-effort; falls back to
  // the brand play button if unavailable). Runs only after hydration.
  useEffect(() => {
    const id = embedUrl.split("/").pop();
    if (id) setThumb(`https://cdn.loom.com/sessions/raw/${id}-00001.png`);
  }, [embedUrl]);

  return (
    <figure className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-navy/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-navy/15">
      <div className="relative aspect-video w-full overflow-hidden bg-navy">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-[0.18]" />
        {activated ? (
          <iframe
            src={embedUrl}
            title={title}
            loading="lazy"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 flex h-full w-full items-center justify-center"
          >
            {/* Facade thumbnail */}
            {thumb ? (
              <img
                src={thumb}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-70"
                onError={() => setThumb(null)}
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-deep/80 via-navy-deep/30 to-navy-deep/50" />
            {/* Play button */}
            <span className="relative grid h-16 w-16 place-items-center rounded-full border border-brand/50 bg-brand/90 text-brand-foreground shadow-lg shadow-brand/30 transition-transform duration-300 group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 translate-x-0.5"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-navy-deep/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Click to play
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {label}
        </span>
        <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-bright"
        >
          Open in Loom
          <span aria-hidden>↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
