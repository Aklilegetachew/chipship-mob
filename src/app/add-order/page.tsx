"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DollarSign, CreditCard, Package } from "lucide-react"

import OrderHeaderStepper from "@/components/OrderHeaderStepper"
import StepOneForm from "@/components/StepOneForm"
import StepTwoProduct from "@/components/StepTwoProduct"
import Step3Confirmation from "@/components/StepThreeConfirm"
import axiosClient from "@/lib/axiosClient"
import { useToast } from "@/context/ToastContext"
import { useCalculatePrice } from "../queries/payment/payment.query"
import { MobileHeader } from "@/components/app-header"
import { MobileFooter } from "@/components/app-footer"
interface FormData {
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

type Item = {
  type: string
  description: string
  weight: number
}

type Step2Data = {
  items: Item[]
  shippingType: "FAST" | "MEDIUM" | ""
}

type Step3DataType = {
  paymentMethod: "PAYPAL" | "CASH" | "STRIPE" | ""
}

type FinalOrderDataType = FormData & Step2Data & Step3DataType

export default function NewOrderPage() {
  const [step, setStep] = useState(1)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }
  const [step1Data, setStep1Data] = useState<FormData>({
    sender: { name: "", phone: "", address: "", country: "" },
    receiver: { name: "", phone: "", address: "", country: "" },
  })

  const [step2Data, setStep2Data] = useState<Step2Data>({
    items: [],
    shippingType: "",
  })
  const [step3Data, setStep3Data] = useState<Step3DataType>({
    paymentMethod: "",
  })
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }
  const { data: totalPrice, isLoading: loadingPrice } = useCalculatePrice(
    step2Data.items,
    step2Data.items.length > 0
  )
  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)
  const { showSuccess, showError } = useToast()

  const paymentMethods = [
    { name: "Case on Delivery", icon: DollarSign, selected: true },
    { name: "Visa/Mastercard/JCB", icon: CreditCard, selected: false },
    { name: "PayPal", icon: Package, selected: false },
  ]

  const handleSubmitOrder = async (finalOrder: FinalOrderDataType) => {
    try {
      const payload = {
        sender: finalOrder.sender,
        recipient: finalOrder.receiver,
        packageDetails: {
          description: finalOrder.items.map((item) => item.type).join(", "),
          weight: finalOrder.items.reduce((acc, item) => acc + item.weight, 0),
        },
        shipmentType: finalOrder.shippingType,
        paymentMethod: finalOrder.paymentMethod,
        termsAccepted: true,
        items: finalOrder.items,
      }
      console.log("Submitting order with payload:", payload)
      const res = await axiosClient.post("/order", payload)

      console.log("Shipment created:", payload)

      showSuccess("Order submitted successfully!")
    } catch (error) {
      console.error("Error submitting order:", error)
      showError("Failed to submit order. Please try again.")
    }
  }

  return (
    <div className="min-h-screen  bg-slate-50 text-slate-900 flex flex-col overflow-hidden">
      <MobileHeader />
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="w-full px-4 py-3 sm:px-6 sm:py-4">
          <OrderHeaderStepper
            step={step}
            maxCompletedStep={step} // user can click only completed/current steps
            onStepClick={(target) => setStep(target)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="w-full min-h-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full"
              >
                <StepOneForm
                  initialData={step1Data}
                  onNext={(data) => {
                    console.log("Step 1 data:", data)
                    setStep1Data(data)
                    handleNext()
                  }}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full"
              >
                <StepTwoProduct
                  savedData={step2Data}
                  onNext={(data) => {
                    setStep2Data(data)
                    setStep(3)
                  }}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full"
              >
                <Step3Confirmation
                  step1Data={step1Data}
                  step2Data={step2Data}
                  data={step3Data}
                  totalPrice={totalPrice}
                  loadingPrice={loadingPrice}
                  onSubmit={(data) => {
                    const finalOrder: FinalOrderDataType = {
                      ...step1Data,
                      ...step2Data,
                      ...data,
                    }
                    console.log("Final Order Data:", finalOrder)
                    handleSubmitOrder(finalOrder)
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <MobileFooter />
    </div>
  )
}
