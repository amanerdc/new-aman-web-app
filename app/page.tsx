import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, Calculator, Home, CheckCircle2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { modelHouseSeries } from "@/lib/data"

export default function HomePage() {
  const featuredSeries = Object.values(modelHouseSeries).slice(0, 4)

  return (
    <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-20 lg:py-32">
          <div className="container p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                  Building Dreams, Creating Communities
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl text-pretty">
                  Quality homes and sustainable communities for Bicolano families since 1989
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/properties">
                      <Home className="h-5 w-5" />
                      Browse Properties
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                    <Link href="/developers">
                      <Users className="h-5 w-5" />
                      Our Developers
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-2xl">
                  <Image
                    src="https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Thalia%20Series/ERDC%20-%20THALIA%20Complete%20with%20Garage-Uy9Q3BR7tXMDI9b4CdipoAAJHm5yyC.jpg"
                    alt="Modern home by Aman Group"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-12 bg-card">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We are committed to building quality homes that Filipino families can afford.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Quality Construction",
                  description: "We use ARISE Technology for innovative, reliable, strong, and economical construction.",
                },
                {
                  title: "Flexible Financing",
                  description: "Multiple payment options including Pag-IBIG, Bank, and In-House financing",
                },
                {
                  title: "Prime Location",
                  description: "Strategic locations in Naga City with access to amenities",
                },
                {
                  title: "Trusted Developer",
                  description: "Award-winning developer serving Bicolanos for 30+ years",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-20 px-12">
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Browse Model Houses</h2>
                <p className="text-muted-foreground">Explore our range of model houses designed for every family</p>
              </div>
              <Button asChild variant="outline" className="hidden sm:flex gap-2 bg-transparent">
                <Link href="/properties">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredSeries.map((series) => (
                <Link key={series.id} href={`/properties/${series.id}`} className="group">
                  <Card className="overflow-hidden border-border/50 transition-all hover:border-primary/50 hover:shadow-lg">
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={series.imageUrl || "/placeholder.svg"}
                        alt={series.name}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {series.floorArea}
                        </span>
                        {series.loftReady && (
                          <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
                            Loft Ready
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{series.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{series.description}</p>
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground">Starting at</p>
                        <p className="text-lg font-bold text-primary">₱{series.basePrice.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Button asChild variant="outline" className="gap-2 bg-transparent">
                <Link href="/properties">
                  View All Properties
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Find Your Dream Home?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Use our loan calculator to estimate your monthly payments and find the perfect financing option for you.
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/calculator">
                <Calculator className="h-5 w-5" />
                Calculate Your Loan
              </Link>
            </Button>
          </div>
        </section>
    </div>
  )
}
