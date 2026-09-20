export type MarketId = "northwest-arkansas" | "river-valley";
export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: "inquiry" | "approved";
  estimatedDuration: string | null;
  startingPrice: number | null;
  features: string[];
  recommendedFor: string | null;
  addOnIds: string[];
  urableServiceId: string | null;
  markets: MarketId[];
  marketOverrides: Partial<
    Record<MarketId, { price?: number; duration?: string; available?: boolean }>
  >;
}
export const branding = {
  name: "Landry’s Mobile Detail",
  shortName: "Landry’s",
  region: "Northwest Arkansas & the River Valley",
  statement: "Professional detailing. Right in your driveway.",
};
export const contact: {
  phone: string | null;
  email: string | null;
  socials: { name: string; url: string }[];
} = { phone: null, email: null, socials: [] };
export const serviceAreas: {
  id: MarketId;
  name: string;
  short: string;
  description: string;
  approvedCities: string[];
  travelRules: string | null;
  promotions: string[];
}[] = [
  {
    id: "northwest-arkansas",
    name: "Northwest Arkansas",
    short: "NWA",
    description:
      "Your day keeps moving. Your car gets the attention it deserves.",
    approvedCities: [],
    travelRules: null,
    promotions: [],
  },
  {
    id: "river-valley",
    name: "Arkansas River Valley",
    short: "RV",
    description:
      "The same attention to detail, brought to your part of Arkansas.",
    approvedCities: [],
    travelRules: null,
    promotions: [],
  },
];
const definitions = [
  [
    "exterior-detail",
    "Exterior Detail",
    "LET THE PAINT DO THE TALKING.",
    "Tell us about the finish, wheels, and exterior surfaces you want us to focus on.",
  ],
  [
    "interior-detail",
    "Interior Detail",
    "A FRESH START. INSIDE.",
    "Daily miles leave their mark. Tell us what your cabin needs, from pet hair to well-used seats.",
  ],
  [
    "full-detail",
    "Full Detail",
    "RESET THE WHOLE RIDE.",
    "Looking for attention inside and out? Start a conversation about a complete detail.",
  ],
  [
    "maintenance-detail",
    "Maintenance Detail",
    "KEEP THAT JUST-DETAILED FEELING.",
    "Ask about care between full details for your vehicle and routine.",
  ],
  [
    "paint-enhancement",
    "Paint Enhancement",
    "FIND THE GLOSS AGAIN.",
    "Share your paint concerns so we can discuss the appropriate approach.",
  ],
  [
    "paint-correction",
    "Paint Correction",
    "LOOK A LITTLE CLOSER.",
    "Let us assess visible paint defects before recommending correction work.",
  ],
  [
    "ceramic-protection",
    "Ceramic Protection",
    "THINK BEYOND THE SHINE.",
    "Ask which protection options may suit your vehicle and how you use it.",
  ],
  [
    "headlight-restoration",
    "Headlight Restoration",
    "A CLEARER FIRST IMPRESSION.",
    "Tell us about hazy or weathered headlights for an assessment.",
  ],
  [
    "specialty-services",
    "Specialty Services",
    "SOMETHING SPECIFIC IN MIND?",
    "Describe your vehicle and the work you have in mind. We will discuss what is possible.",
  ],
  [
    "add-ons",
    "Add-Ons",
    "THE DETAILS THAT MATTER TO YOU.",
    "Include any extra areas of concern with your request. Scope is agreed before work begins.",
  ],
] as const;
export const services: Service[] = definitions.map(
  ([id, name, tagline, description]) => ({
    id,
    name,
    tagline,
    description,
    status: "inquiry",
    estimatedDuration: null,
    startingPrice: null,
    features: [],
    recommendedFor: null,
    addOnIds: [],
    urableServiceId: null,
    markets: ["northwest-arkansas", "river-valley"],
    marketOverrides: {},
  }),
);
export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  kind: "customer" | "concept";
  beforeSrc?: string;
}
// Publish real work only after permission and factual captions have been supplied.
export const gallery: GalleryItem[] = [];
export interface Testimonial {
  id: string;
  firstName: string;
  vehicle: string;
  city: string;
  review: string;
  source: string;
  sourceUrl: string;
  date: string;
  photo?: string;
}
export const testimonials: Testimonial[] = [];
export const faq = [
  {
    question: "What is mobile detailing?",
    answer:
      "Mobile detailing brings vehicle care to your location instead of asking you to leave your car at a shop.",
  },
  {
    question: "Where does Landry’s serve?",
    answer:
      "We serve Northwest Arkansas and the Arkansas River Valley. Include your address in your request so we can confirm coverage for your location.",
  },
  {
    question: "How do I book?",
    answer:
      "Send your vehicle, service interests, location, and preferred time through our appointment request. We will follow up to agree on the work and confirm scheduling.",
  },
  { question: "How long does a detail take?", answer: null },
  { question: "Do I need to provide water or electricity?", answer: null },
  { question: "What happens if weather affects my appointment?", answer: null },
];
export const futureContent = {
  promotions: [],
  announcements: [],
  articles: [],
  memberships: [],
  fleet: [],
  giftCards: [],
};
