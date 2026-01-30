import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, CheckCircle2, Calculator, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getUnitById, getSeriesById } from "@/lib/db"
import { BookViewingForm } from "@/components/book-viewing-form"
import { AgentTools } from "@/components/agent-tools"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seriesId: string; unitId: string }>
}) {
  const { seriesId, unitId } = await params
  const unit = await getUnitById(unitId)
  const series = await getSeriesById(seriesId)
  if (!unit || !series) return { title: "Not Found" }
  return {
    title: `${series.name} - ${unit.name} | Aman Group of Companies`,
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
  const { agent: agentParam } = await searchParams
  const unit = await getUnitById(unitId)
  const series = await getSeriesById(seriesId)

  if (!unit || !series) {
    notFound()
  }

  const specifications = series.specifications

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-6xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link href={`/properties/${seriesId}`} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Series
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border">
              <Image
                src={unit.image_url || "/placeholder.svg"}
                alt={unit.name}
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
                {unit.is_rfo && <Badge variant="outline">Ready for Occupancy</Badge>}
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {series.name} - {unit.name}
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
                {unit.lot_only_price && (
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span className="text-muted-foreground">Lot Only Price</span>
                    <span className="font-semibold">
                      ₱{unit.lot_only_price.toLocaleString('en-PH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                )}
                {unit.house_construction_price && (
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span className="text-muted-foreground">House Construction Price</span>
                    <span className="font-semibold">
                      ₱{unit.house_construction_price.toLocaleString('en-PH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="font-medium">Total Contract Price*</span>
                  <span className="text-2xl font-bold text-primary">
                    ₱{unit.price.toLocaleString('en-PH', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">*This calculation is for estimation purposes only. Actual rates and terms may vary. Please consult with Aman Group of Companies for accurate computations.</p>
            </div>


            <Button asChild size="lg" className="w-full gap-2">
              <Link
                href={`/calculator?price=${unit.price}&unit=${encodeURIComponent(series.name + ' - ' + unit.name)}&unitImage=${encodeURIComponent(unit.image_url || '')}${agentParam ? `&agent=${agentParam}` : ''}`}
              >
                <Calculator className="h-5 w-5" />
                Calculate Loan
              </Link>
            </Button>
          </div>
        </div>

        {/* Project Info */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              {series.project && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Project</h4>
                  <p className="font-semibold">{series.project}</p>
                </div>
              )}
              {series.developer && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Developer</h4>
                  <p className="font-semibold">{series.developer}</p>
                </div>
              )}
              {series.floorArea && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Floor Area</h4>
                  <p className="font-semibold">{series.floorArea}</p>
                </div>
              )}
              <div>
                <Button asChild variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground">
                  <Link href={`/contact${agentParam ? `?agent=${agentParam}` : ''}`}>Inquire Now</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features and Specifications */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8 justify-center">
          {/* Features */}
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Features & Inclusions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {(unit.features || []).map((feature: any, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{typeof feature === 'string' ? feature : feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="min-h-full">
            <CardHeader>
              <CardTitle>Construction Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specifications && Object.entries(specifications).length > 0 ? (
                  Object.entries(specifications).map(([key, value]: [string, any]) => (
                    <div key={key} className="space-y-1">
                      <h4 className="font-medium capitalize text-sm text-primary">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <p className="text-sm text-muted-foreground">{String(value)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No specifications available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <BookViewingForm propertyName={`${series.name} - ${unit.name}`} agentId={agentParam} />
        </div>

        <div className="space-y-1 mb-8">
            {/* Floor Plan */}
            {unit.floor_plan_pdf_id && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Floor Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
                    <a
                      href={`https://drive.google.com/file/d/${unit.floor_plan_pdf_id}/view`}
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

        {/* Video Walkthrough */}
        {unit.walkthrough && unit.walkthrough !== "https://www.youtube.com/embed/dQw4w9WgXcQ" && unit.walkthrough.trim() ? (
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
                  title={`${unit.name} Walkthrough`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>
        ) : null}

        <AgentTools currentPath={`/properties/${seriesId}/${unitId}`} />
      </div>
    </div>
  )
}
