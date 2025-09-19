"use client"

import type React from "react"
import { useMemo, useState } from "react"
import {
  CheckCircle2,
  CreditCard,
  HandCoins,
  MapPin,
  Package,
  Rocket,
  Scale,
  Truck,
  User,
  WalletCards,
  ArrowLeft,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge as UIBadge } from "@/components/ui/badge"

// Types from your original component
type Item = {
  type: string
  description: string
  weight: number
}

type Step2DataType = {
  items: Item[]
  shippingType: "FAST" | "MEDIUM" | ""
}

interface Step1DataType {
  sender: {
    name: string
    phone: string
    address: string
    country: string
  }
  receiver: {
    name: string
    phone: string
    address: string
    country: string
  }
}

type Step3DataType = {
  paymentMethod: "PAYPAL" | "CASH" | "STRIPE" | ""
}

type FinalOrderDataType = Step1DataType & Step2DataType & Step3DataType

interface Step3Props {
  step1Data: Step1DataType
  step2Data: Step2DataType
  data: Step3DataType
  totalPrice: string | number | undefined
  loadingPrice: boolean
  onSubmit: (data: FinalOrderDataType) => void
  onBack?: () => void
}

const paymentMethods: {
  key: Step3DataType["paymentMethod"]
  label: string
  description: string
  icon: React.ElementType
}[] = [
  {
    key: "PAYPAL",
    label: "PayPal",
    description: "Fast and secure checkout",
    icon: WalletCards,
  },
  {
    key: "STRIPE",
    label: "Card (Stripe)",
    description: "Pay with debit/credit card",
    icon: CreditCard,
  },
  {
    key: "CASH",
    label: "Cash",
    description: "Pay on delivery",
    icon: HandCoins,
  },
]

function ShippingBadge({
  shippingType,
}: {
  shippingType: Step2DataType["shippingType"]
}) {
  if (shippingType === "FAST") {
    return (
      <UIBadge className="gap-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm hover:from-teal-600 hover:to-emerald-600 transition-all duration-200">
        <Rocket className="h-3.5 w-3.5" />
        {"FAST"}
      </UIBadge>
    )
  }
  if (shippingType === "MEDIUM") {
    return (
      <UIBadge
        variant="secondary"
        className="gap-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200"
      >
        <Truck className="h-3.5 w-3.5" />
        {"Standard"}
      </UIBadge>
    )
  }
  return <span className="text-muted-foreground">Not selected</span>
}

