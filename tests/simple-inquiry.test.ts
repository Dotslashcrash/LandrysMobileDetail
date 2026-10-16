import { test } from "node:test";
import assert from "node:assert/strict";
import {
  inquirySchema,
  inquiryVehicleTypes,
  prepareSimpleInquiryEmail,
} from "../src/lib/simple-inquiry";

const details = {
  name: "Test O'Neil & Co",
  phone: "(479) 555-0100",
  email: "test+inquiry@example.invalid",
  vehicleType: "SUV" as const,
  notes:
    "Paint & seats? #1 + 50%\nUnicode: café 🚗\ncc=unwanted@example.invalid",
};
test("simple inquiry accepts one name and exactly the four requested vehicle types", () => {
  for (const vehicleType of inquiryVehicleTypes)
    assert.ok(
      inquirySchema.safeParse({
        ...details,
        name: "  Alex  ",
        vehicleType,
        notes: "",
      }).success,
    );
  for (const invalid of [
    { name: " " },
    { phone: "123" },
    { email: "bad" },
    { vehicleType: "" },
    { vehicleType: "Van" },
    { notes: "x".repeat(1201) },
  ])
    assert.equal(
      inquirySchema.safeParse({ ...details, ...invalid }).success,
      false,
    );
  assert.equal(
    inquirySchema.parse({ ...details, name: "  Alex  " }).name,
    "Alex",
  );
});
test("simple inquiry mailto and copy fallback retain all fields and encode special characters", () => {
  const email = prepareSimpleInquiryEmail(
    details,
    "info@landrysmobiledetail.com",
  );
  const url = new URL(email.href);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "info@landrysmobiledetail.com");
  assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
  assert.equal(url.searchParams.get("subject"), "Detail inquiry - SUV");
  assert.equal(url.searchParams.get("body"), email.body);
  for (const value of [
    details.name,
    details.phone,
    details.email,
    details.vehicleType,
    details.notes,
  ])
    assert.ok(email.body.includes(value));
  assert.ok(email.copyText.endsWith(email.body));
  assert.match(email.body, /No appointment has been reserved/);
  assert.doesNotMatch(email.body, /Preferred time:|Location:|Condition:/);
});
