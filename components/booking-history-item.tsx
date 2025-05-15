import { format } from "date-fns"
import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BookingHistoryItemProps {
  booking: {
    id: string
    busRoute: string
    from: string
    to: string
    date: string
    passengers: number
    busType: string
    status: string
    paymentStatus: string
    amount: number
    createdAt: string
  }
}

export function BookingHistoryItem({ booking }: BookingHistoryItemProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <div className="flex items-center mb-2">
            <Badge variant="outline" className="mr-2">
              Route {booking.busRoute}
            </Badge>
            <Badge
              variant={
                booking.status === "Completed" ? "outline" : booking.status === "Upcoming" ? "secondary" : "destructive"
              }
            >
              {booking.status}
            </Badge>
          </div>
          <h3 className="font-medium">
            {booking.from} → {booking.to}
          </h3>
        </div>
        <div className="text-right mt-2 sm:mt-0">
          <div className="text-sm text-muted-foreground mb-1">
            Booked on {format(new Date(booking.createdAt), "MMM d, yyyy")}
          </div>
          <div className="font-medium">₹{booking.amount}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-start">
          <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
          <div>
            <div className="font-medium">Date</div>
            <div>{format(new Date(booking.date), "MMMM d, yyyy")}</div>
          </div>
        </div>
        <div className="flex items-start">
          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
          <div>
            <div className="font-medium">Bus Type</div>
            <div>{booking.busType}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="text-muted-foreground">Passengers: </span>
          <span>{booking.passengers}</span>
        </div>

        {booking.status === "Upcoming" && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              View Ticket
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              Cancel
            </Button>
          </div>
        )}

        {booking.status === "Completed" && (
          <Button variant="outline" size="sm">
            Book Again
          </Button>
        )}
      </div>
    </div>
  )
}
