import Link from "next/link";
import { services, testimonials, faq } from "@/data/business";
import { serviceCopy } from "@/content/service-copy";

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="customer-voices section">
      <h2>Customer reviews</h2>
      {testimonials.map((review) => (
        <figure key={review.id}>
          <blockquote>{review.review}</blockquote>
          <figcaption>
            {review.firstName} · {review.vehicle} · {review.city}{" "}
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {review.source}
            </a>{" "}
            <time dateTime={review.date}>{review.date}</time>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}

export function ServiceList({ ids }: { ids: string[] }) {
  return (
    <div className="service-list">
      {ids.map((id) => {
        const service = services.find((item) => item.id === id);
        if (!service) return null;
        return (
          <article key={id}>
            <h3>
              <Link href={`/services/${id}`}>{service.name}</Link>
            </h3>
            <p>{serviceCopy[id].short}</p>
          </article>
        );
      })}
    </div>
  );
}

export function Questions() {
  return (
    <section className="questions">
      <h2>Questions before you book</h2>
      {faq
        .filter((item) => item.answer)
        .map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
    </section>
  );
}

export function PageIntro({
  title,
  children,
  className = "",
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`page-intro section quiet-intro ${className}`}>
      <h1>{title}</h1>
      {children && <div className="intro-copy">{children}</div>}
    </div>
  );
}
