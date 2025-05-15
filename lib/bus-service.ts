// Mock data for buses
const MOCK_BUSES = [
  {
    id: 1,
    route: "101",
    from: "Central Station",
    to: "Tech Park",
    status: "On Time",
    type: "AC",
    eta: "5 min",
    location: { lat: 12.9716, lng: 77.5946 },
    capacity: 40,
    occupancy: 22,
    nextStop: "Market Square",
    nextStopTime: "10:15 AM",
  },
  {
    id: 2,
    route: "202",
    from: "Market Square",
    to: "University",
    status: "Delayed",
    type: "Non-AC",
    eta: "12 min",
    location: { lat: 12.9815, lng: 77.6089 },
    capacity: 35,
    occupancy: 30,
    nextStop: "City Hospital",
    nextStopTime: "10:22 AM",
  },
  {
    id: 3,
    route: "303",
    from: "Riverside",
    to: "Shopping Mall",
    status: "On Time",
    type: "Panoramic",
    eta: "3 min",
    location: { lat: 12.9552, lng: 77.6245 },
    capacity: 30,
    occupancy: 15,
    nextStop: "Central Park",
    nextStopTime: "10:08 AM",
  },
  {
    id: 4,
    route: "404",
    from: "Airport",
    to: "Downtown",
    status: "On Time",
    type: "AC",
    eta: "8 min",
    location: { lat: 12.9352, lng: 77.6245 },
    capacity: 40,
    occupancy: 35,
    nextStop: "Business District",
    nextStopTime: "10:18 AM",
  },
  {
    id: 5,
    route: "505",
    from: "Beach Road",
    to: "Hill View",
    status: "Early",
    type: "Panoramic",
    eta: "1 min",
    location: { lat: 12.9452, lng: 77.6145 },
    capacity: 30,
    occupancy: 10,
    nextStop: "Sunset Point",
    nextStopTime: "10:05 AM",
  },
]

// Get all buses or filter by route
export async function getBuses(route?: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (route) {
    return MOCK_BUSES.filter((bus) => bus.route === route)
  }

  return MOCK_BUSES
}

// Get buses near a specific location
export async function getNearbyBuses(lat: number, lng: number, radius = 5) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would use geospatial queries
  // For demo, we'll just return all buses with a simulated distance
  return MOCK_BUSES.map((bus) => {
    // Calculate a fake distance based on coordinates
    const distance = Math.sqrt(Math.pow(bus.location.lat - lat, 2) + Math.pow(bus.location.lng - lng, 2)) * 111 // Rough conversion to km

    return {
      ...bus,
      distance: Number.parseFloat(distance.toFixed(1)),
      isNearby: distance < radius,
    }
  }).sort((a, b) => a.distance - b.distance)
}

// Get details for a specific bus
export async function getBusDetails(id: number) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const bus = MOCK_BUSES.find((bus) => bus.id === id)

  if (!bus) {
    throw new Error("Bus not found")
  }

  return bus
}
