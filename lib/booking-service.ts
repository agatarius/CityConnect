import { v4 as uuidv4 } from "uuid"

// Mock bookings data
const MOCK_BOOKINGS = [
  {
    id: "b1",
    userId: "u1",
    busRoute: "101",
    from: "Central Station",
    to: "Tech Park",
    date: "2023-06-15",
    passengers: 1,
    busType: "AC",
    status: "Completed",
    paymentStatus: "Paid",
    amount: 20,
    createdAt: "2023-06-10T10:30:00Z",
  },
  {
    id: "b2",
    userId: "u1",
    busRoute: "303",
    from: "Riverside",
    to: "Shopping Mall",
    date: "2023-06-20",
    passengers: 2,
    busType: "Panoramic",
    status: "Upcoming",
    paymentStatus: "Paid",
    amount: 60,
    createdAt: "2023-06-12T14:15:00Z",
  },
]

// Get bookings for a specific user
export async function getUserBookings(userId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return MOCK_BOOKINGS.filter((booking) => booking.userId === userId)
}

// Create a new booking
export async function createBooking(bookingData: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newBooking = {
    id: uuidv4(),
    ...bookingData,
    status: "Upcoming",
    createdAt: new Date().toISOString(),
  }

  MOCK_BOOKINGS.push(newBooking)

  return newBooking
}

// Cancel a booking
export async function cancelBooking(bookingId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const bookingIndex = MOCK_BOOKINGS.findIndex((booking) => booking.id === bookingId)

  if (bookingIndex === -1) {
    throw new Error("Booking not found")
  }

  MOCK_BOOKINGS[bookingIndex] = {
    ...MOCK_BOOKINGS[bookingIndex],
    status: "Cancelled",
  }

  return MOCK_BOOKINGS[bookingIndex]
}
