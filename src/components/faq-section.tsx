"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is this legal?",
    answer:
      "Yes, ChipShip operates within international shipping regulations. We ensure all items comply with customs laws and airline policies. Users are responsible for declaring items appropriately.",
  },
  {
    question: "What if something goes wrong?",
    answer:
      "We have comprehensive insurance coverage and a dedicated support team. Our escrow system protects payments, and we provide 24/7 customer support to resolve any issues quickly.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Payments are processed through our secure platform once delivery is confirmed. You can withdraw earnings to your bank account, PayPal, or digital wallet within 24-48 hours.",
  },
  {
    question: "What items can I send?",
    answer:
      "Most personal items, documents, small electronics, and gifts are allowed. Prohibited items include liquids, batteries, perishables, and anything restricted by airlines or customs.",
  },
  {
    question: "How is pricing determined?",
    answer:
      "Pricing is based on item size, weight, destination, and urgency. Our AI suggests fair market rates, but travelers and senders can negotiate the final price.",
  },
  {
    question: "What about customs and duties?",
    answer:
      "Senders are responsible for customs declarations and any duties. We provide guidance on proper documentation and connect you with customs experts when needed.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about using ChipShip
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
