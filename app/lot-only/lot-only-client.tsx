"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { SmartMedia } from "@/components/media/SmartMedia"
import { Home, MapPin, Calculator, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type LotOnlyProperty = {
  id: string
  name?: string | null
  description?: string | null
  location?: string | null
  project?: string | null
  developer?: string | null
  developerColor?: string | null
  status?: string | null
  imageUrl?: string | null
  price?: number | null
  lotArea?: number | string | null
  propertyOption?: string | null
}

const PRICE_MIN = 1_000_000
const PRICE_MAX = 20_000_000
const LOT_AREA_MIN = 10
const LOT_AREA_MAX = 500

const textOrFallback = (value: string | null | undefined) => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : "No data available."
}

const toNumber = (value: unknown) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : NaN
  }
  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.]/g, "")
    if (!cleaned) return NaN
    const parsed = Number(cleaned)
    return Number.isFinite(parsed) ? parsed : NaN
  }
  return NaN
}

const formatLotArea = (value: number | string | null | undefined) => {
  const numeric = toNumber(value)
  if (!Number.isFinite(numeric)) {
    return "No data available."
  }
  return `${numeric.toLocaleString("en-PH")} sqm`
}

const formatPrice = (value: number | null | undefined) => {
  if (!value || value <= 0) return "No data available."
  return `PHP ${value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function LotOnlyClient({ lotOnlyProperties }: { lotOnlyProperties: LotOnlyProperty[] }) {
  const [query, setQuery] = useState("")
  const [priceMin, setPriceMin] = useState(PRICE_MIN)
  const [priceMax, setPriceMax] = useState(PRICE_MAX)
  const [lotAreaMin, setLotAreaMin] = useState(LOT_AREA_MIN)
  const [lotAreaMax, setLotAreaMax] = useState(LOT_AREA_MAX)

  const filteredLots = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    return lotOnlyProperties.filter((lot) => {
      const searchPool = [
        lot.name,
        lot.description,
        lot.location,
        lot.project,
        lot.developer,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

      const matchesText = trimmed.length === 0 || searchPool.includes(trimmed)

      const priceValue = toNumber(lot.price)
      const matchesPrice = Number.isFinite(priceValue)
        ? priceValue >= priceMin && priceValue <= priceMax
        : false

      const areaValue = toNumber(lot.lotArea)
      const matchesArea = Number.isFinite(areaValue)
        ? areaValue >= lotAreaMin && areaValue <= lotAreaMax
        : false

      return matchesText && matchesPrice && matchesArea
    })
  }, [lotOnlyProperties, query, priceMin, priceMax, lotAreaMin, lotAreaMax])

  const hasLots = filteredLots.length > 0

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

        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Lot Only Properties</h1>
          <p className="text-muted-foreground">Browse our available residential lots and build your dream home</p>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, description, location, project, developer..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Price Range</span>
              <span className="text-muted-foreground">
                PHP {priceMin.toLocaleString("en-PH")} - {priceMax.toLocaleString("en-PH")}
              </span>
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={100000}
                value={priceMin}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setPriceMin(next)
                  if (next > priceMax) {
                    setPriceMax(next)
                  }
                }}
                className="w-full accent-primary"
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={100000}
                value={priceMax}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setPriceMax(next)
                  if (next < priceMin) {
                    setPriceMin(next)
                  }
                }}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Lot Area Range</span>
              <span className="text-muted-foreground">
                {lotAreaMin} - {lotAreaMax} sqm
              </span>
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min={LOT_AREA_MIN}
                max={LOT_AREA_MAX}
                step={1}
                value={lotAreaMin}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setLotAreaMin(next)
                  if (next > lotAreaMax) {
                    setLotAreaMax(next)
                  }
                }}
                className="w-full accent-primary"
              />
              <input
                type="range"
                min={LOT_AREA_MIN}
                max={LOT_AREA_MAX}
                step={1}
                value={lotAreaMax}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setLotAreaMax(next)
                  if (next < lotAreaMin) {
                    setLotAreaMin(next)
                  }
                }}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasLots ? filteredLots.map((lot) => (
            <Card key={lot.id} className="w-full overflow-hidden h-full min-h-[460px] hover:shadow-lg transition-shadow">
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
                  <Badge variant="outline" className="max-w-full truncate" style={{ borderColor: lot.developerColor || undefined, color: lot.developerColor || undefined }}>
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
                    <p className="font-medium break-words">{formatLotArea(lot.lotArea)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-bold text-primary">{formatPrice(lot.price ?? null)}</p>
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
                    href={`/calculator?price=${lot.price}&unit=${encodeURIComponent(lot.name || "")}&unitImage=${encodeURIComponent(lot.imageUrl || "")}&option=${lot.propertyOption}`}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )) : (
            <Card className="w-full overflow-hidden h-full min-h-[460px] sm:col-span-2 lg:col-span-1">
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
