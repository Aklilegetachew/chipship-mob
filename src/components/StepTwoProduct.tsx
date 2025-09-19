"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Trash2, Package, Truck, ArrowRight } from "lucide-react"
import { useCalculatePrice } from "@/app/queries/payment/payment.query"

export type Item = {
  type: string
  description: string
  weight: number
}

export type ShippingType = "FAST" | "MEDIUM" | ""

export type Step2Data = {
  items: Item[]
  shippingType: ShippingType
}

interface StepTwoProductProps {
  savedData: Step2Data
  onNext: (data: Step2Data) => void
}

export default function StepTwoProduct({
  savedData,
  onNext,
}: StepTwoProductProps) {
  const [items, setItems] = useState<Item[]>(savedData.items || [])
  const [shippingType, setShippingType] = useState<ShippingType>(
    savedData.shippingType || ""
  )

  const itemTypes = [
    { name: "general" },
    { name: "fragile" },
    { name: "electronics" },
    { name: "valuable" },
    { name: "bulky" },
    { name: "perishable" },
  ]

  function handleAddItem(type: string) {
    if (items.length >= 6) return alert("You can only add up to 6 items.")
    setItems([...items, { type, description: "", weight: 0 }])
  }

  function handleChangeItem(
    index: number,
    field: keyof Item,
    value: string | number
  ) {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    setItems(updated)
  }

  function handleSubmit() {
    if (!shippingType) return alert("Please select a shipping type.")
    onNext({ items, shippingType })
  }

  const { data: totalPrice, isLoading: loadingPrice } = useCalculatePrice(
    items,
    items.length > 0
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <motion.div
          className="p-4 sm:p-6 pb-24 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                Choose Item Types
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {itemTypes.map(({ name }) => (
                <Button
                  key={name}
                  variant="outline"
                  className="h-12 text-sm rounded-xl border-2 border-slate-200 hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 font-medium bg-white active:scale-95"
                  onClick={() => handleAddItem(name)}
                >
                  {name}
                </Button>
              ))}
            </div>
            {items.length > 0 && (
              <p className="text-sm text-slate-500 mt-4 text-center">
                {items.length}/6 items added
              </p>
            )}
          </div>

          {items.length > 0 && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">
                Item Details
              </h3>
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4"
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
                        onClick={() =>
                          setItems(items.filter((_, i) => i !== idx))
                        }
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 h-8 w-8 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          placeholder="Enter item description..."
                          value={item.description}
                          onChange={(e) =>
                            handleChangeItem(idx, "description", e.target.value)
                          }
                          className="w-full px-3 py-3 text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          placeholder="0.0"
                          value={item.weight || ""}
                          onChange={(e) =>
                            handleChangeItem(
                              idx,
                              "weight",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-3 text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                Select Shipping Type
              </h3>
            </div>
            <div className="space-y-3">
              <label className="relative block">
                <input
                  type="radio"
                  name="shipping"
                  value="FAST"
                  checked={shippingType === "FAST"}
                  onChange={() => setShippingType("FAST")}
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    shippingType === "FAST"
                      ? "border-teal-600 bg-teal-50 ring-2 ring-teal-200"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">
                        Fast Express
                      </h4>
                      <p className="text-sm text-slate-600">
                        2–3 days delivery
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        shippingType === "FAST"
                          ? "border-teal-600 bg-teal-600"
                          : "border-slate-300"
                      }`}
                    >
                      {shippingType === "FAST" && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              </label>
              <label className="relative block">
                <input
                  type="radio"
                  name="shipping"
                  value="MEDIUM"
                  checked={shippingType === "MEDIUM"}
                  onChange={() => setShippingType("MEDIUM")}
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    shippingType === "MEDIUM"
                      ? "border-teal-600 bg-teal-50 ring-2 ring-teal-200"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">
                        Standard
                      </h4>
                      <p className="text-sm text-slate-600">
                        6–7 days delivery
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        shippingType === "MEDIUM"
                          ? "border-teal-600 bg-teal-600"
                          : "border-slate-300"
                      }`}
                    >
                      {shippingType === "MEDIUM" && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-teal-100 border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-teal-700 uppercase tracking-wide">
                    Total Amount
                  </p>
                  <p className="text-xs text-teal-600">
                    Estimated shipping cost
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-teal-900">
                  {loadingPrice ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full"></div>
                      <span className="text-lg">Calculating...</span>
                    </div>
                  ) : (
                    `$${totalPrice || 0.0}`
                  )}
                </div>
                {!loadingPrice && totalPrice && (
                  <p className="text-sm text-teal-600 font-medium">
                    Final price
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="sticky bottom-20 left-0 right-0 bg-white border-t border-slate-200 p-4 sm:p-6 shadow-lg safe-area-inset-bottom mb-20 md:mb-0">
        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-lg py-4 text-base font-semibold rounded-2xl transition-all duration-200 active:scale-95"
          onClick={handleSubmit}
        >
          <ArrowRight className="h-5 w-5 mr-2" />
          Continue to Confirmation
        </Button>
      </div>
    </div>
  )
}
