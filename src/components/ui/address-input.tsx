"use client"

import { memo } from "react"
import { PlacesAutocomplete } from "./places-autocomplete"
import type { PlaceResult } from "@/lib/google-maps-loader"

interface AddressInputProps {
  value?: string
  placeholder?: string
  onPlaceSelect: (place: PlaceResult) => void
}

function AddressInputComponent({
  value,
  placeholder,
  onPlaceSelect,
}: AddressInputProps) {
  return (
    <PlacesAutocomplete
      value={value}
      placeholder={placeholder}
      onPlaceSelect={onPlaceSelect}
    />
  )
}

export const AddressInput = memo(AddressInputComponent) 