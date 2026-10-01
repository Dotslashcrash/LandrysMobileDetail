# Foundation QA

## Version 1.0.0 release — September 30, 2026

The owner authorized publishing the completed site to GitHub `main` as version 1. Package and lockfile versions are `1.0.0`; the release tag is `v1.0.0`. This source release includes the approved brand kit, cinematic composition, human remaster, and contact email. It does not deploy or reconfigure Azure. The implementation reports below retain their original local-only status as historical validation records.

Release checks passed with the `1.0.0` package: lint, TypeScript, all six unit/integration tests, production build, and 19-page route/metadata/asset checks. The full browser regression below remains applicable; release preparation changes only version metadata and release documentation. GitHub has no Actions workflows or branch rules configured for this repository, so these checks ran locally. The normal local production preview was restarted after the release build.

## Full-site human remaster — September 30, 2026 (implementation validation)

The current local preview is http://127.0.0.1:3000/. This report supersedes the earlier visual overhaul below. The approved brand, service catalog, request payload, backend, and integration seams are preserved. No push or deployment was performed.

1. **Starting state and rollback.** Branch `codex/cinematic-foundation`, starting HEAD `4c412bceab41ab6f78b82fa9892316b76eb4ec96`. Checkpoint `d516b37c4ec6b7156b500187ab8b735a2b1d5788`, ref `codex/restorepoint-human-remaster-20260930`, includes all tracked and non-ignored untracked work present before this pass. A separate Git index preserved the original staging state. Status, both index copies, and the SHA-256 manifest are retained under `.sites-runtime/restore-points/2026-09-30-pre-human-remaster/`.

2. **Brand sources.** The supplied brand kit is the source of truth. Protected repository files are all `public/brand` artwork, `public/fonts` assets/licenses, `public/favicon.svg`, the existing `public/images/hero.webp`, and the entire `src/app/globals.css`. The approved palette is yellow `#FCED05`, navy `#053065`, white `#FFFFFF`, and steel `#99A5B3`; approved fonts remain Saira Condensed and licensed Telegraf. Full boundaries are in `docs/brand-lock.md`.

3. **Brand regression.** All **16 brand files** match their checkpoint SHA-256 hashes. All **16 protected functionality files**, including the complete business catalog/contact file, also match. No logo, font, brand asset, root variable, font-face, environment file, schema, integration adapter, or backend implementation was rewritten. Composition uses existing variables. Logo proportions and the approved panel shape remain intact.

4. **Review coverage.** Reviewed all 19 normal routes, every header/footer and mobile-menu variant, homepage hero/services/appointment narrative, all ten service pages, results/empty portfolio, service area and all published FAQ answers, about, contact, privacy, terms, and all seven request stages. Reviewed placeholders, labels, accessible names, validation, saved-request success, retry error, metadata, loading/error/404 source, and rendered 404 behavior. A healthy app did not naturally invoke the global error boundary or loading screen; those were source/build-reviewed rather than represented as live failure tests.

5. **Visual findings.** The former homepage measured 6,218 pixels at desktop, with six photographs, repeated fragment headings, a coverage/FAQ/closing-banner sequence, large empty dark areas, and repeated images. Services measured 5,029 pixels; specialty pages reused the same coupe and two generic content panels. Booking combined a photograph, full stage rail, progress bar, repeated notices, and a duplicate floating mobile CTA.

6. **Visual remaster.** The vehicle opens the homepage beside the brand-kit message, followed by a white service-selection section and a wash/appointment section. Desktop homepage height is about **2,144 pixels**, services about **1,626 pixels**. Removed the giant closing banner, repeated service photographs, image-led empty portfolio, three-image About composition, contact decoration, unnecessary arrows, infinite image motion, hover movement, shadows, and duplicate floating booking bar. Other pages use the approved white/navy contrast and practical reading widths. No new gradients, glows, glass panels, decorative counters, bento blocks, or accent colors were added.

7. **Copy findings.** Repeated triplet slogans included “Your car. Your driveway. Our standard.” and “The paint. The cabin. The whole vehicle.” The same scope paragraph appeared on every service page. “Customer work is on its way” implied a portfolio publication plan that was not established. Form and page copy repeatedly described inquiry mechanics and scheduling caveats instead of helping the customer describe the vehicle.

