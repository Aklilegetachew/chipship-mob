"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth"
import { useToast } from "@/context/ToastContext"
import { auth } from "@/lib/firebase"

export default function DeleteAccount() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useToast()
  const handleDelete = async () => {
    if (!password) {
      showError("Please enter your current password")
      return
    }

    const user = auth.currentUser
    if (!user || !user.email) {
      showError("No logged-in user found")
      return
    }

    setLoading(true)
    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, password)
      await reauthenticateWithCredential(user, credential)

      // Delete user
      await deleteUser(user)
      showSuccess("Account deleted successfully!")

      // Optional: redirect to homepage or login page
      window.location.href = "/"
    } catch (error: any) {
      console.error(error)
      if (error.code === "auth/wrong-password") {
        showError("Incorrect password")
      } else {
        showError(error.message || "Failed to delete account")
      }
    } finally {
      setLoading(false)
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
            Delete Account
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-red-600 font-semibold">
            Warning: This action is irreversible. All your data will be
            permanently deleted.
          </p>

          <div>
            <Input
              type="password"
              placeholder="Enter your current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border-gray-200"
            />
          </div>

          <Button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete My Account"}
          </Button>
        </div>
      </div>
    </div>
  )
}
