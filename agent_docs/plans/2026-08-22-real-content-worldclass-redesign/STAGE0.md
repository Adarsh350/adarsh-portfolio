# Stage 0 — Requirements freeze

## REQUIREMENTS

1. `content/profile.ts` must reflect Adarsh's real identity: name, a headline synthesized from the real resume summary (not the fake "B2B Lifecycle Email & Marketing Systems"), a real bio, location "Dubai, UAE", real email `adarsh.shankar712@gmail.com`, real LinkedIn `https://www.linkedin.com/in/adarshbuilds/`.
2. `content/caseStudies.ts` (or a renamed/reshaped equivalent) must represent Adarsh's real employers/roles, not fake freelance clients. Core "Professional Experience" roles (Iyara Labs, Trussme, Bloodrec, Armada AI) get full treatment; "Additional Experience" roles (JLR, Helmer Scientific, ERIDE NGO) get lighter treatment, mirroring the resume's own two-tier structure.
3. Every metric, company name, and achievement used in content must be sourced verbatim/faithfully from the real resume text (in STAGE0-RESUME.md in this directory) — zero fabrication.
4. `content/skills.ts` must reflect the real skills/certifications list from the resume, grouped sensibly (e.g. Analysis & Reporting / AI Tooling & Automation / Content & Execution / Stakeholder & Coordination / Certifications).
5. The TypeScript type shapes for all three content files may change as needed to fit real content — but must stay internally consistent, and every component in both `app/mobile/**` and `app/desktop/**` that imports these types must be updated to match (no dangling references to old fields like fake `industryTheme`, fake `gallery` image paths, etc.).
6. `app/desktop/**` needs a genuine visual redesign reaching "world-class," "extremely beautifully designed" quality: distinct desktop-native interaction patterns (not a scaled-up mobile view), custom SVG/visual design elements (not generic stock-feeling design), and an information hierarchy that lets a recruiter scan role → impact → skills quickly.
7. `app/mobile/**` gets a visual/content polish pass (real content wiring + custom SVG/visual elements) but KEEPS its existing architecture: bottom tab bar with active-section highlighting, native `<details>` progressive disclosure, scroll-snap carousel, reduced-motion guard. This is not a rebuild.
8. Both trees must remain genuinely mobile-distinct vs. desktop-distinct — no shared component code between `app/mobile/**` and `app/desktop/**` (only `content/*.ts`, `lib/device.ts`, `lib/device-sync.tsx` are shared), consistent with the existing architecture decision.
9. The site must make it easy for a hiring visitor to find what they need (contact info, work history, skills) while being visually stunning — both mobile and desktop.
10. No resume PDF exists in `public/` — this is a known, flagged gap. Do not fabricate a PDF or a fake download link.
11. Must not break the existing device-split architecture (`proxy.ts`, cookie resolution) or the mobile tree's already-verified IntersectonObserver nav/scroll-snap/details behavior.
12. `npm run build` and `npx tsc --noEmit` must both pass clean after the change.

## KNOWN CONTEXT

- Repo: `C:\Users\JobSearch\Documents\Projects\Adarsh-portfolio`, branch `updates`. `git status` shows the entire rebuild (app/, content/, lib/, proxy.ts, etc.) is currently UNTRACKED/uncommitted — nothing has been merged or pushed yet. This confirms the user's "merge everything" instruction is being read as "integrate/finish everything into one coherent, polished result," not a literal git-merge operation — there is nothing to git-merge yet since it's all uncommitted on this one branch.
- Current `content/profile.ts` / `caseStudies.ts` / `skills.ts` are 100% fabricated: a fake freelance B2B email agency persona, fake case studies (fake company names, fake metrics like "$1.18M pipeline"), fake gallery image paths under `/assets/work/{logistics,healthcare,ai}/*.png`.
- Real resume text is saved verbatim in this plan directory at `STAGE0-RESUME.md` — the only source of truth for any fact/metric used in content.
- Mobile tree (`app/mobile/**`) was just refined against two UX-research documents (GOV.UK/AO3/Lichess/Google-Flights findings): native disclosure over custom JS, no forced-app patterns, motion restraint, browser cooperation, full info-density preserved. It now has a 5-item bottom tab bar (`Nav.tsx`, client component) with IntersectionObserver active-section highlighting, scroll-snap project carousel with native `<details>` progressive disclosure in `Projects.tsx`, reduced-motion guard in `styles.css`. This architecture is validated and should be preserved.
- Desktop tree (`app/desktop/**`) exists from an earlier background-agent build (3-up Projects grid, hover-reveal `keyDecisions` panel, 4-column Skills grid, low-opacity hero background using `campaign-command-room.png` + dashboard video) but has had no comparable design refinement pass and no research-informed treatment.
- No resume PDF exists anywhere in `public/` — both the mobile and desktop background-build agents independently flagged this; CTAs currently point to Contact/mailto instead of a resume download.
- User's real LinkedIn was confirmed earlier via direct question: `https://www.linkedin.com/in/adarshbuilds/` (NOT the fake `https://linkedin.com/in/adarshshankar` currently in profile.ts).
- User's personal CLAUDE.md lists his location as Abu Dhabi, but the actual resume he provided for this job-application site states "Dubai, UAE" — the resume is the authoritative source for site content since this is the professional/job-application document.

## ASSUMPTIONS (flagged for user review at plan approval)

1. "Merge everything" = integrate/finish the disparate work-in-progress into one coherent, polished result — not a git merge command. Git actions (commit, push, merge to main) remain fully separate and will only happen on later explicit instruction, consistent with "never merge without explicit instruction" for personal repos.
2. Location on the site will say "Dubai, UAE" (per the resume), not "Abu Dhabi."
3. The "Professional Experience" vs "Additional Experience" two-tier structure from the resume will be mirrored in the content model (full case-study-style treatment for the 4 major roles, a lighter list-style treatment for the 3 additional roles) rather than flattening all 7 into one undifferentiated list.
4. "World-class" visual design will be pursued via custom SVG illustration/iconography and strong typographic/layout craft, not by pulling in new npm design libraries — consistent with the existing lean dependency footprint (Tailwind v4 + Next.js only).
5. Resume PDF gap stays flagged, not solved, in this pass.
