"use client"

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FeaturesGrid } from "@/components/features-grid";
import { HOME_PAGE } from "@/constants/content";
import Image from "next/image";

export function FeaturesSection() {
  return (
    <Section>
      <Container className="py-8">
        <div className="max-w-[90rem] w-full mx-auto">
          {/* Main Content */}
          <div className="grid portrait:grid-cols-1 landscape:grid-cols-2 items-center gap-6 landscape:gap-12 xl:gap-16">
            {/* Image */}
            <div className="relative flex items-center">
              <div className="relative w-full aspect-[16/9] md:aspect-[4/3] landscape:aspect-[16/10] rounded-lg overflow-hidden">
                <Image
                  src={HOME_PAGE.images.ramp1.src}
                  alt={HOME_PAGE.images.ramp1.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 900px"
                  priority
                />
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-4 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl landscape:text-2xl xl:text-5xl 2xl:text-6xl font-bold">
                {HOME_PAGE.features.title}
              </h2>
              <FeaturesGrid />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
} 