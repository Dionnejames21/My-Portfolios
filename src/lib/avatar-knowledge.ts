/**
 * Avatar knowledge base + response engine.
 *
 * This is a lightweight, client-side "AI representative" for Elli James Torres.
 * It is NOT a true generative LLM — the environment has no backend LLM endpoint,
 * so we implement an honest, rule-based conversational engine grounded ONLY in
 * the real portfolio data already present in this project. It:
 *   - Welcomes visitors naturally.
 *   - Answers questions about James's real skills, services, and 98 website
 *     projects using keyword intent matching.
 *   - Never invents certifications, awards, client results, employment history,
 *     or qualifications.
 *   - Admits when it does not know an answer and redirects the visitor to the
 *     real contact channels.
 *
 * The voice + lip-sync + conversational flow are handled by the component using
 * the browser SpeechSynthesis (male voice) + SpeechRecognition (mic) APIs.
 */

export type AvatarReply = {
  /** What the avatar speaks + shows as the subtitle. */
  text: string;
  /** Optional follow-up suggestions rendered as quick-reply chips. */
  suggestions?: string[];
};

const NAME = "James";
const ROLE =
  "GoHighLevel Specialist, Executive Assistant, and Digital Marketing Support Professional";

const GREETING: AvatarReply = {
  text: "Hi! I'm James, your AI representative. I'm here to help you learn more about my professional background, experience, skills, and the services I can provide. What would you like to know?",
  suggestions: [
    "What do you do?",
    "Tell me about your websites",
    "What GoHighLevel services do you offer?",
    "How can I contact you?",
  ],
};

const FALLBACK: AvatarReply = {
  text: "I don't have enough detail on that one. I'd rather be honest than make something up. I can help with questions about my GoHighLevel services, my 98 website projects, my skills, or how to reach me directly. What would you like to explore?",
  suggestions: ["What do you do?", "Show me your work", "How do I contact you?"],
};

const LEAD_INTEREST: AvatarReply = {
  text: "That's great to hear. I'd love to learn what you need. Could you share your name, your email, and the service you're looking for? I'll pass it through so I can follow up with you personally.",
  suggestions: ["CRM setup", "Workflow automation", "Landing page", "Virtual assistance"],
};

type Intent = {
  keys: string[];
  reply: AvatarReply;
};

