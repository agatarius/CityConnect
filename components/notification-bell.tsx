"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NotificationItem } from "@/components/notification-item"
import { useAuth } from "@/lib/auth-context"

export function NotificationBell() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Fetch notifications
  useEffect(() => {
    if (user) {
      // For demo purposes, use mock data instead of API calls
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

      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter((n) => !n.isRead).length)
    }
  }, [user])

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const handleOpen = (open: boolean) => {
    setIsOpen(open)

    // Mark all as read when opening
    if (open && unreadCount > 0) {
      notifications.filter((n) => !n.isRead).forEach((n) => markAsRead(n.id))
    }
  }

  if (!user) {
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className="p-4">
                  <NotificationItem notification={notification} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          )}
        </div>
        {notifications.length > 0 && (
          <div className="p-4 border-t">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/profile?tab=notifications">View All</a>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
