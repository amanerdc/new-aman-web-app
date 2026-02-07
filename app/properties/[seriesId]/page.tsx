import { notFound } from "next/navigation"
import Link from "next/link"
import { SmartMedia } from "@/components/media/SmartMedia"
import { ArrowLeft, MapPin, Ruler, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSeriesById, getUnitsBySeriesId } from "@/lib/db"

export const revalidate = 0
 
export async function generateMetadata({ params }: { params: Promise<{ seriesId: string }> }) {
  const { seriesId } = await params
  const series = await getSeriesById(seriesId)
  if (!series) return { title: "Not Found" }
  return {
    title: `${series.name} | Aman Group of Companies`,
    description: series.description,
  }
}

export default async function SeriesPage({ params }: { params: Promise<{ seriesId: string }> }) {
  const { seriesId } = await params
  const series = await getSeriesById(seriesId)
  const units = await getUnitsBySeriesId(seriesId)

  if (!series) {
    console.log('Series not found for ID:', seriesId)
    return <div>Series not found</div>
  }

  return (
    <div className="p-12">
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
            <SmartMedia
              src={series.image_url}
              alt={series.name}
              width={800}
              height={600}
              className="h-full w-full object-cover"
              embedClassName="h-full w-full border-0"
              priority
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">{series.floor_area}</Badge>
                {series.loft_ready && <Badge>Loft Ready</Badge>}
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{series.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{series.project}</span>
              </div>
            </div>

            <p className="text-muted-foreground">{series.long_description}</p>

            <div>
              <h3 className="font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {(series.features || []).map((feature: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{typeof feature === 'string' ? feature : feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground">Starting Price*</p>
                <p className="text-2xl font-bold text-primary">
                  ₱
                  {units.length > 0
                    ? Math.min(...units.map(u => u.price)).toLocaleString('en-PH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : 'Contact for pricing'}
                </p>
                <br />
                <p className="text-xs text-muted-foreground">*This calculation is for estimation purposes only. Actual rates and terms may vary. Please consult with Aman Group of Companies for accurate computations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Specifications and Units */}
        <Tabs defaultValue="units" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="units">Series Units</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>

          <TabsContent value="units" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {units && units.length > 0 ? units.map((unit) => (
                <Card key={unit.id} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <SmartMedia
                      src={unit.image_url}
                      alt={unit.name}
                      width={400}
                      height={250}
                      className="h-full w-full object-cover"
                      embedClassName="h-full w-full border-0"
                    />
                    <div className="absolute top-3 left-3">
                    </div>
                    {unit.is_rfo && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-background/90">
                          Ready for Occupancy
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {series.name} - {unit.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{unit.description}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="line-clamp-1">{unit.location}</span>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-border">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Contract Price</span>
                        <span className="font-bold text-primary">
                          ₱{unit.price.toLocaleString('en-PH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                      </span>

                      </div>

                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1 bg-transparent">
                          <Link href={`/properties/${seriesId}/${unit.id}`}>View Details</Link>
                        </Button>
                        <Button asChild className="flex-1">
                          <Link
                            href={`/calculator?price=${unit.price}&unit=${encodeURIComponent(series.name + " - " + unit.name)}`}
                          >
                            Calculate Loan
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : <p>No units available</p>}
            </div>
          </TabsContent>

          <TabsContent value="specifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Construction Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {series.specifications ? Object.entries(series.specifications).map(([key, value]: [string, any]) => (
                    <div key={key} className="space-y-1">
                      <h4 className="font-medium capitalize text-sm">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                      <p className="text-sm text-muted-foreground">{String(value)}</p>
                    </div>
                  )) : <p>No specifications available</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>


      </div>
    </div>
  )
}
