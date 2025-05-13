"use client"

import { useState } from "react"
import { Award, Bus, Gift, History, QrCode, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for rewards history
const REWARDS_HISTORY = [
  { id: 1, type: "Free Ride", date: "2023-05-10", status: "Used", route: "101" },
  { id: 2, type: "Free Ride", date: "2023-04-22", status: "Used", route: "303" },
  { id: 3, type: "Free Ride", date: "2023-03-15", status: "Used", route: "202" },
  { id: 4, type: "Free Ride", date: "2023-02-28", status: "Used", route: "101" },
  { id: 5, type: "Free Ride", date: "2023-01-10", status: "Used", route: "505" },
]

export default function RewardsPage() {
  const [progress, setProgress] = useState(32) // Mock progress - 32 rides out of 50
  const [freeRides, setFreeRides] = useState(5) // Mock remaining free rides

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Your Rewards</h1>
          <p className="text-muted-foreground">Track your journey rewards and free rides</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-rose-600" />
                Free Rides
              </CardTitle>
              <CardDescription>Your available free rides</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-rose-600">{freeRides}</div>
                  <div className="text-sm text-muted-foreground mt-1">Remaining free rides</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-rose-600 hover:bg-rose-700">Use a Free Ride</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-rose-600" />
                Progress to Next Reward
              </CardTitle>
              <CardDescription>Complete 50 rides to get 5 free rides</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{progress}/50 rides</span>
                </div>
                <Progress value={(progress / 50) * 100} className="h-2" />
                <div className="text-center text-sm text-muted-foreground">
                  {50 - progress} more rides until your next reward
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Ride History
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rewards Program</CardTitle>
            <CardDescription>How our rewards system works</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="how-it-works">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
                <TabsTrigger value="history">Rewards History</TabsTrigger>
                <TabsTrigger value="redeem">Redeem</TabsTrigger>
              </TabsList>

              <TabsContent value="how-it-works" className="space-y-4 pt-4">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg border">
                    <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                      <Bus className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h3 className="font-medium">New Users</h3>
                    <p className="text-sm text-muted-foreground">New users get 10 free rides when they sign up</p>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg border">
                    <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                      <History className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h3 className="font-medium">Regular Travel</h3>
                    <p className="text-sm text-muted-foreground">Complete 50 rides to earn 5 more free rides</p>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg border">
                    <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
                      <Gift className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h3 className="font-medium">Special Rewards</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn bonus rewards during special events and promotions
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Reward Tiers</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Regular User</div>
                      <div>10 free rides on signup</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Silver Member</div>
                      <div>5 free rides after every 50 rides</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Gold Member</div>
                      <div>10 free rides after every 100 rides</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Platinum Member</div>
                      <div>15 free rides after every 150 rides + priority booking</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="pt-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Type</div>
                    <div>Date</div>
                    <div>Route</div>
                    <div>Status</div>
                  </div>
                  {REWARDS_HISTORY.map((reward) => (
                    <div key={reward.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 text-sm">
                      <div>{reward.type}</div>
                      <div>{new Date(reward.date).toLocaleDateString()}</div>
                      <div>Route {reward.route}</div>
                      <div>
                        <Badge variant={reward.status === "Used" ? "outline" : "secondary"}>{reward.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="redeem" className="pt-4">
                <div className="grid gap-6">
                  <div className="rounded-lg border p-6 flex flex-col items-center justify-center text-center">
                    <QrCode className="h-16 w-16 mb-4 text-rose-600" />
                    <h3 className="text-xl font-medium mb-2">Redeem Your Free Ride</h3>
                    <p className="text-muted-foreground mb-4">
                      Show this QR code to the bus conductor to redeem your free ride
                    </p>
                    <Button className="bg-rose-600 hover:bg-rose-700">Generate QR Code</Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">How to Redeem</h3>
                    <ol className="space-y-2 text-sm pl-5 list-decimal">
                      <li>Select "Use a Free Ride" or "Generate QR Code"</li>
                      <li>Choose the route you want to travel on</li>
                      <li>Show the generated QR code to the bus conductor</li>
                      <li>The conductor will scan the code to verify your free ride</li>
                      <li>Enjoy your journey!</li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
