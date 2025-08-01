"use client"

import { motion } from "framer-motion"
import { Shield, CreditCard, Star, UserCheck } from "lucide-react"

const trustFeatures = [
  {
    icon: UserCheck,
    title: "Verified Users",
    description:
      "All users go through identity verification and background checks",
  },
  {
    icon: CreditCard,
    title: "Secure Payment Escrow",
    description:
      "Payments are held securely until successful delivery confirmation",
  },
  {
    icon: Star,
    title: "Transparent Reviews",
    description:
      "Public rating system helps you choose trusted travelers and senders",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description:
      "All shipments are covered by comprehensive insurance protection",
  },
]

export function TrustSafetySection() {
  return (
    <section
      id="trust-safety"
      className="py-16 lg:py-24 bg-white dark:bg-gray-900"
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
            Trust & Safety First
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your security and peace of mind are our top priorities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group hover:bg-gray-50 dark:hover:bg-gray-800 p-6 rounded-2xl transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
