"use client"

import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { heroConfig } from "@/lib/config/hero";
import { featuresConfig } from "@/lib/config/features";
import { howItWorksConfig } from "@/lib/config/how-it-works";
import { faqConfig } from "@/lib/config/faq";
import { contactConfig } from "@/lib/config/contact";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection 
        content={heroConfig.wheelchairRamps}
        layout="default"
        theme="light"
      />
      <FeaturesSection 
        content={featuresConfig.wheelchairRamps}
        theme="light"
      />
      <HowItWorksSection 
        content={howItWorksConfig.wheelchairRamps}
        theme="light"
      />
      <FAQSection 
        content={faqConfig.wheelchairRamps}
        theme="light"
      />
      <ContactSection 
        content={contactConfig.wheelchairRamps}
        theme="light"
      />
    </main>
  );
}