8. **Copy remaster.** Homepage now uses the supplied “We come to you.” message and approved home/workplace positioning. Service pages have distinct questions about seats, carpet, paint marks, existing protection, headlights, maintenance, and additional work. Results plainly says no customer photos are published. Contact leads with `info@landrysmobiledetail.com`; About uses the approved Stidham family descriptor without inventing a history. Metadata and legal preview copy were read and remastered. Remaining words such as “where,” “whether,” and “difference” refer to an actual address, coating, headlight condition, or service distinction; they are not slogan formulas. Unrendered legacy slogans in the protected data file remain unused rather than violating the data freeze.

9. **Booking.** Preserved Vehicle → Service → Condition → Location → Preferred Time → Customer → Review, all validation, field constraints, preselection, attribution, consent, payload, idempotency, storage, and future Urable behavior. Replaced the photo/stage rail with one form column, a thin progress bar, and a collapsible “Change earlier details” control. Choices are native radios/checkboxes without cards. Instructions are shorter. Success states receipt and unconfirmed timing, with optional request details and a reference. Error retains the draft and enables retry. Real confirmed-response handling remains intact but cannot be exercised against an unconfigured provider.

10. **Mobile.** The opening vehicle remains visible before the headline. White service content reads as text and useful links, with photographs used only in relevant contexts. Form fields become one column at phone widths. Header menu and booking targets are at least 44 pixels tall; the header remains fixed and its content clearance matches each breakpoint. Removed the duplicate bottom booking bar and its footer padding. Legal, email, service, and request-summary text fit the 320-pixel viewport.

11. **Cleanup.** Removed the obsolete `FinalCTA`, `Coverage`, and `Process` section components, old image-per-service story layout, `servicePhotograph` fallback helper, request stage-rail markup, decorative icon imports, floating booking component, and its scroll-state listener. Replaced the old composition stylesheet, removing abandoned selectors. `ServiceList` is now a simple, shared content list; service-specific writing lives separately in `src/content/service-copy.ts`. References were checked before removal.

12. **Intentional retention.** Exact approved logos, fonts, button shape/stripe, and brand colors provide the identity. Three existing concept photographs remain on the homepage, and the interior image appears on the interior page; every use is labeled, and none enters the customer portfolio. Real photography was not supplied, so no replacement customer work was fabricated. Native FAQ plus signs, menu controls, form progress, summary rules, and the before/after control serve interaction or comprehension. Customer-gallery/review publication branches remain ready for approved content. Obsolete base styles inside the locked `globals.css` are retained but not activated.

13. **Checks run.** `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run check:routes`, and the CUA-connected `scripts/browser-regression.mjs`. Browser work includes full-page scrolling, link and CTA clicks, menu/FAQ keyboard use, booking validation and editing, a native pointer hover check, safe local submissions, forced storage failure, retry, focus/scroll behavior, and metadata/image/layout checks. The QA contact-sheet helper's CommonJS import lint errors were corrected; final lint passes.

14. **Results.** Lint, types, production build, route checks, and all **six unit/integration tests** pass. The final build passes **152 route/viewport checks**. Inspected **372 rendered links**, **32 unique targets**, and clicked **33 branded CTA instances**. All seven mobile-menu destinations pass. Request tests pass **38 checks on desktop and 38 on phone**, plus empty-service validation. Two synthetic requests were decrypted from the isolated inbox and verified complete with local delivery. A failed write displayed an error, retained details, and succeeded on retry without a false booking confirmation.

15. **Browser sizes.** Checked 1920×1080, 1440×900, 1280×720, 1024×768, 820×1180, 430×932, 390×844, and 320×740. All 19 pages were read and scrolled end-to-end at desktop and phone widths, with screenshots inspected; tablet and large-screen compositions were also reviewed. The form's desktop and phone review/error/success states were inspected separately.

16. **Routes.** `/`, `/services`, all ten `/services/{id}` routes, `/results`, `/service-area`, `/about`, `/book`, `/contact`, `/privacy`, `/terms`, and the `/#process` anchor. Route checks also verify 404 responses, private-file isolation, brand/image/font asset responses, robots, sitemap, unique titles, descriptions, social metadata, canonical tags, and the demo's noindex setting.

