"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarClock, ChevronDown } from "lucide-react";

import { profile } from "@/content";
import { ActionLink } from "@/components/ui/action-link";
import { CalendlyEmbed } from "@/components/ui/calendly-embed";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

interface ConsultationBannerProps {
  className?: string;
  /** "full" adds the inline-scheduler toggle; "compact" is link-only. */
  variant?: "full" | "compact";
}

/**
 * The site's one Calendly call-to-action, reused on Pricing and Contact.
 *
 * The Calendly widget script only loads once a visitor asks to see it (the
 * "Schedule inline" toggle) — booking always works via the direct link even
 * if the embed fails or a script blocker strips it.
 */
export function ConsultationBanner({ className, variant = "full" }: ConsultationBannerProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("glass rounded-2xl border-accent/20 p-6 sm:p-8", className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
            <CalendarClock className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
              Free · 30 minutes · no obligation
            </p>
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
              Book a free AI consultation
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted text-pretty">
              A real conversation about your AI or infrastructure challenge — what&apos;s
              worth building, what isn&apos;t, and whether I&apos;m the right fit.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Magnetic>
            <ActionLink href={profile.calendlyUrl} target="_blank" rel="noreferrer noopener">
              <CalendarClock className="size-4" aria-hidden />
              Book on Calendly
            </ActionLink>
          </Magnetic>

          {variant === "full" ? (
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-fg"
            >
              {expanded ? "Hide scheduler" : "Schedule inline"}
              <ChevronDown
                className={cn("size-4 transition-transform duration-300", expanded && "rotate-180")}
                aria-hidden
              />
            </button>
          ) : null}
        </div>
      </div>

      {variant === "full" ? (
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6">
                <CalendlyEmbed />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
}
