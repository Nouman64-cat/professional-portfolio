import { GraduationCap, Quote } from "lucide-react";

import { education, metrics, profile } from "@/content";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

/** Engineering values, kept short enough to scan. */
const principles = [
  {
    title: "Systems before features",
    body: "Architecture decisions compound. I design for the load, the team and the year after launch — SOLID principles, clear boundaries, no accidental complexity.",
  },
  {
    title: "Measured, not assumed",
    body: "Offline benchmarks, online A/B tests and production telemetry. If a model or a pipeline ships, there is a number proving it earned its place.",
  },
  {
    title: "Cost is a design constraint",
    body: "Batching, semantic caching and cost-aware routing are part of the architecture, not an afterthought once the invoice arrives.",
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01 — About"
        title="Turning frontier AI into infrastructure businesses can depend on."
      />

      {/* Headline numbers, straight from the work below. */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.08}>
            <TiltCard className="h-full p-6">
              <p className="text-4xl font-semibold tracking-tight text-fg">
                <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-fg/90">{metric.label}</p>
              <p className="mt-3 text-xs leading-relaxed text-subtle">
                {metric.description}
              </p>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <Reveal>
            <div className="relative rounded-2xl border-l-2 border-accent/60 pl-6">
              <Quote className="absolute -top-1 -left-3 size-5 text-accent/50" aria-hidden />
              <div className="space-y-5 text-base leading-relaxed text-muted">
                {profile.summary.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-pretty">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-start gap-4 rounded-xl border border-border bg-surface p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-elevated text-accent">
                <GraduationCap className="size-5" aria-hidden />
              </span>
              {education.map((entry) => (
                <div key={entry.degree} className="min-w-0">
                  <h3 className="text-sm font-semibold">{entry.degree}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {entry.institution} · {entry.location}
                  </p>
                  <p className="mt-1 font-mono text-xs text-subtle">{entry.period}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.08} direction="right">
              <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-semibold">{principle.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-subtle">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
