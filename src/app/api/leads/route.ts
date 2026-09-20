import { leadSchema } from "@/lib/booking-schema";
import { submitLead } from "@/lib/submit-lead";
export const runtime = "nodejs";
const buckets = new Map<string, { count: number; until: number }>();
function response(body: object, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  // Next's internal URL may use localhost even when a browser uses 127.0.0.1
  // or an explicitly enabled LAN host. Compare the actual HTTP Host as well.
  const host = request.headers.get("host");
  const allowed = new Set([
    requestUrl.origin,
    process.env.SITE_URL || "http://localhost:3000",
    ...(host ? [`${requestUrl.protocol}//${host}`] : []),
  ]);
  if (!origin || !allowed.has(origin))
    return response({ error: "Please submit from the Landry’s website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return response({ error: "Invalid request format." }, 415);
  // Global local-server cap; no trust in user-controlled forwarding headers.
  const now = Date.now();
  const bucket = buckets.get("local") || { count: 0, until: now + 60000 };
  if (now > bucket.until) {
    bucket.count = 0;
    bucket.until = now + 60000;
  }
  bucket.count++;
  buckets.set("local", bucket);
  if (bucket.count > 30)
    return response(
      { error: "Please wait a minute before trying again." },
      429,
    );
  try {
    if (Number(request.headers.get("content-length") || 0) > 16000)
      return response({ error: "Your request is too large." }, 413);
    const reader = request.body?.getReader();
    if (!reader) return response({ error: "Your request is empty." }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 16000) {
        await reader.cancel();
        return response({ error: "Your request is too large." }, 413);
      }
      chunks.push(value);
    }
    const raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success)
      return response(
        {
          error: "Please check the details in your request.",
          fields: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        400,
      );
    const result = await submitLead(parsed.data);
    console.info(
      JSON.stringify({
        event: "lead_saved",
        reference: result.reference,
        delivery: result.delivery,
      }),
    );
    return response(result, 201);
  } catch (error) {
    if (error instanceof SyntaxError)
      return response({ error: "Invalid request format." }, 400);
    if ((error as Error).message === "IDEMPOTENCY_CONFLICT")
      return response(
        {
          error:
            "This request was already received with different details. Start a new request to make changes.",
        },
        409,
      );
    console.error(JSON.stringify({ event: "lead_submission_failed" }));
    return response(
      {
        error:
          "We couldn’t save your request. Your details are still here. Please try again.",
      },
      503,
    );
  }
}
