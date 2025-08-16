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
            <UIBadge className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
                <Rocket className="h-3.5 w-3.5" />
                {"Fast"}
            </UIBadge>
        )
    }
    if (shippingType === "medium") {
        return (
            <UIBadge variant="secondary" className="gap-1.5">
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
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl p-4 sm:p-6">
            <Card className="border-border/60">
                <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-medium">Step 3 of 3</span>
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl">Confirm your order</CardTitle>
                    <CardDescription>Review details, choose payment, and submit your order.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Addresses */}
                    <section aria-labelledby="address-details" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-emerald-600" />
                            <h3 id="address-details" className="text-lg font-semibold">
                                Address details
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-lg border bg-card p-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Sender</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="flex items-start gap-2">
                                        <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{step1Data.sender.name}</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{step1Data.sender.phone}</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{step1Data.sender.address}</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <Landmark className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{step1Data.sender.country}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-lg border bg-card p-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Receiver</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="flex items-start gap-2">
                                        <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{step1Data.receiver.name}</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{step1Data.receiver.phone}</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{step1Data.receiver.address}</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <Landmark className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{step1Data.receiver.country}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Separator />

                    {/* Items & Shipping */}
                    <section aria-labelledby="items-and-shipping" className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-emerald-600" />
                                <h3 id="items-and-shipping" className="text-lg font-semibold">
                                    Items & shipping
                                </h3>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Package className="h-4 w-4" />
                                    <span>
                                        {totalItems} {totalItems === 1 ? "item" : "items"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Scale className="h-4 w-4" />
                                    <span aria-live="polite">{totalWeight.toFixed(2)} kg</span>
                                </div>
                                <ShippingBadge shippingType={step2Data.shippingType} />
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-md border">
                            {step2Data.items.length === 0 ? (
                                <div className="p-4 text-sm text-muted-foreground">No items added.</div>
                            ) : (
                                <ul className="divide-y">
                                    {step2Data.items.map((item, idx) => (
                                        <li key={idx} className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-12 sm:items-center">
                                            <div className="flex items-center gap-3 sm:col-span-6">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                                                    <Package className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{item.type}</div>
                                                    <div className="text-sm text-muted-foreground">{item.description}</div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <div className="text-sm text-muted-foreground">Weight</div>
                                                <div className="mt-0.5 flex items-center gap-2 font-medium">
                                                    <Scale className="h-4 w-4 text-muted-foreground" />
                                                    <span>{item.weight} kg</span>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <div className="text-sm text-muted-foreground">Shipping</div>
                                                <div className="mt-0.5">
                                                    <ShippingBadge shippingType={step2Data.shippingType} />
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>

                    <Separator />

                    {/* Payment */}
                    <section aria-labelledby="payment-method" className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-emerald-600" />
                            <h3 id="payment-method" className="text-lg font-semibold">
                                Select payment method
                            </h3>
                        </div>

                        <RadioGroup
                            value={paymentMethod}
                            onValueChange={(v) => setPaymentMethod(v as Step3DataType["paymentMethod"])}
                            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                        >
                            <span className="sr-only">Payment methods</span>
                            {paymentMethods.map(({ key, label, description, icon: Icon }) => {
                                const id = `pay-${key}`
                                return (
                                    <div key={key}>
                                        <RadioGroupItem id={id} value={key} className="peer sr-only" />
                                        <Label
                                            htmlFor={id}
                                            className="flex h-full cursor-pointer flex-col justify-between rounded-lg border p-4 transition-colors hover:bg-accent peer-data-[state=checked]:border-emerald-600 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-emerald-600"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                                                    <Icon className="h-5 w-5 text-foreground" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{label}</div>
                                                    <div className="text-xs text-muted-foreground">{description}</div>
                                                </div>
                                            </div>
                                        </Label>
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:justify-between">
                        {onBack ? (
                            <Button type="button" variant="outline" onClick={onBack} className="sm:w-auto bg-transparent">
                                Back
                            </Button>
                        ) : (
                            <span />
                        )}
                        <Button
                            type="submit"
                            disabled={!paymentMethod}
                            className="bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                        >
                            Submit order
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
