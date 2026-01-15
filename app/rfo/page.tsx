import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, CheckCircle2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { modelHouseSeries, type Unit, type ModelHouseSeries } from "@/lib/data"
import { AgentTools } from "@/components/agent-tools"
import { BookViewingForm } from "@/components/book-viewing-form"

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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Home className="h-4 w-4" />
            Move-in Ready
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4 text-balance">
            Ready for Occupancy Units
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Skip the wait and move into your new home today. These fully constructed units are ready for immediate
            occupancy with complete finishes.
          </p>
        </div>

        {/* RFO Units Grid */}
        {rfoUnits.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            {rfoUnits.map(({ unit, series }) => (
              <Card
                key={unit.id}
                className="overflow-hidden border-border/50 hover:border-primary/50 transition-all group"
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] md:aspect-auto overflow-hidden relative">
                    <Image
                      src={unit.imageUrl || "/placeholder.svg"}
                      alt={`${unit.seriesName} - ${unit.name}`}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-primary">Ready for Occupancy</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{series.floorArea}</Badge>
                      {series.loftReady && (
                        <Badge variant="outline" className="bg-accent/10">
                          Loft Ready
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {unit.seriesName} - {unit.name}
                    </h2>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{unit.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{unit.description}</p>

                    {/* Key Features */}
                    <div className="space-y-1 mb-4 flex-1">
                      {unit.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </div>
                      ))}
                      {unit.features.length > 3 && (
                        <p className="text-xs text-muted-foreground ml-5">+{unit.features.length - 3} more features</p>
                      )}
                    </div>

                    {/* RFO Details */}
                    {(unit.lotArea || unit.floorArea || unit.reservationFee) && (
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4 p-3 bg-secondary rounded-lg">
                        {unit.lotArea && (
                          <div>
                            <span className="text-muted-foreground">Lot Area:</span>{" "}
                            <span className="font-medium">{unit.lotArea}</span>
                          </div>
                        )}
                        {unit.floorArea && (
                          <div>
                            <span className="text-muted-foreground">Floor Area:</span>{" "}
                            <span className="font-medium">{unit.floorArea}</span>
                          </div>
                        )}
                        {unit.reservationFee && (
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Reservation Fee:</span>{" "}
                            <span className="font-medium">₱{unit.reservationFee.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="pt-3 border-t border-border mb-4">
                      <p className="text-sm text-muted-foreground">Total Contract Price</p>
                      <p className="text-2xl font-bold text-primary">₱{unit.price.toLocaleString()}</p>
                    </div>

                    {/* Actions */}
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
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mb-12">
            <CardContent className="py-12 text-center">
              <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No RFO Units Available</h2>
              <p className="text-muted-foreground mb-6">
                All our ready for occupancy units have been sold. Check out our other available properties.
              </p>
              <Button asChild>
                <Link href="/properties" className="gap-2">
                  Browse All Properties
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Why Choose RFO */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Ready for Occupancy?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Immediate Move-In",
                description: "No waiting for construction. Move into your new home as soon as the paperwork is done.",
              },
              {
                title: "What You See is What You Get",
                description:
                  "Inspect the actual unit before purchase. No surprises - see the exact finishes and quality.",
              },
              {
                title: "Faster Loan Processing",
                description:
                  "Banks process loans faster for completed units since they can immediately appraise the property.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto mb-12">
          <BookViewingForm propertyName="Ready for Occupancy Unit" />
        </div>

        {/* Agent Tools */}
        <AgentTools currentPath="/rfo" />
      </div>
    </div>
  )
}
