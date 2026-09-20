import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { serviceAreas } from "@/data/business";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Service Area",
  "Landry’s Mobile Detail serves Northwest Arkansas and the Arkansas River Valley. Request coverage confirmation for your location.",
  "/service-area",
);
export default function AreaPage() {
  return (
    <>
      <PageIntro
        eyebrow="ARKANSAS. AT YOUR ADDRESS."
        title={
          <>
            LOCAL ROADS.
            <br />
            <em>HIGH STANDARDS.</em>
          </>
        }
      >
        <p>
          Professional mobile detailing throughout Northwest Arkansas and the
          Arkansas River Valley.
        </p>
      </PageIntro>
      <section className="section page-content">
        <div className="split-content">
          {serviceAreas.map((area) => (
            <div className="editorial-panel" key={area.id}>
              <p className="eyebrow">{area.short} / MOBILE DETAILING</p>
              <h2>{area.name}</h2>
              <p>{area.description}</p>
              <Link href={`/book?market=${area.id}`} className="button">
                Request service here ↗
              </Link>
            </div>
          ))}
        </div>
        <p className="notice">
          Include your full address in your request. We’ll confirm coverage, any
          travel considerations, and appointment options before scheduling.
        </p>
      </section>
    </>
  );
}
