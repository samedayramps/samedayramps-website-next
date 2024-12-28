"use client"

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ExternalLeadForm } from "@/components/lead-form";

export function ContactSection() {
  return (
    <Section id="contact-section">
      <Container 
        size="medium"
        className="h-full flex flex-col justify-center landscape:justify-center landscape:max-w-4xl"
      >
        <ExternalLeadForm 
          apiKey={process.env.NEXT_PUBLIC_EXTERNAL_API_KEY || ''}
        />
      </Container>
    </Section>
  );
} 