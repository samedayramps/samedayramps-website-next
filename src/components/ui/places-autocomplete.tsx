"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlacesAutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void
  className?: string
}

export function PlacesAutocomplete({ 
  onPlaceSelect,
  className,
  ...props
}: PlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    if (!inputRef.current || autocomplete) return

    const autocompleteInstance = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "us" },
      fields: ["formatted_address", "geometry"],
      types: ["address"],
    })

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace()
      if (place) {
        onPlaceSelect(place)
      }
    })

    setAutocomplete(autocompleteInstance)
    setIsLoading(false)
  }, [onPlaceSelect, autocomplete])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        className={cn("pr-8", className)}
        {...props}
      />
      {isLoading && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  )
} 