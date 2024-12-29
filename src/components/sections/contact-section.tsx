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
      "relative min-h-[calc(100dvh-64px)] bg-background",
      "flex items-center",
      "snap-start snap-always",
      "touch-manipulation",
      "overflow-y-auto",
      "overscroll-none",
      "-webkit-overflow-scrolling-touch",
      className
    )}>
      <Container className="min-h-full py-6 landscape:py-4">
        <div className={cn(
          "min-h-full w-full",
          "grid grid-cols-1 landscape:grid-cols-[1fr,2fr]",
          "gap-6 landscape:gap-8 xl:gap-12",
          "px-3 landscape:px-6 xl:px-8",
        )}>
          {/* Content Side */}
          <div className={cn(
            "flex flex-col justify-center",
            "text-center landscape:text-left",
            "landscape:pr-6 xl:pr-8"
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
            "landscape:pl-4",
            "py-4 landscape:py-2"
          )}>
            <ExternalLeadForm apiKey={process.env.NEXT_PUBLIC_EXTERNAL_API_KEY || ''} />
          </div>
        </div>
      </Container>
    </Section>
  );
} 