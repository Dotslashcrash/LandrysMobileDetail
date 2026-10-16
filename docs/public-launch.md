# Public release configuration

This branch preserves the cinematic build previously deployed from `921391ef6be8c1736969b1f2c48aaaefae60a70f`, including its four Azure email inquiry adaptations. It does not include the original checkout's uncommitted Zapier work. The direct Urable adapter remains unimplemented.

The proposed canonical origin is `https://landrysmobiledetail.com`. With `SITE_URL` set to this exact value, GET/HEAD requests on `www.landrysmobiledetail.com`, `landrysmobiledetail.net`, and `www.landrysmobiledetail.net` redirect with status 308, retaining the path and query. The Azure preview hostname remains available for operational checks. API, framework asset, and certificate validation paths bypass the redirect proxy. With the preview `SITE_URL`, no public alias redirects are enabled.

Before enabling public indexing, bind valid certificates for every hostname that will receive traffic. Export the complete authoritative DNS zone, preserve mail and unrelated records, and verify recoverable application/configuration artifacts. Keep the old hosting intact. Do not use the cached `possibleInboundIpAddresses` list as a DNS target; obtain the app's supported custom-domain IP from Azure's domain validation response.

The public build requires `SITE_URL=https://landrysmobiledetail.com` and `ALLOW_INDEXING=true`. Both affect generated metadata and require a new build. Keep analytics disabled unless a verified vendor integration and consent decision are supplied. `/book` remains noindex.

Run the release checks against the built server, with the expected metadata configuration supplied separately from the HTTP origin:

```powershell
$env:QA_ORIGIN='http://127.0.0.1:3100'
$env:QA_SITE_URL='https://landrysmobiledetail.com'
$env:QA_INDEXING='true'
npm run check:routes
```

For the preview build, use its Azure `QA_SITE_URL` and `QA_INDEXING=false`.

The owner explicitly chose visitor-sent email inquiry mode (`BOOKING_MODE=demo`) for this temporary launch, superseding server-side email setup and receiving-mailbox verification. Validation and preparation stay in the browser. The visitor must choose **Open email to send** and press Send in their email app. Copy and manual message selection provide a fallback; the page does not clear the draft or claim receipt/delivery. A successful form test proves preparation, encoding and preserved details, not email delivery. No mail credentials or permissions are needed for this workflow.

The separately recorded Zapier integration requires resolution of marketing/reminder defaults, lead classification, overwritten customer Notes, and asynchronous downstream failure handling. Do not enable it based on webhook acceptance alone. Saving inquiries to a local encrypted inbox also requires durable storage, keys, backups, and an agreed operator delivery/review path.

Azure App Service managed certificates can be added for a migrated live domain only after its traffic DNS is remapped. To avoid an invalid-HTTPS interval, use an already valid importable certificate or arrange an approved certificate issuance path before remapping traffic. Do not buy certificates or accept a new certificate authority agreement without authorization.

This document describes preparation; it does not assert that domain access, intake delivery, certificate binding, DNS cutover, or public launch has completed.
