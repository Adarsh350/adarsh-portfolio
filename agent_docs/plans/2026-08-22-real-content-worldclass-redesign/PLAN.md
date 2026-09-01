# PLAN — Real content + world-class desktop redesign + mobile polish

Repo: `C:\Users\JobSearch\Documents\Projects\Adarsh-portfolio`, branch `updates`.
Baseline verified before planning: `npx tsc --noEmit` exits 0 on current HEAD-of-worktree.
Stack confirmed from `package.json`: Next 16.3.2, React 19.2.8, Tailwind v4.2.2, TypeScript 6.0.2. **No new dependencies are added by this plan** (satisfies STAGE0 assumption 4) — everything below uses only `next/image`'s built-in transcoding and hand-authored SVG/CSS.

---

## 1. Approach

The fabricated content is not a data problem, it is a *schema* problem: `CaseStudy` models a freelance-agency engagement (`client`, `engagement.stakeholders`, `industryTheme: "logistics"|"healthcare"|"ai"`, a 3-image `gallery`) and Adarsh's real history is employment, not engagements. Patching values into that shape would keep every fake-persona affordance alive — which is exactly why explorer-A found the three highest-risk couplings (`accent[study.industryTheme]`, the unguarded `gallery[0]`, the `headings` object) all sitting on fields that real content has no honest value for. So the content model is **replaced, not edited**: `content/caseStudies.ts` is deleted and `content/experience.ts` takes its place with two types — `Role` (the 4 Professional Experience employers, full treatment) and `AdditionalRole` (the 3 lighter ones) — mirroring the resume's own two-tier structure per STAGE0 requirement 2. Deleting the `gallery` and `industryTheme` fields outright is what makes the compiler, not a reviewer, guarantee "no dangling fake references": every one of the 13 consumer files explorer-A listed will hard-fail `tsc` until it is updated (STAGE0 requirement 5).

Execution is ordered so the content model lands first and the tree is returned to **green build before any design work starts** (Step 4 is a deliberately ugly mechanical compile-fix pass). That gives both the desktop and mobile lanes a compiling baseline to branch from, and since explorer-A confirmed `app/desktop/**` and `app/mobile/**` share zero component code, those two lanes touch disjoint files and can run in parallel afterwards (STAGE0 requirement 8 is preserved by construction — the only shared modules stay `content/*.ts`, `lib/device.ts`, `lib/device-sync.tsx`).

The desktop redesign is driven by explorer-B's finding that the richest content in the repo was never rendered: desktop only ever touched 7 of `CaseStudy`'s 18 fields, compressing everything into a 3-up card grid whose one interaction (`.d-card-overlay`) actively *hides* content behind a hover. The replacement is a **sticky-rail experience explorer** — all four role dossiers stacked and fully visible in a right column, with a sticky left index that tracks scroll position — which is unmistakably desktop-native (a sticky rail is meaningless on a phone), keeps every word Cmd-F-findable and recruiter-scannable (STAGE0 requirement 9), and surfaces the role → impact → skills hierarchy without a click. Around it: a real token system replacing the single `--d-accent` (explorer-B gap 2), fluid `clamp()` typography and container replacing the fixed 1200px (gap 7), and a hand-authored SVG set matching the 24-grid / `strokeWidth="2"` / round-cap Feather language explorer-C found in mobile `Nav.tsx`, so the two trees read as one brand without sharing a line of code (gap 1).

Mobile is left architecturally untouched per STAGE0 requirement 7 — `Nav.tsx`'s IntersectionObserver, the `#hero`/`#about`/`#projects`/`#skills`/`#contact` anchor contract, `.snap-row`/`.snap-card`, the native `<details>` disclosure and the `prefers-reduced-motion` guard in `app/mobile/styles.css` are all preserved verbatim. Mobile changes are content re-wiring plus icon additions only.

On the fake imagery: the 9 files under `public/assets/work/**` (~14MB) depict invented client work and there is no real photography or screenshots of Adarsh's actual employment to replace them with. Inventing substitutes would violate STAGE0 requirement 3. They are **deleted**, and the card cover slot they occupied is replaced by a per-company SVG monogram tile — a designed element that claims nothing it cannot back up. This also resolves explorer-C's gallery question at the root rather than patching it.

---

## 2. New `content/*.ts` type shapes

### 2.1 `content/profile.ts`

```ts
export type Credential = {
  school: string;
  qualifier: string;    // e.g. "Top-10 Marketing program in the US — QS"
  degree: string;
  period: string;
  leadership?: string;
};

export type Profile = {
  name: string;
  headline: string;      // short role identity, one line
  valueProp: string;     // NEW — dedicated hero line; kills the bio.split(". ") hack
  bio: string;           // About-section prose, first person
  location: string;      // "Dubai, UAE"
  email: string;
  linkedin: string;
  availability: string;  // "Immediate notice" (resume header)
  eligibility: string[]; // ["Indian National", "US-Educated (Purdue University, STEM)", "UAE Golden Visa Holder"]
  education: Credential[];
};
```

Three fields are new and each retires a specific defect:

| New field | Retires |
|---|---|
| `valueProp` | `app/desktop/components/Hero.tsx:7` — `profile.bio.split(". ")[0] + "."` (explorer-A risk 3, explorer-B gap 11) |
| `eligibility` + `availability` | Real, recruiter-load-bearing resume header data that the site currently throws away |
| `education` | Explorer-B gap: desktop `About.tsx` renders `profile.bio` and literally nothing else |

Values (every string traceable to `STAGE0-RESUME.md`):

```ts
export const profile: Profile = {
  name: "Adarsh Shankar",
  headline: "Marketing Analytics Leader & AI-Native Builder",
  valueProp:
    "I run GTM, lifecycle, and growth marketing for B2B and B2C brands — and build the sites, trackers, and internal tools that make them measurable, using Claude Code and modern AI tooling.",
  bio:
    "I co-built a 100+-marker AI visibility platform at Iyara Labs, and at Trussme lifted email MQLs 30%+ and SQLs 25%+ through AI-built landing pages and automated lead pipelines. Before that I was the first marketing hire at Bloodrec and the sole marketing hire at Microsoft-backed Armada AI. Purdue M.S. Marketing Analytics (STEM), based in Dubai.",
  location: "Dubai, UAE",
  email: "adarsh.shankar712@gmail.com",
  linkedin: "https://www.linkedin.com/in/adarshbuilds/",
  availability: "Immediate notice",
  eligibility: [
    "Indian National",
    "US-Educated (Purdue University, STEM)",
    "UAE Golden Visa Holder",
  ],
  education: [ /* Purdue + VIT, per §3 Step 1 */ ],
};
```

`headline` is the resume summary's own opening phrase ("Marketing analytics leader and AI-native builder"), title-cased. `valueProp` and `bio` are first-person restatements of the SUMMARY paragraph with no fact not present in it. **Phone number is deliberately omitted** — it is on the resume but publishing a mobile number on a public site invites scraping, and email + LinkedIn already satisfy requirement 9. See Assumption 6.

### 2.2 `content/experience.ts` (replaces `content/caseStudies.ts`)

```ts
export type Metric = { value: string; label: string };

/** Professional Experience — the 4 roles that get full case-study treatment. */
export type Role = {
  id: string;              // "iyara-labs" — also the DOM id for the sticky-rail anchor
  sequence: number;        // 1 = most recent
  company: string;
  companyNote: string;     // the resume's own one-line description of the employer
  title: string;
  location: string;
  period: string;          // "May 2026 — Present"
  current: boolean;        // drives badge treatment; replaces industryTheme (see below)
  monogram: string;        // 2 chars, drives the SVG company mark: "IL" | "TM" | "BR" | "AA"
  primaryMetric: Metric;   // the single headline number
  stats: Metric[];         // 2–3 supporting numbers
  highlights: string[];    // the resume bullets, faithful
  tools: string[];         // tools named in that role's own bullets
};

/** Additional Experience — the 3 lighter roles. */
export type AdditionalRole = {
  id: string;
  sequence: number;
  company: string;
  title: string;
  location: string;
  period: string;
  highlights: string[];
};

export const experience: Role[];             // 4 entries
export const additionalExperience: AdditionalRole[];  // 3 entries
```

**Why two shapes and not one with optional fields.** The resume gives a company description and a headline metric for all four Professional Experience roles and for none of the three Additional ones. A single type with `companyNote?` and `primaryMetric?` would push a `?.`/fallback branch into every consumer, and would let a future editor "fill in" the missing fields — i.e. fabricate. Two types make the tier a compile-time fact. `AdditionalRole` is `Role` minus exactly the fields the resume does not supply.

