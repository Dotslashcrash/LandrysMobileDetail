export function integrationConfig() {
  const mode = process.env.BOOKING_MODE || "lead";
  if (!["lead", "urable", "fallback"].includes(mode))
    throw new Error("INVALID_BOOKING_MODE");
  return {
    mode: mode as "lead" | "urable" | "fallback",
    apiUrl: process.env.URABLE_API_URL,
    apiKey: process.env.URABLE_API_KEY,
    accountId: process.env.URABLE_ACCOUNT_ID,
    locationId: process.env.URABLE_LOCATION_ID,
  };
}
