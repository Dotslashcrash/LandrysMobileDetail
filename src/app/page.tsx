import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, MapPin } from "lucide-react";
import {
  Coverage,
  Eyebrow,
  FinalCTA,
  Process,
  ServiceList,
  Testimonials,
} from "@/components/editorial";
import { faq } from "@/data/business";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-image">
          <Image
            src="/images/hero.webp"
            alt="Cinematic concept artwork of a polished black coupe in evening light"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            quality={85}
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-content">
          <Eyebrow>
            MOBILE DETAILING / NORTHWEST ARKANSAS + RIVER VALLEY
          </Eyebrow>
          <h1>
            YOUR CAR.
            <br />
            YOUR DRIVEWAY.
            <br />
            <em>OUR STANDARD.</em>
          </h1>
          <p>
            Professional detailing. Brought to you.
            <br />
            Give your everyday drive a fresh start.
          </p>
          <div className="hero-actions">
            <Link href="/book" className="button">
              Book your detail <ArrowUpRight size={18} />
            </Link>
            <Link href="/services" className="quiet-link">
              Explore services <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>
            <MapPin size={15} /> ARKANSAS. AT YOUR ADDRESS.
          </span>
          <a href="#promise">
            SCROLL TO DISCOVER <ArrowDown size={15} />
          </a>
          <span className="hero-caption">
            CONCEPT ART / THE LANDRY’S DIRECTION
          </span>
        </div>
      </section>
      <section id="promise" className="section promise">
        <Eyebrow number="01">A CLEAN CAR. A DIFFERENT FEELING.</Eyebrow>
        <div className="promise-grid">
          <h2>
            WE DON’T RUN
            <br />A CAR WASH.
            <br />
            <em>WE RESET THE RIDE.</em>
          </h2>
          <div>
            <p className="large-copy">
              That first drive after a detail.
              <br />
              You know the feeling.
            </p>
            <p className="body-copy">
              The cabin feels fresh. The finish catches the light. You take one
              more look before walking away.
            </p>
            <p className="body-copy">
              We bring that feeling to your driveway—so you can get on with your
              day.
            </p>
            <Link href="/about" className="text-link">
              Meet Landry’s <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="finish-story">
        <Image
          src="/images/hero.webp"
          alt="Light reflecting across polished bodywork, concept artwork"
          fill
          sizes="100vw"
        />
        <div className="finish-overlay" />
        <div className="finish-copy">
          <Eyebrow number="02">IT’S ALL IN THE DETAILS</Eyebrow>
          <h2>
            A DIFFERENT
            <br />
            <em>KIND OF CLEAN.</em>
          </h2>
          <p>
            From the daily buildup to the little things
            <br />
            you notice every time you get in.
          </p>
          <Link href="/results" className="text-link">
            The finish <ArrowUpRight size={18} />
          </Link>
        </div>
        <span className="image-credit">
          CONCEPT ARTWORK · CUSTOMER RESULTS COMING SOON
        </span>
      </section>
      <section className="section services-section">
        <div className="section-head">
          <div>
            <Eyebrow number="03">CHOOSE YOUR FRESH START</Eyebrow>
            <h2>
              EVERY RIDE.
              <br />
              <em>ITS OWN RESET.</em>
            </h2>
          </div>
          <div>
            <p className="body-copy">
              Inside, outside, or the whole thing.
              <br />
              Tell us where to focus.
            </p>
            <Link href="/services" className="text-link">
              Explore all service options <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <ServiceList />
        <p className="fineprint">
          Service scope, availability, and pricing are confirmed with you before
          scheduling.
        </p>
      </section>
      <Process />
      <Coverage />
      <section className="section faq-section">
        <Eyebrow number="06">BEFORE WE PULL UP</Eyebrow>
        <div className="faq-grid">
          <h2>
            A FEW
            <br />
            <em>GOOD QUESTIONS.</em>
          </h2>
          <div>
            {faq
              .filter((item) => item.answer)
              .map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                    <span>+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <FinalCTA />
    </>
  );
}
