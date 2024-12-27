"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { HOME_PAGE } from "@/constants/content"

export function FeaturesGrid() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  // Handle screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerHeight >= 800)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {HOME_PAGE.features.list.map((feature) => (
        <div
          key={feature.title}
          className={cn(
            "group p-4 rounded-lg",
            "bg-background/50 backdrop-blur-sm",
            "transition-all duration-200",
            "hover:bg-background/80",
            isLargeScreen ? "cursor-default" : "cursor-pointer"
          )}
          onClick={() => !isLargeScreen && setExpandedFeature(
            expandedFeature === feature.title ? null : feature.title
          )}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              {feature.icon}
              <h3 className="text-base md:text-lg font-medium">
                {feature.title}
              </h3>
            </div>
            <div className={cn(
              "grid transition-all duration-200",
              (expandedFeature === feature.title || isLargeScreen)
                ? "grid-rows-[1fr] mt-3" 
                : "grid-rows-[0fr]"
            )}>
              <div className="overflow-hidden">
                <p className="text-base text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 