import Link from "next/link";
import { PageIntro, ServiceList } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Services",
  "Interior, exterior, full detailing, paint care, and protection inquiries with Landry’s Mobile Detail.",
  "/services",
);
export default function ServicesPage() {
  return (
    <div className="paper-page">
      <PageIntro title="Detailing services">
        <p>
          Choose the work you want to discuss. We’ll agree on the scope and
          price after reviewing your vehicle.
        </p>
      </PageIntro>
      <div className="section page-content service-directory">
        <section>
          <h2>Cleaning your vehicle</h2>
          <ServiceList
            ids={[
              "interior-detail",
              "exterior-detail",
              "full-detail",
              "maintenance-detail",
            ]}
          />
        </section>
        <section>
          <h2>Paint and protection</h2>
          <ServiceList
            ids={[
              "paint-enhancement",
              "paint-correction",
              "ceramic-protection",
            ]}
          />
        </section>
        <section className="other-service-options">
          <h2>Other work</h2>
          <ServiceList
            ids={["headlight-restoration", "specialty-services", "add-ons"]}
          />
        </section>
        <p>
          Not sure which to choose?{" "}
          <Link href="/contact">Contact Landry’s</Link> with your question.
        </p>
      </div>
    </div>
  );
}
