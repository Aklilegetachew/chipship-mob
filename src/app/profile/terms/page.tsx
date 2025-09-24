import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/profile" className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">
            Terms of Service
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to ChipShip! These Terms of Service govern your use of our
              platform and services. By accessing or using ChipShip, you agree
              to be bound by these terms. If you do not agree to these terms,
              please do not use our services.
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Services</h2>
            <p className="text-gray-600 leading-relaxed">
              ChipShip provides a platform that connects individuals who need to
              send items (Senders) with travelers who have extra space
              (Travelers). We facilitate the connection and provide tools for
              communication and payment, but we are not responsible for the
              actual shipping or delivery of items.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              User Responsibilities
            </h2>
            <p className="text-gray-600 leading-relaxed">
              As a user of ChipShip, you agree to provide accurate information,
              communicate respectfully, and comply with all applicable laws and
              regulations. Senders are responsible for packaging their items
              appropriately, and Travelers are responsible for handling items
              with care. Both parties must adhere to agreed-upon terms for
              shipping and delivery.
            </p>
          </section>

          {/* Prohibited Items */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Prohibited Items
            </h2>
            <div className="space-y-3 text-gray-600">
              <p className="leading-relaxed">
                The following items are strictly prohibited on our platform:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-text-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Illegal substances or contraband</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-text-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Weapons, explosives, or dangerous materials</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-text-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Perishable items without proper packaging</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-text-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Items exceeding weight or size restrictions</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              ChipShip acts as an intermediary platform and is not liable for
              lost, damaged, or delayed items. Users engage with each other at
              their own risk and are responsible for their own insurance and
              protection of valuable items.
            </p>
          </section>

          {/* Contact */}
          <section className="pb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about these Terms of Service, please contact
              us at{" "}
              <span className="text-green-600 font-medium">
                support@chipship.com
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
