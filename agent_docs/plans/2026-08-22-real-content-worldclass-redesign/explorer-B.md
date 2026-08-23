# Explorer B — desktop tree deep read

Confirmed: zero SVG/icon usage anywhere in `app/desktop/**`, and `public/icons.svg` (generic placeholder social icons: bluesky, discord, github, x, documentation, "social") isn't referenced by desktop at all.

## 1. `app/desktop/layout.tsx` (16 lines) and `app/desktop/page.tsx` (23 lines)
- `layout.tsx`: wraps children in `<DeviceSync expected="desktop" />` + `<div data-device="desktop">`, imports `./styles.css`. No metadata, no fonts loaded here.
- `page.tsx`: flat, no wrapper divs — `<Nav /><main><Hero /><About /><Projects /><Skills /><Contact /></main><Footer />`. Straight linear single-column page, no side-nav, no sticky progress indicator, no multi-panel/split-screen desktop-native pattern.

## 2. `app/desktop/styles.css` (35 lines, full file)
Only 3 custom rules beyond Tailwind import:
- `--d-accent: #4f46e5` (indigo-600) — the ONLY custom design token in the whole tree. No spacing scale, no typography scale, no secondary accent, no dark-mode tokens.
- `.d-container` = `max-width:1200px; margin-inline:auto; padding-inline:2.5rem` — single fixed container width used everywhere, no fluid/responsive breakpoint tiers beyond this.
- `.d-card-overlay`/`.d-card-image` — the entire hover system: overlay `translateY(100%)→0` over 220ms, image `scale(1.04)` over 400ms on card hover. This is the ONLY interaction/animation in the entire desktop tree (see gap notes below).
All other styling is inline Tailwind utility classes (slate/indigo palette, rounded-2xl/rounded-full, shadow-sm/shadow-2xl) — no bespoke visual language.

## 3. Components in `app/desktop/components/` — full inventory

**Nav.tsx** (41 lines): sticky header, `bg-white/80 backdrop-blur`, flex row: name / 4 text links (About, Projects, Skills, Contact, hardcoded not content-driven) / pill CTA button. Only interaction: `hover:text-slate-900` on links, `hover:bg-[var(--d-accent)]` on CTA. No mobile-menu logic (desktop-only, correct), no active-section highlighting, no logo/mark — just plain text name.

**Hero.tsx** (67 lines): `bg-slate-900` section, full-bleed `<Image fill>` background (`campaign-command-room.png`) at `opacity-25` under a `gradient-to-r` slate scrim, 2-col grid (`1.1fr_1fr`): left = location eyebrow + name (h1) + headline + one-sentence value-prop (derived by `profile.bio.split(". ")[0]`, line 7 — a content hack, not a real field) + two pill CTAs; right = autoplay/muted/loop `<video>` (`dashboard.mp4`, poster `dashboard-poster.jpg`) in a rounded-2xl bordered box. No custom SVG, no animated entrance, no parallax — static.

**About.tsx** (28 lines): 2-col grid (`280px_1fr`): fixed 280px square headshot image + eyebrow "About" + single bio paragraph (`profile.bio`, plain text_balance). No stats row, no timeline, no secondary content — bio is literally the only text pulled from `content/profile.ts`.

**Projects.tsx** (81 lines) — the most built-out component:
- 3-column grid (`grid-cols-3`) of case-study cards (`caseStudies` from `content/caseStudies.ts`)
- Each card: `gallery[0]` image (h-44 crop) + industry pill badge (color-mapped via local `accent` dict: logistics=amber, healthcare=emerald, ai=indigo) + title + summary + primaryMetric (big number + label) + client name
- **Hover-reveal `keyDecisions` panel** (lines 62-73): dark overlay slides up from bottom on `:hover`/`:focus-within` (via `.d-card-overlay` CSS), shows "Key decisions" eyebrow + `study.keyDecisions` list
- **Major content gap**: `CaseStudy` type in `content/caseStudies.ts` has extensive unused fields never rendered anywhere in desktop: `engagement` (timeline/audience/stakeholders/systems/measurement), `headings`, `stats[]` (4 stat chips per study), `problem`, `built[]`, `learning`, `nextIteration`, `proofModule` (label/title/body/points), and 2 of 3 `gallery` images per study. Desktop only ever touches `gallery[0]`, `contextLabel`, `title`, `summary`, `primaryMetric`, `client`, `keyDecisions`. This is rich role→impact→decision content sitting unused — no case-study detail view/page/modal exists at all.

**Skills.tsx** (32 lines): plain 4-column grid (`grid-cols-4`) of category headers + bullet lists (`<ul><li>` plain text, no icons, no proficiency indication, no visual grouping beyond a heading).

**Contact.tsx** (35 lines): centered `bg-slate-900` band, eyebrow + h2 + location + 2 pill CTAs (mailto + LinkedIn). Identical visual language to Hero's dark section, no form, no custom illustration.

**Footer.tsx** (17 lines): simple flex row, copyright + mailto link. Nothing else.

