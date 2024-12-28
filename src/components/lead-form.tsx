"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "./ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form"
import { Button } from "./ui/button"
import { 
  User2, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HOME_PAGE } from "@/constants/content"
import { cn } from "@/lib/utils"

// Form validation schema
const leadFormSchema = z.object({
  customer: z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email().nullable(),
    phone: z.string().min(10, "Phone number must be at least 10 digits").nullable(),
    address: z.object({
      formatted_address: z.string().min(1, "Installation address is required"),
      street_number: z.string().nullable(),
      street_name: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      postal_code: z.string().nullable(),
      country: z.string().nullable(),
      lat: z.number().nullable(),
      lng: z.number().nullable(),
      place_id: z.string().nullable(),
    }),
  }),
  timeline: z.string().nullable(),
  notes: z.string().nullable(),
})

type LeadFormValues = z.infer<typeof leadFormSchema>

interface ExternalLeadFormProps {
  apiKey: string
  apiEndpoint: string
  onSuccess?: (leadId: string) => void
  onError?: (error: Error) => void
}

export function ExternalLeadForm({
  apiKey,
  apiEndpoint,
  onSuccess,
  onError,
}: ExternalLeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      customer: {
        first_name: "",
        last_name: "",
        email: null,
        phone: null,
        address: {
          formatted_address: "",
          street_number: null,
          street_name: null,
          city: null,
          state: null,
          postal_code: null,
          country: null,
          lat: null,
          lng: null,
          place_id: null,
        },
      },
      timeline: null,
      notes: null,
    },
  })

  // Load Google Maps script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setIsGoogleMapsLoaded(true)
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    } else {
      setIsGoogleMapsLoaded(true)
    }
  }, [])

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!isGoogleMapsLoaded || !inputRef.current) return

    // Store ref in variable for cleanup
    const input = inputRef.current

    try {
      autocompleteRef.current = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: "US" },
        fields: ["address_components", "formatted_address", "geometry", "place_id"],
        types: ["address"],
      })

      const placeChangedListener = autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace()
        if (place?.formatted_address) {
          const location = place.geometry?.location
          form.setValue("customer.address", {
            formatted_address: place.formatted_address,
            street_number: getAddressComponent(place, 'street_number'),
            street_name: getAddressComponent(place, 'route'),
            city: getAddressComponent(place, 'locality'),
            state: getAddressComponent(place, 'administrative_area_level_1'),
            postal_code: getAddressComponent(place, 'postal_code'),
            country: getAddressComponent(place, 'country'),
            lat: location?.lat() ?? null,
            lng: location?.lng() ?? null,
            place_id: place.place_id ?? null,
          })
        }
      })

      // Prevent form submission on enter
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault()
        }
      }
      input.addEventListener('keydown', handleKeyDown)

      return () => {
        if (placeChangedListener) {
          google.maps.event.removeListener(placeChangedListener)
        }
        input.removeEventListener('keydown', handleKeyDown)
        if (autocompleteRef.current) {
          google.maps.event.clearInstanceListeners(autocompleteRef.current)
        }
      }
    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error)
    }
  }, [isGoogleMapsLoaded, form])

  async function onSubmit(values: LeadFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit lead')
      }

      const data = await response.json()
      onSuccess?.(data.leadId)
      form.reset()
    } catch (error) {
      console.error('Error submitting lead:', error)
      onError?.(error as Error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto landscape:max-w-3xl">
        <div className="rounded-xl bg-card shadow-lg border border-border/40 overflow-hidden">
          {/* Form Content */}
          <div className="p-4 space-y-4">
            {/* Main Title */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground/90">
                Request a Quote
              </h2>
            </div>

            {/* Main Form Grid */}
            <div className="grid grid-cols-1 landscape:grid-cols-[1.2fr,1fr] gap-4">
              {/* Left Column - Contact Info */}
              <div className="space-y-3">
                {/* Section Title */}
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Info</h3>
                  <div className="flex-1 h-px bg-border/40" />
                </div>
                
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="customer.first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <Input 
                              {...field} 
                              className="h-10 pl-9 bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60" 
                              placeholder="First Name"
                            />
                            <User2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customer.last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <Input 
                              {...field} 
                              className="h-10 pl-9 bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60" 
                              placeholder="Last Name"
                            />
                            <User2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="customer.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <Input 
                              {...field}
                              type="email"
                              className="h-10 pl-9 bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60" 
                              placeholder="Email"
                              value={field.value ?? ''}
                              onChange={(e) => field.onChange(e.target.value || null)}
                            />
                            <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customer.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <Input 
                              {...field}
                              type="tel"
                              className="h-10 pl-9 bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60" 
                              placeholder="Phone"
                              value={field.value ?? ''}
                              onChange={(e) => field.onChange(e.target.value || null)}
                            />
                            <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Address Field */}
                <FormField
                  control={form.control}
                  name="customer.address.formatted_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            {...field}
                            ref={inputRef}
                            type="text"
                            className="h-10 pl-9 bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60" 
                            placeholder="Installation Address"
                            disabled={!isGoogleMapsLoaded}
                            autoComplete="off"
                            value={field.value || ''}
                          />
                          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column - Timeline and Notes */}
              <div className="space-y-3">
                {/* Timeline Field */}
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-muted-foreground">When do you need it?</h3>
                  <div className="flex-1 h-px bg-border/40" />
                </div>

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value || undefined}
                          className="grid grid-cols-2 gap-2"
                        >
                          {HOME_PAGE.form.timeline.options.map((option) => (
                            <FormItem key={option.value}>
                              <FormControl>
                                <label
                                  className={cn(
                                    "flex items-center justify-center w-full h-10",
                                    "rounded-lg border cursor-pointer transition-all text-center",
                                    "hover:bg-primary/5 hover:border-primary/30",
                                    "text-sm",
                                    field.value === option.value 
                                      ? "border-primary bg-primary/5 text-primary" 
                                      : "border-border/60 bg-background/50 text-muted-foreground"
                                  )}
                                >
                                  <RadioGroupItem value={option.value} className="sr-only" />
                                  {option.label}
                                </label>
                              </FormControl>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Notes Field */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            {...field}
                            className="h-10 pl-9 bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60" 
                            placeholder="Additional Notes (optional)"
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(e.target.value || null)}
                          />
                          <MessageSquare className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full h-10 font-medium rounded-lg",
                "bg-primary hover:bg-primary/90 text-primary-foreground",
                "shadow-md shadow-primary/10 hover:shadow-primary/20",
                "transition-all duration-200"
              )}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Lead"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

function getAddressComponent(
  place: google.maps.places.PlaceResult,
  type: string,
  useShortName: boolean = false
): string | null {
  const component = place.address_components?.find(
    (component) => component.types.includes(type)
  )
  return component ? (useShortName ? component.short_name : component.long_name) : null
} 