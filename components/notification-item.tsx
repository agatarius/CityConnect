import { formatDistanceToNow } from "date-fns"
import { Bell, Calendar, Check, CreditCard, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationItemProps {
  notification: {
    id: string
    title: string
    message: string
    type: string
    isRead: boolean
    createdAt: string
  }
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "arrival":
        return <MapPin className="h-5 w-5" />
      case "booking":
        return <Calendar className="h-5 w-5" />
      case "payment":
        return <CreditCard className="h-5 w-5" />
      case "reward":
        return <Check className="h-5 w-5" />
      case "nearby":
        return <MapPin className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getIconColor = () => {
    switch (notification.type) {
      case "arrival":
        return "text-green-600 bg-green-100"
      case "booking":
        return "text-blue-600 bg-blue-100"
      case "payment":
        return "text-purple-600 bg-purple-100"
      case "reward":
        return "text-amber-600 bg-amber-100"
      case "nearby":
        return "text-rose-600 bg-rose-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-colors",
        !notification.isRead && "bg-muted/50 border-l-4 border-l-rose-600",
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("rounded-full p-2", getIconColor())}>{getIcon()}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-medium">{notification.title}</h4>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
        </div>
      </div>
    </div>
  )
}
