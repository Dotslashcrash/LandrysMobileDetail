import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
import { contact } from "@/data/business";
export const metadata = pageMetadata(
  "Request Terms",
  "How appointment requests work in the Landry’s local website preview.",
  "/terms",
);
export default function TermsPage() {
  return (
    <div className="paper-page">
      <PageIntro title="Request terms" />
      <section className="section page-content legal">
        <p className="notice">
          These terms describe appointment requests in the local demo. Final
          business terms still need approval before public launch.
        </p>
        <h2>An appointment request is not a booking</h2>
        <p>
          Your preferred date and time are requests. A service appointment is
          only agreed after Landry’s confirms the details with you.
        </p>
        <h2>Service scope and pricing</h2>
        <p>
          The services on this site are available for inquiry. Availability,
          inclusions, pricing, duration, travel arrangements, and location
          suitability are confirmed before scheduling. The website does not take
          payment.
        </p>
        <h2>Policies to be supplied</h2>
        <p>
          Cancellation, rescheduling, weather, site access, water and power
          requirements, and payment terms will be added once approved by the
          business. No policy is implied by this preview.
        </p>
        <p>
          For questions about your request, email{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </section>
    </div>
  );
}
