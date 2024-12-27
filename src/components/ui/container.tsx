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
        "w-full mx-auto px-3 sm:px-4 lg:px-6",
        // Responsive max-widths
        {
          'max-w-6xl lg:max-w-7xl': size === 'large',
          'max-w-3xl lg:max-w-4xl': size === 'default',
          'max-w-xl lg:max-w-2xl': size === 'small',
        },
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
} 