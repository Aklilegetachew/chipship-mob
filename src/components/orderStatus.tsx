import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function StatusCard() {
  return (
    <Card className="bg-black text-white rounded-2xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md md:text-xl font-bold">Current Shipping</h2>
        <Button
          variant="outline"
          className="bg-white text-black rounded-full px-4 py-1 font-semibold hover:bg-gray-100"
        >
          Track
        </Button>
      </div>
      <p className="text-gray-300 mb-6">ID: GJ012345</p>
      <div className="flex items-center justify-between relative mb-2">
        {/* Progress line */}
        <div className="absolute left-0 right-0 h-1 bg-gray-600 top-1/2 -translate-y-1/2 mx-4"></div>
        <div className="absolute left-0 w-1/2 h-1 bg-white top-1/2 -translate-y-1/2 mx-4"></div>{" "}
        {/* Active part */}
        {/* Dots */}
        <div className="w-4 h-4 bg-white rounded-full z-10"></div>
        <div className="w-4 h-4 bg-white rounded-full z-10"></div>
        <div className="w-4 h-4 bg-gray-600 rounded-full z-10"></div>
        <div className="w-4 h-4 bg-gray-600 rounded-full z-10"></div>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>USA Texas</span>
        <span>USA Chicago</span>
      </div>
    </Card>
  )
}
