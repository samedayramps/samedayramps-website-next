"use client"

import { useEffect, useRef } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { FAQSection } from "@/components/sections/faq-section"
import { ContactSection } from "@/components/sections/contact-section"

interface SectionContainerProps {
  heroProps: React.ComponentProps<typeof HeroSection>
  featuresProps: React.ComponentProps<typeof FeaturesSection>
  howItWorksProps: React.ComponentProps<typeof HowItWorksSection>
  faqProps: React.ComponentProps<typeof FAQSection>
  contactProps: React.ComponentProps<typeof ContactSection>
}

export function SectionContainer({
  heroProps,
  featuresProps,
  howItWorksProps,
  faqProps,
  contactProps,
}: SectionContainerProps) {
  const sectionRefs = useRef<HTMLElement[]>([])
  const currentSectionIndex = useRef(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        
        const direction = e.key === 'ArrowDown' ? 1 : -1
        const nextIndex = Math.max(0, Math.min(sectionRefs.current.length - 1, currentSectionIndex.current + direction))
        
        if (nextIndex !== currentSectionIndex.current) {
          currentSectionIndex.current = nextIndex
          sectionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const setRef = (index: number) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current[index] = el
  }

  return (
    <main className="flex flex-col">
      <HeroSection 
        ref={setRef(0)}
        {...heroProps}
      />
      <FeaturesSection 
        ref={setRef(1)}
        {...featuresProps}
      />
      <HowItWorksSection 
        ref={setRef(2)}
        {...howItWorksProps}
      />
      <FAQSection 
        ref={setRef(3)}
        {...faqProps}
      />
      <ContactSection 
        ref={setRef(4)}
        {...contactProps}
      />
    </main>
  )
} 