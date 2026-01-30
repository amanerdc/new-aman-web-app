import Link from "next/link"
import Image from "next/image"
import { Home } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDevelopers, getDeveloperProjects } from "@/lib/db"

export const metadata = {
  title: "Our Developers | Aman Group of Companies",
  description:
    "Learn about our trusted developers - Enjoy Realty & Development Corporation and Aman Engineering Enterprise",
}

export default async function DevelopersPage() {
  const developers = await getDevelopers()
  const allProjects = await getDeveloperProjects()
  
  // Separate projects by developer
  const enjoyRealtyDeveloper = developers.find((d: any) => d.name?.includes('Enjoy Realty'))
  const amanDeveloper = developers.find((d: any) => d.name?.includes('Aman'))
  
  const enjoyRealtyProjects = allProjects.filter((p: any) => p.developerId === enjoyRealtyDeveloper?.id)
  const amanProjects = allProjects.filter((p: any) => p.developerId === amanDeveloper?.id)
  return (
    <div className="p-12">
      {/* Enjoy Realty Section */}
      <section className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            <Home className="h-4 w-4 inline mr-1" />
            Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="font-medium">Our Developers</span>
        </div>

        {/* Enjoy Realty Hero */}
        <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] rounded-xl overflow-hidden mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <Image
                src={enjoyRealtyDeveloper?.imageUrl || "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/logo_images/Enjoy_Realty_Logo%20%281%29-RQ8HUzf03lgsW1fFNZuytby4ifEMUE.png"}
                alt="Enjoy Realty Logo"
                width={600}
                height={400}
                className="object-contain p-8 sm:p-12 opacity-20"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#65932D]/80 to-transparent z-10"></div>
            <div className="px-4 sm:px-6 lg:px-12 max-w-3xl z-20 relative">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 lg:mb-4 leading-tight">
                {enjoyRealtyDeveloper?.name || "Enjoy Realty & Development Corporation"}
              </h1>
              <p className="text-white/90 text-base sm:text-lg lg:text-xl mb-4 lg:mb-6 leading-relaxed">
                {enjoyRealtyDeveloper?.description || "Palm Villages, Parkview Communities, Haciendas de Naga, Employees' Village"}
              </p>
            </div>
          </div>
        </div>

        {/* Enjoy Realty Projects */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4 text-[#65932D]">Our Projects</h2>

          <Tabs defaultValue={enjoyRealtyProjects[0]?.id || ""} className="w-full">
            <TabsList className="flex w-full rounded-lg p-1 bg-gray-100/80 mb-4 lg:mb-4 overflow-x-auto gap-1">
              {enjoyRealtyProjects.map((project) => (
                <TabsTrigger
                  key={project.id}
                  value={project.id}
                  className="flex-1 min-w-[120px] sm:min-w-[140px] rounded-md px-3 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all data-[state=active]:bg-[#65932D] data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-gray-200/80 whitespace-nowrap"
                >
                  <span className="hidden sm:inline">{project.name}</span>
                  <span className="sm:hidden">
                    {project.name.length > 15 ? project.name.split(" ")[0] : project.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {enjoyRealtyProjects.map((project, index) => (
              <TabsContent key={project.id} value={project.id}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden border">
                  <div className="lg:flex">
                    <div className="lg:w-1/2 relative">
                      <div className="h-[250px] sm:h-[300px] lg:h-[350px] overflow-hidden">
                        <Image
                          src={project.imageUrl || "/placeholder.svg"}
                          alt={project.name}
                          width={800}
                          height={600}
                          className="w-full h-full object-contain bg-white hover:scale-102 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                    <div className="lg:w-1/2 p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold mb-4">{project.name}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-900">Location</h4>
                          <p className="text-sm text-muted-foreground">{project.location}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-900">Property Type</h4>
                          <p className="text-sm text-muted-foreground">{project.propertyType}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-900">Lot Area</h4>
                          <p className="text-sm text-muted-foreground">{project.lotArea}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-900">Status</h4>
                          <p className="text-sm text-muted-foreground">{project.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Aman Engineering Section */}
      <section className="container mx-auto px-4 py-12 border-t">
        {/* Aman Engineering Hero */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
          <div className="relative h-full w-full">
            <Image
              src={amanDeveloper?.imageUrl || "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/logo_images/aman_engineering_logo-uZFrkvP8LjG5wN6CEoGfixc9Zgsu91.png"}
              alt="Aman Engineering Enterprise"
              fill
              className="object-contain p-12 opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#04009D]/80 to-transparent flex items-center">
            <div className="px-4 md:px-12 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                {amanDeveloper?.name || "Aman Engineering Enterprise"}
              </h1>
              <p className="text-white/90 text-base md:text-lg mb-4 md:mb-6">{amanDeveloper?.description || "Parkview Naga Urban Residences"}</p>
            </div>
          </div>
        </div>

        {/* Aman Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-[#04009D]">Our Project</h2>

          <Tabs defaultValue={amanProjects[0]?.id || ""} className="w-full">
            <TabsList className="flex w-full rounded-lg p-1 bg-gray-100/80 mb-4 md:mb-4 overflow-x-auto">
              {amanProjects.map((project) => (
                <TabsTrigger
                  key={project.id}
                  value={project.id}
                  className="flex-1 rounded-md px-2 py-2 text-sm md:text-sm font-medium transition-all data-[state=active]:bg-[#04009D] data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-gray-200/80"
                >
                  {project.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {amanProjects.map((project, index) => (
              <TabsContent key={project.id} value={project.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden border">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative h-[300px] overflow-hidden">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.name}
                        width={800}
                        height={600}
                        className="w-full h-full object-contain md:object-cover hover:scale-105 transition-transform duration-300 bg-white"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8">
                      <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
                      <p className="text-muted-foreground mb-6">{project.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold mb-1">Location</h4>
                          <p className="text-sm text-muted-foreground">{project.location}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Property Type</h4>
                          <p className="text-sm text-muted-foreground">{project.propertyType}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Lot Area</h4>
                          <p className="text-sm text-muted-foreground">{project.lotArea}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Status</h4>
                          <p className="text-sm text-muted-foreground">{project.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  )
}
