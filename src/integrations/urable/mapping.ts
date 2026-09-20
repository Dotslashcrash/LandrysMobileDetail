import { services } from "@/data/business";
import type { LeadRequest } from "@/lib/booking-schema";
export function resolveServiceMapping(request: LeadRequest) {
  const service = services.find((s) => s.id === request.serviceId);
  if (!service?.urableServiceId) throw new Error("SERVICE_MAPPING_REQUIRED");
  return {
    localServiceId: service.id,
    externalServiceId: service.urableServiceId,
    marketId: request.location.market,
  };
}
