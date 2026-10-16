import { test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { proxy } from "../src/proxy";

test("public aliases retain path and query and cannot create a redirect loop", () => {
  process.env.SITE_URL = "https://landrysmobiledetail.com";
  for (const host of [
    "www.landrysmobiledetail.com",
    "landrysmobiledetail.net",
    "www.landrysmobiledetail.net",
  ]) {
    const response = proxy(new NextRequest(`https://${host}/services?test=1`));
    assert.equal(response.status, 308);
    assert.equal(
      response.headers.get("location"),
      "https://landrysmobiledetail.com/services?test=1",
    );
  }
  const behindProxy = proxy(
    new NextRequest("http://localhost:3100/services?test=1", {
      headers: { host: "WWW.LANDRYSMOBILEDETAIL.COM" },
    }),
  );
  assert.equal(behindProxy.status, 308);
  assert.equal(
    behindProxy.headers.get("location"),
    "https://landrysmobiledetail.com/services?test=1",
  );
  for (const host of [
    "landrysmobiledetail.com",
    "landrys-mobile-detail-demo.azurewebsites.net",
    "untrusted.example",
  ]) {
    assert.equal(
      proxy(new NextRequest(`https://${host}/services`)).headers.get(
        "location",
      ),
      null,
    );
  }
  assert.equal(
    proxy(
      new NextRequest("https://landrysmobiledetail.net/api/leads", {
        method: "POST",
      }),
    ).headers.get("location"),
    null,
  );
  process.env.SITE_URL = "https://landrys-mobile-detail-demo.azurewebsites.net";
  assert.equal(
    proxy(new NextRequest("https://landrysmobiledetail.net/")).headers.get(
      "location",
    ),
    null,
  );
});
