import type { LeadRequest } from "@/lib/booking-schema";
export type SubmissionResult =
  | {
      status: "demo";
      reference: string;
      delivery: "demo";
    }
  | {
      status: "received";
      reference: string;
      delivery: "local" | "fallback" | "urable";
    }
  | {
      status: "confirmed";
      reference: string;
      confirmationId: string;
      confirmedAt: string;
      delivery: "urable";
    };
export interface AvailabilitySlot {
  id: string;
  startsAt: string;
  endsAt: string;
  timeZone: string;
}
export interface UrableAdapter {
  submitLead(request: LeadRequest): Promise<{ externalId: string }>;
  // Only implement after verifying the account's documented capabilities.
  availability?(
    serviceId: string,
    marketId: string,
  ): Promise<AvailabilitySlot[]>;
  book?(
    request: LeadRequest,
    slotId: string,
  ): Promise<{ confirmationId: string; confirmedAt: string }>;
}
export interface LocationResolver {
  lookup(
    query: string,
  ): Promise<{ address: string; city: string; zip: string }[]>;
  checkCoverage(address: LeadRequest["location"]): Promise<{
    status: "approved" | "outside" | "manual-review";
    distanceMiles?: number;
  }>;
}
