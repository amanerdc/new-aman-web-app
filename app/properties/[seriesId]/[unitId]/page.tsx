import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, CheckCircle2, Calculator, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { modelHouseSeries } from "@/lib/data"
import { getAgentById } from "@/lib/agents"
import { BookViewingForm } from "@/components/book-viewing-form"
import { AgentTools } from "@/components/agent-tools"

export async function generateStaticParams() {
  const params: { seriesId: string; unitId: string }[] = []
  Object.entries(modelHouseSeries).forEach(([seriesId, series]) => {
    series.units.forEach((unit) => {
      params.push({ seriesId, unitId: unit.id })
    })
  })
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seriesId: string; unitId: string }>
}) {
  const { seriesId, unitId } = await params
  const series = modelHouseSeries[seriesId]
  if (!series) return { title: "Not Found" }
  const unit = series.units.find((u) => u.id === unitId)
  if (!unit) return { title: "Not Found" }
  return {
    title: `${unit.seriesName} - ${unit.name} | Aman Group of Companies`,
    description: unit.description,
  }
}

export default async function UnitDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ seriesId: string; unitId: string }>
  searchParams: Promise<{ agent?: string }>
}) {
  const { seriesId, unitId } = await params
  const { agent: agentId } = await searchParams
  const series = modelHouseSeries[seriesId]

  if (!series) {
    notFound()
  }

  const unit = series.units.find((u) => u.id === unitId)

  if (!unit) {
    notFound()
  }

  const agent = agentId ? getAgentById(agentId) : null
  const specifications = unit.specifications || series.specifications

  return (
    <div className="py-8">
      <div className="container max-w-6xl">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link href={`/properties/${seriesId}`} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to {series.name}
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border">
              <Image
                src={unit.imageUrl || "/placeholder.svg"}
                alt={`${unit.seriesName} - ${unit.name}`}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            {/* Floor Plan */}
            {unit.floorPlanPdfId && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Floor Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
                    <a
                      href={`https://drive.google.com/file/d/${unit.floorPlanPdfId}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Floor Plan PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge
                  variant={unit.status === "Available" ? "default" : "secondary"}
                  className={unit.status === "Available" ? "bg-primary" : ""}
                >
                  {unit.status}
                </Badge>
                {unit.isRFO && <Badge variant="outline">Ready for Occupancy</Badge>}
                {series.loftReady && <Badge variant="outline">Loft Ready</Badge>}
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {unit.seriesName} - {unit.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{unit.location}</span>
              </div>
            </div>

            <p className="text-muted-foreground">{unit.description}</p>

            <Separator />

            {/* Pricing Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Pricing Details</h3>
              <div className="grid gap-3">
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Lot Only Price</span>
                  <span className="font-semibold">₱{unit.lotOnlyPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">House Construction Price</span>
                  <span className="font-semibold">₱{unit.houseConstructionPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="font-medium">Total Contract Price</span>
                  <span className="text-2xl font-bold text-primary">₱{unit.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="w-full gap-2">
              <Link
                href={`/calculator?price=${unit.price}&unit=${encodeURIComponent(unit.seriesName + " - " + unit.name)}${agentId ? `&agent=${agentId}` : ""}`}
              >
                <Calculator className="h-5 w-5" />
                Calculate Loan
              </Link>
            </Button>
          </div>
        </div>

        {/* Features and Specifications */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Features & Inclusions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {unit.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Construction Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <h4 className="font-medium capitalize text-sm text-primary">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h4>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <BookViewingForm propertyName={`${unit.seriesName} - ${unit.name}`} agentName={agent?.name} />
        </div>

        {/* Video Walkthrough */}
        {unit.walkthrough && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Video Walkthrough
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={unit.walkthrough}
                  title={`${unit.seriesName} - ${unit.name} Walkthrough`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Project Info */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Project</p>
                <p className="font-semibold">{series.project}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Developer</p>
                <p className="font-semibold">{series.developer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Floor Area</p>
                <p className="font-semibold">{series.floorArea}</p>
              </div>
              <Button asChild>
                <Link href="/contact">Inquire Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <AgentTools currentPath={`/properties/${seriesId}/${unitId}`} />
      </div>
    </div>
  )
}
