'use client';

import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface BackgroundProps {
  className?: string;
}

// Define background colors for each section
const sectionBackgrounds = {
  0: "bg-background", // Hero section
  1: "bg-muted", // Features section
  2: "bg-background", // FAQ section
  3: "bg-muted", // Contact section
} as const;

type SectionIndex = keyof typeof sectionBackgrounds;

export function Background({ className }: BackgroundProps) {
  const [currentSection, setCurrentSection] = useState<SectionIndex>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-section-index') || '0');
            setCurrentSection(sectionIndex as SectionIndex);
          }
        });
      },
      {
        threshold: 0.6, // Trigger when 60% of the section is visible
      }
    );

    // Observe all sections
    document.querySelectorAll('section').forEach((section, index) => {
      section.setAttribute('data-section-index', index.toString());
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={cn(
        "fixed inset-0 -z-10 transition-colors duration-700",
        sectionBackgrounds[currentSection],
        className
      )} 
    />
  );
} 