import { SectionContainer } from "@/components/sections/section-container"
import { heroConfig } from "@/lib/config/hero"
import { featuresConfig } from "@/lib/config/features"
import { howItWorksConfig } from "@/lib/config/how-it-works"
import { faqConfig } from "@/lib/config/faq"
import { contactConfig } from "@/lib/config/contact"

export default function Home() {
  return (
    <SectionContainer 
      heroProps={{
        content: heroConfig.wheelchairRamps,
        layout: "default",
        theme: "light"
      }}
      featuresProps={{
        content: featuresConfig.wheelchairRamps,
        theme: "light"
      }}
      howItWorksProps={{
        content: howItWorksConfig.wheelchairRamps,
        theme: "light"
      }}
      faqProps={{
        content: faqConfig.wheelchairRamps,
        theme: "light"
      }}
      contactProps={{
        content: contactConfig.wheelchairRamps,
        theme: "light"
      }}
    />
  )
}