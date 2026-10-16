import assert from "node:assert/strict";
import {
  existsSync,
  lstatSync,
  readFileSync,
  realpathSync,
  rmSync,
} from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = realpathSync(fileURLToPath(new URL("../", import.meta.url)));
assert.equal(
  JSON.parse(readFileSync(resolve(root, "package.json"))).name,
  "landrys-mobile-detail",
);
const output = resolve(root, ".next");
assert.equal(dirname(output), root);
assert.equal(basename(output), ".next");
if (existsSync(output)) {
  assert.ok(
    !lstatSync(output).isSymbolicLink(),
    "Refusing to remove a linked build directory",
  );
  rmSync(output, { recursive: true, force: true });
}

const canonical = "https://landrysmobiledetail.com";
const result = spawnSync(
  process.execPath,
  [resolve(root, "node_modules/next/dist/bin/next"), "build"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      SITE_URL: canonical,
      ALLOW_INDEXING: "true",
      BOOKING_MODE: "demo",
    },
  },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const html = readFileSync(resolve(output, "server/app/index.html"), "utf8");
const robots = readFileSync(
  resolve(output, "server/app/robots.txt.body"),
  "utf8",
);
const sitemap = readFileSync(
  resolve(output, "server/app/sitemap.xml.body"),
  "utf8",
);
assert.ok(
  html.includes(`rel="canonical" href="${canonical}`),
  "Public canonical was not generated",
);
assert.ok(
  html.includes('name="robots" content="index, follow"'),
  "Public indexing was not generated",
);
assert.ok(
  robots.includes("Allow: /") && robots.includes(`${canonical}/sitemap.xml`),
);
assert.ok(
  sitemap.includes(canonical) && !sitemap.includes("azurewebsites.net"),
);
console.log(
  "PASS: clean public build, canonical, indexing, robots and sitemap",
);
