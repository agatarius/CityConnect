import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BusTypesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Our Bus Fleet</h1>
          <p className="text-muted-foreground">Choose the perfect bus for your journey</p>
        </div>

        <Tabs defaultValue="standard" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="standard">Standard Non-AC</TabsTrigger>
            <TabsTrigger value="ac">Premium AC</TabsTrigger>
            <TabsTrigger value="panoramic">Panoramic View</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="pt-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl font-bold mb-4">Standard Non-AC Bus</h2>
                <p className="text-muted-foreground mb-6">
                  Our standard non-AC buses are perfect for short city commutes. Economical and efficient, these buses
                  provide a comfortable journey for your daily travel needs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Economical fares starting at just ₹10</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Frequent service with minimal waiting time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Comfortable seating for short journeys</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>USB charging ports available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Wheelchair accessible</span>
                  </li>
                </ul>
                <Link href="/book">
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/panoramic-view-bus.png"
                    alt="Standard Non-AC Bus"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ac" className="pt-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl font-bold mb-4">Premium AC Bus</h2>
                <p className="text-muted-foreground mb-6">
                  Our premium air-conditioned buses provide a comfortable and refreshing journey, perfect for longer
                  commutes or hot summer days.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Cool air-conditioned environment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Plush seating with extra legroom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>USB charging ports at every seat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Free Wi-Fi connectivity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Digital route display and announcements</span>
                  </li>
                </ul>
                <Link href="/book">
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/premium-ac-bus.png"
                    alt="Premium AC Bus"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="panoramic" className="pt-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl font-bold mb-4">Panoramic View Bus</h2>
                <p className="text-muted-foreground mb-6">
                  Experience the city like never before with our unique panoramic view buses. With transparent roofs and
                  large windows, these buses are perfect for sightseeing and tourism.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Transparent roof for unobstructed sky views</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Large panoramic windows for sightseeing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Audio guide for tourist routes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Comfortable reclining seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600" />
                    <span>Air-conditioned for maximum comfort</span>
                  </li>
                </ul>
                <Link href="/book">
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/standard-non-ac-bus.png"
                    alt="Panoramic View Bus"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Fare Comparison</CardTitle>
              <CardDescription>Compare prices across bus types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Standard Non-AC</div>
                  <div>₹10 per person</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Premium AC</div>
                  <div>₹20 per person</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Panoramic View</div>
                  <div>₹30 per person</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Booking Fee</div>
                  <div>₹5 (all types)</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/book" className="w-full">
                <Button variant="outline" className="w-full">
                  View Detailed Pricing
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>Features available in each bus type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div></div>
                  <div className="font-medium text-center">Standard</div>
                  <div className="font-medium text-center">AC</div>
                  <div className="font-medium text-center">Panoramic</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>Wi-Fi</div>
                  <div className="text-center">❌</div>
                  <div className="text-center">✅</div>
                  <div className="text-center">✅</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>USB Charging</div>
                  <div className="text-center">✅</div>
                  <div className="text-center">✅</div>
                  <div className="text-center">✅</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>Air Conditioning</div>
                  <div className="text-center">❌</div>
                  <div className="text-center">✅</div>
                  <div className="text-center">✅</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>Audio Guide</div>
                  <div className="text-center">❌</div>
                  <div className="text-center">❌</div>
                  <div className="text-center">✅</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/bus-types/amenities" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Amenities
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>Bus type availability by route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">City Center Routes</div>
                  <div>All bus types</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Tourist Routes</div>
                  <div>Panoramic View</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Suburban Routes</div>
                  <div>Standard & AC</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Express Routes</div>
                  <div>Premium AC</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Night Service</div>
                  <div>Premium AC</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/routes" className="w-full">
                <Button variant="outline" className="w-full">
                  View Route Map
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
