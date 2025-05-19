"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ProfileContextType = {
  profileImage: string | null
  updateProfileImage: (imageUrl: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Load profile image from localStorage on mount
  useEffect(() => {
    const savedProfileImage = localStorage.getItem("userProfileImage")
    if (savedProfileImage) {
      setProfileImage(savedProfileImage)
    }
  }, [])

  // Function to update profile image
  const updateProfileImage = (imageUrl: string) => {
    // Update state
    setProfileImage(imageUrl)

    // Save to localStorage
    localStorage.setItem("userProfileImage", imageUrl)

    // Set a timestamp to avoid cache issues
    localStorage.setItem("profileImageTimestamp", Date.now().toString())

    // Dispatch a custom event to notify other components
    const event = new CustomEvent("profileImageUpdated", { detail: { imageUrl } })
    window.dispatchEvent(event)
  }

  return <ProfileContext.Provider value={{ profileImage, updateProfileImage }}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
