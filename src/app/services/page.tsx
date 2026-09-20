import { PageIntro, ServiceList, FinalCTA } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Services",
  "Explore detailing options for your interior, exterior, and full vehicle. Request a tailored quote from Landry’s.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="THE RIGHT CARE FOR YOUR CAR"
        title={
          <>
            CHOOSE YOUR
            <br />
            <em>FRESH START.</em>
          </>
        }
      >
        <p>
          Every vehicle has a different story. Explore the areas we can discuss,
          then tell us what yours needs.
        </p>
      </PageIntro>
      <section className="section page-content">
        <div className="notice">
          These are service inquiry categories. We’ll confirm the available
          work, inclusions, time, and price with you before scheduling.
        </div>
        <ServiceList all />
      </section>
      <FinalCTA />
    </>
  );
}
