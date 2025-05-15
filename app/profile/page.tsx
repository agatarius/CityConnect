"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProfileSkeleton } from "@/components/profile-skeleton"
import { useAuth } from "@/lib/auth-context"

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to access this page.</p>
        </div>
      </div>
    )
  }

  // For demo purposes, we'll just show a simple message
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Welcome, {user.name || "User"}!</p>
        </div>

        <div className="bg-muted p-8 rounded-lg text-center">
          <p className="text-lg mb-4">This is a placeholder for the full profile page.</p>
          <p>Your email: {user.email}</p>
        </div>
      </div>
    </div>
  )
}
