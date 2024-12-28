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
    <div className="grid gap-3 landscape:gap-2 grid-cols-1">
      {HOME_PAGE.features.list.map((feature) => (
        <div
          key={feature.title}
          className={cn(
            "group p-3 landscape:p-2 rounded-lg",
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
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 landscape:w-5 landscape:h-5 shrink-0 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-sm landscape:text-base xl:text-lg font-medium">
                {feature.title}
              </h3>
            </div>
            <div className={cn(
              "grid transition-all duration-200",
              (expandedFeature === feature.title || isLargeScreen)
                ? "grid-rows-[1fr] mt-2" 
                : "grid-rows-[0fr]"
            )}>
              <div className="overflow-hidden">
                <p className="text-sm landscape:text-base xl:text-lg text-muted-foreground">
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