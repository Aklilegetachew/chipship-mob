import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export type Item = {
    type: string;
    description: string;
    weight: number;
};

export type ShippingType = "fast" | "medium" | "";

export type Step2Data = {
    items: Item[];
    shippingType: ShippingType;
};

interface StepTwoProductProps {
    savedData: Step2Data;
    onNext: (data: Step2Data) => void;
}

export default function StepTwoProduct({ savedData, onNext }: StepTwoProductProps) {
    const [items, setItems] = useState<Item[]>(savedData.items || []);
    const [shippingType, setShippingType] = useState<ShippingType>(savedData.shippingType || "");

    const itemTypes = [
        { name: "Book" },
        { name: "Goods" },
        { name: "Cosmetics" },
        { name: "Electronic" },
        { name: "Medicine" },
        { name: "Computer" },
        { name: "Smartphone" },
    ];

    function handleAddItem(type: string) {
        if (items.length >= 6) return alert("You can only add up to 6 items.");
        setItems([...items, { type, description: "", weight: 0 }]);
    }

    function handleChangeItem(index: number, field: keyof Item, value: string | number) {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        setItems(updated);
    }

    function handleSubmit() {
        if (!shippingType) return alert("Please select a shipping type.");
        onNext({ items, shippingType });
    }

    return (
        <motion.div className="p-4">
            {/* Item Selection */}
            <h2 className="text-xl font-bold mb-4">Choose Type</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
                {itemTypes.map(({ name }) => (
                    <Button
                        key={name}
                        variant="outline"
                        className="rounded-full px-4 py-2 text-sm"
                        onClick={() => handleAddItem(name)}
                    >
                        {name}
                    </Button>
                ))}
            </div>

            {/* Item Details */}
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-3 items-center">
                    <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleChangeItem(idx, "description", e.target.value)}
                        className="border p-2 rounded w-1/2"
                    />
                    <input
                        type="number"
                        placeholder="Weight (kg)"
                        value={item.weight}
                        onChange={(e) =>
                            handleChangeItem(idx, "weight", parseFloat(e.target.value))
                        }
                        className="border p-2 rounded w-1/4"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setItems(items.filter((_, i) => i !== idx));
                        }}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ))}


            {/* Shipping Type Selection */}
            <h3 className="text-lg font-semibold mt-6 mb-2">Select Shipping Type</h3>
            <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="shipping"
                        value="fast"
                        checked={shippingType === "fast"}
                        onChange={() => setShippingType("fast")}
                    />
                    Fast Express (2–3 days)
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="shipping"
                        value="medium"
                        checked={shippingType === "medium"}
                        onChange={() => setShippingType("medium")}
                    />
                    Medium (6–7 days)
                </label>
            </div>

            {/* Submit */}
            <Button
                className="mt-6 w-full bg-blue-500 text-white"
                onClick={handleSubmit}
            >
                Next Step
            </Button>
        </motion.div>
    );
}
