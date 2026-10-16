import { z } from "zod";

export const inquiryVehicleTypes = ["Car", "Truck", "SUV", "Other"] as const;
export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .max(25)
    .refine(
      (value) => /^(?:1)?\d{10}$/.test(value.replace(/\D/g, "")),
      "Enter a valid US phone number.",
    ),
  email: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid email address.").max(254)),
  vehicleType: z.enum(inquiryVehicleTypes, { error: "Choose a vehicle type." }),
  notes: z.string().trim().max(1200),
});
export type InquiryDetails = z.infer<typeof inquirySchema>;

export function prepareSimpleInquiryEmail(
  request: InquiryDetails,
  recipient: string,
) {
  const subject = `Detail inquiry - ${request.vehicleType}`;
  const body = [
    "Hello Landry's, I'd like to inquire about detailing and pricing.",
    `Name: ${request.name}`,
    `Phone: ${request.phone}`,
    `Email: ${request.email}`,
    `Vehicle type: ${request.vehicleType}`,
    `Notes/Details: ${request.notes || "Not provided"}`,
    "Please follow up about this inquiry. No appointment has been reserved.",
  ].join("\n\n");
  return {
    subject,
    body,
    href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    copyText: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
  };
}
