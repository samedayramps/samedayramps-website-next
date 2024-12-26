"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { usePlacesAutocomplete } from "@/hooks/use-places-autocomplete"
import type { PlaceResult } from "@/lib/google-maps-loader"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface AddressInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onPlaceSelect: (place: PlaceResult) => void
  onChange?: (value: string) => void
}

const AddressInput = React.forwardRef<HTMLInputElement, AddressInputProps>(
  ({ className, onPlaceSelect, onChange, ...props }, forwardedRef) => {
    const [inputValue, setInputValue] = useState(props.defaultValue ?? "")
    const inputRef = useRef<HTMLInputElement>(null)

    // Merge refs to handle both forwardRef and internal ref
    React.useEffect(() => {
      if (!inputRef.current || !forwardedRef) return
      
      if (typeof forwardedRef === 'function') {
        forwardedRef(inputRef.current)
      } else {
        forwardedRef.current = inputRef.current
      }
    }, [forwardedRef])

    const {
      initializeAutocomplete,
      cleanup,
      isLoading,
      error
    } = usePlacesAutocomplete({ 
      onPlaceSelect,
      onInputChange: (value) => {
        console.log("[AddressInput] Place selection changed value:", value)
        setInputValue(value)
        onChange?.(value)
      }
    })

    useEffect(() => {
      console.log("[AddressInput] Component mounted")
      if (inputRef.current) {
        console.log("[AddressInput] Initializing autocomplete...")
        initializeAutocomplete(inputRef.current)
      }
      return cleanup
    }, [initializeAutocomplete, cleanup])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      console.log("[AddressInput] Manual input changed:", newValue)
      setInputValue(newValue)
      onChange?.(newValue)
    }

    return (
      <div className="relative">
        <input
          {...props}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-controls="google-places-suggestions"
          aria-expanded="false"
          aria-describedby={error ? "address-error" : undefined}
          aria-invalid={error ? true : undefined}
          autoComplete="off"
          spellCheck="false"
          value={inputValue}
          onChange={handleChange}
          disabled={props.disabled || isLoading}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background",
            "text-sm leading-relaxed tracking-normal",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground placeholder:text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
        />
        {isLoading && (
          <div 
            className="absolute right-3 top-1/2 -translate-y-1/2"
            role="status"
            aria-label="Loading address suggestions"
          >
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        {error && (
          <p 
            id="address-error"
            className="text-sm font-medium text-destructive mt-2" 
            role="alert"
          >
            {error.message}
          </p>
        )}
      </div>
    )
  }
)
AddressInput.displayName = "AddressInput"

export { AddressInput } 