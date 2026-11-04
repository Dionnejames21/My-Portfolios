import {
  additionalFolderUrl,
  workflowCategories,
  workflowFolderUrl,
} from "../../lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Workflows() {
  return (
    <section id="workflows" className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
      <div className="absolute inset-0 bg-hero-grid opacity-[0.1]" />
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-brand/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-violet/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            onDark
            eyebrow="Workflows, Automations & CRM"
            title={
              <>
                Workflows, Automations & <span className="text-gradient-brand">CRM Projects</span>
              </>
            }
            description="A curated library of workflow, automation, and CRM samples. Explore the categories below and open the full resource folder for detailed examples."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflowCategories.map((cat, i) => (
            <Reveal key={cat} delay={i * 70}>
              <div className="group flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:border-brand/40 hover:bg-white/10">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand">
                  <span aria-hidden className="text-sm">
                    ⚙
                  </span>
                </span>
                <span className="text-sm font-semibold leading-snug text-white">{cat}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <a
              href={workflowFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-bright hover:shadow-xl hover:shadow-brand/40"
            >
              Explore Workflow Samples <span aria-hidden>↗</span>
            </a>
            <p className="max-w-xl text-center text-xs text-white/50">
              Opens a Google Drive resource folder. Individual files can be added as video cards
              later — the folder itself is a resource, not a video.
            </p>
          </div>
        </Reveal>

        {/* Additional samples card */}
        <Reveal delay={160}>
          <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-xl">
              <h3 className="font-display text-xl font-bold text-white">Additional Work Samples</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Explore additional examples of administrative support, CRM management, business
                operations, and related work samples.
              </p>
            </div>
            <a
              href={additionalFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Additional Samples <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
