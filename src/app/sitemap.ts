import type { MetadataRoute } from "next";
import { services } from "@/data/business";
import { siteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/services",
    ...services.map((s) => `/services/${s.id}`),
    "/results",
    "/service-area",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
