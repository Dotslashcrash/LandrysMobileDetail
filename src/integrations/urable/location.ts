import type { LocationResolver } from "./types";
export const locationResolver: LocationResolver = {
  async lookup() {
    return [];
  },
  // Regions are supplied, but no approved postal-code or municipal boundaries exist.
  async checkCoverage() {
    return { status: "manual-review" };
  },
};
