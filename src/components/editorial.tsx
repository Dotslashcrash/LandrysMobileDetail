import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, MapPin } from "lucide-react";
import { services, serviceAreas, testimonials } from "@/data/business";
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="section testimonials">
      <Eyebrow>FROM THE DRIVER’S SEAT</Eyebrow>
      <h2>
        THEIR WORDS.
        <br />
        <em>THEIR RIDES.</em>
      </h2>
      {testimonials.map((review) => (
        <figure className="editorial-panel" key={review.id}>
          <blockquote className="large-copy">“{review.review}”</blockquote>
          <figcaption>
            {review.firstName} · {review.vehicle} · {review.city}
            <br />
            <a
              className="text-link"
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {review.source}
            </a>{" "}
            · <time dateTime={review.date}>{review.date}</time>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
export function Eyebrow({
  children,
  number,
}: {
  children: React.ReactNode;
  number?: string;
}) {
  return (
    <p className="eyebrow">
      {number && <span>{number} / </span>}
      {children}
    </p>
  );
}
export function ServiceList({ all = false }: { all?: boolean }) {
  return (
    <div className="service-list">
      {(all ? services : services.slice(0, 3)).map((service, i) => (
        <Link
          className="service-row"
          key={service.id}
          href={`/services/${service.id}`}
        >
          <span className="service-number">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3>{service.name}</h3>
            <p>{service.tagline}</p>
          </div>
          <span className="service-description">{service.description}</span>
          <ArrowUpRight className="service-arrow" size={28} />
        </Link>
      ))}
    </div>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <Image
        src="/images/hero.webp"
        alt="Cinematic concept of a polished dark vehicle on wet pavement"
        fill
        sizes="100vw"
      />
      <div className="final-content">
        <Eyebrow>YOUR NEXT GOOD DRIVE STARTS HERE</Eyebrow>
        <h2>
          READY TO LOVE
          <br />
          YOUR CAR <em>AGAIN?</em>
        </h2>
        <Link href="/book" className="button">
          Book your detail <ArrowUpRight size={18} />
        </Link>
        <p>Tell us what you drive. We’ll take it from there.</p>
      </div>
    </section>
  );
}
export function Coverage() {
  return (
    <section className="section coverage">
      <div>
        <Eyebrow number="05">LOCAL ROADS. HIGH STANDARDS.</Eyebrow>
        <h2>
          OUR KIND
          <br />
          OF <em>COUNTRY.</em>
        </h2>
        <p className="body-copy">
          From Northwest Arkansas to the River Valley.
          <br />
          Professional detailing, brought to you.
        </p>
        <Link href="/service-area" className="text-link">
          Find your service area <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="markets">
        {serviceAreas.map((area) => (
          <div key={area.id} className="market">
            <MapPin size={20} />
            <div>
              <span className="eyebrow">{area.short} / MOBILE SERVICE</span>
              <h3>{area.name}</h3>
              <p>At your location. By appointment.</p>
            </div>
            <ArrowUpRight size={22} />
          </div>
        ))}
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section id="process" className="section process">
      <div className="section-head">
        <div>
          <Eyebrow number="04">NO WAITING ROOM REQUIRED</Eyebrow>
          <h2>
            YOUR PLACE.
            <br />
            <em>OUR PROCESS.</em>
          </h2>
        </div>
        <p className="body-copy">
          A better-looking car shouldn’t take your whole day off track. Here’s
          how we bring the detail to you.
        </p>
      </div>
      <div className="process-grid">
        {[
          [
            "01",
            "MAKE IT YOURS",
            "Tell us what you drive, what it needs, and where you are.",
          ],
          [
            "02",
            "MAKE A PLAN",
            "We confirm coverage, discuss the work, and agree on a time.",
          ],
          [
            "03",
            "WE COME TO YOU",
            "Your vehicle gets the attention it deserves at your location.",
          ],
          [
            "04",
            "TAKE IT ALL IN",
            "A final walkaround. A fresh feeling. Back to your day.",
          ],
        ].map(([n, title, text]) => (
          <div className="process-step" key={n}>
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="craft-line">
        <span>INSPECT</span>
        <ArrowDown size={14} />
        <span>PREP</span>
        <ArrowDown size={14} />
        <span>REFINE</span>
        <ArrowDown size={14} />
        <span>PROTECT</span>
        <ArrowDown size={14} />
        <span>REVEAL</span>
      </div>
    </section>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-intro section">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      {children && <div className="intro-copy">{children}</div>}
    </div>
  );
}
