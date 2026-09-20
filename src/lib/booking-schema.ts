import { z } from "zod";
import { services } from "@/data/business";
export const conditionOptions = [
  "Normal condition",
  "Heavy interior use",
  "Pet hair",
  "Stains",
  "Excessive dirt",
  "Overspray",
  "Sap",
  "Other",
] as const;
export const vehicleTypes = [
  "Car",
  "SUV / Crossover",
  "Truck",
  "Van",
  "Other",
] as const;
export const timeWindows = ["Morning", "Afternoon", "Flexible"] as const;
const text = (max: number) =>
  z
    .string()
    .trim()
    .min(1, "This field is required.")
    .max(max, `Please use ${max} characters or fewer.`);
export function arkansasDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
export const vehicleSchema = z.object({
  year: text(4)
    .regex(/^\d{4}$/, "Enter a four-digit year.")
    .refine(
      (v) => Number(v) >= 1900 && Number(v) <= new Date().getFullYear() + 1,
      "Enter a valid vehicle year.",
    ),
  make: text(60),
  model: text(80),
  type: z.enum(vehicleTypes),
  trim: z.string().trim().max(80),
});
export const serviceSchema = z
  .string()
  .refine(
    (id) => services.some((s) => s.id === id),
    "Choose a service interest.",
  );
export const locationSchema = z.object({
  address: text(160),
  city: text(80),
  zip: z.string().regex(/^\d{5}$/, "Enter a five-digit ZIP code."),
  market: z.enum(["northwest-arkansas", "river-valley"]),
});
export const preferenceSchema = z.object({
  date: text(10)
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date.")
    .refine(
      (date) =>
        !Number.isNaN(Date.parse(date)) &&
        new Date(date).toISOString().slice(0, 10) === date &&
        date >= arkansasDate() &&
        date <= `${new Date().getFullYear() + 1}-12-31`,
      "Choose a valid future date within the next calendar year.",
    ),
  window: z.enum(timeWindows),
});
export const customerSchema = z.object({
  firstName: text(60),
  lastName: text(60),
  phone: text(25).refine(
    (v) => /^(?:1)?\d{10}$/.test(v.replace(/\D/g, "")),
    "Enter a valid US mobile phone number.",
  ),
  email: z.email("Enter a valid email address.").max(254),
});
export const leadSchema = z.object({
  requestId: z.uuid(),
  vehicle: vehicleSchema,
  serviceId: serviceSchema,
  conditions: z
    .array(z.enum(conditionOptions))
    .min(1, "Choose at least one condition.")
    .max(8),
  notes: z.string().trim().max(1200),
  location: locationSchema,
  preference: preferenceSchema,
  customer: customerSchema,
  consent: z.literal(true, {
    error: "Please agree so we can contact you about your request.",
  }),
  website: z.string().max(0),
  attribution: z
    .object({
      utm_source: z.string().max(120).optional(),
      utm_medium: z.string().max(120).optional(),
      utm_campaign: z.string().max(120).optional(),
      utm_content: z.string().max(120).optional(),
      utm_term: z.string().max(120).optional(),
    })
    .default({}),
});
export type LeadRequest = z.infer<typeof leadSchema>;
