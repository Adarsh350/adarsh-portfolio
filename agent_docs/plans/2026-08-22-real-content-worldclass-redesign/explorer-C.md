# Explorer C — mobile tree + assets inventory

Confirmed: `icons.svg` and `favicon.svg` are not referenced anywhere in `app/` (grep for both returned zero hits) — they're generic template leftovers, unrelated to Adarsh's brand. `campaign-command-room.png` and `dashboard.mp4`/`dashboard-poster.jpg` are desktop-only (`app/desktop/components/Hero.tsx:16,55-56`), not currently used in mobile.

## 1. `app/mobile/layout.tsx` (15 lines) — full
```
import DeviceSync from "@/lib/device-sync";
import "./styles.css";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DeviceSync expected="mobile" />
      <div data-device="mobile">{children}</div>
    </>
  );
}
```
All mobile CSS custom properties/rules are scoped under `[data-device="mobile"]` (see styles.css below) via this wrapper div.

## `app/mobile/page.tsx` (23 lines) — full
Order: `<main className="pb-16">` wraps Hero → About → Projects → Skills → Contact → Footer, then `<Nav>` (fixed bottom bar) sits outside `<main>` as a sibling. `pb-16` on main reserves space for the fixed tab bar.

## 2. `app/mobile/styles.css` (63 lines) — full. Key points:
- Design tokens (all scoped to `[data-device="mobile"]`, lines 3-15): `--bg:#ffffff`, `--fg:#14161a`, `--muted:#5b6270`, `--border:#e4e6eb`, `--surface:#f7f7f9`, `--accent:#2b3a67` (a dark navy/indigo). No spacing-scale or typography-scale custom properties exist — base `font-size:16px; line-height:1.5` only. No shadow, radius, or motion-duration tokens defined as CSS vars — all border-radius/duration values are hardcoded inline via Tailwind utility classes in components (`rounded-full`, `rounded-2xl`, `rounded-xl`, `duration-150` via `transition-transform 0.15s ease` on line 51).
- `section { scroll-margin-top: 1rem }` (line 17-19) for anchor-nav offset.
- `.mobile-tabbar` gets `padding-bottom: env(safe-area-inset-bottom, 0px)` (22-24).
- `.snap-row` / `.snap-card`: scroll-snap-x mandatory carousel, scrollbar hidden cross-browser (27-39).
- `details > summary` marker removal + `.chevron` rotate-180 on `[open]` (42-56).
- Global `prefers-reduced-motion: reduce` guard collapses all transitions/animations under `[data-device="mobile"] *` to 0.01ms (58-63).
- No dark-mode media query, no custom font-face — inherits Inter from root layout only.

## 3. Components — full inventory

**`Nav.tsx`** (89 lines, client component) — fixed bottom tab bar, 5 items (Home/About/Work/Skills/Contact), IntersectionObserver (`rootMargin: "-45% 0px -50% 0px"`) drives `activeHref` state highlighting active tab in `var(--accent)`. Icons: inline SVG, 20×20, `viewBox="0 0 24 24"`, `stroke="currentColor"` `strokeWidth="2"` `strokeLinecap/Linejoin="round"`, fill none — classic Feather/Lucide-style outline icon set, hand-authored (not from `public/icons.svg`, which is unused). The 5 `d` paths (lines 6-26): house, person-in-circle (about), briefcase, sparkle/asterisk-burst (skills), envelope. This outline weight/style is the "current icon style" baseline the planner should match or diverge from intentionally.

