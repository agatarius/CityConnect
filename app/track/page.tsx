"use client"

import { useState, useEffect } from "react"
import { MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BusMap } from "@/components/bus-map"

// Mock data for buses
const MOCK_BUSES = [
  { id: 1, route: "101", from: "Central Station", to: "Tech Park", status: "On Time", type: "AC", eta: "5 min" },
  { id: 2, route: "202", from: "Market Square", to: "University", status: "Delayed", type: "Non-AC", eta: "12 min" },
  { id: 3, route: "303", from: "Riverside", to: "Shopping Mall", status: "On Time", type: "Panoramic", eta: "3 min" },
  { id: 4, route: "404", from: "Airport", to: "Downtown", status: "On Time", type: "AC", eta: "8 min" },
  { id: 5, route: "505", from: "Beach Road", to: "Hill View", status: "Early", type: "Panoramic", eta: "1 min" },
]

export default function TrackPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [nearbyBuses, setNearbyBuses] = useState(MOCK_BUSES)
  const [filteredBuses, setFilteredBuses] = useState(MOCK_BUSES)
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })

  // Simulate getting user location
  useEffect(() => {
    // In a real app, we would use the browser's geolocation API
    setUserLocation({ lat: 12.9716, lng: 77.5946 }) // Example coordinates

    // Simulate updating buses in real-time
    const interval = setInterval(() => {
      setNearbyBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          eta: `${Math.max(1, Math.floor(Math.random() * 15))} min`,
        })),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Filter buses based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredBuses(nearbyBuses)
      return
    }

    const filtered = nearbyBuses.filter(
      (bus) =>
        bus.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.to.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setFilteredBuses(filtered)
  }, [searchQuery, nearbyBuses])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Find Buses</CardTitle>
              <CardDescription>Search by route number or destination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Route or destination..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setUserLocation({ lat: 12.9716, lng: 77.5946 })}
                >
                  <MapPin className="mr-1 h-3 w-3" />
                  Use current location
                </Button>
                <Button variant="outline" size="sm" className="text-xs" onClick={() => setSearchQuery("")}>
                  Clear filters
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Popular Routes</h3>
                <div className="flex flex-wrap gap-2">
                  {["101", "202", "303", "404", "505"].map((route) => (
                    <Badge
                      key={route}
                      variant="outline"
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => setSearchQuery(route)}
                    >
                      {route}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <Tabs defaultValue="map">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">Showing {filteredBuses.length} buses</div>
            </div>

            <TabsContent value="map" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-md">
                    <BusMap buses={filteredBuses} userLocation={userLocation} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="grid gap-4">
                {filteredBuses.length > 0 ? (
                  filteredBuses.map((bus) => (
                    <Card key={bus.id}>
                      <CardContent className="p-0">
                        <div className="flex items-center p-4">
                          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900">
                            <span className="font-bold text-rose-600 dark:text-rose-400">{bus.route}</span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                {bus.from} → {bus.to}
                              </p>
                              <Badge
                                variant={
                                  bus.status === "On Time"
                                    ? "outline"
                                    : bus.status === "Delayed"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {bus.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div>
                                <Badge variant="outline" className="mr-2 bg-background">
                                  {bus.type}
                                </Badge>
                                ETA: {bus.eta}
                              </div>
                              <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                                Track
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="rounded-full bg-muted p-3">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">No buses found</h3>
                      <p className="mt-2 text-center text-sm text-muted-foreground">
                        Try adjusting your search or filters to find what you're looking for.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
