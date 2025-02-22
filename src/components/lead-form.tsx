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
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { HOME_PAGE } from "@/constants/content"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Form validation schema
const leadFormSchema = z.object({
  customer: z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
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
  timeline: z.enum(['ASAP', 'THIS_WEEK', 'THIS_MONTH', 'FLEXIBLE']).nullable(),
  notes: z.string().nullable(),
})

type LeadFormValues = z.infer<typeof leadFormSchema>

interface ExternalLeadFormProps {
  apiKey: string
  onSuccess?: (leadId: string) => void
  onError?: (error: Error) => void
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ExternalLeadForm({
  apiKey,
  onSuccess,
  onError,
}: ExternalLeadFormProps) {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const { toast } = useToast()

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      customer: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
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
      setErrorMessage('Error loading address autocomplete')
    }
  }, [isGoogleMapsLoaded, form])

  async function onSubmit(values: LeadFormValues) {
    setSubmissionStatus('submitting')
    setErrorMessage(null)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_LEAD_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(values),
      })

      // Log response details for debugging
      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      console.log('API URL:', process.env.NEXT_PUBLIC_LEAD_API_URL)
      
      // Check if the response is empty
      const responseText = await response.text()
      console.log('Raw response:', responseText)
      
      if (!responseText) {
        throw new Error('Empty response received from server')
      }
      
      // Try to parse the JSON
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError)
        throw new Error('Invalid JSON response from server')
      }

      if (!response.ok) {
        // Handle validation errors
        if (response.status === 400 && data?.error === 'Validation error') {
          const errorMessage = data.details
            ?.map((err: { path: string; message: string }) => `${err.path}: ${err.message}`)
            .join(', ')
          throw new Error(errorMessage || 'Validation failed')
        }
        throw new Error(data?.error || `Request failed with status ${response.status}`)
      }

      if (data?.success && data?.leadId) {
        setSubmissionStatus('success')
        onSuccess?.(data.leadId)
        form.reset()
        
        toast({
          title: "Quote Request Submitted",
          description: "We'll be in touch with you shortly!",
          duration: 5000,
        })
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Error submitting lead:', error)
      setSubmissionStatus('error')
      const errorMsg = error instanceof Error ? error.message : 'Failed to submit form'
      setErrorMessage(errorMsg)
      onError?.(error as Error)
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMsg,
        duration: 5000,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="rounded-xl bg-card shadow-lg border border-border/40">
          <div className={cn(
            "flex flex-col",
            "p-2 landscape:p-2 md:p-4",
            "gap-2 landscape:gap-2 md:gap-4"
          )}>
            {/* Form Status Alerts */}
            {submissionStatus === 'success' && (
              <Alert className="bg-green-500/10 text-green-500 border-green-500/20 py-1">
                <CheckCircle2 className="w-[min(1rem,4vw)] h-[min(1rem,4vw)]" />
                <AlertTitle className="text-[min(0.875rem,3.5vw)] sm:text-sm md:text-base">Success!</AlertTitle>
                <AlertDescription className="text-[min(0.75rem,3vw)] sm:text-xs md:text-sm">
                  Your quote request has been submitted. We&apos;ll be in touch shortly!
                </AlertDescription>
              </Alert>
            )}
            
            {errorMessage && (
              <Alert variant="destructive" className="py-1">
                <AlertCircle className="w-[min(1rem,4vw)] h-[min(1rem,4vw)]" />
                <AlertTitle className="text-[min(0.875rem,3.5vw)] sm:text-sm md:text-base">Error</AlertTitle>
                <AlertDescription className="text-[min(0.75rem,3vw)] sm:text-xs md:text-sm">{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Main Form Grid */}
            <div className="flex flex-col gap-2 landscape:gap-2 md:gap-4">
              {/* Contact Info */}
              <div className="flex flex-col gap-2 landscape:gap-2 md:gap-4">
                {/* Section Title */}
                <div className="flex items-center gap-2">
                  <h3 className={cn(
                    "font-medium text-muted-foreground",
                    "text-[min(0.875rem,3vw)] landscape:text-xs md:text-base"
                  )}>Contact Info</h3>
                  <div className="flex-1 h-px bg-border/40" />
                </div>
                
                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-1.5 landscape:gap-1.5 md:gap-2">
                  <FormField
                    control={form.control}
                    name="customer.first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <Input 
                              {...field} 
                              className={cn(
                                "bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60",
                                "h-[min(2rem,7vh)] md:h-10",
                                "pl-[2rem] md:pl-10",
                                "text-[min(0.875rem,3vw)] sm:text-sm md:text-base"
                              )}
                              placeholder="First Name"
                            />
                            <User2 className={cn(
                              "absolute left-[0.625rem] md:left-3.5 top-1/2 -translate-y-1/2",
                              "w-[min(1rem,3.5vw)] h-[min(1rem,3.5vw)] md:h-5 md:w-5",
                              "text-muted-foreground/50"
                            )} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[min(0.75rem,3vw)] sm:text-xs md:text-sm mt-[0.125rem] md:mt-1" />
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
                              className={cn(
                                "bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60",
                                "h-[min(2rem,7vh)] md:h-10",
                                "pl-[2rem] md:pl-10",
                                "text-[min(0.875rem,3vw)] sm:text-sm md:text-base"
                              )}
                              placeholder="Last Name"
                            />
                            <User2 className={cn(
                              "absolute left-[0.625rem] md:left-3.5 top-1/2 -translate-y-1/2",
                              "w-[min(1rem,3.5vw)] h-[min(1rem,3.5vw)] md:h-5 md:w-5",
                              "text-muted-foreground/50"
                            )} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[min(0.75rem,3vw)] sm:text-xs md:text-sm mt-[0.125rem] md:mt-1" />
                      </FormItem>
                    )}
                  />
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
                              className={cn(
                                "bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60",
                                "h-[min(2rem,7vh)] md:h-10",
                                "pl-[2rem] md:pl-10",
                                "text-[min(0.875rem,3vw)] sm:text-sm md:text-base"
                              )}
                              placeholder="Email"
                              value={field.value}
                            />
                            <Mail className={cn(
                              "absolute left-[0.625rem] md:left-3.5 top-1/2 -translate-y-1/2",
                              "w-[min(1rem,3.5vw)] h-[min(1rem,3.5vw)] md:h-5 md:w-5",
                              "text-muted-foreground/50"
                            )} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[min(0.75rem,3vw)] sm:text-xs md:text-sm mt-[0.125rem] md:mt-1" />
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
                              className={cn(
                                "bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60",
                                "h-[min(2rem,7vh)] md:h-10",
                                "pl-[2rem] md:pl-10",
                                "text-[min(0.875rem,3vw)] sm:text-sm md:text-base"
                              )}
                              placeholder="Phone"
                              value={field.value}
                            />
                            <Phone className={cn(
                              "absolute left-[0.625rem] md:left-3.5 top-1/2 -translate-y-1/2",
                              "w-[min(1rem,3.5vw)] h-[min(1rem,3.5vw)] md:h-5 md:w-5",
                              "text-muted-foreground/50"
                            )} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[min(0.75rem,3vw)] sm:text-xs md:text-sm mt-[0.125rem] md:mt-1" />
                      </FormItem>
                    )}
                  />
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
                              className={cn(
                                "bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60",
                                "h-[min(2rem,7vh)] md:h-10",
                                "pl-[2rem] md:pl-10",
                                "text-[min(0.875rem,3vw)] sm:text-sm md:text-base"
                              )}
                              placeholder="Installation Address"
                              disabled={!isGoogleMapsLoaded}
                              autoComplete="off"
                              value={field.value || ''}
                            />
                            <MapPin className={cn(
                              "absolute left-[0.625rem] md:left-3.5 top-1/2 -translate-y-1/2",
                              "w-[min(1rem,3.5vw)] h-[min(1rem,3.5vw)] md:h-5 md:w-5",
                              "text-muted-foreground/50"
                            )} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[min(0.75rem,3vw)] sm:text-xs md:text-sm mt-[0.125rem] md:mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Timeline and Notes */}
              <div className="flex flex-col gap-2 landscape:gap-2 md:gap-4">
                {/* Section Title */}
                <div className="flex items-center gap-2">
                  <h3 className={cn(
                    "font-medium text-muted-foreground",
                    "text-[min(0.875rem,3vw)] landscape:text-xs md:text-base"
                  )}>When do you need it?</h3>
                  <div className="flex-1 h-px bg-border/40" />
                </div>

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || undefined}
                        >
                          <SelectTrigger className={cn(
                            "bg-background/50 hover:bg-background/80 focus:bg-background transition-colors border-border/60",
                            "h-[min(2rem,7vh)] md:h-10",
                            "text-[min(0.875rem,3vw)] sm:text-sm md:text-base",
                            "[&>*]:text-muted-foreground/80",
                            "data-[value]:text-foreground"
                          )}>
                            <SelectValue placeholder="Select a timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            {HOME_PAGE.form.timeline.options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-[min(0.875rem,3vw)] sm:text-sm md:text-base"
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[min(0.75rem,3vw)] sm:text-xs md:text-sm mt-[0.125rem] md:mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            {...field}
                            className={cn(
                              "bg-background/50 group-hover:bg-background/80 focus:bg-background transition-colors border-border/60",
                              "h-[min(2rem,7vh)] md:h-10",
                              "pl-[2rem] md:pl-10",
                              "text-[min(0.875rem,3vw)] sm:text-sm md:text-base"
                            )}
                            placeholder="Additional Notes (optional)"
                            value={typeof field.value === 'string' ? field.value : ''}
                            onChange={(e) => field.onChange(e.target.value || null)}
                          />
                          <MessageSquare className={cn(
                            "absolute left-[0.625rem] md:left-3.5 top-1/2 -translate-y-1/2",
                            "w-[min(1rem,3.5vw)] h-[min(1rem,3.5vw)] md:h-5 md:w-5",
                            "text-muted-foreground/50"
                          )} />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[min(0.75rem,3vw)] sm:text-xs md:text-sm mt-[0.125rem] md:mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submissionStatus === 'submitting'}
              className={cn(
                "w-full font-medium rounded-lg",
                "h-8 landscape:h-8 md:h-10",
                "text-[min(0.875rem,3vw)] landscape:text-xs md:text-sm",
                "bg-accent hover:bg-accent/90",
                "text-accent-foreground",
                "shadow-sm hover:shadow-md",
                "transition-all duration-200",
                "mt-2 landscape:mt-2 md:mt-4"
              )}
            >
              {submissionStatus === 'submitting' ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-[min(0.75rem,2.5vw)] h-[min(0.75rem,2.5vw)] md:h-3.5 md:w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Get a Quote"
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