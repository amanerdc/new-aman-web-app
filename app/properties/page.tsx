import Link from "next/link"
import { SmartMedia } from "@/components/media/SmartMedia"
import { Home } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSeries, getUnits } from "@/lib/db"

export const revalidate = 0


export const metadata = {
  title: "Model Houses | Aman Group of Companies",
  description: "Browse our selection of quality model houses in Parkview Naga Urban Residence",
}

export default async function PropertiesPage() {
  const allSeries = await getSeries()
  const allUnits = await getUnits()
  const hasSeries = allSeries.length > 0

  // Helper function to get units for a series
  const getUnitsForSeries = (seriesId: string) => {
    return allUnits.filter(unit => unit.series_id === seriesId)
  }

  const textOrFallback = (value: string | null | undefined) => {
    const trimmed = value?.trim()
    return trimmed ? trimmed : "No data available."
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            <Home className="h-4 w-4 inline mr-1" />
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="font-medium">Model House Series</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Explore Our Model House Series</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Each series offers different configurations and packages to suit your needs and budget. Click on a series to
            view available units and specifications.
          </p>
        </div>

        {/* Series Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {hasSeries ? allSeries.map((series) => {
            const seriesUnits = getUnitsForSeries(series.id)
            const minPrice = seriesUnits.length > 0 ? Math.min(...seriesUnits.map(u => u.price)) : 0
            
            return (
              <Link key={series.id} href={`/properties/${series.id}`} className="group">
                <Card className="overflow-hidden h-full min-h-[440px] border-border/50 transition-all hover:border-primary/50 hover:shadow-xl">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <SmartMedia
                      src={series.imageUrl}
                      alt={series.name}
                      width={600}
                      height={375}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      embedClassName="h-full w-full border-0"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                        {textOrFallback(series.project)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{textOrFallback(series.name)}</h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{textOrFallback(series.description)}</p>

                    {/* Features Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(series.features || []).slice(0, 3).map((feature: unknown, index: number) => (
                        <span key={index} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                          {typeof feature === 'string' ? textOrFallback(feature) : String(feature)}
                        </span>
                      ))}
                      {(series.features || []).length === 0 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          No data available.
                        </span>
                      )}
                      {(series.features || []).length > 3 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{(series.features || []).length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Price and Units */}
                    <div className="flex items-end justify-between pt-4 border-t border-border">
                      <div>
                        <div>
                          <p className="text-sm text-muted-foreground">Starting Price</p>
                          <p className="text-2xl font-bold text-primary">
                            ₱
                            {seriesUnits.length > 0
                              ? minPrice.toLocaleString('en-PH', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : 'No data available.'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="font-semibold">{seriesUnits.length} Units</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          }) : (
            <Card className="overflow-hidden h-full min-h-[440px] border-border/50 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 flex items-center justify-center text-center text-muted-foreground">
                No data available.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

