import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "accent-gradient text-accent-contrast font-semibold shadow-[0_10px_36px_-12px_var(--glow)] hover:brightness-110",
  secondary:
    "border border-border-strong bg-surface text-fg hover:bg-surface-strong hover:border-accent/50",
  ghost: "text-muted hover:text-fg",
};

interface ActionLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
}

/**
 * The site's single link/button style. Uses `next/link` so internal anchors
 * and external URLs share one component.
 */
export function ActionLink({
  variant = "primary",
  className,
  children,
  ...props
}: ActionLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
