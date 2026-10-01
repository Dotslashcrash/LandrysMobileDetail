# Approved brand sources and overhaul boundary

The September 30 owner-supplied brand kit and completed brand refresh are the source of truth. Telegraf is fully licensed, as confirmed by the owner. The overhaul consumes these sources without rewriting them.

## Immutable repository files

- `public/brand/logo.webp`: approved header logo.
- `public/brand/logo-family.webp`: approved logo with family descriptor.
- `public/brand/submark.webp`: approved LD artwork.
- `public/brand/speedline.webp`: approved supporting artwork.
- `public/brand/apple-touch-icon.png` and `public/favicon.svg`: approved icons.
- All files in `public/fonts`, including Saira Condensed, Telegraf, and existing license files.
- `public/images/hero.webp`: existing concept vehicle image; never customer portfolio evidence.
- `src/app/globals.css`: approved font faces, font assignments, palette/theme variables, button treatment, logo treatment, focus colors, and base styling. This entire file is frozen for this overhaul.

`src/app/cinematic.css` supplies page composition and responsive hierarchy using existing variables. It defines no second palette or font system. Branded buttons retain their fonts, color, and shape; hover is now a quiet underline, without movement or a new shade. Logo artwork, proportions, and the approved panel treatment remain intact. Existing concept imagery is visibly disclosed and never presented as customer work.

## Protected functionality

`src/lib`, `src/integrations/urable`, the leads API, robots, sitemap, `.env.example`, and `next.config.ts` remain unchanged. Forms retain their workflow, request payload, validation, attribution, encrypted storage, idempotency, and Urable fallback behavior. The human remaster rewrites descriptions and the customer-photos title while preserving canonical handling, unique page titles, social metadata, indexing gates, and business schema. The only earlier authorized change to `src/data/business.ts` was the owner's instruction to use `info@landrysmobiledetail.com`. The entire data file remains byte-identical to the human-remaster checkpoint. Phone and social fields remain unset; service and portfolio data remain unchanged.

## Restore point

Original HEAD: `4c412bceab41ab6f78b82fa9892316b76eb4ec96`.

The original HEAD did not contain the completed brand refresh. A separate local checkpoint includes all tracked and non-ignored untracked source files, including that uncommitted work:

- Ref: `codex/restorepoint-brand-lock-20260930`.
- Commit: `207d1d8f447174fddee794b3f0f59941e8de125d`.
- Original branch, status, index copy, and SHA-256 manifest: ignored `.sites-runtime/restore-points/2026-09-30-pre-overhaul/`.

The checkpoint used a separate index; it did not stage, reset, or discard the working tree. No local environment files or application inbox records existed at the checkpoint. Dependencies and build output are reproducible from the checkpoint lockfile.

To inspect the starting website without altering this checkout, create a separate local worktree from the checkpoint ref. Do not reset the active checkout as a routine restore procedure.

## Human-remaster checkpoint

The subsequent full-site audit preserves the completed overhaul, including all uncommitted brand and application work:

- Ref: `codex/restorepoint-human-remaster-20260930`.
- Commit: `d516b37c4ec6b7156b500187ab8b735a2b1d5788`.
- Branch and original HEAD remain `codex/cinematic-foundation` and `4c412bceab41ab6f78b82fa9892316b76eb4ec96`.
- Original index, checkpoint index, status, and hashes: `.sites-runtime/restore-points/2026-09-30-pre-human-remaster/`.
- All 16 protected brand files and 16 protected functionality files match that manifest after the remaster.

Older decorative rules inside `globals.css` remain frozen, even where their components are unused. The replacement composition stylesheet removes obsolete layouts and does not activate those old rules. No approved asset was deleted or regenerated.
