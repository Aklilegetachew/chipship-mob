"use client"

import { ArrowLeft, Package, CheckCircle, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MobileFooter } from "@/components/app-footer"
import { useQueryClient } from "@tanstack/react-query"

export default function ShipmentDetail() {
  const params = useParams()
  const shipmentId = Number.parseInt(params.id as string)
  const queryClient = useQueryClient()
  const orders = queryClient.getQueryData<any[]>(["orders"])
  if (!orders) {
    return <div>Loading...</div>
  }
  const shipment = orders.find((s) => s.id === shipmentId)

  if (!shipment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Shipment Not Found</h1>
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700">
              Back to Shipments
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getPackageIcon = (description: string) => {
    if (description.includes("fragile") || description.includes("valuable")) {
      return <Package className="w-8 h-8 text-green-600" />
    }
    return <Package className="w-8 h-8 text-gray-600" />
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "fragile":
        return "bg-red-100 text-red-700"
      case "valuable":
        return "bg-yellow-100 text-yellow-700"
      case "perishable":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="flex items-center gap-4 p-4">
          <Link href="/history">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-balance">
            Shipment Details
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Item Details */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-base font-semibold mb-4">Item Details</h2>
          <div className="space-y-4">
            {shipment.packageItems.map((item: any, index: number) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {getPackageIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-balance">
                      {item.description}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.weight} kg
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Items:</span>
                <span className="font-medium">
                  {shipment.packageItems.length}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-muted-foreground">Total Weight:</span>
                <span className="font-medium">{shipment.packageWeight} kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-base font-semibold mb-4">Route</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium">Pickup</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  {shipment.senderAddress}
                </p>
              </div>
            </div>

            <div className="ml-4 w-px h-8 bg-gray-200"></div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium">Delivery</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  {shipment.recipientAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-base font-semibold mb-4">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Final Price</span>
              <span className="font-semibold text-lg">
                ${shipment.paymentTotal}.00
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Delivery Status</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">
                  {shipment.status === "DELIVERED"
                    ? "Delivered"
                    : shipment.status}
                </span>
              </div>
            </div>

            {/* <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Your Rating</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
                <span className="ml-1 font-medium">5.0</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  )
}
