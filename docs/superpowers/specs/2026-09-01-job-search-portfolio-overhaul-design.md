# Job-search portfolio overhaul

Date: 2026-09-01

## Objective

Turn the existing portfolio into a recruiter-facing site for Adarsh Shankar: an AI-native product and growth marketer who can also design and ship the systems behind the work. The site must support a selective job search rather than sell consulting services or present a digital resume verbatim.

The visual result should feel premium, precise, and professional. It must avoid the two obvious traps: reproducing Iyara Labs' warm parchment, serif, and brass identity, or falling into the black-and-gold/neon-gradient visual language commonly used for generic AI portfolios.

## Audiences and role positioning

Audience priority:

1. UAE employers. Adarsh has UAE work authorization through a Golden Visa and can start immediately.
2. US cap-exempt employers. Adarsh requires cap-exempt H-1B sponsorship and does not have immediate US work authorization.
3. Indian employers, especially Mumbai and Bengaluru. Adarsh is an Indian citizen and has unrestricted Indian work authorization.

Primary role positioning:

- Product Marketing Manager at an AI or B2B SaaS company.
- Growth or Lifecycle Marketing Lead.
- GTM Engineer or Marketing Engineer as the differentiating lane.
- Marketing Analytics Manager as a credible supporting lane, not the main identity.

The core positioning is: an AI-native product and growth marketer who can research, position, instrument, automate, and ship.

## Source-of-truth policy

The attached `Adarsh_Shankar_Resume.pdf` is the factual source of truth for employment claims, dates, metrics, tools, education, and certifications.

Additional approved sources:

- Facts Adarsh supplied directly in the redesign conversation on 2026-09-01. Specifically: he has UAE work authorization through a Golden Visa and can start immediately; he is an Indian citizen with Indian work authorization; he needs a cap-exempt H-1B for US employment; his co-founder will take over Iyara's day-to-day operation while Adarsh remains a shareholder; and he is selectively considering roles where scale and impact justify stepping away from day-to-day operations.
- Public GitHub repositories under `Adarsh350`, used as evidence of shipped technical work.
- Public content on `iyaralabs.com`, used only to demonstrate the site Adarsh built and the services visibly offered there. Public client information may be referenced only as Iyara company evidence, not as Adarsh's personal outcome; information absent from the public site remains confidential.
- The old Lovable portfolio may suggest case-study topics and presentation structure, but its unsupported metrics, testimonials, and claims must not be reused without explicit confirmation.

No fabricated client names, outcomes, quotes, screenshots, or confidential implementation details may appear.

## Narrative

The site should answer five recruiter questions in order:

1. What does Adarsh do?
2. What measurable outcomes has he produced?
3. Can he operate beyond strategy and actually build?
4. What has he done across his career?
5. Is he available and eligible for this role?

The site should frame Iyara Labs as a built venture, not an unresolved conflict. Adarsh built the startup and its operating systems. His co-founder will take over day-to-day operations; Adarsh remains a shareholder. He is selectively exploring roles where the scale, responsibility, and impact justify stepping away from daily operations.

## Information architecture

### 1. Global navigation

A slim sticky header contains Adarsh's name, section links, a GitHub link, and a direct `Download resume` action. It uses a restrained active-section indicator and remains usable by keyboard.

### 2. Hero: positioning before chronology

The hero leads with a clear professional identity rather than an agency offer.

Draft copy:

- Eyebrow: `AI-native product & growth marketer`
- Headline: `I build the systems behind measurable growth.`
- Supporting line: `I have led GTM, lifecycle, and product marketing across AI, healthtech, and B2B/B2C brands, then built the sites, automations, dashboards, and tools needed to make the work measurable.`

The hero includes Adarsh's real headshot, location, immediate availability, UAE Golden Visa, Indian citizenship/work authorization, and the US cap-exempt H-1B requirement. Work authorization is written plainly, without turning the hero into a legal notice. On desktop, role, location, availability, and all three authorization lines appear inside the initial hero viewport at 1440×900. On mobile, role, location, and immediate availability appear before the primary actions, while all three authorization lines appear before the proof ledger and no later than 1,000 CSS pixels from the top at 375px width.

