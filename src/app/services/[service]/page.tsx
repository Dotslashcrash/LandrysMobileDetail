import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/business";
import { PageIntro } from "@/components/editorial";
import { Photograph } from "@/components/photograph";
import { photography } from "@/content/photography";
import { serviceCopy } from "@/content/service-copy";
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
    ? pageMetadata(
        found.name,
        serviceCopy[service].introduction,
        `/services/${service}`,
      )
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
  const copy = serviceCopy[item.id];
  return (
    <div className="paper-page service-page">
      <PageIntro title={item.name} className="service-intro">
        <p>{copy.introduction}</p>
        <Link href={`/book?service=${item.id}`} className="button">
          Book your detail
        </Link>
      </PageIntro>
      <section className="section page-content service-detail-content">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> <span aria-hidden="true">›</span>{" "}
          <Link href="/services">Services</Link>{" "}
          <span aria-hidden="true">›</span> {item.name}
        </nav>
        <div className="service-detail-layout">
          <div className="service-discussion">
            <h2>{copy.heading}</h2>
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {item.features.length > 0 && (
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            )}
            {item.id === "interior-detail" && (
              <Photograph
                image={photography.interior}
                className="service-cabin"
                sizes="(max-width:800px) 100vw, 55vw"
              />
            )}
          </div>
          <aside className="service-practical">
            <h2>Price and scheduling</h2>
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
              {item.estimatedDuration || "Discussed once the work is agreed."}
            </p>
            <p>
              <strong>Location</strong>
              <br />
              Northwest Arkansas and the River Valley. We’ll check your address
              before arranging a visit.
            </p>
          </aside>
        </div>
        <nav className="related-services" aria-label="Related services">
          {copy.related.map((id) => (
            <Link key={id} href={`/services/${id}`}>
              {services.find((service) => service.id === id)?.name}
            </Link>
          ))}
          <Link href="/services">All services</Link>
        </nav>
      </section>
    </div>
  );
}
