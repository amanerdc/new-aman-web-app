export type DeveloperProject = {
  id: string
  name: string
  description: string
  location: string
  propertyType: string
  lotArea: string
  status: string
  imageUrl: string
}

export const enjoyRealtyProjects: DeveloperProject[] = [
  {
    id: "palm-village",
    name: "Palm Village",
    description:
      "A premier residential community offering modern homes with complete amenities in a serene environment. Palm Village provides an ideal setting for families looking for quality living spaces in Naga City.",
    location: "Brgy. Concepcion Grande, Naga City",
    propertyType: "Residential Subdivision",
    lotArea: "Various lot sizes available",
    status: "Ongoing Development",
    imageUrl: "/palm-village-residential.jpg",
  },
  {
    id: "parkview-communities",
    name: "Parkview Communities",
    description:
      "A growing community development project featuring affordable housing options for Filipino families. Parkview Communities offers various house models and lot-only options to suit different budgets.",
    location: "Various locations in Camarines Sur",
    propertyType: "Mixed Residential",
    lotArea: "Various lot sizes available",
    status: "Ongoing Development",
    imageUrl: "/parkview-community.jpg",
  },
  {
    id: "haciendas-de-naga",
    name: "Haciendas de Naga",
    description:
      "An exclusive residential estate offering premium lots and homes in a prime location. Haciendas de Naga combines luxury living with the convenience of city access.",
    location: "Naga City, Camarines Sur",
    propertyType: "Premium Residential Estate",
    lotArea: "Premium lot sizes",
    status: "Development Phase",
    imageUrl: "/haciendas-naga-estate.jpg",
  },
]

export const amanProjects: DeveloperProject[] = [
  {
    id: "parkview-nur",
    name: "Parkview Naga Urban Residence",
    description:
      "A modern urban residential community designed for contemporary Filipino families. Located in the heart of Naga City, Parkview NUR offers affordable yet quality homes with complete amenities and easy access to city conveniences.",
    location: "Zone 7, Brgy. San Felipe, Naga City",
    propertyType: "Urban Residential Community",
    lotArea: "Various lot sizes from 45-108 sqm",
    status: "Ongoing Development",
    imageUrl: "/parkview-naga-urban-residence.jpg",
  },
]
