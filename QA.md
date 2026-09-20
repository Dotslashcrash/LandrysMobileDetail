# Foundation QA

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
