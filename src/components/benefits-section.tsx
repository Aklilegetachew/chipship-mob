"use client"

import { motion } from "framer-motion"
import { DollarSign, Clock, Shield, Globe } from "lucide-react"

const travelerBenefits = [
  {
    icon: DollarSign,
    title: "Monetize unused space",
    description: "Turn your extra luggage allowance into income",
  },
  {
    icon: Globe,
    title: "Help global community",
    description: "Connect people across borders and cultures",
  },
]

const senderBenefits = [
  {
    icon: Clock,
    title: "Faster delivery",
    description: "Skip traditional shipping delays and customs",
  },
  {
    icon: Shield,
    title: "More affordable",
    description: "Save up to 70% compared to courier services",
  },
]

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Benefits for Everyone
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you're traveling or sending, ChipShip creates value for both
            sides
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Travelers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                For Travelers
              </h3>
              <p className="text-teal-600 dark:text-teal-400 font-semibold">
                Monetize your unused luggage space
              </p>
            </div>

            <div className="space-y-6">
              {travelerBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Senders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                For Senders
              </h3>
              <p className="text-teal-600 dark:text-teal-400 font-semibold">
                Ship faster and cheaper than traditional couriers
              </p>
            </div>

            <div className="space-y-6">
              {senderBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
