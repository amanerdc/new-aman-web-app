"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, User, Mail, Phone, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

type BookViewingFormProps = {
  propertyName: string
  agentName?: string | null
}

export function BookViewingForm({ propertyName, agentName }: BookViewingFormProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, you would send this to an API
    console.log("Booking submitted:", {
      ...formData,
      preferredDate: date,
      propertyName,
      referredBy: agentName,
      sentTo: "frontdesk@enjoyrealty.com",
    })

    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Booking Request Sent!</h3>
          <p className="text-muted-foreground text-sm">
            We&apos;ll contact you soon to confirm your viewing schedule for {propertyName}.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Book a Viewing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left column - Calendar */}
            <div className="space-y-2">
              <Label>Select Preferred Date</Label>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>

            {/* Right column - Name, Email, Phone */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="booking-name">
                  <User className="h-3 w-3 inline mr-1" />
                  Name *
                </Label>
                <Input
                  id="booking-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-email">
                  <Mail className="h-3 w-3 inline mr-1" />
                  Email *
                </Label>
                <Input
                  id="booking-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-phone">
                  <Phone className="h-3 w-3 inline mr-1" />
                  Phone *
                </Label>
                <Input
                  id="booking-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09XX XXX XXXX"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-message">
              <MessageSquare className="h-3 w-3 inline mr-1" />
              Message *
            </Label>
            <Textarea
              id="booking-message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Let us know your preferred schedule"
              rows={3}
            />
          </div>

          {agentName && (
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm">
                <User className="h-3 w-3 inline mr-1" />
                Referred by: <strong>{agentName}</strong>
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting || !date}>
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
