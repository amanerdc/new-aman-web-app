import Link from "next/link"
import Image from "next/image"
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
          <span className="font-medium">Lot Only Properties</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Lot Only Properties</h1>
          <p className="text-muted-foreground">Browse our available residential lots and build your dream home</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lotOnlyProperties.map((lot) => (
            <Card key={lot.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={lot.imageUrl || "/placeholder.svg"}
                  alt={lot.name}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" style={{ borderColor: lot.developerColor, color: lot.developerColor }}>
                    {lot.developer}
                  </Badge>
                  <Badge variant={lot.status === "Available" ? "default" : "secondary"}>{lot.status}</Badge>
                </div>
                <CardTitle className="text-lg">{lot.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{lot.project}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Lot Area</p>
                    <p className="font-medium">{lot.lotArea}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-bold text-primary">
                      ₱{lot.price.toLocaleString('en-PH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href={`/lot-only/${lot.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link
                    href={`/calculator?price=${lot.price}&unit=${encodeURIComponent(lot.name)}&option=${lot.propertyOption}`}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </div>
  )
}

