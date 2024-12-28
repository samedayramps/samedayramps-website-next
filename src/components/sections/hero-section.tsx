"use client"

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { VideoPlayer } from "@/components/ui/video-player";
import { HOME_PAGE } from "@/constants/content";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const handleQuoteClick = () => {
    const contactSection = document.getElementById('contact-section');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section>
      <Container className="py-8">
        <div className="max-w-[90rem] w-full mx-auto">
          <div className="grid portrait:grid-rows-[auto,1fr] landscape:grid-cols-2 items-center gap-6 landscape:gap-12 xl:gap-16">
            {/* Video Player */}
            <div className="relative flex items-center portrait:order-first landscape:order-last">
              <div className="w-full max-w-[min(600px,65vh)] mx-auto landscape:ml-auto landscape:mr-0">
                <VideoPlayer 
                  src={HOME_PAGE.hero.videoUrl}
                  title={HOME_PAGE.hero.videoTitle}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center landscape:text-left space-y-4 landscape:max-w-2xl portrait:order-last landscape:order-first">
              <div className="space-y-3">
                <h1 className="text-xl sm:text-2xl landscape:text-2xl xl:text-5xl 2xl:text-6xl font-bold">
                  Wheelchair Ramp<br />
                  Rentals
                </h1>
                <p className="text-sm landscape:text-base xl:text-xl text-muted-foreground">
                  {HOME_PAGE.hero.subtitle}
                </p>
              </div>

              {/* CTA Button */}
              <div>
                <Button 
                  size="lg" 
                  className="h-10 px-6 text-sm landscape:h-12 landscape:px-8 landscape:text-base xl:text-lg rounded-full"
                  onClick={handleQuoteClick}
                >
                  Get Your Quote
                  <ArrowRight className="ml-2 h-3.5 w-3.5 landscape:h-4 landscape:w-4 xl:h-5 xl:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
} 