"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ListTodo,
  PlusCircle,
  FileText,
  MapPin,
  Pencil,
  Clock,
  CheckCircle,
  Circle,
  DollarSign,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function OrderDetailsPage() {
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

  return (
    <motion.div
      className="min-h-screen bg-white text-black p-4 md:p-6 lg:p-8 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header className="flex items-center mb-8" variants={itemVariants}>
        <Link
          href="#"
          className="flex items-center text-black hover:text-teal-600"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="text-lg font-medium">Back</span>
        </Link>
      </motion.header>

      {/* Progress Stepper */}
      <motion.div
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        <div className="flex flex-col items-center flex-1">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-teal-600 text-white mb-2">
            <ListTodo className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium text-center text-gray-500">
            STEP 1<br />
            Basic Details
          </span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
        <div className="flex flex-col items-center flex-1">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 text-gray-600 mb-2">
            <PlusCircle className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium text-center text-gray-500">
            STEP 2<br />
            Information
          </span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
        <div className="flex flex-col items-center flex-1">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 text-gray-600 mb-2">
            <FileText className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium text-center text-gray-500">
            STEP 3<br />
            Confirmation
          </span>
        </div>
      </motion.div>

      {/* Select Location Section */}
      <motion.h2
        className="text-xl font-bold text-black mb-4"
        variants={itemVariants}
      >
        Select location
      </motion.h2>
      <motion.div
        className="bg-gray-50 text-black rounded-2xl shadow-md p-6 mb-8"
        variants={itemVariants}
      >
        <div className="flex relative pb-6">
          <div className="flex flex-col items-center mr-4">
            <MapPin className="h-6 w-6 text-teal-600" />
            <div className="border-l-2 border-dashed border-gray-300 h-full my-2"></div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1 text-black">
                  Collect from
                </h3>
                <p className="text-gray-500 text-sm mb-2">Sender address</p>
                <p className="text-gray-700 text-base">
                  Kilometer 6, 278H, Street 201R, Kroalkor Village, Unnamed
                  Road, Phnom Penh
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-teal-600"
              >
                <Pencil className="h-5 w-5" />
                <span className="sr-only">Edit sender address</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex relative">
          <div className="flex flex-col items-center mr-4">
            <MapPin className="h-6 w-6 text-teal-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1 text-black">
                  Delivery to
                </h3>
                <p className="text-gray-500 text-sm mb-2">Receiver address</p>
                <p className="text-gray-700 text-base">
                  2nd Floor 01, 25 Mao Tse Toung Blvd (245), Phnom Penh 12302,
                  Cambodia
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-teal-600"
              >
                <Pencil className="h-5 w-5" />
                <span className="sr-only">Edit receiver address</span>
              </Button>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-6 w-full bg-white text-teal-600 border-teal-600 rounded-full px-6 py-3 text-base font-semibold hover:bg-teal-50"
        >
          <Clock className="h-5 w-5 mr-2" />
          Take around 20 min
        </Button>
      </motion.div>

      {/* Collect Time Section */}
      <motion.h2
        className="text-xl font-bold text-black mb-4"
        variants={itemVariants}
      >
        Collect time
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        {/* Express Card */}
        <motion.div
          className="bg-white text-black rounded-2xl shadow-md p-4 border-2 border-teal-600 relative"
          variants={itemVariants}
        >
          <CheckCircle className="h-6 w-6 text-teal-600 absolute top-4 right-4" />
          <h3 className="text-lg font-semibold mb-1">Express</h3>
          <p className="text-gray-500 text-sm mb-2">Collect time 10-20 min</p>
          <p className="text-gray-700 text-base">Delivery to receiver</p>
          <p className="text-gray-800 text-base font-semibold">1-2 hours</p>
        </motion.div>

        {/* Schedule Card */}
        <motion.div
          className="bg-white text-black rounded-2xl shadow-md p-4 border-2 border-gray-200 relative"
          variants={itemVariants}
        >
          <Circle className="h-6 w-6 text-gray-400 absolute top-4 right-4" />
          <h3 className="text-lg font-semibold mb-1">Schedule</h3>
          <p className="text-gray-500 text-sm mb-2">Choose available time</p>
          <div className="flex items-center text-gray-700 text-base mb-1">
            <DollarSign className="h-4 w-4 mr-1" /> Flexible price
          </div>
          <div className="flex items-center text-gray-700 text-base">
            <Clock className="h-4 w-4 mr-1" /> Plan 2 day ahead
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
