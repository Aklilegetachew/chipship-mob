"use client"

import { Button } from "@/components/ui/button"
import { Plane, Package } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 dark:from-gray-900 dark:via-blue-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Ship Smarter.{" "}
              <span className="text-teal-600 dark:text-teal-400">
                Travel Lighter.
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Earn money by carrying packages for others. Or send goods
              affordably using trusted travelers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full"
              >
                <Plane className="mr-2 h-5 w-5" />
                Become a Traveler
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950 px-8 py-3 rounded-full bg-transparent"
              >
                <Package className="mr-2 h-5 w-5" />
                Ship a Package
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 flex items-center justify-center">
              <img
                src="/ship.png"
                alt="ChipShip connecting travelers and senders globally"
                className="w-full h-full object-contain"
              />
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 bg-teal-100 dark:bg-teal-900 p-3 rounded-full shadow-lg"
              >
                <Package className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute bottom-1/4 right-1/4 bg-sky-100 dark:bg-sky-900 p-3 rounded-full shadow-lg"
              >
                <Plane className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200 dark:bg-teal-800 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-teal-200 dark:bg-teal-800 rounded-full opacity-20 blur-xl"></div>
      </div>
    </section>
  )
}
