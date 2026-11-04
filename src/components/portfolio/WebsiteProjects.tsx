import { websiteProjects } from "../../lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function WebsiteProjectCard({
  category,
  title,
  description,
  url,
}: {
  category: string;
  title: string;
  description: string;
  url: string;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-navy/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/15">
      {/* Live preview frame */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-navy">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-[0.15]" />
        <iframe
          src={url}
          title={`${title} live preview`}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy-deep/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Live Preview
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-soft">
          {category}
        </span>
        <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-md shadow-brand/25 transition-all hover:bg-brand-bright"
          >
            View Website Demo <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Optional walkthrough video placeholder */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 p-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-dashed border-border text-muted-foreground">
            <span aria-hidden>▶</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Add Project Walkthrough Video</p>
            <p className="text-xs text-muted-foreground">
              Replace this placeholder with a screen-recorded walkthrough later.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function WebsiteProjects() {
  return (
    <section id="projects" className="relative bg-light py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Website & Landing Page Projects"
            title={
              <>
                Website & Landing Page <span className="text-gradient-brand">Projects</span>
              </>
            }
            description="Real sample websites I've built, demonstrating brand-focused design, service messaging, and lead-generation structure."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {websiteProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 120}>
              <WebsiteProjectCard
                category={project.category}
                title={project.title}
                description={project.description}
                url={project.url}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
