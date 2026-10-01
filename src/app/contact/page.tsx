import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { contact } from "@/data/business";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Contact",
  "Contact Landry’s Mobile Detail at info@landrysmobiledetail.com or send a detailing request.",
  "/contact",
);
export default function ContactPage() {
  return (
    <div className="paper-page contact-page">
      <PageIntro title="Contact Landry’s">
        {contact.email && (
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        )}
        <p>
          For a question about your vehicle or the work you have in mind, email
          us. Include your vehicle and location so we know what you’re asking
          about.
        </p>
        {contact.phone && (
          <p>
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </p>
        )}
        {contact.socials.map((s) => (
          <p key={s.url}>
            <a href={s.url} rel="noopener noreferrer" target="_blank">
              {s.name}
            </a>
          </p>
        ))}
      </PageIntro>
      <section className="section page-content contact-request">
        <h2>Requesting an appointment?</h2>
        <p>
          The request form keeps your vehicle details, address, and preferred
          time together. We’ll contact you to agree on the work and scheduling.
        </p>
        <Link href="/book" className="button">
          Book your detail
        </Link>
        <p className="contact-region">
          Northwest Arkansas and the Arkansas River Valley.{" "}
          <Link href="/service-area">Service area details</Link>.
        </p>
      </section>
    </div>
  );
}
