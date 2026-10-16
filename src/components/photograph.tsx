import Image from "next/image";
import type { PhotographAsset } from "@/content/photography";

export function Photograph({
  image,
  className = "",
  sizes = "100vw",
  eager = false,
  caption,
}: {
  image: PhotographAsset;
  className?: string;
  sizes?: string;
  eager?: boolean;
  caption?: string;
}) {
  return (
    <figure className={`automotive-frame ${className}`} data-image-motion>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={85}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        style={{ objectPosition: image.position }}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
