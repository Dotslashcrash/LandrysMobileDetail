import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { Photograph } from "@/components/photograph";
import { photography } from "@/content/photography";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About",
  "Landry’s Mobile Detail, a Stidham family company serving Northwest Arkansas and the Arkansas River Valley.",
  "/about",
);
export default function AboutPage() {
  return (
    <div className="paper-page">
      <PageIntro title="Landry’s Mobile Detail.">
        <p>
          A Stidham family company.
          <br />
          Mobile detailing in Northwest Arkansas and the Arkansas River Valley.
        </p>
      </PageIntro>
      <section className="about-composition">
        <Photograph
          image={photography.interior}
          className="supporting-photograph"
          sizes="(max-width:800px) 100vw, 55vw"
        />
        <div className="supporting-copy">
          <h2>At your home or workplace.</h2>
          <p>
            Keep the vehicle where you need it. Tell us what needs attention and
            where you’d like the detail.
          </p>
          <p>
            Interior and exterior detailing, paint care, and protection each
            start with the vehicle’s condition. We’ll discuss the work, quote,
            and location before arranging a visit.
          </p>
          <Link href="/services" className="text-link">
            View detailing services <span aria-hidden="true">↗</span>
          </Link>
          <h2>Let’s talk about your vehicle.</h2>
          <p>
            Pricing is available by inquiry. Use the request form to put the
            details together, or email info@landrysmobiledetail.com.
          </p>
          <Link href="/book" className="button">
            Book your detail
          </Link>
        </div>
      </section>
    </div>
  );
}
