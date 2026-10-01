import Link from "next/link";
import { PageIntro, Questions } from "@/components/editorial";
import { serviceAreas } from "@/data/business";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Service Area",
  "Landry’s Mobile Detail serves Northwest Arkansas and the Arkansas River Valley. Request coverage confirmation for your location.",
  "/service-area",
);
export default function AreaPage() {
  return (
    <div className="paper-page">
      <PageIntro title="Where we come to you">
        <p>
          Mobile detailing in Northwest Arkansas and the Arkansas River Valley.
          Include your address so we can check coverage before scheduling.
        </p>
      </PageIntro>
      <div className="section page-content area-content">
        <div className="area-options">
          {serviceAreas.map((area) => (
            <section key={area.id}>
              <h2>{area.name}</h2>
              {area.approvedCities.length > 0 && (
                <p>{area.approvedCities.join(", ")}</p>
              )}
              {area.travelRules && <p>{area.travelRules}</p>}
              <Link href={`/book?market=${area.id}`} className="text-link">
                Request service in this region
              </Link>
            </section>
          ))}
        </div>
        <Questions />
      </div>
    </div>
  );
}
