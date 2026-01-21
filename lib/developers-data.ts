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
      "Everything within Reach at Palm Village, Enjoy Realty Development and Corporation most accessible subdivision.",
    location: "Brgy. San Felipe, Naga City",
    propertyType: "Residential Subdivision",
    lotArea: "43,108 sqm",
    status: "Ongoing Development",
    imageUrl: "/PV.jpg",
  },
  {
    id: "parkview-executive",
    name: "Parkview Executive Townhomes",
    description:
      "A premium residential community with modern amenities and strategic location.",
    location: "Brgy. San Felipe, Naga City",
    propertyType: "Residential Subdivision",
    lotArea: "66,849.24 sqm",
    status: "Fully Developed",
    imageUrl: "/PET.png",
  },
  {
    id: "haciendas-de-naga",
    name: "Haciendas de Naga",
    description:
      "Haciendas de Naga gives its residents, guests and visitors a number of reasons to relax, enjoy and celebrate; all the while offering premier vacations which are just within reach.",
    location: "Brgy. Carolina, Naga City",
    propertyType: "Residential Estate",
    lotArea: "Approximately 82 hectares",
    status: "Fully Developed and Adding more Amenities",
    imageUrl: "/HDN.jpg",
  },
  {
    id: "parkview-employees-village",
    name: "Parkview Employees' Village",
    description:
      "Offering economic housing for employees working in Bicol's premier business district.",
    location: "Brgy. San Felipe, Naga City",
    propertyType: "Residential Estate",
    lotArea: "TBA",
    status: "TBA",
    imageUrl: "/placeholder.svg",
  },
]

export const amanProjects: DeveloperProject[] = [
  {
    id: "parkview-nur",
    name: "Parkview Naga Urban Residences",
    description:
      "Enjoy Space + Living at Naga Urban Residences where Every Space Meets your Needs.",
    location: "Brgy. San Felipe, Naga City",
    propertyType: "Residential Subdivision",
    lotArea: "72,667.36 sqm",
    status: "Fully Developed",
    imageUrl: "/NUR.jpg",
  },
]
