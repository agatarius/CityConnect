"use client"

import { useState } from "react"
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentPage() {
  const [qrGenerated, setQrGenerated] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">QR Code Payment</h1>
          <p className="text-muted-foreground">Quick and easy payment for your bus rides</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Options</CardTitle>
            <CardDescription>Choose your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="qr-code">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="qr-code">QR Code</TabsTrigger>
                <TabsTrigger value="wallet">Digital Wallet</TabsTrigger>
                <TabsTrigger value="card">Card</TabsTrigger>
              </TabsList>

              <TabsContent value="qr-code" className="pt-6">
                <div className="grid gap-6">
                  <div className="text-center">
                    <p className="mb-6">
                      Scan the QR code below with any UPI app to make a payment. No need to carry change or stand in
                      line for tickets.
                    </p>

                    <div className="flex justify-center mb-6">
                      {qrGenerated ? (
                        <div className="w-64 h-64 bg-white p-4 rounded-md">
                          <div className="w-full h-full border-2 border-black rounded-sm grid grid-cols-5 grid-rows-5 p-2">
                            <div className="col-span-1 row-span-1 border-2 border-black m-1"></div>
                            <div className="col-span-1 row-span-1 border-2 border-black m-1 col-start-5"></div>
                            <div className="col-span-1 row-span-1 border-2 border-black m-1 row-start-5"></div>
                            <div className="col-span-1 row-span-1 border-2 border-black m-1 col-start-5 row-start-5"></div>
                            <div className="col-start-2 col-span-2 row-start-2 row-span-2 border-2 border-black m-1"></div>
                            <div className="col-start-2 col-span-1 row-start-4 row-span-1 border-2 border-black m-1"></div>
                            <div className="col-start-4 col-span-1 row-start-2 row-span-1 border-2 border-black m-1"></div>
                            <div className="col-start-3 col-span-1 row-start-3 row-span-1 border-2 border-black m-1"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-64 h-64 flex items-center justify-center border rounded-md bg-muted">
                          <QrCode className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <Button onClick={() => setQrGenerated(!qrGenerated)} className="bg-rose-600 hover:bg-rose-700">
                      {qrGenerated ? "Refresh QR Code" : "Generate QR Code"}
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4 mt-4">
                    <h3 className="font-medium mb-2">How to Pay with QR Code</h3>
                    <ol className="space-y-2 text-sm pl-5 list-decimal">
                      <li>Click on "Generate QR Code" button above</li>
                      <li>Open any UPI app on your phone (Google Pay, PhonePe, Paytm, etc.)</li>
                      <li>Scan the QR code displayed on the screen</li>
                      <li>Enter the amount for your journey</li>
                      <li>Complete the payment using your UPI PIN</li>
                      <li>Show the payment confirmation to the conductor</li>
                    </ol>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="wallet" className="pt-6">
                <div className="grid gap-6">
                  <p className="text-center">Use your digital wallet to make quick payments for your bus rides.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                        <span className="text-rose-600 font-bold">P</span>
                      </div>
                      <span>Paytm</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">G</span>
                      </div>
                      <span>GPay</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-bold">P</span>
                      </div>
                      <span>PhonePe</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold">A</span>
                      </div>
                      <span>Amazon Pay</span>
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4 mt-4">
                    <h3 className="font-medium mb-2">Benefits of Digital Wallet</h3>
                    <ul className="space-y-2 text-sm pl-5 list-disc">
                      <li>Quick and contactless payments</li>
                      <li>Track all your bus expenses in one place</li>
                      <li>Earn cashback and rewards</li>
                      <li>No need to carry cash or exact change</li>
                      <li>Secure transactions with password protection</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="card" className="pt-6">
                <div className="grid gap-6">
                  <p className="text-center">Use your debit or credit card for secure payments.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">V</span>
                      </div>
                      <span>Visa</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-bold">M</span>
                      </div>
                      <span>Mastercard</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold">R</span>
                      </div>
                      <span>RuPay</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600 font-bold">A</span>
                      </div>
                      <span>Amex</span>
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4 mt-4">
                    <h3 className="font-medium mb-2">Card Payment Process</h3>
                    <ol className="space-y-2 text-sm pl-5 list-decimal">
                      <li>Tell the conductor you wish to pay by card</li>
                      <li>The conductor will provide a portable card machine</li>
                      <li>Insert or tap your card on the machine</li>
                      <li>Enter your PIN if required</li>
                      <li>Collect your receipt and enjoy your journey</li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Benefits of QR Payments</CardTitle>
              <CardDescription>Why QR code payments are better</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-rose-600"></div>
                  <span>No need to carry exact change</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-rose-600"></div>
                  <span>Faster boarding with digital tickets</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-rose-600"></div>
                  <span>Contactless and hygienic</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-rose-600"></div>
                  <span>Automatic receipt generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-rose-600"></div>
                  <span>Track all your travel expenses</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">What if I don't have a smartphone?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can still pay with cash or purchase a prepaid travel card at any of our stations.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Is there a minimum amount for QR payments?</h3>
                  <p className="text-sm text-muted-foreground">
                    No, you can pay any amount using the QR code payment system.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">What if there's no internet connection?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our buses are equipped with offline payment systems that will process your payment once connectivity
                    is restored.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All FAQs
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
