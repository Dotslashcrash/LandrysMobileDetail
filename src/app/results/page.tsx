import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { Comparison } from "@/components/comparison";
import { Photograph } from "@/components/photograph";
import { resultsMedia } from "@/content/photography";
import { gallery } from "@/data/business";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "A Closer Look",
  "Explore vehicle surfaces, interior details, wheels, and paint care with Landry’s Mobile Detail.",
  "/results",
);
export default function ResultsPage() {
  const realWork = gallery.filter((item) => item.kind === "customer");
  return (
    <div className="paper-page results-page">
      <PageIntro title="A closer look.">
        <p>
          The paint in the light. The surfaces inside. The details you notice
          when you’re beside the vehicle.
        </p>
      </PageIntro>
      {realWork.length ? (
        <section className="portfolio-images">
          {realWork.map((item) => (
            <figure key={item.id}>
              {item.beforeSrc ? (
                <Comparison
                  before={item.beforeSrc}
                  after={item.src}
                  alt={item.alt}
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width:800px) 100vw, 80vw"
                />
              )}
              <figcaption>{item.alt}</figcaption>
            </figure>
          ))}
        </section>
      ) : (
        <section className="surface-gallery" aria-label="Vehicle details">
          {resultsMedia.map((item, index) => (
            <div
              className={`surface-image surface-image-${index}`}
              key={item.title}
            >
              <Photograph
                image={item.image}
                sizes={index === 0 ? "100vw" : "(max-width:800px) 100vw, 55vw"}
                eager={index === 0}
              />
              <Link href={item.href}>
                {item.title} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          ))}
        </section>
      )}
      <section className="results-close section">
        <h2>
          What do you notice
          <br />
          on your vehicle?
        </h2>
        <div>
          <p>
            Describe the surface or area you want addressed. We’ll discuss the
            appropriate work and a quote with you.
          </p>
          <Link href="/contact" className="button">
            Inquire about your detail
          </Link>
        </div>
      </section>
    </div>
  );
}
