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
  "vehicle" | "wheel" | "interior" | "paint" | "headlight",
  PhotographAsset
> = {
  vehicle: {
    src: "/images/cinematic/mustang-hero.webp",
    alt: "Black Mustang convertible with dry glossy paint in warm evening light",
    width: 1672,
    height: 941,
    kind: "concept",
    position: "68% center",
  },
  wheel: {
    src: "/images/cinematic/mustang-wheel.webp",
    alt: "Clean black Mustang wheel and dry bodywork in soft evening light",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "45% center",
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
    src: "/images/cinematic/mustang-paint.webp",
    alt: "Smooth dry Mustang hood reflecting soft light across black paint",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "center",
  },
  headlight: {
    src: "/images/cinematic/mustang-headlight.webp",
    alt: "Clear Mustang headlight and dry black bodywork in warm light",
    width: 1536,
    height: 1024,
    kind: "concept",
    position: "28% center",
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
    primary: photography.wheel,
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
  "specialty-services": { primary: photography.wheel, layout: "split" },
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
    image: photography.wheel,
    title: "Wheels and bodywork",
    href: "/services/exterior-detail",
  },
  {
    image: photography.headlight,
    title: "Lens clarity",
    href: "/services/headlight-restoration",
  },
];
