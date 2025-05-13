import Link from "next/link"
import { Bus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900">
              <Bus className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Log in to your CityConnect account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-rose-600 hover:text-rose-700">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me for 30 days
                  </Label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full bg-rose-600 hover:bg-rose-700">Log In</Button>

            <Separator className="my-2" />

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <div className="mr-2 rounded-full bg-blue-100 p-1">
                  <span className="text-blue-600 text-xs font-bold">f</span>
                </div>
                Facebook
              </Button>
              <Button variant="outline" className="w-full">
                <div className="mr-2 rounded-full bg-red-100 p-1">
                  <span className="text-red-600 text-xs font-bold">G</span>
                </div>
                Google
              </Button>
            </div>

            <div className="text-center text-sm mt-2">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-rose-600 hover:text-rose-700">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
