"use client"

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FAQList } from "@/components/ui/faq-list";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FAQContent {
  title: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  media: {
    src: string;
    alt: string;
  };
}

interface FAQSectionProps {
  content: FAQContent;
  className?: string;
  theme?: "light" | "dark";
}

export function FAQSection({
  content,
  className,
  theme = "light"
}: FAQSectionProps) {
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

      {/* FAQ List */}
      <FAQList 
        items={content.faqs}
        containerClassName="max-w-2xl mx-auto landscape:mx-0"
        className="w-full"
        size="lg"
        weight="medium"
        questionSpacing="relaxed"
        answerSpacing="relaxed"
      />
    </div>
  );

  const mediaSection = (
    <div className={cn(
      "relative w-full h-full",
      "flex items-center justify-center",
      "landscape:justify-start landscape:pl-0"
    )}>
      <div className={cn(
        "relative w-full",
        "max-w-[min(95vw,560px)]",
        "landscape:w-[50vh] landscape:h-[50vh]",
        "aspect-[4/3] landscape:aspect-square",
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
    <Section id="faq-section" className={cn(
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
          "grid grid-cols-1 landscape:grid-cols-[1fr_1.5fr]",
          "items-center gap-6 landscape:gap-3",
          "px-3 landscape:px-3 sm:px-6",
          "relative"
        )}>
          <div className="order-2 landscape:order-1">{mediaSection}</div>
          <div className="order-1 landscape:order-2">{contentSection}</div>
        </div>
      </Container>
    </Section>
  );
} 