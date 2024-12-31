"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  fullHeight?: boolean
}

const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className,
  fullHeight = true,
  ...props
}, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section
      ref={(node) => {
        // Merge the refs
        inViewRef(node)
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={cn(
        // Base styles
        "relative bg-background w-full",
        // Height
        fullHeight && "h-[calc(100dvh-64px)]",
        // Snap scroll
        "snap-start snap-always",
        // Touch handling
        "touch-manipulation",
        "overflow-hidden",
        "overscroll-none",
        "-webkit-overflow-scrolling-touch",
        // Animation
        "transition-opacity duration-500",
        inView ? "opacity-100" : "opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
})

Section.displayName = "Section"

export { Section } 