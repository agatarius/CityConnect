import { NextResponse } from "next/server"
import { getBuses, getNearbyBuses } from "@/lib/bus-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const route = searchParams.get("route")

  try {
    // If lat and lng are provided, get nearby buses
    if (lat && lng) {
      const buses = await getNearbyBuses(Number.parseFloat(lat), Number.parseFloat(lng))
      return NextResponse.json({ buses })
    }

    // Otherwise get all buses or filter by route
    const buses = await getBuses(route || undefined)
    return NextResponse.json({ buses })
  } catch (error) {
    console.error("Error fetching buses:", error)
    return NextResponse.json({ error: "Failed to fetch buses" }, { status: 500 })
  }
}
