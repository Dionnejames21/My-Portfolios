import { videos } from "../../lib/portfolio-data";
import { LoomEmbed } from "./LoomEmbed";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function VideoPortfolio() {
  return (
    <section id="work" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Video Portfolio"
            title={
              <>
                Watch My Work <span className="text-gradient-brand">in Action</span>
              </>
            }
            description="Real demonstrations of CRM systems, automation, funnels, and administrative support — recorded so you can evaluate my work directly."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {videos.map((video, i) => (
            <Reveal key={video.id} delay={i * 100}>
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

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            Videos are embedded from Loom. If a player is restricted by your network, use the “Open
            in Loom” link to watch the original recording.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