**What replaces `industryTheme` (explorer-A risk 1 / explorer-B's tightest coupling): it is deleted, not renamed.** The old mechanic mapped a 3-value industry union to three Tailwind colour pairs in a local dict at `app/desktop/components/Projects.tsx:4-8`. Under real content that mechanic has no referent — Adarsh's four employers span an AI agency, a creative agency, a healthtech startup and an edge-AI infrastructure company; there is no taxonomy that makes "amber vs emerald vs indigo" mean anything, and a fourth arbitrary colour would have to be invented for the fourth card. Four differently-coloured cards is also the single most reliable visual tell of a template portfolio, which works directly against the "world-class, not stock-feeling" bar in requirement 6. The replacement encodes the one axis that *is* real and *is* what a recruiter looks for first — **recency/currency**:

- `current: true` → badge renders filled in `--d-accent` with a live dot: "Current role".
- `current: false` → badge renders as a neutral hairline outline showing `period`.

Differentiation between the four roles is then carried by **hierarchy instead of hue**: the sticky rail numbers them 01–04, the most recent dossier gets the largest type step and the full-bleed treatment, and each carries its own SVG monogram mark. One accent colour, four distinct cards. No `Record<string, string>` colour dict survives anywhere in the tree — grep for `accent[` after Step 11 must return zero hits.

**`gallery`, `headings`, `proofModule`, `engagement`, `learning`, `nextIteration` are all deleted, and `summary` is dropped from `Role` before it is ever populated.** An earlier draft of this type carried a `summary: string` ("1–2 sentences, what the role was") with no source — the resume gives a one-line *employer* description (`companyNote`) and per-role achievement bullets (`highlights`), never a role-summary sentence, so populating `summary` would mean writing new prose about Adarsh's job that isn't in the resume: exactly the fabrication requirement 3 forbids, and the same reasoning that killed `proofModule`/`learning`/`nextIteration` below. `companyNote` + `highlights` already carry what `summary` would have restated. `gallery` because no real imagery exists (§4). `headings` because per-entry section titles are a fake-persona affordance — real roles share the same section labels, which now live as literal strings in each tree's own component (this removes explorer-A risk 5 permanently). `proofModule`/`learning`/`nextIteration` because they invited invented reflection prose; `highlights` + `stats` carry the substance. `engagement` because `stakeholders`/`systems`/`measurement` have no honest resume source — `location`, `period` and `tools` cover what remains.

Content mapping, verbatim-faithful to `STAGE0-RESUME.md`:

| id | company / title | period | `primaryMetric` | `stats` |
|---|---|---|---|---|
| `iyara-labs` | Iyara Labs — Co-Founder, Dubai UAE | May 2026 — Present (`current: true`) | `100+` / "AI visibility markers tracked" | `10+` "Clients sourced from zero"; `Google, Perplexity, Claude, ChatGPT` "AI engines audited for brand citation" |
| `trussme` | Trussme — Lifecycle Marketing Manager, Dubai UAE | December 2025 — April 2026 | `30%+` / "Email MQL lift" | `25%+` "SQL lift"; `36 of 42` "Campaigns at 40%+ open, 6% CTR"; `10+` "B2B/B2C clients, 4-person team" |
| `bloodrec` | Bloodrec — Founding Marketing Manager (Product & Growth), New York USA | December 2024 — December 2025 | `2,885+` / "Active users in week one, organic" | `<50%` "Homepage bounce rate"; `20%` "Lift in report uploads from A/B tests"; `First` "Marketing hire at founding" |
| `armada-ai` | Armada AI (Microsoft-backed) — Product Marketing Manager, Seattle USA | May 2024 — September 2024 | `25%` / "Conversion lift from site content & UX overhaul" | `150` "Leads driven to key landing pages"; `20%` "Conversion lift from enterprise video"; `$250M+` "Raised by this M12-backed Series B" |

`additionalExperience`: `jaguar-land-rover` (Marketing Strategy Intern, Bengaluru India, June 2023 — August 2023), `helmer-scientific` (Content Marketing Consultant, Indiana USA, December 2022 — May 2023), `eride-ngo` (Marketing Manager — Product, Growth, Content, Lifecycle; Bengaluru India, January 2018 — June 2022) — each with its 3 resume bullets as `highlights`. The ERIDE parenthetical ("evenings alongside undergraduate studies through mid-2021, then remote through 2022") is appended to its `period` string so the long date range is not misread as full-time.

`tools` per role are drawn only from tools that role's own bullets name — e.g. Iyara Labs: `["Claude Code", "21st.dev", "Google Stitch", "Figma", "Blender", "Midjourney", "Nano Banana", "Perplexity", "ChatGPT", "Claude", "ElevenLabs"]`; Trussme: `["Lovable", "Zapier", "Cloudflare Workers", "Nano Banana", "Higgsfield AI", "Canva", "ElevenLabs", "HighlightAI"]`; Bloodrec: `["GA4"]`; Armada AI: `["Amplitude", "HubSpot", "Adobe Analytics", "Tableau", "GA4", "Google Tag Manager", "SQL"]`.

### 2.3 `content/skills.ts`

```ts
export type SkillCategoryId =
  | "analysis"
  | "ai-tooling"
  | "content"
  | "stakeholder"
  | "certifications";

export type SkillCategory = {
  id: SkillCategoryId;   // NEW — keys the per-category SVG icon in each tree
  category: string;
  note?: string;         // NEW — the resume's own qualifier line, where it has one
  items: string[];
};

export const skills: SkillCategory[];  // 5 entries, exactly the resume's own groups
```

The shape is otherwise unchanged, so `app/mobile/components/Skills.tsx` and `app/desktop/components/Skills.tsx` (both fully generic per explorer-A) keep compiling through Step 4 with zero edits — the `id`/`note` fields are additive and only get consumed in Steps 13 and 19.

`id` exists because a union of five literals lets each tree's `icons.tsx` expose a `Record<SkillCategoryId, ReactNode>` that the compiler proves exhaustive — adding a sixth category later is a build error, not a silently-missing icon. `note` carries two strong resume lines currently discarded entirely: on `ai-tooling`, "used to independently design, build, and ship production websites and internal tools without an engineering team"; on `certifications`, "10+ licenses and certifications". Categories and items are copied 1:1 from the resume's SKILLS AND CERTIFICATIONS block — no additions, no reordering within a group.

---

## 3. Numbered implementation steps

Lanes: Steps 1–5 are sequential and blocking. Steps 6–15 (desktop) and 16–20 (mobile) touch disjoint files and may run in parallel after Step 5. Steps 21–23 are sequential and last.

> Standing rule for every step: no fact, number, company name, tool name, date or claim may appear in any file that is not present in `STAGE0-RESUME.md`. If a design slot wants a fact that does not exist, the slot changes — the content does not.

---

### Lane 1 — Content model (sequential, blocking)

#### Step 1 — Rewrite `content/profile.ts`

- **Files:** `content/profile.ts` (rewrite in place).
- **Change:** Replace the `Profile` type with §2.1's, add the `Credential` type, and replace the exported object with §2.1's values. `education` gets two entries: Purdue University / "Top-10 Marketing program in the US — QS" / "M.S. in Marketing Analytics and Management (STEM)" / "July 2022 — December 2023" / leadership "Krannert Graduate Marketing Association (KGMA); International Student Ambassador"; and VIT University / "NIRF Top-20 Engineering University in India" / "B.Tech in Computer Science and Engineering" / "July 2017 — June 2021" / leadership "Founder, Board Gamers Club; organized a 15-country, 300+-participant International Collegiate Chess Tournament on Lichess".
- **APIs/types:** plain TS. No imports.
- **Outcome:** Real identity data; `valueProp` available so no consumer needs to string-split `bio`. Note: `npx tsc --noEmit` will now fail in `app/desktop/components/Hero.tsx` (still splits `bio`) until Step 4 fixes it — expected, not a regression. This step has no standalone verify gate; Step 4's consolidated gate covers it (its dead-string grep includes this file's old values).

#### Step 2 — Create `content/experience.ts`, delete `content/caseStudies.ts`

- **Files:** create `content/experience.ts`; `git rm`/delete `content/caseStudies.ts`.
- **Change:** Write the `Metric`, `Role`, `AdditionalRole` types and the `experience` (4) and `additionalExperience` (3) consts exactly as specified in §2.2, populated from the mapping table. `highlights` are the resume bullets — light editing for tense/flow is allowed, invention is not; every number and proper noun must survive unchanged. Then delete `content/caseStudies.ts` entirely. Deleting it (rather than just leaving it unused) is what makes `tsc` list every consumer that still references the fake model: running `npx tsc --noEmit` right after this step should show **exactly two** module-not-found errors, `app/desktop/components/Projects.tsx` and `app/mobile/components/Projects.tsx` — a third means an unexpected consumer explorer-A's blast-radius map missed, worth investigating before Step 4. This is informal, non-blocking guidance for whoever executes the step, not a formal gate; Step 4's consolidated verify is the actual pass/fail check.
- **APIs/types:** plain TS.
- **Outcome:** Real two-tier experience content. This step has no standalone verify gate — see above and Step 4.

#### Step 3 — Rewrite `content/skills.ts`

- **Files:** `content/skills.ts` (rewrite in place).
- **Change:** Replace with §2.3's types and the five resume categories: Analysis & Reporting (`analysis`), AI Tooling & Automation (`ai-tooling`, with `note`), Content & Execution (`content`), Stakeholder & Coordination (`stakeholder`), Certifications (`certifications`, with `note`). Items are written as an **explicit literal array per category, hand-copied from the resume** — not a runtime `.split(",")` on the resume's comma-separated prose, which would wrongly fracture entries that contain their own internal commas (e.g. "Microsoft Office (PowerPoint, Excel, Word)" would split into three bogus items instead of one). `analysis`'s array is exactly: `["HubSpot", "Google Analytics 4 (GA4)", "Google Tag Manager", "Tableau Desktop", "SQL", "Adobe Analytics", "Microsoft Office (PowerPoint, Excel, Word)", "Google Sheets", "Competitor Analysis", "Campaign Reporting"]` — ten items, one array entry per tool/skill, parenthetical detail kept intact inside its own entry. The other four categories follow the same one-entry-per-skill rule. Certifications become discrete items: "HubSpot — Email", "HubSpot — Digital Marketing", "HubSpot — Social Media Marketing", "HubSpot — Content Marketing", "Microsoft — Generative AI", "Microsoft — Project Management", "Microsoft — Data Analysis", "Aha! Product Management", "Sprout Social", "Anthropic — AI Fluency".
- **Outcome:** Real skills, 5 groups, icon-keyed. Both Skills components are field-generic (§2.3) so this introduces no compile errors of its own. Category count is now 5, which visually breaks desktop's hardcoded `grid-cols-4` — not a compile error, so it's not a gate here; Step 13 replaces that grid entirely. This step has no standalone verify gate; Step 4's consolidated gate is the pass/fail check.

