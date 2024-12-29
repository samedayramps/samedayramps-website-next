"use client"

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ExternalLeadForm } from "@/components/lead-form";
import { cn } from "@/lib/utils";

interface ContactContent {
  title: string;
  subtitle: string;
}

interface ContactSectionProps {
  content: ContactContent;
  className?: string;
  theme?: "light" | "dark";
}

export function ContactSection({
  content,
  className,
  theme = "light"
}: ContactSectionProps) {
  return (
    <Section id="contact-section" className={cn(
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
          "grid grid-cols-1 landscape:grid-cols-[1fr,2fr]",
          "gap-6 landscape:gap-4",
          "px-3 landscape:px-3 sm:px-6",
        )}>
          {/* Content Side */}
          <div className={cn(
            "flex flex-col justify-center",
            "text-center landscape:text-left",
            "landscape:pr-4"
          )}>
            <div className="space-y-2 landscape:space-y-1">
              <h2 className={cn(
                "text-[clamp(1.75rem,6vw,3.5rem)]",
                "landscape:text-[clamp(1.75rem,3.5vw,2.75rem)]",
                "font-bold tracking-tight leading-[1.1]"
              )}>
                {content.title}
              </h2>
              <p className={cn(
                "text-[clamp(1rem,2vw,1.25rem)]",
                "landscape:text-[clamp(0.875rem,1.75vw,1.125rem)]",
                theme === "dark" ? "text-white/80" : "text-muted-foreground",
                "max-w-2xl landscape:max-w-none mx-auto"
              )}>
                {content.subtitle}
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className={cn(
            "flex items-center",
            "landscape:pl-4"
          )}>
            <ExternalLeadForm apiKey={process.env.NEXT_PUBLIC_EXTERNAL_API_KEY || ''} />
          </div>
        </div>
      </Container>
    </Section>
  );
} 