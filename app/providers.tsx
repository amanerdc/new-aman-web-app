"use client"

import { createBrowserClient } from "@supabase/auth-helpers-nextjs"
import { ReactNode } from "react"

export default function Providers({
  children,
}: {
  children: ReactNode
}) {
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return <>{children}</>
}