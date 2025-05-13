import Link from "next/link"
import { Bus, Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Bus className="h-6 w-6 text-rose-600" />
              <span className="font-bold">CityConnect</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Smart city bus tracking and booking system. Track buses in real-time, pre-book your journey, and earn
              rewards.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Services</h3>
            <ul className="grid gap-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/track" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Bus Tracking
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Pre-booking
                </Link>
              </li>
              <li>
                <Link href="/payment" className="hover:text-rose-600 dark:hover:text-rose-400">
                  QR Payments
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Reward Points
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="grid gap-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/about" className="hover:text-rose-600 dark:hover:text-rose-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Legal</h3>
            <ul className="grid gap-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/licenses" className="hover:text-rose-600 dark:hover:text-rose-400">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} CityConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
