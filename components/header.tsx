"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, Home, Calculator, Building2, ChevronDown, Users, Phone, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }
    
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription?.unsubscribe()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 ml-4">
          <div className="flex items-center justify-center bg-primary text-primary-foreground font-bold text-xl rounded-md h-10 w-10">
              A
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground">Aman Group of Companies</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 mr-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/developers"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Users className="h-4 w-4" />
            Our Developers
          </Link>

          {isMounted && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <Building2 className="h-4 w-4" />
                Properties
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/properties" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Model Houses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/lot-only" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Lot Only
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/rfo" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Ready for Occupancy
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Link
            href="/calculator"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Calculator className="h-4 w-4" />
            Loan Calculator
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            Contact
          </Link>

          {isMounted && isLoggedIn && (
            <Link
              href="/admin"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        {isMounted && (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/properties"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Building2 className="h-5 w-5" />
                Model Houses
              </Link>
              <Link
                href="/lot-only"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <MapPin className="h-5 w-5" />
                Lot Only
              </Link>
              <Link
                href="/rfo"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <CheckCircle className="h-5 w-5" />
                Ready for Occupancy
              </Link>
              <Link
                href="/developers"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Users className="h-5 w-5" />
                Our Developers
              </Link>
              <Link
                href="/calculator"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Calculator className="h-5 w-5" />
                Loan Calculator
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Phone className="h-5 w-5" />
                Contact
              </Link>
              {isMounted && isLoggedIn && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                >
                  Admin
                </Link>
              )}
            </nav>
          </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  )
}
