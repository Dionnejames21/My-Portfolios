import { Reveal } from "./Reveal";
import { SectionBackground } from "./SectionBackground";
import { SectionHeading } from "./SectionHeading";
import { companyLogosList } from "../../lib/projects-data";

export function CompaniesWorkedWith() {
  return (
    <section id="companies" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <SectionBackground section="work" strength={0.14} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Proven Brand Growth"
            title={
              <>
                43 Businesses <span className="text-gradient-brand">I've Created Websites For</span>
              </>
            }
            description="Official brand logos from the 43 businesses and agencies I have created websites, funnels, and CRM backend systems for."
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-8 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            43 Verified Client Businesses & Agencies
          </span>
        </div>

        {/* Company Logos Grid — single grouped reveal (one observer for all 43) */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {companyLogosList.map((url, i) => (
              <div
                key={url}
                className="group relative flex h-24 items-center justify-center rounded-2xl border border-border/60 bg-card/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-card/90 hover:shadow-lg hover:shadow-brand/10"
              >
                <img
                  src={url}
                  alt={`Company logo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-12 max-w-full object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
