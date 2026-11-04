import { createFileRoute } from "@tanstack/react-router";

import { About } from "../components/portfolio/About";
import { AdditionalInfo } from "../components/portfolio/AdditionalInfo";
import { CinematicSlideshow } from "../components/portfolio/CinematicSlideshow";
import { CompaniesWorkedWith } from "../components/portfolio/CompaniesWorkedWith";
import { Contact } from "../components/portfolio/Contact";
import { Experience } from "../components/portfolio/Experience";
import { Footer } from "../components/portfolio/Footer";
import { Header } from "../components/portfolio/Header";
import { Hero } from "../components/portfolio/Hero";
import { HowItWorks } from "../components/portfolio/HowItWorks";
import { PortfolioBanner } from "../components/portfolio/PortfolioBanner";
import { SkillsAndServices } from "../components/portfolio/SkillsAndServices";
import { WorkAndProjects } from "../components/portfolio/WorkAndProjects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Elli James Torres | GoHighLevel Specialist & CRM Operations",
      },
      {
        name: "description",
        content:
          "Elli James Torres is an Executive Assistant & GoHighLevel Specialist offering CRM setup, pipeline management, workflow automation, lead capture, and high-converting landing pages for businesses and agencies.",
      },
      {
        property: "og:title",
        content: "Elli James Torres | GoHighLevel Specialist & CRM Operations",
      },
      {
        property: "og:description",
        content:
          "Elli James Torres is an Executive Assistant & GoHighLevel Specialist offering CRM setup, pipeline management, workflow automation, lead capture, and high-converting landing pages for businesses and agencies.",
      },
      {
        property: "og:image",
        content:
          "https://vibe.filesafe.space/1793286545658653540/attachments/5cb943a8-7d31-46d6-86a5-826481d7385a.jpg",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://vibe.filesafe.space/1793286545658653540/attachments/5cb943a8-7d31-46d6-86a5-826481d7385a.jpg",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Hero Section (Above the Fold) */}
        <Hero />

        {/* 1.1 Direct link banner to the dedicated 98-project Website Portfolio page */}
        <PortfolioBanner />

        {/* 1.2 About Me (AI avatar + professional background) — nav target #about */}
        <About />

        {/* 1.5 Premium Full-Width Cinematic Technology Slideshow */}
        <CinematicSlideshow />

        {/* 2. Portfolio Projects & Work Samples */}
        <WorkAndProjects />

        {/* 2.5 Companies I've Worked With */}
        <CompaniesWorkedWith />

        {/* 3. Core Skills & Services */}
        <SkillsAndServices />

        {/* 3.5 How It Works — process section */}
        <HowItWorks />

        {/* 4. Relevant Professional Experience */}
        <Experience />

        {/* 5. Additional Information & Background */}
        <AdditionalInfo />

        {/* 6. Final Contact Section */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
