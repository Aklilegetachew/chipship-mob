"use client"

import Link from "next/link"
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Calendar,
  Plus,
  Bell,
  User,
} from "lucide-react"
import { useState } from "react"

export default function Settings() {
  const [notifications, setNotifications] = useState({
    push: false,
    email: false,
    sms: false,
  })

  const [privacy, setPrivacy] = useState({
    locationSharing: true,
  })

  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  const togglePrivacy = (type: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/profile" className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          <div className="w-10"></div>
        </div>

        <div className="p-6 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive updates about shipments.
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification("push")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.push ? "bg-green-600" : "bg-gray-200"
                  }`}
                  disabled
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.push ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Shipment updates, activity, and offers.
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification("email")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.email ? "bg-green-600" : "bg-gray-200"
                  }`}
                  disabled
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.email ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    SMS Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Urgent updates and security alerts.
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification("sms")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.sms ? "bg-green-600" : "bg-gray-200"
                  }`}
                  disabled
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.sms ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Privacy
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Location Sharing</h3>
                <p className="text-sm text-gray-500">
                  Allow ChipShip to access your location.
                </p>
              </div>
              <button
                onClick={() => togglePrivacy("locationSharing")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.locationSharing ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.locationSharing ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Account */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Account
            </h2>
            <div className="space-y-4">
              <Link
                href="/profile/settings/changePassword"
                className="flex items-center justify-between py-2"
              >
                <span className="font-medium text-gray-900">
                  Change Password
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              <Link
                href="/profile/editprofile"
                className="flex items-center justify-between py-2"
              >
                <span className="font-medium text-gray-900">Edit Profile</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              <Link
                href="/profile/settings/deleteaccount"
                className="flex items-center justify-between py-2"
              >
                <span className="font-medium text-red-500">Delete Account</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </div>
          </section>

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
            <div className="flex items-center justify-between py-2">
              <span className="font-medium text-gray-900">App Version</span>
              <span className="text-gray-500">1.2.3</span>
            </div>
            <Link
              href="/profile/terms"
              className="flex items-center justify-between py-2"
            >
              <span className="font-medium text-gray-900">
                Terms of Service
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/profile/contactus"
              className="flex items-center justify-between py-2"
            >
              <span className="font-medium text-gray-900">Contact Support</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
