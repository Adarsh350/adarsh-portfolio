> Machine/env landmines live in ~/.codex/knowledge/domain_*.md — check there first.

## 2026-09-01

- Desktop redesign deleted `components/Projects.tsx` while `app/desktop/page.tsx` still imported it, breaking `npm run build`. Keep the page assembly import synchronized with the replacement `Experience` component and its `AdditionalExperience` dependency.

## 2026-09-02 — Pin Turbopack to the repository root

- **Symptom:** Next.js selected an unrelated parent `package-lock.json` and warned that it was outside the Git repository.
- **Fix:** Set `turbopack.root` to `process.cwd()` in `next.config.ts` so dependency tracing is scoped to this project.
- **Prevention:** When a Windows projects directory contains its own lockfile, explicitly pin the Turbopack root in nested Next.js repositories.

## 2026-09-02 — Match verification commands to installed CLIs

- **Symptom:** PowerShell 5 rejected `Invoke-WebRequest -SkipHttpErrorCheck`, and the accessibility scripts rejected flags documented by their skill guide.
- **Fix:** Captured HTTP error responses through `try/catch` and used the scripts' actual `--help` signatures (`--format text` and positional colors).
- **Prevention:** Check locally installed command help before relying on version-sensitive PowerShell or skill examples.

## 2026-09-02 — Use the browser CLI's current full-page flag

- **Symptom:** `--full-page` was interpreted as a screenshot filename instead of an option.
- **Fix:** Used `screenshot <path> --full`, the syntax supported by the installed browser CLI.
- **Prevention:** Confirm screenshot flags in the installed skill before writing artifacts into the repository.

## 2026-09-02 — Inspect the index before an atomic commit

- **Symptom:** Three previously staged Vite asset deletions leaked into the documentation commit.
- **Fix:** Restored those exact assets from the parent commit, amended the documentation commit, then restaged the deletions for the implementation commit.
- **Prevention:** Run `git diff --cached --stat` immediately before every commit and unstage unrelated paths before selectively staging the intended commit.

## 2026-09-02 — Test acceptance criteria at every responsive breakpoint

- **Symptom:** The first implementation hid navigation and project proof on mobile, placed availability after the primary actions, and omitted secondary contact links and explicit new-tab labels.
- **Fix:** Added a two-row mobile navigation, pre-action mobile status, persistent project proof, complete contact links, screen-reader new-tab labels, expandable certifications, deployment-derived metadata, and restored metric qualifiers.
- **Prevention:** Translate content, accessibility, and breakpoint requirements into rendered assertions before the final review, not only visual inspection.
