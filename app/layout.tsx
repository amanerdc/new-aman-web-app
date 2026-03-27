import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Providers from "./providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aman Group of Companies | Quality Homes in Naga City",
  description:
    "Discover quality model houses and affordable housing options in Parkview Naga Urban Residence. Calculate your home loan with our easy-to-use calculator.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  themeColor: "#ffffff",
}

const MAINTENANCE_MODE = false

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (MAINTENANCE_MODE) {
    return (
      <html lang="en">
        <body className="font-sans antialiased">
          <main className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-2xl text-center space-y-4">
              <h1 className="text-3xl font-bold">Website Temporarily Unavailable</h1>
              <p className="text-muted-foreground text-lg">
                We&apos;re currently working on updates. For any inquries or requests,
                please contact our business development assisstants.
              </p>
            </div>
          </main>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>

        <Analytics />
      </body>
    </html>
  )
}
