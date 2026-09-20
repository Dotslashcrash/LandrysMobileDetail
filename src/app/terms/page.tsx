import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Request Terms",
  "How appointment requests work in the Landry’s local website preview.",
  "/terms",
);
export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="BEFORE YOU REQUEST"
        title={
          <>
            A CLEAR
            <br />
            <em>STARTING POINT.</em>
          </>
        }
      />
      <section className="section page-content legal">
        <p className="notice">
          Terms framework for local preview. Final business terms require owner
          review before public launch.
        </p>
        <h2>An appointment request is not a booking</h2>
        <p>
          Your preferred date and time are requests. A service appointment is
          only agreed after Landry’s confirms the details with you.
        </p>
        <h2>Service scope and pricing</h2>
        <p>
          Service categories are provided for inquiry. Availability, inclusions,
          pricing, duration, travel arrangements, and location suitability are
          confirmed before scheduling. The website does not take payment.
        </p>
        <h2>Policies to be supplied</h2>
        <p>
          Cancellation, rescheduling, weather, site access, water and power
          requirements, and payment terms will be added once approved by the
          business. No policy is implied by this preview.
        </p>
      </section>
    </>
  );
}
