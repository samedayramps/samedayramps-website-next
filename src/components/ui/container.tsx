import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const containerVariants = cva(
  "w-full mx-auto px-4 sm:px-6 md:px-8",
  {
    variants: {
      size: {
        small: "max-w-2xl landscape:max-w-[50vw]",
        medium: "max-w-4xl landscape:max-w-[70vw]",
        large: "max-w-screen-xl landscape:max-w-[90vw]",
      }
    },
    defaultVariants: {
      size: "large"
    }
  }
);

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  children: React.ReactNode;
}

export function Container({ 
  children, 
  className,
  size,
  ...props 
}: ContainerProps) {
  return (
    <div 
      className={cn(containerVariants({ size }), className)} 
      {...props}
    >
      {children}
    </div>
  );
} 