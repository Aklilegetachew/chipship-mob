import React from "react"
import { motion, Variants } from "framer-motion"
import { FileText, ListTodo, PlusCircle } from "lucide-react"

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface OrderHeaderStepperProps {
  step: number
  onStepClick: (targetStep: number) => void
  maxCompletedStep: number // highest step the user can access
}

const OrderHeaderStepper: React.FC<OrderHeaderStepperProps> = ({
  step,
  onStepClick,
  maxCompletedStep,
}) => {
  const steps = [
    { num: 1, label: "Basic Details", icon: <ListTodo className="h-8 w-8" /> },
    { num: 2, label: "Information", icon: <PlusCircle className="h-8 w-8" /> },
    { num: 3, label: "Confirmation", icon: <FileText className="h-8 w-8" /> },
  ]

  return (
    <>
      <motion.div
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        {steps.map(({ num, label, icon }) => {
          const isActive = step === num
          const isClickable = num <= maxCompletedStep // only allow clicking completed/current steps
          return (
            <div
              key={num}
              className="flex flex-col items-center flex-1 cursor-pointer"
              onClick={() => isClickable && onStepClick(num)}
            >
              <div
                className={`relative flex items-center justify-center w-16 h-16 rounded-full mb-2 transition-colors
                  ${
                    isActive
                      ? "bg-teal-800 text-white"
                      : num <= maxCompletedStep
                      ? "bg-teal-200 text-teal-800"
                      : "bg-stepper-inactive-bg text-stepper-inactive-text"
                  }
                `}
              >
                {icon}
              </div>
              <span className="text-sm font-medium text-center text-text-dark">
                STEP {num}
                <br />
                {label}
              </span>
            </div>
          )
        })}
      </motion.div>
    </>
  )
}

export default OrderHeaderStepper
