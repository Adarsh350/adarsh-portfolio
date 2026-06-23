# Work Case Studies Redesign

## Goal

Replace the current placeholder-heavy Work section with three premium, expandable email-marketing case studies for anonymous clients in logistics, healthcare, and AI infrastructure. The section should position Adarsh as a strategic full-funnel freelancer whose work connects email, landing pages, measurement, and sales outcomes.

## Constraints

- Keep all client identities anonymous.
- Do not use real company names, logos, trademarks, screenshots, or copied assets.
- Treat names, metrics, timelines, locations, and contextual details as composited portfolio material; avoid combinations that can identify a specific real engagement. This is an internal content rule and does not require disclosure copy in the interface.
- Preserve the portfolio's existing dark, warm, editorial visual system.
- Keep the implementation responsive and keyboard accessible.
- Every case study must include:
  - The problem
  - What was built
  - Key decisions
  - Performance statistics
  - A complete visual gallery
  - Learnings and what would be improved next time
- The collapsed state must remain scannable and persuasive.
- The expanded state must feel substantial without navigating away from the portfolio.

## Information Architecture

### Section introduction

- Eyebrow: `Selected work`
- Headline: `Campaign systems built to move pipeline.`
- Supporting copy explains that the work spans positioning, email, landing pages, analytics, and reporting.
- A compact capability row contains exactly four items: `Strategy`, `Email systems`, `Landing pages`, and `Analytics`.

### Case study 1: Dubai logistics group

**Positioning:** Lead-generation and account-expansion campaign for a multinational logistics operator serving GCC procurement and operations teams.

**Primary result:** `$1.18M influenced pipeline`

**Supporting metrics:**

- 47.8% average open rate
- 6.9% unique click rate
- 92 qualified RFQs
- 31% lift from segment-specific landing pages

**Problem:** A broad service portfolio, fragmented lists, and generic communications made it difficult for procurement teams to understand which offer matched their shipping lane or operational need.

**What was built:**

- Contact segmentation by vertical, lane, and buying intent
- Four-email account-nurture sequence
- Segment-specific landing pages
- Quote-request routing and sales alerts
- Weekly performance dashboard and executive report

**Key decisions:**

- Lead with operational risk and delivery certainty instead of service breadth.
- Split messaging by decision-maker and trade lane.
- Route high-intent engagement to sales within one business day.

**Learning:** The strongest lift came from relevance, not higher send volume. A future version would add behavioral scoring sooner and build sales follow-up templates into the launch.

### Case study 2: US healthcare startup

**Positioning:** Activation and re-engagement program for a healthcare platform that needed eligible participants to complete a sensitive multi-step onboarding flow.

**Primary result:** `2.4× activation rate`

**Supporting metrics:**

- 52.4% average open rate
- 14.6% click-to-open rate
- 38% reduction in onboarding drop-off
- 1,860 completed eligibility profiles

**Problem:** High initial interest did not translate into completed profiles because the process felt clinical, lengthy, and uncertain.

**What was built:**

- Trust-led five-email onboarding sequence
- Plain-language eligibility explainer
- Mobile-first onboarding landing page
- Reminder logic based on completion stage
- Cohort dashboard covering activation and abandonment

**Key decisions:**

- Replace institutional language with clear, reassuring next steps.
- Use one action per email.
- Trigger reminders based on incomplete steps rather than elapsed time alone.

**Learning:** Clarity and reassurance outperformed urgency. A future version would introduce preference controls earlier and test short educational video inside the highest-friction step.

### Case study 3: US AI infrastructure company

**Positioning:** Enterprise demand-generation launch for an AI infrastructure product targeting technical and operational buying committees.

**Primary result:** `41 enterprise demos`

**Supporting metrics:**

- 44.1% average open rate
- 8.3% unique click rate
- 19 sales-qualified opportunities
- 27% demo-page conversion from engaged accounts

**Problem:** The product was technically strong but the launch narrative focused on architecture rather than the business conditions that made the infrastructure necessary.

