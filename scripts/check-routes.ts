import assert from "node:assert/strict";
import { services } from "../src/data/business";
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:3000";
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
    assert.match(html, /noindex/);
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
    /Disallow: \//,
  );
  assert.match(
    await (await fetch(origin + "/sitemap.xml")).text(),
    /services\/full-detail/,
  );
  for (const asset of [
    "/favicon.svg",
    "/fonts/display.woff2",
    "/images/hero.webp",
    "/_next/image?url=%2Fimages%2Fhero.webp&w=640&q=85",
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
