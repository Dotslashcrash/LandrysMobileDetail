# Premium cinematic remaster

This revision starts from `287f501e44d356d7b94532bca37ba29b45c08010`. The local restore tag is `codex/restorepoint-premium-cinematic-20261001`. Package version remains 1.0.0; this is a new source revision rather than a replacement GitHub v1.0.0 release.

## Brand and content

The approved source is `Brand Kit-20260930T201308Z-1-001/Brand Kit`: Colors + Codes/LMD Color sheet.pdf; FONT/telegraf.zip and saira-condensed.zip; Logo/Trans_Logo and Elements; Logo/Logo + Elements_PNG; VECTOR; Landry_s MD Logo concept page.pdf; LMD Social vision.png.

The existing logo, fonts, original images, brand files, and globals.css remain unchanged. Yellow #FCED05, navy #053065, white #FFFFFF, and steel #99A5B3 remain the approved palette. Telegraf is licensed according to the owner.

The homepage, service catalog, all ten service pages, results, service area, about, contact, booking, and legal pages use automotive imagery and responsive compositions. Pricing is available by inquiry, with no numeric price rendering. All customer contact email links use info@landrysmobiledetail.com. Results photography is editorial design imagery, with no fabricated customer transformations or testimonials. Media selection and internal provenance remain centralized in src/content/photography.ts.

## Inquiry behavior and deployment boundary

The regular lead-storage/provider integration remains unchanged in the source repository. On the existing Azure demo, BOOKING_MODE=demo retains the established non-persistent backend behavior. The frontend explicitly prepares an email inquiry and tells the customer that the details have not been sent and no appointment is reserved. The customer reviews and sends the message using their email application.

The Azure package reapplies four existing backend adaptations: src/integrations/urable/config.ts, src/integrations/urable/types.ts, src/lib/submit-lead.ts, and src/app/api/leads/route.ts. This preserves the deployment's no-storage/no-provider behavior. No infrastructure, runtime settings, indexing policy, or paid services are changed. The package records its exact source commit in public/deployment.json.

## Media provenance

Two additional photographs were generated with the built-in ImageGen tool. They are design photography, not evidence of customer work. Existing approved assets were not replaced. Original PNGs were transcoded with Sharp into 1536x1024 WebP files at quality 86. Their paths are public/images/cinematic/paint-water.webp and public/images/cinematic/headlight.webp. The original generations are retained in the owner's Codex generated_images folder.

### Paint-water final prompt

Use case: photorealistic-natural. Asset type: supporting automotive website photography, single landscape photograph, no text. Macro editorial photograph of a dark charcoal black metallic car hood, dense realistic water beads catching a soft long white strip-light reflection. The curvature of the paint and fine metallic texture are visible; shallow depth of field, a few larger droplets near foreground in crisp focus, quiet dark background, cool neutral lighting, realistic exposure, cinematic automotive commercial camera quality. Frame mostly the physical surface, not an entire vehicle. Clean, precise geometry and naturally imperfect droplets. No humans, badges, logos, written text, collage, borders or watermarks. Landscape 1536x1024 composition, usable as a wide crop and vertical close detail. This is design photography, not evidence of a completed customer job.

### Headlight final prompt

Use case: photorealistic-natural. Asset type: supporting automotive website photography, single landscape photograph, no text. Close editorial photograph of a clear modern headlight lens in a black car body, seen from a low three-quarter angle in a shaded driveway. Realistic optical reflector housings and glass geometry, controlled white reflection across the lens, a small amount of the wet black paint and front bumper visible. The headlight is unlit, clear and physically believable. Restrained cool ambient daylight, true black paint with detail in shadows, crisp lens detail and soft out of focus background. Premium automotive commercial photography. No before-and-after split, no restoration claim, no technician, no brand badge, no text, no collage, no watermark. Landscape 1536x1024 composition with the lens occupying the middle and right, usable as a large service photograph. This is design imagery, not a customer job.

## Validation

Source lint, typecheck, six unit/integration tests, and optimized Next.js build passed. The Azure overlay also passed lint, typecheck, build, and seven tests, including a check that demo submission never calls storage or the provider. Browser review covered 19 routes at eight viewport sizes (152 layout checks), desktop and mobile seven-stage booking journeys, all ten service preselection cases, keyboard/menu controls, and 397 links including 37 CTA instances. All 19 pages were scrolled and reviewed at desktop and phone sizes. The two added WebP photographs total about 440 KiB; responsive Next Image delivery, lazy loading of supporting media, and reduced-motion behavior are retained.

The deployment's runtime evidence, exact package hash, live checks, screenshots, and full completion report are retained under the ignored .sites-runtime/azure-remaster and .sites-runtime/premium-cinematic-qa folders. These contain local QA artifacts and are not included in the public package.
