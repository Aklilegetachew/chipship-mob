"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Pencil,
  MapPin,
  ChevronDown,
  User,
  Home,
  Headphones,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useUserInfo } from "../queries/user/user.query"
import { useOrders } from "../queries/order/order"
import { MobileHeader } from "@/components/app-header"
import { MobileFooter } from "@/components/app-footer"

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useUserInfo()
  const { data: orders = [], isLoading: loadingOrders } = useOrders()
  console.log(user)
  // --- Derive stats from orders ---
  const inProgress = orders.filter(
    (o: any) => o.status !== "DELIVERED" && o.status !== "CANCELLED"
  ).length
  const delivered = orders.filter((o: any) => o.status === "DELIVERED").length
  const sent = orders.length

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  if (isLoading) {
    return <div className="p-6">Loading profile...</div>
  }

  if (isError || !user) {
    return <div className="p-6 text-red-500">Failed to load profile</div>
  }

  return (
    <motion.div
      className="min-h-screen bg-white text-teal-600 p-4 md:p-6 lg:p-8 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MobileHeader />

      {/* Profile Section */}
      <motion.div
        className="flex flex-col items-center mb-8"
        variants={itemVariants}
      >
        <div className="relative w-28 h-28 mb-4">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-teal-600">
            <Image
              src={user.photoUrl || "/placeholder.svg?height=112&width=112"}
              alt={user.name}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-0 right-0 bg-teal-600 rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-teal-700"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit profile picture</span>
          </Button>
        </div>
        <h2 className="text-2xl font-bold text-teal-600 mb-1">{user.name}</h2>
        <div className="flex items-center text-teal-600 text-base">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{user.address || "No address set"}</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-3 gap-4 mb-8"
        variants={itemVariants}
      >
        <Card className="bg-teal-100 text-teal-800 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold">{inProgress}</span>
          <span className="text-sm">Progress delivery</span>
        </Card>
        <Card className="bg-teal-100 text-teal-800 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold">{sent}</span>
          <span className="text-sm">Parcels sent</span>
        </Card>
        <Card className="bg-teal-100 text-teal-800 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold">{delivered}</span>
          <span className="text-sm">Parcels completed</span>
        </Card>
      </motion.div>

      {/* Overviews Section */}
      <motion.h2
        className="text-xl font-bold text-teal-600 mb-4"
        variants={itemVariants}
      >
        Overviews
      </motion.h2>
      <motion.div
        className="bg-white border border-teal-200 rounded-2xl shadow-md p-4 mb-6"
        variants={itemVariants}
      >
        <Link
          href="#"
          className="flex items-center py-3 px-2 hover:bg-teal-50 rounded-lg"
        >
          <User className="h-6 w-6 mr-4 text-teal-600" />
          <span className="text-lg font-medium">Account</span>
        </Link>
        <Link
          href="#"
          className="flex items-center py-3 px-2 hover:bg-teal-50 rounded-lg"
        >
          <Home className="h-6 w-6 mr-4 text-teal-600" />
          <span className="text-lg font-medium">Address</span>
        </Link>
        <Link
          href="#"
          className="flex items-center py-3 px-2 hover:bg-teal-50 rounded-lg"
        >
          <Headphones className="h-6 w-6 mr-4 text-teal-600" />
          <span className="text-lg font-medium">Contact Us</span>
        </Link>
        <Link
          href="#"
          className="flex items-center py-3 px-2 hover:bg-teal-50 rounded-lg"
        >
          <HelpCircle className="h-6 w-6 mr-4 text-teal-600" />
          <span className="text-lg font-medium">About Us</span>
        </Link>
        <Link
          href="#"
          className="flex items-center py-3 px-2 hover:bg-teal-50 rounded-lg"
        >
          <Settings className="h-6 w-6 mr-4 text-teal-600" />
          <span className="text-lg font-medium">Setting</span>
        </Link>
      </motion.div>

      {/* Logout Section */}
      <motion.div
        className="bg-white border border-teal-200 rounded-2xl shadow-md p-4 mb-8"
        variants={itemVariants}
      >
        <Button
          variant="ghost"
          className="w-full flex justify-start py-3 px-2 text-lg font-medium text-teal-600 hover:bg-teal-50 rounded-lg"
        >
          <LogOut className="h-6 w-6 mr-4 text-teal-600" />
          Logout
        </Button>
      </motion.div>

      {/* Footer */}
      <MobileFooter />
    </motion.div>
  )
}
