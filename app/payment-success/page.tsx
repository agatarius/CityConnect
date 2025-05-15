"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card className="border-green-100 shadow-lg">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">Payment Received Successfully</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-gray-600">
              Thank you for booking with CityConnect. Your payment has been processed successfully.
            </p>
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                A confirmation has been sent to your email. You can also view your booking details in your profile.
              </p>
            </div>
            <div className="flex flex-col space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-medium">TXN{Math.floor(Math.random() * 1000000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-medium">UPI</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/track" className="w-full">
              <Button className="w-full bg-rose-600 hover:bg-rose-700">
                Track Your Bus {countdown > 0 && `(${countdown})`}
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
