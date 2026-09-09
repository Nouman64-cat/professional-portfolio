import {
  Brain,
  Cloud,
  Code2,
  Database,
  Gauge,
  Layers,
  Network,
  Shield,
  Sparkles,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/types/content";

/** Maps the icon names used in `content/` to concrete Lucide components. */
export const contentIcons: Record<IconName, LucideIcon> = {
  brain: Brain,
  cloud: Cloud,
  code: Code2,
  database: Database,
  gauge: Gauge,
  layers: Layers,
  network: Network,
  shield: Shield,
  sparkles: Sparkles,
  terminal: Terminal,
  workflow: Workflow,
};

type BrandIconProps = React.SVGProps<SVGSVGElement>;

/**
 * Brand marks are not part of the Lucide icon set, so they live here as
 * minimal inline SVG that inherits `currentColor`.
 */
export function GitHubIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.53v-1.9c-3.06.66-3.71-1.3-3.71-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.68.08-.67.08-.67 1.1.08 1.69 1.14 1.69 1.14.98 1.69 2.58 1.2 3.21.92.1-.71.39-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.45 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.4.11-2.92 0 0 .93-.3 3.03 1.13a10.5 10.5 0 0 1 5.52 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.71.77 1.13 1.76 1.13 2.96 0 4.24-2.58 5.17-5.03 5.44.4.34.75 1.02.75 2.06v3.05c0 .29.2.64.76.53 4.36-1.46 7.51-5.57 7.51-10.43C23.01 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon(props: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
