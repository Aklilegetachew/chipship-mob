import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, FileText, ListTodo, PlusCircle } from "lucide-react";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

interface OrderHeaderStepperProps {
    step: number;
    onBack: () => void;
}

const OrderHeaderStepper: React.FC<OrderHeaderStepperProps> = ({ step, onBack }) => {
    return (
        <>
            {/* Header */}
            <motion.header className="flex items-center mb-8" variants={itemVariants}>
                <button
                    type="button"
                    onClick={onBack}
                    disabled={step === 1}
                    className="text-text-dark hover:text-icon-gray flex items-center"
                    aria-label="Back"
                >
                    <ArrowLeft className="h-6 w-6 mr-2" />
                    <span className="text-lg font-medium">Back</span>
                </button>
            </motion.header>

            {/* Progress Stepper */}
            <motion.div className="flex items-center justify-between mb-8" variants={itemVariants}>
                {[1, 2, 3].map((num) => (
                    <div key={num} className="flex flex-col items-center flex-1">
                        <div
                            className={`relative flex items-center justify-center w-16 h-16 rounded-full mb-2 ${step >= num
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
        </>
    );
};

export default OrderHeaderStepper;
