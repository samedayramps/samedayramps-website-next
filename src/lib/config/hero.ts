export const heroConfig = {
  wheelchairRamps: {
    title: {
      main: "",
      highlight: "Simple",
      conjunction: " and ",
      highlight2: "Stress-Free",
      suffix: "Wheelchair Ramp Rentals"
    },
    subtitle: "Serving the Greater DFW Area",
    bulletPoints: [
      "Get a ramp installed within 24 hours",
      "Rent as short or long as you need"
    ],
    cta: {
      primary: {
        text: "Get a Quote",
        href: "contact-section"
      },
      secondary: {
        text: "Learn More",
        href: "features-section"
      }
    },
    media: {
      type: "image" as const,
      src: "/ramp1.webp",
      alt: "Professional wheelchair ramp installation"
    },
    layout: "default" as const,
    theme: "light" as const
  },
  // Example template for an auto repair business
  autoRepair: {
    title: {
      main: "Your Reliable Option For Auto",
      highlight: "Repairs And Services"
    },
    subtitle: "Professional auto repair and maintenance services",
    bulletPoints: [
      "Our team of skilled technicians boasts decades of collective experience, ensuring satisfaction",
      "We believe in honest communication with our customers. You'll receive clear explanations of every problem"
    ],
    cta: {
      primary: {
        text: "Contact Us",
        href: "contact-section"
      },
      secondary: {
        text: "Get Appointment",
        href: "booking-section"
      }
    },
    media: {
      type: "image" as const,
      src: "/images/mechanic.jpg",
      alt: "Professional auto mechanic"
    },
    layout: "reverse" as const,
    theme: "dark" as const
  }
}; 