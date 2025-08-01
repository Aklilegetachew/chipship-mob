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

  return (
    <div className="min-h-screen bg-page-background text-text-dark p-4 md:p-6 lg:p-8 flex flex-col">
      {/* Header */}
      <motion.header className="flex items-center mb-8" variants={itemVariants}>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          disabled={step === 1}
          className="text-text-dark hover:text-icon-gray"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="sr-only">Back</span>
        </Button>
        <span className="text-lg font-medium ml-2">Back</span>
      </motion.header>

      {/* Progress Stepper */}
      <motion.div
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex flex-col items-center flex-1">
            <div
              className={`relative flex items-center justify-center w-16 h-16 rounded-full mb-2 ${
                step >= num
                  ? "bg-teal-800 text-white"
                  : "bg-stepper-inactive-bg text-stepper-inactive-text"
              }`}
            >
              {num === 1 && <ListTodo className="h-8 w-8" />}
              {num === 2 && <PlusCircle className="h-8 w-8" />}
              {num === 3 && <FileText className="h-8 w-8" />}
            </div>
            <span className="text-sm font-medium text-center text-text-dark">
              STEP {num}
              <br />
              {num === 1 && "Basic Details"}
              {num === 2 && "Information"}
              {num === 3 && "Confirmation"}
            </span>
          </div>
        ))}
      </motion.div>

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
            {/* Sender Details */}
            <motion.h2
              className="text-xl font-bold text-text-dark mb-4"
              variants={itemVariants}
            >
              Sender details
            </motion.h2>
            <motion.div
              className="bg-card-light rounded-2xl shadow-md p-6 mb-6"
              variants={itemVariants}
            >
              <Input
                type="text"
                placeholder="Enter sender name"
                className="mb-4 bg-input-light border-none text-text-dark placeholder:text-text-light-gray"
              />
              <Input
                type="tel"
                placeholder="Enter sender phone"
                className="mb-4 bg-input-light border-none text-text-dark placeholder:text-text-light-gray"
              />
              <Input
                type="text"
                placeholder="Sender remarks"
                className="bg-input-light border-none text-text-dark placeholder:text-text-light-gray"
              />
            </motion.div>

            {/* Receiver Details */}
            <motion.h2
              className="text-xl font-bold text-text-dark mb-4"
              variants={itemVariants}
            >
              Receiver details
            </motion.h2>
            <motion.div
              className="bg-card-light rounded-2xl shadow-md p-6 mb-6"
              variants={itemVariants}
            >
              <Input
                type="text"
                placeholder="Enter receiver name"
                className="mb-4 bg-input-light border-none text-text-dark placeholder:text-text-light-gray"
              />
              <Input
                type="tel"
                placeholder="Enter receiver phone"
                className="mb-4 bg-input-light border-none text-text-dark placeholder:text-text-light-gray"
              />
              <Input
                type="text"
                placeholder="Sender remarks"
                className="bg-input-light border-none text-text-dark placeholder:text-text-light-gray"
              />
              <div className="flex justify-end text-text-light-gray text-sm mt-2">
                Save for later
              </div>
            </motion.div>

            {/* Choose Type */}
            <motion.h2
              className="text-xl font-bold text-text-dark mb-4"
              variants={itemVariants}
            >
              Choose type
            </motion.h2>
            <motion.div
              className="grid grid-cols-3 gap-3 mb-6"
              variants={itemVariants}
            >
              {itemTypes.map(({ name, icon: Icon }) => (
                <Button
                  key={name}
                  variant="outline"
                  className="bg-card-light text-text-dark border-border-light hover:bg-gray-100 rounded-full px-4 py-2 text-sm"
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {name}
                </Button>
              ))}
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
              className="flex justify-between items-center bg-card-light rounded-t-2xl p-4 mt-auto shadow-lg"
              variants={itemVariants}
            >
              <div>
                <p className="text-sm text-text-light-gray">
                  Total (incl. VAT)
                </p>
                <p className="text-2xl font-bold text-primary-green">$2.00</p>
              </div>
              <Button
                className="bg-teal-800 text-white rounded-full px-8 py-4 text-base font-semibold hover:bg-teal-400-hover"
                onClick={handleNext}
              >
                Process Next
              </Button>
            </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col flex-grow"
          >
            {/* Address Details Section */}
            <motion.h2
              className="text-xl font-bold text-text-dark mb-4"
              variants={itemVariants}
            >
              Address details
            </motion.h2>
            <motion.div
              className="bg-card-light text-text-dark rounded-2xl shadow-md p-6 mb-6"
              variants={itemVariants}
            >
              <div className="flex relative pb-6">
                <div className="flex flex-col items-center mr-4">
                  <MapPin className="h-6 w-6 text-teal-400" />
                  <div className="border-l-2 border-dashed border-border-light h-full my-2"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Collect from
                      </h3>
                      <p className="text-icon-gray text-sm mb-2">
                        Sender address
                      </p>
                      <p className="text-text-dark text-base">
                        Kilometer 6, 278H, Street 201R, Kroalkor Village,
                        Unnamed Road, Phnom Penh
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-icon-gray hover:text-text-dark"
                    >
                      <Pencil className="h-5 w-5" />
                      <span className="sr-only">Edit sender address</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex relative">
                <div className="flex flex-col items-center mr-4">
                  <MapPin className="h-6 w-6 text-teal-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Delivery to
                      </h3>
                      <p className="text-icon-gray text-sm mb-2">
                        Receiver address
                      </p>
                      <p className="text-text-dark text-base">
                        2nd Floor 01, 25 Mao Tse Toung Blvd (245), Phnom Penh
                        12302, Cambodia
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-icon-gray hover:text-text-dark"
                    >
                      <Pencil className="h-5 w-5" />
                      <span className="sr-only">Edit receiver address</span>
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-6 w-full bg-input-light text-primary-green border-teal-400 rounded-full px-6 py-3 text-base font-semibold hover:bg-gray-200"
              >
                <Clock className="h-5 w-5 mr-2" />
                Take around 20 min
              </Button>
            </motion.div>

            {/* Payment Method Section */}
            <motion.h2
              className="text-xl font-bold text-text-dark mb-4"
              variants={itemVariants}
            >
              Payment method
            </motion.h2>
            <motion.div
              className="bg-card-light rounded-2xl shadow-md p-6 mb-6"
              variants={itemVariants}
            >
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="flex items-center justify-between py-3 border-b border-border-medium last:border-b-0"
                >
                  <div className="flex items-center">
                    {method.icon && (
                      <method.icon className="h-6 w-6 mr-3 text-icon-gray" />
                    )}
                    <span className="text-lg font-medium text-text-dark">
                      {method.name}
                    </span>
                  </div>
                  {method.selected ? (
                    <CheckCircle className="h-6 w-6 text-primary-green" />
                  ) : (
                    <Circle className="h-6 w-6 text-icon-gray" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Order Summary Section */}
            <motion.h2
              className="text-xl font-bold text-text-dark mb-4"
              variants={itemVariants}
            >
              Order summary
            </motion.h2>
            <motion.div
              className="bg-card-light rounded-2xl shadow-md p-6 mb-6"
              variants={itemVariants}
            >
              <div className="flex justify-between mb-2">
                <span className="text-icon-gray">Size</span>
                <span className="text-text-dark">20 cm</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-icon-gray">Type</span>
                <span className="text-text-dark">Cosmetic</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-icon-gray">Collect time</span>
                <span className="text-text-dark">Express</span>
              </div>
              <div className="flex justify-between">
                <span className="text-icon-gray">Delivery</span>
                <span className="text-text-dark">$2.00</span>
              </div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
              className="flex justify-between items-center bg-card-light rounded-t-2xl p-4 mt-auto shadow-lg"
              variants={itemVariants}
            >
              <div>
                <p className="text-sm text-text-light-gray">
                  Total (incl. VAT)
                </p>
                <p className="text-2xl font-bold text-primary-green">$2.00</p>
              </div>
              <Button
                className="bg-teal-800 text-white rounded-full px-8 py-4 text-base font-semibold hover:bg-primary-green-hover"
                onClick={() => alert("Order Submitted!")} // Placeholder for submit action
              >
                Submit
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
