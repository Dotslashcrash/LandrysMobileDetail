import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
import { contact } from "@/data/business";
export const metadata = pageMetadata(
  "Request Terms",
  "Information about detailing inquiries, pricing, and appointment confirmation with Landry’s Mobile Detail.",
  "/terms",
);
export default function TermsPage() {
  return (
    <div className="paper-page">
      <PageIntro title="Request terms." />
      <section className="section page-content legal">
        <h2>Confirming an appointment</h2>
        <p>
          Your preferred date and time begin a scheduling conversation. An
          appointment is agreed only after Landry’s confirms the work, location,
          and timing with you.
        </p>
        <h2>Pricing available by inquiry</h2>
        <p>
          Share your vehicle and its condition for a quote. Service scope,
          pricing, duration, and travel arrangements are discussed before
          scheduling. The website does not take payment.
        </p>
        <h2>Arrangements for the visit</h2>
        <p>
          Discuss location suitability, access, water and power, weather,
          rescheduling, and payment arrangements with Landry’s before the visit.
          These details depend on the work and location.
        </p>
        <p>
          For questions about a detail or quote, email{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </section>
    </div>
  );
}
