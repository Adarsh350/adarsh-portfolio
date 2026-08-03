# Graph Report - .  (2026-08-03)

## Corpus Check
- 15 files · ~11,124 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 26 nodes · 26 edges · 5 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3

## God Nodes (most connected - your core abstractions)
1. `scripts` - 4 edges
2. `@tailwindcss/vite` - 2 edges
3. `tailwindcss` - 2 edges
4. `vite` - 2 edges
5. `initPlaceholders()` - 2 edges
6. `initVideoPoster()` - 2 edges
7. `getBreakpoint()` - 2 edges
8. `initVideo()` - 2 edges
9. `private` - 1 edges
10. `dev` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (5 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.31
Nodes (4): initPlaceholders(), initVideoPoster(), getBreakpoint(), initVideo()

### Community 1 - "Community 1"
Cohesion: 0.29
Nodes (7): devDependencies, tailwindcss, @tailwindcss/vite, vite, tailwindcss, @tailwindcss/vite, vite

### Community 2 - "Community 2"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 3 - "Community 3"
Cohesion: 0.50
Nodes (4): scripts, build, dev, preview

## Knowledge Gaps
- **10 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.220) - this node is a cross-community bridge._
- **Why does `scripts` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._