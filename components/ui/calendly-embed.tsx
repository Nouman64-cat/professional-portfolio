"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

import { profile } from "@/content";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/** Loaded at most once per page, regardless of how many embeds mount. */
let scriptPromise: Promise<void> | null = null;

function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${SCRIPT_SRC}"]`,
      );
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("calendly-load-failed")));
        return;
      }

      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("calendly-load-failed"));
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
}

/** Palette handed to Calendly so the embedded card matches the site theme. */
const THEME_PARAMS = {
  dark: { background_color: "0a0e15", text_color: "e9eff6", primary_color: "2dd4bf" },
  light: { background_color: "ffffff", text_color: "0b1220", primary_color: "0d9488" },
} as const;

function buildCalendlyUrl(theme: "dark" | "light") {
  const params = new URLSearchParams({ hide_gdpr_banner: "1", ...THEME_PARAMS[theme] });
  return `${profile.calendlyUrl}?${params.toString()}`;
}

/**
 * Inline Calendly scheduler. The widget script loads on demand (this
 * component is only ever mounted after the visitor asks to see it).
 *
 * Keyed by theme in the wrapper below so a theme change remounts the inner
 * widget with fresh colours, instead of resetting state inside an effect.
 */
export function CalendlyEmbed({ className }: { className?: string }) {
  const { theme } = useTheme();
  return <CalendlyWidget key={theme} theme={theme} className={className} />;
}

function CalendlyWidget({
  theme,
  className,
}: {
  theme: "dark" | "light";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled) return;
        const container = containerRef.current;
        if (!container || !window.Calendly) throw new Error("calendly-unavailable");

        container.replaceChildren();
        window.Calendly.initInlineWidget({
          url: buildCalendlyUrl(theme),
          parentElement: container,
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [theme]);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border", className)}>
      {status === "loading" ? (
        <div className="flex h-[640px] flex-col items-center justify-center gap-3 bg-elevated text-subtle">
          <Loader2 className="size-5 animate-spin" aria-hidden />
          <p className="text-sm">Loading scheduler…</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="flex h-[320px] flex-col items-center justify-center gap-3 bg-elevated px-6 text-center text-subtle">
          <AlertTriangle className="size-5 text-accent" aria-hidden />
          <p className="text-sm">
            Couldn&apos;t load the scheduler here — you can still book directly.
          </p>
          <a
            href={profile.calendlyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-medium text-accent hover:underline"
          >
            Open Calendly ↗
          </a>
        </div>
      ) : null}

      <div ref={containerRef} className={cn("h-[640px] w-full", status !== "ready" && "hidden")} />
    </div>
  );
}
