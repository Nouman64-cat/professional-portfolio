"use client";

import { ArrowUp } from "lucide-react";

import { navItems, profile, socialLinks } from "@/content";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { scrollToSection } from "@/lib/utils";

const brandIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
} as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const links = socialLinks.filter((link) => link.href.length > 0);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              {profile.firstName}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {profile.tagline}
            </p>
            <p className="mt-4 font-mono text-xs text-subtle">{profile.location}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-left text-sm text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-4">
            {links.length > 0 ? (
              <div className="flex gap-2">
                {links.map((link) => {
                  const BrandIcon =
                    link.icon in brandIcons
                      ? brandIcons[link.icon as keyof typeof brandIcons]
                      : null;
                  if (!BrandIcon) return null;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={link.label}
                      className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      <BrandIcon className="size-4" />
                    </a>
                  );
                })}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <ArrowUp className="size-4" aria-hidden />
              Back to top
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS and Motion.</p>
        </div>
      </div>
    </footer>
  );
}
