"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";

import { profile, socialLinks } from "@/content";
import { ActionLink } from "@/components/ui/action-link";
import { ConsultationBanner } from "@/components/ui/consultation-banner";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

const brandIcons = { github: GitHubIcon, linkedin: LinkedInIcon } as const;

const details = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}`, icon: Phone },
  { label: "Based in", value: profile.location, href: null, icon: MapPin },
];

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", message: "" };

export function Contact() {
  const { copied, copy } = useCopyToClipboard();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);

  const brandLinks = socialLinks.filter(
    (link) => link.href.length > 0 && link.icon in brandIcons,
  );

  function validate(values: FormState) {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please add a valid email address.";
    }
    if (values.message.trim().length < 12) {
      next.message = "A little more detail helps — 12 characters minimum.";
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // No backend needed: hand the composed message to the visitor's mail client.
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(
      `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setSent(true);
    setForm(EMPTY_FORM);
    window.setTimeout(() => setSent(false), 6000);
  }

  function update(field: keyof FormState, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    // Clear the field's error as soon as the visitor starts fixing it.
    if (errors[field]) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[field];
        return next;
      });
    }
  }

  return (
    <Section id="contact">
      <SectionHeading
        index="06 — Contact"
        title="Have a system worth building? Let's talk."
        description="I'm open to senior and lead AI engineering roles, and to consulting on RAG, agentic systems and LLM infrastructure."
      />

      <Reveal className="mt-12">
        <ConsultationBanner variant="compact" />
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="space-y-4">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            const isCopied = copied === detail.value;

            return (
              <Reveal key={detail.label} delay={index * 0.07}>
                <div className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-elevated text-accent">
                    <Icon className="size-4.5" aria-hidden />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="mt-1 block truncate text-sm text-fg transition-colors hover:text-accent"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="mt-1 truncate text-sm text-fg">{detail.value}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => void copy(detail.value)}
                    aria-label={`Copy ${detail.label.toLowerCase()}`}
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-lg border border-border text-subtle transition-colors hover:text-accent",
                      isCopied && "border-accent/50 text-accent",
                    )}
                  >
                    {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
              </Reveal>
            );
          })}

          {brandLinks.length > 0 ? (
            <Reveal delay={0.2}>
              <div className="flex gap-2 pt-2">
                {brandLinks.map((link) => {
                  const BrandIcon = brandIcons[link.icon as keyof typeof brandIcons];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      <BrandIcon className="size-4" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={0.24}>
            <div className="rounded-xl border border-dashed border-border p-5">
              <p className="text-sm leading-relaxed text-subtle">
                Prefer the short version? Grab the résumé — every role, metric and
                system on this page, on one page.
              </p>
              <Magnetic className="mt-4">
                <ActionLink
                  variant="secondary"
                  href={profile.resumePath}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Download résumé (PDF)
                </ActionLink>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal direction="right">
          <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="contact-name"
                label="Your name"
                value={form.name}
                error={errors.name}
                onChange={(value) => update("name", value)}
                placeholder="Ada Lovelace"
                autoComplete="name"
              />
              <Field
                id="contact-email"
                label="Your email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={(value) => update("email", value)}
                placeholder="ada@company.com"
                autoComplete="email"
              />
            </div>

            <div className="mt-5">
              <Field
                id="contact-message"
                label="What are you building?"
                value={form.message}
                error={errors.message}
                onChange={(value) => update("message", value)}
                placeholder="We're scaling a RAG platform and need help with retrieval quality and inference cost…"
                multiline
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  type="submit"
                  className="accent-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-accent-contrast shadow-[0_10px_36px_-12px_var(--glow)] transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  <Send className="size-4" aria-hidden />
                  Send message
                </button>
              </Magnetic>

              <p className="font-mono text-[11px] text-subtle">
                Opens in your mail app — nothing is stored here.
              </p>
            </div>

            <div aria-live="polite" className="min-h-6">
              <AnimatePresence>
                {sent ? (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-accent"
                  >
                    <Check className="size-4" aria-hidden />
                    Your draft is ready in your mail client.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  autoComplete,
  multiline,
}: FieldProps) {
  const shared = cn(
    "w-full rounded-xl border bg-elevated px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-subtle/70",
    error ? "border-rose-400/60" : "border-border focus:border-accent/60",
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] tracking-[0.16em] text-subtle uppercase"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(shared, "resize-y")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={shared}
        />
      )}

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-rose-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