17. **Forms and contact.** Vehicle year, whitespace, required fields, service selection, conditions, ZIP, date limits, phone, email, consent, optional trim/notes, refresh behavior, earlier-stage edits, region/service query preselection, and back/forward journeys pass. Test customer email was `regression@example.invalid`; business mailto links use only `info@landrysmobiledetail.com`. Requests were submitted with `BOOKING_MODE=lead` and `.sites-runtime/human-remaster-test-inbox` storage. The preview was then restored to normal configuration; no synthetic requests were placed in the default customer inbox or sent to an external provider.

18. **Known limits.** No authentic customer portfolio, approved reviews, prices/durations, municipal coverage list, staffing/history claims, or final public legal policies were supplied. Urable, live slots, automatic notifications, address autocomplete, and distance calculation remain unconfigured. The existing invalid-service probe returns 404 but logs Next.js `Internal: NoFallbackError`; this predates the remaster. Form validation and fallback behavior are verified, while an actual third-party confirmed appointment is not. No new functional regression is known from the completed checks. The retained concept photographs remain a limitation for a fully authentic public portfolio.

19. **Diff.** Against checkpoint `d516b37c4ec6b7156b500187ab8b735a2b1d5788`: **23 files, 1,208 insertions, 1,210 deletions**. The separate review index includes untracked source files. The diff covers page composition/copy, navigation/footer presentation, request presentation, the service-copy registry, the existing browser QA harness, and documentation. Existing pending brand-refresh/dependency work is preserved and is not attributed to this remaster. `git diff --check` passes.

20. **Final Git state.** No implementation commit was made. HEAD remains `4c412bceab41ab6f78b82fa9892316b76eb4ec96` on `codex/cinematic-foundation`; rollback checkpoint `d516b37c4ec6b7156b500187ab8b735a2b1d5788` is retained locally. Nothing was pushed or deployed. Review screenshots, rendered copy/metadata, regression results, and hash/storage verification are in ignored `.sites-runtime/human-remaster-qa/`.

## Earlier cinematic overhaul — September 30, 2026 (historical)

This report covers the overhaul relative to the brand-lock restore point, including the owner's later instruction to use `info@landrysmobiledetail.com` for all business contact information. The changes are local and reviewable at http://127.0.0.1:3000/. No push or deployment was performed.

1. **Visual changes.** Kept the original vehicle hero and core message, then replaced the numbered, card-heavy presentation with large wheel/interior photographs, varied image widths, open service copy, a single driveway/process narrative, quieter regional information, and an image-led booking invitation. About, contact, service, results, legal, loading, error, and not-found screens now use straightforward copy without repeated eyebrows. The results page explicitly distinguishes concept imagery from future customer work.

2. **Major components.** Reworked `editorial.tsx` (services, process, coverage, testimonials, page introductions, final CTA), `shell.tsx` (navigation/footer), `booking-form.tsx` (presentation and focus), all customer pages, and the layout's skip-link target. Added `photograph.tsx`, `src/content/photography.ts`, and `cinematic.css`. Image records can be replaced with permission-cleared real photography without changing the service catalog. Existing comparison logic remains untouched.

3. **Brand files untouched.** SHA-256 comparisons against the pre-edit manifest confirm all **16 locked files are byte-for-byte unchanged**. This includes the entire approved `globals.css`; layout styling lives separately and defines no additional color variables, font faces, or palette.

4. **Source-of-truth files.** The owner-supplied kit is `C:/Users/house/Downloads/Brand Kit-20260930T201308Z-1-001/Brand Kit`, including Colors + Codes, FONT, Logo, VECTOR, the logo concept PDF, and social vision PNG. Repository sources are `public/brand/logo.webp`, `logo-family.webp`, `submark.webp`, `speedline.webp`, `apple-touch-icon.png`, `public/favicon.svg`, all `public/fonts` files, `public/images/hero.webp`, and `src/app/globals.css`. See `docs/brand-lock.md` for the boundary.