**`Hero.tsx`** (46 lines) — consumes `profile.name`, `profile.headline`, `profile.location`, `profile.email`, `profile.linkedin`. Renders: 96×96 circular headshot (`/assets/headshot/adarsh-shankar.png`, `priority`), name (h1), headline (accent-colored), location (muted), then two full-width min-h-44px CTA buttons (solid accent "Email me" mailto, outlined "Connect on LinkedIn"). No hero background image/video used on mobile (unlike desktop's `campaign-command-room.png` + dashboard video). No SVG icons here.

**`About.tsx`** (15 lines) — just an eyebrow label "About" + `profile.bio` paragraph. Plain, no visual treatment beyond typography.

**`Projects.tsx`** (174 lines) — the most complex component. Consumes full `caseStudies` array (sorted by `sequence`), `.slice`-destructures `gallery[0]` as cover image, rest as `restGallery`. Renders horizontal snap-row of cards (`w-[85vw] max-w-sm`, rounded-2xl bordered white cards): cover image (4:3 aspect), `contextLabel` eyebrow, `title`, `summary`, a highlighted primaryMetric "stat pill" (accent-colored number in surface-bg rounded box), a 2-col `stats` grid (dt/dd pairs), then a native `<details>` progressive disclosure revealing: problem (`headings.problem` + `problem`), "What I built" bullet list, keyDecisions bullet list (`headings.decisions`), a `proofModule` callout box (label/title/body/points list, surface bg), results section (uses `learning` + `nextIteration`), remaining gallery items as captioned list (not images, just text captions+eyebrows — restGallery images themselves are NOT rendered, only their `eyebrow`/`caption` text), and `engagement.timeline`/`engagement.audience` footer line. Chevron SVG in summary: 16×16, `viewBox="0 0 24 24"`, path `d="m6 9 6 6 6-6"` (simple chevron-down), same outline style as Nav icons, rotates via `.chevron` CSS class.

**`Skills.tsx`** (30 lines) — consumes `skills` (array of `{category, items[]}`). Renders each category as h3 + flex-wrap pill list (`rounded-full bg-surface px-3 py-1.5`). No icons, no per-skill visual differentiation.

**`Contact.tsx`** (34 lines) — consumes `profile.location`, `profile.email`, `profile.linkedin`. Two full-width bordered rounded-2xl rows (email, LinkedIn), each with a bare `&rarr;` HTML entity arrow (not SVG) on the right.

**`Footer.tsx`** (12 lines) — single-line copyright with dynamic year, `profile.name`, `profile.location`. Plain text, bordered top.

**Icon style summary**: only two places use inline SVG (Nav 5 icons + Projects chevron), both outline/stroke style at `strokeWidth="2"`, `viewBox 0 0 24 24`, rounded caps/joins — consistent minimalist Feather-icon aesthetic. Contact uses a raw arrow glyph, not SVG. No icons at all in Hero/About/Skills/Footer. `public/icons.svg` (bluesky/discord/documentation/github/social/x symbols, mixed fill-solid and `#aa3bff`-stroke styles) and `public/favicon.svg` (purple abstract gradient blob) are both currently **unreferenced/unused** anywhere in `app/` — leftover template assets, not part of the current design language.

## 4. `public/` full asset inventory (exact paths + sizes)
| Path | Size | Used in mobile? |
|---|---|---|
| `public/assets/headshot/adarsh-shankar.png` | ~1.8MB | Yes — Hero.tsx |
| `public/assets/hero/campaign-command-room.png` | ~2.0MB | No — desktop-only (`app/desktop/components/Hero.tsx:16`) |
| `public/assets/video/dashboard-poster.jpg` | 203,617 B | No — desktop-only |
| `public/assets/video/dashboard.mp4` | ~27MB | No — desktop-only |
| `public/assets/work/ai/account-dashboard.png` | 1,582,172 B | No (restGallery renders text-only, doesn't render images) |
| `public/assets/work/ai/email-campaign.png` | 1,626,091 B | Used as cover (gallery[0]) for AI case study |
| `public/assets/work/ai/solution-page.png` | 1,735,182 B | restGallery, image unused |
| `public/assets/work/healthcare/cohort-dashboard.png` | 1,370,956 B | restGallery, image unused |
| `public/assets/work/healthcare/email-campaign.png` | 1,566,789 B | Cover image for healthcare case study |
| `public/assets/work/healthcare/onboarding-page.png` | 1,334,514 B | restGallery, image unused |
| `public/assets/work/logistics/analytics-dashboard.png` | 1,430,634 B | restGallery, image unused |
| `public/assets/work/logistics/email-campaign.png` | 1,723,270 B | Cover image for logistics case study |
| `public/assets/work/logistics/landing-page.png` | 1,666,474 B | restGallery, image unused |
| `public/favicon.svg` | 9,522 B | Unused generic template asset (purple blob) |
| `public/icons.svg` | 5,055 B | Unused generic template asset (bluesky/discord/github/x/social/docs symbols) |

Important gap: in every case study, only `gallery[0]` (the cover) is rendered as an `<Image>` in mobile Projects.tsx (line 25-35); the other 2 gallery images per case study exist as real asset files but mobile only shows their `caption`/`eyebrow` text (lines 143-159), never the image itself. No dedicated mobile-only assets exist. No SVG illustrations, no icon set files beyond the two unused template SVGs, no OG/social image, no apple-touch-icon, no manifest.json found in `public/`.

NOTE: ALL of the above case-study asset paths (`/assets/work/{logistics,healthcare,ai}/*.png`) belong to the FAKE fabricated case studies and will be discarded/replaced along with the fake content — the planner should treat these as assets to remove/ignore, not reuse, since they depict fake fictional client work, not Adarsh's real employers.

## 5. Root-level shared files

**`app/layout.tsx`** (28 lines, full) — loads `Inter` from `next/font/google` with `subsets:["latin"]`, applies `inter.className` directly to `<html>` (so both mobile and desktop trees inherit Inter as the only configured font — no other `next/font` calls anywhere). Renders `<Analytics/>` and `<SpeedInsights/>` from `@vercel/*` inside `<body>`. Metadata: title "Adarsh Shankar", description "Portfolio of Adarsh Shankar."

**`app/globals.css`** (11 lines, full) — just `@import "tailwindcss"`, a universal `box-sizing:border-box` reset, and `margin:0` reset. No design tokens defined here (mobile's tokens live only in `app/mobile/styles.css`; desktop has its own separate styles.css per Explorer B).

**`app/page.tsx`** (7 lines, full) — root `/` route is just a `redirect("/desktop")` marked `// ponytail: safety net only, not part of the real routing path`.

## 6. Content files — full current shape/contents
`content/profile.ts` (18 lines): fake `{name, headline, bio, location, email, linkedin}` — freelance-agency persona.
`content/caseStudies.ts` (328 lines): 3 fake case studies (logistics/healthcare/ai), full `CaseStudy` type with `engagement`, `headings`, `stats[]`, `problem`, `built[]`, `keyDecisions[]`, `learning`, `nextIteration`, `proofModule`, `gallery[]{path,alt,caption,eyebrow,type}`.
`content/skills.ts` (45 lines): 4 fake categories reflecting freelance-marketer persona, not real background.

Note: `CaseStudyGalleryItem.type` field and `headings.gallery` field exist in the schema but `type` is never rendered anywhere in Projects.tsx, and `headings.gallery` is used only as a small h4 label, not as a section heading of its own visual weight.
