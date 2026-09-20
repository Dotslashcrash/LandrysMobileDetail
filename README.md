# Landry’s Mobile Detail

Cinematic mobile detailing foundation for Northwest Arkansas and the Arkansas River Valley. Next.js App Router, React, TypeScript, Zod, Node 24, and an encrypted SQLite local lead inbox.

## Run on this PC

Use Node.js 24 or newer, from this directory:

```powershell
npm install
npm run dev
```

Development: http://127.0.0.1:3000. Production:

```powershell
npm run build
npm run start
```

Production also uses http://127.0.0.1:3000. Stop development before starting production on the same port. The default binds only to this PC. Keep the hosting terminal running; this is not installed as a Windows service.

Optional, intentional LAN preview:

```powershell
npm run dev:lan
# Or after building:
npm run start:lan
```

These bind to `0.0.0.0`; use `http://<PC-LAN-IP>:3000` from another device. LAN mode was not enabled for delivery. No firewall rules or public tunnels are created. Do not port-forward this preview.

## Booking behavior and local inbox

The seven-step form collects vehicle, service interest, condition, location, preferred time, customer details, and consent. It sends `POST /api/leads`. Browser and server validation are independent. Dates use Arkansas time. Region selection requests manual coverage review; it is not ZIP-code coverage approval. No payment is collected.

`BOOKING_MODE=lead` (default) saves locally. `fallback` explicitly uses the same local inbox. `urable` saves first and then calls the integration adapter; the unconfigured adapter falls back safely. **No Urable request is currently sent, no live availability is fetched, and no appointment is confirmed.** A successful lead response always says `received`.

Records are AES-256-GCM encrypted in `private-data/leads.sqlite`. A random local key is created as `private-data/.encryption-key` if no environment key is supplied. Unique request IDs prevent duplicate records and duplicate provider delivery on retries. Changed payloads with the same request ID are rejected. Storage failures return a safe error and keep the form contents on screen; customer form details are not persisted in browser storage.

Review requests from the local terminal:

```powershell
npm run leads:read
```

This command decrypts and prints private customer data. Do not share its output. The operator must check this inbox: there are **no automatic email/SMS notifications or background retries**. Pending/fallback requests require manual reconciliation before provider resend, to avoid duplicate external records.

Keep the inbox and key private to the hosting Windows account. Encryption does not protect against someone with both. Back up the database and key together while the app is stopped, or use a SQLite-aware backup including WAL. Losing the key loses access to the records. Never commit them or place them in `public`. Set retention/deletion rules before collecting real public leads. Tests use isolated temporary storage with synthetic records.

## Environment

Copy `.env.example` to `.env.local` to customize Next.js. Defaults work without a file. When running `leads:read`, set matching storage/key variables in that shell if overriding them; the script does not automatically load `.env.local`.

| Variable                                                           | Purpose                                                             |
| ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `SITE_URL`                                                         | Trusted canonical origin, default `http://localhost:3000`           |
| `ALLOW_INDEXING`                                                   | Default `false`; enable only for an approved public release         |
| `BOOKING_MODE`                                                     | `lead`, `fallback`, or `urable`                                     |
| `LEAD_STORAGE_DIR`                                                 | Durable local directory, default `./private-data`                   |
| `LEAD_ENCRYPTION_KEY`                                              | Optional base64 32-byte AES key; otherwise a local key is generated |
| `URABLE_API_URL`, `URABLE_API_KEY`                                 | Internal placeholders; no verified endpoint/auth assumptions        |
| `URABLE_ACCOUNT_ID`, `URABLE_LOCATION_ID`, `URABLE_WEBHOOK_SECRET` | Internal placeholders pending actual requirements                   |
| `NEXT_PUBLIC_ANALYTICS_ENABLED`                                    | Internal event bridge only; no vendor is installed                  |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`                             | Optional Google verification token                                  |

Never prefix credentials with `NEXT_PUBLIC_`. Metadata/indexing changes require a new build.

## Architecture

- `src/app`: requested routes, metadata, sitemap, robots, branded loading/error/404, lead endpoint.
- `src/components`: editorial sections, navigation, accessible comparison slider, seven-step form.
- `src/data/business.ts`: typed services, market overrides, approved cities, gallery, reviews, FAQ, contacts, future content collections. Inquiry categories do not imply approved packages.
- `src/lib/booking-schema.ts`: shared vehicle/customer/location validation and request contract.
- `src/lib/lead-store.ts`: replaceable durable inbox with encryption and idempotency.
- `src/lib/submit-lead.ts`: persist-first delivery, fallback, and safe status responses.
- `src/integrations/urable`: adapter, capability types, config, mapping, location lookup/coverage boundary.
- `src/lib/analytics.ts`: finite event vocabulary without arbitrary customer values. UTMs stay in session storage and accompany only the private lead request.

Service routes derive from the catalog. Market pricing, duration, availability, travel rules, promotions, and approved municipalities have data slots; no city page or pricing is invented. Media supports categories, dimensions, captions, and before-image pairs. The keyboard-accessible comparison slider appears only when real pairs are populated. Reviews and unanswered FAQ entries remain hidden until approved.

## Completing Urable

1. Obtain actual account documentation, capabilities, credentials, and consent requirements.
2. Implement `createUrableAdapter()` using verified endpoints, authentication, payloads, and responses. Add finite timeouts and provider idempotency where documented. Never log customer data or credentials.
3. Populate verified `urableServiceId` and account/location mappings. `resolveServiceMapping` rejects absent mappings.
4. Verify sandbox delivery, errors, duplicate handling, and ambiguous outcomes before public use.
5. Implement availability/booking only if supported. Keep request mode until verified slots and actual confirmations can be returned. The success UI supports confirmed results, but this release never emits them.
6. Add webhooks only after signature verification and event schemas are known. No permissive webhook endpoint is included.

Before ephemeral/serverless hosting, replace or move the inbox to a durable database with protected keys, shared rate limiting, operator notifications, retention, and backups. The local process rate cap and honeypot are not a substitute for public abuse protection. Weather alerts, rescheduling, accounts, CMS, payments, and marketing automation remain future work.

## Missing owner content

- Approved packages, inclusions, durations, prices, add-ons, market variations.
- Confirmed city/ZIP coverage, travel rules, water/power/site requirements, weather and cancellation policies.
- Phone, email, social links, privacy contact, story/team details, final legal policies.
- Real customer photos with permission, matched before/after pairs, authentic reviews with sources.
- Urable documentation/configuration and approved analytics/consent requirements.

The generated vehicle image is explicitly identified as concept artwork, not portfolio evidence. Locally served Oswald uses the SIL Open Font License (`public/fonts/OFL.txt`). There are no third-party image/font requests. Responsive optimized images, lazy loading, and reduced-motion support are included. No Core Web Vitals score is claimed without field data.

## Validation

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

Tests cover invalid requests, encryption, duplicate prevention, provider fallback, origin/size checks, and storage failure. See `QA.md` for browser checks and launch dependencies. Work belongs on `codex/cinematic-foundation`; do not merge without owner instruction.