5. **Brand implementation.** Approved logo proportions, icons, yellow/navy button treatment, and colors remain intact: yellow #FCED05, navy #053065, white #FFFFFF, steel #99A5B3, and the existing approved background/surface tokens. Browser-computed typography confirms Saira Condensed headings and Telegraf body/interface text. Telegraf's license is owner-confirmed. No logo regeneration, font substitution, competing tokens, glow, or new accent palette was introduced.

6. **Numbering removed.** Removed service catalog numbers, process numbers, section/scene-style labels, the booking sidebar's leading-zero markers, visible “STEP … / 07,” and percentage readouts. Named request stages and a thin bar replace numeric progress. All 19 rendered routes passed decorative-number detection at every tested width. Actual years, dates, request references, and copyright years remain. Unused legacy selectors remain in the locked base stylesheet, but no numbered UI uses them.

7. **Booking changes.** All seven stages, state transitions, validation, request payload, attribution, event hooks, server timeout, durable encrypted persistence, retry/idempotency protection, and Urable integration seams remain. The form now uses a quiet title, named stage links, unboxed choices, and normal field labels. Errors are announced, and successful submission moves keyboard focus to the success heading and scrolls to the top. “Request received” explicitly does not confirm an appointment. Only the contact email changed in business data, as directly instructed by the owner.

8. **Mobile changes.** Navigation becomes a useful menu before desktop labels crowd the header. Every mobile destination and Escape/close behavior was checked. The booking action remains visible in the header, with the existing sticky booking action available after scrolling. Photography crops, service widths, narrative flow, form spacing, and active/completed stage labels adapt to mobile. Input metadata preserves numeric year/ZIP entry, native dates, and phone/email keyboard hints.

9. **Performance.** New concept WebPs are 1536 × 1024: wheel image 286,512 bytes and interior image 145,784 bytes, about 422 KiB combined. They use responsive Next Image delivery; below-fold images are lazy, and primary page images are eager where appropriate. No video background or animation library was added. Motion is limited to a slow hero push and small image hover transition. Field Core Web Vitals and a physical-device performance score were not measured.

10. **Accessibility.** Checked one main heading per page, image alt attributes, concept disclosures, form labels, native/schema errors, keyboard skip-to-content focus, FAQ keyboard activation, navigation Escape behavior, stage-heading focus, success focus, and viewport overflow. Navigation now uses a solid approved background, and photo credits have a subtle bottom scrim for contrast. Approved token contrast ratios are steel/background 7.66:1, steel/surface 6.52:1, white/navy 12.99:1, and navy/yellow 10.67:1. Reduced-motion rules were inspected in the rendered stylesheet; OS-level emulation, real phone keyboards, and a full assistive-technology certification were not available in this connected browser.

11. **Automated checks.** `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check:routes`, and all **six backend tests** pass. Added and ran `scripts/browser-regression.mjs` through the connected browser: **152 route/viewport checks**, **369 rendered links**, **33 unique navigation targets**, **44 branded CTA instances clicked**, all seven mobile menu destinations, and **38 request-stage/validation checks**, plus unselected-service validation. Primary homepage/services/book, service/book, contact/book, and mobile menu journeys pass. Browser console inspection showed no warnings or errors during final page checks.

12. **Routes checked.** All 19 pages were browser-tested at 1920×1080, 1440×900, 1280×720, 1024×768, 820×1180, 430×932, 390×844, and 320×740: home, services, results, service-area, about, book, contact, privacy, terms, and all ten service pages (exterior-detail, interior-detail, full-detail, maintenance-detail, paint-enhancement, paint-correction, ceramic-protection, headlight-restoration, specialty-services, add-ons). HTTP checks cover titles/descriptions/canonicals/Open Graph/Twitter metadata, expected 404s, private-file isolation, robots, sitemap, fonts, icons, and image endpoints. Existing metadata values are preserved; verified email was added to the existing business schema.

13. **Forms checked.** The seven-stage request is the site's only form. Checked empty required fields, whitespace, invalid year/phone/email/ZIP, no service/condition selection, past and out-of-range dates, valid dates, dropdowns, radios, checkbox check/uncheck, optional trim, long notes, review values, consent, back/edit/forward progression, service/market preselection, and refresh clearing the customer draft. Completed actual desktop/mobile submissions in an isolated inbox. A deliberately invalid test encryption key caused a safe storage error; details stayed present and retry succeeded after restoring storage. All three synthetic records decrypted with the expected fields, consent, and campaign attribution; plaintext email was absent from the database bytes.

