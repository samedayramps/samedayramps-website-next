"use client"

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { HOME_PAGE } from "@/constants/content";
import { FAQList } from "@/components/ui/faq-list";
import Image from "next/image";
import { useEffect, useState } from "react";

export function FAQSection() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerHeight >= 800)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <Section>
      <Container className="py-8">
        <div className="max-w-[90rem] w-full mx-auto">
          <div className="grid portrait:grid-cols-1 landscape:grid-cols-2 items-center gap-6 landscape:gap-12 xl:gap-16">
            {/* FAQ Content */}
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-xl sm:text-2xl landscape:text-2xl xl:text-5xl 2xl:text-6xl font-bold">
                {HOME_PAGE.faq.title}
              </h2>
              <FAQList 
                items={HOME_PAGE.faq.list} 
                defaultOpen={isLargeScreen}
                className="w-full"
                containerClassName="!min-h-0"
                questionSpacing="tight"
                size="sm"
              />
            </div>

            {/* Image */}
            <div className="relative flex items-center portrait:order-first landscape:order-last">
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={HOME_PAGE.images.ramp2.src}
                  alt={HOME_PAGE.images.ramp2.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 900px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
} 