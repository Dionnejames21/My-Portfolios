import { contact } from "../../lib/portfolio-data";
import { ContactButtons } from "./ContactButtons";
import { Reveal } from "./Reveal";
import { SectionBackground } from "./SectionBackground";

const profilePhoto =
  "https://vibe.filesafe.space/1793286545658653540/attachments/5cb943a8-7d31-46d6-86a5-826481d7385a.jpg";

const experienceHighlights = [
  { label: "Experience", value: "5+ Years" },
  { label: "Core Platform", value: "GoHighLevel" },
  { label: "Specialization", value: "CRM & Automation" },
  { label: "Global Clients", value: "US, UK, CA & Int'l" },
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-navy-deep text-white">
      {/* Cinematic parallax background */}
      <SectionBackground section="hero" strength={0.22} scrim="rgba(7,17,31,0.78)" />
      {/* Ambient lighting accents over the photo */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-brand/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-violet/20 blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-14 lg:px-8 lg:pb-10">
        {/* Desktop 2-column, Mobile clean stacked hierarchy */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Name, Title, Intro, Experience Highlights, Contact */}
          <div className="order-1 flex flex-col lg:col-span-7">
            {/* Identity badge */}
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-[11px] font-extrabold text-brand-foreground">
                  ET
                </span>
                <span className="text-xs font-semibold tracking-wide text-white/90">
                  Available for GoHighLevel Projects
                </span>
              </div>
            </Reveal>

            {/* Name */}
            <Reveal delay={40}>
              <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-5xl xl:text-6xl">
                {contact.name}
              </h1>
            </Reveal>

            {/* Professional Job Title */}
            <Reveal delay={80}>
              <p className="mt-2 text-base font-bold text-brand sm:text-xl lg:text-xl">
                GoHighLevel Specialist | CRM Setup | Workflow Automation | Landing Pages
              </p>
            </Reveal>

            {/* Mobile-only photo display right after title for mobile flow */}
            <div className="mt-6 block lg:hidden">
              <div className="relative mx-auto max-w-xs">
                <div className="relative overflow-hidden rounded-3xl border-2 border-brand/40 bg-navy-deep shadow-2xl shadow-navy-deep">
                  <img
                    src={profilePhoto}
                    alt="Elli James Torres — GoHighLevel Specialist"
                    className="aspect-4/5 w-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy via-navy/60 to-transparent p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand">
                      5+ Years Experience
                    </p>
                    <p className="text-sm font-semibold text-white">
                      Executive Assistant & CRM Specialist
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Intro Text */}
            <Reveal delay={120}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                I help businesses and agencies build and optimize GoHighLevel systems through CRM
                setup, automated workflows, pipeline management, lead capture, and professional
                landing page development.
              </p>
            </Reveal>

            {/* Concise Experience Highlights Grid */}
            <Reveal delay={160}>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {experienceHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-bold text-white sm:text-base">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Primary Contact Buttons */}
            <Reveal delay={200}>
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                  Direct Contact Options — Let's Discuss Your Project
                </p>
                <ContactButtons variant="hero" className="sm:justify-start" />
              </div>
            </Reveal>
          </div>

          {/* Right Column (Desktop): Actual Professional Photo, prominently displayed */}
          <div className="order-2 hidden lg:col-span-5 lg:block">
            <Reveal delay={100}>
              <div className="relative mx-auto max-w-md">
                {/* Glow behind the photo */}
                <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-linear-to-tr from-brand/30 to-violet/30 blur-2xl opacity-70" />

                <div className="relative overflow-hidden rounded-3xl border-2 border-brand/40 bg-navy-deep p-2 shadow-2xl shadow-navy-deep">
                  <div className="overflow-hidden rounded-2xl bg-navy">
                    <img
                      src={profilePhoto}
                      alt="Elli James Torres — GoHighLevel Specialist"
                      className="aspect-4/5 w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>

                  {/* Caption badge overlay */}
                  <div className="mt-3 flex items-center justify-between px-2 pb-1">
                    <div>
                      <p className="font-display text-sm font-bold text-white">Elli James Torres</p>
                      <p className="text-xs text-white/60">GoHighLevel Specialist & EA</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-xs font-bold text-brand">
                      <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                      5+ Years Exp.
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
