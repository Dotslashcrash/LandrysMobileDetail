import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/business";
import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((service) => ({ service: service.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const found = services.find((s) => s.id === service);
  return found
    ? pageMetadata(found.name, found.description, `/services/${service}`)
    : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const item = services.find((s) => s.id === service);
  if (!item) notFound();
  return (
    <>
      <PageIntro eyebrow={item.name} title={<>{item.tagline}</>}>
        <p>{item.description}</p>
      </PageIntro>
      <section className="section page-content">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/services">Services</Link> /{" "}
          {item.name}
        </nav>
        <div className="split-content">
          <div className="editorial-panel">
            <h2>YOUR VEHICLE SETS THE PLAN.</h2>
            <p>
              Tell us what you drive and the areas you want addressed. We’ll
              review the condition and location with you before confirming the
              scope.
            </p>
            {item.features.length > 0 && (
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            )}
            <Link href={`/book?service=${item.id}`} className="button">
              Ask about {item.name} <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="editorial-panel">
            <h2>THE DETAILS</h2>
            <p>
              <strong>Pricing</strong>
              <br />
              {item.startingPrice === null
                ? "Quoted after discussing your vehicle and the work."
                : `From $${item.startingPrice}`}
            </p>
            <p>
              <strong>Time</strong>
              <br />
              {item.estimatedDuration || "Confirmed with your service scope."}
            </p>
            <p>
              <strong>Location</strong>
              <br />
              Mobile service in Northwest Arkansas and the River Valley. Exact
              address coverage is confirmed before scheduling.
            </p>
            <p className="fineprint">
              Availability and service inclusions are subject to confirmation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
