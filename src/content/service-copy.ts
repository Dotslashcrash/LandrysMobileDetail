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
    short: "Road grime, wheels, glass, and exterior surfaces.",
    introduction:
      "Road grime on the bodywork. Dirt on the wheels. Tell us what needs attention outside.",
    heading: "Bodywork, wheels, and glass.",
    paragraphs: [
      "Road grime, dirty wheels, or a finish that needs attention: describe what you’re seeing when you send your request. Mention any areas you want us to look at closely.",
      "If your concern is scratches or marks in the paint, ask about paint correction so we can discuss the difference before scheduling.",
    ],
    related: ["paint-correction", "full-detail"],
  },
  "interior-detail": {
    short: "Seats, carpet, trim, and the cabin around you.",
    introduction:
      "Pet hair in the seats, a spill in the carpet, or a cabin that needs attention. Tell us what’s inside.",
    heading: "Seats, carpet, and everything inside",
    paragraphs: [
      "Pet hair, spills, and well-used seats can call for different work. Use the condition section of your request to tell us what’s in the cabin, then add any concerns we should know about.",
      "Mention the surfaces affected and where they are.",
    ],
    related: ["full-detail", "maintenance-detail"],
  },
  "full-detail": {
    short: "Address the cabin and exterior together.",
    introduction:
      "Choose a full detail when you want to discuss work on both the interior and exterior.",
    heading: "Tell us about both sides of the job",
    paragraphs: [
      "Include the cabin’s condition as well as concerns about the paint, wheels, and other outside surfaces. That gives us a picture of the vehicle before we discuss the work with you.",
    ],
    related: ["interior-detail", "exterior-detail"],
  },
  "maintenance-detail": {
    short: "Keep up with the vehicle between full details.",
    introduction:
      "Ask about keeping up with your vehicle between full details, based on its condition and use.",
    heading: "When was your last detail?",
    paragraphs: [
      "Tell us when the vehicle was last detailed, its current condition, and how you use it. If you have a particular routine in mind, include that in your notes.",
    ],
    related: ["full-detail"],
  },
  "paint-enhancement": {
    short: "Dull paint and the appearance of the finish.",
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
    short: "Swirls, scratches, and visible paint defects.",
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
    short: "Discuss the surface, preparation, and protection options.",
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
    short: "Cloudy lenses and weathered headlights.",
    introduction:
      "Tell us about headlights that look cloudy, hazy, or weathered.",
    heading: "What do the headlights look like?",
    paragraphs: [
      "Describe whether one or both headlights are affected and what you notice on the lens. We’ll discuss their condition and whether restoration is appropriate before arranging the work.",
    ],
    related: ["exterior-detail"],
  },
  "specialty-services": {
    short: "A specific vehicle or job? Tell us what you have in mind.",
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
    short: "Bring extra areas of concern into the same detail.",
    introduction:
      "Tell us about additional work you’d like to discuss alongside a detail.",
    heading: "Add a note about the extra work",
    paragraphs: [
      "Describe the area you want addressed and the main detail you’re considering. You can also include these notes when requesting an interior, exterior, or full detail.",
    ],
    related: ["full-detail", "interior-detail", "exterior-detail"],
  },
};
