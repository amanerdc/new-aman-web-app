// Re-export types
export type UnitSpecifications = {
  wall?: string
  flooring?: string
  roofing?: string
  loft?: string
  stairs?: string
  partition?: string
  windows?: string
  doors?: string
  ceiling?: string
  finishing?: string
  toilet?: string
  plumbing?: string
  electrical?: string
  garage?: string
  landscape?: string
  excluded?: string
  foundation?: string
  walls?: string
  kitchen?: string
  bathroom?: string
}

export type Unit = {
  id: string
  name: string
  seriesName: string
  description: string
  price: number
  lotOnlyPrice: number
  houseConstructionPrice: number
  location: string
  status: string
  isRFO: boolean
  features: string[]
  specifications?: UnitSpecifications
  floorPlanImage: string
  imageUrl: string
  floorPlanPdfId: string
  walkthrough: string | null
  lotArea?: string
  reservationFee?: number
  financingOptions?: string
  downPaymentPercentage?: number
  downPaymentTerms?: string
  floorArea?: string
  completionDate?: string
  constructionProgress?: number
}

export type SeriesSpecifications = {
  foundation?: string
  walls?: string
  wall?: string
  roofing?: string
  ceiling?: string
  windows?: string
  doors?: string
  flooring?: string
  kitchen?: string
  bathroom?: string
  electrical?: string
  finishing?: string
  toilet?: string
  plumbing?: string
  garage?: string
  landscape?: string
  excluded?: string
  loft?: string
  stairs?: string
  partition?: string
}

export type ModelHouseSeries = {
  id: string
  name: string
  floorArea: string
  loftReady: boolean
  description: string
  longDescription: string
  features: string[]
  specifications: SeriesSpecifications
  basePrice: number
  floorPlanImage: string
  imageUrl: string
  developer: string
  developerColor?: string
  project: string
  units: Unit[]
}