const INTENTS: Intent[] = [
  {
    keys: [
      "hi",
      "hello",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
      "yo",
    ],
    reply: {
      text: "Hello! Thanks for stopping by. I can walk you through my GoHighLevel services, my website portfolio, or how to get in touch. What are you most interested in?",
      suggestions: ["What do you do?", "Your websites", "GoHighLevel services", "Contact you"],
    },
  },
  {
    keys: [
      "who are you",
      "about you",
      "introduce",
      "tell me about",
      "who is elli",
      "who's elli",
      "what do you do",
      "what can you do",
    ],
    reply: {
      text: `I'm ${NAME}, ${ROLE}. I help businesses and agencies build and optimize GoHighLevel systems through CRM setup, pipeline management, workflow automation, lead capture, and professional landing page development. I also bring over 5 years of executive and administrative support experience across home services, healthcare, beauty, remodeling, accounting, and digital marketing.`,
      suggestions: ["What services do you offer?", "See your website work", "How do I hire you?"],
    },
  },
  {
    keys: [
      "website",
      "websites",
      "portfolio",
      "projects",
      "web design",
      "web development",
      "sites",
      "98",
      "samples",
    ],
    reply: {
      text: "I've built 98 website projects across different businesses and industries. You can explore all of them on the Website Portfolio page, and there's a dedicated Video Portfolio page too. Each project shows a preview and a Visit Website link to the actual live site. Would you like a few examples?",
      suggestions: [
        "Show me a few",
        "Open the Website Portfolio",
        "Open the Video Portfolio",
        "Hire me",
      ],
    },
  },
  {
    keys: ["video", "videos", "loom", "demonstration", "demo", "watch", "screen recording"],
    reply: {
      text: "I have a Video Portfolio page with Loom demonstrations covering my professional introduction, GoHighLevel CRM and automation work, and administrative support. There's also an optional voice introduction. Want me to point you there?",
      suggestions: ["Open the Video Portfolio", "Tell me about GoHighLevel", "Contact you"],
    },
  },
  {
    keys: [
      "service",
      "services",
      "offer",
      "offerings",
      "what can you do",
      "what do you offer",
      "specialties",
      "specialty",
    ],
    reply: {
      text: "My core GoHighLevel services are CRM setup and configuration, pipeline and opportunity management, workflow automation, SMS and email follow-up systems, landing page and funnel development, forms and surveys, appointment booking and calendar setup, and third-party integrations. Which one matters most to your business?",
      suggestions: ["CRM setup", "Workflow automation", "Landing pages", "Integrations"],
    },
  },
  {
    keys: [
      "crm",
      "pipeline",
      "contact management",
      "opportunity",
      "setup",
      "configure",
      "configuration",
    ],
    reply: {
      text: "On the CRM side I set up and organize your sub-accounts, custom fields, values, and tag taxonomy; build multi-stage sales pipelines customized to your sales cycle; track opportunities and deal values; and handle contact imports and data cleanup. Want me to walk through how I'd approach yours?",
      suggestions: [
        "Yes, walk me through it",
        "What about automation?",
        "Let's talk pricing",
        "Contact you",
      ],
    },
  },
  {
    keys: [
      "workflow",
      "automation",
      "automate",
      "automated",
      "trigger",
      "follow up",
      "follow-up",
      "nurture",
      "sequence",
    ],
    reply: {
      text: "I build workflow automation with event-driven triggers, conditional branches, delay timers, internal notifications, and task assignment. That includes fast lead-response SMS and email nurture sequences, appointment reminders, no-show re-engagement, and review requests. I also test and troubleshoot existing workflows to keep them reliable.",
      suggestions: ["SMS and email", "Appointment reminders", "Show me a workflow", "Hire you"],
    },
  },
  {
    keys: ["funnel", "landing page", "landing", "page", "convert", "conversion", "lead capture"],
    reply: {
      text: "I build clean, mobile-optimized GoHighLevel funnels and landing pages with form and calendar embeds, thank-you pages, and on-brand visuals. I also create multi-step qualification surveys that map data straight into CRM fields. I focus on structure and fast loading rather than over-promising conversions.",
      suggestions: ["Forms and surveys", "See website projects", "Contact you"],
    },
  },
  {
    keys: ["form", "forms", "survey", "surveys", "lead capture", "qualify", "questionnaire"],
    reply: {
      text: "I create lead capture forms with real-time validation, multi-step qualification surveys with conditional logic, and inline or sticky embedded forms. Responses route dynamically based on survey answers so your follow-up is always relevant.",
      suggestions: ["Landing pages", "Workflow automation", "Hire you"],
    },
  },
  {
    keys: ["appointment", "calendar", "booking", "schedule", "calendly", "reminder", "no-show"],
    reply: {
      text: "I set up round-robin, team, and individual booking calendars with Google Workspace and Outlook two-way sync, custom availability rules, buffer times, and booking limits — plus automated confirmation, calendar invites, and reminder sequences to reduce no-shows.",
      suggestions: ["SMS reminders", "Workflow automation", "Contact you"],
    },
  },
  {
    keys: [
      "integration",
      "integrate",
      "zapier",
      "make",
      "n8n",
      "webhook",
      "api",
      "connect",
      "third-party",
      "third party",
    ],
    reply: {
      text: "I connect GoHighLevel with external tools through Zapier, Make, n8n, webhooks, and native integrations — including Meta Business Suite and lead ads, Google Ads, Analytics, Tag Manager tracking, and payment processors. The exact connection depends on the platform, your plan, and account permissions, so I scope it per project.",
      suggestions: ["CRM setup", "Workflow automation", "Let's talk", "Contact you"],
    },
  },
  {
    keys: [
      "admin",
      "administrative",
      "executive",
      "virtual assistant",
      "va",
      "assistant",
      "data entry",
      "documentation",
      "email management",
    ],
    reply: {
      text: "Beyond GoHighLevel, I provide executive and virtual assistance: calendar and email coordination, Google Sheets and Excel trackers, data entry and documentation, and task and deadline coordination. I keep operations organized so owners and teams can focus on growth.",
      suggestions: ["GoHighLevel services", "How do I hire you?", "Contact you"],
    },
  },
  {
    keys: [
      "recruit",
      "recruitment",
      "hiring",
      "job posting",
      "candidate",
      "sourcing",
      "onlinejobs",
      "indeed",
    ],
    reply: {
      text: "I also support recruitment: posting roles on OnlineJobs.ph, Indeed, LinkedIn, and social media, sourcing and following up with candidates, and tracking applicants through the hiring pipeline.",
      suggestions: ["Other services", "Contact you"],
    },
  },
  {
    keys: ["pastry", "recipe", "bakery", "baking", "production", "research and development", "r&d"],
    reply: {
      text: "Earlier in my career I worked in professional pastry production — recipe development and testing, product standardization, quality evaluation, and production documentation. That background taught me the process discipline I now bring to CRM and automation work.",
      suggestions: ["Current services", "Contact you"],
    },
  },
  {
    keys: ["skill", "skills", "tools", "platforms", "tech stack", "what do you use", "software"],
    reply: {
      text: "I work across GoHighLevel, Google Workspace, Sheets, Business Profile, and Analytics, Meta Business Suite and Ads Manager, Calendly, Salesforce, Slack, and Zapier. I keep learning Local SEO, Google Ads, and AI-powered automation. I won't claim advanced certification where I don't have it — I represent my real, hands-on experience honestly.",
      suggestions: ["GoHighLevel services", "Website portfolio", "Contact you"],
    },
  },
  {
    keys: ["experience", "years", "background", "how long", "work history", "resume", "cv"],
    reply: {
      text: "I have over 5 years of experience supporting business owners, marketing agencies, and home service companies across industries like home services, healthcare, beauty, remodeling, accounting, and digital marketing. My full background is on my resume, linked in the Contact section.",
      suggestions: ["View resume", "What services?", "Contact you"],
    },
  },
  {
    keys: [
      "contact",
      "reach",
      "get in touch",
      "talk",
      "email",
      "whatsapp",
      "linkedin",
      "facebook",
      "hire",
      "hire you",
      "work with",
      "start",
      "engage",
      "book",
    ],
    reply: LEAD_INTEREST,
  },
  {
    keys: [
      "price",
      "pricing",
      "cost",
      "rate",
      "rates",
      "how much",
      "fee",
      "fees",
      "quote",
      "budget",
      "expensive",
      "cheap",
    ],
    reply: {
      text: "Pricing depends on the scope — whether it's a full CRM build, a set of workflows, a landing page, or ongoing support. Share a little about your project and I'll point you to the right next step. You can reach me directly through WhatsApp, email, LinkedIn, or the contact section.",
      suggestions: ["Let's talk", "WhatsApp", "Email you"],
    },
  },
  {
    keys: [
      "thank",
      "thanks",
      "appreciate",
      "great",
      "awesome",
      "perfect",
      "cool",
      "nice",
      "good work",
      "impressive",
    ],
    reply: {
      text: "Thank you! If anything sounds useful, the fastest way to reach me is WhatsApp or email — the links are in the Contact section. Anything else you'd like to know?",
      suggestions: ["What services?", "See your websites", "Contact you"],
    },
  },
  {
    keys: ["bye", "goodbye", "see you", "later", "that's all", "that is all", "end"],
    reply: {
      text: "Thanks for visiting. Whenever you're ready, just reach out through the Contact section. I look forward to working with you!",
    },
  },
];

/**
 * Match a visitor message to a reply. Returns the greeting when the message
 * is empty, a lead capture prompt when interest intent is detected, and the
 * honest fallback when nothing matches.
 */
export function avatarRespond(message: string): AvatarReply {
  const msg = message.trim().toLowerCase();
  if (!msg) return GREETING;

  let best: { reply: AvatarReply; score: number } | null = null;
  for (const intent of INTENTS) {
    let score = 0;
    for (const key of intent.keys) {
      if (msg.includes(key)) score += key.split(" ").length;
    }
    if (score > 0 && (!best || score > best.score)) best = { reply: intent.reply, score };
  }

  return best ? best.reply : FALLBACK;
}

export { GREETING, LEAD_INTEREST, FALLBACK, NAME, ROLE };
