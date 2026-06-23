# Graph Report - .  (2026-06-23)

## Corpus Check
- 39 files · ~572,319 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 74 nodes · 86 edges · 13 communities (6 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `renderCaseStudy()` - 5 edges
3. `scripts` - 4 edges
4. `escapeHtml()` - 3 edges
5. `renderGallery()` - 3 edges
6. `App()` - 2 edges
7. `Contact()` - 2 edges
8. `Footer()` - 2 edges
9. `Hero()` - 2 edges
10. `Nav()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (13 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.20
Nodes (10): initPlaceholders(), initVideoPoster(), caseStudies, escapeHtml(), getBreakpoint(), initVideo(), renderCaseStudy(), renderGallery() (+2 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (13): dependencies, alpinejs, @vercel/analytics, @vercel/speed-insights, devDependencies, tailwindcss, @tailwindcss/vite, typescript (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.43
Nodes (3): Contact(), Footer(), Hero()

### Community 4 - "Community 4"
Cohesion: 0.50
Nodes (4): scripts, build, dev, preview

## Knowledge Gaps
- **30 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `scripts` connect `Community 4` to `Community 2`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._