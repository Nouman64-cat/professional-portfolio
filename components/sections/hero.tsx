"use client";

import { ArrowDown, Command, Download, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { profile } from "@/content";
import { useCommandPalette } from "@/components/providers/command-palette-provider";
import { ActionLink } from "@/components/ui/action-link";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { NeuralField } from "@/components/ui/neural-field";
import { Terminal } from "@/components/ui/terminal";
import { Typewriter } from "@/components/ui/typewriter";
import { scrollToSection } from "@/lib/utils";

/** Highlight reel for the ticker under the fold. */
const MARQUEE_ITEMS = [
  "LangGraph",
  "RAG at scale",
  "PyTorch",
  "Kubernetes",
  "Multi-agent systems",
  "AWS · GCP · Azure",
  "Vector databases",
  "LLM inference",
  "Next.js",
  "FastAPI",
  "Kafka · Spark",
  "MLOps",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const { setOpen: setPaletteOpen } = useCommandPalette();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      {/* Layered backdrop: grid, drifting aurora, interactive neural field. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-backdrop absolute inset-0" />
        <div className="animate-aurora absolute -top-40 -left-32 size-[520px] rounded-full bg-accent/12 blur-[120px]" />
        <div className="animate-aurora absolute -top-24 right-0 size-[420px] rounded-full bg-accent-2/12 blur-[120px] [animation-delay:-8s]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 opacity-70">
        <NeuralField />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[11px] tracking-wide text-accent">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {profile.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-subtle">
                <MapPin className="size-3" aria-hidden />
                {profile.location}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              id="hero-heading"
              className="mt-7 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
            >
              <span className="block text-muted">Hi, I&apos;m</span>
              <span className="text-gradient block">{profile.name}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 flex min-h-[2rem] items-center font-mono text-base text-fg sm:text-xl"
            >
              <span className="mr-2 text-accent" aria-hidden>
                &gt;
              </span>
              <Typewriter words={profile.titles} />
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg"
            >
              {profile.tagline}{" "}
              <span className="text-fg">
                {profile.experienceYears} years
              </span>{" "}
              turning research-grade AI into production systems teams can rely on.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <ActionLink href="#contact" onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contact");
                }}>
                  <Sparkles className="size-4" aria-hidden />
                  Let&apos;s work together
                </ActionLink>
              </Magnetic>

              <Magnetic>
                <ActionLink
                  variant="secondary"
                  href={profile.resumePath}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Download className="size-4" aria-hidden />
                  Résumé
                </ActionLink>
              </Magnetic>

              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm text-subtle transition-colors hover:text-accent"
              >
                <Command className="size-3.5" aria-hidden />
                Press
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
                to explore
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Terminal />
            <p className="mt-3 text-center font-mono text-[11px] text-subtle">
              This terminal is real — try{" "}
              <span className="text-accent">skills agentic</span> or{" "}
              <span className="text-accent">goto systems</span>
            </p>
          </motion.div>
        </div>

        <div className="mt-16 sm:mt-20">
          <Marquee items={MARQUEE_ITEMS} />
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="group flex flex-col items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase transition-colors hover:text-accent"
          >
            Scroll
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
