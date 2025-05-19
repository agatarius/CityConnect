"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Bus, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
              <Bus className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Sign up to start tracking and booking buses</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              {step === 1 && "Enter your personal information"}
              {step === 2 && "Create a secure password"}
              {step === 3 && "Your account is ready!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="123-456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Password must be at least 8 characters long and include a mix of letters, numbers, and special
                  characters.
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-6 py-4">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Account Created Successfully!</h3>
                  <p className="text-muted-foreground">
                    Welcome to CityWheels! You now have 10 free rides to get started.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="font-medium mb-2">Your Rewards</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span>Free Rides:</span>
                    <span className="font-semibold">10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Valid Until:</span>
                    <span className="font-semibold">3 months from today</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex justify-between w-full">
              {step > 1 && step < 3 ? (
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <Button onClick={handleContinue} className="bg-rose-600 hover:bg-rose-700">
                  {step === 2 ? "Create Account" : "Continue"}
                </Button>
              ) : (
                <Link href="/track" className="w-full">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">Start Tracking Buses</Button>
                </Link>
              )}
            </div>

            {step < 3 && (
              <>
                <Separator className="my-2" />
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-rose-600 hover:text-rose-700">
                    Log in
                  </Link>
                </div>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
