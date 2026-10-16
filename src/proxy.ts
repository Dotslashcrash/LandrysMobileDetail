import { NextRequest, NextResponse } from "next/server";

const canonicalOrigin = "https://landrysmobiledetail.com";
const aliases = new Set([
  "www.landrysmobiledetail.com",
  "landrysmobiledetail.net",
  "www.landrysmobiledetail.net",
]);

export function proxy(request: NextRequest) {
  // A self-hosted Next server can expose its internal origin in nextUrl.
  const host =
    request.headers.get("host")?.split(":")[0].toLowerCase() ||
    request.nextUrl.hostname;
  // Activate only with the public release configuration, after TLS is bound.
  if (
    process.env.SITE_URL === canonicalOrigin &&
    aliases.has(host) &&
    (request.method === "GET" || request.method === "HEAD")
  ) {
    const destination = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      canonicalOrigin,
    );
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Keep domain ownership and certificate validation paths available.
  matcher: ["/((?!api/|\\.well-known/|_next/).*)"],
};
