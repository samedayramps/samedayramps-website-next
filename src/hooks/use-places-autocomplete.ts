import { useCallback, useRef, useState } from "react"
import { googleMapsLoader, type PlaceResult } from "@/lib/google-maps-loader"

interface UsePlacesAutocompleteProps {
  onPlaceSelect: (place: PlaceResult) => void
  onInputChange?: (value: string) => void
}

export function usePlacesAutocomplete({ onPlaceSelect, onInputChange }: UsePlacesAutocompleteProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const isInitializedRef = useRef(false)

  const initializeAutocomplete = useCallback(async (element: HTMLInputElement) => {
    console.log("[Places] Starting initialization...")
    if (!element || autocompleteRef.current || isInitializedRef.current) return

    setIsLoading(true)
    isInitializedRef.current = true

    try {
      console.log("[Places] Loading Google Maps...")
      await googleMapsLoader.load()
      console.log("[Places] Google Maps loaded")

      if (!element) {
        throw new Error("Input element no longer exists")
      }

      // Set input attributes for better UX
      element.setAttribute("autocomplete", "off")
      element.setAttribute("role", "combobox")
      element.setAttribute("aria-autocomplete", "list")

      console.log("[Places] Creating autocomplete instance...")
      autocompleteRef.current = new window.google.maps.places.Autocomplete(element, {
        componentRestrictions: { country: "us" },
        fields: ["formatted_address", "geometry", "address_components"],
        types: ["address"]
      })
      console.log("[Places] Autocomplete instance created")

      // Prevent form submission on enter
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
        }
      })

      // Update ARIA attributes when predictions change
      const pacContainer = document.querySelector('.pac-container')
      if (pacContainer) {
        pacContainer.setAttribute('role', 'listbox')
        pacContainer.setAttribute('id', 'google-places-suggestions')
      }

      console.log("[Places] Adding place_changed listener...")
      autocompleteRef.current.addListener("place_changed", () => {
        console.log("[Places] Place changed event triggered")
        const place = autocompleteRef.current?.getPlace()
        if (place) {
          console.log("[Places] Place selected:", place.formatted_address)
          // Update the input value directly
          element.value = place.formatted_address || ''
          // Trigger input change
          onInputChange?.(place.formatted_address || '')
          // Call the place select callback
          onPlaceSelect(place)
          // Update ARIA attributes
          element.setAttribute('aria-expanded', 'false')
        }
      })

      // Update ARIA expanded state when predictions show/hide
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            const pacContainer = document.querySelector('.pac-container')
            if (pacContainer) {
              const isVisible = window.getComputedStyle(pacContainer).display !== 'none'
              element.setAttribute('aria-expanded', isVisible.toString())
            }
          }
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      console.log("[Places] Initialization complete")
    } catch (err) {
      console.error("[Places] Error initializing Places Autocomplete:", err)
      setError(err instanceof Error ? err : new Error("Failed to initialize address autocomplete"))
    } finally {
      setIsLoading(false)
    }
  }, [onPlaceSelect, onInputChange])

  const cleanup = useCallback(() => {
    console.log("[Places] Starting cleanup...")
    if (autocompleteRef.current) {
      google.maps.event.clearInstanceListeners(autocompleteRef.current)
      autocompleteRef.current = null
    }
    isInitializedRef.current = false
    console.log("[Places] Cleanup complete")
  }, [])

  return {
    initializeAutocomplete,
    cleanup,
    isLoading,
    error
  }
} 