Primary actions: `Explore selected work` and `Download resume`. LinkedIn, GitHub, and email are clear text links rather than a row of generic icon buttons.

### 3. Proof ledger

A horizontal evidence ledger gives recruiters four resume-backed facts before asking them to read a case study. It becomes a non-scrolling 2×2 grid below tablet width and may stack vertically on narrow screens:

- `100+` AI visibility markers architected at Iyara Labs.
- `10,000+` Bloodrec users in year one.
- `30% / 25%` email MQL and SQL lift at Trussme.
- `25%` conversion lift at Armada AI.

Numbers use tabular figures. Each fact links to its relevant case-study chapter.

### 4. Selected work: four evidence chapters

The core experience becomes four narrative chapters, not resume cards. Each chapter may use the following evidence blocks only when the block is directly supported by the resume, direct user input, or approved public evidence:

- Context: company, market, role, dates.
- Mandate: the business problem or responsibility supported by the resume.
- Decisions: what Adarsh chose to do.
- System: the website, automation, dashboard, research, instrumentation, or workflow he built.
- Outcome: only resume-backed metrics.
- Tools and collaborators.
- Evidence link where public evidence exists; otherwise a visible `Resume-backed` source label.

Chapters:

1. Iyara Labs: zero-to-one company building, the 100+-marker visibility system, client pipeline, GTM ownership, and the production website.
2. Trussme: lifecycle operations, the 4-person team, 10+ clients, campaign performance, landing-page trackers, Zapier pipelines, and Cloudflare reporting. The initial build uses a factual system diagram; screenshots can replace or supplement it when supplied.
3. Bloodrec: first marketing hire, zero-to-10,000+ user growth, bounce-rate reduction, and GA4-instrumented landing-page tests.
4. Armada AI: product marketing, site and UX overhaul, cross-functional work, targeted email, research and analytics, and enterprise sales assets.

The chapters use editorial diagrams and metric bands rather than fake device mockups or confidential client imagery.

### 5. Builder index

This section proves that `AI-native builder` is an operating capability, not a label. It presents public projects as a compact, static grouped index with live or repository links. It requires no client-side filtering.

Featured projects:

- `mailchimp-bounce-monitor-worker`: marketing operations, webhooks, scheduled automation, and deliverability.
- `skill-routing-eval`: AI-agent evaluation and experimental design.
- `chess-app`: offline-first product design, IndexedDB, local analysis, and Stockfish integration.
- `Jobfill-Extension`: privacy-first browser automation for job applications.

Secondary entries may include `mailchimp-reports-worker`, `claude-code-hooks`, `codex-usage`, and `graphify-github-obsidian`. Repository descriptions and technical facts come from the public GitHub repositories. The site does not show vanity star counts.

### 6. Career range

A compressed career timeline includes Jaguar Land Rover, Helmer Scientific, and ERIDE without giving them the same visual weight as the four primary chapters. Education follows as a compact credential block for Purdue and VIT.

### 7. Capability map

Skills are grouped around work Adarsh can perform, not a wall of tool badges:

- Product and GTM: positioning, GTM strategy, research, cross-functional coordination.
- Growth systems: lifecycle campaigns, experimentation, analytics, reporting, and automation.
- Builder toolkit: Claude Code, web tools, workflow automation, dashboards, and production delivery.

Certifications remain a secondary expandable inventory. Every listed tool or credential must trace to the resume.

### 8. Selective transition and contact

A short closing section explains the Iyara transition in professional language and states the opportunity filter: Adarsh is looking for work with real scale, meaningful ownership, and measurable impact.

Contact options are email, LinkedIn, and GitHub. There is no contact form or scheduling funnel. The page closes with explicit work-authorization lines for UAE, India, and cap-exempt US roles.

## Visual language

### Palette

- Canvas: cool porcelain, approximately `#F3F5F2`.
- Primary text: deep slate, approximately `#172128`.
- Secondary text: steel gray, approximately `#56646B`, which exceeds AA contrast on the canvas.
- Accent: restrained oxide red, approximately `#A83F2B`. Lighter oxide variants are decorative only and never carry body-sized text.
- Rules and panels: cool gray-green neutrals.

