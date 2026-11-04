import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "../components/portfolio/Footer";
import { Header } from "../components/portfolio/Header";
import { Reveal } from "../components/portfolio/Reveal";
import { SectionHeading } from "../components/portfolio/SectionHeading";
import { TiltCard } from "../components/portfolio/TiltCard";
import { websiteProjects, type WebsiteProject } from "../lib/portfolio-data";
import { all98Projects, projectCategoryFilters } from "../lib/projects-data";

/**
 * Click-to-load facade for a live website demo. Shows a branded preview
 * thumbnail with a "Load live preview" button; the iframe only mounts after
 * the visitor clicks, so the page never eagerly loads 3 external sites.
 */
function LiveDemoCard({ project }: { project: WebsiteProject }) {
  const [activated, setActivated] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card p-4 transition-all hover:border-brand/40">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-navy">
        {activated ? (
          <iframe
            src={project.url}
            title={project.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Load live preview of ${project.title}`}
            className="absolute inset-0 flex h-full w-full items-center justify-center"
          >
            <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-[0.18]" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-deep/80 via-navy-deep/30 to-navy-deep/50" />
            <span className="relative grid h-14 w-14 place-items-center rounded-full border border-brand/50 bg-brand/90 text-brand-foreground shadow-lg shadow-brand/30 transition-transform duration-300 hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
              </svg>
            </span>
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-navy-deep/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Load live preview
            </span>
          </button>
        )}
      </div>
      <h4 className="mt-3 font-display text-base font-bold text-foreground">{project.title}</h4>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{project.description}</p>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
      >
        Open Live Site Demo ↗
      </a>
    </div>
  );
}

export const Route = createFileRoute("/website-portfolio")({
  head: () => ({
    meta: [
      {
        title: "Website Portfolio — All 98 Projects | Elli James Torres",
      },
      {
        name: "description",
        content:
          "Explore all 98 website projects, funnels, CRM builds, custom dashboards, voice AI agents, and automations built by Elli James Torres.",
      },
      {
        property: "og:title",
        content: "Website Portfolio — All 98 Projects | Elli James Torres",
      },
      {
        property: "og:description",
        content:
          "Complete gallery of 98 GoHighLevel sales funnels, CRM pipeline configurations, dashboards, and automated systems.",
      },
    ],
  }),
  component: WebsitePortfolioPage,
});

function WebsitePortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [displayCount, setDisplayCount] = useState<number>(18);

  const filteredProjects =
    activeFilter === "all"
      ? all98Projects
      : all98Projects.filter((p) => p.categoryKey === activeFilter);

  const visibleProjects = filteredProjects.slice(0, displayCount);

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Complete Portfolio Gallery"
              title={
                <>
                  All <span className="text-gradient-brand">98 Website & Funnel Projects</span>
                </>
              }
              description="Explore the complete collection of 98 real builds created for agencies and business owners — including funnels, CRM setups, automations, dashboards, voice AI, and A2P systems."
              className="mx-auto"
            />
          </Reveal>

          {/* Featured Live Demos */}
          <div className="mt-12 rounded-2xl border border-brand/20 bg-brand/5 p-6 sm:p-8 backdrop-blur">
            <div className="mb-6 flex flex-col items-start justify-between gap-2 border-b border-border/50 pb-4 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand">
                  Live Preview Demos
                </span>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Interactive Live Web Builds
                </h3>
              </div>
              <span className="text-xs text-muted-foreground">
                3 Fully Interactive Samples with Live Frame Previews
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {websiteProjects.map((p) => (
                <LiveDemoCard key={p.id} project={p} />
              ))}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {projectCategoryFilters.map((filter) => {
              const count =
                filter.key === "all"
                  ? all98Projects.length
                  : all98Projects.filter((p) => p.categoryKey === filter.key).length;

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter.key);
                    setDisplayCount(18);
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    activeFilter === filter.key
                      ? "bg-brand text-brand-foreground shadow-lg shadow-brand/30"
                      : "border border-border/60 bg-card/60 text-muted-foreground hover:border-brand/30 hover:text-foreground"
                  }`}
                >
                  <span>{filter.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      activeFilter === filter.key
                        ? "bg-brand-foreground/20 text-brand-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 98 Projects Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <Reveal key={project.id} delay={(index % 6) * 60}>
                <TiltCard max={5} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-4 transition-all duration-300 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/10">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-navy/60">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="rounded-md bg-navy/80 px-2.5 py-1 text-[10px] font-bold tracking-wider text-brand backdrop-blur">
                          {project.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between pt-4">
                      <div>
                        <h3 className="font-display text-base font-bold text-foreground group-hover:text-brand">
                          {project.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                        <a
                          href={project.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-brand/40 bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand transition-all hover:bg-brand hover:text-brand-foreground"
                        >
                          Visit Website / View Build ↗
                        </a>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* Show More / Show Less */}
          {filteredProjects.length > displayCount && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setDisplayCount((prev) => prev + 18)}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/25 transition-all hover:bg-brand-bright"
              >
                Show More Projects ({filteredProjects.length - displayCount} remaining)
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
