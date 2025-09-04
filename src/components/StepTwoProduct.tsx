"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Trash2, Package, Truck } from "lucide-react"

export type Item = {
  type: string
  description: string
  weight: number
}

export type ShippingType = "fast" | "medium" | ""

export type Step2Data = {
  items: Item[]
  shippingType: ShippingType
}

interface StepTwoProductProps {
  savedData: Step2Data
  onNext: (data: Step2Data) => void
}

export default function StepTwoProduct({ savedData, onNext }: StepTwoProductProps) {
  const [items, setItems] = useState<Item[]>(savedData.items || [])
  const [shippingType, setShippingType] = useState<ShippingType>(savedData.shippingType || "")

  const itemTypes = [
    { name: "Book" },
    { name: "Goods" },
    { name: "Cosmetics" },
    { name: "Electronic" },
    { name: "Medicine" },
    { name: "Computer" },
    { name: "Smartphone" },
    { name: "other" },
  ]

  function handleAddItem(type: string) {
    if (items.length >= 6) return alert("You can only add up to 6 items.")
    setItems([...items, { type, description: "", weight: 0 }])
  }

  function handleChangeItem(index: number, field: keyof Item, value: string | number) {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    setItems(updated)
  }

  function handleSubmit() {
    if (!shippingType) return alert("Please select a shipping type.")
    onNext({ items, shippingType })
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Add Your Items</h2>
        <p className="text-gray-600">Select item types and provide details for shipping</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-900">Choose Item Types</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {itemTypes.map(({ name }) => (
            <Button
              key={name}
              variant="outline"
              className="h-12 rounded-lg border-2 border-gray-200 hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 font-medium bg-transparent"
              onClick={() => handleAddItem(name)}
            >
              {name}
            </Button>
          ))}
        </div>
        {items.length > 0 && <p className="text-sm text-gray-500">{items.length}/6 items added</p>}
      </div>

      {items.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
          <div className="space-y-3">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                    {item.type}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setItems(items.filter((_, i) => i !== idx))}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      type="text"
                      placeholder="Enter item description..."
                      value={item.description}
                      onChange={(e) => handleChangeItem(idx, "description", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="0.0"
                      value={item.weight || ""}
                      onChange={(e) => handleChangeItem(idx, "weight", Number.parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-900">Select Shipping Type</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="relative">
            <input
              type="radio"
              name="shipping"
              value="fast"
              checked={shippingType === "fast"}
              onChange={() => setShippingType("fast")}
              className="sr-only"
            />
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                shippingType === "fast"
                  ? "border-teal-600 bg-teal-50 ring-2 ring-teal-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Fast Express</h4>
                  <p className="text-sm text-gray-600">2–3 days delivery</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    shippingType === "fast" ? "border-teal-600 bg-teal-600" : "border-gray-300"
                  }`}
                >
                  {shippingType === "fast" && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                </div>
              </div>
            </div>
          </label>
          <label className="relative">
            <input
              type="radio"
              name="shipping"
              value="medium"
              checked={shippingType === "medium"}
              onChange={() => setShippingType("medium")}
              className="sr-only"
            />
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                shippingType === "medium"
                  ? "border-teal-600 bg-teal-50 ring-2 ring-teal-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Standard</h4>
                  <p className="text-sm text-gray-600">6–7 days delivery</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    shippingType === "medium" ? "border-teal-600 bg-teal-600" : "border-gray-300"
                  }`}
                >
                  {shippingType === "medium" && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <Button
        className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        onClick={handleSubmit}
      >
        Continue to Next Step
      </Button>
    </motion.div>
  )
}