The page remains predominantly light. Deep slate may appear in small diagrams, labels, and footer details but never as a full black background. There is no gold, purple AI gradient, glassmorphism, or glow.

### Typography

A contemporary variable grotesk carries headings and body copy. A technical monospace is reserved for numbers, labels, dates, and system annotations. Fonts are served from local assets or Next font tooling with no runtime fetches, avoiding Windows ARM build failures.

Headlines are large, left-aligned, tightly tracked, and sentence case. Body text stays within a readable measure. Labels use restrained uppercase sparingly.

### Layout

The design uses a responsive editorial grid shared by all devices. The current duplicate desktop/mobile page trees and device-rewrite proxy are removed. One semantic component system adapts from a wide asymmetric grid to a single-column mobile flow.

The page avoids equal-height card rows. Major case studies are full-width chapters with alternating diagram placement. Smaller GitHub projects use a dense index inspired by an engineering changelog rather than a card gallery.

Subtle grid lines, section coordinates, and margin notes create technical character. These elements organize real information; they are not decorative fake terminal output.

### Motion

Motion is measured and functional:

- Active-section tracking in the navigation.
- Metric values and diagram paths reveal once when they enter the viewport.
- Case-study system diagrams assemble through opacity and transform transitions.
- GitHub project rows expose implementation details on focus or hover.

All motion respects `prefers-reduced-motion`. No smooth-scroll library or animation dependency is required.

## Technical architecture

- Keep Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vercel Analytics, and Speed Insights.
- Replace the split `/desktop` and `/mobile` trees with a single responsive root page. Permanent redirects send legacy `/desktop` and `/mobile` URLs to `/`; same-document fragments are allowed to survive through standard browser redirect behavior.
- Remove `proxy.ts`, device-cookie routing, duplicate component trees, and dead Vite-era source files.
- Store factual content in typed modules under `content/`.
- Store reusable UI under `components/`, with focused client components only where browser APIs are required.
- Use static project metadata rather than a runtime GitHub API dependency.
- Copy the supplied resume to a stable public download path. Because it contains a phone number, return `X-Robots-Tag: noindex, noarchive` for the PDF path while keeping it directly downloadable.
- Add complete metadata, an Open Graph image, a branded 404 page, a skip link, visible focus states, and semantic landmarks.
- Keep the site backend-free. Contact remains direct links.

## Accessibility and performance

- WCAG AA contrast for body copy and controls.
- Full keyboard navigation and visible focus states.
- Semantic headings and landmarks.
- Meaningful image alt text.
- Reduced-motion behavior.
- No content hidden behind hover alone.
- Responsive checks at 375x812, 768x1024, 1440x900, and 1920x1080.
- Avoid unnecessary JavaScript; the experience chapters remain server-rendered.
- Optimize the headshot and any captured project imagery through `next/image`.

## Content exclusions

- No unsupported claims or testimonials from the old portfolio.
- No consulting CTA, strategy-call funnel, response-time promise, or `free consultation` language.
- No confidential Trussme client names or screenshots until Adarsh supplies approved assets.
- No phone number in visible page copy. The downloadable resume remains the canonical resume document.
- No generic AI imagery, stock teams, fake code, fabricated dashboards, or placeholder project screenshots.

## Acceptance criteria

1. At 1440×900, the hero viewport contains Adarsh's target role, location, immediate availability, and all work-authorization lines. At 375×812, role, location, and availability precede the primary actions, and all authorization lines occur before the proof ledger and within 1,000 CSS pixels of the top.
2. All four main roles are presented as evidence-led chapters, not copied resume bullets.
3. The builder index links to at least four real public projects and explains why each matters professionally.
4. Every metric and factual claim traces to the resume, user-provided context, GitHub, or public Iyara content.
5. The design is clearly distinct from Iyara Labs and avoids black/gold and generic AI aesthetics.
6. The site works through one responsive architecture with no device cookie or route rewrite.
7. Production build and TypeScript checks pass.
8. Desktop and mobile browser reviews show no overflow, clipping, broken anchors, missing assets, inaccessible controls, or stale content.
9. The resume downloads correctly and all external links resolve.
10. The final implementation receives a fresh-context code review and a rendered visual review before handoff.
