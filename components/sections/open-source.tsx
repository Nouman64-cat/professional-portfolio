"use client";

import { Check, Copy, ExternalLink } from "lucide-react";

import { openSourceEntries } from "@/content";
import { ActionLink } from "@/components/ui/action-link";
import { contentIcons, GitHubIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { TiltCard } from "@/components/ui/tilt-card";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";

export function OpenSource() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section id="open-source">
      <SectionHeading
        index="06 — Open Source"
        title="Published, not just prototyped."
        description="Two packages live on public registries — proof the work leaves my machine, not just a portfolio screenshot."
      />

      <div className="mt-14 space-y-6">
        {openSourceEntries.map((entry, index) => {
          const Icon = contentIcons[entry.icon];
          const isCopied = copied === entry.install;

          return (
            <Reveal key={entry.id} delay={index * 0.08}>
              <TiltCard className="p-6 sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                  <div className="lg:border-r lg:border-border lg:pr-8">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-elevated text-accent">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent uppercase">
                        {entry.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold tracking-tight">
                      {entry.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">
                      {entry.tagline}
                    </p>
                    {entry.version ? (
                      <p className="mt-3 font-mono text-xs text-accent">{entry.version}</p>
                    ) : null}

                    {entry.install ? (
                      <button
                        type="button"
                        onClick={() => void copy(entry.install as string)}
                        title={`Copy: ${entry.install}`}
                        aria-label={`Copy install command: ${entry.install}`}
                        className="mt-4 flex w-full items-start justify-between gap-2 rounded-lg border border-border bg-elevated px-3 py-2 text-left transition-colors hover:border-accent/50"
                      >
                        <code className="min-w-0 flex-1 font-mono text-xs break-all text-fg">
                          {entry.install}
                        </code>
                        {isCopied ? (
                          <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
                        ) : (
                          <Copy className="mt-0.5 size-3.5 shrink-0 text-subtle" aria-hidden />
                        )}
                      </button>
                    ) : null}

                    {entry.links.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                        {entry.links.map((link) => {
                          const isCode = link.label.toLowerCase().includes("github");
                          const isRegistry = link.label === "npm" || link.label === "PyPI";
                          return (
                            <Magnetic key={link.label}>
                              <ActionLink
                                href={link.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                variant={isRegistry ? "primary" : "secondary"}
                                className="text-xs"
                              >
                                {isCode ? (
                                  <GitHubIcon className="size-3.5" />
                                ) : (
                                  <ExternalLink className="size-3.5" aria-hidden />
                                )}
                                {link.label}
                              </ActionLink>
                            </Magnetic>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <p className="text-sm leading-relaxed text-muted text-pretty">
                      {entry.description}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight.slice(0, 48)}
                          className="flex items-start gap-2.5 text-sm text-muted"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                          <span className="text-pretty">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                      {entry.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