#### Step 4 — Mechanical compile-fix pass across all consumers (no design work)

This step exists to return the tree to green before either visual lane starts. Do the ugliest correct thing; Steps 6–20 replace this code anyway. **Do not redesign here.**

- **Files (the full explorer-A blast radius, 13 consumers):**
  - `app/desktop/components/Hero.tsx` — delete the `const valueProp = profile.bio.split(". ")[0] + "."` line (`:7`) and its comment; use `profile.valueProp`.
  - `app/desktop/components/Projects.tsx` — change the import to `{ experience } from "@/content/experience"`; delete the `accent` dict (`:4-8`) and the `${accent[study.industryTheme]}` interpolation (`:40`); delete the `<Image>` block using `study.gallery[0]` (`:28-36`); map `study.contextLabel`→`study.period`, `study.client`→`study.company`, `study.keyDecisions`→`study.highlights`; keep `title`/`summary`/`primaryMetric` as-is.
  - `app/mobile/components/Projects.tsx` — change the import to `{ experience }`; delete the `const [cover, ...restGallery] = cs.gallery` destructure (`:18`) and the `{cover && ...}` `<Image>` block (`:25-35`); delete the `cs.headings.problem` + `cs.problem` paragraph entirely (`problem` does not exist on the new `Role` type and has no replacement field — the "what was the problem" narrative beat is dropped, not relabeled, consistent with `learning`/`nextIteration` being dropped for the same reason two lines below); replace the remaining `cs.headings.decisions`/`cs.headings.results` reads with the two literal strings "Highlights" and "Tools"; replace `cs.built`/`cs.keyDecisions` with `cs.highlights` under "Highlights" and add `cs.tools` as a chip row under "Tools"; delete the `proofModule` card (`:113-128`), the `learning`/`nextIteration` block (`:130-141`), the `restGallery` block (`:143-159`), and change the footer line (`:161-163`) from `cs.engagement.timeline · cs.engagement.audience` to `cs.period · cs.location`. Keep `cs.stats` (still `Metric[]`), the `<details>`, the chevron SVG and every class name untouched. Also scan this file for any hardcoded prose strings left over from the fake freelance-agency persona (e.g. generic "campaign"/"client" phrasing in headings or captions) that reference deleted fields only indirectly and so won't surface in the Step 4 grep gate — rewrite anything found to be role-agnostic.
  - The other 10 consumers (`Hero`/`About`/`Contact`/`Footer`/`Nav` in both trees, `Skills` in both) need **no edit** — explorer-A confirmed they only read `profile.name|headline|bio|location|email|linkedin` and generic `skills` fields, all of which survive.
- **APIs/types:** none new.
- **Outcome:** Real content renders end to end, ugly but correct, on both trees.
- **Verify (consolidated gate for Steps 1–4 — this is the pass/fail check for all four):** `npx tsc --noEmit` exits 0. `npm run build` exits 0. `grep -rn "caseStudies\|industryTheme\|gallery\|proofModule\|contextLabel\|keyDecisions\|nextIteration\|engagement\." app/ content/` returns **zero hits**. `grep -rn "accent\[" app/` returns zero hits. `grep -rn "hello@adarshs\.com\|linkedin\.com/in/adarshshankar\|Abu Dhabi\|B2B Lifecycle" content/` returns zero hits (Step 1's fabricated-identity strings).

#### Step 5 — Purge fake assets

- **Files:** delete `public/assets/work/` (all 9 PNGs, ~14MB), `public/assets/hero/campaign-command-room.png` (2.0MB), `public/assets/video/dashboard.mp4` (28.7MB), `public/assets/video/dashboard-poster.jpg`, `public/icons.svg` (unused template boilerplate per explorers B and C). Keep `public/assets/headshot/adarsh-shankar.png` (real photo). `public/favicon.svg` is replaced in Step 7, not deleted here.
- **Change:** After deleting the video, `app/desktop/components/Hero.tsx` still references `/assets/hero/campaign-command-room.png` (`:16`) and `/assets/video/dashboard.mp4` (`:55-56`) — remove the `<Image fill>` background block and the `<video>` element in the same commit so nothing 404s. The right-hand grid column is left empty until Step 9 fills it.
- **Outcome:** ~45MB of fabricated media gone; no dangling asset paths.
- **Verify:** `grep -rn "assets/work\|campaign-command-room\|dashboard.mp4\|dashboard-poster\|icons.svg" app/ content/ public/` returns zero. `npm run build` exits 0. **`/desktop` cannot be loaded directly** — `proxy.ts`'s matcher (`/((?!_next/static|_next/image|api|.*\..*).*)`) matches any extensionless path, so `/desktop` itself gets rewritten to `/desktop/desktop` and 404s. Instead: set the `device=desktop` cookie (`lib/device.ts` `COOKIE_NAME`) and load `/`, then confirm no 404s in the network panel.
- **⚠ STOP AND ASK before deleting `dashboard.mp4`:** explorer-B describes it as thematically tied to the fake persona, but Adarsh's Trussme bullet does say "Built a live client dashboard." If that MP4 is a real screen recording of that dashboard, it should be kept and re-introduced in Step 11 as a Trussme-dossier media block with `preload="none"` + poster-first lazy load. Default if unanswered: delete (28.7MB unverifiable media on a job-application site is the worse failure).

---

### Lane 2 — Desktop world-class redesign (Steps 6–15; parallel with Lane 3)

#### Step 6 — Real design token system in `app/desktop/styles.css`

- **Files:** `app/desktop/styles.css` (currently 35 lines, one token).
- **Change:** Replace the body of the file. Keep `@import "tailwindcss"` first. Under `[data-device="desktop"]` define:
  - **Colour:** `--d-ink:#0c0f16`, `--d-ink-2:#3d4453`, `--d-ink-3:#6b7280`, `--d-surface:#ffffff`, `--d-surface-2:#f6f7f9`, `--d-surface-ink:#0c0f16` (dark bands), `--d-border:#e4e6eb`, `--d-border-strong:#c9cdd6`, `--d-accent:#2b3a67`, `--d-accent-bright:#4f46e5`, `--d-accent-soft:#eef0f7`, `--d-metric:#b25b2e`.
    Rationale: `--d-accent` is retuned from indigo-600 to **mobile's existing `--accent:#2b3a67` navy** so the two trees are recognisably one brand (they share no code, so a shared *value* is the only available anchor). `--d-accent-bright` is not a stylistic extra — it exists because navy fails contrast on the one dark ground the tree still has: `#2b3a67` on `--d-surface-ink:#0c0f16` computes to a **1.74:1** WCAG contrast ratio (relative luminance 0.045 vs 0.005), well under even the 3:1 non-text minimum. The old indigo `#4f46e5` on the same ground computes to **3.05:1** — enough for the UI-component/large-text threshold, not for body copy — so `--d-accent-bright` is scoped strictly to Contact's hover/focus indicators (the only place on the page a navy accent sits on a dark ground); everywhere else on `--d-surface`/`--d-surface-2`, navy alone clears 8.7:1 and is used directly. `--d-metric` is a single warm tone reserved exclusively for numerals, so metrics read as a distinct information class rather than decoration. `--d-border`/`--d-surface-2` are lifted from mobile's `--border`/`--surface` for the same reason.
  - **Type scale (fluid, fixes explorer-B gap 7):** `--d-step--1: clamp(.8125rem,.78rem+.16vw,.875rem)` through `--d-step-6: clamp(3rem,2.1rem+4.2vw,5.25rem)` (8 steps). Every desktop font size becomes `text-[length:var(--d-step-N)]` or a `.d-*` class — no bare `text-5xl` survives.
  - **Spacing scale:** `--d-space-1:.25rem` … `--d-space-9:8rem`, plus `--d-section-y: clamp(5rem,3rem+6vw,9rem)` for section rhythm and `--d-gutter: clamp(1.5rem,1rem+2.5vw,4rem)`.
  - **Radius:** `--d-r-sm:6px`, `--d-r-md:12px`, `--d-r-lg:20px`, `--d-r-full:999px`.
  - **Shadow:** `--d-shadow-1`, `--d-shadow-2`, `--d-shadow-3` (layered, low-alpha, tinted with the navy rather than pure black).
  - **Motion:** `--d-dur-fast:140ms`, `--d-dur:260ms`, `--d-dur-slow:520ms`, `--d-ease:cubic-bezier(.2,.7,.3,1)`, `--d-ease-out:cubic-bezier(.16,1,.3,1)`.
  - **Container:** replace the fixed `max-width:1200px` with `.d-container { width: min(100% - 2*var(--d-gutter), var(--d-measure)); margin-inline:auto; }` and `--d-measure: clamp(64rem, 88vw, 82rem)`.
  - **`prefers-reduced-motion` guard** mirroring mobile's (desktop currently has none — an a11y gap neither explorer's brief covered but which this redesign creates the need for): collapse all `transition-duration`/`animation-duration` under `[data-device="desktop"] *` to `0.01ms !important`.
  - Delete `.d-card-overlay` / `.d-card-image` — the hover-reveal is removed in Step 11.
  - **`.d-rule` and `.d-node` (pure CSS, replacing an earlier SVG-component draft):** a section divider and a list bullet are both flat geometry with no path data worth hand-authoring as SVG. `.d-rule` is a `<hr className="d-rule" />` styled as a 1px `--d-border` line with a centred 6px `--d-accent` diamond via a `::after` pseudo-element (`content:""; position:absolute; left:50%; ... transform:translate(-50%,-50%) rotate(45deg)`). `.d-node` is applied to each `highlights` `<li>` and replaces `list-style` with `list-style:none` plus a `::before` diamond (`content:""; width:6px; height:6px; background:var(--d-accent); transform:rotate(45deg)`), positioned via `padding-left`/absolute offset. This is the simpler path the critique flagged: two static shapes don't need a component or a `viewBox`, just a CSS rule each. Zero new files, zero React props to keep in sync with icon sizing.
