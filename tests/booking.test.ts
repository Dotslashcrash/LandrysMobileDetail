import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { leadSchema, arkansasDate } from "../src/lib/booking-schema";
import { saveLead, listLeads } from "../src/lib/lead-store";
import { submitLead } from "../src/lib/submit-lead";
import { POST } from "../src/app/api/leads/route";
const root = mkdtempSync(path.join(tmpdir(), "landrys-tests-"));
process.env.LEAD_STORAGE_DIR = root;
process.env.BOOKING_MODE = "lead";
const fixture = () => ({
  requestId: randomUUID(),
  vehicle: {
    year: "2022",
    make: "Test",
    model: "Vehicle",
    type: "Car",
    trim: "",
  },
  serviceId: "full-detail",
  conditions: ["Normal condition"],
  notes: "",
  location: {
    address: "123 Test Street",
    city: "Test City",
    zip: "72701",
    market: "northwest-arkansas",
  },
  preference: { date: arkansasDate(), window: "Flexible" },
  customer: {
    firstName: "Test",
    lastName: "Customer",
    phone: "4795550100",
    email: "test@example.com",
  },
  consent: true,
  website: "",
  attribution: {},
});
test("validation rejects invalid service, date, phone, consent and bot field", () => {
  assert.equal(leadSchema.safeParse(fixture()).success, true);
  for (const partial of [
    { serviceId: "unknown" },
    { preference: { date: "2026-02-31", window: "Flexible" } },
    { customer: { ...fixture().customer, phone: "1" } },
    { consent: false },
    { website: "spam" },
    { location: { ...fixture().location, zip: "x" } },
  ])
    assert.equal(
      leadSchema.safeParse({ ...fixture(), ...partial }).success,
      false,
    );
});
test("encrypted durable store deduplicates and rejects changed retries", () => {
  const lead = leadSchema.parse(fixture());
  assert.equal(saveLead(lead, "local").created, true);
  assert.equal(saveLead(lead, "local").created, false);
  assert.throws(
    () => saveLead({ ...lead, notes: "changed" }, "local"),
    /IDEMPOTENCY_CONFLICT/,
  );
  assert.ok(listLeads().some((r) => r.request.requestId === lead.requestId));
  assert.equal(
    readFileSync(path.join(root, "leads.sqlite")).includes(
      Buffer.from("test@example.com"),
    ),
    false,
  );
});
test("Urable failure preserves the request and never confirms a booking", async () => {
  process.env.BOOKING_MODE = "urable";
  const lead = leadSchema.parse(fixture());
  const result = await submitLead(lead, {
    async submitLead() {
      throw new Error("offline");
    },
  });
  assert.equal(result.status, "received");
  assert.equal(result.delivery, "fallback");
  assert.equal(
    listLeads().find((r) => r.request.requestId === lead.requestId)?.delivery,
    "fallback",
  );
  process.env.BOOKING_MODE = "lead";
});
test("provider delivery is still a lead, and retry does not resend", async () => {
  process.env.BOOKING_MODE = "urable";
  let calls = 0;
  const adapter = {
    async submitLead() {
      calls++;
      return { externalId: "test-external-id" };
    },
  };
  const lead = leadSchema.parse(fixture());
  assert.equal((await submitLead(lead, adapter)).status, "received");
  await submitLead(lead, adapter);
  assert.equal(calls, 1);
  process.env.BOOKING_MODE = "lead";
});
test("API enforces origin, size, validation and durable success", async () => {
  const request = (body: unknown, origin = "http://localhost:3000") =>
    new Request("http://localhost:3000/api/leads", {
      method: "POST",
      headers: { origin, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  assert.equal(
    (await POST(request(fixture(), "https://untrusted.example"))).status,
    403,
  );
  const loopback = new Request("http://localhost:3000/api/leads", {
    method: "POST",
    headers: {
      origin: "http://127.0.0.1:3000",
      host: "127.0.0.1:3000",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fixture()),
  });
  assert.equal((await POST(loopback)).status, 201);
  assert.equal((await POST(request({}))).status, 400);
  assert.equal((await POST(request({ notes: "x".repeat(17000) }))).status, 413);
  const response = await POST(request(fixture()));
  assert.equal(response.status, 201);
  assert.equal((await response.json()).status, "received");
});
test("storage failure produces a safe error instead of false success", async () => {
  process.env.LEAD_ENCRYPTION_KEY = "invalid";
  const response = await POST(
    new Request("http://localhost:3000/api/leads", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fixture()),
    }),
  );
  assert.equal(response.status, 503);
  assert.doesNotMatch(
    JSON.stringify(await response.json()),
    /stack|INVALID_ENCRYPTION/,
  );
  delete process.env.LEAD_ENCRYPTION_KEY;
});
