# Explorer A — content system map (content/*.ts shapes + full consumer blast radius)

## 1. Current TypeScript shapes (verbatim)

**`content/profile.ts`** (repo root: `content/profile.ts:1-17`)
```ts
export type Profile = {
  name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
};

export const profile: Profile = {
  name: "Adarsh Shankar",
  headline: "B2B Lifecycle Email & Marketing Systems",
  bio: "I build full-funnel B2B email campaigns — strategy, copy, design, landing pages, dashboards, and reporting that shows what moved. Based in Abu Dhabi, working with teams across logistics, healthcare, and AI infrastructure.",
  location: "Abu Dhabi",
  email: "hello@adarshs.com",
  linkedin: "https://linkedin.com/in/adarshshankar",
};
```
Single object, no array — all consumers do `profile.<field>` directly (no map/filter).

**`content/caseStudies.ts`** (`content/caseStudies.ts:1-327`) — 3 entries, ids `gcc-logistics-pipeline`, `healthcare-activation-flow`, `ai-enterprise-demand-gen`.
```ts
export type CaseStudyStat = { value: string; label: string };
export type CaseStudyGalleryItem = { path: string; alt: string; caption: string; eyebrow: string; type: string };
export type CaseStudyProofModule = { label: string; title: string; body: string; points: string[] };

export type CaseStudy = {
  id: string;
  sequence: number;
  client: string;
  contextLabel: string;
  industryTheme: "logistics" | "healthcare" | "ai";
  title: string;
  summary: string;
  engagement: { timeline: string; audience: string; stakeholders: string; systems: string; measurement: string };
  headings: { problem: string; decisions: string; results: string; gallery: string };
  primaryMetric: { value: string; label: string };
  stats: CaseStudyStat[];
  problem: string;
  built: string[];
  keyDecisions: string[];
  learning: string;
  nextIteration: string;
  proofModule: CaseStudyProofModule;
  gallery: CaseStudyGalleryItem[];
};
export const caseStudies: CaseStudy[] = [ /* 3 items, each with 3 gallery images, 4 stats, images under /assets/work/{logistics,healthcare,ai}/*.png */ ];
```
Note: `industryTheme` is a closed 3-value union directly tied to the 3 fake industries — any 4th/different entry breaks the type unless the union is widened.

**`content/skills.ts`** (`content/skills.ts:1-44`) — 4 category groups (Lifecycle & campaign strategy / Tools & platforms / Measurement & reporting / Cross-functional).
```ts
export type SkillCategory = { category: string; items: string[] };
export const skills: SkillCategory[] = [ /* 4 groups */ ];
```

## 2. Every consumer, ranked by blast radius (most fields used → least)

**`app/mobile/components/Projects.tsx:1-173`** (heaviest `CaseStudy` consumer)
- `caseStudies` sorted by `.sequence`
- `[cover, ...restGallery] = cs.gallery` — destructures gallery array, uses `cover.path`/`cover.alt` as the card's cover `<Image>`, and `restGallery.map(item => item.path/eyebrow/caption)` inside a `<details>` "gallery" list — **assumes `gallery.length >= 1`, indexes into array structurally**
- `cs.contextLabel`, `cs.title`, `cs.summary`
- `cs.primaryMetric.{value,label}`
- `cs.stats.map(stat => stat.label/value)` — 2-col `<dl>` grid (works for any count, not hardcoded to 4)
- `cs.headings.problem` / `cs.headings.decisions` / `cs.headings.results` / `cs.headings.gallery` used as section headers inside the disclosure
- `cs.problem`, `cs.built` (list), `cs.keyDecisions` (list)
- `cs.proofModule.{label,title,body,points}` rendered as a highlighted card
- `cs.learning`, `cs.nextIteration`
- `cs.engagement.timeline`, `cs.engagement.audience`

