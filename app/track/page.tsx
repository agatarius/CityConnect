"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BusMap } from "@/components/bus-map"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { kolkataAreas, getBusesForArea } from "@/lib/kolkata-bus-data"

export default function TrackPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedBus, setSelectedBus] = useState("")
  const [availableBuses, setAvailableBuses] = useState<string[]>([])
  const [nearbyBuses, setNearbyBuses] = useState<any[]>([])
  const [filteredBuses, setFilteredBuses] = useState<any[]>([])
  const [userLocation, setUserLocation] = useState({ lat: 22.5726, lng: 88.3639 }) // Kolkata coordinates
  const [isLoading, setIsLoading] = useState(false)

  // Update available buses when area changes
  useEffect(() => {
    if (selectedArea) {
      const buses = getBusesForArea(selectedArea)
      setAvailableBuses(buses)
      setSelectedBus("")
    } else {
      setAvailableBuses([])
    }
  }, [selectedArea])

  // Simulate getting user location
  useEffect(() => {
    // In a real app, we would use the browser's geolocation API
    // For demo, we're using Kolkata's coordinates
  }, [])

  // Handle area change
  const handleAreaChange = (value: string) => {
    setSelectedArea(value)
    // Automatically search when area changes
    setTimeout(() => {
      setIsLoading(true)
      // Generate mock data based on selected area
      const mockBuses = generateMockBusData(value, selectedBus)
      setNearbyBuses(mockBuses)
      setFilteredBuses(mockBuses)
      setIsLoading(false)
    }, 1000)
  }

  // Handle bus change
  const handleBusChange = (value: string) => {
    setSelectedBus(value)
    // Automatically search when bus changes
    if (selectedArea) {
      setTimeout(() => {
        setIsLoading(true)
        // Generate mock data based on selected area and bus
        const mockBuses = generateMockBusData(selectedArea, value)
        setNearbyBuses(mockBuses)
        setFilteredBuses(mockBuses)
        setIsLoading(false)
      }, 1000)
    }
  }

  // Handle search
  const handleSearch = () => {
    setIsLoading(true)

    // Simulate API call to fetch buses
    setTimeout(() => {
      // Generate mock data based on selected area and bus
      const mockBuses = generateMockBusData(selectedArea, selectedBus)
      setNearbyBuses(mockBuses)
      setFilteredBuses(mockBuses)
      setIsLoading(false)
    }, 1500)
  }

  // Generate mock bus data based on selection
  const generateMockBusData = (area: string, busNumber: string) => {
    const mockBuses = []

    // If a specific bus is selected, only show that bus
    if (busNumber && busNumber !== "all") {
      const routeInfo = getRouteInfoForBus(busNumber)
      mockBuses.push({
        id: 1,
        route: busNumber,
        from: routeInfo.from,
        to: routeInfo.to,
        status: Math.random() > 0.7 ? "Delayed" : "On Time",
        type: routeInfo.type,
        eta: `${Math.max(1, Math.floor(Math.random() * 15))} min`,
        location: {
          lat: userLocation.lat + (Math.random() * 0.02 - 0.01),
          lng: userLocation.lng + (Math.random() * 0.02 - 0.01),
        },
      })
    }
    // Otherwise show multiple buses for the area
    else if (area) {
      const areaBuses = getBusesForArea(area)

      areaBuses.slice(0, 5).forEach((bus, index) => {
        const routeInfo = getRouteInfoForBus(bus)
        mockBuses.push({
          id: index + 1,
          route: bus,
          from: routeInfo.from,
          to: routeInfo.to,
          status: Math.random() > 0.7 ? "Delayed" : "On Time",
          type: routeInfo.type,
          eta: `${Math.max(1, Math.floor(Math.random() * 15))} min`,
          location: {
            lat: userLocation.lat + (Math.random() * 0.02 - 0.01),
            lng: userLocation.lng + (Math.random() * 0.02 - 0.01),
          },
        })
      })
    }

    return mockBuses
  }

  // Get route info for a bus
  const getRouteInfoForBus = (busNumber: string) => {
    // This would come from a database in a real app
    const busRoutes: Record<string, any> = {
      "KB-16": { from: "Howrah", to: "Salt Lake", type: "AC" },
      "KB-22": { from: "Howrah", to: "Salt Lake", type: "Non-AC" },
      "S-12": { from: "Esplanade", to: "Garia", type: "Non-AC" },
      "AC-20": { from: "Esplanade", to: "Garia", type: "AC" },
      "DN-9": { from: "Dum Dum", to: "Barasat", type: "Non-AC" },
      "DN-15": { from: "Dum Dum", to: "Barasat", type: "AC" },
      "C-7": { from: "Barrackpore", to: "Esplanade", type: "Non-AC" },
      "E-32": { from: "Santragachi", to: "Salt Lake", type: "AC" },
      "L-7": { from: "Behala", to: "Shyambazar", type: "Non-AC" },
      "V-8": { from: "Jadavpur", to: "Barasat", type: "Non-AC" },
      "AC-51": { from: "Airport", to: "Santragachi", type: "AC" },
      "S-5": { from: "Baruipur", to: "Esplanade", type: "Non-AC" },
      "S-6": { from: "Baruipur", to: "Howrah", type: "Non-AC" },
      "S-9": { from: "Garia", to: "Dunlop", type: "Non-AC" },
      "MM-5": { from: "Maidan", to: "Madhyamgram", type: "AC" },
      "VS-5": { from: "VIP Road", to: "Sonarpur", type: "AC" },
    }

    return busRoutes[busNumber] || { from: "Unknown", to: "Unknown", type: "Non-AC" }
  }

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
              <CardTitle>Find Buses in Kolkata</CardTitle>
              <CardDescription>Select area and bus number to track</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Area Selection */}
              <div className="space-y-2">
                <label htmlFor="area-select" className="text-sm font-medium">
                  Select Area
                </label>
                <Select value={selectedArea} onValueChange={handleAreaChange}>
                  <SelectTrigger id="area-select">
                    <SelectValue placeholder="Select an area" />
                  </SelectTrigger>
                  <SelectContent>
                    {kolkataAreas.map((area) => (
                      <SelectItem key={area.value} value={area.value}>
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bus Number Selection */}
              <div className="space-y-2">
                <label htmlFor="bus-select" className="text-sm font-medium">
                  Select Bus Number
                </label>
                <Select
                  value={selectedBus}
                  onValueChange={handleBusChange}
                  disabled={!selectedArea || availableBuses.length === 0}
                >
                  <SelectTrigger id="bus-select">
                    <SelectValue
                      placeholder={
                        !selectedArea
                          ? "Select an area first"
                          : availableBuses.length === 0
                            ? "No buses available"
                            : "Select a bus number"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Buses</SelectItem>
                    {availableBuses.map((bus) => (
                      <SelectItem key={bus} value={bus}>
                        {bus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Filter results..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button className="bg-rose-600 hover:bg-rose-700 w-full" onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Popular Routes</h3>
                <div className="flex flex-wrap gap-2">
                  {["KB-16", "S-12", "DN-9", "C-7", "E-32"].map((route) => (
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
              <div className="text-sm text-muted-foreground">
                {filteredBuses.length > 0 ? `Showing ${filteredBuses.length} buses` : "Select an area to find buses"}
              </div>
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
                        {selectedArea
                          ? "No buses available for the selected criteria. Try a different area or bus number."
                          : "Select an area to find buses in Kolkata."}
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
