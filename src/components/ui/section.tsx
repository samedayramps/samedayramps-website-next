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
        "h-[calc(100dvh-64px)]",
        "w-full",
        "snap-start snap-always",
        "flex flex-col items-center justify-center",
        {
          "pt-16 sm:pt-20": isFirstSection,
          "py-6 sm:py-8": !isFirstSection,
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