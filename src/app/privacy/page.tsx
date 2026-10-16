import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
import { contact } from "@/data/business";
export const metadata = pageMetadata(
  "Privacy",
  "How vehicle and contact details are handled in the Landry’s detailing inquiry form.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <div className="paper-page">
      <PageIntro title="Privacy." />
      <section className="section page-content legal">
        <h2>The details you enter</h2>
        <p>
          The form asks for your name, phone number, email, vehicle type, and
          any notes or details you choose to include.
        </p>
        <h2>Using the request form</h2>
        <p>
          The form checks your details and prepares an inquiry in your browser.
          It does not submit your inquiry to Landry’s or save a lead. You open
          your email app, review the message, and press Send yourself. If your
          email app does not open, you can copy the message and email it
          manually.
        </p>
        <h2>Browser information</h2>
        <p>
          No third-party analytics or advertising trackers are active. Campaign
          tags are held temporarily in your browser and are not included in your
          inquiry email. Keep the form page open to retain your details while
          preparing, copying, or editing your message.
        </p>
        <h2>Questions about your information</h2>
        <p>
          Email <a href={`mailto:${contact.email}`}>{contact.email}</a> with
          privacy questions or deletion requests. Please keep sensitive
          information out of the vehicle notes.
        </p>
      </section>
    </div>
  );
}
