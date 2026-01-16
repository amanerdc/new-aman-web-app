import Link from "next/link"
import { Building2, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container p-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-primary text-primary-foreground font-bold text-xl rounded-md h-10 w-10">
                A
            </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">Aman Group of Companies</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Building quality homes and communities for Bicolano families since 1989.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/properties" className="hover:text-primary transition-colors">
                  Model Houses
                </Link>
              </li>
              <li>
                <Link href="/rfo" className="hover:text-primary transition-colors">
                  Ready for Occupancy
                </Link>
              </li>
              <li>
                <Link href="/lot-only" className="hover:text-primary transition-colors">
                  Lot Only
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-primary transition-colors">
                  Loan Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Aman Corporate Center, Zone 6, San Felipe, Naga City, Camarines Sur, Philippines</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(054) 884-5188</span>
                <span>(Smart) 09296083744</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>frontdesk@enjoyrealty.com</span>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Developer</h3>
            <p className="text-sm text-muted-foreground">
              <Link href="/developers" className="hover:text-primary transition-colors">
                  About Our Developers
                </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              Licensed and accredited real estate developer committed to quality construction and customer satisfaction.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Aman Group of Companies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
