import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/business";
import { PageIntro } from "@/components/editorial";
import { Photograph } from "@/components/photograph";
import { serviceMedia } from "@/content/photography";
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
        `${serviceCopy[service].introduction} Pricing available by inquiry.`,
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
  const media = serviceMedia[item.id];
  return (
    <div className={`paper-page service-page service-layout-${media.layout}`}>
      <div className="service-opening">
        <PageIntro title={item.name} className="service-intro">
          <p>{copy.introduction}</p>
          <p className="pricing-note">Pricing available by inquiry.</p>
          <Link href={`/book?service=${item.id}`} className="button">
            Book your detail
          </Link>
        </PageIntro>
        <Photograph
          image={media.primary}
          className="service-main-photograph"
          sizes={
            media.layout === "wide" ? "100vw" : "(max-width:800px) 100vw, 60vw"
          }
          eager
        />
      </div>
      <section className="section service-detail-content">
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
          </div>
          <aside className="service-practical">
            <h2>Before the visit.</h2>
            <p>
              Share the vehicle’s size, condition, and the areas you want
              addressed. We’ll discuss the work and provide pricing by inquiry
              before scheduling.
            </p>
            <p>
              Mobile service in Northwest Arkansas and the Arkansas River
              Valley. The location and preferred time are confirmed with you.
            </p>
            <Link href="/contact" className="text-link">
              Inquire about pricing <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        </div>
      </section>
      {media.secondary && (
        <Photograph
          image={media.secondary}
          className="service-secondary-photograph"
        />
      )}
      <nav className="related-services section" aria-label="Related services">
        {copy.related.map((id) => (
          <Link key={id} href={`/services/${id}`}>
            {services.find((service) => service.id === id)?.name}
          </Link>
        ))}
        <Link href="/services">All services</Link>
      </nav>
    </div>
  );
}
