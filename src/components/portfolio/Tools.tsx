import { ghlHub, toolCategories, type Tool } from "../../lib/tools-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ToolIcon } from "./ToolIcon";

// Flatten all tools into single list for continuous marquee rows
const allTools = toolCategories.flatMap((cat) => cat.tools);

// Deduplicate tools by name while preserving order
const uniqueTools = Array.from(new Map(allTools.map((t) => [t.name, t])).values());

// Split tools into two distinct tracks for dual opposite-direction marquee rows
const track1Tools = uniqueTools.filter((_, idx) => idx % 2 === 0);
const track2Tools = uniqueTools.filter((_, idx) => idx % 2 !== 0);

function ToolBadge({ tool, isFeatured }: { tool: Tool; isFeatured?: boolean }) {
  return (
    <div
      className={`group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-2.5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md ${
        isFeatured
          ? "border-brand/40 bg-brand/10 text-brand ring-1 ring-brand/30 shadow-glow-brand"
          : "border-white/10 bg-white/5 text-white/90 hover:border-brand/30 hover:bg-white/10"
      }`}
    >
      <ToolIcon tool={tool} className="h-5 w-5 transition-transform group-hover:scale-110" />
      <div className="flex flex-col">
        <span className="font-display text-sm font-bold tracking-tight text-white">
          {tool.name}
        </span>
        {isFeatured && (
          <span className="text-[10px] font-semibold text-brand">Central CRM Hub</span>
        )}
      </div>
    </div>
  );
}

export function Tools() {
  // Duplicate arrays to create a seamless 100% loop
  const track1Repeated = [...track1Tools, ...track1Tools, ...track1Tools, ...track1Tools];
  const track2Repeated = [...track2Tools, ...track2Tools, ...track2Tools, ...track2Tools];

  return (
    <section id="tools" className="relative overflow-hidden bg-navy py-14 text-white sm:py-20">
      {/* Background accents */}
      <div className="absolute inset-0 bg-hero-grid opacity-[0.08]" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet/15 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            onDark
            eyebrow="Tools and Platforms We Work With"
            title={
              <>
                GoHighLevel <span className="text-gradient-brand">CRM Setup, Automation</span> &amp;
                Landing Pages
              </>
            }
            description="I help businesses and agencies build, organize, and optimize their GoHighLevel systems with customized CRM pipelines, automated workflows, lead management, and high-converting landing pages."
            className="mx-auto text-center"
          />
        </Reveal>

        {/* Highlighted Central Hub Pill */}
        <Reveal delay={60} className="mt-8">
          <div className="mx-auto flex max-w-xl items-center justify-center gap-3 rounded-full border border-brand/30 bg-brand/10 px-5 py-2.5 text-center text-xs font-semibold text-brand backdrop-blur-md shadow-glow-brand sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            <span>Central Specialization:</span>
            <strong className="font-bold text-white">{ghlHub.caption}</strong>
          </div>
        </Reveal>

        {/* Animated Marquee Showcase (Recreated from reference Materials section) */}
        <div className="relative mt-10 space-y-4">
          {/* Marquee Track 1 (Left to Right) */}
          <div className="marquee-mask overflow-hidden py-1">
            <div className="flex w-max items-center gap-4 animate-marquee hover:[animation-play-state:paused]">
              {track1Repeated.map((tool, index) => (
                <ToolBadge
                  key={`t1-${tool.name}-${index}`}
                  tool={tool}
                  isFeatured={tool.name === "GoHighLevel"}
                />
              ))}
            </div>
          </div>

          {/* Marquee Track 2 (Right to Left) */}
          <div className="marquee-mask overflow-hidden py-1">
            <div className="flex w-max items-center gap-4 animate-marquee-reverse hover:[animation-play-state:paused]">
              {track2Repeated.map((tool, index) => (
                <ToolBadge
                  key={`t2-${tool.name}-${index}`}
                  tool={tool}
                  isFeatured={tool.name === "GoHighLevel"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Connection Context Note */}
        <Reveal delay={100} className="mt-8">
          <p className="mx-auto max-w-2xl text-center text-xs leading-relaxed text-white/50">
            Platforms connect through native integrations, APIs, webhooks, Zapier, Make, or
            supported connectors depending on specific account permissions, plan, and requirements.
          </p>
        </Reveal>

        {/* Final Call To Action Banner */}
        <Reveal delay={120} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md sm:p-8">
            <div className="relative z-10">
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                Need Help Setting Up or Integrating Your Business Tools?
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                I can help organize your CRM, streamline workflows, and support integrations based
                on your business needs and the capabilities of your existing platforms.
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-bright hover:scale-[1.02]"
              >
                Let's Work Together
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
