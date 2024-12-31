import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const containerVariants = cva(
  "w-full mx-auto",
  {
    variants: {
      size: {
        small: "max-w-3xl landscape:max-w-4xl",
        default: "max-w-5xl landscape:max-w-6xl",
        large: "max-w-7xl",
      },
      padding: {
        none: "px-0",
        default: "px-4 sm:px-6 lg:px-8",
        tight: "px-3 sm:px-4 lg:px-6",
      },
      height: {
        auto: "h-auto",
        full: "h-full",
      }
    },
    defaultVariants: {
      size: "default",
      padding: "default",
      height: "auto"
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
  padding,
  height,
  ...props 
}: ContainerProps) {
  return (
    <div 
      className={cn(containerVariants({ size, padding, height }), className)} 
      {...props}
    >
      {children}
    </div>
  );
} 