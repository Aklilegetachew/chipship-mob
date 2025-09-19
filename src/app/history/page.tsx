"use client"

import {
  Package,
  Search,
  Calendar,
  MapPin,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useOrders } from "../queries/order/order"
import { MobileFooter } from "@/components/app-footer"
import { MobileHeader } from "@/components/app-header"

export default function HistoryPage() {
  const { data: shipments = [], isLoading, isError } = useOrders()
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-transit":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Package className="h-4 w-4 text-muted-foreground" />
    }
  }
  console.log("Shipment", shipments)
  const getStatusBadge = (status: string) => {
    const variants = {
      delivered: "bg-green-100 text-green-800 border-green-200",
      "in-transit": "bg-blue-100 text-blue-800 border-blue-200",
      processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    }

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
      </Badge>
    )
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading shipments...</div>
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load shipments
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Shipment History
          </h2>
          <p className="text-muted-foreground">
            View and manage all your past shipments
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by tracking number or destination..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Filter by Date
            </Button>
          </div>
        </div>

        {/* Shipments List */}
        <div className="space-y-4">
          {shipments.map((shipment: any) => (
            <Card
              key={shipment.id}
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                      {getStatusIcon(shipment.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {shipment.trackingNumber || shipment.id}
                        </h3>
                        {getStatusBadge(shipment.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{shipment.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>
                          {new Date(shipment.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {shipment.cost}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {shipment.trackingNumber}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <MobileFooter />
    </div>
  )
}
