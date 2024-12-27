import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "relative",
        "min-h-[calc(100dvh-64px)]",
        "w-full",
        "snap-start snap-always",
        "flex flex-col items-center",
        "px-4 sm:px-6 py-8 sm:py-12",
        "transform-gpu",
        "will-change-transform",
        "overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
} 