export default function Step3({
  step1Data,
  step2Data,
  data,
  totalPrice,
  loadingPrice,
  onSubmit,
  onBack,
}: Step3Props) {
  const [paymentMethod, setPaymentMethod] = useState<
    Step3DataType["paymentMethod"]
  >(data.paymentMethod)

  const totalItems = step2Data.items.length
  const totalWeight = useMemo(
    () =>
      step2Data.items.reduce(
        (sum, item) => sum + (Number.isFinite(item.weight) ? item.weight : 0),
        0
      ),
    [step2Data.items]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentMethod) return
    onSubmit({
      ...step1Data,
      ...step2Data,
      paymentMethod,
    })
  }

  return (
    <div className="flex flex-col h-full">
    

      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100 px-4 py-6 sm:px-6">
        <div className="text-center">
          <div className="text-sm font-medium text-teal-700 mb-1">
            Total Amount
          </div>
          <div className="flex items-center justify-center gap-2">
            {loadingPrice ? (
              <div className="flex items-center gap-2 text-teal-600">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-teal-600 border-t-transparent"></div>
                <span className="text-xl font-semibold">Calculating...</span>
              </div>
            ) : (
              <>
                <CreditCard className="h-6 w-6 text-teal-600" />
                <span className="text-3xl font-bold text-teal-900">
                  ${totalPrice || "0.00"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 pb-24 space-y-6">
          <section aria-labelledby="address-details" className="space-y-4">
            <div className="space-y-4">
              {/* From Address */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <User className="h-3 w-3" />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">From</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-slate-900 break-words">
                    {step1Data.sender.name}
                  </div>
                  <div className="text-slate-600 break-all">
                    {step1Data.sender.phone}
                  </div>
                  <div className="text-slate-600 leading-relaxed break-words">
                    {step1Data.sender.address}
                  </div>
                  <div className="text-slate-600">
                    {step1Data.sender.country}
                  </div>
                </div>
              </div>

              {/* To Address */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <User className="h-3 w-3" />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">To</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-slate-900 break-words">
                    {step1Data.receiver.name}
                  </div>
                  <div className="text-slate-600 break-all">
                    {step1Data.receiver.phone}
                  </div>
                  <div className="text-slate-600 leading-relaxed break-words">
                    {step1Data.receiver.address}
                  </div>
                  <div className="text-slate-600">
                    {step1Data.receiver.country}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="bg-slate-200" />

          <section aria-labelledby="items-and-shipping" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                  <Package className="h-4 w-4" />
                </div>
                <h3
                  id="items-and-shipping"
                  className="text-lg sm:text-xl font-bold text-slate-800"
                >
                  Package
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1">
                  <Package className="h-3 w-3 text-slate-500" />
                  <span className="text-xs font-medium text-slate-700">
                    {totalItems}
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1">
                  <Scale className="h-3 w-3 text-slate-500" />
                  <span className="text-xs font-medium text-slate-700">
                    {totalWeight.toFixed(1)}kg
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              {step2Data.items.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  <Package className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                  <p className="text-sm">No items added yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {step2Data.items.map((item, idx) => (
                    <div key={idx} className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 flex-shrink-0">
                          <Package className="h-5 w-5 text-slate-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-slate-900 text-sm break-words">
                            {item.type}
                          </div>
                          <div className="text-xs text-slate-600 mt-1 break-words">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pl-13">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Scale className="h-3 w-3" />
                          <span>{item.weight} kg</span>
                        </div>
                        <ShippingBadge shippingType={step2Data.shippingType} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <Separator className="bg-slate-200" />

          <section aria-labelledby="payment-method" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                <CreditCard className="h-4 w-4" />
              </div>
              <h3
                id="payment-method"
                className="text-lg sm:text-xl font-bold text-slate-800"
              >
                Payment Method
              </h3>
            </div>

            <RadioGroup
              value={paymentMethod}
              onValueChange={(v) =>
                setPaymentMethod(v as Step3DataType["paymentMethod"])
              }
              className="space-y-3"
            >
              <span className="sr-only">Payment methods</span>
              {paymentMethods.map(({ key, label, description, icon: Icon }) => {
                const id = `pay-${key}`
                return (
                  <div key={key} className="relative">
                    <RadioGroupItem
                      id={id}
                      value={key}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={id}
                      className="group flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-md peer-data-[state=checked]:border-teal-500 peer-data-[state=checked]:bg-teal-50 peer-data-[state=checked]:shadow-lg min-h-[60px]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-slate-200 peer-data-[state=checked]:bg-teal-100 flex-shrink-0">
                        <Icon className="h-5 w-5 text-slate-600 peer-data-[state=checked]:text-teal-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-900 text-base">
                          {label}
                        </div>
                        <div className="text-sm text-slate-600 mt-0.5 break-words">
                          {description}
                        </div>
                      </div>
                      <div className="opacity-0 transition-opacity peer-data-[state=checked]:opacity-100">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                      </div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </section>
        </form>
      </div>

      <div className="sticky bottom-20 left-0 right-0 bg-white border-t border-slate-200 p-4 sm:p-6 shadow-lg safe-area-inset-bottom">
        <div className="flex flex-col gap-3 sm:flex-row-reverse sm:justify-between">
          <Button
            type="submit"
            disabled={!paymentMethod}
            className="group bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg hover:from-teal-700 hover:to-teal-800 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto text-base font-semibold rounded-2xl py-4 active:scale-95"
            onClick={handleSubmit}
          >
            <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            Complete Order
          </Button>
          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="group border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 w-full sm:w-auto text-base font-medium rounded-2xl py-4 active:scale-95"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