- **Outcome:** A real design system; every later desktop step consumes tokens, never raw values.
- **Verify:** `npm run build` exits 0; set the `device=desktop` cookie and load `/` (not `/desktop` directly — see Step 5's note on the proxy matcher) and confirm it still renders (unstyled-looking is fine at this point). Confirm `.d-container` reflows smoothly by resizing 1280 → 1920 in Playwright.

#### Step 7 — Desktop SVG icon module + brand marks

- **Files:** create `app/desktop/components/icons.tsx`; replace `public/favicon.svg`.
- **Change:** A single module exporting small function components, all `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth={2}`, `strokeLinecap="round"`, `strokeLinejoin="round"`, `aria-hidden="true"`, sized via a `size` prop — i.e. **the exact Feather-style language explorer-C documented in `app/mobile/components/Nav.tsx:68-80`**, deliberately matched rather than diverged from, so the two trees look like one designer's work while sharing no code. Full inventory in §4. Also export `Monogram({ text })` (the company mark). Replace `public/favicon.svg` with the AS monogram mark on the navy ground. (The rule divider and the highlights bullet are pure CSS, not SVG components — see Step 6's `.d-rule`/`.d-node` classes.)
- **APIs/types:** `import type { SkillCategoryId } from "@/content/skills"`; export `const skillIcons: Record<SkillCategoryId, (p:{size?:number}) => ReactNode>` so the compiler proves the map exhaustive.
- **Outcome:** Closes explorer-B gap 1 (zero SVG in the whole desktop tree).
- **Verify:** `npx tsc --noEmit` exits 0. Render each icon in isolation at 24px and confirm stroke weight matches mobile's nav icons side by side.

#### Step 8 — Desktop `Nav.tsx`: wordmark + scroll-tracked active section

