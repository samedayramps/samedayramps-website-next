import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'small' | 'large';
}

export function Container({ 
  children, 
  className, 
  size = 'default',
  ...props 
}: ContainerProps) {
  return (
    <div 
      className={cn(
        // Base styles
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        // Responsive max-widths
        {
          'max-w-7xl': size === 'large',
          'max-w-4xl': size === 'default',
          'max-w-2xl': size === 'small',
        },
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
} 