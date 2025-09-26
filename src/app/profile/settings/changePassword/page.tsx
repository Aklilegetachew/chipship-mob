"use client"

import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth"
import { useToast } from "@/context/ToastContext"
import { auth } from "@/lib/firebase"

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const { showSuccess, showError } = useToast()
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "newPassword") {
      setPasswordRequirements({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      })
    }
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }
  const handleSave = async () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      showError("Please fill all fields")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showError("New password and confirm password do not match")
      return
    }

    // Check password requirements
    if (!Object.values(passwordRequirements).every(Boolean)) {
      showError("New password does not meet all requirements")
      return
    }

    const user = auth.currentUser
    if (!user || !user.email) {
      showError("No logged-in user found")
      return
    }

    try {
      // Re-authenticate with current password
      const credential = EmailAuthProvider.credential(
        user.email,
        formData.currentPassword
      )
      await reauthenticateWithCredential(user, credential)

      // Update password
      await updatePassword(user, formData.newPassword)
      showSuccess("Password updated successfully!")

      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error: any) {
      console.error(error)
      if (error.code === "auth/wrong-password") {
        showError("Current password is incorrect")
      } else {
        showError(error.message || "Failed to update password")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/profile/settings/" className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">
            Change Password
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  placeholder="Current Password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    handleInputChange("currentPassword", e.target.value)
                  }
                  className="w-full bg-gray-50 border-gray-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <div className="relative">
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  className="w-full bg-gray-50 border-gray-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Check
                    className={`w-4 h-4 ${
                      passwordRequirements.length
                        ? "text-green-600"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      passwordRequirements.length
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check
                    className={`w-4 h-4 ${
                      passwordRequirements.uppercase
                        ? "text-green-600"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      passwordRequirements.uppercase
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    An uppercase letter
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check
                    className={`w-4 h-4 ${
                      passwordRequirements.number
                        ? "text-green-600"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      passwordRequirements.number
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    A number
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check
                    className={`w-4 h-4 ${
                      passwordRequirements.special
                        ? "text-green-600"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      passwordRequirements.special
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    A special character
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="w-full bg-gray-50 border-gray-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-12">
            <Button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium"
            >
              Save Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
