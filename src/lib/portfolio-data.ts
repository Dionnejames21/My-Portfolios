// Centralized portfolio data — real links and contact details live here.

export type PortfolioVideo = {
  id: string;
  label: string;
  title: string;
  description: string;
  shareUrl: string;
  embedUrl: string;
};

export const videos: PortfolioVideo[] = [
  {
    id: "4518662f7fa04db99340ae6edb2ce081",
    label: "Professional Introduction",
    title: "Meet Elli James Torres",
    description:
      "Learn about my professional background, experience, services, and how I support business owners and marketing teams.",
    shareUrl: "https://www.loom.com/share/4518662f7fa04db99340ae6edb2ce081",
    embedUrl: "https://www.loom.com/embed/4518662f7fa04db99340ae6edb2ce081",
  },
  {
    id: "5b7bd5a8b7b24836aed096b4a3befeaa",
    label: "CRM, Funnels & Automation",
    title: "CRM Systems, Funnels & Automation",
    description:
      "Explore a demonstration of my work with CRM systems, workflows, funnels, and business automation.",
    shareUrl: "https://www.loom.com/share/5b7bd5a8b7b24836aed096b4a3befeaa",
    embedUrl: "https://www.loom.com/embed/5b7bd5a8b7b24836aed096b4a3befeaa",
  },
  {
    id: "ddde90360adc4d7495537d5146f56826",
    label: "Admin & CRM Management",
    title: "Administrative Support & CRM Management",
    description:
      "See a demonstration of administrative work, CRM organization, and business support processes.",
    shareUrl: "https://www.loom.com/share/ddde90360adc4d7495537d5146f56826",
    embedUrl: "https://www.loom.com/embed/ddde90360adc4d7495537d5146f56826",
  },
];

export type WebsiteProject = {
  id: string;
  category: string;
  title: string;
  description: string;
  url: string;
};

export const websiteProjects: WebsiteProject[] = [
  {
    id: "golden-llanera",
    category: "Pastry Shop • Website Demo",
    title: "Golden Llanera — Pastry Shop",
    description:
      "Sample website project for a pastry business, demonstrating website presentation, brand-focused design, and landing page structure.",
    url: "https://preview-1792910500823637052.vibepreview.app/",
  },
  {
    id: "noahs-ark-fencing",
    category: "Home Services • Website Demo",
    title: "Noah's Ark Fencing LLC — Home Services",
    description:
      "Sample home service website demonstrating service-focused messaging, website layout, and lead-generation presentation.",
    url: "https://preview-1792895120796113413.vibepreview.app/",
  },
  {
    id: "open-house-portal",
    category: "Real Estate • Website Demo",
    title: "Open House Portal — Real Estate",
    description:
      "Sample real estate website demonstrating property listing presentation, lead capture structure, and conversion-focused landing page design.",
    url: "https://open-house-portal.vibepreview.app/",
  },
];

export const workflowFolderUrl =
  "https://drive.google.com/drive/folders/194bcEJe4gmd4SS5lr_n8Y-f4QBK9oWXS?usp=sharing";

export const additionalFolderUrl =
  "https://drive.google.com/drive/folders/1jLKhVmCxbMv70iptbIWWV3ViyFAGg3qM?usp=drive_link";

export const voiceIntroUrl = "https://voca.ro/1fqQV4jcEFx1";

export const contact = {
  name: "Elli James Torres",
  role: "Executive Assistant • CRM & Digital Marketing Support",
  email: "jamescarlo100290@gmail.com",
  whatsappNumber: "+63 927 720 6203",
  whatsappUrl: "https://wa.me/639277206203",
  linkedinUrl: "https://www.linkedin.com/in/elli-james-torres-43b5b5282",
  facebookUrl: "https://www.facebook.com/dionnejames21",
  resumeUrl:
    "https://drive.google.com/file/d/1Yrg5uvxRHqlVEWMhHm85KAnrdG2c5hRL/view?usp=drive_link",
};

export const workflowCategories = [
  "GoHighLevel Workflows & Automations",
  "CRM Pipeline Management",
  "Lead Follow-Up Systems",
  "Funnel & Landing Page Samples",
  "Forms & Surveys",
  "Email & SMS Automation",
];

export const industries = [
  "Home Services",
  "Healthcare",
  "Beauty",
  "Remodeling",
  "Accounting",
  "Digital Marketing",
];

export const skillsDeveloping = [
  "Local SEO",
  "Google Ads",
  "AI-Powered Automation",
  "Digital Marketing Strategies",
];
