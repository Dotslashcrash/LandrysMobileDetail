import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
import { contact } from "@/data/business";
export const metadata = pageMetadata(
  "Privacy",
  "How vehicle and contact details are handled in the Landry’s appointment request experience.",
  "/privacy",
);
export default function PrivacyPage() {
  const inquiryOnly = process.env.BOOKING_MODE === "demo";
  return (
    <div className="paper-page">
      <PageIntro title="Privacy." />
      <section className="section page-content legal">
        <h2>The details you enter</h2>
        <p>
          The form asks for your name, phone number, email, vehicle details,
          service interest, address, preferred time, condition notes, and
          consent. Campaign tags may accompany the request when present.
        </p>
        <h2>Using the request form</h2>
        <p>
          {inquiryOnly
            ? "The form prepares an inquiry for you to send from your email app. Details are checked when you continue, but are not saved as a lead or delivered to Landry’s. You review and send the email yourself."
            : "Submitted requests are encrypted and saved by the website so they can be reviewed for service coverage, work, and scheduling. A submission does not subscribe you to marketing."}
        </p>
        <h2>Browser information</h2>
        <p>
          No third-party analytics or advertising trackers are active. Campaign
          tags are held temporarily in your browser. Your form details remain in
          the open form as you move between its stages.
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
