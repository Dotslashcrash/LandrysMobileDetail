import assert from "node:assert/strict";
import { services } from "../src/data/business";
import { photography } from "../src/content/photography";
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:3000";
const canonical = process.env.QA_SITE_URL || origin;
const indexing = process.env.QA_INDEXING === "true";
async function main() {
  const pages = [
    "/",
    "/services",
    ...services.map((s) => `/services/${s.id}`),
    "/results",
    "/service-area",
    "/about",
    "/book",
    "/contact",
    "/privacy",
    "/terms",
  ];
  const titles = new Set<string>();
  for (const route of pages) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `title ${route}`);
    assert.ok(!titles.has(title), `unique title ${route}`);
    titles.add(title);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /name="description"/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /name="twitter:card"/);
    assert.match(
      html,
      indexing && route !== "/book"
        ? /name="robots" content="index, follow"/
        : /noindex/,
    );
    const expectedCanonical = new URL(route, canonical).href.replace(/\/$/, "");
    assert.ok(
      html.includes(`rel="canonical" href="${expectedCanonical}"`) ||
        html.includes(`rel="canonical" href="${expectedCanonical}/"`),
      `canonical ${route}`,
    );
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  }
  for (const route of [
    "/404",
    "/services/not-a-service",
    "/private-data/leads.sqlite",
    "/private-data/.encryption-key",
  ])
    assert.equal((await fetch(origin + route)).status, 404, route);
  assert.match(
    await (await fetch(origin + "/robots.txt")).text(),
    indexing ? /Allow: \// : /Disallow: \//,
  );
  assert.match(
    await (await fetch(origin + "/sitemap.xml")).text(),
    /services\/full-detail/,
  );
  for (const asset of [
    "/favicon.svg",
    "/fonts/saira-condensed-semibold.ttf",
    "/fonts/saira-condensed-bold.ttf",
    "/fonts/saira-condensed-extrabold.ttf",
    "/fonts/telegraf-regular.otf",
    "/fonts/telegraf-ultrabold.otf",
    "/brand/logo.webp",
    "/brand/logo-family.webp",
    "/brand/submark.webp",
    "/brand/speedline.webp",
    "/brand/apple-touch-icon.png",
    ...Object.values(photography).map((image) => image.src),
    `/_next/image?url=${encodeURIComponent(photography.vehicle.src)}&w=640&q=85`,
  ])
    assert.equal((await fetch(origin + asset)).status, 200, asset);
  console.log(
    `PASS: ${pages.length} pages, unique metadata, 404s, private-file isolation, robots, sitemap, and assets.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
