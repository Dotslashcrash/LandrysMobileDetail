import Link from "next/link";
import { ServiceList, Testimonials } from "@/components/editorial";
import { Photograph } from "@/components/photograph";
import { heroMedia, photography } from "@/content/photography";
export default function Home() {
  return (
    <>
      <section className="commercial-hero">
        <Photograph image={heroMedia} className="opening-photograph" eager />
        <div className="commercial-copy">
          <h1>
            We come
            <br />
            to you.
          </h1>
          <p>
            Mobile detailing at your home or workplace.
            <br />
            Northwest Arkansas &amp; the Arkansas River Valley.
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
        <a className="hero-scroll" href="#vehicle-care">
          See what needs attention <span aria-hidden="true">↓</span>
        </a>
      </section>
      <section className="home-services section" id="vehicle-care">
        <div className="home-service-copy">
          <h2>
            The cabin.
            <br />
            The bodywork.
            <br />
            The whole vehicle.
          </h2>
          <ServiceList
            ids={["interior-detail", "exterior-detail", "full-detail"]}
          />
          <Link href="/services" className="text-link">
            All detailing services <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="cabin-composition">
          <Photograph
            image={photography.interior}
            className="cabin-photograph"
            sizes="(max-width:800px) 100vw, 50vw"
          />
          <Photograph
            image={photography.wash}
            className="cabin-inset"
            sizes="(max-width:800px) 45vw, 24vw"
          />
        </div>
      </section>
      <section className="paint-story">
        <Photograph image={photography.paint} className="paint-photograph" />
        <div className="paint-story-copy">
          <h2>Look at the finish.</h2>
          <p>
            Swirl marks. Dull paint. Existing protection. Tell us what you
            notice before deciding on the work.
          </p>
          <nav aria-label="Paint care services">
            <Link href="/services/paint-enhancement">Paint enhancement</Link>
            <Link href="/services/paint-correction">Paint correction</Link>
            <Link href="/services/ceramic-protection">Ceramic protection</Link>
          </nav>
        </div>
      </section>
      <section className="finish-story">
        <div className="finish-heading section">
          <h2>Paint. Glass. Leather.</h2>
          <Link href="/results" className="text-link">
            Take a closer look <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <Photograph image={photography.vehicle} className="finish-photograph" />
      </section>
      <section className="home-visit" id="process">
        <Photograph
          image={photography.headlight}
          className="wash-photograph"
          sizes="(max-width:800px) 100vw, 50vw"
        />
        <div className="visit-copy">
          <h2>
            A detail, where
            <br />
            your vehicle is.
          </h2>
          <div className="process-story">
            <div>
              <h3>Tell us about the vehicle.</h3>
              <p>
                Choose the work you’re interested in and note any areas that
                need attention.
              </p>
            </div>
            <div>
              <h3>Choose your location and time.</h3>
              <p>
                Let us know where the vehicle will be. Your preferred date
                starts the scheduling conversation.
              </p>
            </div>
            <div>
              <h3>Agree on the visit.</h3>
              <p>
                Confirm the scope, quote, and location with Landry’s before an
                appointment is arranged.
              </p>
            </div>
          </div>
          <Link href="/book" className="button">
            Book your detail
          </Link>
        </div>
      </section>
      <Testimonials />
      <section className="home-region section">
        <div>
          <h2>
            Northwest Arkansas.
            <br />
            Arkansas River Valley.
          </h2>
          <Link href="/service-area" className="text-link">
            Check your location <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="inquiry-copy">
          <h3>Pricing available by inquiry.</h3>
          <p>
            Tell us about your vehicle and the work you have in mind. We’ll
            discuss a quote before scheduling.
          </p>
          <Link href="/contact" className="button">
            Inquire about your detail
          </Link>
        </div>
      </section>
    </>
  );
}
