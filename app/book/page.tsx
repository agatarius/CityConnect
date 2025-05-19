"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { BusSelector } from "@/components/bus-selector"

// Updated locations specific to Kolkata
const locations = [
  { value: "salt-lake", label: "Salt Lake" },
  { value: "new-town", label: "New Town" },
  { value: "techno-india", label: "Techno India University" },
  { value: "karunamoyee", label: "Karunamoyee" },
  { value: "dum-dum", label: "Dum Dum" },
  { value: "howrah", label: "Howrah" },
  { value: "gariaghat", label: "GariaGhat" },
  { value: "city-centre", label: "City Centre" },
  { value: "park-street", label: "Park Street" },
  { value: "college-street", label: "College Street" },
  { value: "kumartuli", label: "Kumartuli" },
  { value: "bhawanipur", label: "Bhawanipur" },
  { value: "topsia", label: "Topsia" },
  { value: "rubi", label: "Rubi" },
  { value: "science-city", label: "Science City" },
  { value: "ecopark", label: "Ecopark" },
  { value: "gd-island", label: "GD Island" },
  { value: "dakshineshwar", label: "Dakshineshwar Temple" },
  { value: "hooghly", label: "Hooghly" },
  { value: "kestopur", label: "Kestopur" },
  { value: "chingrighata", label: "Chingrighata" },
  { value: "kankurgachi", label: "Kankurgachi" },
]

export default function BookPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [date, setDate] = useState<Date>()
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [openFrom, setOpenFrom] = useState(false)
  const [openTo, setOpenTo] = useState(false)
  const [busType, setBusType] = useState("standard")
  const [passengers, setPassengers] = useState("1")
  const [step, setStep] = useState(1)

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleConfirmBooking = () => {
    // Redirect to payment success page
    router.push("/payment-success")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Book Your Bus Ride</h1>
          <p className="text-muted-foreground">Pre-book your journey and travel stress-free</p>
        </div>

        <div className="relative mb-8">
          <div className="absolute left-0 top-0 h-full w-px bg-border ml-4 sm:ml-6 mt-6 mb-6"></div>
          <ol className="relative grid gap-6">
            <li className="grid gap-1.5 sm:grid-cols-[1fr_2fr]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background shadow-sm border sm:order-first">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    step >= 1 ? "bg-rose-600 text-white" : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > 1 ? <Check className="h-4 w-4" /> : "1"}
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">Journey Details</h3>
                <p className="text-sm text-muted-foreground">Select your route, date and time</p>
              </div>
            </li>
            <li className="grid gap-1.5 sm:grid-cols-[1fr_2fr]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background shadow-sm border sm:order-first">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    step >= 2 ? "bg-rose-600 text-white" : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > 2 ? <Check className="h-4 w-4" /> : "2"}
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">Bus Selection</h3>
                <p className="text-sm text-muted-foreground">Choose your preferred bus type</p>
              </div>
            </li>
            <li className="grid gap-1.5 sm:grid-cols-[1fr_2fr]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background shadow-sm border sm:order-first">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    step >= 3 ? "bg-rose-600 text-white" : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > 3 ? <Check className="h-4 w-4" /> : "3"}
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-semibold">Payment</h3>
                <p className="text-sm text-muted-foreground">Complete your booking with payment</p>
              </div>
            </li>
          </ol>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Journey Details</CardTitle>
              <CardDescription>Enter your journey information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Popover open={openFrom} onOpenChange={setOpenFrom}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openFrom}
                        className="w-full justify-between"
                      >
                        {fromLocation
                          ? locations.find((location) => location.value === fromLocation)?.label
                          : "Select location..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search location..." />
                        <CommandList>
                          <CommandEmpty>No location found.</CommandEmpty>
                          <CommandGroup>
                            {locations.map((location) => (
                              <CommandItem
                                key={location.value}
                                value={location.value}
                                onSelect={(currentValue) => {
                                  setFromLocation(currentValue === fromLocation ? "" : currentValue)
                                  setOpenFrom(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    fromLocation === location.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {location.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Popover open={openTo} onOpenChange={setOpenTo}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openTo}
                        className="w-full justify-between"
                      >
                        {toLocation
                          ? locations.find((location) => location.value === toLocation)?.label
                          : "Select location..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search location..." />
                        <CommandList>
                          <CommandEmpty>No location found.</CommandEmpty>
                          <CommandGroup>
                            {locations.map((location) => (
                              <CommandItem
                                key={location.value}
                                value={location.value}
                                onSelect={(currentValue) => {
                                  setToLocation(currentValue === toLocation ? "" : currentValue)
                                  setOpenTo(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    toLocation === location.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {location.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers">Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    max="10"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" disabled>
                Back
              </Button>
              <Button onClick={handleContinue} className="bg-rose-600 hover:bg-rose-700">
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Bus Type</CardTitle>
              <CardDescription>Choose your preferred bus type for the journey</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={busType} onValueChange={setBusType} className="grid gap-4">
                <BusSelector
                  id="standard"
                  value="standard"
                  title="Standard Non-AC"
                  description="Economical and efficient for short city commutes."
                  price="₹10"
                  imageSrc="/images/standard-non-ac-bus-new.png"
                />

                <BusSelector
                  id="ac"
                  value="ac"
                  title="Premium AC"
                  description="Comfortable air-conditioned travel for a refreshing journey."
                  price="₹20"
                  imageSrc="/images/premium-ac-bus-new.png"
                />

                <BusSelector
                  id="panoramic"
                  value="panoramic"
                  title="Panoramic View"
                  description="Transparent roof and large windows for sightseeing enthusiasts."
                  price="₹30"
                  imageSrc="/images/standard-non-ac-bus.png"
                />
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleContinue} className="bg-rose-600 hover:bg-rose-700">
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
              <CardDescription>Complete your booking with payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-card p-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Journey Summary</div>
                  </div>
                  <div className="grid gap-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From:</span>
                      <span>{locations.find((loc) => loc.value === fromLocation)?.label || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">To:</span>
                      <span>{locations.find((loc) => loc.value === toLocation)?.label || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{date ? format(date, "PPP") : "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passengers:</span>
                      <span>{passengers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bus Type:</span>
                      <span>
                        {busType === "standard"
                          ? "Standard Non-AC"
                          : busType === "ac"
                            ? "Premium AC"
                            : "Panoramic View"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Price Details</div>
                  </div>
                  <div className="grid gap-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Fare:</span>
                      <span>{busType === "standard" ? "₹10" : busType === "ac" ? "₹20" : "₹30"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passengers:</span>
                      <span>× {passengers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booking Fee:</span>
                      <span>₹5</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>
                        ₹{(busType === "standard" ? 10 : busType === "ac" ? 20 : 30) * Number.parseInt(passengers) + 5}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center justify-center">
                  <div className="rounded-lg border p-4 bg-white shadow-md">
                    <div className="text-center mb-4 font-medium text-lg">Scan QR Code to Pay</div>
                    <div className="w-64 h-64 mx-auto bg-white rounded-md overflow-hidden">
                      <img
                        src="/images/payment-qr-code.jpeg"
                        alt="Payment QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center mt-4 text-sm text-muted-foreground">
                      Use Google Pay, PhonePe, or any UPI app to scan and pay
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>
                Back
              </Button>
              <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
