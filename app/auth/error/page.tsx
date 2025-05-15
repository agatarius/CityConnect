"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("An authentication error occurred")
  const [errorType, setErrorType] = useState<string>("")

  useEffect(() => {
    const error = searchParams.get("error")

    if (error) {
      setErrorType(error)

      // Set a user-friendly error message based on the error type
      switch (error) {
        case "Configuration":
          setErrorMessage("There is a problem with the server configuration.")
          break
        case "AccessDenied":
          setErrorMessage("Access denied. You do not have permission to sign in.")
          break
        case "Verification":
          setErrorMessage("The verification link may have been used or is invalid.")
          break
        case "OAuthSignin":
        case "OAuthCallback":
        case "OAuthCreateAccount":
        case "EmailCreateAccount":
        case "Callback":
        case "OAuthAccountNotLinked":
        case "EmailSignin":
        case "CredentialsSignin":
          setErrorMessage("There was a problem with your sign-in attempt. Please try again.")
          break
        case "SessionRequired":
          setErrorMessage("You must be signed in to access this page.")
          break
        default:
          setErrorMessage("An unexpected authentication error occurred.")
      }
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Error</CardTitle>
            <CardDescription>There was a problem with your authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>

            {errorType && <div className="text-sm text-muted-foreground mt-2">Error code: {errorType}</div>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700" asChild>
              <Link href="/login">Try Again</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
