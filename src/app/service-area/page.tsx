import Link from "next/link";
import { PageIntro, Questions } from "@/components/editorial";
import { Photograph } from "@/components/photograph";
import { locationMedia, photography } from "@/content/photography";
import { serviceAreas } from "@/data/business";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Service Area",
  "Mobile detailing in Northwest Arkansas and the Arkansas River Valley. Confirm coverage and inquire about pricing for your location.",
  "/service-area",
);
export default function AreaPage() {
  return (
    <div className="paper-page area-page">
      <div className="area-opening">
        <PageIntro
          title={
            <>
              Your vehicle.
              <br />
              Your location.
            </>
          }
        >
          <p>
            At home or at work, tell us where the vehicle will be. Landry’s
            brings mobile detailing to Northwest Arkansas and the Arkansas River
            Valley.
          </p>
          <Link href="/book" className="button">
            Book your detail
          </Link>
        </PageIntro>
        <Photograph
          image={locationMedia}
          className="area-photograph"
          sizes="(max-width:800px) 100vw, 55vw"
          eager
        />
      </div>
      <section className="area-options section">
        {serviceAreas.map((area) => (
          <div key={area.id}>
            <h2>{area.name}</h2>
            <p>
              Include your address so we can confirm coverage and the
              arrangements for a visit.
            </p>
            {area.approvedCities.length > 0 && (
              <p>{area.approvedCities.join(", ")}</p>
            )}
            {area.travelRules && <p>{area.travelRules}</p>}
            <Link href={`/book?market=${area.id}`} className="text-link">
              Request service in this region <span aria-hidden="true">↗</span>
            </Link>
          </div>
        ))}
      </section>
      <section className="area-arrival">
        <Photograph
          image={photography.vehicle}
          className="area-vehicle"
          sizes="(max-width:800px) 100vw, 60vw"
        />
        <div>
          <h2>Before we come over.</h2>
          <p>
            We’ll discuss the vehicle, the work, and whether the location is
            suitable before a visit is confirmed.
          </p>
          <p>
            Pricing is available by inquiry. Send your vehicle details and
            location to get the conversation started.
          </p>
          <Link href="/contact" className="text-link">
            Contact Landry’s <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <div className="section">
        <Questions />
      </div>
    </div>
  );
}
