import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { Comparison } from "@/components/comparison";
import { gallery } from "@/data/business";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "The Results",
  "The finish speaks for itself. Landry’s customer portfolio and before-and-after results.",
  "/results",
);
export default function ResultsPage() {
  const realWork = gallery.filter((item) => item.kind === "customer");
  return (
    <>
      <PageIntro
        eyebrow="THE FINISH"
        title={
          <>
            LET THE FINISH
            <br />
            <em>DO THE TALKING.</em>
          </>
        }
      >
        <p>
          There’s a difference you can see. And a feeling you take with you.
        </p>
      </PageIntro>
      <section className="section page-content">
        {realWork.length ? (
          <div className="gallery-grid">
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
                    sizes="(max-width:800px) 100vw, 45vw"
                  />
                )}
                <figcaption>{item.alt}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="empty-result">
            <Image
              src="/images/hero.webp"
              alt="Concept artwork of a polished vehicle; not a customer result"
              fill
              sizes="90vw"
            />
            <div>
              <p className="eyebrow">THE PORTFOLIO IS ON ITS WAY</p>
              <h2>
                REAL CARS.
                <br />
                <em>REAL RESULTS. SOON.</em>
              </h2>
              <p>
                We’re preparing our customer portfolio. The image shown here is
                concept artwork, not a completed Landry’s detail.
              </p>
              <Link className="text-link" href="/book">
                Tell us about your vehicle ↗
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
