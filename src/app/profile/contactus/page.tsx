import Link from "next/link"
import { ArrowLeft, ChevronRight, Mail, Phone } from "lucide-react"

export default function ContactUs() {
  const faqs = [
    {
      question: "How does ChipShip work?",
      answer:
        "ChipShip connects people who need to send items with travelers who have extra luggage space. Simply post your shipment request or browse available trips to find a match.",
    },
    {
      question: "What items can I ship?",
      answer:
        "You can ship most personal items, documents, small electronics, and gifts. Prohibited items include illegal substances, weapons, perishables without proper packaging, and hazardous materials.",
    },
    {
      question: "How do I get paid?",
      answer:
        "Travelers receive payment through our secure platform once the item is successfully delivered and confirmed by the recipient. Payments are processed within 24-48 hours.",
    },
    {
      question: "What if my item is lost or damaged?",
      answer:
        "While ChipShip facilitates connections, users are responsible for their items. We recommend purchasing insurance for valuable items and communicating clearly with your traveler about handling requirements.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/profile" className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Contact Us</h1>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* FAQ Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="p-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Contact Support */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Contact Support
            </h2>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a
                    href="mailto:support@chipship.com"
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    support@chipship.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <a
                    href="tel:+15551234567"
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Support Hours
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
