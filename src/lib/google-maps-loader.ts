import { Loader } from "@googlemaps/js-api-loader"

// Singleton loader instance
export const googleMapsLoader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  version: "weekly",
  libraries: ["places"],
  language: "en",
  region: "us"
})

// Type for place result
export type PlaceResult = google.maps.places.PlaceResult

// Helper to check if Google Maps is loaded
export const isGoogleMapsLoaded = () => {
  return typeof google !== "undefined" && google.maps
} 