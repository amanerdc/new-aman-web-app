import type React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, CheckCircle2, Calculator, Droplets, Zap, Wifi, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { lotOnlyProperties, getLotOnlyById } from "@/lib/lot-only-data"
import { getAgentById } from "@/lib/agents"
import { BookViewingForm } from "@/components/book-viewing-form"
import { AgentTools } from "@/components/agent-tools"

export async function generateStaticParams() {
  return lotOnlyProperties.map((lot) => ({
    lotId: lot.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lotId: string }>
}) {
  const { lotId } = await params
  const lot = getLotOnlyById(lotId)
  if (!lot) return { title: "Not Found" }
  return {
    title: `${lot.name} | Aman Group of Companies`,
    description: lot.description,
  }
}

export default async function LotDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ lotId: string }>
  searchParams: Promise<{ agent?: string }>
}) {
  const { lotId } = await params
  const { agent: agentId } = await searchParams
  const lot = getLotOnlyById(lotId)

  if (!lot) {
    notFound()
  }

  const agent = agentId ? getAgentById(agentId) : null

  const utilityIcons: Record<string, React.ReactNode> = {
    Water: <Droplets className="h-4 w-4" />,
    Electricity: <Zap className="h-4 w-4" />,
    Internet: <Wifi className="h-4 w-4" />,
    Drainage: <Building2 className="h-4 w-4" />,
  }

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="container max-w-6xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link href="/lot-only" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Lot Only Properties
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border">
              <Image
                src={lot.imageUrl || "/placeholder.svg"}
                alt={lot.name}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge variant="outline" style={{ borderColor: lot.developerColor, color: lot.developerColor }}>
                  {lot.developer}
                </Badge>
                <Badge variant={lot.status === "Available" ? "default" : "secondary"}>{lot.status}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{lot.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{lot.location}</span>
              </div>
            </div>

            <p className="text-muted-foreground">{lot.description}</p>

            <Separator />

            {/* Pricing Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Property Details</h3>
              <div className="grid gap-3">
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Lot Area</span>
                  <span className="font-semibold">{lot.lotArea}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Zoning</span>
                  <span className="font-semibold">{lot.zoning}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Reservation Fee</span>
                  <span className="font-semibold">₱{lot.reservationFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="font-medium">Total Price</span>
                  <span className="text-2xl font-bold text-primary">₱{lot.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Financing:</strong> {lot.financingOptions}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Down Payment:</strong> {lot.downPaymentPercentage}% ({lot.downPaymentTerms})
              </p>
            </div>

            <Button asChild size="lg" className="w-full gap-2">
              <Link
                href={`/calculator?price=${lot.price}&unit=${encodeURIComponent(lot.name)}&option=${lot.propertyOption}`}
              >
                <Calculator className="h-5 w-5" />
                Calculate Loan
              </Link>
            </Button>
          </div>
        </div>

        {/* Features and Utilities */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8 justify-center">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lot.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Utilities & Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Utilities & Nearby Amenities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Available Utilities</h4>
                <div className="flex flex-wrap gap-2">
                  {lot.utilities.map((utility, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      {utilityIcons[utility]}
                      {utility}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-sm mb-2">Nearby Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {lot.nearbyAmenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book a Viewing */}
        <div className="mb-8">
          <BookViewingForm propertyName={lot.name} agentName={agent?.name} />
        </div>

        {/* Project Info */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Project</p>
                <p className="font-semibold">{lot.project}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Developer</p>
                <p className="font-semibold" style={{ color: lot.developerColor }}>
                  {lot.developer}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Property Type</p>
                <p className="font-semibold">{lot.propertyType}</p>
              </div>
              <Button asChild>
                <Link href="/contact">Inquire Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <AgentTools currentPath={`/lot-only/${lot.id}`} />
      </div>
    </div>
  )
}