**`app/desktop/components/Projects.tsx:1-81`**
- `caseStudies` (unsorted, plain `.map`)
- `study.gallery[0].path` / `study.gallery[0].alt` — **hard-indexes `gallery[0]` with no guard; will throw at runtime if `gallery` is empty or renamed**
- `study.industryTheme` used as a lookup key into a local `accent: Record<string,string>` map hardcoded to `{logistics, healthcare, ai}` (`Projects.tsx:4-8`) — **this is the tightest coupling in the codebase: the union type AND this local map both must change together, or `accent[study.industryTheme]` silently returns `undefined`** (no `industryTheme` in TS → compile error is the safety net here)
- `study.contextLabel`, `study.title`, `study.summary`
- `study.primaryMetric.{value,label}`, `study.client`
- `study.keyDecisions.map(...)` — hover-reveal overlay
- Layout: `grid-cols-3` (`Projects.tsx:21`) is hardcoded to exactly 3 cards — cosmetic-only coupling to current array length of 3, not type-level, but will look uneven if the real content has 4 "Professional Experience" roles as STAGE0.md specifies.

**`app/mobile/components/Skills.tsx:1-29`** and **`app/desktop/components/Skills.tsx:1-32`**
- Both: `skills.map(group => group.category, group.items.map(item => item))` — flat, fully generic, no hardcoded count.
- Desktop only: `grid-cols-4` (`Skills.tsx:13`) hardcoded to match current 4 categories — same cosmetic-only coupling as Projects grid.

**`app/mobile/components/Hero.tsx:1-45`**
- `profile.name`, `profile.headline`, `profile.location`, `profile.email` (in `mailto:`), `profile.linkedin` (`href` + external link). Also hardcodes `/assets/headshot/adarsh-shankar.png` (not from content).

