import type { LeadRequest } from "./booking-schema";
import { saveLead, updateLead } from "./lead-store";
import { integrationConfig } from "@/integrations/urable/config";
import { createUrableAdapter } from "@/integrations/urable/adapter";
import type {
  SubmissionResult,
  UrableAdapter,
} from "@/integrations/urable/types";
export async function submitLead(
  request: LeadRequest,
  adapter?: UrableAdapter,
): Promise<SubmissionResult> {
  const { mode } = integrationConfig();
  if (mode === "demo")
    return { status: "demo", reference: request.requestId, delivery: "demo" };
  const { record, created } = saveLead(
    request,
    mode === "urable" ? "pending" : mode === "fallback" ? "fallback" : "local",
  );
  if (mode === "urable" && created) {
    try {
      const result = await (adapter || createUrableAdapter()).submitLead(
        request,
      );
      if (!result.externalId) throw new Error("INVALID_PROVIDER_RESPONSE");
      record.delivery = "urable";
      record.externalId = result.externalId;
    } catch {
      record.delivery = "fallback";
      console.warn(
        JSON.stringify({
          event: "lead_delivery_fallback",
          reference: request.requestId,
        }),
      );
    }
    updateLead(record);
  }
  return {
    status: "received",
    reference: request.requestId,
    delivery: record.delivery === "pending" ? "fallback" : record.delivery,
  };
}
