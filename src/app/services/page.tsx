import Link from "next/link";
import { PageIntro, ServiceList } from "@/components/editorial";
import { Photograph } from "@/components/photograph";
import { photography } from "@/content/photography";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Services",
  "Interior, exterior, paint care, and protection. Pricing available by inquiry for mobile detailing in Northwest Arkansas and the Arkansas River Valley.",
  "/services",
);
export default function ServicesPage() {
  return (
    <div className="paper-page">
      <div className="directory-opening">
        <PageIntro
          title={
            <>
              Detailing
              <br />
              services.
            </>
          }
        >
          <p>Start with the part of your vehicle that needs attention.</p>
          <p className="pricing-note">
            Pricing available by inquiry. Your vehicle and the agreed work
            determine the quote.
          </p>
          <Link href="/contact" className="text-link">
            Ask about your vehicle <span aria-hidden="true">↗</span>
          </Link>
        </PageIntro>
        <Photograph
          image={photography.wash}
          className="directory-hero"
          sizes="(max-width:800px) 100vw, 60vw"
          eager
        />
      </div>
      <section className="service-chapter section">
        <Photograph
          image={photography.interior}
          className="chapter-photograph"
          sizes="(max-width:800px) 100vw, 48vw"
        />
        <div>
          <h2>Inside &amp; out.</h2>
          <ServiceList
            ids={[
              "interior-detail",
              "exterior-detail",
              "full-detail",
              "maintenance-detail",
            ]}
          />
        </div>
      </section>
      <section className="service-chapter paint-chapter">
        <div>
          <h2>Paint &amp; protection.</h2>
          <ServiceList
            ids={[
              "paint-enhancement",
              "paint-correction",
              "ceramic-protection",
            ]}
          />
        </div>
        <Photograph
          image={photography.paint}
          className="chapter-photograph"
          sizes="(max-width:800px) 100vw, 55vw"
        />
      </section>
      <section className="service-chapter specialty-chapter section">
        <Photograph
          image={photography.headlight}
          className="chapter-photograph"
          sizes="(max-width:800px) 100vw, 48vw"
        />
        <div>
          <h2>Something specific?</h2>
          <ServiceList
            ids={["headlight-restoration", "specialty-services", "add-ons"]}
          />
        </div>
      </section>
      <div className="directory-close section">
        <p>
          Not sure which service fits? Describe the concern and we’ll discuss
          the options.
        </p>
        <Link href="/contact" className="button">
          Contact Landry’s
        </Link>
      </div>
    </div>
  );
}
