// Website copy stays separate from the service IDs, prices, and CRM mappings.
export const serviceCopy: Record<
  string,
  {
    short: string;
    introduction: string;
    heading: string;
    paragraphs: string[];
    related: string[];
  }
> = {
  "exterior-detail": {
    short: "For the paint, wheels, glass, and outside surfaces.",
    introduction:
      "Tell us about the exterior of your vehicle and what needs cleaning.",
    heading: "What’s on the outside?",
    paragraphs: [
      "Road grime, dirty wheels, or a finish that needs attention: describe what you’re seeing when you send your request. Mention any areas you want us to look at closely.",
      "If your concern is scratches or marks in the paint, ask about paint correction so we can discuss the difference before scheduling.",
    ],
    related: ["paint-correction", "full-detail"],
  },
  "interior-detail": {
    short: "For seats, carpet, trim, and the cabin you use every day.",
    introduction:
      "Seats, carpet, and trim: tell us what needs cleaning inside your vehicle.",
    heading: "Seats, carpet, and everything inside",
    paragraphs: [
      "Pet hair, spills, and well-used seats can call for different work. Use the condition section of your request to tell us what’s in the cabin, then add any concerns we should know about.",
      "Mention the surfaces affected and where they are.",
    ],
    related: ["full-detail", "maintenance-detail"],
  },
  "full-detail": {
    short: "For a vehicle that needs attention inside and out.",
    introduction:
      "Choose a full detail when you want to discuss work on both the interior and exterior.",
    heading: "Tell us about both sides of the job",
    paragraphs: [
      "Include the cabin’s condition as well as concerns about the paint, wheels, and other outside surfaces. That gives us a picture of the vehicle before we discuss the work with you.",
    ],
    related: ["interior-detail", "exterior-detail"],
  },
  "maintenance-detail": {
    short: "Ask about care between full details.",
    introduction:
      "For questions about keeping up with your vehicle between full details.",
    heading: "When was your last detail?",
    paragraphs: [
      "Tell us when the vehicle was last detailed, its current condition, and how you use it. If you have a particular routine in mind, include that in your notes.",
    ],
    related: ["full-detail"],
  },
  "paint-enhancement": {
    short: "Discuss the appearance and condition of your paint.",
    introduction:
      "Ask about paint that looks dull or has concerns you’d like us to assess.",
    heading: "Describe the finish",
    paragraphs: [
      "Tell us what you notice in the paint and which panels are affected. Include any previous paint or protection work you know about.",
      "If scratches or swirl marks are your main concern, ask about paint correction.",
    ],
    related: ["paint-correction", "ceramic-protection"],
  },
  "paint-correction": {
    short: "Have visible paint defects assessed before choosing the work.",
    introduction:
      "Request an assessment of scratches, swirl marks, or other visible paint defects.",
    heading: "Which marks concern you?",
    paragraphs: [
      "Describe the marks and where you see them. Let us know about repainting or previous correction work if you have that information.",
      "We’ll need to assess the paint before agreeing on correction work.",
    ],
    related: ["paint-enhancement", "ceramic-protection"],
  },
  "ceramic-protection": {
    short: "Ask about protection options for your vehicle.",
    introduction:
      "Discuss ceramic protection and whether it suits your vehicle’s condition and use.",
    heading: "Before choosing protection",
    paragraphs: [
      "Tell us how the vehicle is used and whether it already has a coating or other protection. Mention any paint concerns as well.",
      "We’ll discuss the product, any preparation needed, and how to care for the finish before agreeing on the work.",
    ],
    related: ["paint-enhancement", "paint-correction"],
  },
  "headlight-restoration": {
    short: "For questions about hazy or weathered headlights.",
    introduction:
      "Tell us about headlights that look cloudy, hazy, or weathered.",
    heading: "What do the headlights look like?",
    paragraphs: [
      "Describe whether one or both headlights are affected and what you notice on the lens. We’ll discuss their condition and whether restoration is appropriate before arranging the work.",
    ],
    related: ["exterior-detail"],
  },
  "specialty-services": {
    short: "Describe work that doesn’t fit the other service options.",
    introduction:
      "Use this inquiry when you have a specific job in mind that isn’t covered by the other service options.",
    heading: "What do you need help with?",
    paragraphs: [
      "Give us the vehicle details and describe the job in the notes. For a question involving several vehicles, email us with the number of vehicles and their location.",
      "We’ll let you know if the job is something we can take on.",
    ],
    related: ["add-ons"],
  },
  "add-ons": {
    short: "Mention extra areas you want addressed with a detail.",
    introduction:
      "Tell us about additional work you’d like to discuss alongside a detail.",
    heading: "Add a note about the extra work",
    paragraphs: [
      "Describe the area you want addressed and the main detail you’re considering. You can also include these notes when requesting an interior, exterior, or full detail.",
    ],
    related: ["full-detail", "interior-detail", "exterior-detail"],
  },
};