// Static data exports
export const modelHouseSeries: Record<string, ModelHouseSeries> = {
  /** "jill-108": {
    id: "jill-108",
    name: "Jill 108 Series",
    floorArea: "108 sqm",
    loftReady: false,
    description: "A single-attached home with an open floor plan, perfect for small families.",
    longDescription:
      "The Jill 108 Series is a beautifully designed single-attached home that offers a perfect balance of comfort and functionality. With an open floor plan that maximizes space, this model is ideal for small families. The modern kitchen opens to the dining and living areas, creating a seamless flow for entertaining and daily living. The master bedroom features an en-suite bathroom, while two additional bedrooms share a well-appointed second bathroom.",
    features: [
      "Open floor plan",
      "Living Area",
      "Dining Area",
      "Kitchen & Service Area",
      "Master's Bedroom",
      "2 Bedrooms",
      "Toilet & Bath",
    ],
    specifications: {
      foundation: "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing",
      walls: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      roofing: "Pre-painted Roofing sheets, Roof Framing with C – purlins",
      ceiling: "Fiber Cement Board 4.5mm with light metal frames",
      windows: "Aluminum casement window or Approved Equal Brand",
      doors:
        "Panel Type Door (2.10 x 0.90m) with Doorknob Yale for main entrance, Flush Type Door for service area and T&B",
      flooring: "400x400mm Ceramic floor tiles",
      kitchen: "Movable Kitchen working table with single stainless sink",
      bathroom: "Ceramic floor tiles & wall tiles, Water Closet with Flush Tank – HCG or Approved Equal Brand",
      electrical: "Lighting Fixtures – Royu or Approved Equal Brand, Wiring – Phildex or Approved Equal Brand",
    },
    basePrice: 2500000,
    floorPlanImage: "/jill-108-floor-plan.jpg",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jill/Jill-DL0nFXnfesSdO9P5SZTrr6wLdudfCL.png",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "jill-108-basic",
        name: "Basic",
        seriesName: "Jill 108",
        description: "Essential features with quality construction at an affordable price point.",
        price: 3488000,
        lotOnlyPrice: 1000000,
        houseConstructionPrice: 2488000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Standard fixtures and finishes",
          "Basic kitchen cabinets",
          "Standard bathroom fixtures",
          "Painted walls and ceilings",
          "Tiled floors in main areas",
          "Provision for Garage",
          "Provision for Plant box",
          "Provision for Landscaping",
        ],
        floorPlanImage: "/jill-108-basic-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jill/Jill-DL0nFXnfesSdO9P5SZTrr6wLdudfCL.png",
        floorPlanPdfId: "1uFq1-LSFvJCJhcvq38l7ct3LhSMVwfjm",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "jill-108-complete",
        name: "Complete",
        seriesName: "Jill 108",
        description: "Fully built home with all structural elements and finishes for immediate occupancy.",
        price: 4064000,
        lotOnlyPrice: 1000000,
        houseConstructionPrice: 3064000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Complete structural construction",
          "Premium fixtures and finishes",
          "Fully painted interior and exterior",
          "Complete electrical and plumbing systems",
          "Ready for immediate occupancy",
        ],
        floorPlanImage: "/jill-108-complete-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jill/Jill-DL0nFXnfesSdO9P5SZTrr6wLdudfCL.png",
        floorPlanPdfId: "1uFq1-LSFvJCJhcvq38l7ct3LhSMVwfjm",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
  }, 
  "queenie-72": {
    id: "queenie-72",
    name: "Queenie 72 Series",
    floorArea: "72 sqm",
    loftReady: true,
    description: "A quadruplex unit with loft-ready design, perfect for small families or first-time homeowners.",
    longDescription:
      "The Queenie 72 Series is a well-designed quadruplex unit that offers a perfect balance of comfort and functionality. With a loft-ready design, this model is ideal for small families or first-time homeowners looking for an affordable yet quality home. The ground floor features an open layout with provisions for living, dining, and kitchen areas, plus a toilet and bath. The loft area can be utilized as additional bedrooms or living space.",
    features: [
      "Loft-ready design",
      "Open layout ground floor",
      "Toilet and bath",
      "Provision for carport",
      "Solid concrete construction",
    ],
    specifications: {
      wall: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      flooring:
        "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing, Floor finish - Plain cement finished",
      roofing: "Hi-Corrugated Colored Roofing with C-purlins",
      windows: "Jalouplus window",
      doors:
        "Main entrance: Panel Type Door with Doorknob Kwikset or Approved Equal Brand, Service Area: Flush Type Door with Doorknob Yale or Approved Equal Brand, T & B: Flush Type Door with Doorknob or Approved Equal Brand",
      finishing:
        "Exterior walls – Industrial finished, Exterior Front Wall - Painted finished (Boysen Paints or Approved Equal Brand), Interior Perimeter Wall – Industrial finished, Movable Kitchen working table with single stainless sink",
      toilet: "T & B: Ceramic floor tiles, Water Closet: Water Closet with Flush Tank – HCG or Approved Equal Brand",
      plumbing:
        "Faucet for kitchen, T & B, and Service Area, Sanitary lines – Emerald PVC or Approved Equal Brand, Water lines – PPR Lamco pipes or Approved Equal Brand",
      electrical:
        "Lighting Fixtures – Royu or Approved Equal Brand, Convenience outlet – Royu or Approved Equal Brand, Wiring – Phelps Dodge or Approved Brand",
      garage: "Provision for Carport Slot, Porch (1.00m. x 2.00m.) with concrete floor finished",
      landscape: "Provision for Plant box, Provision for Landscaping",
      excluded: "Interior & Exterior Ceiling, Partition & Loft, Interior & Exterior painting",
    },
    basePrice: 1800000,
    floorPlanImage: "/queenie-72-floor-plan.jpg",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Queenie/QUEENIE%2072%20COMPLETE%20WITH%20FINISHNG-kNSxVQ6LU7qCvUgcOIqSsTrIXjn9Oo.jpg",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "queenie-72-basic",
        name: "Basic Package",
        seriesName: "Queenie 72",
        description: "Essential features with quality construction at an affordable price point.",
        price: 2060000,
        lotOnlyPrice: 800000,
        houseConstructionPrice: 1260000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Solid concrete floating foundation",
          "Solid concrete walls with industrial finish",
          "Painted front wall finished",
          "Hi-corrugated roofing with insulation, gutter, flushing, and capping",
          "Movable modular kitchen",
          "Jalouplus window",
          "Panel type for exterior door and flush type for interior door",
          "Basic electrical wiring & fixtures",
          "Toilet & bath with flush type water closet, ceramic floor tiles",
          "Provision for Carport Slot",
          "Porch (1.00m. x 2.00m.) with concrete floor finished",
          "Provision for Plant box",
          "Provision for Landscaping",
        ],
        floorPlanImage: "/queenie-72-basic-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Queenie/Queenie%20Basic-KP4MBfbjFwMLL2XW2jr4VaDUraoMyD.jpg",
        floorPlanPdfId: "14GONV1qqnPtBucA8gB8v2VGKYgod3dGj",
        walkthrough: "https://www.youtube.com/embed/0cnS9EAiG7A?si=IxrED1Uyg7HFslgi",
      },
      {
        id: "queenie-72-loft",
        name: "Basic with Loft",
        seriesName: "Queenie 72",
        description: "All basic features plus an additional loft space for extra versatility.",
        price: 2172000,
        lotOnlyPrice: 800000,
        houseConstructionPrice: 1372000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "All Basic Package features",
          "Loft area – using marine plywood for flooring on galvanized tubular joist",
          "Stairs – marine plywood on tubular galvanized iron",
          "Additional loft space (18.50 sqm)",
          "Total floor area: 45.50 sqm",
        ],
        floorPlanImage: "/queenie-72-loft-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Queenie/QUEENIE%2072%20BASIC%20WITH%20LOFT-szGDKN6YShCca1bsxetvOX7vhCtkV3.jpg",
        floorPlanPdfId: "1LFRi5NkfsD4uE7-nUzuH3RqZ6poyp3QB",
        walkthrough: "https://www.youtube.com/embed/vFasaT5Bqzc?si=REeFL_1Ro7ohpXQC",
      },
      {
        id: "queenie-72-complete",
        name: "Complete without Finishing",
        seriesName: "Queenie 72",
        description: "Fully built home with all structural elements, ready for your personal finishing touches.",
        price: 2294000,
        lotOnlyPrice: 800000,
        houseConstructionPrice: 1494000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "All Basic with Loft Package features",
          "Partition wall - using metal furring with ordinary plywood both sides",
          "Exterior and interior ceiling",
          "Complete storm drain system",
          "Complete electrical wiring & fixtures",
        ],
        floorPlanImage: "/queenie-72-complete-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Queenie/QUEENIE%2072%20COMPLETE%20WITHOUT%20FINISHING-t0pLPqBnu1sEEAE84YDP4dzg3n0oH0.jpg",
        floorPlanPdfId: "163NXz5QOHwPjLgXKDQGBHH-lQgfFeJBG",
        walkthrough: "https://www.youtube.com/embed/cQVIPGIqDSY?si=Vsr5f47mEsycvHhB",
      },
      {
        id: "queenie-72-complete-finished",
        name: "Complete with Finishing",
        seriesName: "Queenie 72",
        description: "Move-in ready home with premium finishes and fixtures throughout.",
        price: 2403000,
        lotOnlyPrice: 800000,
        houseConstructionPrice: 1603000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Fully Constructed",
        isRFO: false,
        features: [
          "All Complete Package features",
          "Flooring vinyl tiles",
          "Painted exterior and interior wall",
          "Painted ceiling",
          "Complete storm drain system",
        ],
        floorPlanImage: "/queenie-72-complete-finished-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Queenie/QUEENIE%2072%20COMPLETE%20WITH%20FINISHNG-kNSxVQ6LU7qCvUgcOIqSsTrIXjn9Oo.jpg",
        floorPlanPdfId: "1YtZUlaht4u067k3aSCwb2frmtZlxBJOA",
        walkthrough: "https://www.youtube.com/embed/qmG0Rzx7cj4?si=s4wmciY3qVz9-6pW",
      },
    ],
  },
  "jade-45": {
    id: "jade-45",
    name: "Jade 45 Series",
    floorArea: "45 sqm",
    loftReady: true,
    description: "A compact inner unit with loft-ready design, perfect for first-time homeowners.",
    longDescription:
      "The Jade 45 Series is a compact yet functional inner unit designed for first-time homeowners. With a loft-ready design, this model maximizes vertical space to provide comfortable living areas. The ground floor features an open layout with provisions for living, dining, and kitchen areas, plus a toilet and bath. The loft area can be utilized as additional bedrooms or living space, with a total floor area of 41 sqm when completed.",
    features: [
      "Loft-ready design",
      "Open layout ground floor",
      "Toilet and bath",
      "Provision for carport",
      "Solid concrete construction",
    ],
    specifications: {
      foundation: "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing",
      walls: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      roofing: "Hi-Corrugated Colored Roofing with C-purlins",
      windows: "Jalouplus window",
      doors: "Panel Type Door with Doorknob for main entrance, Flush Type Door for interior",
      flooring: "Plain cement finished",
      kitchen: "Movable Kitchen working table with single stainless sink",
      bathroom: "Ceramic floor tiles, Water Closet with Flush Tank – HCG or Approved Equal Brand",
      electrical: "Lighting Fixtures – Royu or Approved Equal Brand, Wiring – Phelps Dodge or Approved Brand",
    },
    basePrice: 1400000,
    floorPlanImage: "/jade-45-floor-plan.jpg",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jade%20Series/JADE%2045%20COMPLETE%20WITH%20FINISHING-GbvNMug5f5oMtKt5hAUZ2RTrd1lY6i.jpg",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "jade-45-basic",
        name: "Basic Package",
        seriesName: "Jade 45",
        description: "Essential features with quality construction at an affordable price point.",
        price: 1702000,
        lotOnlyPrice: 600000,
        houseConstructionPrice: 1102000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Solid concrete floating foundation",
          "Solid concrete walls with industrial finish",
          "Painted front wall finished",
          "Hi-corrugated roofing with insulation, gutter, flushing, and capping",
          "Movable modular kitchen",
          "Jalouplus window",
          "Panel type for exterior door and flush type for interior door",
          "Basic electrical wiring & fixtures",
          "Toilet & bath with flush type water closet, ceramic floor tiles",
        ],
        floorPlanImage: "/jade-45-basic-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jade%20Series/JADE%2045%20BASIC%20-4PnHQu5ggGYBsVauuyuRYUhDxtLbJ1.jpg",
        floorPlanPdfId: "11G3flTaGbZgYGVHT1rx40h85WdZc7_K4",
        walkthrough: "https://www.youtube.com/embed/Rfw7Ptxg2kg?si=bSC7CcglsCbb9Uhu",
      },
      {
        id: "jade-45-loft",
        name: "Basic with Loft",
        seriesName: "Jade 45",
        description: "All basic features plus an additional loft space for extra versatility.",
        price: 1735000,
        lotOnlyPrice: 600000,
        houseConstructionPrice: 1135000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "All Basic Package features",
          "Loft area – using marine plywood for flooring on galvanized tubular joist",
          "Stairs – marine plywood on tubular galvanized iron",
          "Additional loft space (17 sqm)",
          "Total floor area: 41 sqm",
        ],
        floorPlanImage: "/jade-45-loft-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jade%20Series/JADE%2045%20BASIC%20WITH%20LOFT-A2YZ8MXO6wpZcuHw5sdHwIhGK2dooV.jpg",
        floorPlanPdfId: "1xttsm9czTKmWiU7O9BhxZxGo34fSWWsw",
        walkthrough: "https://www.youtube.com/embed/tybTwCUgWVc?si=kfqVIA_B5HMU3lhq",
      },
      {
        id: "jade-45-complete",
        name: "Complete without Finishing",
        seriesName: "Jade 45",
        description: "Fully built home with all structural elements, ready for your personal finishing touches.",
        price: 1935000,
        lotOnlyPrice: 600000,
        houseConstructionPrice: 1335000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "All Basic with Loft Package features",
          "Partition wall - using metal furring with ordinary plywood both sides",
          "Exterior and interior ceiling",
          "Complete storm drain system",
          "Complete electrical wiring & fixtures",
        ],
        floorPlanImage: "/jade-45-complete-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jade%20Series/JADE%2045%20COMPLETE%20WITHOUT%20FINISHING-fhbvw4NM7fBUx6r4DnQFeKd7cZAFYg.jpg",
        floorPlanPdfId: "1lHiYRhrxXCzpoV1Chh0EqBBkxswcC5-S",
        walkthrough: "https://www.youtube.com/embed/LnUOhaQgJoE?si=shxY47uxBwz3Weww",
      },
      {
        id: "jade-45-complete-finished",
        name: "Complete with Finishing",
        seriesName: "Jade 45",
        description: "Move-in ready home with premium finishes and fixtures throughout.",
        price: 2040000,
        lotOnlyPrice: 600000,
        houseConstructionPrice: 1440000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Fully Constructed",
        isRFO: false,
        features: [
          "All Complete Package features",
          "Flooring vinyl tiles",
          "Painted exterior and interior wall",
          "Painted ceiling",
          "Complete storm drain system",
        ],
        floorPlanImage: "/jade-45-complete-finished-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jade%20Series/JADE%2045%20COMPLETE%20WITH%20FINISHING-GbvNMug5f5oMtKt5hAUZ2RTrd1lY6i.jpg",
        floorPlanPdfId: "1jNKIOsIyfvqGPF1w6ZtgKyzRmmr_KdkR",
        walkthrough: "https://www.youtube.com/embed/lOOMQBDs4RY?si=15rYqXDKJHNZTict",
      },
    ],
  },
  "jasmine-63": {
    id: "jasmine-63",
    name: "Jasmine 63 Series",
    floorArea: "63 sqm",
    loftReady: true,
    description: "An end unit/roadside home with loft and parking, offering ample space for growing families.",
    longDescription:
      "The Jasmine 63 Series is a spacious end unit/roadside home designed for growing families. This model features a loft design and includes parking space, making it ideal for car owners. The ground floor offers an open layout with provisions for living, dining, and kitchen areas, plus a toilet and bath. The loft area provides additional space for bedrooms or a family area, with a total floor area of 61 sqm (33.50 sqm basic + 27.50 sqm loft).",
    features: [
      "End unit/roadside location",
      "Loft design",
      "Included parking space",
      "Open layout ground floor",
      "Toilet and bath",
      "Solid concrete construction",
    ],
    specifications: {
      foundation: "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing",
      walls: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      roofing: "Hi-Corrugated Colored Roofing with C-purlins",
      windows: "Jalousie window",
      doors: "Panel Type Door with Doorknob for main entrance, Flush Type Door for interior",
      flooring: "Plain cement finished",
      kitchen: "Movable Kitchen working table with single stainless sink",
      bathroom: "Ceramic floor tiles, Water Closet with Flush Tank – HCG or Approved Equal Brand",
      electrical: "Lighting Fixtures – Royu or Approved Equal Brand, Wiring – with Approved Brand",
    },
    basePrice: 2200000,
    floorPlanImage: "/jasmine-63-floor-plan.jpg",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jasmine/JASMINE%2063_Basic%20with%20Loft%20and%20Parking_end%20unit-s2bExKfgvHdgJRTNhaTaqQ6OPSsuml.jpg",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "jasmine-63-loft-inner",
        name: "Jasmine 45 Basic with Loft + Garage",
        seriesName: "Jasmine 63",
        description: "Inner unit with loft and garage space included.",
        price: 1958000,
        lotOnlyPrice: 900000,
        houseConstructionPrice: 1058000,
        location: "Parkview Naga Urban Residence, Blk. 10, Lot 27",
        status: "Fully Constructed",
        isRFO: false,
        features: [
          "Solid concrete floating foundation",
          "Solid concrete walls with industrial finish",
          "Primer white finish front wall",
          "Hi-corrugated roofing with insulation, gutter, flushing, and capping",
          "Movable modular kitchen",
          "Jalousie window",
          "Panel type for exterior door and flush type for interior door",
          "Complete electrical wiring & fixtures",
          "Toilet & bath with flush type water closet, ceramic floor tiles",
          "Loft area – using marine plywood for flooring on galvanized tubular joist",
          "Stairs – marine plywood on tubular galvanized iron",
          "Carport with concrete floor finished",
        ],
        floorPlanImage: "/jasmine-63-loft-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jasmine/JASMINE%2063_Basic%20with%20Loft%20and%20Parking_end%20unit-s2bExKfgvHdgJRTNhaTaqQ6OPSsuml.jpg",
        floorPlanPdfId: "1bpNCQj5jdqTsAuf7tx8duH8WbVCXARTI",
        walkthrough: "https://www.youtube.com/embed/U2AYvwZKsRM?si=nf7FDeYfnn-idG9J",
        lotArea: "45 sqm",
        reservationFee: 25000,
        financingOptions: "Bank/Pag-Ibig Financing",
        downPaymentPercentage: 20,
        downPaymentTerms: "payable in 2 years with 0% interest",
        floorArea: "56.5 sqm",
      },
      {
        id: "jasmine-63-basic-inner",
        name: "Basic (Inner)",
        seriesName: "Jasmine 63",
        description: "Essential features with quality construction at an affordable price point for inner units.",
        price: 1828000,
        lotOnlyPrice: 900000,
        houseConstructionPrice: 928000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Solid concrete floating foundation",
          "Solid concrete walls with industrial finish",
          "Primer white finish front wall",
          "Hi-corrugated roofing with insulation, gutter, flushing, and capping",
          "Movable modular kitchen",
          "Jalousie window",
          "Panel type for exterior door and flush type for interior door",
          "Basic electrical wiring & fixtures",
          "Toilet & bath with flush type water closet, ceramic floor tiles",
        ],
        floorPlanImage: "/jasmine-63-basic-inner-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jasmine/JASMINE%2063_Basic%20with%20Loft%20and%20Parking_end%20unit-s2bExKfgvHdgJRTNhaTaqQ6OPSsuml.jpg",
        floorPlanPdfId: "1234567890abcdef",
        walkthrough: "https://www.youtube.com/embed/U2AYvwZKsRM?si=nf7FDeYfnn-idG9J",
      },
      {
        id: "jasmine-63-loft-end",
        name: "Basic with Loft & Garage (End)",
        seriesName: "Jasmine 63",
        description: "End unit with loft and garage space included.",
        price: 2498000,
        lotOnlyPrice: 900000,
        houseConstructionPrice: 1598000,
        location: "Parkview Naga Urban Residence, Zone 7, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "All Basic Package features",
          "Loft area – using marine plywood for flooring on galvanized tubular joist",
          "Stairs – marine plywood on tubular galvanized iron",
          "Additional loft space (27.50 sqm)",
          "Carport with concrete floor finished",
          "End unit with additional window access",
        ],
        floorPlanImage: "/jasmine-63-loft-end-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Jasmine/JASMINE%2063_Basic%20with%20Loft%20and%20Parking_end%20unit-s2bExKfgvHdgJRTNhaTaqQ6OPSsuml.jpg",
        floorPlanPdfId: "1bpNCQj5jdqTsAuf7tx8duH8WbVCXARTI",
        walkthrough: "https://www.youtube.com/embed/i18oLjbJMnE?si=M_OF79dGjqslFWl_",
      },
    ],
  }, **/
  "thalia-80": {
    id: "thalia-80",
    name: "Thalia 80 Series",
    floorArea: "80 sqm",
    loftReady: false,
    description: "A modern and spacious townhouse with elegant design and premium finishes.",
    longDescription:
      "The Thalia 80 Series offers a perfect blend of elegance and functionality in a spacious 80 square meter townhouse. This model features a contemporary design with premium finishes throughout. The ground floor includes an open-concept living and dining area, a well-appointed kitchen, and a guest bathroom. Upstairs, you'll find three comfortable bedrooms, including a master bedroom with an en-suite bathroom, plus a family bathroom.",
    features: [
      "Contemporary design",
      "Open-concept ground floor",
      "Three bedrooms",
      "Master bedroom with en-suite bathroom",
      "Family bathroom",
      "Well-appointed kitchen",
      "Premium finishes",
    ],
    specifications: {
      foundation: "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing",
      walls: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      roofing: "Pre-painted Roofing sheets, Roof Framing with C – purlins",
      ceiling: "Fiber Cement Board 4.5mm with light metal frames",
      windows: "Aluminum sliding window or Approved Equal Brand",
      doors: "Panel Type Door with Doorknob for main entrance, Flush Type Door for interior",
      flooring: "400x400mm Ceramic floor tiles",
      kitchen: "Built-in kitchen cabinets with granite countertop and stainless sink",
      bathroom: "Ceramic floor and wall tiles, Water Closet with Flush Tank – HCG or Approved Equal Brand",
      electrical: "Lighting Fixtures – Royu or Approved Equal Brand, Wiring – Phildex or Approved Equal Brand",
    },
    basePrice: 3000000,
    floorPlanImage: "/thalia-80-floor-plan.jpg",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Thalia%20Series/ERDC%20-%20THALIA%20Complete%20with%20Garage-Uy9Q3BR7tXMDI9b4CdipoAAJHm5yyC.jpg",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "thalia-80-basic",
        name: "Basic without Garage",
        seriesName: "Thalia 80",
        description: "Standard model without garage, featuring contemporary design and premium finishes.",
        price: 6272395.75,
        lotOnlyPrice: 1586380,
        houseConstructionPrice: 4686015.75,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-concept living area",
          "Three bedrooms",
          "Two bathrooms",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Premium fixtures and finishes",
        ],
        floorPlanImage: "/thalia-80-basic-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Thalia%20Series/Thalia%20Basic-HcLA8o5rJLzE1UpNXs952NSw8O6hcf.jpg",
        floorPlanPdfId: "1zySKIx-UZO6W24v_uSy1mojC5rSZxYPA",
        walkthrough: "https://www.youtube.com/embed/6IpFwXUy52I?si=LnE00k0abEj_vqRA",
      },
      {
        id: "thalia-80-basic-garage",
        name: "Basic with Garage",
        seriesName: "Thalia 80",
        description: "Basic model with car garage.",
        price: 6850342.71,
        lotOnlyPrice: 1586380,
        houseConstructionPrice: 5263962.71,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-concept living area",
          "Three bedrooms",
          "Two bathrooms",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Premium fixtures and finishes",
          "Car garage",
        ],
        floorPlanImage: "/thalia-80-basic-garage-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Thalia%20Series/Thalia%20Basic%20CG-OaTBNVC8a5RVAVQthreX8VBhokGXGa.jpg",
        floorPlanPdfId: "14DR5Q-0ART8JWz5SE5H9_AVITf0A0M-P",
        walkthrough: "https://www.youtube.com/embed//A7-RmjSnXYw?si=6mwimL4KXkP_Bvk0",
      },
      {
        id: "thalia-80-complete",
        name: "Complete without Garage",
        seriesName: "Thalia 80",
        description: "Complete model without garage, featuring premium finishes and additional features.",
        price: 7329015.71,
        lotOnlyPrice: 1586380,
        houseConstructionPrice: 5742635.71,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-concept living area",
          "Three bedrooms",
          "Two bathrooms with premium fixtures",
          "Gourmet kitchen with granite countertops and premium appliances",
          "Premium ceramic tile flooring",
          "Upgraded fixtures and finishes throughout",
          "Built-in wardrobes in bedrooms",
        ],
        floorPlanImage: "/thalia-80-complete-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Thalia%20Series/Thalia%20complete-5uM6Nr5LTL7lrb4SE8ae3mNiWh0ZFi.jpg",
        floorPlanPdfId: "1DjEltSnDau18PHXTWPccQXs4VWEEv6nA",
        walkthrough: "https://www.youtube.com/embed/5h6jFO3Pjhs?si=WBChUH9Vw6-ZCihv",
      },
      {
        id: "thalia-80-complete-garage",
        name: "Complete with Garage",
        seriesName: "Thalia 80",
        description: "Complete model with car garage and premium finishes.",
        price: 7916727.42,
        lotOnlyPrice: 1586380,
        houseConstructionPrice: 6320347.42,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-concept living area",
          "Three bedrooms",
          "Two bathrooms with premium fixtures",
          "Gourmet kitchen with granite countertops and premium appliances",
          "Premium ceramic tile flooring",
          "Upgraded fixtures and finishes throughout",
          "Built-in wardrobes in bedrooms",
          "Car garage",
        ],
        floorPlanImage: "/thalia-80-complete-garage-floor-plan.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Thalia%20Series/Thalia%20complete%20cg-9o9xvu2wshCPmxRp2QKZyx4h8QDz48.jpg",
        floorPlanPdfId: "1u6Fvjx5z_FRuCDyo20gwsRPWIX-srLk6",
        walkthrough: "https://www.youtube.com/embed/E4h4BR16Xk8?si=6OR_zIK4cn2Z7dIE",
      },
    ],
  },
  "chloe-72": {
    id: "chloe-72",
    name: "Chloe 72 Series",
    floorArea: "72 sqm",
    loftReady: false,
    description: "A modern townhouse with spacious interiors and contemporary design elements.",
    longDescription:
      "The Chloe 72 Series is a modern townhouse that combines style and functionality. With 72 square meters of thoughtfully designed space, this model offers comfortable living for families. The ground floor features an open concept living, dining, and kitchen area, while the upper floor houses three bedrooms and two bathrooms. Contemporary design elements and quality finishes make this series an attractive option for homeowners seeking modern living spaces.",
    features: [
      "Open concept ground floor",
      "Three bedrooms",
      "Two bathrooms",
      "Modern kitchen",
      "Quality finishes throughout",
      "Contemporary design elements",
    ],
    specifications: {
      foundation: "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing",
      walls: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      roofing: "Pre-painted Roofing sheets, Roof Framing with C – purlins",
      ceiling: "Fiber Cement Board 4.5mm with light metal frames",
      windows: "Aluminum sliding window or Approved Equal Brand",
      doors: "Panel Type Door with Doorknob for main entrance, Flush Type Door for interior",
      flooring: "400x400mm Ceramic floor tiles",
      kitchen: "Built-in kitchen cabinets with granite countertop and stainless sink",
      bathroom: "Ceramic floor and wall tiles, Water Closet with Flush Tank – HCG or Approved Equal Brand",
      electrical: "Lighting Fixtures – Royu or Approved Equal Brand, Wiring – Phildex or Approved Equal Brand",
    },
    basePrice: 2800000,
    floorPlanImage:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chloe/Chloe%2072%20Basic%20Package%20%2B%20Home%20Improvement-W0SohncwBYwWHJZTNtxGz9M8Q9vD1R.jpg",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chloe/Chloe%2072%20Basic%20Package%20%2B%20Home%20Improvement-W0SohncwBYwWHJZTNtxGz9M8Q9vD1R.jpg",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "chloe-72-basic",
        name: "Basic",
        seriesName: "Chloe 72",
        description: "Standard model with quality finishes and modern design.",
        price: 3156037.99,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 1648593.99,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open concept living area",
          "Three bedrooms",
          "Two bathrooms",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Chloe+72+Basic+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chloe/Chloe%2072%20Basic%20Package%20-PZtCtAU6mg4JMmJhTQzcJAPBe5iuZu.jpg",
        floorPlanPdfId: "1mVAj2r0jDOrqU3lmNwc5K8YRWQK2eaqP",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "chloe-72-basic-ext-cr",
        name: "Basic + Ext CR",
        seriesName: "Chloe 72",
        description: "Basic model with extended comfort room.",
        price: 3545810,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 2038366,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open concept living area",
          "Three bedrooms",
          "Two bathrooms with extended comfort room",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Chloe+72+Basic+Ext+CR+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chloe/Chloe%2072%20Basic%20Package%20-PZtCtAU6mg4JMmJhTQzcJAPBe5iuZu.jpg",
        floorPlanPdfId: "1rnOHrWkT70UE25ShCibwnoYxHpdEfaEM",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "chloe-72-basic-cg",
        name: "Basic + CG",
        seriesName: "Chloe 72",
        description: "Basic model with car garage.",
        price: 3945820.02,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 2438376.02,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open concept living area",
          "Three bedrooms",
          "Two bathrooms",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
          "Car garage",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Chloe+72+Basic+CG+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chloe/Chloe%2072%20Basic%20Package%20%2B%20Home%20Improvement-W0SohncwBYwWHJZTNtxGz9M8Q9vD1R.jpg",
        floorPlanPdfId: "1rnOHrWkT70UE25ShCibwnoYxHpdEfaEM",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "chloe-72-basic-cg-b",
        name: "Basic + CG w/ B",
        seriesName: "Chloe 72",
        description: "Basic model with car garage with balcony.",
        price: 4066467.44,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 2559023.44,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open concept living area",
          "Three bedrooms",
          "Two bathrooms",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
          "Car garage with balcony",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Chloe+72+Basic+CG+B+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chloe/Chloe%2072%20Basic%20Package%20%2B%20Home%20Improvement-W0SohncwBYwWHJZTNtxGz9M8Q9vD1R.jpg",
        floorPlanPdfId: "1rnOHrWkT70UE25ShCibwnoYxHpdEfaEM",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "chloe-72-basic-ext-cr-cg",
        name: "Basic + Ext CR, CG",
        seriesName: "Chloe 72",
        description: "Basic model with extended comfort room and car garage.",
        price: 4235656.44,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 2728212.44,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open concept living area",
          "Three bedrooms",
          "Two bathrooms with extended comfort room",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
          "Car garage",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Chloe+72+Basic+Ext+CR+CG+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chloe/Chloe%2072%20Basic%20Package%20%2B%20Home%20Improvement-W0SohncwBYwWHJZTNtxGz9M8Q9vD1R.jpg",
        floorPlanPdfId: "1rnOHrWkT70UE25ShCibwnoYxHpdEfaEM",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "chloe-72-basic-ext-cr-cg-b",
        name: "Basic + Ext CR, CG w/ B",
        seriesName: "Chloe 72",
        description: "Basic model with extended comfort room and car garage with balcony.",
        price: 4356303.86,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 2848859.86,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open concept living area",
          "Three bedrooms",
          "Two bathrooms with extended comfort room",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
          "Car garage with balcony",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Chloe+72+Basic+Ext+CR+CG+B+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chloe/Chloe%2072%20Basic%20Package%20%2B%20Home%20Improvement-W0SohncwBYwWHJZTNtxGz9M8Q9vD1R.jpg",
        floorPlanPdfId: "1rnOHrWkT70UE25ShCibwnoYxHpdEfaEM",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
  },
  "cheska-72": {
    id: "cheska-72",
    name: "Cheska 72 Series",
    floorArea: "72 sqm",
    loftReady: false,
    description: "A modern townhouse with elegant design and practical features for comfortable family living.",
    longDescription:
      "The Cheska 72 Series offers a perfect blend of elegance and functionality in a compact 72 square meter townhouse. This model features a contemporary design with quality finishes throughout. The ground floor includes an open-concept living and dining area, a well-appointed kitchen, and a guest bathroom. Upstairs, you'll find comfortable bedrooms and a family bathroom. The thoughtful design incorporates practical features for comfortable family living.",
    features: [
      "Contemporary design",
      "Open-concept ground floor",
      "Multiple bedrooms",
      "Family bathroom",
      "Well-appointed kitchen",
      "Quality finishes",
    ],
    specifications: {
      foundation: "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing",
      walls: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      roofing: "Pre-painted Roofing sheets, Roof Framing with C – purlins",
      ceiling: "Fiber Cement Board 4.5mm with light metal frames",
      windows: "Aluminum sliding window or Approved Equal Brand",
      doors: "Panel Type Door with Doorknob for main entrance, Flush Type Door for interior",
      flooring: "400x400mm Ceramic floor tiles",
      kitchen: "Built-in kitchen cabinets with granite countertop and stainless sink",
      bathroom: "Ceramic floor and wall tiles, Water Closet with Flush Tank – HCG or Approved Equal Brand",
      electrical: "Lighting Fixtures – Royu or Approved Equal Brand, Wiring – Phildex or Approved Equal Brand",
    },
    basePrice: 2625000,
    floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Cheska+72+Floor+Plan",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Cheska/Cheska%2072%20Basic%20Package%20%2B%20Home%20Improvement-DDDezd3UbtfhMZddthr8sJWT2VlTGQ.jpg",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "cheska-72-basic",
        name: "Basic",
        seriesName: "Cheska 72",
        description: "Standard model with contemporary design and quality finishes.",
        price: 3136771.97,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 1629327.97,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-concept living area",
          "Multiple bedrooms",
          "Family bathroom",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Cheska+72+Basic+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Cheska/Cheska%2072%20Basic%2072%20%2B%20h1-5Ryphnn8ljgvO9flKif6kjefZgSFaA.jpg",
        floorPlanPdfId: "1d38CcycJtuiPWuy-77HO59m_wXqrH7Qd",
        walkthrough: "https://www.youtube.com/embed/ZCmAbO_Djdo?si=oCBq7z0cXA0OmyB_",
      },
      {
        id: "cheska-72-basic-hi-1",
        name: "Basic with Hi-1",
        seriesName: "Cheska 72",
        description: "Basic model with Hi-1 upgrade package.",
        price: 3977691.83,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 2470247.83,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-concept living area",
          "Multiple bedrooms",
          "Family bathroom",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
          "Hi-1 upgrade package",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Cheska+72+Basic+Hi1+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Cheska/Cheska%2072%20Basic%20Package%20%2B%20Home%20Improvement-DDDezd3UbtfhMZddthr8sJWT2VlTGQ.jpg",
        floorPlanPdfId: "1VXlvU7oQ0tESNJZNtxpkGmkUbl_XOY7n",
        walkthrough: "https://www.youtube.com/embed/ZCmAbO_Djdo?si=oCBq7z0cXA0OmyB_",
      },
      {
        id: "cheska-72-basic-hi-1-hi-2",
        name: "Basic with Hi-1 and Hi-2",
        seriesName: "Cheska 72",
        description: "Basic model with Hi-1 and Hi-2 upgrade packages.",
        price: 4629876.66,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 3122432.66,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-concept living area",
          "Multiple bedrooms",
          "Family bathroom",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
          "Hi-1 and Hi-2 upgrade packages",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Cheska+72+Basic+Hi1+Hi2+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Cheska/Cheska%2072%20Basic%20Package%20%2B%20Home%20Improvement-DDDezd3UbtfhMZddthr8sJWT2VlTGQ.jpg",
        floorPlanPdfId: "1VXlvU7oQ0tESNJZNtxpkGmkUbl_XOY7n",
        walkthrough: "https://www.youtube.com/embed/ZCmAbO_Djdo?si=oCBq7z0cXA0OmyB_",
      },
      {
        id: "cheska-72-basic-hi1-hi2-hi3",
        name: "Basic with Hi-1, Hi-2, and Hi-3",
        seriesName: "Cheska 72",
        description: "Basic model with Hi-1, Hi-2, and Hi-3 upgrade packages.",
        price: 4696211.80,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 3188767.80,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-concept living area",
          "Multiple bedrooms",
          "Family bathroom",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Quality fixtures and finishes",
          "Hi-1, Hi-2, and Hi-3 upgrade packages",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Cheska+72+Basic+Hi1+Hi2+Hi3+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Cheska/Cheska%2072%20Basic%20Package%20%2B%20Home%20Improvement-DDDezd3UbtfhMZddthr8sJWT2VlTGQ.jpg",
        floorPlanPdfId: "1VXlvU7oQ0tESNJZNtxpkGmkUbl_XOY7n",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
  },
  "cheska-81": {
    id: "cheska-81",
    name: "Cheska 81 Series",
    floorArea: "81 sqm",
    loftReady: false,
    description: "A spacious family-friendly townhouse with flexible living spaces and practical design.",
    longDescription:
      "The Cheska 81 Series is designed with growing families in mind. This 81 square meter townhouse offers flexible living spaces that can adapt to changing family needs. The ground floor features a spacious living and dining area, a well-equipped kitchen, and a guest bathroom. Upstairs, you'll find three comfortable bedrooms and a family bathroom. Practical design elements and durable materials make this series an excellent choice for long-term family living.",
    features: [
      "Flexible living spaces",
      "Three bedrooms",
      "Two bathrooms",
      "Well-equipped kitchen",
      "Durable materials",
      "Family-friendly design",
    ],
    specifications: {
      foundation: "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing",
      walls: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      roofing: "Pre-painted Roofing sheets, Roof Framing with C – purlins",
      ceiling: "Fiber Cement Board 4.5mm with light metal frames",
      windows: "Aluminum sliding window or Approved Equal Brand",
      doors: "Panel Type Door with Doorknob for main entrance, Flush Type Door for interior",
      flooring: "400x400mm Ceramic floor tiles",
      kitchen: "Built-in kitchen cabinets with granite countertop and stainless sink",
      bathroom: "Ceramic floor and wall tiles, Water Closet with Flush Tank – HCG or Approved Equal Brand",
      electrical: "Lighting Fixtures – Royu or Approved Equal Brand, Wiring – Phildex or Approved Equal Brand",
    },
    basePrice: 3112500,
    floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Cheska+81+Floor+Plan",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Cheska/CHESKA%2081%20H23-xchyEMI51GzirXEpZ7MF4nSe5JUBX6.jpg",
    developer: "Aman Engineering",
    developerColor: "#04009D",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "cheska-81-basic",
        name: "Basic",
        seriesName: "Cheska 81",
        description: "Standard model with practical features for family living.",
        price: 3460050.65,
        lotOnlyPrice: 1670249.50,
        houseConstructionPrice: 1789801.15,
        location: "Parkview Naga Urban Residence, Blk. 10, Lot 5",
        status: "Available",
        isRFO: false,
        features: [
          "Spacious living and dining area",
          "Three bedrooms",
          "Two bathrooms",
          "Well-equipped kitchen",
          "Ceramic tile flooring",
          "Durable fixtures and finishes",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Cheska+81+Basic+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Cheska/CHESKA%2081%20BASIC-ivk4690rkHFiwLHtdJHCYRc4Wrijpd.jpg",
        floorPlanPdfId: "1AZE0vQaKhe2ZEekY-1OB5eKTdP3sQaGk",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        lotArea: "81 sqm",
        reservationFee: 25000,
        financingOptions: "Bank/Pag-Ibig Financing",
        downPaymentPercentage: 20,
        downPaymentTerms: "payable in 2 years with 0% interest",
        floorArea: "33.5 sqm",
      },
      {
        id: "cheska-81-basic-hi-2",
        name: "Basic + Hi-2",
        seriesName: "Cheska 81",
        description: "Basic model with Hi-2 upgrade package.",
        price: 4165134.89,
        lotOnlyPrice: 1670249.50,
        houseConstructionPrice: 2494885.39,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Spacious living and dining area",
          "Three bedrooms",
          "Two bathrooms",
          "Well-equipped kitchen",
          "Ceramic tile flooring",
          "Durable fixtures and finishes",
          "H12 upgrade package",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Cheska+81+Basic+H12+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Cheska/CHESKA%2081%20H23-xchyEMI51GzirXEpZ7MF4nSe5JUBX6.jpg",
        floorPlanPdfId: "1gFrkZTg9BOQ_U6BVvkyEVehP-u_FBSwf",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "cheska-81-basic-hi-2-hi-3",
        name: "Basic + Hi-2 + Hi-3",
        seriesName: "Cheska 81",
        description: "Basic model with Hi1 and Hi2 upgrade packages.",
        price: 4509370.07,
        lotOnlyPrice: 1670249.50,
        houseConstructionPrice: 2839120.57,
        location: "Parkview Naga Urban Residence, Blk. 10, Lot 3",
        status: "Available",
        isRFO: false,
        features: [
          "Spacious living and dining area",
          "Three bedrooms",
          "Two bathrooms",
          "Well-equipped kitchen",
          "Ceramic tile flooring",
          "Durable fixtures and finishes",
          "H12 and H13 upgrade packages",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Cheska+81+Basic+H12+H13+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Cheska/CHESKA%2081%20H23-xchyEMI51GzirXEpZ7MF4nSe5JUBX6.jpg",
        floorPlanPdfId: "1gFrkZTg9BOQ_U6BVvkyEVehP-u_FBSwf",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        lotArea: "81 sqm",
        reservationFee: 25000,
        financingOptions: "Bank/Pag-Ibig Financing",
        downPaymentPercentage: 20,
        downPaymentTerms: "payable in 2 years with 0% interest",
        floorArea: "66.5 sqm",
      },
    ],
  },
  "chelsea-72": {
    id: "chelsea-72",
    name: "Chelsea 72 Series",
    floorArea: "72 sqm",
    loftReady: false,
    description: "A contemporary townhouse with elegant finishes and efficient use of space.",
    longDescription:
      "The Chelsea 72 Series offers contemporary living in a well-designed 72 square meter townhouse. This model features elegant finishes and an efficient use of space, making it perfect for small families or professionals. The ground floor includes an open-plan living, dining, and kitchen area, plus a guest bathroom. Upstairs, you'll find two spacious bedrooms and a main bathroom. The thoughtful design maximizes natural light and creates a sense of spaciousness throughout.",
    features: [
      "Contemporary design",
      "Elegant finishes",
      "Efficient use of space",
      "Two spacious bedrooms",
      "Two bathrooms",
      "Open-plan living area",
    ],
    specifications: {
      foundation: "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing",
      walls: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      roofing: "Pre-painted Roofing sheets, Roof Framing with C  purlins",
      ceiling: "Fiber Cement Board 4.5mm with light metal frames",
      windows: "Aluminum sliding window or Approved Equal Brand",
      doors: "Panel Type Door with Doorknob for main entrance, Flush Type Door for interior",
      flooring: "400x400mm Ceramic floor tiles",
      kitchen: "Built-in kitchen cabinets with granite countertop and stainless sink",
      bathroom: "Ceramic floor and wall tiles, Water Closet with Flush Tank – HCG or Approved Equal Brand",
      electrical: "Lighting Fixtures – Royu or Approved Equal Brand, Wiring – Phildex or Approved Equal Brand",
    },
    basePrice: 2700000,
    floorPlanImage:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Floor_plans/Chelsea%20series/Chelsea%2072%20Basic%20hi-1-Zpq8qsuKeF9AAjGDhgowFQXSSB2Jg5.jpg",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chelsea%20Series/Chelsea%2072%20Basic%20%2B%20hi-1-bn5Q0n6gfohW0QSng60u8aPvi1KEaL.jpg",
    developer: "Aman Engineering",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "chelsea-72-basic-hi-1",
        name: "Basic + Hi-1",
        seriesName: "Chelsea 72",
        description: "Basic model with Hi-1 upgrade package.",
        price: 3793182.73,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 2285738.73,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-plan living area",
          "Two spacious bedrooms",
          "Two bathrooms",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Elegant fixtures and finishes",
          "Hi-1 upgrade package",
        ],
        floorPlanImage:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Floor_plans/Chelsea%20series/Chelsea%2072%20Basic%20hi-1-Zpq8qsuKeF9AAjGDhgowFQXSSB2Jg5.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chelsea%20Series/Chelsea%2072%20Basic%20%2B%20hi-1-bn5Q0n6gfohW0QSng60u8aPvi1KEaL.jpg",
        floorPlanPdfId: "1U_F8qaeGCMYjukTvlU3Fgvj2cQNO0yW5",
        walkthrough: "https://www.youtube.com/embed/ZCmAbO_Djdo?si=AR8ciSZC816nH3PA",
      },
      {
        id: "chelsea-72-basic-hi-1-hi-2-hi-4",
        name: "Basic + Hi-1 + Hi-2 + Hi-4",
        seriesName: "Chelsea 72",
        description: "Basic model with Hi-1, Hi-2, and Hi-4 upgrade packages.",
        price: 4804860.03,
        lotOnlyPrice: 1507444,
        houseConstructionPrice: 3297416.03,
        location: "Parkview Naga Urban Residence, Zone 5, Brgy. San Felipe, Naga City",
        status: "Available",
        isRFO: false,
        features: [
          "Open-plan living area",
          "Two spacious bedrooms",
          "Two bathrooms",
          "Modern kitchen with granite countertops",
          "Ceramic tile flooring",
          "Elegant fixtures and finishes",
          "Hi-1, Hi-2, Hi-4 upgrade packages",
        ],
        floorPlanImage:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Floor_plans/Chelsea%20series/Chelsea%2072%20Basic%20hi-1-Zpq8qsuKeF9AAjGDhgowFQXSSB2Jg5.jpg",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chelsea%20Series/Chelsea%2072%20Basic%20%2B%20hi-1-bn5Q0n6gfohW0QSng60u8aPvi1KEaL.jpg",
        floorPlanPdfId: "1U_F8qaeGCMYjukTvlU3Fgvj2cQNO0yW5",
        walkthrough: "https://www.youtube.com/embed/ZCmAbO_Djdo?si=AR8ciSZC816nH3PA",
      },
    ],
  },
  "chelsea-81": {
    id: "chelsea-81",
    name: "Chelsea 81 Series",
    floorArea: "81 sqm",
    loftReady: false,
    description: "A spacious townhouse with premium features and elegant design elements.",
    longDescription:
      "The Chelsea 81 Series offers generous living space in an elegantly designed 81 square meter townhouse. This model features premium finishes and thoughtful design elements that create a sophisticated yet comfortable home. The ground floor includes a spacious living and dining area, a gourmet kitchen, and a guest bathroom. Upstairs, you'll find three well-appointed bedrooms and a luxurious main bathroom. The thoughtful design incorporates ample storage and elegant design elements for sophisticated living.",
    features: [
      "Spacious 81 sqm floor area",
      "Premium features",
      "Elegant design elements",
      "Three well-appointed bedrooms",
      "Two bathrooms",
      "Gourmet kitchen",
    ],
    specifications: {
      foundation: "150mm thick solid concrete floating foundation, 300mm thick solid concrete wall footing",
      walls: "150mm thick solid concrete - firewall, 100mm thick solid concrete - exterior wall",
      roofing: "Pre-painted Roofing sheets, Roof Framing with C – purlins",
      ceiling: "Fiber Cement Board 4.5mm with light metal frames",
      windows: "Aluminum sliding window or Approved Equal Brand",
      doors: "Panel Type Door with Doorknob for main entrance, Flush Type Door for interior",
      flooring: "400x400mm Ceramic floor tiles",
      kitchen: "Built-in kitchen cabinets with granite countertop and stainless sink",
      bathroom: "Ceramic floor and wall tiles, Water Closet with Flush Tank – HCG or Approved Equal Brand",
      electrical: "Lighting Fixtures – Royu or Approved Equal Brand, Wiring – Phildex or Approved Equal Brand",
    },
    basePrice: 3000000,
    floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Chelsea+81+Floor+Plan",
    imageUrl:
      "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chelsea%20Series/Chelsea%2081%20Basic%20%2B%20hi-1-bVfSOtP3wNcKXkb8pdZJFWgU8WjrWi.jpg",
    developer: "Aman Engineering",
    project: "Parkview Naga Urban Residence",
    units: [
      {
        id: "chelsea-81-basic-hi-1",
        name: "Basic + hi-1",
        seriesName: "Chelsea 81",
        description: "Basic model with Hi-1 upgrade package.",
        price: 4186067.23,
        lotOnlyPrice: 1670249.50,
        houseConstructionPrice: 2515817.73,
        location: "Parkview Naga Urban Residence, Blk. 12, Lot 6",
        status: "Available",
        isRFO: false,
        features: [
          "Spacious living and dining area",
          "Three well-appointed bedrooms",
          "Two bathrooms",
          "Gourmet kitchen with granite countertops",
          "Ceramic tile flooring",
          "Premium fixtures and finishes",
          "Hi-1 upgrade package",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Chelsea+81+Basic+Hi-1+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chelsea%20Series/Chelsea%2081%20Basic%20%2B%20hi-1-bVfSOtP3wNcKXkb8pdZJFWgU8WjrWi.jpg",
        floorPlanPdfId: "1AZE0vQaKhe2ZEekY-1OB5eKTdP3sQaGk",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        lotArea: "81 sqm",
        reservationFee: 25000,
        financingOptions: "Bank/Pag-Ibig Financing",
        downPaymentPercentage: 20,
        downPaymentTerms: "payable in 2 years with 0% interest",
        floorArea: "48.0 sqm",
      },
      {
        id: "chelsea-81-basic-hi-1-hi-2-h4",
        name: "Basic + hi-1 + h-2 + h-4",
        seriesName: "Chelsea 81",
        description: "Basic model with Hi-1, Hi-2, and Hi-4 upgrade packages.",
        price: 5678767.15,
        lotOnlyPrice: 1670249.50,
        houseConstructionPrice: 4008517.65,
        location: "Parkview Naga Urban Residence",
        status: "Available",
        isRFO: false,
        features: [
          "Spacious living and dining area",
          "Three well-appointed bedrooms",
          "Two bathrooms",
          "Gourmet kitchen with granite countertops",
          "Ceramic tile flooring",
          "Premium fixtures and finishes",
          "Hi-1, Hi-2, Hi-4 upgrade packages",
        ],
        floorPlanImage: "/placeholder.svg?height=800&width=1200&text=Chelsea+81+Basic+Hi-1+Floor+Plan",
        imageUrl:
          "https://8ybl2ah7tkcii6tt.public.blob.vercel-storage.com/Model_houses_images/Chelsea%20Series/Chelsea%2081%20Basic%20%2B%20hi-1-bVfSOtP3wNcKXkb8pdZJFWgU8WjrWi.jpg",
        floorPlanPdfId: "1gFrkZTg9BOQ_U6BVvkyEVehP-u_FBSwf",
        walkthrough: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        lotArea: "81 sqm",
        reservationFee: 25000,
        financingOptions: "Bank/Pag-Ibig Financing",
        downPaymentPercentage: 20,
        downPaymentTerms: "payable in 2 years with 0% interest",
        floorArea: "48.0 sqm",
      },
    ],
  },
}

