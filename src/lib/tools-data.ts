// Tools, Platforms & Integrations ecosystem data.
// Icons: react-icons brand sets where official logos exist; neutral placeholder
// icons (from lucide-react) are used for platforms without a recognizable logo.
// Honest tiering distinguishes active use, supporting experience, and
// project-dependent integration — no certifications or claims of advanced
// proficiency are implied.

import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  CalendarClock,
  CreditCard,
  LineChart,
  Mail,
  MessageSquare,
  Plug,
  Share2,
  Users,
} from "lucide-react";

export type ToolTier = "active" | "supporting" | "project";

export type Tool = {
  name: string;
  tier: ToolTier;
  /** react-icons component reference, or null to render a neutral placeholder. */
  icon?: unknown;
  /** lucide placeholder icon used when no brand logo is available. */
  placeholder?: LucideIcon;
  /** brand accent color used for the placeholder tile (hex). */
  accent?: string;
};

export type ToolCategory = {
  id: string;
  title: string;
  caption: string;
  icon: LucideIcon;
  tools: Tool[];
};

export const tierLabels: Record<ToolTier, string> = {
  active: "Actively use",
  supporting: "Supporting experience",
  project: "Project-dependent",
};

export const toolCategories: ToolCategory[] = [
  {
    id: "crm-sales",
    title: "CRM & Sales Platforms",
    caption:
      "CRM organization, contact management, sales pipelines, lead tracking, and customer relationship management.",
    icon: Users,
    tools: [
      { name: "GoHighLevel", tier: "active", placeholder: Boxes, accent: "#0BA5E9" },
      { name: "HubSpot", tier: "supporting", icon: "SiHubspot" },
      { name: "Salesforce", tier: "supporting", icon: "FaSalesforce" },
      { name: "Pipedrive", tier: "project", placeholder: Users, accent: "#1A1A1A" },
      { name: "Zoho CRM", tier: "project", icon: "SiZoho" },
      {
        name: "Microsoft Dynamics 365",
        tier: "project",
        placeholder: Users,
        accent: "#002B50",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication & Collaboration",
    caption:
      "Team communication, appointment coordination, notifications, meetings, and operational collaboration.",
    icon: MessageSquare,
    tools: [
      { name: "Slack", tier: "active", icon: "FaSlack" },
      {
        name: "Microsoft Teams",
        tier: "supporting",
        placeholder: MessageSquare,
        accent: "#5059C9",
      },
      { name: "Zoom", tier: "active", icon: "SiZoom" },
      { name: "Google Meet", tier: "active", icon: "SiGooglemeet" },
      { name: "RingCentral", tier: "project", placeholder: MessageSquare, accent: "#0680BE" },
    ],
  },
  {
    id: "social-ads",
    title: "Social Media & Advertising",
    caption:
      "Social media management, advertising support, campaign coordination, and lead-generation operations.",
    icon: Share2,
    tools: [
      { name: "Meta", tier: "active", icon: "SiMeta" },
      { name: "Facebook", tier: "active", icon: "SiFacebook" },
      { name: "Instagram", tier: "active", icon: "SiInstagram" },
      { name: "TikTok", tier: "supporting", icon: "SiTiktok" },
      { name: "LinkedIn", tier: "active", icon: "FaLinkedin" },
      { name: "YouTube", tier: "supporting", icon: "SiYoutube" },
    ],
  },
  {
    id: "email-sms",
    title: "Email & SMS Marketing",
    caption:
      "Email campaigns, SMS messaging, customer notifications, and automated follow-up. Actual messaging capabilities depend on the platform, integration, configuration, and applicable consent requirements.",
    icon: Mail,
    tools: [
      { name: "Mailchimp", tier: "supporting", icon: "SiMailchimp" },
      { name: "ActiveCampaign", tier: "supporting", placeholder: Mail, accent: "#356AE6" },
      { name: "SendGrid", tier: "project", placeholder: Mail, accent: "#1A82E2" },
      { name: "Twilio", tier: "project", icon: "TbBrandTwilio" },
      { name: "Brevo", tier: "supporting", icon: "SiBrevo" },
      { name: "Gmail", tier: "active", icon: "SiGmail" },
    ],
  },
  {
    id: "lead-local",
    title: "Lead Generation & Local Marketing",
    caption:
      "Lead-generation support, local business visibility, campaign tracking, analytics, and marketing measurement.",
    icon: LineChart,
    tools: [
      { name: "Google Ads", tier: "supporting", icon: "SiGoogleads" },
      {
        name: "Google Business Profile",
        tier: "supporting",
        placeholder: Share2,
        accent: "#4285F4",
      },
      {
        name: "Google Local Services Ads",
        tier: "supporting",
        placeholder: LineChart,
        accent: "#1A73E8",
      },
      { name: "Google Analytics", tier: "supporting", icon: "SiGoogleanalytics" },
      { name: "Google Tag Manager", tier: "supporting", icon: "SiGoogletagmanager" },
      { name: "Meta Pixel", tier: "supporting", icon: "SiMeta" },
    ],
  },
  {
    id: "productivity",
    title: "Productivity & Business Tools",
    caption:
      "Scheduling, documentation, file management, reporting, task coordination, and day-to-day business operations.",
    icon: CalendarClock,
    tools: [
      { name: "Google Workspace", tier: "active", placeholder: CalendarClock, accent: "#4285F4" },
      { name: "Google Drive", tier: "active", icon: "SiGoogledrive" },
      { name: "Google Sheets", tier: "active", icon: "SiGooglesheets" },
      { name: "Microsoft Excel", tier: "active", icon: "FaFileExcel" },
      { name: "Microsoft Outlook", tier: "supporting", placeholder: Mail, accent: "#0078D4" },
      { name: "Dropbox", tier: "supporting", icon: "SiDropbox" },
      { name: "Trello", tier: "supporting", icon: "SiTrello" },
      { name: "Asana", tier: "supporting", icon: "SiAsana" },
      { name: "Calendly", tier: "active", icon: "SiCalendly" },
    ],
  },
  {
    id: "automation",
    title: "Automation & Integration Tools",
    caption:
      "Connecting business applications, transferring data between systems, automating repetitive tasks, and building efficient workflows. APIs and webhooks are represented with neutral icons.",
    icon: Plug,
    tools: [
      { name: "Zapier", tier: "active", icon: "SiZapier" },
      { name: "Make", tier: "supporting", placeholder: Plug, accent: "#6D00CC" },
      { name: "n8n", tier: "supporting", icon: "SiN8N" },
      { name: "Webhooks", tier: "active", placeholder: Plug, accent: "#0BA5E9" },
      { name: "APIs", tier: "active", placeholder: Plug, accent: "#7C3AED" },
      { name: "Pabbly Connect", tier: "project", placeholder: Plug, accent: "#FF6B2C" },
    ],
  },
  {
    id: "payments",
    title: "Payments, E-Commerce & Funnels",
    caption:
      "Payment integrations, online business support, funnel management, website connections, and customer journey optimization. Not every processor or platform is directly supported in every account.",
    icon: CreditCard,
    tools: [
      { name: "Stripe", tier: "supporting", icon: "SiStripe" },
      { name: "PayPal", tier: "supporting", icon: "SiPaypal" },
      { name: "Shopify", tier: "supporting", icon: "SiShopify" },
      { name: "WooCommerce", tier: "supporting", icon: "SiWoocommerce" },
      { name: "ClickFunnels", tier: "project", placeholder: CreditCard, accent: "#FF6B00" },
      { name: "WordPress", tier: "supporting", icon: "SiWordpress" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    caption:
      "Campaign monitoring, reporting support, conversion tracking, and data-informed operational improvements.",
    icon: LineChart,
    tools: [
      { name: "Google Analytics", tier: "supporting", icon: "SiGoogleanalytics" },
      { name: "Google Tag Manager", tier: "supporting", icon: "SiGoogletagmanager" },
      { name: "Looker Studio", tier: "supporting", icon: "SiLooker" },
      { name: "Meta Ads Manager", tier: "supporting", icon: "SiMeta" },
      { name: "HubSpot Reporting", tier: "supporting", icon: "SiHubspot" },
    ],
  },
];

export const ghlHub = {
  name: "GoHighLevel",
  caption: "GoHighLevel — CRM, Automation, Funnels & Lead Management",
  icon: Boxes,
};
