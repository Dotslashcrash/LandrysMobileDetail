import { test } from "node:test";
import assert from "node:assert/strict";
import { prepareInquiryEmail } from "../src/lib/inquiry-email";

test("prefilled email preserves special characters without adding recipients or headers", () => {
  const email = prepareInquiryEmail(
    {
      requestId: "synthetic-email-test",
      vehicle: {
        year: "2022",
        make: "Test & Co",
        model: "A+B",
        trim: "#1",
        type: "Car",
      },
      serviceId: "full-detail",
      conditions: ["Pet hair"],
      notes:
        "Notes & questions? #1 + 50%\nUnicode: café 🚗\ncc=unwanted@example.invalid",
      location: {
        address: "123 Test Drive",
        city: "Test City",
        zip: "72701",
        market: "northwest-arkansas",
      },
      preference: { date: "2026-10-20", window: "Flexible" },
      customer: {
        firstName: "Test",
        lastName: "Person",
        phone: "4795550100",
        email: "test+inquiry@example.invalid",
      },
      consent: true,
      website: "",
      attribution: {},
    },
    "Full Detail",
    "info@landrysmobiledetail.com",
  );
  const url = new URL(email.href);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "info@landrysmobiledetail.com");
  assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
  assert.equal(url.searchParams.get("subject"), email.subject);
  assert.equal(url.searchParams.get("body"), email.body);
  assert.match(email.body, /Notes & questions\? #1 \+ 50%/);
  assert.match(email.body, /café 🚗/);
  assert.match(email.body, /test\+inquiry@example.invalid/);
  assert.match(
    email.copyText,
    /^To: info@landrysmobiledetail.com\nSubject: Detail inquiry - Full Detail/,
  );
});
