import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy",
  "Information about the appointment request data collected by this local preview.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR INFORMATION"
        title={
          <>
            PRIVACY <em>FRAMEWORK.</em>
          </>
        }
      />
      <section className="section page-content legal">
        <p className="notice">
          Local preview policy framework. Business contact details, retention
          periods, and the final policy require owner review before public
          launch.
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
          They are not automatically sent to Urable. Access to the hosting
          computer and its encryption key must be restricted to authorized
          operators.
        </p>
        <h2>Tracking</h2>
        <p>
          No third-party analytics or advertising trackers are active. Campaign
          attribution uses temporary session storage and is included with a
          request, rather than sent to analytics.
        </p>
        <h2>Questions and deletion requests</h2>
        <p>
          A verified privacy contact and a retention schedule must be added
          before public launch. Please avoid submitting sensitive information in
          the vehicle notes.
        </p>
      </section>
    </>
  );
}
