import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { contact } from "@/data/business";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Contact",
  "Start a detailing request with Landry’s Mobile Detail in Northwest Arkansas and the River Valley.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="LET’S TALK ABOUT YOUR RIDE"
        title={
          <>
            GOOD DETAILS
            <br />
            <em>START HERE.</em>
          </>
        }
      >
        <p>
          Looking for a fresh start for your vehicle? Send us its details and
          we’ll discuss the next step.
        </p>
      </PageIntro>
      <section className="section page-content">
        <div className="split-content">
          <div className="editorial-panel">
            <h2>REQUEST A DETAIL</h2>
            <p>
              Share your vehicle, service interests, and location. Your request
              gives us what we need to start planning.
            </p>
            <Link href="/book" className="button">
              Get started ↗
            </Link>
          </div>
          <div className="editorial-panel">
            <h2>HERE IN ARKANSAS.</h2>
            <p>
              Northwest Arkansas
              <br />
              Arkansas River Valley
            </p>
            {contact.phone && (
              <p>
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </p>
            )}
            {contact.email && (
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            )}
            {contact.socials.map((s) => (
              <p key={s.url}>
                <a href={s.url} rel="noopener noreferrer" target="_blank">
                  {s.name} ↗
                </a>
              </p>
            ))}
            <p>
              Appointments and exact location coverage are confirmed after we
              review your request.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
