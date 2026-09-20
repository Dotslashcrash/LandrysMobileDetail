import { listLeads } from "../src/lib/lead-store";
// Run locally from the project root. This prints private customer information.
for (const record of listLeads()) console.log(JSON.stringify(record, null, 2));
