import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function PromoCard() {
  return (
    <Card className="bg-white rounded-2xl shadow-md p-4 flex flex-row items-center justify-between gap-4 w-full">
      {/* Left Section: Text + Button */}
      <div className="flex flex-col justify-center flex-1">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2">
          Quick Delivery at your Home
        </h2>
        <Button className="bg-black text-white rounded-full px-3 text-xs font-semibold hover:bg-gray-800 w-fit">
          Book Now
        </Button>
      </div>

      {/* Right Section: Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0">
        <Image
          src="/box.png"
          alt="Delivery box illustration"
          width={128}
          height={128}
          className="object-contain"
        />
      </div>
    </Card>
  )
}
