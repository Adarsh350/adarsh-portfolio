# Work Case Studies Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three premium, expandable, anonymous email-marketing case studies with original visual galleries.

**Architecture:** Case-study content lives in a dedicated data module, while `Work.jsx` renders accessible cards and expansion panels. Work-specific responsive styling remains in the existing stylesheet, and generated raster assets live under a stable public asset hierarchy.

**Tech Stack:** React 19, Vite 8, CSS, static PNG/WebP assets

---

## Chunk 1: Content and assets

### Task 1: Add structured case-study data

**Files:**
- Create: `src/data/caseStudies.js`

- [ ] Define three records with stable IDs, anonymous client descriptors, industry themes, overview copy, problems, deliverables, decisions, metrics, learning, and gallery metadata.
- [ ] Keep metric labels concise enough for mobile.
- [ ] Ensure every gallery item has a path, alt text, caption, and type.
- [ ] Run `node --check src/data/caseStudies.js`.

### Task 2: Lock the media contract

**Files:**
- Modify: `index.html`
- Modify: `src/main.js`
- Modify: `src/style.css`

- [ ] Replace the existing placeholder Work markup in `index.html` with a semantic mount point.
- [ ] Import the data and render class-based semantic section, card, panel, metric, and gallery markup from the active `src/main.js` entry.
- [ ] Define every gallery frame and collapsed cover as 4:3.
- [ ] Reuse each case study's first gallery asset as its collapsed cover; do not create separate cover files.
- [ ] Set fixed image width and height attributes matching 1536×1152 exports.
- [ ] Add persistent media wrappers and captions that remain visible if an image fails.

### Task 3: Generate and save original gallery assets

**Files:**
- Create: `public/assets/work/logistics/email-campaign.png`
- Create: `public/assets/work/logistics/landing-page.png`
- Create: `public/assets/work/logistics/analytics-dashboard.png`
- Create: `public/assets/work/healthcare/email-campaign.png`
- Create: `public/assets/work/healthcare/onboarding-page.png`
- Create: `public/assets/work/healthcare/cohort-dashboard.png`
- Create: `public/assets/work/ai/email-campaign.png`
- Create: `public/assets/work/ai/solution-page.png`
- Create: `public/assets/work/ai/account-dashboard.png`

- [ ] Generate each image as an original, brand-neutral 4:3 campaign mockup at 1536×1152 or an equivalent 4:3 intrinsic size.
- [ ] Avoid real logos, company names, and unreadable dense text.
- [ ] Save all selected outputs inside the project.
- [ ] Verify file type and dimensions with `file`.

## Chunk 2: Work-section implementation

### Task 4: Complete the Work component

**Files:**
- Modify: `index.html`
- Modify: `src/main.js`

- [ ] Import the case-study data.
- [ ] Render the section introduction and exactly four capability labels: `Strategy`, `Email systems`, `Landing pages`, and `Analytics`.
- [ ] Render three collapsed cards with cover image, descriptor, primary result, and supporting metrics.
- [ ] Add section-level `openCaseId` state so opening one card closes its sibling and clicking the open card closes it.
- [ ] Use native buttons with `aria-expanded` and `aria-controls`.
- [ ] Render Problem, What We Built, Key Decisions, Results, Gallery, and What We Learned sections.
- [ ] Use `alt=""` for decorative collapsed cover crops; use concise informative alt text for expanded gallery images, with captions carrying the strategic context.

### Task 5: Complete Work-specific styling

**Files:**
- Modify: `src/style.css`

- [ ] Add card, cover, metric, expansion, narrative, decision, learning, and gallery classes.
- [ ] Add logistics, healthcare, and AI theme variables.
- [ ] Implement stacked mobile-first layouts, including a non-scrolling vertical gallery.
- [ ] Add explicit 700px tablet and 1080px desktop refinements.
- [ ] Add hover and focus states without overriding global focus visibility.
- [ ] Prevent horizontal gallery overflow at every breakpoint; stack on mobile, use two columns with the final item spanning at tablet widths, and use three columns on desktop.

## Chunk 3: Integration and verification

### Task 6: Verify production behavior

**Files:**
- Verify: `index.html`
- Verify: `src/main.js`
- Verify: `src/style.css`
- Verify: `src/data/caseStudies.js`
- Verify: `public/assets/work/**`

- [ ] Run `npm run build`.
- [ ] Restart Vite if newly created public directories return the HTML fallback.
- [ ] Verify all asset URLs return the expected image content type.
- [ ] Test expansion controls with keyboard interaction and confirm `aria-controls` targets existing panel IDs.
- [ ] Confirm `aria-expanded` toggles correctly on open and close for every case-study button.
- [ ] Tab through all controls and confirm visible focus.
- [ ] Inspect expanded heading and list semantics.
- [ ] Inspect 390px, 768px, and 1440px layouts.
- [ ] Confirm mobile galleries stack, tablet galleries use two columns with the final image spanning, and desktop galleries use three columns.
- [ ] Confirm mobile metrics use two columns and desktop metrics use four columns without clipping.
- [ ] Emulate reduced motion and confirm reveal/rotation transitions are effectively disabled.
- [ ] Temporarily test one broken image path and confirm the frame, caption, and case-study text remain usable; restore the valid path afterward.
- [ ] Inspect all rendered copy and nine assets for real company names, logos, trademarks, copied material, or identifying detail combinations.
- [ ] Check browser console for errors.

### Task 7: Complete review loops

- [ ] Spawn a reviewer agent with the completed Work section and screenshots; require a numerical score for visual quality, credibility, UX, copy, and portfolio positioning.
- [ ] Treat any score below 10/10 as requiring a concrete issue list.
- [ ] Apply all justified fixes required to reach approval.
- [ ] Re-run the same advisor agent after fixes and require explicit approval.
- [ ] Spawn a new reviewer agent without forked context to review the finished Work section from scratch.
- [ ] Apply justified final improvements.
- [ ] Re-run `npm run build` and final UI checks.
