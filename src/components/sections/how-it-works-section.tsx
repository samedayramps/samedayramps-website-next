"use client"

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HowItWorksContent {
  title: string;
  steps: string[];
  media: {
    src: string;
    alt: string;
  };
}

interface HowItWorksSectionProps {
  content: HowItWorksContent;
  className?: string;
  theme?: "light" | "dark";
}

export function HowItWorksSection({
  content,
  className,
  theme = "light"
}: HowItWorksSectionProps) {
  const handleCtaClick = (href: string) => {
    const targetSection = document.getElementById(href);
    targetSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const contentSection = (
    <div className={cn(
      "flex flex-col justify-center",
      "w-full h-full",
      "mx-auto landscape:mx-0",
      "text-center landscape:text-left",
      "gap-6 landscape:gap-4",
      theme === "dark" ? "text-white" : "text-foreground"
    )}>
      {/* Title */}
      <h2 className={cn(
        "text-[clamp(1.75rem,6vw,3.5rem)]",
        "landscape:text-[clamp(1.75rem,3.5vw,2.75rem)]",
        "font-bold tracking-tight leading-[1.1]",
        "max-w-[95%] mx-auto landscape:mx-0"
      )}>
        {content.title}
      </h2>

      {/* Steps List */}
      <ul className="space-y-4 landscape:space-y-3 text-left max-w-2xl mx-auto landscape:mx-0">
        {content.steps.map((step, index) => (
          <li key={index} className="flex items-center gap-4 landscape:gap-3">
            <div className={cn(
              "flex items-center justify-center",
              "w-8 h-8 landscape:w-7 landscape:h-7",
              "rounded-full bg-primary text-primary-foreground",
              "text-lg landscape:text-base font-semibold",
              "shrink-0"
            )}>
              {index + 1}
            </div>
            <span className={cn(
              "text-[clamp(1rem,2vw,1.25rem)]",
              "landscape:text-[clamp(0.875rem,1.5vw,1rem)]",
              "leading-tight",
              theme === "dark" ? "text-white/70" : "text-muted-foreground"
            )}>
              {step}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="flex justify-center landscape:justify-start mt-2">
        <Button 
          variant="secondary"
          className={cn(
            "h-10 px-4",
            "font-semibold text-base",
            "whitespace-nowrap",
            "w-full sm:w-auto",
            "bg-accent hover:bg-accent/90 text-accent-foreground"
          )}
          onClick={() => handleCtaClick('contact-section')}
        >
          Get a Quote
        </Button>
      </div>
    </div>
  );

  const mediaSection = (
    <div className={cn(
      "relative w-full h-full",
      "flex items-center justify-center",
      "landscape:justify-end landscape:pr-0",
      "py-4"
    )}>
      <div className={cn(
        "relative w-full",
        "max-w-[min(95vw,560px)]",
        "landscape:w-[50vh] landscape:h-[50vh]",
        "aspect-[4/3]",
        "landscape:aspect-square",
        "rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-primary/5 to-primary/10"
      )}>
        <Image 
          src={content.media.src}
          alt={content.media.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 95vw, (max-width: 1200px) 50vh, 560px"
          priority
        />
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
      </div>
    </div>
  );

  return (
    <Section id="how-it-works-section" className={cn(
      "relative h-[calc(100dvh-64px)] bg-background",
      "flex items-center",
      "snap-start snap-always",
      "touch-manipulation",
      "overflow-hidden",
      "overscroll-none",
      "-webkit-overflow-scrolling-touch",
      className
    )}>
      <Container className="h-full py-4 landscape:py-2">
        <div className={cn(
          "h-full w-full",
          "max-w-7xl mx-auto",
          "grid grid-cols-1 landscape:grid-cols-[1.5fr_1fr]",
          "gap-6 landscape:gap-8 xl:gap-12",
          "px-3 landscape:px-6 xl:px-8",
          "relative"
        )}>
          <div className="order-1 landscape:order-1">{contentSection}</div>
          <div className="order-2 landscape:order-2">{mediaSection}</div>
        </div>
      </Container>
    </Section>
  );
} 