"use client";
export type AnalyticsEvent =
  | "booking_started"
  | "vehicle_entered"
  | "service_selected"
  | "service_area_selected"
  | "appointment_requested"
  | "booking_completed"
  | "call_clicked"
  | "email_clicked"
  | "service_viewed"
  | "gallery_viewed";
// No customer values or arbitrary properties are accepted by this boundary.
export function track(event: AnalyticsEvent) {
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true") return;
  window.dispatchEvent(
    new CustomEvent("landrys:analytics", { detail: { event } }),
  );
}
export function readAttribution(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ]) {
    const value = params.get(key);
    if (value) attribution[key] = value.slice(0, 120);
  }
  try {
    if (Object.keys(attribution).length)
      sessionStorage.setItem(
        "landrys:attribution",
        JSON.stringify(attribution),
      );
    return JSON.parse(sessionStorage.getItem("landrys:attribution") || "{}");
  } catch {
    return attribution;
  }
}
