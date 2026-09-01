> Machine/env landmines live in ~/.codex/knowledge/domain_*.md — check there first.

## 2026-09-01

- Desktop redesign deleted `components/Projects.tsx` while `app/desktop/page.tsx` still imported it, breaking `npm run build`. Keep the page assembly import synchronized with the replacement `Experience` component and its `AdditionalExperience` dependency.
