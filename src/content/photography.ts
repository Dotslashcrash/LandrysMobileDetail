export type PhotographAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "concept" | "customer";
  position: string;
};

// Replace a record with permission-cleared Landry’s photography when supplied.
// Customer images need factual captions; concept images never enter gallery.
export const photography: Record<
  "vehicle" | "wash" | "interior",
  PhotographAsset
> = {
  vehicle: {
    src: "/images/hero.webp",
    alt: "Concept image of a black coupe with light reflected across wet paint",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "68% center",
  },
  wash: {
    src: "/images/cinematic/wheel-wash-concept.webp",
    alt: "Concept image of white wash foam on a truck wheel and dark bodywork",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "65% center",
  },
  interior: {
    src: "/images/cinematic/interior-concept.webp",
    alt: "Concept image of a clean truck cabin with dark leather seats",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "center",
  },
};
