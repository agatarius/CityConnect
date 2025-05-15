import { v4 as uuidv4 } from "uuid"

// Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    userId: "u1",
    title: "Bus 101 is arriving soon",
    message: "Your bus will arrive at Central Station in 5 minutes",
    type: "arrival",
    isRead: false,
    createdAt: "2023-06-14T09:45:00Z",
  },
  {
    id: "n2",
    userId: "u1",
    title: "Booking confirmed",
    message: "Your booking for route 303 on June 20 has been confirmed",
    type: "booking",
    isRead: true,
    createdAt: "2023-06-12T14:20:00Z",
  },
  {
    id: "n3",
    userId: "u1",
    title: "Free ride available",
    message: "You have a new free ride available. Use it on your next journey!",
    type: "reward",
    isRead: false,
    createdAt: "2023-06-13T16:30:00Z",
  },
]

// Get notifications for a specific user
export async function getUserNotifications(userId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return MOCK_NOTIFICATIONS.filter((notification) => notification.userId === userId).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

// Mark a notification as read
export async function markNotificationAsRead(notificationId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const notificationIndex = MOCK_NOTIFICATIONS.findIndex((notification) => notification.id === notificationId)

  if (notificationIndex === -1) {
    throw new Error("Notification not found")
  }

  MOCK_NOTIFICATIONS[notificationIndex] = {
    ...MOCK_NOTIFICATIONS[notificationIndex],
    isRead: true,
  }

  return MOCK_NOTIFICATIONS[notificationIndex]
}

// Create a new notification
export async function createNotification(data: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const newNotification = {
    id: uuidv4(),
    ...data,
    isRead: false,
    createdAt: new Date().toISOString(),
  }

  MOCK_NOTIFICATIONS.push(newNotification)

  return newNotification
}

// Get nearby bus notifications
export async function getNearbyBusNotifications(userId: string, lat: number, lng: number) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would check for buses near the user's location
  // and generate appropriate notifications

  // For demo purposes, we'll create a random notification
  const busRoutes = ["101", "202", "303", "404", "505"]
  const randomRoute = busRoutes[Math.floor(Math.random() * busRoutes.length)]
  const randomTime = Math.floor(Math.random() * 10) + 1

  const notification = {
    id: uuidv4(),
    userId,
    title: `Bus ${randomRoute} is nearby`,
    message: `Bus ${randomRoute} will arrive in ${randomTime} minutes at your location`,
    type: "nearby",
    isRead: false,
    createdAt: new Date().toISOString(),
  }

  return [notification]
}
