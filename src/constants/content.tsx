import { Clock, CalendarRange, ShieldCheck } from "lucide-react";

export const HOME_PAGE = {
  hero: {
    title: "Quick and Easy Wheelchair Ramp Rentals",
    subtitle: "Get a temporary wheelchair ramp installed at your home or business today",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=0&controls=1&rel=0",
    videoTitle: "Same Day Ramps Installation Video",
  },
  features: {
    title: "Why Choose Same Day Ramps?",
    list: [
      {
        title: "Same Day Installation",
        description: "Get your ramp installed within hours of your request",
        icon: <Clock className="w-5 h-5 text-primary" />,
      },
      {
        title: "Flexible Rental Terms",
        description: "Rent for as long as you need, from days to months",
        icon: <CalendarRange className="w-5 h-5 text-primary" />,
      },
      {
        title: "ADA Compliant",
        description: "All our ramps meet or exceed ADA requirements",
        icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      },
    ],
  },
  faq: {
    title: "Common Questions",
    list: [
      {
        question: "How quickly can you install a ramp?",
        answer: "In most cases, we can install your ramp the same day you contact us. Our team is ready to respond quickly to your accessibility needs.",
      },
      {
        question: "What are your rental terms?",
        answer: "We offer flexible rental terms starting from just a few days up to several months or longer. There's no long-term commitment required, and you can extend your rental period as needed.",
      },
      {
        question: "Are your ramps ADA compliant?",
        answer: "Yes, all our ramps meet or exceed ADA requirements for slope, width, and safety features. They're suitable for both residential and commercial use.",
      },
      {
        question: "What areas do you service?",
        answer: "We currently service [Your Service Areas]. Contact us to confirm if we cover your specific location.",
      },
    ],
  },
  contact: {
    title: "Ready to Get Started?",
    subtitle: "Fill out this quick form and we'll get back to you with a quote",
  },
  images: {
    ramp1: {
      src: "/ramp1.webp",
      alt: "Wheelchair ramp installation example",
    },
    ramp2: {
      src: "/ramp2.webp",
      alt: "Another wheelchair ramp installation example",
    },
  },
  navigation: {
    learnMore: {
      text: "Learn More",
      targetSectionIndex: 1,
    },
    commonQuestions: {
      text: "Common Questions",
      targetSectionIndex: 2,
    },
    getQuote: {
      text: "Get Your Quote Now",
      targetSectionIndex: 3,
    },
  },
} as const; 