// Loan Calculator Types and Data
export type PropertyOption = 'nur_lot_only' | 'nur_house_lot' | 'palm_lot_only' | 'palm_house_lot'

export const propertyOptions: { value: PropertyOption; label: string }[] = [
  { value: 'nur_lot_only', label: 'NUR Lot Only' },
  { value: 'nur_house_lot', label: 'NUR House & Lot' },
  { value: 'palm_lot_only', label: 'Palm Lot Only' },
  { value: 'palm_house_lot', label: 'Palm House & Lot' },
]

export const reservationFees: Record<PropertyOption, number> = {
  nur_lot_only: 10000,
  nur_house_lot: 25000,
  palm_lot_only: 25000,
  palm_house_lot: 50000,
}

export const pagibigMaxLoan: Record<PropertyOption, number | null> = {
  nur_lot_only: 1000000,
  nur_house_lot: 2500000,
  palm_lot_only: 1600000,
  palm_house_lot: 4000000,
}

export const downPaymentOptions = [20, 25, 30, 35, 40, 50]

export const inHouseFactorRates: Record<number, number> = {
  5: 0.0123985688874511,
  10: 0.00984739557925592,
  15: 0.00857422866500172,
}

export const pagibigFactorRates: Record<number, number> = {
  5: 0.0194492616841368,
  10: 0.0112280096866691,
  15: 0.00857422866500172,
  20: 0.00730928202377572,
  25: 0.00659669378315046,
  30: 0.00615717200426394,
}

export const remainingAmountFactorRates: Record<number, number> = {
  1: 0.0872197824600924,
  2: 0.0454556748813859,
  3: 0.0315675374235573,
  4: 0.0246483033588356,
  5: 0.0205165313270512,
}

export const bankFactorRates: Record<number, number> = {
  5: 0.020037949,
  10: 0.0118701769135854,
  15: 0.00927012360002734,
}

export const year2InterestRate = 0.0872197824600924
