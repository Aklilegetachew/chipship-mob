"use client"

import type React from "react"
import { useMemo, useState } from "react"
import {
    CheckCircle2,
    CreditCard,
    HandCoins,
    Landmark,
    MapPin,
    Package,
    Phone,
    Rocket,
    Scale,
    Truck,
    User,
    WalletCards,
    ArrowLeft,
    Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    shippingType: "fast" | "medium" | ""
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
    paymentMethod: "paypal" | "cash" | "stripe" | ""
}

type FinalOrderDataType = Step1DataType & Step2DataType & Step3DataType

interface Step3Props {
    step1Data: Step1DataType
    step2Data: Step2DataType
    data: Step3DataType
    onSubmit: (data: FinalOrderDataType) => void
    onBack?: () => void
}

const paymentMethods: {
    key: Step3DataType["paymentMethod"]
    label: string
    description: string
    icon: React.ElementType
}[] = [
        { key: "paypal", label: "PayPal", description: "Fast and secure checkout", icon: WalletCards },
        { key: "stripe", label: "Card (Stripe)", description: "Pay with debit/credit card", icon: CreditCard },
        { key: "cash", label: "Cash", description: "Pay on delivery", icon: HandCoins },
    ]

function ShippingBadge({ shippingType }: { shippingType: Step2DataType["shippingType"] }) {
    if (shippingType === "fast") {
        return (
            <UIBadge className="gap-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm hover:from-teal-600 hover:to-emerald-600 transition-all duration-200">
                <Rocket className="h-3.5 w-3.5" />
                {"Fast"}
            </UIBadge>
        )
    }
    if (shippingType === "medium") {
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

export default function Step3({ step1Data, step2Data, data, onSubmit, onBack }: Step3Props) {
    const [paymentMethod, setPaymentMethod] = useState<Step3DataType["paymentMethod"]>(data.paymentMethod)

    const totalItems = step2Data.items.length
    const totalWeight = useMemo(
        () => step2Data.items.reduce((sum, item) => sum + (Number.isFinite(item.weight) ? item.weight : 0), 0),
        [step2Data.items],
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50 py-4 sm:py-8">
            <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl px-3 sm:px-6">
                <Card className=" bg-white/80 ">
                    <CardHeader className="space-y-3 sm:space-y-4 pb-6 sm:pb-8 px-4 sm:px-6">
                   
                        <div className="space-y-1 sm:space-y-2">
                            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Confirm your order
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base text-slate-600">
                                Review your details, choose your payment method, and complete your order.
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8 sm:space-y-10 pb-6 sm:pb-8 px-4 sm:px-6">
                        <section aria-labelledby="address-details" className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <h3 id="address-details" className="text-lg sm:text-xl font-semibold text-slate-900">
                                    Shipping addresses
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                                <div className="group rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
                                    <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900">From</h4>
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <User className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                                            <span className="font-medium text-slate-900 text-sm sm:text-base break-words">
                                                {step1Data.sender.name}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <Phone className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                                            <span className="text-slate-700 text-sm sm:text-base break-all">{step1Data.sender.phone}</span>
                                        </div>
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <MapPin className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                                            <span className="text-slate-700 leading-relaxed text-sm sm:text-base break-words">
                                                {step1Data.sender.address}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <Landmark className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                                            <span className="text-slate-700 text-sm sm:text-base">{step1Data.sender.country}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="group rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
                                    <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900">To</h4>
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <User className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                                            <span className="font-medium text-slate-900 text-sm sm:text-base break-words">
                                                {step1Data.receiver.name}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <Phone className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                                            <span className="text-slate-700 text-sm sm:text-base break-all">{step1Data.receiver.phone}</span>
                                        </div>
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <MapPin className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                                            <span className="text-slate-700 leading-relaxed text-sm sm:text-base break-words">
                                                {step1Data.receiver.address}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <Landmark className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                                            <span className="text-slate-700 text-sm sm:text-base">{step1Data.receiver.country}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Separator className="bg-slate-200" />

                        <section aria-labelledby="items-and-shipping" className="space-y-4 sm:space-y-6">
                            <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                        <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                    <h3 id="items-and-shipping" className="text-lg sm:text-xl font-semibold text-slate-900">
                                        Package details
                                    </h3>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                    <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-slate-50 px-2.5 sm:px-3 py-1.5 sm:py-2">
                                        <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500" />
                                        <span className="text-xs sm:text-sm font-medium text-slate-700">
                                            {totalItems} {totalItems === 1 ? "item" : "items"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-slate-50 px-2.5 sm:px-3 py-1.5 sm:py-2">
                                        <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500" />
                                        <span className="text-xs sm:text-sm font-medium text-slate-700" aria-live="polite">
                                            {totalWeight.toFixed(2)} kg
                                        </span>
                                    </div>
                                    <ShippingBadge shippingType={step2Data.shippingType} />
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-sm">
                                {step2Data.items.length === 0 ? (
                                    <div className="p-6 sm:p-8 text-center text-slate-500">
                                        <Package className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-slate-300 mb-2 sm:mb-3" />
                                        <p className="text-sm sm:text-base">No items added yet.</p>
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-slate-100">
                                        {step2Data.items.map((item, idx) => (
                                            <li key={idx} className="p-4 sm:p-6 transition-colors hover:bg-slate-50">
                                                <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                                                    <div className="flex items-center gap-3 sm:gap-4 sm:col-span-6">
                                                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0">
                                                            <Package className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="font-semibold text-slate-900 text-sm sm:text-base break-words">
                                                                {item.type}
                                                            </div>
                                                            <div className="text-xs sm:text-sm text-slate-600 mt-1 break-words">
                                                                {item.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between sm:block sm:col-span-6">
                                                        <div className="sm:col-span-3">
                                                            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                                                                Weight
                                                            </div>
                                                            <div className="flex items-center gap-1.5 sm:gap-2 font-semibold text-slate-900 text-sm sm:text-base">
                                                                <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
                                                                <span>{item.weight} kg</span>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-3 sm:mt-3 lg:mt-0">
                                                            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                                                                Shipping
                                                            </div>
                                                            <ShippingBadge shippingType={step2Data.shippingType} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>

                        <Separator className="bg-slate-200" />

                        <section aria-labelledby="payment-method" className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <h3 id="payment-method" className="text-lg sm:text-xl font-semibold text-slate-900">
                                    Payment method
                                </h3>
                            </div>

                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={(v) => setPaymentMethod(v as Step3DataType["paymentMethod"])}
                                className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3"
                            >
                                <span className="sr-only">Payment methods</span>
                                {paymentMethods.map(({ key, label, description, icon: Icon }) => {
                                    const id = `pay-${key}`
                                    return (
                                        <div key={key} className="relative">
                                            <RadioGroupItem id={id} value={key} className="peer sr-only" />
                                            <Label
                                                htmlFor={id}
                                                className="group flex h-full cursor-pointer flex-col justify-between rounded-xl sm:rounded-2xl border-2 border-slate-200 bg-white p-4 sm:p-6 transition-all duration-200 hover:border-slate-300 hover:shadow-md peer-data-[state=checked]:border-teal-500 peer-data-[state=checked]:bg-teal-50 peer-data-[state=checked]:shadow-lg peer-data-[state=checked]:shadow-teal-100 min-h-[80px] sm:min-h-[100px]"
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-slate-100 peer-data-[state=checked]:bg-teal-100 flex-shrink-0">
                                                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 peer-data-[state=checked]:text-teal-600" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="font-semibold text-slate-900 text-sm sm:text-base">{label}</div>
                                                        <div className="text-xs sm:text-sm text-slate-600 mt-1 break-words">{description}</div>
                                                    </div>
                                                </div>
                                                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 transition-opacity peer-data-[state=checked]:opacity-100">
                                                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-teal-600 text-white">
                                                        <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>
                                    )
                                })}
                            </RadioGroup>
                        </section>

                        <div className="flex flex-col gap-3 pt-4 sm:pt-6 sm:flex-row-reverse sm:justify-between sm:items-center">
                            <Button
                                type="submit"
                                disabled={!paymentMethod}
                                className="group bg-gradient-to-r from-teal-600 to-teal-700 px-6 sm:px-8 py-3 text-white shadow-lg hover:from-teal-700 hover:to-teal-800 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto text-sm sm:text-base min-h-[44px]"
                            >
                                <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                Complete order
                            </Button>
                            {onBack && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onBack}
                                    className="group border-slate-300 bg-white px-6 sm:px-8 py-3 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 w-full sm:w-auto text-sm sm:text-base min-h-[44px]"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                    Back
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
