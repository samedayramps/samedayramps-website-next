export const contactConfig = {
  wheelchairRamps: {
    title: "Get A Quote",
    subtitle: "Fill out the form below.",
    media: {
      src: "/ramp5.webp",
      alt: "Professional wheelchair ramp installation team"
    },
    form: {
      fields: [
        {
          name: "name",
          label: "Full Name",
          type: "text",
          placeholder: "Enter your full name",
          required: true
        },
        {
          name: "phone",
          label: "Phone Number",
          type: "tel",
          placeholder: "Enter your phone number",
          required: true
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email address",
          required: true
        },
        {
          name: "message",
          label: "Additional Details",
          type: "textarea",
          placeholder: "Tell us about your needs (optional)",
          required: false
        }
      ],
      submitText: "Get Quote"
    }
  }
}; 