"use client"

import { useState, useEffect } from "react"
import { MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function NearbyBusAlert() {
  const { user, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [alerts, setAlerts] = useState<any[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Check for user location and fetch nearby buses
  useEffect(() => {
    if (isAuthenticated && user && pathname !== "/track") {
      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setUserLocation({ lat: latitude, lng: longitude })
          },
          (error) => {
            console.error("Error getting location:", error)
            // Use a default location for demo purposes
            setUserLocation({ lat: 22.5726, lng: 88.3639 }) // Kolkata's coordinates
          },
        )
      } else {
        // Use a default location for demo purposes
        setUserLocation({ lat: 22.5726, lng: 88.3639 }) // Kolkata's coordinates
      }
    }
  }, [isAuthenticated, user, pathname])

  // Fetch nearby buses when user location is available
  useEffect(() => {
    if (userLocation && isAuthenticated && user) {
      checkNearbyBuses()

      // Set up polling for nearby buses
      const interval = setInterval(checkNearbyBuses, 60000)
      return () => clearInterval(interval)
    }
  }, [userLocation, isAuthenticated, user])

  const checkNearbyBuses = async () => {
    if (!userLocation) return

    try {
      // For demo, we'll simulate with a timeout
      setTimeout(() => {
        // Randomly decide whether to show an alert (for demo purposes)
        if (Math.random() > 0.5 || alerts.length === 0) {
          const busRoutes = ["KB-16", "S-12", "DN-9", "AC-20", "VS-5"]
          const randomRoute = busRoutes[Math.floor(Math.random() * busRoutes.length)]
          const randomTime = Math.floor(Math.random() * 10) + 1

          const newAlert = {
            id: Date.now().toString(),
            route: randomRoute,
            time: randomTime,
            timestamp: new Date().toISOString(),
          }

          setAlerts((prev) => [newAlert, ...prev].slice(0, 3))
          setIsVisible(true)

          // Auto-hide after 10 seconds
          setTimeout(() => {
            setIsVisible(false)
          }, 10000)
        }
      }, 2000)
    } catch (error) {
      console.error("Error checking nearby buses:", error)
    }
  }

  const dismissAlert = () => {
    setIsVisible(false)
  }

  if (!isVisible || alerts.length === 0 || !isAuthenticated || !user) {
    return null
  }

  const latestAlert = alerts[0]

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 max-w-sm transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none",
      )}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 flex items-start gap-3">
        <div className="rounded-full bg-rose-100 dark:bg-rose-900 p-2 mt-0.5">
          <MapPin className="h-5 w-5 text-rose-600 dark:text-rose-400" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-sm">Bus {latestAlert.route} is nearby</h4>
            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1" onClick={dismissAlert}>
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Arriving in {latestAlert.time} {latestAlert.time === 1 ? "minute" : "minutes"}
          </p>
          <div className="mt-2 flex gap-2">
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-xs h-8" asChild>
              <a href="/track">Track Now</a>
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-8" asChild>
              <a href="/book">Book Seat</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
