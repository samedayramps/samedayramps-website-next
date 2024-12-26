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
        "h-[calc(100vh-64px)]",
        "w-full",
        "snap-start snap-always",
        "flex flex-col items-center justify-center",
        "px-4 sm:px-6",
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