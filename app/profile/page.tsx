"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Camera, Edit, Mail, Phone, Calendar, Award, ChevronRight, Save, X, Bell, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProfileSkeleton } from "@/components/profile-skeleton"
import { BookingHistoryItem } from "@/components/booking-history-item"
import { NotificationItem } from "@/components/notification-item"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
// Import the useProfile hook
import { useProfile } from "@/lib/profile-context"

// Add the useProfile hook to the component
export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const { profileImage: contextProfileImage, updateProfileImage } = useProfile()
  const router = useRouter()
  const { toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    joinedDate: "2023-01-15T10:30:00Z",
    ridesCompleted: 32,
    freeRides: 5,
    membershipTier: "Silver",
    preferences: {
      notifications: true,
      emailUpdates: true,
      darkMode: false,
    },
  })

  const [editFormData, setEditFormData] = useState({ ...profileData })
  const [bookings, setBookings] = useState([])
  const [notifications, setNotifications] = useState([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Load profile image from context if available
  useEffect(() => {
    if (contextProfileImage) {
      setPreviewUrl(contextProfileImage)
    }
  }, [contextProfileImage])

  useEffect(() => {
    const savedProfileImage = localStorage.getItem("userProfileImage")
    if (savedProfileImage) {
      setPreviewUrl(savedProfileImage)
    }
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }

    // Simulate fetching user data
    if (isAuthenticated) {
      // In a real app, this would be an API call
      setBookings(mockBookings)
      setNotifications(mockNotifications)
    }
  }, [isLoading, isAuthenticated, router])

  // Mock data for bookings and notifications
  const mockBookings = [
    {
      id: "b1",
      busRoute: "KB-16",
      from: "Howrah",
      to: "Salt Lake",
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
      busRoute: "S-12",
      from: "Esplanade",
      to: "Garia",
      date: "2023-06-20",
      passengers: 2,
      busType: "Panoramic",
      status: "Upcoming",
      paymentStatus: "Paid",
      amount: 60,
      createdAt: "2023-06-12T14:15:00Z",
    },
  ]

  const mockNotifications = [
    {
      id: "n1",
      title: "Bus KB-16 is arriving soon",
      message: "Your bus will arrive at Salt Lake in 5 minutes",
      type: "arrival",
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "n2",
      title: "Booking confirmed",
      message: "Your booking for route S-12 has been confirmed",
      type: "booking",
      isRead: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
  ]

  // Handle file selection for profile photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle preference changes
  const handlePreferenceChange = (name: string, checked: boolean) => {
    setEditFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked,
      },
    }))
  }

  // Save profile changes
  const saveChanges = () => {
    // Create updated profile data
    const updatedProfile = {
      ...editFormData,
    }

    // Update the profile data
    setProfileData(updatedProfile)

    // If there's a new profile picture, update it using the context
    if (previewUrl && previewUrl !== contextProfileImage) {
      updateProfileImage(previewUrl)
    }

    setIsEditing(false)

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditFormData({ ...profileData })
    setPreviewUrl(null)
    setSelectedFile(null)
    setIsEditing(false)
  }

  // Get membership tier details
  const getMembershipDetails = () => {
    const tiers = {
      Regular: {
        color: "bg-gray-100 text-gray-800",
        nextTier: "Silver",
        ridesNeeded: 50 - profileData.ridesCompleted,
      },
      Silver: {
        color: "bg-gray-200 text-gray-800",
        nextTier: "Gold",
        ridesNeeded: 100 - profileData.ridesCompleted,
      },
      Gold: {
        color: "bg-amber-100 text-amber-800",
        nextTier: "Platinum",
        ridesNeeded: 150 - profileData.ridesCompleted,
      },
      Platinum: {
        color: "bg-purple-100 text-purple-800",
        nextTier: null,
        ridesNeeded: 0,
      },
    }

    return tiers[profileData.membershipTier as keyof typeof tiers] || tiers.Regular
  }

  const membershipDetails = getMembershipDetails()
  const progressToNextTier = membershipDetails.ridesNeeded > 0 ? ((profileData.ridesCompleted % 50) / 50) * 100 : 100

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px_1fr]">
          {/* Sidebar */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={previewUrl || "/images/avatar.png"} alt={profileData.name} />
                    <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label
                      htmlFor="profile-photo"
                      className="absolute bottom-0 right-0 rounded-full bg-rose-600 p-1.5 text-white cursor-pointer hover:bg-rose-700"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Upload photo</span>
                      <input
                        id="profile-photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold">{profileData.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{profileData.email}</p>

                <div className="flex items-center justify-center mb-4 gap-2">
                  <Badge className={membershipDetails.color}>{profileData.membershipTier} Member</Badge>
                  {!isEditing && (
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => setIsEditing(true)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Member since {format(new Date(profileData.joinedDate), "MMMM yyyy")}
                </p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#account">
                    <Mail className="mr-2 h-4 w-4" />
                    Account
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#bookings">
                    <Calendar className="mr-2 h-4 w-4" />
                    My Bookings
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#notifications">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#rewards">
                    <Award className="mr-2 h-4 w-4" />
                    Rewards
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </a>
                </Button>
              </div>

              <Separator className="my-4" />

              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  logout()
                  router.push("/")
                }}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Account Tab */}
              <TabsContent value="account" className="pt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1.5">
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Manage your personal details</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={cancelEditing}>
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                        <Button onClick={saveChanges}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={editFormData.name} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={editFormData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" value={editFormData.phone} onChange={handleInputChange} />
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        <div className="flex items-center gap-4">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{profileData.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Member Since</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(profileData.joinedDate), "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Membership & Rewards</CardTitle>
                    <CardDescription>Your membership status and rewards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Membership Tier</h3>
                          <p className="text-sm text-muted-foreground">Based on your ride history</p>
                        </div>
                        <Badge className={membershipDetails.color}>{profileData.membershipTier}</Badge>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Progress to {membershipDetails.nextTier || "Next Reward"}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">
                              {profileData.ridesCompleted} /
                              {profileData.membershipTier === "Regular"
                                ? "50"
                                : profileData.membershipTier === "Silver"
                                  ? "100"
                                  : profileData.membershipTier === "Gold"
                                    ? "150"
                                    : "∞"}{" "}
                              rides
                            </span>
                          </div>
                          <Progress value={progressToNextTier} className="h-2" />
                          {membershipDetails.ridesNeeded > 0 && (
                            <p className="text-sm text-muted-foreground text-center">
                              {membershipDetails.ridesNeeded} more rides until {membershipDetails.nextTier} tier
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Available Free Rides</p>
                          <p className="text-3xl font-bold text-rose-600">{profileData.freeRides}</p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Rides Completed</p>
                          <p className="text-3xl font-bold">{profileData.ridesCompleted}</p>
                        </div>
                      </div>

                      <Button className="w-full bg-rose-600 hover:bg-rose-700">Use a Free Ride</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>View and manage your bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {bookings.length > 0 ? (
                        bookings.map((booking) => <BookingHistoryItem key={booking.id} booking={booking} />)
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            You haven't made any bookings yet. Start by booking a ride.
                          </p>
                          <Button className="bg-rose-600 hover:bg-rose-700" asChild>
                            <a href="/book">Book a Ride</a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  {bookings.length > 0 && (
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Bookings
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage your notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <NotificationItem key={notification.id} notification={notification} />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">No notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            You don't have any notifications at the moment.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  {notifications.length > 0 && (
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Mark All as Read
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your app preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about your bookings and nearby buses
                          </p>
                        </div>
                        <Switch
                          id="notifications"
                          checked={
                            isEditing ? editFormData.preferences.notifications : profileData.preferences.notifications
                          }
                          onCheckedChange={(checked) => {
                            if (isEditing) {
                              handlePreferenceChange("notifications", checked)
                            }
                          }}
                          disabled={!isEditing}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailUpdates">Email Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about promotions and new features
                          </p>
                        </div>
                        <Switch
                          id="emailUpdates"
                          checked={
                            isEditing ? editFormData.preferences.emailUpdates : profileData.preferences.emailUpdates
                          }
                          onCheckedChange={(checked) => {
                            if (isEditing) {
                              handlePreferenceChange("emailUpdates", checked)
                            }
                          }}
                          disabled={!isEditing}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="darkMode">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">Use dark theme for the application</p>
                        </div>
                        <Switch
                          id="darkMode"
                          checked={isEditing ? editFormData.preferences.darkMode : profileData.preferences.darkMode}
                          onCheckedChange={(checked) => {
                            if (isEditing) {
                              handlePreferenceChange("darkMode", checked)
                            }
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isEditing ? (
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" onClick={cancelEditing} className="flex-1">
                          Cancel
                        </Button>
                        <Button onClick={saveChanges} className="flex-1 bg-rose-600 hover:bg-rose-700">
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} className="w-full">
                        Edit Preferences
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>Manage your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <Button variant="outline" className="justify-between w-full">
                        Change Password
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="justify-between w-full">
                        Download My Data
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" className="justify-between w-full">
                        Delete Account
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
