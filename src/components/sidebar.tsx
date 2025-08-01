"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { X, Home, User, Package, History, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { easeIn, easeOut } from "framer-motion"
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarVariants = {
    inactive: { x: "-100%" },
    active: { x: 0, transition: { type: easeIn, duration: 0.3 } },
    inactive: { x: "-100%", transition: { type: easeOut, duration: 0.3 } },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  return (
    <>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black z-40"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        />
      )}
      <motion.div
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-6 flex flex-col"
        variants={sidebarVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        exit="exit"
      >
        <div className="flex justify-end mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-800 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            className="flex items-center text-gray-800 hover:text-teal-600 text-lg font-medium"
            onClick={onClose}
          >
            <Home className="h-6 w-6 mr-3" />
            Home
          </Link>
          <Link
            href="/new-order"
            className="flex items-center text-gray-800 hover:text-teal-600 text-lg font-medium"
            onClick={onClose}
          >
            <PlusCircle className="h-6 w-6 mr-3" />
            New Order
          </Link>
          <Link
            href="/profile"
            className="flex items-center text-gray-800 hover:text-teal-600 text-lg font-medium"
            onClick={onClose}
          >
            <User className="h-6 w-6 mr-3" />
            Profile
          </Link>
          <Link
            href="/order-details"
            className="flex items-center text-gray-800 hover:text-teal-600 text-lg font-medium"
            onClick={onClose}
          >
            <Package className="h-6 w-6 mr-3" />
            Order Details
          </Link>
          <Link
            href="/order-history"
            className="flex items-center text-gray-800 hover:text-teal-600 text-lg font-medium"
            onClick={onClose}
          >
            <History className="h-6 w-6 mr-3" />
            Order History
          </Link>
        </nav>
      </motion.div>
    </>
  )
}
