// Kolkata areas
export const kolkataAreas = [
  { value: "salt-lake", label: "Salt Lake" },
  { value: "dum-dum", label: "Dum Dum" },
  { value: "howrah", label: "Howrah" },
  { value: "garia", label: "Garia" },
  { value: "barrackpore", label: "Barrackpore" },
  { value: "esplanade", label: "Esplanade" },
  { value: "sealdah", label: "Sealdah" },
  { value: "behala", label: "Behala" },
  { value: "jadavpur", label: "Jadavpur" },
  { value: "barasat", label: "Barasat" },
  { value: "airport", label: "Airport" },
  { value: "santragachi", label: "Santragachi" },
  { value: "shyambazar", label: "Shyambazar" },
  { value: "baruipur", label: "Baruipur" },
  { value: "madhyamgram", label: "Madhyamgram" },
  { value: "sonarpur", label: "Sonarpur" },
]

// Bus routes by area
const busRoutesByArea: Record<string, string[]> = {
  "salt-lake": ["KB-16", "KB-22", "E-32", "VS-5"],
  "dum-dum": ["DN-9", "DN-15", "S-9", "MM-5"],
  howrah: ["KB-16", "KB-22", "S-6", "E-32"],
  garia: ["S-12", "AC-20", "S-9", "VS-5"],
  barrackpore: ["C-7", "DN-9", "MM-5"],
  esplanade: ["S-12", "AC-20", "C-7", "S-5"],
  sealdah: ["S-12", "AC-20", "L-7"],
  behala: ["L-7", "S-6"],
  jadavpur: ["V-8", "S-12", "VS-5"],
  barasat: ["DN-9", "DN-15", "V-8", "MM-5"],
  airport: ["AC-51", "MM-5", "VS-5"],
  santragachi: ["E-32", "AC-51"],
  shyambazar: ["L-7", "S-9", "C-7"],
  baruipur: ["S-5", "S-6"],
  madhyamgram: ["MM-5", "DN-15"],
  sonarpur: ["VS-5", "S-5"],
}

// Get buses for a specific area
export function getBusesForArea(area: string): string[] {
  return busRoutesByArea[area] || []
}

// Get all bus routes
export function getAllBusRoutes(): string[] {
  const allRoutes = new Set<string>()

  Object.values(busRoutesByArea).forEach((routes) => {
    routes.forEach((route) => allRoutes.add(route))
  })

  return Array.from(allRoutes).sort()
}

// Get areas served by a specific bus
export function getAreasForBus(busNumber: string): string[] {
  const areas: string[] = []

  Object.entries(busRoutesByArea).forEach(([area, buses]) => {
    if (buses.includes(busNumber)) {
      areas.push(area)
    }
  })

  return areas
}
