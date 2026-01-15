import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, CheckCircle2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { modelHouseSeries, type Unit, type ModelHouseSeries } from "@/lib/data"
import { AgentTools } from "@/components/agent-tools"

export const metadata = {
  title: "Ready for Occupancy Units | Aman Group of Companies",
  description:
    "Browse our ready for occupancy (RFO) units - move-in ready homes with complete finishes at Parkview Naga Urban Residence.",
}

// Get all RFO units across all series
function getRFOUnits(): { unit: Unit; series: ModelHouseSeries }[] {
  const rfoUnits: { unit: Unit; series: ModelHouseSeries }[] = []

  Object.values(modelHouseSeries).forEach((series) => {
    series.units.forEach((unit) => {
      if (unit.isRFO) {
        rfoUnits.push({ unit, series })
      }
    })
  })

  return rfoUnits
}

export default function RFOPage() {
  const rfoUnits = getRFOUnits()

  return (
    <div className="py-8">
      <div className="container">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link href="/properties" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Model Houses
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <Image
              src="/jasmine-45-basic-loft-garage.jpg"
              alt="Ready for Occupancy Units"
              width={800}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge>Move-in Ready</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Ready for Occupancy Units</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Parkview Naga Urban Residence</span>
              </div>
            </div>

            <p className="text-muted-foreground">
              Skip the wait and move into your new home today. These fully constructed units are ready for immediate
              occupancy with complete finishes. What you see is what you get - inspect the actual unit before purchase
              with no surprises.
            </p>

            <div>
              <h3 className="font-semibold mb-3">Why Choose RFO?</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Immediate Move-In - No waiting for construction",
                  "What You See is What You Get - Inspect actual unit",
                  "Faster Loan Processing - Banks process loans faster",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-1">Available Units</p>
              <p className="text-3xl font-bold text-primary">
                {rfoUnits.length} Unit{rfoUnits.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs for Units */}
        <Tabs defaultValue="units" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="units">Available Units</TabsTrigger>
            <TabsTrigger value="info">More Information</TabsTrigger>
          </TabsList>

          <TabsContent value="units" className="space-y-6">
            {rfoUnits.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
                {rfoUnits.map(({ unit, series }) => (
                  <Card
                    key={unit.id}
                    className="overflow-hidden border-border/50 hover:border-primary/50 transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <Image
                        src={unit.imageUrl || "/placeholder.svg"}
                        alt={unit.name}
                        width={400}
                        height={250}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary">Ready for Occupancy</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {unit.seriesName} - {unit.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{unit.description}</p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="line-clamp-1">{unit.location}</span>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-border">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Contract Price</span>
                          <span className="font-bold text-primary">₱{unit.price.toLocaleString()}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button asChild variant="outline" className="flex-1 bg-transparent">
                            <Link href={`/properties/${series.id}/${unit.id}`}>View Details</Link>
                          </Button>
                          <Button asChild className="flex-1">
                            <Link
                              href={`/calculator?price=${unit.price}&unit=${encodeURIComponent(unit.seriesName + " - " + unit.name)}`}
                            >
                              Calculate Loan
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No RFO Units Available</h2>
                  <p className="text-muted-foreground mb-6">
                    All our ready for occupancy units have been sold. Check out our other available properties.
                  </p>
                  <Button asChild>
                    <Link href="/properties">Browse All Properties</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  About Ready for Occupancy Units
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Immediate Move-In</h4>
                    <p className="text-sm text-muted-foreground">
                      No waiting for construction. Move into your new home as soon as the paperwork is done.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">What You See is What You Get</h4>
                    <p className="text-sm text-muted-foreground">
                      Inspect the actual unit before purchase. No surprises - see the exact finishes and quality.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Faster Loan Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Banks process loans faster for completed units since they can immediately appraise the property.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Complete Finishes</h4>
                    <p className="text-sm text-muted-foreground">
                      All RFO units come with complete finishes including tiles, paint, fixtures, and more.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AgentTools currentPath="/rfo" />
      </div>
    </div>
  )
}
