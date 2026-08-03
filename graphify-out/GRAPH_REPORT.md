# Graph Report - .  (2026-08-03)

## Corpus Check
- 26 files · ~13,299 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 75 nodes · 81 edges · 14 communities (7 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `scripts` - 4 edges
3. `lib` - 3 edges
4. `@tailwindcss/vite` - 2 edges
5. `tailwindcss` - 2 edges
6. `typescript` - 2 edges
7. `vite` - 2 edges
8. `alpinejs` - 2 edges
9. `App()` - 2 edges
10. `Contact()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (14 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (17): src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, module, moduleDetection, moduleResolution (+9 more)

### Community 1 - "Community 1"
Cohesion: 0.17
Nodes (11): alpinejs, dependencies, alpinejs, name, private, scripts, build, dev (+3 more)

### Community 2 - "Community 2"
Cohesion: 0.22
Nodes (9): devDependencies, tailwindcss, @tailwindcss/vite, typescript, vite, tailwindcss, @tailwindcss/vite, typescript (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.31
Nodes (4): initPlaceholders(), initVideoPoster(), getBreakpoint(), initVideo()

### Community 4 - "Community 4"
Cohesion: 0.43
Nodes (3): App(), Contact(), Footer()

### Community 5 - "Community 5"
Cohesion: 0.67
Nodes (3): DOM, ES2023, lib

## Knowledge Gaps
- **29 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+24 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `compilerOptions` connect `Community 0` to `Community 5`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._