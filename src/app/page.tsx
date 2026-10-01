import Link from "next/link";
import { ServiceList, Testimonials } from "@/components/editorial";
import { Photograph } from "@/components/photograph";
import { photography } from "@/content/photography";

export default function Home() {
  return (
    <>
      <section className="commercial-hero">
        <div className="commercial-copy">
          <h1>
            We come
            <br /> to you.
          </h1>
          <p>
            Mobile detailing at your home or workplace in Northwest Arkansas and
            the River Valley.
          </p>
          <div className="hero-actions">
            <Link href="/book" className="button">
              Book your detail
            </Link>
            <Link href="/services" className="quiet-link">
              View services
            </Link>
          </div>
        </div>
        <Photograph
          image={photography.vehicle}
          className="opening-photograph"
          sizes="(max-width: 800px) 100vw, 65vw"
          eager
        />
      </section>
      <section id="vehicle-care" className="home-services section">
        <div className="home-service-copy">
          <h2>What needs attention?</h2>
          <ServiceList
            ids={["interior-detail", "exterior-detail", "full-detail"]}
          />
          <Link className="text-link" href="/services">
            All services, including paint and protection
          </Link>
        </div>
        <Photograph
          image={photography.interior}
          className="cabin-photograph"
          sizes="(max-width: 800px) 100vw, 42vw"
        />
      </section>
      <section id="process" className="home-visit">
        <Photograph
          image={photography.wash}
          className="wash-photograph"
          sizes="(max-width: 800px) 100vw, 55vw"
        />
        <div>
          <h2>How to arrange a detail</h2>
          <p>
            Send us your vehicle details, what you’d like done, and the address
            where you want the detail. You can suggest a date and time in the
            request.
          </p>
          <p>
            We’ll contact you to discuss the work, price, and location before
            confirming an appointment.
          </p>
          <Link href="/book" className="button">
            Book your detail
          </Link>
          <p className="visit-area">
            Serving Northwest Arkansas and the Arkansas River Valley.{" "}
            <Link href="/service-area">Check your location</Link>.
          </p>
        </div>
      </section>
      <Testimonials />
    </>
  );
}
