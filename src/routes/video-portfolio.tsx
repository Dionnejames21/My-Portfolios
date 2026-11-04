import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "../components/portfolio/Footer";
import { Header } from "../components/portfolio/Header";
import { VideoPortfolio } from "../components/portfolio/VideoPortfolio";

export const Route = createFileRoute("/video-portfolio")({
  head: () => ({
    meta: [
      {
        title: "Video Portfolio — Elli James Torres | Walkthroughs & Demonstrations",
      },
      {
        name: "description",
        content:
          "Watch direct video demonstrations of CRM systems, workflows, funnels, and executive administration by Elli James Torres.",
      },
      {
        property: "og:title",
        content: "Video Portfolio — Elli James Torres",
      },
      {
        property: "og:description",
        content:
          "Direct Loom video recordings of CRM workflows, funnels, and business automation demonstrations.",
      },
    ],
  }),
  component: VideoPortfolioPage,
});

function VideoPortfolioPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <VideoPortfolio />
      </main>
      <Footer />
    </>
  );
}
