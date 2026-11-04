// Cinematic section background images — generated, themed to GHL/CRM audience.
// Each section gets its own moody background; used as a subtle parallax layer.

export const sectionBackgrounds = {
  hero: "https://vibe.filesafe.space/1793286545658653540/assets/5bd8445f-ba1f-4416-81eb-5caa0d01f935.png",
  work: "https://vibe.filesafe.space/1793286545658653540/assets/9ca690f4-10c4-4803-b5cf-16a10c9374ea.png",
  services:
    "https://vibe.filesafe.space/1793286545658653540/assets/daca6d83-93d0-4df1-b2b7-4e215ea89a2a.png",
  experience:
    "https://vibe.filesafe.space/1793286545658653540/assets/ce9e8146-2ae4-4740-bcdd-f1d8b4eb56bd.png",
  howItWorks:
    "https://vibe.filesafe.space/1793286545658653540/assets/00ba6168-3ef9-44f6-bd08-0fe520541c73.png",
  contact:
    "https://vibe.filesafe.space/1793286545658653540/assets/3c6cefe1-5ef7-4837-b32a-6adaef91ead6.png",
} as const;

export type SectionBgKey = keyof typeof sectionBackgrounds;
