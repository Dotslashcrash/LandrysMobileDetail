import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About",
  "Landry’s Mobile Detail, a Stidham family company serving Northwest Arkansas and the River Valley.",
  "/about",
);
export default function AboutPage() {
  return (
    <div className="paper-page">
      <PageIntro title="Landry’s Mobile Detail">
        <p>
          A Stidham family company. Mobile detailing in Northwest Arkansas and
          the Arkansas River Valley.
        </p>
      </PageIntro>
      <section className="section page-content readable-page">
        <h2>At your home or workplace</h2>
        <p>
          You don’t need to leave your car at a shop to request a detail. Tell
          us where the vehicle will be and what you want addressed.
        </p>
        <p>
          Interior and exterior detailing, paint care, and protection each start
          with your vehicle’s condition. We’ll discuss the work and confirm the
          location and price before arranging a visit.
        </p>
        <Link href="/services" className="text-link">
          View detailing services
        </Link>
        <h2>Arranging the visit</h2>
        <p>
          The request form asks for your vehicle, service interest, condition,
          address, preferred time, and contact details. Sending it asks Landry’s
          to follow up; it does not reserve an appointment.
        </p>
        <Link href="/book" className="button">
          Book your detail
        </Link>
      </section>
    </div>
  );
}