14. **Existing limitations preserved.** No authentic customer photography, approved reviews, municipal coverage list, package prices/durations, founder story, or final legal policies were supplied. Concept images are labeled and never inserted into the customer gallery. Urable/live availability, automatic notifications, address autocomplete, and distance calculation remain unconfigured. The existing invalid-service probe correctly returns 404 while Next.js logs `Internal: NoFallbackError`; normal routes pass. This behavior predates the overhaul. No new regression is known from the checks performed.

15. **Git diff.** Changes relative to the rollback checkpoint affect 28 files: page composition, shared UI, the authorized email, two new WebPs, image records/component, composition CSS, browser QA coverage, route asset checks, and documentation. There are no brand asset deletions or backend/integration changes. A separate temporary index includes all untracked source assets when producing the review diff, without staging the real working tree.

16. **Rollback point.** Original HEAD is `4c412bceab41ab6f78b82fa9892316b76eb4ec96`. The complete pre-overhaul brand refresh, including uncommitted work, is saved at **`207d1d8f447174fddee794b3f0f59941e8de125d`**, ref `codex/restorepoint-brand-lock-20260930`. The original index, status, and file hash manifest are in ignored `.sites-runtime/restore-points/2026-09-30-pre-overhaul/`.

17. **Final state.** No final implementation commit or push was made. HEAD remains the original source commit on `codex/cinematic-foundation`, with the changes in the working tree. The production preview is loopback-only, uses normal configured storage, and no test encryption/storage overrides remain in that process. Three synthetic verification records remain isolated in `.sites-runtime/cinematic-test-inbox`; they are not in the application inbox.

### Evidence and repeatable browser checks

Screenshots and machine-readable layout, link, brand, and request results are saved in ignored `.sites-runtime/cinematic-qa/`. Preview logs and process ID are in `.sites-runtime/cinematic-preview*.log` and `.sites-runtime/brand-preview.pid`.

The connected browser runner deliberately uses the documented CUA APIs rather than launching another browser. In a cua_repl session with a local preview tab and viewport capability:

```js
const qa =
  await import("file:///C:/Users/house/OneDrive/Documents/ChatGPT/LandrysMobileDetail/scripts/browser-regression.mjs");
await qa.runLayoutChecks(tab, viewport, qa.viewports.slice(0, 4));
await qa.runLayoutChecks(tab, viewport, qa.viewports.slice(4));
await qa.runPrimaryJourneys(tab, viewport);
await qa.runLinkChecks(tab, viewport);
await qa.runMobileNavigation(tab, viewport);
await qa.runUnselectedServiceCheck(tab);
await qa.runRequestJourney(tab); // stops at review, does not submit
```

Run `submitRequest` only against a preview started with an isolated `LEAD_STORAGE_DIR` and lead mode. For the error branch, use an intentionally invalid test-only encryption key, call `submitRequest(tab, "error")`, restore storage, then retry without reloading the form. Reset viewport overrides after testing.

The new imagery was created with built-in `image_gen.imagegen`. Exact prompts and optimized project paths are recorded in `docs/concept-image-manifest.json`; generated originals remain in the owner's Codex generated-images directory. Source brand artwork was not edited.

---

## Brand kit refresh — September 30, 2026

Verified the local production build on this Windows PC using the supplied September 30 brand kit.

