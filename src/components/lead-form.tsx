"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AddressInput } from "@/components/ui/address-input"

const leadFormSchema = z.object({
  customer: z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email().optional().nullable(),
    phone: z.string().min(10, "Phone number must be at least 10 digits").optional().nullable(),
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
  timeline: z.enum(['ASAP', 'THIS_WEEK', 'THIS_MONTH', 'FLEXIBLE']),
  status: z.string().default('NEW'),
  notes: z.string().optional().nullable(),
})

const timelineOptions = [
  { value: 'ASAP', label: 'As Soon As Possible' },
  { value: 'THIS_WEEK', label: 'This Week' },
  { value: 'THIS_MONTH', label: 'This Month' },
  { value: 'FLEXIBLE', label: 'Flexible' },
]

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      customer: {
        first_name: '',
        last_name: '',
        email: null,
        phone: null,
        address: {
          formatted_address: '',
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
      timeline: 'FLEXIBLE',
      status: 'NEW',
      notes: null,
    },
  })

  async function onSubmit(values: z.infer<typeof leadFormSchema>) {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const response = await fetch('https://app.samedayramps.com/api/external/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_EXTERNAL_API_KEY}`,
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to submit lead')
      }

      setSubmitSuccess(true)
      form.reset()
    } catch (error) {
      console.error('Lead submission error:', error)
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to submit lead. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl mx-auto">
          <div className="bg-background rounded-lg border shadow-md p-4 md:p-6 dark:bg-zinc-900">
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customer.first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customer.last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customer.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customer.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="(555) 555-5555" 
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="customer.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Installation Address</FormLabel>
                      <FormControl>
                        <AddressInput 
                          placeholder="Enter your address"
                          onPlaceSelect={(place) => {
                            if (!place) return
                            
                            const addressComponents = place.address_components || []
                            const geometry = place.geometry
                            
                            const getComponent = (type: string) => 
                              addressComponents.find(c => c.types.includes(type))?.long_name || null
                            
                            form.setValue('customer.address', {
                              formatted_address: place.formatted_address || '',
                              place_id: place.place_id || null,
                              street_number: getComponent('street_number'),
                              street_name: getComponent('route'),
                              city: getComponent('locality'),
                              state: getComponent('administrative_area_level_1'),
                              postal_code: getComponent('postal_code'),
                              country: getComponent('country'),
                              lat: geometry?.location?.lat() || null,
                              lng: geometry?.location?.lng() || null,
                            }, { 
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true
                            })
                          }}
                          value={field.value.formatted_address}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Timeline Section */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Installation Timeline</h2>
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          {timelineOptions.map((option) => (
                            <FormItem key={option.value} className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value={option.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Get Your Quote"}
              </Button>

              {submitError && (
                <p className="text-sm text-destructive text-center">{submitError}</p>
              )}
              {submitSuccess && (
                <p className="text-sm text-green-600 text-center">
                  Thank you! We&apos;ll be in touch shortly.
                </p>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  )
} 