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
import { PlacesAutocomplete } from "@/components/ui/places-autocomplete"

const leadFormSchema = z.object({
  customer: z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email().nullish().transform(val => val || ''),
    phone: z.string().min(10, "Phone number must be at least 10 digits").nullish().transform(val => val || ''),
    address: z.object({
      formatted_address: z.string().min(1, "Installation address is required"),
    }).strip(),
  }),
  timeline: z.enum(['ASAP', 'THIS_WEEK', 'THIS_MONTH', 'FLEXIBLE']),
  knows_length: z.enum(['YES', 'NO']),
  ramp_length: z.number().nullable(),
  notes: z.string().nullish().transform(val => val || ''),
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
        email: '',
        phone: '',
        address: {
          formatted_address: '',
        },
      },
      timeline: 'FLEXIBLE',
      knows_length: 'NO',
      ramp_length: null,
      notes: '',
    },
  })

  async function onSubmit(values: z.infer<typeof leadFormSchema>) {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const response = await fetch('https://your-main-app.com/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to submit lead')
      }

      setSubmitSuccess(true)
      form.reset()
    } catch {
      setSubmitError('Failed to submit lead. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
                        <Input type="email" placeholder="john@example.com" {...field} />
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
                        <Input type="tel" placeholder="(555) 555-5555" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="customer.address.formatted_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Installation Address</FormLabel>
                    <FormControl>
                      <PlacesAutocomplete 
                        placeholder="123 Main St, City, State"
                        onPlaceSelect={(place) => {
                          if (place.formatted_address) {
                            field.onChange(place.formatted_address)
                          }
                        }}
                        value={field.value}
                        onChange={field.onChange}
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
  )
} 