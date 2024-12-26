'use client';

import { Button } from "@/components/ui/button";

export function BackToTop() {
  return (
    <Button 
      variant="outline"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group"
    >
      Back to Top
      <svg 
        className="w-4 h-4 ml-2 transform rotate-180 group-hover:-translate-y-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </Button>
  );
} 