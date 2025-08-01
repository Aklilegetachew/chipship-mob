import Image from "next/image"
import { Menu, Search, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AppHeader } from "@/components/appHeader"
import { PromoCard } from "@/components/promoCard"
import { StatusCard } from "@/components/orderStatus"

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-page-background p-4 md:p-6 lg:p-8 flex flex-col gap-4">
      {/* Header */}
      <AppHeader />
      {/* Quick Delivery Card */}
      <PromoCard />
      {/* Current Shipping Card */}
      <StatusCard />
      {/* Quick another order section */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Quick another order
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 flex-grow">
        {/* Truck Card */}
        <Card className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center">
          <div className="w-32 h-32 relative mb-2">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Isometric delivery truck"
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Truck</h3>
          <p className="text-gray-600 mb-4">$7.22/ml</p>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 bg-gray-200 hover:bg-gray-300"
          >
            <Minus className="h-5 w-5 text-gray-700" />
            <span className="sr-only">Remove</span>
          </Button>
        </Card>

        {/* Plane Card */}
        <Card className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center">
          <div className="w-32 h-32 relative mb-2">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Isometric cargo plane"
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Plane</h3>
          <p className="text-gray-600 mb-4">$9.22/ml</p>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 bg-primary text-white hover:bg-primary/90"
          >
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add</span>
          </Button>
        </Card>
      </div>
      {/* Bottom Navigation */}
      <div className="flex justify-between gap-4 pt-4">
        <Button
          variant="outline"
          className="flex-1 bg-white text-black rounded-full px-6 py-3 text-base font-semibold hover:bg-gray-100"
        >
          Continue
        </Button>
        <Button className="flex-1 bg-black text-white rounded-full px-6 py-3 text-base font-semibold hover:bg-gray-800">
          Next
        </Button>
      </div>
    </div>
  )
}
