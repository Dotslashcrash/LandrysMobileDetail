import { PageIntro, Process, FinalCTA } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About",
  "Meet Landry’s Mobile Detail, bringing automotive care to Northwest Arkansas and the River Valley.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="LANDRY’S MOBILE DETAIL"
        title={
          <>
            THE DETAIL SHOP.
            <br />
            <em>IN YOUR DRIVEWAY.</em>
          </>
        }
      >
        <p>
          We’re a mobile automotive detailing business serving Northwest
          Arkansas and the Arkansas River Valley. Your vehicle gets attention at
          your location.
        </p>
      </PageIntro>
      <section className="section page-content">
        <div className="split-content">
          <div className="editorial-panel">
            <h2>BUILT AROUND YOUR DAY.</h2>
            <p>
              Tell us about your vehicle, where you are, and what you want to
              address. We’ll work through the details with you before confirming
              the visit.
            </p>
          </div>
          <div className="editorial-panel">
            <h2>START WITH A CONVERSATION.</h2>
            <p>
              No assumptions about what your vehicle needs. Your request helps
              us understand its condition and the result you’re looking for.
            </p>
          </div>
        </div>
      </section>
      <Process />
      <FinalCTA />
    </>
  );
}
