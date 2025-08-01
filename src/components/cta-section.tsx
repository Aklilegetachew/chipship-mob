"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Smartphone, Download } from "lucide-react"

export function CTASection() {
  return (
    <section
      id="cta"
      className="py-16 lg:py-24 bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-teal-100 mb-12 max-w-2xl mx-auto">
            Join thousands of travelers and senders who trust ChipShip for their international shipping needs
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
              <Smartphone className="mr-2 h-5 w-5" />
              Sign Up Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-full font-semibold bg-transparent"
            >
              <Download className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <p className="text-teal-100 font-medium">Download our mobile app:</p>
            <div className="flex gap-4">
              <img
                src="/placeholder.svg?height=50&width=150"
                alt="Download on App Store"
                className="h-12 hover:opacity-80 transition-opacity cursor-pointer"
              />
              <img
                src="/placeholder.svg?height=50&width=150"
                alt="Get it on Google Play"
                className="h-12 hover:opacity-80 transition-opacity cursor-pointer"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
