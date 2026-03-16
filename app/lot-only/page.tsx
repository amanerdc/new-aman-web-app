import { getLotOnlyProperties } from "@/lib/db"
import LotOnlyClient from "./lot-only-client"

export const revalidate = 0

export const metadata = {
  title: "Lot Only Properties | Aman Group of Companies",
  description: "Browse available lot only properties from Aman Group of Companies",
}

export default async function LotOnlyPage() {
  const lotOnlyProperties = await getLotOnlyProperties()

  return (
    <LotOnlyClient lotOnlyProperties={lotOnlyProperties} />
  )
}
