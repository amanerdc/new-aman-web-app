import Link from "next/link"
import { SmartMedia } from "@/components/media/SmartMedia"
import { Home, MapPin, Calculator, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getLotOnlyProperties } from "@/lib/db"

export const revalidate = 0

export const metadata = {
  title: "Lot Only Properties | Aman Group of Companies",
  description: "Browse available lot only properties from Aman Group of Companies",
}

export default async function LotOnlyPage() {
  const lotOnlyProperties = await getLotOnlyProperties()
  const hasLots = lotOnlyProperties.length > 0

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
          <span className="font-medium">Lot Only Properties</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Lot Only Properties</h1>
          <p className="text-muted-foreground">Browse our available residential lots and build your dream home</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasLots ? lotOnlyProperties.map((lot) => (
            <Card key={lot.id} className="overflow-hidden h-full min-h-[460px] hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <SmartMedia
                  src={lot.imageUrl}
                  alt={textOrFallback(lot.name)}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                  embedClassName="h-full w-full border-0"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className="max-w-full truncate" style={{ borderColor: lot.developerColor, color: lot.developerColor }}>
                    {textOrFallback(lot.developer)}
                  </Badge>
                  <Badge variant={lot.status === "Available" ? "default" : "secondary"} className="max-w-full truncate">
                    {textOrFallback(lot.status)}
                  </Badge>
                </div>
                <CardTitle className="text-lg break-words">{textOrFallback(lot.name)}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{textOrFallback(lot.project)}</span>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Lot Area</p>
                    <p className="font-medium break-words">{textOrFallback(lot.lotArea)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-bold text-primary">
                      {lot.price > 0 ? `PHP ${lot.price.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}` : "No data available."}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col sm:flex-row gap-2">
                <Button asChild variant="outline" className="w-full sm:flex-1 bg-transparent">
                  <Link href={`/lot-only/${lot.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                <Button asChild className="w-full sm:flex-1">
                  <Link
                    href={`/calculator?price=${lot.price}&unit=${encodeURIComponent(lot.name)}&unitImage=${encodeURIComponent(lot.imageUrl || "")}&option=${lot.propertyOption}`}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )) : (
            <Card className="overflow-hidden h-full min-h-[460px] sm:col-span-2 lg:col-span-1">
              <CardContent className="h-full p-6 flex items-center justify-center text-center text-muted-foreground">
                No data available.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
