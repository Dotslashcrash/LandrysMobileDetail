import type { LeadRequest } from "./booking-schema";

export function prepareInquiryEmail(
  request: Omit<LeadRequest, "consent"> & { consent: boolean },
  serviceName: string,
  recipient: string,
) {
  const subject = `Detail inquiry - ${serviceName}`;
  const body = [
    `Hello Landry's, I'd like to inquire about ${serviceName} and pricing.`,
    `Vehicle: ${request.vehicle.year} ${request.vehicle.make} ${request.vehicle.model} ${request.vehicle.trim}`.trim(),
    `Vehicle type: ${request.vehicle.type}`,
    `Condition: ${request.conditions.join(", ")}`,
    request.notes,
    `Location: ${request.location.address}, ${request.location.city}, AR ${request.location.zip}`,
    `Preferred time: ${request.preference.date}, ${request.preference.window} (Arkansas time)`,
    `Contact: ${request.customer.firstName} ${request.customer.lastName}, ${request.customer.phone}, ${request.customer.email}`,
    "Please follow up about this inquiry. No appointment has been reserved.",
  ]
    .filter(Boolean)
    .join("\n\n");
  return {
    subject,
    body,
    href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    copyText: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
  };
}
