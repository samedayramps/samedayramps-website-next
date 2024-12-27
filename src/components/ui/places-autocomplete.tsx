"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Loader } from "@googlemaps/js-api-loader"

interface PlacesAutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void
  className?: string
}

// Create a singleton loader instance
const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  version: "weekly",
  libraries: ["places"]
})

export function PlacesAutocomplete({ 
  onPlaceSelect,
  className,
  ...props
}: PlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    let mounted = true

    const initializeAutocomplete = async () => {
      try {
        if (!inputRef.current) return

        // Load the Google Maps script
        await loader.load()
        
        if (!mounted) return

        // Initialize autocomplete
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "us" },
          fields: [
            "place_id",
            "formatted_address",
            "geometry",
            "address_components"
          ],
          types: ["address"]
        })

        // Add place_changed listener
        const placeChangedListener = () => {
          const place = autocompleteRef.current?.getPlace()
          if (place) {
            onPlaceSelect(place)
          }
        }

        autocompleteRef.current.addListener("place_changed", placeChangedListener)

        setIsLoading(false)
      } catch (error) {
        console.error("Error initializing Google Maps:", error)
        setIsLoading(false)
      }
    }

    initializeAutocomplete()

    return () => {
      mounted = false
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [onPlaceSelect])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        autoComplete="off"
        className={cn(
          "pr-8",
          "[&:not(:focus)]:rounded-b-md",
          "[&:focus]:rounded-b-none",
          className
        )}
        disabled={isLoading}
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