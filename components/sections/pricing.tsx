import { Check } from "lucide-react";

import { pricingNote, services } from "@/content";
import { contentIcons } from "@/components/ui/icons";
import { ConsultationBanner } from "@/components/ui/consultation-banner";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading
        index="06 — Pricing"
        title="Straightforward rates. A free first conversation."
        description="Every engagement starts with a free 30-minute call — then a simple hourly rate for the work itself. No retainers required, no surprise invoices."
      />

      <Reveal className="mt-12">
        <ConsultationBanner />
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = contentIcons[service.icon];

          return (
            <Reveal key={service.id} delay={index * 0.06}>
              <TiltCard className="h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-elevated text-accent">
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <div className="text-right">
                    <p className="font-mono text-[10px] tracking-wide text-subtle uppercase">
                      {service.rateNote}
                    </p>
                    <p className="text-2xl font-semibold tracking-tight text-fg">
                      ${service.rate}
                      <span className="text-sm font-normal text-subtle">/hr</span>
                    </p>
                  </div>
                </div>

                <h3 className="mt-4 text-base font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-subtle text-pretty">
                  {service.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start gap-2 text-xs text-muted">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
                      <span className="text-pretty">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-8 max-w-2xl font-mono text-xs leading-relaxed text-subtle">
        {pricingNote}
      </p>
    </Section>
  );
}
