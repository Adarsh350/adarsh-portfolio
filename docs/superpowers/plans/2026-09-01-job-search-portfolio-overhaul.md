# Job-search Portfolio Overhaul Implementation Plan

> **For agentic workers:** REQUIRED: Use `subagent-driven-development` (if subagents are available) or `executing-plans` to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing device-split portfolio with one premium, responsive, evidence-led job-search portfolio for Adarsh Shankar.

**Architecture:** A single statically rendered Next.js App Router page will compose focused semantic sections from typed content modules. One small client component will handle active-section navigation; content reveal remains CSS-only so everything else stays server-rendered, with CSS providing the responsive technical-editorial system.

**Tech Stack:** Next.js 16.3, React 19, TypeScript 6, Tailwind CSS 4/PostCSS, Fontsource, Vercel Analytics and Speed Insights.

---

## Chunk 1: Foundation and content

### Task 1: Replace stale content with a typed factual model

**Files:**
- Replace: `content/profile.ts`
- Replace: `content/experience.ts`
- Replace: `content/skills.ts`
- Create: `content/projects.ts`

- [ ] Define compact types for profile, authorization, proof metrics, case studies, career entries, education, capabilities, and public projects.
- [ ] Transcribe only resume-backed claims, direct user statements, and public repository facts.
- [ ] Encode the four proof-led case studies and four featured GitHub projects.
- [ ] Search the resulting content for unsupported legacy claims and mojibake.
- [ ] Run `npx tsc --noEmit`; expect zero errors after the UI migration is complete.
- [ ] Commit as `content: rebuild portfolio narrative for job search`.

### Task 2: Install locally served typography and resume asset

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Replace: `public/Adarsh_Shankar_Resume.pdf`

- [ ] Run `npm install @fontsource-variable/instrument-sans @fontsource/ibm-plex-mono`.
- [ ] Copy the supplied resume to `public/Adarsh_Shankar_Resume.pdf`.
- [ ] Confirm both font packages resolve locally and the PDF begins with a valid `%PDF` header.
- [ ] Commit as `build: add local fonts and resume asset`.

## Chunk 2: Responsive interface

### Task 3: Build reusable structural components

**Files:**
- Create: `components/site-nav.tsx`
- Create: `components/section-heading.tsx`
- Create: `components/proof-ledger.tsx`
- Create: `components/case-study.tsx`
- Create: `components/system-diagram.tsx`
- Create: `components/project-index.tsx`
- Create: `components/icons.tsx`

- [ ] Build an accessible sticky navigation with a skip link, keyboard-visible focus, direct resume action, and active-section state.
- [ ] Build semantic section labels/headings and proof-ledger anchors.
- [ ] Build reusable case-study chapters with context, mandate, decisions, system, outcome, tools, and evidence links.
- [ ] Build CSS-driven factual diagrams for Iyara, Trussme, Bloodrec, and Armada without fake screenshots.
- [ ] Build a dense static project index with visible descriptions, repository links, and technical metadata available without hover.
- [ ] Ensure the only client boundary is navigation/reveal behavior and it respects reduced motion.

### Task 4: Compose the recruiter narrative

**Files:**
- Replace: `app/page.tsx`
- Create: `app/not-found.tsx`

- [ ] Compose header, hero, proof ledger, four selected-work chapters, builder index, career range, capability map, education, transition statement, authorization, and contact footer.
- [ ] Keep role, location, availability, and work authorization visible in the hero or immediately below it.
- [ ] Add external-link labels and safe `rel` attributes.
- [ ] Add a branded, useful 404 route.
- [ ] Check heading order and landmark structure in source.

### Task 5: Implement the technical-editorial visual system

**Files:**
- Replace: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `next.config.ts`

- [ ] Import Instrument Sans and IBM Plex Mono from local npm assets.
- [ ] Define porcelain, slate, steel, oxide, and rule tokens with AA contrast.
- [ ] Implement asymmetric wide-screen grids and a natural one-column mobile flow.
- [ ] Add restrained reveal, diagram, and hover/focus motion with `prefers-reduced-motion` overrides.
- [ ] Add responsive typography, touch targets, overflow protection, print-safe defaults, and visible focus rings.
- [ ] Add complete title, description, canonical placeholder handling, Open Graph, Twitter, and robots metadata without inventing a custom domain.
- [ ] Add permanent `/desktop` and `/mobile` redirects and an `X-Robots-Tag: noindex, noarchive` header for the downloadable resume PDF.

## Chunk 3: Architecture cleanup and verification

### Task 6: Remove the obsolete device split and dead scaffold

**Files:**
- Delete: `app/desktop/**`
- Delete: `app/mobile/**`
- Delete: `lib/device.ts`
- Delete: `lib/device-sync.tsx`
- Delete: `proxy.ts`
- Delete: `src/**`
- Delete: `index.html`
- Delete: `vite.config.js`

- [ ] Verify no obsolete imports or paths remain with `rg "app/(desktop|mobile)|@/lib/device|device-sync|COOKIE_NAME|proxy\.ts|vite\.config\.js" app components content lib package.json`.
- [ ] Delete only the obsolete tracked application files listed above; preserve unrelated repository material.
- [ ] Run `git diff --check` and inspect `git status --short`.
- [ ] Commit as `refactor: unify portfolio into one responsive app`.

### Task 7: Add metadata imagery and machine-readable routes

**Files:**
- Create: `app/opengraph-image.tsx`
- Create: `app/icon.svg`
- Create: `app/robots.ts`

- [ ] Generate a 1200×630 oxide-and-porcelain Open Graph image using `ImageResponse` and supported flexbox styles only.
- [ ] Add a simple branded SVG icon.
- [ ] Allow indexing through a static robots route while avoiding an invented sitemap URL.
- [ ] Run `npm run build`; expect a successful static production build.

### Task 8: Verify behavior, accessibility, and visual quality

**Files:**
- Modify if needed: implementation files above
- Append when a defect is fixed: `agent_docs/mistakes.md`

- [ ] Run `npx tsc --noEmit`, `npm run build`, and `git diff --check`.
- [ ] Start `npm run dev -- --hostname 127.0.0.1 --port 3000` and confirm `/`, `/Adarsh_Shankar_Resume.pdf`, and a missing route respond correctly.
- [ ] Confirm `/desktop` and `/mobile` return permanent redirects to `/`, and the resume response includes `X-Robots-Tag: noindex, noarchive`.
- [ ] At 1440×900, confirm role, location, immediate availability, and all authorization lines are visible without scrolling; at 375×812, measure that authorization precedes the proof ledger and ends within 1,000 CSS pixels from the page top.
- [ ] Review rendered pages at 375×812, 768×1024, 1440×900, and 1920×1080 for hierarchy, overflow, clipping, anchor behavior, asset loading, and distinctness from Iyara.
- [ ] Exercise all navigation, email, LinkedIn, GitHub, Iyara, repository, and resume links; confirm no stale `/desktop` or `/mobile` navigation remains.
- [ ] Run an accessibility pass for landmarks, heading hierarchy, keyboard focus, contrast, image alternatives, touch targets, and reduced motion.
- [ ] Append one concise repository lesson for each actual defect fixed during verification.
- [ ] Request a fresh-context code and visual review; resolve every verified finding.
- [ ] Re-run the full verification suite after fixes.
- [ ] Commit final fixes atomically with an imperative subject under 72 characters.
