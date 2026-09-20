import type { UrableAdapter } from "./types";
export function createUrableAdapter(): UrableAdapter {
  // Deliberately no invented URL, auth format, or payload. Wire verified docs here.
  return {
    async submitLead() {
      throw new Error("URABLE_NOT_CONFIGURED");
    },
  };
}