**What was built:**

- Three audience tracks for technical, operations, and executive buyers
- Five-email launch and nurture sequence
- Interactive solution landing page
- Account-engagement dashboard
- Sales enablement briefs and follow-up templates

**Key decisions:**

- Translate technical capability into deployment speed, resilience, and control.
- Keep technical proof available without forcing every reader through it.
- Score engagement at the account level to reflect committee buying.

**Learning:** Executive messaging created awareness, while technical proof created conversion. A future version would add a benchmark asset before launch and use stronger account-level retargeting.

## Interaction Design

- Each case study is a full-width card with a strong visual cover, client descriptor, industry, outcome, supporting metrics, and a `View case study` control.
- Clicking the card control expands the case study inline.
- Expansion state is section-level and only one case study may be open at a time, preventing long-scroll fatigue on mobile.
- The control uses a native button with `aria-expanded` and `aria-controls`.
- Expanded content uses semantic headings and lists.
- Below 700px, metrics use a two-column grid, narrative blocks stack, and gallery images stack vertically. Metric labels may wrap to two lines without changing card height assumptions.
- From 700px through 1079px, the narrative remains stacked, metrics use a four-column grid when space permits, and the gallery uses a two-column grid with the final image spanning both columns.
- At 1080px and above, the expanded narrative uses a two-column editorial layout with a four-item metric row and a three-column gallery.
- Motion is limited to opacity, height-adjacent reveal, and icon rotation; reduced-motion preferences are honored by the existing global rule.

## Visual Direction

- Preserve `#141210` background, warm cream text, and terracotta accent.
- Introduce one restrained secondary accent per industry:
  - Logistics: amber/copper
  - Healthcare: muted teal
  - AI: cool violet
- Gallery assets are original campaign mockups with no third-party branding:
  - Logistics: freight operations email, lane landing page, pipeline dashboard
  - Healthcare: onboarding email, eligibility landing page, cohort dashboard
  - AI: launch email, enterprise solution page, account-intent dashboard
- Mockups should look like polished portfolio documentation rather than literal screenshots from a real client account.
- Avoid gradients as decorative backgrounds; use subtle lighting only inside the generated mockups where it supports screen realism.

## Component Architecture

### `src/data/caseStudies.js`

Owns all case-study copy, metrics, gallery metadata, and theme identifiers. The UI consumes this data without embedding campaign copy in component markup.

### `index.html`

Contains the semantic Work-section mount point used by the active Vite entry page.

### `src/main.js`

Imports case-study data, renders the semantic section structure into the mount point, and owns the single-open expansion behavior. This is the active production runtime; the unused React component tree is outside this change.

### `src/style.css`

Owns Work-specific responsive layout, card states, gallery behavior, focus/hover styling, and industry theme variables.

### `public/assets/work/`

Contains nine original raster assets, three per case study. Paths are stable and grouped by industry. Each asset uses a 4:3 aspect ratio at 1536×1152 or an equivalent 4:3 intrinsic size.

## Failure and Fallback Behavior

- Informative gallery images have concise alt text describing the visible artifact. Captions carry strategic context, so alt text does not repeat the caption. Purely decorative cover crops use empty alt text. All images have fixed dimensions and aspect ratios to prevent layout shift.
- If an image fails, the browser retains the framed background and text content remains usable.
- Expansion does not depend on JavaScript routing or external APIs.
- No autoplay, modal trap, or scroll hijacking is introduced.

## Verification

- `npm run build`
- Confirm all nine asset URLs return `image/*`, not the Vite HTML fallback.
- Confirm all three cards expand and collapse by mouse and keyboard.
- Confirm `aria-expanded` changes correctly.
- Confirm layouts at approximately 390px, 768px, and 1440px.
- Confirm gallery images do not overflow and text remains readable.
- Confirm reduced-motion behavior remains functional.
- Confirm no real company identifiers or copied assets appear.
