export type PhotographAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "concept" | "customer";
  position: string;
};
// Replace media records with permission-cleared photography; provenance is internal.
// Design images never enter the customer gallery or before/after comparisons.
export const photography: Record<
  "vehicle" | "wash" | "interior" | "paint" | "headlight",
  PhotographAsset
> = {
  vehicle: {
    src: "/images/hero.webp",
    alt: "Black coupe with light reflected across wet paint",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "68% center",
  },
  wash: {
    src: "/images/cinematic/wheel-wash-concept.webp",
    alt: "White wash foam on a truck wheel and dark bodywork",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "65% center",
  },
  interior: {
    src: "/images/cinematic/interior-concept.webp",
    alt: "Truck cabin with dark leather seats and clean trim",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "center",
  },
  paint: {
    src: "/images/cinematic/paint-water.webp",
    alt: "Water beads and a white reflection across dark metallic paint",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "center",
  },
  headlight: {
    src: "/images/cinematic/headlight.webp",
    alt: "Clear headlight lens and wet black bodywork in a shaded driveway",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "65% center",
  },
};
export const heroMedia = photography.vehicle;
export const locationMedia = photography.headlight;
export const serviceMedia: Record<
  string,
  {
    primary: PhotographAsset;
    secondary?: PhotographAsset;
    layout: "split" | "wide" | "close";
  }
> = {
  "interior-detail": { primary: photography.interior, layout: "split" },
  "exterior-detail": {
    primary: photography.wash,
    secondary: photography.vehicle,
    layout: "wide",
  },
  "full-detail": {
    primary: photography.vehicle,
    secondary: photography.interior,
    layout: "wide",
  },
  "maintenance-detail": { primary: photography.vehicle, layout: "split" },
  "paint-enhancement": {
    primary: photography.paint,
    secondary: photography.vehicle,
    layout: "close",
  },
  "paint-correction": {
    primary: photography.vehicle,
    secondary: photography.paint,
    layout: "close",
  },
  "ceramic-protection": { primary: photography.paint, layout: "wide" },
  "headlight-restoration": { primary: photography.headlight, layout: "close" },
  "specialty-services": { primary: photography.wash, layout: "split" },
  "add-ons": {
    primary: photography.interior,
    secondary: photography.headlight,
    layout: "split",
  },
};
export const resultsMedia = [
  {
    image: photography.vehicle,
    title: "Light across the paint",
    href: "/services/paint-correction",
  },
  {
    image: photography.interior,
    title: "Inside the cabin",
    href: "/services/interior-detail",
  },
  {
    image: photography.paint,
    title: "A closer look at the surface",
    href: "/services/ceramic-protection",
  },
  {
    image: photography.wash,
    title: "Wheels and bodywork",
    href: "/services/exterior-detail",
  },
  {
    image: photography.headlight,
    title: "Lens clarity",
    href: "/services/headlight-restoration",
  },
];
