"use client"

import { useState } from "react"
import { ArrowLeft, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useOrders } from "../queries/order/order"

import { MobileFooter } from "@/components/app-footer"
import { MobileHeader } from "@/components/app-header"

// Mock data from the provided JSON

type TabType = "sending" | "traveling"
type FilterType = "all" | "in-transit" | "delivered" | "pending"

export default function ShipmentHistory() {
  const [activeTab, setActiveTab] = useState<TabType>("sending")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const { data: shipmentsData = [], isLoading, isError } = useOrders()
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-600 hover:bg-orange-100"
          >
            Pending
          </Badge>
        )
      case "delivered":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-600 hover:bg-green-100"
          >
            Delivered
          </Badge>
        )
      case "in-transit":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-600 hover:bg-green-100"
          >
            In Transit
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPackageIcon = (description: string) => {
    if (description.includes("fragile") || description.includes("valuable")) {
      return <Package className="w-8 h-8 text-green-600" />
    }
    return <Package className="w-8 h-8 text-gray-600" />
  }

  const filteredShipments = shipmentsData.filter((shipment: any) => {
    if (activeFilter === "all") return true
    if (activeFilter === "pending")
      return shipment.status.toLowerCase() === "pending"
    if (activeFilter === "delivered")
      return shipment.status.toLowerCase() === "delivered"
    if (activeFilter === "in-transit")
      return shipment.status.toLowerCase() === "in-transit"
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b">
        <MobileHeader />

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("sending")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "sending"
                ? "border-green-600 text-green-600"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Sending
          </button>
          <button
            onClick={() => setActiveTab("traveling")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "traveling"
                ? "border-green-600 text-green-600"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Traveling
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={activeFilter === "all" ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveFilter("all")}
            className={
              activeFilter === "all" ? "bg-green-600 hover:bg-green-700" : ""
            }
          >
            All
          </Button>
          <Button
            variant={activeFilter === "in-transit" ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveFilter("in-transit")}
            className={
              activeFilter === "in-transit"
                ? "bg-green-600 hover:bg-green-700"
                : ""
            }
          >
            In Transit
          </Button>
          <Button
            variant={activeFilter === "delivered" ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveFilter("delivered")}
            className={
              activeFilter === "delivered"
                ? "bg-green-600 hover:bg-green-700"
                : ""
            }
          >
            Delivered
          </Button>
          <Button
            variant={activeFilter === "pending" ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveFilter("pending")}
            className={
              activeFilter === "pending"
                ? "bg-green-600 hover:bg-green-700"
                : ""
            }
          >
            Pending
          </Button>
        </div>
      </div>

      {/* Shipment List */}
      <div className="px-4 space-y-3">
        {filteredShipments.map((shipment: any) => (
          <Link key={shipment.id} href={`/shipment/${shipment.id}`}>
            <div className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getPackageIcon(shipment.packageDescription)}
                  </div>
                  <div>
                    <h3 className="font-medium text-balance">
                      {shipment.packageDescription.split(",")[0]} Package
                    </h3>
                    <p className="text-sm text-muted-foreground text-pretty">
                      {shipment.senderAddress.split(" ").slice(0, 2).join(" ")}{" "}
                      →{" "}
                      {shipment.recipientAddress
                        .split(" ")
                        .slice(0, 2)
                        .join(" ")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(shipment.status)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <MobileFooter />
    </div>
  )
}
