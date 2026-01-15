export type LotOnlyProperty = {
  id: string
  name: string
  description: string
  price: number
  propertyOption: "nur_lot_only" | "palm_lot_only"
  location: string
  project: string
  developer: string
  developerColor: string
  status: string
  lotArea: string
  features: string[]
  imageUrl: string
  propertyType: string
  reservationFee: number
  financingOptions: string
  downPaymentPercentage: number
  downPaymentTerms: string
  zoning: string
  utilities: string[]
  nearbyAmenities: string[]
}

export const lotOnlyProperties: LotOnlyProperty[] = [
  {
    id: "parkview-lot-1",
    name: "Parkview Residential Lot 1",
    description: "Prime residential lot in Parkview Naga Urban Residence, perfect for building your dream home.",
    price: 800000,
    propertyOption: "nur_lot_only",
    location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
    project: "Parkview Naga Urban Residence",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    status: "Available",
    lotArea: "100 sqm",
    features: [
      "Flat terrain",
      "Regular shape",
      "Ready for construction",
      "Complete utilities",
      "Accessible location",
      "Near amenities",
    ],
    imageUrl: "/residential-lot-parkview.jpg",
    propertyType: "Lot Only",
    reservationFee: 20000,
    financingOptions: "Bank/Pag-Ibig Financing",
    downPaymentPercentage: 20,
    downPaymentTerms: "payable in 2 years with 0% interest",
    zoning: "Residential",
    utilities: ["Water", "Electricity", "Internet", "Drainage"],
    nearbyAmenities: ["School", "Market", "Hospital", "Park", "Church"],
  },
  {
    id: "parkview-lot-2",
    name: "Parkview Residential Lot 2",
    description: "Corner lot in Parkview Naga Urban Residence with excellent location and accessibility.",
    price: 950000,
    propertyOption: "nur_lot_only",
    location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
    project: "Parkview Naga Urban Residence",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    status: "Available",
    lotArea: "120 sqm",
    features: [
      "Corner lot",
      "Flat terrain",
      "Regular shape",
      "Ready for construction",
      "Complete utilities",
      "Accessible location",
      "Near amenities",
    ],
    imageUrl: "/corner-lot-residential.jpg",
    propertyType: "Lot Only",
    reservationFee: 20000,
    financingOptions: "Bank/Pag-Ibig Financing",
    downPaymentPercentage: 20,
    downPaymentTerms: "payable in 2 years with 0% interest",
    zoning: "Residential",
    utilities: ["Water", "Electricity", "Internet", "Drainage"],
    nearbyAmenities: ["School", "Market", "Hospital", "Park", "Church"],
  },
  {
    id: "parkview-lot-3",
    name: "Parkview Residential Lot 3",
    description: "Spacious residential lot in Parkview Naga Urban Residence, ideal for a large family home.",
    price: 1200000,
    propertyOption: "nur_lot_only",
    location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
    project: "Parkview Naga Urban Residence",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    status: "Available",
    lotArea: "150 sqm",
    features: [
      "Flat terrain",
      "Regular shape",
      "Ready for construction",
      "Complete utilities",
      "Accessible location",
      "Near amenities",
      "Spacious area",
    ],
    imageUrl: "/spacious-residential-lot.jpg",
    propertyType: "Lot Only",
    reservationFee: 25000,
    financingOptions: "Bank/Pag-Ibig Financing",
    downPaymentPercentage: 20,
    downPaymentTerms: "payable in 2 years with 0% interest",
    zoning: "Residential",
    utilities: ["Water", "Electricity", "Internet", "Drainage"],
    nearbyAmenities: ["School", "Market", "Hospital", "Park", "Church"],
  },
  {
    id: "palm-village-lot-1",
    name: "Palm Village Residential Lot 1",
    description:
      "Beautiful residential lot in Palm Village, perfect for building your dream home in a serene environment.",
    price: 750000,
    propertyOption: "palm_lot_only",
    location: "Palm Village, Brgy. Concepcion Grande, Naga City",
    project: "Palm Village",
    developer: "Enjoy Realty",
    developerColor: "#65932D",
    status: "Available",
    lotArea: "100 sqm",
    features: [
      "Flat terrain",
      "Regular shape",
      "Ready for construction",
      "Complete utilities",
      "Accessible location",
      "Near amenities",
      "Serene environment",
    ],
    imageUrl: "/palm-village-lot.jpg",
    propertyType: "Lot Only",
    reservationFee: 20000,
    financingOptions: "Bank/Pag-Ibig Financing",
    downPaymentPercentage: 20,
    downPaymentTerms: "payable in 2 years with 0% interest",
    zoning: "Residential",
    utilities: ["Water", "Electricity", "Internet", "Drainage"],
    nearbyAmenities: ["School", "Market", "Hospital", "Park", "Church"],
  },
  {
    id: "palm-village-lot-2",
    name: "Palm Village Residential Lot 2",
    description: "Corner lot in Palm Village with excellent location and accessibility.",
    price: 900000,
    propertyOption: "palm_lot_only",
    location: "Palm Village, Brgy. Concepcion Grande, Naga City",
    project: "Palm Village",
    developer: "Enjoy Realty",
    developerColor: "#65932D",
    status: "Available",
    lotArea: "120 sqm",
    features: [
      "Corner lot",
      "Flat terrain",
      "Regular shape",
      "Ready for construction",
      "Complete utilities",
      "Accessible location",
      "Near amenities",
      "Serene environment",
    ],
    imageUrl: "/corner-lot-palm-village.jpg",
    propertyType: "Lot Only",
    reservationFee: 20000,
    financingOptions: "Bank/Pag-Ibig Financing",
    downPaymentPercentage: 20,
    downPaymentTerms: "payable in 2 years with 0% interest",
    zoning: "Residential",
    utilities: ["Water", "Electricity", "Internet", "Drainage"],
    nearbyAmenities: ["School", "Market", "Hospital", "Park", "Church"],
  },
  {
    id: "palm-village-lot-3",
    name: "Palm Village Residential Lot 3",
    description: "Spacious residential lot in Palm Village, ideal for a large family home in a serene environment.",
    price: 1100000,
    propertyOption: "palm_lot_only",
    location: "Palm Village, Brgy. Concepcion Grande, Naga City",
    project: "Palm Village",
    developer: "Enjoy Realty",
    developerColor: "#65932D",
    status: "Available",
    lotArea: "150 sqm",
    features: [
      "Flat terrain",
      "Regular shape",
      "Ready for construction",
      "Complete utilities",
      "Accessible location",
      "Near amenities",
      "Spacious area",
      "Serene environment",
    ],
    imageUrl: "/spacious-lot-palm-village.jpg",
    propertyType: "Lot Only",
    reservationFee: 25000,
    financingOptions: "Bank/Pag-Ibig Financing",
    downPaymentPercentage: 20,
    downPaymentTerms: "payable in 2 years with 0% interest",
    zoning: "Residential",
    utilities: ["Water", "Electricity", "Internet", "Drainage"],
    nearbyAmenities: ["School", "Market", "Hospital", "Park", "Church"],
  },
]

export function getLotOnlyById(id: string): LotOnlyProperty | undefined {
  return lotOnlyProperties.find((lot) => lot.id === id)
}
