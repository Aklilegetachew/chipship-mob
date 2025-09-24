"use client"

import Link from "next/link"
import { ArrowLeft, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "Sophia Carter",
    email: "sophia.carter@email.com",
    phone: "+1 (555) 123-4567",
    pickupAddress: "123 Main St, Anytown, USA",
    deliveryAddress: "456 Oak Ave, Somewhere, USA",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving profile:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/profile" className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Edit Profile</h1>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center overflow-hidden">
                <img
                  src="/woman-profile-avatar.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-white" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mt-4">
              Sophia Carter
            </h2>
            <p className="text-gray-500">@sophia_carter</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full bg-gray-50 border-gray-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full bg-gray-50 border-gray-200"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full bg-gray-50 border-gray-200"
              />
            </div>

            {/* Default Pickup Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Pickup Address
              </label>
              <Input
                value={formData.pickupAddress}
                onChange={(e) =>
                  handleInputChange("pickupAddress", e.target.value)
                }
                className="w-full bg-gray-50 border-gray-200"
              />
            </div>

            {/* Default Delivery Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Delivery Address
              </label>
              <Input
                value={formData.deliveryAddress}
                onChange={(e) =>
                  handleInputChange("deliveryAddress", e.target.value)
                }
                className="w-full bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <Button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