- Applied the supplied navy/yellow logos, family descriptor, LD submark, yellow speedline, exact color-sheet palette, Saira Condensed headings, and licensed Telegraf body/interface fonts. Original logo artwork is trimmed and losslessly optimized without recoloring. Saira’s OFL is included; the owner confirmed Telegraf is fully licensed.
- Preserved the cinematic vehicle image, full-screen hero, editorial sections, reduced-motion rules, and appointment-request behavior.
- `npm run lint`, `npm run typecheck`, all six existing booking tests, and `npm run build`: pass.
- `npm run check:routes`: all 19 pages, metadata, expected 404s, private-file isolation, and all newly added brand/font assets pass.
- Browser inspected at the normal 1280 × 720 viewport, 820 × 1180 tablet, 390 × 844 mobile, and 320 × 740 narrow mobile. All 19 pages were checked for horizontal overflow and out-of-bounds headings/buttons/form controls at 320 pixels; none found. Header and hero button were rechecked after final responsive adjustments.
- Checked mobile/tablet navigation, process-anchor navigation, footer logo, mobile booking screen, and advancing from vehicle details to service choices using synthetic data. This browser check stopped before submitting a request. The automated tests use isolated temporary storage.
- Browser console inspection reported no warnings or errors during the brand preview checks. Production requests return successfully. Probing `/services/not-a-service` produces a Next.js internal `NoFallbackError` server log while correctly returning HTTP 404. The other expected 404 probes and ordinary page requests do not add errors to the server log.
- Updated Next.js and its ESLint config from the locked 16.3.5 release to 16.3.8 after installation flagged [GHSA-vcvr-r3jv-pc5j](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j). The app does not implement the advisory’s attacker-controlled `next/og` image route. The resulting dependency audit reports zero known vulnerabilities.
- Production preview runs at http://127.0.0.1:3000, bound to loopback, with logs and its process ID in ignored `.sites-runtime/brand-preview*` files. Changes are local on `codex/cinematic-foundation`.

The checks below record the original foundation delivery; they are historical evidence.

Verified September 19, 2026 (Pacific), on this Windows PC.

## Automated

- `npm run lint`: pass.
- `npm run typecheck`: pass.
- `npm test`: six tests pass, including multiple invalid-input cases, AES-encrypted persistence, duplicate/retry protection, Urable failure preservation, provider success remaining a lead, origin checks including 127.0.0.1, size limits, and storage failure without false success.
- `npm run build`: clean production build; 24 static build entries including framework entries.
- `npm run check:routes`: 19 pages return 200 with unique titles, descriptions, canonical/Open Graph/X metadata; unknown pages and services return 404; private database/key paths are not publicly served; robots, sitemap, favicon, font, WebP, and optimized image endpoint pass.
- `npm audit`: zero known vulnerabilities at install verification. Final production dependency audit also reports zero.

## Browser checks

- Inspected desktop hero at the normal app viewport, tablet at 820 × 1180, mobile at 390 × 844, and narrow mobile at 320 × 740.
- All required pages and ten service pages checked for narrow-screen overflow; corrected the privacy heading and verified the fix.
- Mobile navigation open/close and booking navigation work. Header booking, home return, and process anchor verified.
- Completed all seven form steps using synthetic data. Native required-field validation and condition validation verified. Date picker used via its accessible settable control.
- Review screen displayed vehicle, condition, location, time, and customer details accurately.
- An origin-check failure kept the entered form intact; fixed localhost/127.0.0.1 handling, retried, and reached the premium success screen with an actual stored reference. It explicitly said the requested time was not booked.
- Removed only that synthetic browser record after verification. Backend test data remains in an isolated OS temporary directory, outside the application inbox.
- Production console showed no warnings or errors during page inspection. Earlier image-quality, eager-loading, and smooth-scroll development warnings were corrected.
- Responsive image URLs, eager hero loading, below-fold lazy loading, and local font delivery inspected.
- Reduced-motion CSS was inspected in the production browser stylesheet: animation/transition disabled, hero transform removed, smooth scrolling disabled. OS-level reduced-motion emulation was not available in the connected preview, so this is a rule inspection rather than a physical-device accessibility certification.

## Delivery

- `npm run start` runs in a hidden Windows process at http://127.0.0.1:3000.
- Loopback binding only. No LAN mode, firewall change, port forwarding, cloud publishing, or default-branch merge.
- Runtime output: ignored `production.log` / `production-error.log`.
- Preview indexing disabled by default.

## Launch dependencies

Urable delivery/live availability, notifications, address autocomplete/distance calculation, authentic portfolio pairs, approved reviews, approved package details/pricing, confirmed municipal coverage, verified contact details, and final privacy/business terms are not supplied or activated. See README for exact configuration boundaries. No live CRM behavior, field performance score, or unverified business claim is represented as complete.
