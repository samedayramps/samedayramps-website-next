import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  isFirstSection?: boolean;
}

export function Section({ children, className, id, isFirstSection }: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "relative",
        "min-h-[calc(100dvh-64px)]",
        "w-full",
        "snap-start snap-always",
        "flex flex-col items-center",
        {
          "pt-20 sm:pt-24 pb-8 sm:pb-12": isFirstSection,
          "py-8 sm:py-12": !isFirstSection,
        },
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