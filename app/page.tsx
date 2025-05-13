import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Bus, CreditCard, MapPin, Shield, Star, Timer } from "lucide-react"

import { Button } from "@/components/ui/button"

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
                  Smart city bus tracking and booking system. Track buses in real-time, pre-book your journey, and earn
                  rewards.
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
              <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl shadow-xl">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="City bus on a street"
                  width={800}
                  height={500}
                  className="object-cover"
                  priority
                />
              </div>
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
                Smart Features for Smart Travel
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Experience the future of public transportation with our innovative features.
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
                Track your bus in real-time and never miss a ride again.
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
                Choose from AC, non-AC, and our unique transparent viewing buses.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                <Timer className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold">Pre-booking</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Reserve your seat in advance and travel stress-free.
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

      {/* Bus Types Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Perfect Ride</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We offer a variety of bus types to suit your needs and preferences.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Standard Non-AC Bus"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">Standard Non-AC</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Economical and efficient for short city commutes.
                </p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Starting from</span>
                  <span className="text-lg font-bold text-rose-600 dark:text-rose-400">₹10</span>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Premium AC Bus"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">Premium AC</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Comfortable air-conditioned travel for a refreshing journey.
                </p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Starting from</span>
                  <span className="text-lg font-bold text-rose-600 dark:text-rose-400">₹20</span>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Panoramic View Bus"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">Panoramic View</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Transparent roof and large windows for sightseeing enthusiasts.
                </p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Starting from</span>
                  <span className="text-lg font-bold text-rose-600 dark:text-rose-400">₹30</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/bus-types">
              <Button variant="outline" size="lg">
                Learn More About Our Buses
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
                Ready to Transform Your Commute?
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
