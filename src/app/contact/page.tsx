import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { Photograph } from "@/components/photograph";
import { photography } from "@/content/photography";
import { contact } from "@/data/business";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Contact",
  "Inquire about detailing and pricing at info@landrysmobiledetail.com. Serving Northwest Arkansas and the Arkansas River Valley.",
  "/contact",
);
export default function ContactPage() {
  return (
    <div className="paper-page contact-page">
      <PageIntro title="Talk to Landry’s.">
        {contact.email && (
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        )}
        <p>
          Pricing available by inquiry. Include your vehicle, its condition,
          your location, and the work you have in mind. We’ll discuss a quote
          before scheduling.
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
      <section className="contact-composition">
        <Photograph
          image={photography.paint}
          className="supporting-photograph"
          sizes="(max-width:800px) 100vw, 55vw"
        />
        <div className="supporting-copy">
          <h2>Have a detail in mind?</h2>
          <p>
            Share your contact details, vehicle type, and any notes in the
            request form. An appointment is agreed only after the work and
            scheduling are confirmed.
          </p>
          <Link href="/book" className="button">
            Book your detail
          </Link>
          <p className="contact-region">
            Northwest Arkansas and the Arkansas River Valley.{" "}
            <Link href="/service-area" className="text-link">
              Check your location
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
