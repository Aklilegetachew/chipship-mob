"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ListTodo,
  PlusCircle,
  FileText,
  MapPin,
  Pencil,
  Clock,
  DollarSign,
  CreditCard,
  Package,
  Book,
  ShoppingBag,
  Palette,
  Laptop,
  Pill,
  Smartphone,
  CheckCircle,
  Circle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import OrderHeaderStepper from "@/components/OrderHeaderStepper"
import StepOneForm from "@/components/StepOneForm"
import StepTwoProduct from "@/components/StepTwoProduct"
import Step3Confirmation from "@/components/StepThreeConfirm"
import axiosClient from "@/lib/axiosClient"
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
  shippingType: "fast" | "medium" | ""
}

type Step3DataType = {
  paymentMethod: "paypal" | "cash" | "stripe" | ""
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

  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  const itemTypes = [
    { name: "Book", icon: Book },
    { name: "Goods", icon: ShoppingBag },
    { name: "Cosmetics", icon: Palette },
    { name: "Electronic", icon: Laptop },
    { name: "Medicine", icon: Pill },
    { name: "Computer", icon: Laptop },
    { name: "Smartphone", icon: Smartphone },
  ]

  const paymentMethods = [
    { name: "Case on Delivery", icon: DollarSign, selected: true },
    { name: "Visa/Mastercard/JCB", icon: CreditCard, selected: false },
    { name: "PayPal", icon: Package, selected: false },
  ]

  const handleSubmitOrder = async (finalOrder: FinalOrderDataType) => {
    try {
      // Your backend expects keys:
      // sender, recipient (you called receiver on frontend), packageDetails, shipmentType, paymentMethod, termsAccepted
      // So transform finalOrder accordingly:

      const payload = {
        sender: finalOrder.sender,
        recipient: finalOrder.receiver, // rename receiver -> recipient for backend
        packageDetails: {
          description: finalOrder.items.map((item) => item.type).join(", "), // or a better description if you want
          weight: finalOrder.items.reduce((acc, item) => acc + item.weight, 0), // total weight
          // optionally dimensions can be added if available
        },
        shipmentType: finalOrder.shippingType, // fast, medium (make sure backend accepts these values; you have urgent, fast, mid)
        paymentMethod: finalOrder.paymentMethod, // cash, paypal, stripe (make sure backend accepts these)
        termsAccepted: true, // assuming terms accepted in step 3 or earlier
        items: finalOrder.items, // if you want to send raw items array, you might need to add this field in your backend schema
      }

      const res = await axiosClient.post("/orders", payload)

      console.log("Shipment created:", res.data)
      alert("Order submitted successfully!")

      // Optionally reset the form or redirect the user
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("Failed to submit order. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-page-background text-text-dark p-4 md:p-6 lg:p-8 flex flex-col">
      <OrderHeaderStepper step={step} onBack={handleBack} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col flex-grow"
          >
            <StepOneForm
              onNext={(data) => {
                console.log("Step 1 data:", data)
                setStep1Data(data)
                handleNext()
              }}
            />
          </motion.div>
        )}

        {step === 2 && (
          <StepTwoProduct
            savedData={step2Data}
            onNext={(data) => {
              setStep2Data(data)
              setStep(3)
            }}
          />
        )}

        {step === 3 && (
          <Step3Confirmation
            step1Data={step1Data}
            step2Data={step2Data}
            data={step3Data}
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
        )}
      </AnimatePresence>
    </div>
  )
}
