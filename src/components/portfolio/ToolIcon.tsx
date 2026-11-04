// Renders a single tool icon: a recognizable brand logo where one is available,
// or a neutral lucide placeholder on a brand-accented tile otherwise. This keeps
// the ecosystem honest — no fabricated or recolored official logos.

import {
  SiHubspot,
  SiZoho,
  SiZoom,
  SiGooglemeet,
  SiMeta,
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiMailchimp,
  SiBrevo,
  SiGmail,
  SiGoogleads,
  SiGoogleanalytics,
  SiGoogletagmanager,
  SiGoogledrive,
  SiGooglesheets,
  SiDropbox,
  SiTrello,
  SiAsana,
  SiCalendly,
  SiZapier,
  SiN8N,
  SiStripe,
  SiPaypal,
  SiShopify,
  SiWoocommerce,
  SiWordpress,
  SiLooker,
} from "react-icons/si";
import { FaSalesforce, FaSlack, FaLinkedin, FaFileExcel } from "react-icons/fa6";
import { TbBrandTwilio } from "react-icons/tb";
import type { Tool } from "../../lib/tools-data";

// Brand icon components keyed by the string references used in tools-data.ts.
const brandIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  SiHubspot,
  SiZoho,
  SiZoom,
  SiGooglemeet,
  SiMeta,
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiMailchimp,
  SiBrevo,
  SiGmail,
  SiGoogleads,
  SiGoogleanalytics,
  SiGoogletagmanager,
  SiGoogledrive,
  SiGooglesheets,
  SiDropbox,
  SiTrello,
  SiAsana,
  SiCalendly,
  SiZapier,
  SiN8N,
  SiStripe,
  SiPaypal,
  SiShopify,
  SiWoocommerce,
  SiWordpress,
  SiLooker,
  FaSalesforce,
  FaSlack,
  FaLinkedin,
  FaFileExcel,
  TbBrandTwilio,
};

export function ToolIcon({ tool, className = "" }: { tool: Tool; className?: string }) {
  if (tool.icon) {
    const Icon = brandIcons[tool.icon as string];
    if (Icon) {
      return (
        <span
          className="grid h-9 w-9 place-items-center text-foreground"
          role="img"
          aria-label={tool.name}
        >
          <Icon className={className} />
        </span>
      );
    }
  }

  // Neutral placeholder tile, tinted with the tool's brand accent when known.
  const Placeholder = tool.placeholder!;
  const style = tool.accent
    ? {
        backgroundColor: `${tool.accent}14`,
        color: tool.accent,
      }
    : undefined;
  return (
    <span
      className="grid h-9 w-9 place-items-center rounded-lg"
      style={style}
      role="img"
      aria-label={tool.name}
    >
      <Placeholder className={`h-4.5 w-4.5 ${className}`} />
    </span>
  );
}