## 4. Image/video assets referenced by desktop — verified to exist
| Referenced in | Path | Exists | Real size |
|---|---|---|---|
| Hero.tsx:16 | `/assets/hero/campaign-command-room.png` | Yes | 2.0MB |
| Hero.tsx:55-56 | `/assets/video/dashboard.mp4` + `/assets/video/dashboard-poster.jpg` | Yes | 28.7MB / 199KB |
| About.tsx:10 | `/assets/headshot/adarsh-shankar.png` | Yes | 1.75MB |
| Projects.tsx (via `caseStudies` gallery) | `/assets/work/{logistics,healthcare,ai}/*.png` | Yes, all 9 files | ~few hundred KB each |

Note: hero PNG, headshot PNG, and dashboard.mp4 are all large unoptimized files (1.7-28.7MB) — no `next/image` blur placeholder, no explicit width/height beyond `fill`, video has no compressed/responsive variant.

## 5. Full `public/` inventory (every asset that exists)
```
public/favicon.svg
public/icons.svg                                    ← generic template icons (bluesky, discord, github, x, "social", "documentation") — NOT USED anywhere in app/desktop or app/mobile per grep; leftover boilerplate
public/assets/headshot/adarsh-shankar.png
public/assets/hero/campaign-command-room.png
public/assets/video/dashboard-poster.jpg
public/assets/video/dashboard.mp4
public/assets/work/ai/account-dashboard.png
public/assets/work/ai/email-campaign.png
public/assets/work/ai/solution-page.png
public/assets/work/healthcare/cohort-dashboard.png
public/assets/work/healthcare/email-campaign.png
public/assets/work/healthcare/onboarding-page.png
public/assets/work/logistics/analytics-dashboard.png
public/assets/work/logistics/email-campaign.png
public/assets/work/logistics/landing-page.png
```
That is the entire asset library — no icon set for skills/tools (Mailchimp, HubSpot, Customer.io, Webflow, GA4 logos etc. all referenced only as plain text in Skills.tsx), no custom SVG graphics/patterns/dividers, no additional headshot variants, no OG/social share image beyond `favicon.svg`.

## 6. Gaps — unfinished / placeholder-ish / not "world-class" (concrete call-outs)
1. **Zero custom SVG/iconography anywhere in `app/desktop`** — confirmed via grep, no matches for svg/path/viewBox in the whole tree. `public/icons.svg` exists but is unused generic social-icon boilerplate, not a real design asset.
2. **Single design token total** (`--d-accent`) — no type scale, no spacing scale, no secondary/tertiary colors defined as tokens; everything is ad-hoc Tailwind slate/indigo classes repeated per-component (e.g., `text-sm font-medium uppercase tracking-widest text-[var(--d-accent)]` copy-pasted verbatim in About.tsx:18, Projects.tsx:14, Skills.tsx:6).
3. **Only one interaction pattern exists** in the whole tree: the Projects card hover-reveal (styles.css:16-34). Nav links, CTAs, Contact links are plain Tailwind `hover:` color swaps — no micro-interactions, no scroll-triggered reveals, no cursor-aware treatments, nothing desktop-native beyond that single card hover.
4. **Hero and Contact sections are visually identical** dark-slate full-bleed bands with the same eyebrow/heading/pill-CTA formula — no visual differentiation between top-of-funnel and bottom-of-funnel sections.
5. **Massive unused rich content** in `content/caseStudies.ts` (engagement metadata, 4 stats per study, problem narrative, built[] list, proofModule, learning/nextIteration, 2/3 gallery images per case) — the current Projects.tsx only surfaces a fraction of it via one hover panel. No case-study detail view exists, so there's no scannable role→impact→skills drill-down at all — everything is compressed into one 3-col card grid.
6. **Skills section is a plain 4-column bullet list** (Skills.tsx:13-28) — no visual weight differentiation, no tool logos/icons, no proficiency/usage indication, reads as a resume dump rather than a designed section.
7. **Fixed, non-fluid layouts**: `d-container` is a hardcoded 1200px max-width with no intermediate breakpoints; Hero and About use fixed grid-template-columns (`1.1fr_1fr`, `280px_1fr`) rather than responsive/fluid treatments — will not gracefully scale across the wide range of desktop viewport sizes.
8. **Unoptimized large media**: headshot PNG 1.75MB, hero PNG 2.0MB, dashboard.mp4 28.7MB with no responsive/compressed variant — a "world-class" pass will need asset optimization alongside visual redesign.
9. **Nav labels are hardcoded** in Nav.tsx:3-8, not sourced from content — fine for now but means any new sections need manual nav sync.
10. **No footer content depth** — Footer.tsx is copyright + one email link only, no social links (despite `public/icons.svg` existing for that exact purpose but never wired up), no secondary nav.
11. **Value-prop hack in Hero.tsx:7** (`profile.bio.split(". ")[0] + "."`) — derives hero copy by string-splitting the About bio rather than a dedicated content field; a redesign that wants distinct Hero vs. About copy will need a new `content/profile.ts` field.
