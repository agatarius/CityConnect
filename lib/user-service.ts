// Mock user data
const MOCK_USERS = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password", // In a real app, this would be properly hashed
    phone: "123-456-7890",
    address: "123 Main St, City",
    ridesCompleted: 32,
    freeRides: 5,
    joinedAt: "2023-01-15T10:30:00Z",
    preferences: {
      notifications: true,
      emailUpdates: true,
      preferredBusType: "AC",
    },
  },
]

// Verify user password (mock implementation)
export async function verifyPassword(email: string, password: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would properly hash and compare passwords
  const user = MOCK_USERS.find((user) => user.email === email)

  if (!user) {
    return null
  }

  // This is just for demo purposes - in a real app, use proper password comparison
  if (password === "password123") {
    return user
  }

  return null
}

// Get user profile
export async function getUserProfile(userId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = MOCK_USERS.find((user) => user.id === userId)

  if (!user) {
    throw new Error("User not found")
  }

  // Don't return sensitive information
  const { password, ...profile } = user

  return profile
}

// Update user profile
export async function updateUserProfile(userId: string, data: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const userIndex = MOCK_USERS.findIndex((user) => user.id === userId)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  // Update user data
  MOCK_USERS[userIndex] = {
    ...MOCK_USERS[userIndex],
    ...data,
    // Don't allow updating sensitive fields directly
    id: MOCK_USERS[userIndex].id,
    password: MOCK_USERS[userIndex].password,
  }

  // Don't return sensitive information
  const { password, ...profile } = MOCK_USERS[userIndex]

  return profile
}