- **Files:** `app/desktop/components/Nav.tsx` (becomes a client component).
- **Change:** Add `"use client"`. Replace the plain text name (`:14-19`) with `<a href="#hero"><Monogram text="AS" />` + the name `</a>` in tokenised type — `#hero` is the id Step 9 gives the Hero `<section>` (mirroring mobile's own `#hero`), so the wordmark has a real, working scroll target instead of linking nowhere. Keep the 4 local links, relabel the "Projects" link's visible text to "Experience" (matching the Step 11 heading text) while its `href` stays `#projects` (the anchor id itself is not renamed — see Step 11's section-id note), and add an **active-section indicator**: an `IntersectionObserver` over `#about`, `#projects`, `#skills`, `#contact` (same technique mobile uses, independently implemented — no shared code, requirement 8 intact) driving a `::after` underline that slides between links via a `--d-nav-x`/`--d-nav-w` custom-property pair set on the `<ul>`. `rootMargin: "-40% 0px -55% 0px"`. Header gets a scroll-state change: transparent-on-hero → `--d-surface` + `--d-shadow-1` past 80px, via the same observer on a hero sentinel. CTA keeps `href="#contact"`, gains the `ArrowUpRight` icon.
- **APIs/types:** `useEffect`, `useState`, `useRef`, `IntersectionObserver`.
- **Outcome:** Desktop-native orientation affordance; explorer-B gap 3 (only one interaction pattern) begins to close.
- **Verify:** Playwright at 1440x900: scroll to each section, assert the matching nav link has `aria-current="true"` and the indicator moved. Confirm the observer is disconnected on unmount (return cleanup).

#### Step 9 — Desktop `Hero.tsx`: designed composition replacing deleted stock media

- **Files:** `app/desktop/components/Hero.tsx`.
- **Change:** Rebuild. The `<section>` keeps/gains `id="hero"` (mirroring mobile's `#hero`; this is also Step 8's Nav wordmark target). Left column: eyebrow (`profile.availability` + `profile.location` separated by a hairline dot), `h1` = `profile.name` at `--d-step-6`, `profile.headline` at `--d-step-3` in `--d-accent`, `profile.valueProp` at `--d-step-1` in `--d-ink-2` capped at ~54ch, then `profile.eligibility` as three hairline chips, then two CTAs (primary `#projects` "See the work", secondary `mailto:` with the `Mail` icon). Right column: the `SignalGrid` decorative SVG (§4) behind a stack of four "at a glance" metric plates pulled from `experience[i].primaryMetric` — i.e. the hero's visual interest comes from *real numbers plus custom vector work*, not stock photography (which is what the deleted 2.0MB PNG was). Background: `--d-surface` with a large low-opacity `SignalGrid` bleeding off the right edge; **no dark band** — this is the change that stops Hero and Contact being visually identical (explorer-B gap 4): Hero is light/expansive, Contact stays dark/compressed. Hero stays a plain server component — no client-side motion is added here (see below).
  - **Cursor-aware spotlight — cut, not built.** An earlier draft of this step added a rAF-throttled `pointermove` handler writing `--d-px`/`--d-py` custom properties to drive a highlight in `SignalGrid`. Dropped: (1) it's a JS-driven effect, and neither the Step 6 CSS `prefers-reduced-motion` override nor any CSS `transition-duration` change has any effect on a handler that writes custom properties directly via JS — the plan's original reduced-motion claim for this feature didn't actually hold, and correctly gating it would mean threading a `matchMedia("(prefers-reduced-motion: reduce)")` check into the handler itself, real complexity for a decorative flourish; (2) it would force Hero to `"use client"` for a single hover effect with no requirement asking for it. Static `SignalGrid` art plus real metric numbers already delivers the "custom vector work, not stock photography" bar requirement 6 sets.
- **APIs/types:** `profile.valueProp`, `profile.eligibility`, `profile.availability`, `experience[].primaryMetric`.
- **Outcome:** No stock imagery, no 30MB of media, distinct top-of-funnel identity, real metrics above the fold.
- **Verify:** Playwright at 1440x900 and 1920x1080: `profile.name`, `headline`, `valueProp` and all four primary metric values are visible without scrolling at 1440x900. No network request for any `/assets/hero/*` or `/assets/video/*`.

#### Step 10 — Desktop `About.tsx`: bio + education + eligibility

- **Files:** `app/desktop/components/About.tsx`.
- **Change:** Replace the fixed `grid-cols-[280px_1fr]` (explorer-B gap 7) with `grid-cols-[minmax(220px,26%)_1fr]` and fluid gap. Left: the headshot, now via **static import** (`import headshot from "@/public/assets/headshot/adarsh-shankar.png"`) so Next derives intrinsic dimensions and `placeholder="blur"` works, with `sizes="26vw"`, framed by a token radius and a thin `--d-accent` offset rule. Right: eyebrow + `profile.bio` at `--d-step-2`, then a two-item `education` list (school / qualifier / degree / period / leadership) as a bordered timeline using `.d-rule` between entries. Section closes with the `eligibility` chips if not already used in Hero — pick one location, not both.
- **APIs/types:** `next/image` static import, `profile.education`, `profile.bio`.
- **Outcome:** About stops being a lone paragraph; Purdue/VIT credentials become scannable.
- **Verify:** Both education entries render with school, degree and period. `npm run build` shows the headshot processed by the image optimizer. Blur placeholder visible on a throttled load.

#### Step 11 — Desktop experience explorer: `Projects.tsx` → sticky rail + stacked dossiers

This is the centrepiece and the answer to explorer-B gap 5 (rich content never surfaced) and gap 3 (one interaction pattern).

- **Files:** delete `app/desktop/components/Projects.tsx`; create `app/desktop/components/Experience.tsx` and `app/desktop/components/ExperienceRail.tsx` (`"use client"`).
- **Change:** Section keeps `id="projects"` (see the note at the end of this step) with the heading text "Experience". Layout: `grid-template-columns: minmax(200px, 22%) 1fr` with `gap: var(--d-space-8)`.
  - **Left rail (`ExperienceRail`, sticky, `position:sticky; top:6rem`):** one row per `Role`, showing `01`–`04`, `company`, `period`, and — on the active row — the `primaryMetric.value`. Active row is driven by an `IntersectionObserver` over each dossier's `id`. Rows are `<a href="#{id}">` so they work with JS off and are keyboard-reachable. Active row gets a `--d-accent` left rule that animates its height in via `--d-dur`/`--d-ease-out`. A sticky rail is the specific pattern chosen because it is *impossible* on mobile — it is what makes this tree desktop-native rather than a widened phone layout.
  - **Right column — one `RoleDossier` per role, all four fully expanded, nothing hidden behind hover:** `Monogram` mark + `company` + `title` on one line; `current`/`period` badge (the `industryTheme` replacement from §2.2); `companyNote` as a muted italic line directly under the title; a **metric band** — `primaryMetric` at `--d-step-5` in `--d-metric` alongside the `stats` as a `<dl>` on an auto-fit grid (`repeat(auto-fit, minmax(11rem, 1fr))` — no hardcoded column count, killing explorer-A risk 4 at this site); `highlights` as a `.d-node`-bulleted list (CSS diamond bullet, Step 6) instead of `list-disc`; `tools` as hairline chips under a "Tools" label. Role 1 (`current`) gets `--d-step-5` heading and a `--d-accent-soft` ground; roles 2–4 use `--d-step-4` on `--d-surface` — hierarchy by scale, not hue.
  - **Scroll-driven reveal — cut, not built.** An earlier draft animated each dossier in via CSS `animation-timeline: view()` gated behind `@supports`. Dropped: progress-based scroll timelines don't respect `animation-duration` the way time-based animations do, so the Step 6 `animation-duration: 0.01ms !important` reduced-motion override — the pattern used everywhere else in both trees — would **not** reliably neutralise it; correctly killing it needs an explicit `animation-timeline: none` override under the reduced-motion query, which is a second, different mechanism to maintain for a purely decorative entrance effect. Dossiers render fully visible on scroll into view, same as every other section on the page — no requirement asks for a reveal animation, and dropping it removes both an a11y risk and a browser-support fork (Firefox/older Safari don't support `animation-timeline: view()` at all, per §5 risk 12).
  - **The hover-reveal overlay is deleted** — it hid `keyDecisions` behind a pointer gesture, which is the opposite of recruiter-scannable and unreachable by Cmd-F. `.d-card-overlay`/`.d-card-image` go with it (already removed in Step 6).
- **APIs/types:** `experience` from `@/content/experience`; `IntersectionObserver`; `Monogram` from `icons.tsx`; `.d-node` CSS class (Step 6) for the highlights bullet.
- **Outcome:** Every `Role` field is rendered somewhere. Role → impact → skills is readable top-to-bottom in one scroll with zero interaction required (requirement 9), while the sticky rail gives the desktop-native jump/orientation affordance (requirement 6).
- **Verify:** Playwright at 1440x900: all 4 companies, all 4 `primaryMetric` values and every `highlights` string are present in the DOM *without any interaction*; scrolling to each dossier updates the rail's `aria-current`; `grep -rn "grid-cols-3" app/desktop/` returns zero.
- **Section id note:** `id="projects"` is kept on both trees. Renaming it to `#experience` on desktop only would break a `/#projects` link shared from a phone and opened on a laptop, since `proxy.ts` rewrites the path but the fragment is resolved client-side. The heading *text* says "Experience"; the anchor stays `projects`.
- **Skipped alternative:** a `role="tablist"` explorer showing one role at a time. Rejected — it hides 3 of 4 roles on first paint and puts them out of Cmd-F reach, which fails requirement 9 for a page whose entire job is being skimmed by a recruiter.

#### Step 12 — Desktop `AdditionalExperience.tsx` (the lighter tier)

- **Files:** create `app/desktop/components/AdditionalExperience.tsx`; render it inside the same `#projects` section (Step 15) so Step 8's nav observer needs no new entry.
- **Change:** A visually lighter treatment that is unmistakably tier-2: a full-width hairline-separated three-row list, each row `grid-template-columns: 1fr 2fr` with company/title/location/period left and `highlights` right at `--d-step--1` in `--d-ink-3`. Preceded by a `.d-rule` divider and a small "Earlier" label. No metric band, no monogram, no reveal animation.
- **APIs/types:** `additionalExperience` from `@/content/experience`.
- **Outcome:** Resume's two-tier structure visible at a glance (requirement 2).
- **Verify:** All three companies (Jaguar Land Rover, Helmer Scientific, ERIDE NGO) render with all 9 bullets. Visual weight is obviously below the four dossiers.

#### Step 13 — Desktop `Skills.tsx`

- **Files:** `app/desktop/components/Skills.tsx`.
- **Change:** Replace `grid-cols-4` (explorer-A risk 4) with `grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr))` so 5 categories lay out correctly at any width. Each category card: the `skillIcons[group.id]` SVG at 24px in a `--d-accent-soft` tile, `group.category` heading, `group.note` (when present) as a muted line, then `items` as hairline-bordered chips instead of the current bare `<ul><li>` bullet dump (explorer-B gap 6). Certifications card spans two columns (`grid-column: span 2`) given its item count.
- **APIs/types:** `skills`, `SkillCategoryId`, `skillIcons`.
- **Outcome:** Skills reads as a designed section, not a resume paste.
- **Verify:** All 5 categories render with an icon; both `note` strings appear; no layout gap at 1280, 1440 and 1920.

#### Step 14 — Desktop `Contact.tsx` + `Footer.tsx`

- **Files:** `app/desktop/components/Contact.tsx`, `app/desktop/components/Footer.tsx`.
- **Change:** Contact stays the dark `--d-surface-ink` band (now the *only* dark band on the page, so it reads as a deliberate terminal beat rather than a Hero echo — explorer-B gap 4). Replace the fake-persona copy "Let's talk about your next campaign." with a line built directly from resume-sourced fields rather than new invented copy: `"Open to ${profile.headline} roles — ${profile.availability.toLowerCase()}."` (renders "Open to Marketing Analytics Leader & AI-Native Builder roles — immediate notice.") plus `profile.location`. Every word in the sentence traces to a `profile.*` field already sourced from the resume — none of it is freehand marketing copy. CTAs become two large bordered rows (email with the `Mail` icon and the literal address; LinkedIn with the `Linkedin` icon and `ArrowUpRight`), each with a hairline that draws in on hover using `--d-dur-fast`. Add the `Envelope` decorative mark at low opacity behind the block. Footer: add the `Monogram`, `profile.location`, a LinkedIn link, and the "Built with Next.js — designed and coded by Adarsh" line; keep the copyright + mailto (explorer-B gap 10).
- **Outcome:** Contact is visually distinct from Hero; contact info is unmissable (requirement 9).
- **Verify:** `mailto:adarsh.shankar712@gmail.com` and `https://www.linkedin.com/in/adarshbuilds/` both present and correct. No "campaign" copy anywhere: `grep -rni "campaign" app/desktop/` returns only legitimate content-derived hits.

#### Step 15 — Desktop `page.tsx` assembly + section rhythm

- **Files:** `app/desktop/page.tsx`, `app/desktop/layout.tsx`.
- **Change:** Order `Nav / Hero / About / Experience (+ AdditionalExperience inside #projects) / Skills / Contact / Footer`. Apply `--d-section-y` rhythm and alternate `--d-surface` / `--d-surface-2` grounds so section boundaries read without needing borders; place a `.d-rule` divider between About and Experience. Add `scroll-behavior:smooth` and `scroll-margin-top:5rem` on `[data-device="desktop"] section` (matching mobile's `scroll-margin-top` pattern) so the sticky header does not cover anchor targets. `layout.tsx` unchanged except confirming `DeviceSync expected="desktop"` still wraps.
- **Outcome:** Coherent page; device-split untouched.
- **Verify:** `npm run build` exits 0. Every anchor (`#about`, `#projects`, `#skills`, `#contact`) lands below the sticky header. `/` still redirects and `proxy.ts` still resolves — see Step 23.

---

### Lane 3 — Mobile polish (Steps 16–20; parallel with Lane 2; NOT a rebuild)

Untouchable in this lane: `app/mobile/components/Nav.tsx` (except icon extraction in Step 16), the `#hero`/`#about`/`#projects`/`#skills`/`#contact` ids, `.snap-row`/`.snap-card`, the `<details>`/`.chevron` mechanics, and the `prefers-reduced-motion` block in `app/mobile/styles.css`.

#### Step 16 — Mobile `icons.tsx`

- **Files:** create `app/mobile/components/icons.tsx`; edit `app/mobile/components/Nav.tsx` only to import its 5 existing paths from there.
- **Change:** Move the 5 nav `d` strings and the chevron path into the module verbatim (byte-identical paths — this is a refactor, not a redesign), and add the new mobile-only icons from §4. The module is a **deliberate near-duplicate** of `app/desktop/components/icons.tsx`: STAGE0 requirement 8 forbids shared component code between trees, so the path data is duplicated by design. Add a comment in both files saying so, to stop a future reviewer "DRYing" them into a shared module and breaking the architecture.
- **Outcome:** Icons available to the other mobile components without touching nav behaviour.
- **Verify:** Playwright at 375x812: tab bar renders 5 icons, IntersectionObserver highlighting still works on scroll through all five sections. This is the regression gate for requirement 11.

#### Step 17 — Mobile `Hero.tsx` + `About.tsx` polish

- **Files:** `app/mobile/components/Hero.tsx`, `app/mobile/components/About.tsx`.
- **Change:** Hero — keep the 96px circular headshot (switch to static import for `placeholder="blur"`), add `profile.valueProp` under the headline at 15px, and add an availability chip (a 6px `--accent` dot + `profile.availability`). Keep both CTAs at `min-h-[44px]`, add the `Mail` and `ArrowUpRight` icons inside them. About — add `profile.education` as two compact entries and `profile.eligibility` as small chips below the bio. Section ids and the `pt-14 pb-10` rhythm unchanged.
- **Outcome:** Real content wired; parity of information with desktop; zero architectural change.
- **Verify:** 375x812 screenshot; nothing overflows horizontally; `#hero` and `#about` ids intact.

#### Step 18 — Mobile `Projects.tsx`: real `Role` wiring + monogram covers + tier 2

- **Files:** `app/mobile/components/Projects.tsx`.
- **Change:** Building on Step 4's mechanical fix:
  - **The `gallery[0]` question, answered:** the `gallery` field no longer exists, so the "only `gallery[0]` renders as an image, the other two are text-only captions" asymmetry explorer-C flagged is **resolved by removal, not by rendering more images**. There is no photography or screenshot of Adarsh's real employment, so any image in that slot would be fabricated (requirement 3). The 4:3 cover slot is kept — the layout depends on it for card rhythm in the snap carousel — and filled with a `<Monogram>` SVG tile on a `--surface` ground: company initials, `companyNote` as a small caption, and the `current`/`period` badge. Cheaper than 1.6MB PNGs, honest, and consistent with desktop's dossier marks.
  - Card body: `period` eyebrow (replacing `contextLabel`), `company` + `title`, `summary`, the `primaryMetric` stat pill (unchanged markup), the 2-col `stats` `<dl>` (unchanged markup, now 2–3 entries).
  - `<details>` body: literal section headings ("Highlights" → `highlights`; "Tools" → `tools` chips; footer line → `period · location`) — matching the labels Step 4 already introduced. No "problem" section: dropped in Step 4 along with the field. The `headings` object dependency (explorer-A risk 5) is gone for good.
  - **Additional experience:** append a second `<details>` after the carousel, still inside `<section id="projects">`, summary "Earlier experience (3 roles)", body = the three `AdditionalRole` entries as compact blocks. Inside the same section id so the nav observer keeps working untouched.
- **APIs/types:** `experience`, `additionalExperience`, `Monogram`.
- **Outcome:** Full real content on mobile at unchanged information density; architecture preserved.
- **Verify:** 375x812: swipe/scroll the carousel across all 4 cards and confirm `scroll-snap-align` still centres each; open and close every `<details>` and confirm the chevron still rotates; confirm the Work tab still highlights when the section is in view.

#### Step 19 — Mobile `Skills.tsx`

- **Files:** `app/mobile/components/Skills.tsx`.
- **Change:** Add the `skillIcons[group.id]` icon at 16px beside each `<h3>`; render `group.note` as a small muted line when present. Keep the flex-wrap pill list exactly as-is — it already handles 5 categories and long item lists correctly.
- **Verify:** All 5 categories with icons; no horizontal overflow at 320px width.

#### Step 20 — Mobile `Contact.tsx` + `Footer.tsx`

- **Files:** `app/mobile/components/Contact.tsx`, `app/mobile/components/Footer.tsx`.
- **Change:** Replace the two raw `&rarr;` HTML entities (explorer-C's note) with the `ArrowUpRight` SVG at 16px, and add the `Mail` / `Linkedin` icon at the row start. Add `profile.availability` to the intro line. Footer: add a small `Monogram`; keep the dynamic year, name and location.
- **Verify:** Both rows still ≥52px tall and full-width tappable; `mailto:` and LinkedIn hrefs correct.

---

### Lane 4 — Finish (sequential)

#### Step 21 — Metadata + favicon (no OG-image route)

- **Files:** `app/layout.tsx`; `public/favicon.svg` (from Step 7).
- **Change:** Update `metadata` to a real title/description (`"Adarsh Shankar — Marketing Analytics Leader & AI-Native Builder"`, description from `profile.valueProp`), add `metadataBase`, `openGraph`, `twitter: { card: "summary_large_image" }`, and `icons: { icon: "/favicon.svg" }`. **No `app/opengraph-image.tsx` route is added** — `proxy.ts`'s extensionless-path matcher would rewrite `/opengraph-image` the same way it would `/desktop` (see Step 5), so a dynamic OG route needs an explicit matcher exclusion to work at all, and that's scope this plan doesn't need to take on for a route no requirement asks for. `openGraph.images` instead points at the existing optimized headshot (Step 22) — a real photo beats a generated card that risks 404ing.
- **Outcome:** Shareable link preview using a real asset, zero new routes, zero interaction with `proxy.ts`.
- **Verify:** `npm run build` exits 0. Confirm the `og:image` meta tag resolves to a real, loading image.

#### Step 22 — Asset optimization

- **Files:** `public/assets/headshot/adarsh-shankar.png`; both `About.tsx`/`Hero.tsx` image call sites.
- **Change:** The three large media items explorer-B flagged are handled as: hero PNG **deleted** (Step 5), `dashboard.mp4` **deleted** (Step 5, pending the Step 5 STOP), headshot **kept as-is, no manual downscale step.** Rely entirely on static imports (Steps 10, 17) so `next/image` derives correct `width`/`height` and a blur placeholder from the 1.75MB source, with `sizes="26vw"` on desktop and `sizes="96px"` on mobile, and `priority` only on mobile Hero's above-the-fold instance. `next/image` already transcodes to AVIF/WebP at request time and it's the `sizes` attribute, not the source file's resolution, that governs bytes actually delivered to a browser — a manual `sharp` pre-downscale (originally planned as a one-off scratchpad script) buys nothing a correct `sizes` doesn't already buy, while adding a Windows-ARM-`sharp` failure mode and a build-time script to maintain for zero requirement gain. Simpler path, same delivered bytes: skip the pre-downscale entirely.
- **Verify:** In Playwright's network panel at 1440x900, the headshot response is < 120KB and served as AVIF or WebP. Total page transfer for `/desktop` under 1MB.

#### Step 23 — Full verification (see §6)

---

## 4. SVG / asset plan

### 4.1 SVGs created

All hand-authored, `viewBox="0 0 24 24"` unless noted, `fill="none"`, `stroke="currentColor"`, `strokeWidth={2}`, round caps and joins, `aria-hidden="true"` — matching the existing mobile `Nav.tsx` icon language exactly (explorer-C's cross-device anchor). Decorative marks are the deliberate exception and are noted as such.

| Name | Tree(s) | Where used | Notes |
|---|---|---|---|
| `Monogram` | both | Desktop role dossiers + Nav + Footer; mobile card covers + Footer | Not 24-grid. Two initials in a rounded-square with a `--d-accent` hairline and a small corner notch. `text` prop; the wordmark instance uses "AS". Also becomes `public/favicon.svg`. |
| `SkillIcon: analysis` | both | Skills category "Analysis & Reporting" | Bar-chart-with-baseline |
| `SkillIcon: ai-tooling` | both | Skills "AI Tooling & Automation" | Four-point sparkle over a chip outline |
| `SkillIcon: content` | both | Skills "Content & Execution" | Pen nib over a rule |
| `SkillIcon: stakeholder` | both | Skills "Stakeholder & Coordination" | Two overlapping person outlines |
| `SkillIcon: certifications` | both | Skills "Certifications" | Rosette + ribbon |
| `Mail` | both | Hero CTA, Contact row, Footer | Reuses mobile Nav's existing envelope path verbatim |
| `Linkedin` | both | Contact row, Footer | 24-grid outline "in" mark |
| `ArrowUpRight` | both | All external/CTA links; **replaces mobile Contact's raw `&rarr;` entity** | |
| `ChevronDown` | mobile | `<details>` summary | Existing path `m6 9 6 6 6-6` moved into `icons.tsx` byte-identical |
| `SignalGrid` | desktop | Hero background, low opacity | Large decorative composition: a light dot-grid with two rising polylines and a highlighted node — an abstract analytics motif that references the work without claiming to be a screenshot of it. Static — no cursor-tracking (cut in Step 9). Decorative, `aria-hidden`. |
| `EnvelopeMark` | desktop | Contact band background, low opacity | Oversized open-envelope outline; the element that stops Contact reading as a Hero repeat |

**Not SVG, pure CSS instead:** the section divider and the `highlights` bullet were an earlier draft's `SectionRule`/`Node` SVG components — both are flat geometry (a hairline, a 6px diamond) with no path data worth hand-authoring, so they ship as `.d-rule`/`.d-node` CSS classes defined in Step 6 instead of components in `icons.tsx`. Simpler path, same visual result, one fewer file to keep in sync with the icon set.

Both `icons.tsx` modules are near-identical by necessity (requirement 8). Each carries a header comment: `// Duplicated by design — app/mobile and app/desktop share no component code. Do not extract.`

### 4.2 What happens to every existing asset

| Asset | Size | Action | Reason |
|---|---|---|---|
| `public/assets/work/{logistics,healthcare,ai}/*.png` (9 files) | ~14MB | **Delete** (Step 5) | Depict invented client work for the fake personas. No real substitute exists; generating one would be fabrication (requirement 3). The card slot they filled is replaced by the `Monogram` tile on both trees. |
| `public/assets/hero/campaign-command-room.png` | 2.0MB | **Delete** (Step 5) | Fake-persona stock hero. Replaced by the `SignalGrid` SVG + real metric plates. |
| `public/assets/video/dashboard.mp4` | 28.7MB | **Delete** (Step 5, ⚠ confirm first) | Unverifiable persona media at 28.7MB. If Adarsh confirms it is a real recording of the Trussme client dashboard, keep it and re-introduce it in the Trussme dossier with `preload="none"`, `playsInline`, `muted`, a poster, and no autoplay. |
| `public/assets/video/dashboard-poster.jpg` | 199KB | **Delete** (Step 5) | Follows the video. |
| `public/assets/headshot/adarsh-shankar.png` | 1.75MB | **Keep, optimize** (Step 22) | The only real asset. No manual downscale — static-import so `next/image` derives intrinsic sizing + blur placeholder and transcodes to AVIF/WebP at request time; correct `sizes` per tree governs delivered bytes. |
| `public/icons.svg` | 5KB | **Delete** (Step 5) | Unreferenced template boilerplate (bluesky/discord/github/x), confirmed unused by both explorers. |
| `public/favicon.svg` | 9.5KB | **Replace** (Step 7) | Generic purple template blob. Replaced by the `Monogram` mark. |

Net: roughly 45MB of fabricated media deleted, one real photo optimized, everything else vector and generated. No OG-image route is added — see Step 21.

**Flagged gap, not solved (STAGE0 requirement 10):** there is still no resume PDF in `public/`. No step in this plan creates one, links to one, or renders a "Download CV" affordance. Every CTA on both trees points to `mailto:` or LinkedIn. When Adarsh provides a PDF, the follow-up is a one-line addition to Hero and Contact — deliberately out of scope here.

**Also noted, not touched:** `src/` (legacy Vite prototype), `dist/` (stale prebuilt bundle), `index.html`, `vite.config.js`, `server/` — explorer-A confirmed nothing under `app/**` imports them and `tsconfig.json` does not type-check them. They will still show up in any `caseStudies` grep, which is why the Step 4 verify greps are scoped to `app/ content/`. Deleting them is real cleanup but is a separate concern from this plan and is left alone.

---

## 5. Risk handling

| # | Risk (source) | Handling | Step |
|---|---|---|---|
| 1 | `accent[study.industryTheme]` colour dict — the tightest coupling in the repo (explorer-A risk 1, explorer-B) | `industryTheme` **deleted from the type**, not renamed. The dict is deleted with it. Replaced by the semantic `current: boolean` badge plus hierarchy-by-scale; justification in §2.2. Verified by `grep -rn "accent\[" app/` returning zero. | 2, 4, 11 |
| 2 | Unguarded `study.gallery[0].path` — a runtime throw, not just a type error (explorer-A risk 2) | `gallery` **deleted from the type**, so the expression cannot survive compilation. Both cover slots get the `Monogram` SVG instead. No guard needed because no array access remains. | 2, 4, 11, 18 |
| 3 | `profile.bio.split(". ")[0] + "."` string-shape hack (explorer-A risk 3, explorer-B gap 11) | Dedicated `profile.valueProp` field; the split line is deleted. | 1, 4, 9 |
| 4 | Hardcoded `grid-cols-3` (3 case studies → 4 roles) and `grid-cols-4` (4 skill groups → 5) (explorer-A risk 4) | Both replaced with intrinsically sized layouts: Experience becomes a two-column rail+stack (no card grid at all); Skills becomes `repeat(auto-fit, minmax(17rem,1fr))`; the stats `<dl>` inside each dossier uses `auto-fit` too. Verified by grepping `grid-cols-3`/`grid-cols-4` out of `app/desktop/`. | 11, 13 |
| 5 | Mobile `Projects.tsx` depends on 4 `headings.*` keys as section titles (explorer-A risk 5) | `headings` deleted from the type; each tree owns its section labels as literals. | 2, 4, 18 |
| 6 | Dangling `/assets/work/**` image paths 404-ing after content changes (explorer-A risk 6) | Assets and their referencing fields are deleted in the same pass, and Step 5's grep gate proves no path survives before the build is declared green. | 5 |
| 7 | Only `gallery[0]` ever renders as an image on mobile; the other two are text-only (explorer-C) | Resolved by removing the concept — no fabricated imagery replaces it. Rationale in Step 18. | 18 |
| 8 | Breaking mobile's verified IntersectionObserver nav / scroll-snap / `<details>` behaviour (requirement 11) | Lane 3 touches no nav logic (Step 16 is a byte-identical path extraction), no section ids, no `.snap-*` or `details` CSS. The additional-experience block is nested *inside* `<section id="projects">` specifically so the observer's target set is unchanged. Step 16 and Step 18 both carry an explicit Playwright regression check at 375x812. | 16, 18, 23 |
| 9 | Breaking the device-split (`proxy.ts`, cookie resolution) (requirement 11) | No step touches `proxy.ts`, `lib/device.ts`, `lib/device-sync.tsx`, `app/page.tsx`, or either `layout.tsx`'s `DeviceSync`/`data-device` wrapper. Step 6 adds tokens *under* the existing `[data-device="desktop"]` selector, preserving scoping. Verified by a cookie-forcing check in §6. | 6, 15, 23 |
| 10 | Accidentally sharing component code between trees (requirement 8) | Two separate `icons.tsx` modules with an explicit "do not extract" comment; the sticky-rail observer and the mobile nav observer are independent implementations of the same idea. Verified by grepping each tree for imports of the other. | 7, 16, 23 |
| 11 | Fabrication creeping in to fill a design slot | Standing rule at the top of §3: the slot changes, not the content. Concretely applied at the cover-image slot (Step 18), the hero right column (Step 9) and the OG image (Step 21). Final review pass in §6 diffs every rendered number against `STAGE0-RESUME.md`. | all |
| 12 | `animation-timeline: view()` unsupported in Firefox / older Safari | Moot — the scroll-driven reveal that would have used it is cut (Step 11); nothing in the plan uses `animation-timeline` any more. | 11 |
| 13 | Desktop has no `prefers-reduced-motion` guard while mobile does | Step 6 adds the mirror of mobile's guard, matching the `[data-device] *` pattern mobile already uses. The two motion features that would have needed a *second*, JS-aware neutralisation mechanism (the cursor spotlight, the scroll-timeline reveal) are both cut rather than built (Steps 9, 11), so the CSS-only guard is sufficient for everything the desktop tree actually ships. | 6 |
| 14 | Desktop `Nav.tsx`, `Hero.tsx`, `ExperienceRail.tsx` becoming client components (bundle/SSR) | Accepted. Each is small and leaf-level; content stays server-rendered in the parent sections. `Experience.tsx` itself stays a server component — only the rail is client. Verified via `npm run build`'s route output showing no unexpected First Load JS growth. | 8, 9, 11 |
| 15 | `sharp` downscale failing on Windows ARM | Moot — Step 22 no longer runs a manual `sharp` downscale at all (simplified: `next/image`'s request-time transcoding plus a correct `sizes` attribute already governs delivered bytes, so the pre-downscale bought nothing). Nothing to fail. | 22 |
| 16 | Cross-device anchor mismatch if desktop renames `#projects` | Explicitly not renamed; heading text changes, id does not. Rationale in Step 11. | 11 |
| 17 | Stale `src/`, `dist/`, `index.html` polluting greps and confusing a later reader (explorer-A note 7) | Accepted with reason: dead weight, not blast radius (nothing under `app/**` imports them, `tsconfig` excludes them). All verification greps are scoped to `app/ content/ public/`. Cleanup is a separate task. | — |
| 18 | Phone number on the resume but not on the site | Accepted with reason: deliberate omission (scrape risk); email + LinkedIn satisfy requirement 9. Recorded as Assumption 6 for Adarsh to overrule. | — |

---

## 6. Verification plan

Run in this order. Any failure stops the lane rather than being patched around.

**A. Per-step gates.** Every step above carries its own "verify" line; those are the inner loop.

**B. Build gates (requirement 12).**
1. `npx tsc --noEmit` — must exit 0. (Baseline confirmed 0 before this plan; there is no pre-existing noise to excuse a failure.)
2. `npm run build` — must exit 0 with no warnings about missing images or unresolved imports.

**C. Dead-reference gates.** All scoped to `app/ content/ public/`; each must return **zero** hits:
- `caseStudies|industryTheme|proofModule|contextLabel|keyDecisions|nextIteration|engagement\.|gallery`
- `accent\[`
- `assets/work|campaign-command-room|dashboard\.mp4|dashboard-poster|icons\.svg`
- `hello@adarshs\.com|linkedin\.com/in/adarshshankar|Abu Dhabi|B2B Lifecycle`
- `grid-cols-3|grid-cols-4` in `app/desktop/`
- `bio\.split`
- Cross-tree imports: `grep -rn "app/desktop" app/mobile/` and `grep -rn "app/mobile" app/desktop/` (requirement 8).

**D. Playwright — mobile, 375×812.**
1. Force mobile: set the `device=mobile` cookie (`lib/device.ts` `COOKIE_NAME`) or use a mobile UA, then load `/`. Assert the rendered tree is mobile (`[data-device="mobile"]` present) — this is the device-split regression check for requirement 11.
2. Assert real content: "Adarsh Shankar", "Dubai, UAE", `adarsh.shankar712@gmail.com`, `https://www.linkedin.com/in/adarshbuilds/`, and all four companies (Iyara Labs, Trussme, Bloodrec, Armada AI) plus all three additional (Jaguar Land Rover, Helmer Scientific, ERIDE NGO) are in the DOM.
3. **Nav regression:** scroll to each of the 5 sections and assert the corresponding tab gets `aria-current="true"`.
4. **Carousel regression:** scroll the `.snap-row` horizontally through all 4 cards and assert each snaps to centre.
5. **Disclosure regression:** open and close every `<details>` including the new "Earlier experience" one; assert the chevron rotates.
6. Emulate `prefers-reduced-motion: reduce` and confirm no transition runs.
7. Screenshot for visual review.

**E. Playwright — desktop, 1440×900 and 1920×1080.**
1. Force desktop cookie, load `/`, assert `[data-device="desktop"]`.
2. Same real-content assertions as D2, plus: all four `primaryMetric` values, all `highlights` strings, both education entries, all 5 skill categories, both skill `note` lines.
3. **Scannability check — the one that matters for requirement 9:** assert every `highlights` string is present in the DOM *with no interaction performed*. Nothing hides behind hover.
4. Sticky-rail check: scroll to each dossier and assert the rail's active row changes.
5. Nav check: scroll to each section and assert the active indicator tracks it.
6. Resize sweep 1280 → 1440 → 1920 and assert no horizontal scrollbar and no layout break in the auto-fit grids.
7. Network panel: zero requests to `/assets/work/*`, `/assets/hero/*`, `/assets/video/*`; headshot served as AVIF/WebP under 120KB; total transfer under 1MB.
8. Emulate `prefers-reduced-motion: reduce`; confirm nav's active-indicator slide and Contact's hover hairline are inert (the scroll reveal and cursor spotlight were cut in planning — Steps 9, 11 — so there's nothing further to check there).
9. Screenshots at both widths for visual review.

**F. Fabrication audit (requirement 3) — manual, mandatory, last.** Open `content/profile.ts`, `content/experience.ts`, `content/skills.ts` side by side with `STAGE0-RESUME.md` and confirm every number, company name, tool name, date, and claim appears in the resume. Then do the same for any literal copy written directly into components (section headings, Contact copy, the OG image, `app/layout.tsx` metadata). Anything that cannot be pointed at a resume line gets cut.

**G. Not done, stated explicitly.** No resume PDF exists and none was created (requirement 10). If `dashboard.mp4` was deleted without Adarsh confirming, say so in the handoff.

---

## 7. Assumptions

Carried forward from STAGE0.md, updated with what the explorer reports resolved.

1. **"Merge everything" = integrate/finish, not `git merge`.** Unchanged and now reinforced: the whole rebuild is uncommitted on `updates`, so there is nothing to merge. No commit, push, branch or merge happens in this plan — git actions wait for explicit instruction.
2. **Location reads "Dubai, UAE"** per the resume, not "Abu Dhabi" per the global CLAUDE.md. Unchanged. The old "Abu Dhabi" string is in the Step 4 grep gate.
3. **Two-tier structure is mirrored in the content model.** Now resolved into a concrete decision: **two separate types**, `Role` and `AdditionalRole` (§2.2), rather than one type with optional fields — because the resume supplies `companyNote` and a headline metric for exactly the four Professional Experience roles and none of the three Additional ones, and optional fields would invite someone to fill the gap by inventing.
4. **World-class via custom SVG + typographic craft, no new npm packages.** Confirmed viable and simplified further during critique: no OG-image route and no manual `sharp` downscale are added at all (§4.2, Step 21, Step 22) — asset delivery relies entirely on `next/image`'s built-in transcoding. Dependency count after this plan is unchanged.
5. **Resume PDF gap stays flagged, not solved.** Unchanged. No fabricated PDF, no fake download link, no "Download CV" button anywhere.
6. **NEW — the phone number on the resume is deliberately omitted from the site.** `+971 52 520 3533` is real and available, but publishing a mobile number on a public page invites scraping; email and LinkedIn cover requirement 9. Trivially reversible by adding one `phone` field to `Profile` if Adarsh wants it.
7. **NEW — `dashboard.mp4` is treated as fake-persona media and deleted, pending confirmation.** Step 5 carries a STOP-and-ask. If it is a real recording of the Trussme dashboard it should be kept and re-introduced with poster-first lazy loading in the Trussme dossier.
8. **NEW — `src/`, `dist/`, `index.html` and `vite.config.js` are left untouched.** They are a dead pre-Next.js Vite prototype and a stale bundle; nothing under `app/**` imports them and `tsconfig.json` does not type-check them. Cleaning them up is a separate task, not smuggled into this one.
9. **NEW — `id="projects"` is retained on both trees** even though the desktop heading now reads "Experience", so a link shared from one device still resolves on the other (`proxy.ts` rewrites the path; the fragment is client-side).
10. **NEW — desktop's `--d-accent` is retuned from indigo `#4f46e5` to mobile's navy `#2b3a67`.** The trees share no code, so a shared token *value* is the only mechanism available to make them read as one brand. Indigo survives as `--d-accent-bright`, scoped specifically to Contact's dark-ground hover/focus states, where navy measures 1.74:1 contrast against `--d-surface-ink` (fails) versus indigo's 3.05:1 (passes the non-text/large-text threshold) — see Step 6 for the full computation.

---

## 8. Critique log (Stage 3 adjudication)

A fresh-context critic reviewed this plan against the Stage 0 requirements before delivery. Findings below, each with the adjudicated disposition. The planner-side model (session orchestrator) adjudicated directly rather than spawning a separate agent.

| # | Finding | Disposition |
|---|---|---|
| A1 | Steps 5 and 6's "Verify" lines told the reader to load `/desktop` directly, which 404s under `proxy.ts`'s matcher (any extensionless path gets rewritten, including `/desktop` itself → `/desktop/desktop`). | **Merged.** Both now instruct setting the `device` cookie and loading `/`. |
| A2 | Step 21 added `app/opengraph-image.tsx`, which hits the same proxy-matcher bug as `/desktop` — an extensionless dynamic route with no matcher exclusion. | **Merged.** No OG-image route is added at all; `openGraph.images` points at the existing headshot instead. |
| B1 | An earlier draft's `Role.summary: string` field had no resume source — populating it would mean inventing role-summary prose. | **Merged.** Field dropped from the type; `companyNote` + `highlights` cover what it would have carried. |
| B2/B3 | The Iyara Labs `stats` row listed "1 partnership" as a bare numeric metric, inflating a single named fact (DaitaFix) into a fake stat. | **Merged.** Replaced with a literal enumeration of the four AI engines audited; the partnership fact stays in `highlights`, not restated as a count. |
| B4 | Step 14's Contact copy included an invented line ("Open to marketing analytics and growth roles.") not sourced from any field. | **Merged.** Rebuilt as a template of `profile.headline`/`profile.availability`/`profile.location` — every word traces to a sourced field. |
| B5 | Step 3's skills instructions said to comma-split resume prose, which corrupts entries with internal commas (e.g. "Microsoft Office (PowerPoint, Excel, Word)"). | **Merged.** Replaced with an explicit hand-written literal array per category, with a worked example. |
| C1/C5 | Mobile `Projects.tsx`'s Step 4/18 treatment left `cs.problem`/`headings.problem` referenced with no replacement, and didn't account for stale fake-persona prose the grep gate wouldn't catch. | **Merged.** `problem` dropped entirely (no replacement field, consistent with `learning`/`nextIteration`); Step 4 now also instructs a manual scan for leftover persona phrasing. |
| C2/F1 | Step 22 ran a manual `sharp` pre-downscale of the headshot; `next/image`'s request-time transcoding plus correct `sizes` already governs delivered bytes, making the manual step redundant and introducing a Windows-ARM `sharp` failure mode for no gain. | **Merged.** Manual downscale removed; §4.2's asset-table row and §5 risk 15 updated to match. |
| C3/C4 | Nav's wordmark linked nowhere meaningful, and the "Projects" nav link's visible text didn't match Step 11's "Experience" heading. | **Merged.** Wordmark now links to `#hero` (Hero gains that id); nav label changed to "Experience" while `href="#projects"` is explicitly kept (see the Step 11 section-id note). |
| D1 | The cursor-aware spotlight (Step 9) was JS-driven (`pointermove` writing custom properties), so neither the CSS reduced-motion override nor a `transition-duration` change would neutralise it — the plan's original a11y claim for this feature didn't hold. | **Merged, feature cut rather than patched.** Removes the need for a `matchMedia` guard entirely; Hero stays a server component. |
| D2 | The CSS `animation-timeline: view()` scroll reveal (Step 11) is a progress-based timeline that doesn't respect `animation-duration`, so the Step 6 `0.01ms !important` reduced-motion override wouldn't reliably neutralise it either. | **Merged, feature cut rather than patched.** Removes a Firefox/older-Safari support fork along with the a11y gap; §5 risk 12 marked moot. |
| D3 | The dual-accent token system (`--d-accent` / `--d-accent-bright`) had no stated contrast target — "navy lacks contrast against ink" was asserted, not measured. | **Merged, justified rather than dropped.** Computed actual WCAG contrast ratios: navy-on-`--d-surface-ink` is 1.74:1 (fails), indigo-on-same is 3.05:1 (passes the non-text threshold). `--d-accent-bright` is now explicitly scoped to Contact's dark-ground hover/focus states only, with the numbers in Step 6 and Assumption 10. Dropping the second token outright was considered and rejected: the dark Contact band still needs a hover accent that clears contrast, and navy doesn't. |
| E | Critic flagged several small factual slips (a line-count reference, one hex digit, a field-count claim, a garbled consumer-enumeration list). | **Not independently re-verifiable.** This adjudication pass ran after a context compaction that lost the critic's original finding text verbatim — only a paraphrased summary survived. Re-reading the current plan against explorer-A's `CaseStudy`/`Role` field enumerations and the hex values in Step 6 found no discrepancy I could confirm as wrong, but I cannot rule out that a since-superseded slip was already overwritten by other edits, or that I'm simply not seeing what the critic saw. Flagging this honestly rather than guessing at a fix for wording I can't recover — if a specific line/digit/count still looks off on read-through, point it out and I'll fix it directly. |
| F2 | (Combines D1+D2 above — critic's simpler-path framing for both motion features.) | See D1/D2. |
| F3 | `SectionRule` and `Node` were SVG React components for flat geometry (a hairline, a 6px diamond) that don't need path data or a component wrapper. | **Merged.** Converted to `.d-rule`/`.d-node` CSS classes defined in Step 6; removed from the `icons.tsx` inventory and every step that referenced them. |
| F4 | Steps 1, 2, 3 each carried their own formal "Verify" gate, but none of them is a real checkpoint — Step 4's consolidated `tsc`/`build`/grep pass is the only thing that actually proves the tree is correct, and running `tsc` three extra times mid-lane adds no signal. | **Merged.** Steps 1–3's formal gates removed; Step 2's "expect exactly two module-not-found errors" diagnostic kept as non-blocking guidance in its own Change description (genuinely useful for whoever executes the step); Step 1's fabricated-identity-string grep folded into Step 4's now-consolidated gate. | 
| F5 | (Same as A2 above — critic's simpler-path framing for the OG-image route.) | See A2. |

**Not re-run:** explorers and the critic ran once each, per the ultraplan protocol ("one critic pass only — no critique loops"). No requirement changed during adjudication, so a second critic pass was not warranted.
