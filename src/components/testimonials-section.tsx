"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Nomad",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "I've made over $2,000 carrying packages during my travels. It's amazing how ChipShip turns my flights into income opportunities!",
  },
  {
    name: "Ahmed Hassan",
    role: "International Student",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Sending care packages home used to cost a fortune. ChipShip saved me 60% and my family got their items in just 3 days!",
  },
  {
    name: "Maria Rodriguez",
    role: "Business Traveler",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The verification process made me feel safe. I've helped 15 people send items and earned enough to upgrade my flights!",
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-16 lg:py-24 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-gray-800 dark:to-teal-950"
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
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real stories from travelers and senders around the world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
