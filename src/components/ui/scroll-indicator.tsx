"use client"

import { ChevronDown } from "lucide-react"

interface ScrollIndicatorProps {
  text: string;
  targetSectionIndex: number;
}

export function ScrollIndicator({ text, targetSectionIndex }: ScrollIndicatorProps) {
  return (
    <div className="flex justify-center pb-8">
      <button
        onClick={() => {
          const section = document.querySelectorAll('section')[targetSectionIndex]
          section?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="group flex flex-col items-center gap-2 transition-colors text-base text-muted-foreground hover:text-foreground"
      >
        <span>{text}</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </div>
  );
} 