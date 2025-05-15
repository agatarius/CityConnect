import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { NearbyBusAlert } from "@/components/nearby-bus-alert"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CityConnect - Smart Bus Tracking & Booking",
  description: "Track city buses across Kolkata in real-time, pre-book your journey, and earn rewards.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <NearbyBusAlert />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