**`app/desktop/components/Hero.tsx:1-66`**
- `profile.location`, `profile.name`, `profile.headline`
- `const valueProp = profile.bio.split(". ")[0] + "."` (`Hero.tsx:7`) — **derives a "value prop" string by splitting `bio` on `". "` and taking the first sentence; this is a silent structural assumption that `bio` is prose with a period-space-delimited first sentence** — if the new bio has no `". "` or is very short, `valueProp` degrades ungracefully (whole bio, or empty).
- `profile.email` in `mailto:`. Hardcodes `/assets/hero/campaign-command-room.png` and `/assets/video/dashboard.mp4` (not from content, but thematically tied to the fake "B2B campaign" persona — will look wrong under real content even though code won't break).

**`app/mobile/components/About.tsx:1-14`** / **`app/desktop/components/About.tsx:1-28`**
- Both: `profile.bio` only. Desktop also hardcodes `/assets/headshot/adarsh-shankar.png` + `profile.name` as image alt.

**`app/mobile/components/Contact.tsx:1-33`** / **`app/desktop/components/Contact.tsx:1-34`**
- Both: `profile.location`, `profile.email` (`mailto:`), `profile.linkedin`.

**`app/mobile/components/Footer.tsx:1-11`**
- `profile.name`, `profile.location`.

**`app/desktop/components/Footer.tsx:1-16`**
- `profile.name`, `profile.email`.

**`app/desktop/components/Nav.tsx:1-41`**
- `profile.name` only (as home-link label). Nav link labels/hrefs are a local hardcoded array, not from content.

**`app/mobile/components/Nav.tsx:1-89`** — does **not** import any `content/*` module (grep confirmed zero matches). Its 5 tab items (Home/About/Work/Skills/Contact) and inline SVG icon paths are hardcoded locally, independent of content shape.

## 3. Places that assume something about current shape (breakage risk beyond types)

Ranked by risk:

1. **`app/desktop/components/Projects.tsx:4-8,40`** — `industryTheme` union used as an object-key lookup (`accent[study.industryTheme]`) for badge color. If the reshape removes `industryTheme` or changes its values, this is the one spot where TS will hard-fail compilation (good — forces the update) but the *design intent* (color-code cards by category) needs a replacement decision, not just a rename.
2. **`app/desktop/components/Projects.tsx:30`** and **`app/mobile/components/Projects.tsx:18`** — both hard-depend on `gallery` being a non-empty array of `{path, alt}` for the cover image; desktop does an unguarded `gallery[0]` (would throw/500 at build+render if `gallery` is empty, not just a type error, since `study.gallery[0].path` accesses `.path` on `undefined` if array is empty — TS won't catch this at runtime for an empty-but-typed-nonempty array).
3. **`app/desktop/components/Hero.tsx:7`** — `profile.bio.split(". ")[0]` string-shape assumption on `bio` prose (not type-level, purely runtime/content-quality risk).
4. **`app/desktop/components/Projects.tsx:21`** (`grid-cols-3`) and **`app/desktop/components/Skills.tsx:13`** (`grid-cols-4`) — cosmetic hardcoded column counts matching current array lengths (3 case studies, 4 skill categories). STAGE0.md's plan (4 "Professional Experience" roles + 3 lighter "Additional Experience" roles, and a skills regroup) means these grids will very likely need re-tuning regardless of type changes — not a compile break, a visual one.
5. **`app/mobile/components/Projects.tsx:66-165`** relies on 4 distinct narrative `headings` keys (`problem`, `decisions`, `results`, `gallery`) as section titles inside one `<details>` — any reshape that drops/renames one of the 4 sections needs a matching heading source or a hardcoded fallback string.
6. Image paths `/assets/work/{logistics,healthcare,ai}/*.png` referenced inside `content/caseStudies.ts` gallery entries correspond to real files under `public/assets/work/{ai,healthcare,logistics}/` (confirmed present) — these are fake-persona assets that will need replacing/removing alongside the content, otherwise `next/image` will 404 for any dangling old paths.
7. Not a real risk but noted: `industryTheme` and `CaseStudyGalleryItem`/`CaseStudyProofModule`/`CaseStudyStat` names also appear in **`dist/assets/index-CAKcezKR.js`** (stale prebuilt bundle) and **`src/data/caseStudies.js`** / **`src/main.js`** (a separate legacy pre-Next.js Vite prototype under `src/`, with its own `App.jsx`, `Contact.jsx`, `Work.jsx`, etc.). Confirmed via grep that nothing under `app/**` imports from `src/` or `dist/`, and `tsconfig.json`'s `include` (`**/*.ts`, `**/*.tsx`) doesn't type-check `src/*.jsx`/`.js` files, so these are dead weight, not blast radius — safe to ignore for the reshape, but worth flagging as leftover cruft since they show up in any `caseStudies`-shape grep.

## 4. Alternate type export locations

None. Grep across the repo (excluding `content/*.ts` themselves) for `export type Profile|CaseStudy|SkillCategory|export interface Profile|CaseStudy` returns matches only inside `content/profile.ts` and `content/caseStudies.ts`/`content/skills.ts` — **no shared `types.ts` exists**. Every consuming component imports the type implicitly via the value import (`import { profile } from "@/content/profile"` etc.) and relies on inference; none of the 13 consumer files import `Profile`, `CaseStudy`, or `SkillCategory` as an explicit type name. So reshaping only requires updating `content/*.ts` plus the 13 consumer `.tsx` files listed above — no third location to touch.

## Additional context found (not requested but directly relevant)
An existing plan already exists at `agent_docs/plans/2026-08-22-real-content-worldclass-redesign/STAGE0.md` (dated today) with a frozen requirements list and a `STAGE0-RESUME.md` containing the real resume text as source of truth — it already specifies real employers (Iyara Labs, Trussme, Bloodrec, Armada AI as full case studies; JLR, Helmer Scientific, ERIDE NGO as lighter "Additional Experience"), real location "Dubai, UAE", real email `adarsh.shankar712@gmail.com`, real LinkedIn `https://www.linkedin.com/in/adarshbuilds/`, and explicitly calls out that no resume PDF exists in `public/`.
