"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Home, Send, MapPin, Phone, Mail, Clock, User, Building2, MessageSquare, NotebookTabs } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AgentTools } from "@/components/agent-tools"
import { getAgentById } from "@/lib/agents"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const agentId = searchParams.get("agent")
  const agent = agentId ? getAgentById(agentId) : null

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectLocation: "",
    propertyInterest: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          referredBy: agent?.name,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const error = await response.json()
        alert(`Failed to send message: ${error.error}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-12">
        <div className="container max-w-2xl mx-auto text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Message Sent!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for contacting us. We&apos;ll get back to you as soon as possible.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-12">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            <Home className="h-4 w-4 inline mr-1" />
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="font-medium">Contact Us</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Contact Us</h1>
          <p className="text-muted-foreground">
            Get in touch with us for inquiries, property viewings, or any questions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <User className="h-3 w-3 inline mr-1" />
                    Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-3 w-3 inline mr-1" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="h-3 w-3 inline mr-1" />
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="09XX XXX XXXX"
                    />
                  </div>
                </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project-location">
                    <MapPin className="h-3 w-3 inline mr-1" />
                    Project Location *
                  </Label>
                  <Select
                    value={formData.projectLocation}
                    onValueChange={(value) => setFormData({ ...formData, projectLocation: value })}
                    required
                  >
                    <SelectTrigger id="project-location" className="w-full h-11">
                      <SelectValue placeholder="Select project location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="palm-village">Palm Village</SelectItem>
                      <SelectItem value="naga-urban-residence">Naga Urban Residences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property-interest">
                    <Building2 className="h-3 w-3 inline mr-1" />
                    Property Interest
                  </Label>
                  <Select
                    value={formData.propertyInterest}
                    onValueChange={(value) => setFormData({ ...formData, propertyInterest: value })}
                  >
                    <SelectTrigger id="property-interest" className="w-full h-11">
                      <SelectValue placeholder="Select property interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="model-house">Model House</SelectItem>
                      <SelectItem value="ready-for-occupancy">Ready for Occupancy</SelectItem>
                      <SelectItem value="lot-only">Lot Only</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your inquiry..."
                    rows={4}
                  />
                </div>

                {agent && (
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm">
                      <User className="h-3 w-3 inline mr-1" />
                      Referred by: <strong>{agent.name}</strong>
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <NotebookTabs className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Aman Corporate Center, Zone 6, San Felipe, Naga City, Camarines Sur, Philippines
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">(054) 884-5188</p>
                    <p className="text-sm text-muted-foreground">(Smart) 09296083744</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">frontdesk@enjoyrealty.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Saturday</span>
                    <span className="font-medium">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium text-destructive">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        

<div className="mt-12 max-w-6xl mx-auto mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mb-8">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1938.6120689415682!2d123.20621644417818!3d13.644125367180653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a1f323b02da27d%3A0xc0e5b304d52de86b!2sAMAN%20CORPORATE%20CENTER!5e0!3m2!1sen!2sph!4v1768455447944!5m2!1sen!2sph"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Aman Corporate Center Location"
                  />
                </div>
              </CardContent>
            </Card>
        </div>
        <AgentTools currentPath="/contact" />
      </div>
    </div>
  )
}
