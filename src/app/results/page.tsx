import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { Comparison } from "@/components/comparison";
import { gallery } from "@/data/business";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Customer Photos",
  "Customer photography and before-and-after comparisons from Landry’s Mobile Detail, when published.",
  "/results",
);
export default function ResultsPage() {
  const realWork = gallery.filter((item) => item.kind === "customer");
  return (
    <div className="paper-page results-page">
      <PageIntro title="Customer photos" />
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
        <section className="section page-content readable-page portfolio-empty">
          <p>No customer photos have been published yet.</p>
          <p>
            If you have a question about work on your vehicle,{" "}
            <Link href="/contact">contact Landry’s</Link>.
          </p>
        </section>
      )}
    </div>
  );
}
