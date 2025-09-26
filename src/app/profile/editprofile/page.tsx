"use client"

import Link from "next/link"
import { ArrowLeft, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useUpdateUserInfo, useUserInfo } from "@/app/queries/user/user.query"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { getNames } from "country-list"
import Select from "react-select"
import { useToast } from "@/context/ToastContext"

export default function EditProfile() {
  const { data: user, isLoading, isError } = useUserInfo()
  const updateUserInfo = useUpdateUserInfo()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userAddress: "",
    userCountry: "",
  })
  const { showSuccess, showError } = useToast()
  const countryOptions = getNames().map((name) => ({
    value: name,
    label: name,
  }))

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        userAddress: user.address || "",
        userCountry: user.country || "",
      })
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    updateUserInfo.mutate(formData, {
      onSuccess: () => {
        showSuccess("Profile updated successfully")
      },
      onError: (error) => {
        showError("Failed to update profile", error.message || "")
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Failed to load user info
      </div>
    )
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
                  src={user?.photoUrl || "/woman-profile-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-white" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mt-4">
              {formData.name}
            </h2>
            <p className="text-gray-500">{formData.email}</p>
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
                className="w-full bg-gray-50 border-gray-200 rounded-xl"
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
                className="w-full bg-gray-50 border-gray-200 rounded-xl"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <PhoneInput
                value={formData.phone}
                onChange={(phone) => handleInputChange("phone", phone)}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: false,
                }}
                containerClass="w-full"
                inputClass="!w-full !bg-gray-50 !text-gray-800 !border-gray-200 !rounded-xl !p-3 sm:!p-4 !text-base !h-auto"
                buttonClass="!bg-gray-50 !border-gray-200 !rounded-l-xl"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <Select
                options={countryOptions}
                className="text-slate-800"
                classNamePrefix="select"
                placeholder="Select country"
                value={
                  formData.userCountry
                    ? countryOptions.find(
                        (opt) =>
                          opt.value.toLowerCase() ===
                          formData.userCountry.toLowerCase()
                      )
                    : null
                }
                onChange={(val) =>
                  handleInputChange("userCountry", val?.value || "")
                }
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    fontSize: "1rem",
                    minHeight: "3rem",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: "0.75rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }),
                }}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <Input
                value={formData.userAddress}
                onChange={(e) =>
                  handleInputChange("userAddress", e.target.value)
                }
                className="w-full bg-gray-50 border-gray-200 rounded-xl"
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
