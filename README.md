# Nouman Ejaz — Portfolio

An interactive personal portfolio for a Lead AI/ML & Cloud Engineer, built with
Next.js 16 (App Router), React 19, Tailwind CSS v4 and Motion.

Every section renders from typed data in `content/`, so updating the site means
editing a data file — not JSX.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint (incl. React Compiler rules)
```

Set the canonical URL before deploying so metadata, the sitemap and the OG
image resolve absolutely:

```bash
# .env.production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## What's interactive

| Feature | Where |
| --- | --- |
| Working shell — `help`, `whoami`, `skills <group>`, `experience`, `systems`, `goto <section>`, `theme`, `resume`, `clear`, with history (↑/↓) and Tab completion | `components/ui/terminal.tsx`, `lib/terminal.ts` |
| ⌘K / Ctrl+K command palette over sections, skills, systems and contact actions | `components/layout/command-palette.tsx` |
| Pointer-reactive neural-network canvas behind the hero | `components/ui/neural-field.tsx` |
| Magnetic buttons, 3D tilt cards with cursor spotlight, cursor glow | `components/ui/magnetic.tsx`, `tilt-card.tsx`, `components/layout/cursor-glow.tsx` |
| Filterable + searchable skills grid, deep-linkable from the palette | `components/sections/skills.tsx` |
| Scroll-linked experience timeline with expandable roles | `components/sections/experience.tsx` |
| System selector with animated architecture pipelines | `components/sections/systems.tsx` |
| Animated metric counters, scroll progress bar, scroll-spy nav | `components/ui/counter.tsx`, `components/layout/` |
| Dark/light theme with no flash on load | `components/providers/theme-provider.tsx` |

## Project structure

```
app/                    Route, layout, global styles, sitemap/robots, OG image
components/
  layout/               Header, footer, command palette, scroll progress, cursor glow
  providers/            Theme and command-palette context
  sections/             One component per page section
  seo/                  schema.org JSON-LD
  ui/                   Reusable primitives (Section, Reveal, TiltCard, Terminal, …)
content/                All site copy and data — the single source of truth
lib/                    Utilities, hooks, terminal command engine, site config
types/                  Shared content types
public/                 Résumé PDF and static assets
```

## Editing the content

| To change | Edit |
| --- | --- |
| Name, tagline, contact details, availability, metrics, education | `content/profile.ts` |
| Skill groups and technologies | `content/skills.ts` |
| Roles and achievements | `content/experience.ts` |
| Flagship systems and their pipelines | `content/systems.ts` |
| Colours, typography, animation tokens | `app/globals.css` |

**Social links:** `socialLinks` in `content/profile.ts` ships with empty
`href` values for GitHub and LinkedIn. Links with an empty `href` are filtered
out at render time, so nothing broken is displayed — fill those two in and the
icons appear in the footer, the contact section and the command palette.

**Résumé:** replace `public/nouman-ejaz-resume.pdf` to update the download.

## Accessibility & performance notes

- Every animation respects `prefers-reduced-motion`; the canvas renders a
  single static frame and the typewriter shows plain text.
- The neural-field loop pauses when scrolled out of view or the tab is hidden.
- Skip-to-content link, focus-visible rings, ARIA-labelled controls, keyboard
  navigation in the palette and terminal.
- The page is fully statically prerendered — content is in the HTML for
  crawlers, with `Person` JSON-LD for structured data.
