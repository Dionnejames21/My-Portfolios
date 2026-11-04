import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const previewThumbs = [
  "https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e90c7e7c5a2f715eb02a.jpeg",
  "https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a15185d60ad4b061938293b.png",
  "https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e90c4c82f7be9220a53f.jpeg",
  "https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a151a860397b3655e6c6b35.jpeg",
];

/**
 * Direct link / banner inviting visitors to the dedicated 98-project
 * Website Portfolio page. Showcases a count, a handful of preview
 * thumbnails, and a prominent CTA button.
 */
export function PortfolioBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      {/* ambient brand glows */}
      <div className="pointer-events-none absolute -left-16 -top-10 h-72 w-72 rounded-full bg-brand/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-16 -bottom-10 h-72 w-72 rounded-full bg-violet/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10 lg:px-8 lg:pt-8">
        <Reveal>
          <div className="rounded-3xl border border-white/12 bg-linear-to-br from-white/10 via-white/5 to-transparent p-5 backdrop-blur-md sm:p-8">
            <div className="flex flex-col items-center gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              {/* Copy + CTA */}
              <div className="flex-1 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-brand backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                  98 Live Website Projects
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Explore the full <span className="text-gradient-brand">Website Portfolio</span>
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base lg:mx-0">
                  Browse all 98 websites I've built — sales funnels, CRM builds, workflow
                  automations, landing pages, and dashboards — each with a live Visit Website link.
                </p>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                  <Link
                    to="/website-portfolio"
                    className="cta-glow cta-glow-hover inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-bright sm:w-auto"
                  >
                    View All 98 Projects
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    to="/video-portfolio"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-brand/40 hover:bg-white/10 sm:w-auto"
                  >
                    Watch Video Portfolio
                  </Link>
                </div>
              </div>

              {/* Preview thumbnail collage */}
              <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto lg:grid-cols-2 lg:gap-3">
                {previewThumbs.map((src, i) => (
                  <Link
                    key={src}
                    to="/website-portfolio"
                    className="group relative block overflow-hidden rounded-xl border border-white/12 bg-navy shadow-lg shadow-navy-deep/40 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand/20"
                  >
                    <img
                      src={src}
                      alt={`Website project preview ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        // Fallback to a verified valid project preview if any asset fails
                        const target = e.currentTarget;
                        if (!target.dataset["fallback"]) {
                          target.dataset["fallback"] = "1";
                          target.src =
                            "https://assets.cdn.filesafe.space/CtDmbniqQCD3jMxMQf0q/media/6a14e90c7e7c5a2f715eb02a.jpeg";
                        }
                      }}
                      className="aspect-video w-full object-cover opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-linear-to-t from-navy-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
