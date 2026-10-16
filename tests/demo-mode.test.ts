import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtempSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { leadSchema, arkansasDate } from "../src/lib/booking-schema";
import { submitLead } from "../src/lib/submit-lead";
import { POST } from "../src/app/api/leads/route";

test("Azure demo validates requests without storage or provider delivery", async () => {
  const inbox = mkdtempSync(path.join(tmpdir(), "landrys-demo-proof-"));
  process.env.BOOKING_MODE = "demo";
  process.env.LEAD_STORAGE_DIR = inbox;
  process.env.LEAD_ENCRYPTION_KEY = "invalid-key-must-not-be-used";
  const payload = {
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
      firstName: "Demo",
      lastName: "Test",
      phone: "4795550100",
      email: "regression@example.invalid",
    },
    consent: true,
    website: "",
    attribution: {},
  };
  let providerCalls = 0;
  const result = await submitLead(leadSchema.parse(payload), {
    async submitLead() {
      providerCalls++;
      return { externalId: "should-not-be-called" };
    },
  });
  assert.deepEqual(result, {
    status: "demo",
    reference: payload.requestId,
    delivery: "demo",
  });
  assert.equal(providerCalls, 0);
  const request = (body: unknown, origin = "http://localhost:3000") =>
    new Request("http://localhost:3000/api/leads", {
      method: "POST",
      headers: { origin, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  const response = await POST(request(payload));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), result);
  assert.equal(
    (await POST(request({ ...payload, consent: false }))).status,
    400,
  );
  assert.equal(
    (await POST(request(payload, "https://untrusted.example"))).status,
    403,
  );
  assert.deepEqual(readdirSync(inbox), []);
});
