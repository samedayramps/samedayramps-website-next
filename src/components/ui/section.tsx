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
          "pt-6": isFirstSection,
          "py-6": !isFirstSection,
        },
        className
      )}
    >
      {children}
    </section>
  );
} 