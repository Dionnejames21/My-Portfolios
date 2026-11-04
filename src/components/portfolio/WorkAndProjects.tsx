import { LoomEmbed } from "./LoomEmbed";
import { Reveal } from "./Reveal";
import { SectionBackground } from "./SectionBackground";
import { SectionHeading } from "./SectionHeading";
import {
  additionalFolderUrl,
  videos,
  workflowCategories,
  workflowFolderUrl,
} from "../../lib/portfolio-data";

export function WorkAndProjects() {
  return (
    <section id="work" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <SectionBackground section="work" strength={0.16} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Portfolio & Proof"
            title={
              <>
                My GoHighLevel <span className="text-gradient-brand">Work & Projects</span>
              </>
            }
            description="Explore walkthrough demonstrations, workflow automation systems, and CRM implementations."
            className="mx-auto"
          />
        </Reveal>

        <div className="relative mt-14">
          <div className="mb-6 flex flex-col items-center justify-between gap-2 border-b border-border pb-4 sm:flex-row">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand">
                Demonstration Videos
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">
                Watch My Work in Action
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Direct Loom video recordings of CRM workflows and admin systems
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {videos.map((video, i) => (
              <Reveal key={video.id} delay={i * 90}>
                <LoomEmbed
                  label={video.label}
                  title={video.title}
                  description={video.description}
                  embedUrl={video.embedUrl}
                  shareUrl={video.shareUrl}
                />
              </Reveal>
            ))}
          </div>
        </div>

        {/* 3. Workflows, Automations & CRM Samples */}
        <div className="mt-20 overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-10 lg:p-12">
          <div className="relative">
            <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />

            <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand">
                  Automation & Pipelines
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                  Workflows, Automations & CRM Projects
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                  Curated workflow templates, pipeline automations, follow-up sequences, and CRM
                  organization samples available in my project repository.
                </p>
              </div>

              <a
                href={workflowFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-bright"
              >
                Explore Workflow Samples <span aria-hidden>↗</span>
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {workflowCategories.map((cat, i) => (
                <div
                  key={cat}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/20 text-brand">
                    <span aria-hidden className="text-xs">
                      ⚙
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-white sm:text-sm">{cat}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row">
              <div>
                <p className="font-display text-sm font-bold text-white">
                  Additional Administrative & CRM Samples
                </p>
                <p className="text-xs text-white/60">
                  Documentation, scheduling, CRM organization, and operational support resources.
                </p>
              </div>
              <a
                href={additionalFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
              >
                View Additional Samples <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
