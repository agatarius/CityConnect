"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Navigation } from "lucide-react"

interface BusMapProps {
  buses: Array<{
    id: number
    route: string
    from: string
    to: string
    status: string
    type: string
    eta: string
    location?: {
      lat: number
      lng: number
    }
  }>
  userLocation: {
    lat: number
    lng: number
  }
}

export function BusMap({ buses, userLocation }: BusMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // This is a simplified map visualization for demo purposes
  // In a real app, you would integrate with Google Maps, Mapbox, or another mapping service
  useEffect(() => {
    if (!mapRef.current) return

    const canvas = document.createElement("canvas")
    canvas.width = mapRef.current.clientWidth
    canvas.height = mapRef.current.clientHeight
    mapRef.current.innerHTML = ""
    mapRef.current.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw a simple map background
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw some roads (simplified Kolkata map)
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 3

    // Horizontal roads (East-West)
    for (let i = 1; i < 5; i++) {
      const y = (canvas.height / 5) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical roads (North-South)
    for (let i = 1; i < 5; i++) {
      const x = (canvas.width / 5) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Draw Hooghly River (simplified)
    ctx.fillStyle = "#93c5fd"
    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.2, 0)
    ctx.quadraticCurveTo(canvas.width * 0.25, canvas.height * 0.5, canvas.width * 0.2, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.lineTo(0, 0)
    ctx.closePath()
    ctx.fill()

    // Draw user location
    const userX = canvas.width / 2
    const userY = canvas.height / 2

    ctx.fillStyle = "#3b82f6"
    ctx.beginPath()
    ctx.arc(userX, userY, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#1e40af"
    ctx.beginPath()
    ctx.arc(userX, userY, 4, 0, Math.PI * 2)
    ctx.fill()

    // Draw buses
    buses.forEach((bus, index) => {
      // Calculate position (in a real app, this would be based on GPS coordinates)
      const angle = (index / buses.length) * Math.PI * 2
      const distance = 100 + Math.random() * 50
      const x = userX + Math.cos(angle) * distance
      const y = userY + Math.sin(angle) * distance

      // Bus marker
      ctx.fillStyle = bus.type === "AC" ? "#ec4899" : bus.type === "Panoramic" ? "#8b5cf6" : "#f59e0b"

      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()

      // Bus route number
      ctx.fillStyle = "#000000"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(bus.route, x, y - 10)
    })

    // Add some Kolkata landmarks (simplified)
    const landmarks = [
      { name: "Howrah Bridge", x: canvas.width * 0.25, y: canvas.height * 0.3 },
      { name: "Victoria Memorial", x: canvas.width * 0.4, y: canvas.height * 0.6 },
      { name: "Salt Lake Stadium", x: canvas.width * 0.7, y: canvas.height * 0.4 },
      { name: "Science City", x: canvas.width * 0.6, y: canvas.height * 0.7 },
    ]

    landmarks.forEach((landmark) => {
      // Landmark marker
      ctx.fillStyle = "#4b5563"
      ctx.beginPath()
      ctx.arc(landmark.x, landmark.y, 4, 0, Math.PI * 2)
      ctx.fill()

      // Landmark name
      ctx.fillStyle = "#4b5563"
      ctx.font = "8px Arial"
      ctx.textAlign = "center"
      ctx.fillText(landmark.name, landmark.x, landmark.y - 8)
    })

    setIsMapLoaded(true)
  }, [buses, userLocation])

  return (
    <div className="relative w-full h-full min-h-[400px] bg-muted">
      <div ref={mapRef} className="absolute inset-0"></div>

      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="bg-background rounded-full p-2 shadow-md hover:bg-muted transition-colors">
          <Navigation className="h-5 w-5 text-rose-600" />
        </button>
        <button className="bg-background rounded-full p-2 shadow-md hover:bg-muted transition-colors">
          <MapPin className="h-5 w-5 text-rose-600" />
        </button>
      </div>

      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded-md shadow-md text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-[#ec4899]"></div>
          <span>AC Bus</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
          <span>Non-AC Bus</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
          <span>Premium Bus</span>
        </div>
      </div>
    </div>
  )
}
