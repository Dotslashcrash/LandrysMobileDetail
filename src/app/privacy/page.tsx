import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
import { contact } from "@/data/business";
export const metadata = pageMetadata(
  "Privacy",
  "Information about the appointment request data collected by this local preview.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <div className="paper-page">
      <PageIntro title="Privacy" />
      <section className="section page-content legal">
        <p className="notice">
          This notice describes the local demo. The final privacy policy and
          retention periods still need approval before public launch.
        </p>
        <h2>What this form collects</h2>
        <p>
          Your name, phone number, email, vehicle details, service interests,
          address, preferred appointment time, condition notes, and consent.
          Campaign tags may accompany your request when present.
        </p>
        <h2>How the information is used</h2>
        <p>
          To review your request, confirm service coverage, discuss the work,
          and contact you about scheduling. Submitting the form does not
          subscribe you to marketing.
        </p>
        <h2>Storage in this local preview</h2>
        <p>
          Requests are encrypted and saved on the computer hosting this site.
          They are not automatically sent to Urable.
        </p>
        <h2>Tracking</h2>
        <p>
          No third-party analytics or advertising trackers are active. Campaign
          tags are held temporarily in your browser and included with a request.
        </p>
        <h2>Questions and deletion requests</h2>
        <p>
          Email <a href={`mailto:${contact.email}`}>{contact.email}</a> with
          privacy questions or deletion requests. A retention schedule must be
          approved before public launch. Please avoid submitting sensitive
          information in the vehicle notes.
        </p>
      </section>
    </div>
  );
}
