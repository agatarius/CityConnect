import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Bus, CreditCard, MapPin, Shield, Star, Timer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HomeCarousel } from "@/components/home-carousel"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  CityConnect
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Track buses across Kolkata in real-time, pre-book your journey, and travel smarter with our city bus
                  tracking system.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/track">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                    Track Buses <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book">
                  <Button size="lg" variant="outline">
                    Book a Ride
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <HomeCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Smart Features for Kolkata Commuters
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Experience the future of public transportation in the City of Joy.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                <MapPin className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold">Real-Time Tracking</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Track your bus in real-time across all major Kolkata routes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                <CreditCard className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold">QR Code Payments</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Scan and pay with ease. No more worries about loose change.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                <Bus className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold">Premium Bus Options</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Choose from AC, non-AC, and premium buses across Kolkata.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                <Timer className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold">Pre-booking</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Reserve your seat in advance for popular routes like Howrah to Salt Lake.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                <Star className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold">Reward Points</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Get 10 free rides when you start and 5 more after every 50 rides.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                <Shield className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold">Trusted Service</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Reliable public transport with transparent pricing and tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Popular Kolkata Routes</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover the most frequently traveled bus routes in Kolkata.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/images/dumdum-to-barasat-route.jpeg"
                  alt="Howrah to Salt Lake Route"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">Howrah to Salt Lake</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Popular route connecting Howrah Station to Salt Lake Sector V tech hub.
                </p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Bus Numbers</span>
                  <span className="text-lg font-bold text-rose-600 dark:text-rose-400">KB-16, KB-22</span>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/images/esplanade-to-garia-route.jpeg"
                  alt="Esplanade to Garia Route"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">Esplanade to Garia</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Connecting central Kolkata to southern residential areas.
                </p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Bus Numbers</span>
                  <span className="text-lg font-bold text-rose-600 dark:text-rose-400">S-12, AC-20</span>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/images/dumdum-to-barasat-route.jpeg"
                  alt="Dum Dum to Barasat Route"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">Dum Dum to Barasat</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Connecting North Kolkata to the northern suburbs.
                </p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Bus Numbers</span>
                  <span className="text-lg font-bold text-rose-600 dark:text-rose-400">DN-9, DN-15</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/track">
              <Button variant="outline" size="lg">
                Explore All Routes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-600 dark:bg-rose-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Kolkata Commute?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed opacity-90">
                Download our app now and enjoy 10 free rides to get started!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
                Download App
              </Button>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-rose-700">
                  Sign Up Online
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
