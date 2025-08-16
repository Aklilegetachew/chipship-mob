"use client"

import Link from "next/link"
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    MapPin,
    MessageSquare,
    Package,
    ShieldCheck,
    Star,
    Wallet,
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
    // Mock data — replace with real user data
    const user = { name: "Sarah" }
    const stats = [
        { label: "Balance", value: "$420.50", icon: Wallet, accent: "text-emerald-600" },
        { label: "Active shipments", value: "3", icon: Package, accent: "text-emerald-600" },
        { label: "Rating", value: "4.9", icon: Star, accent: "text-emerald-600" },
    ]

    const shipments = [
        { id: "SHP-9832", from: "NYC", to: "LON", status: "In transit", eta: "2d", weight: "1.2kg" },
        { id: "SHP-9711", from: "SFO", to: "DEL", status: "Awaiting pickup", eta: "—", weight: "0.8kg" },
        { id: "SHP-9620", from: "BER", to: "PAR", status: "Delivered", eta: "Today", weight: "0.4kg" },
    ]

    const trips = [
        { id: "TRP-3301", from: "NYC", to: "MAD", date: "Aug 28", space: "8kg" },
        { id: "TRP-3290", from: "DXB", to: "CAI", date: "Aug 20", space: "5kg" },
    ]

    const matches = [
        { id: "MT-120", from: "NYC", to: "LON", time: "Matches now", confidence: "High" },
        { id: "MT-118", from: "SFO", to: "DEL", time: "3m ago", confidence: "Medium" },
        { id: "MT-117", from: "BER", to: "PAR", time: "10m ago", confidence: "High" },
    ]

    const messages = [
        { id: "MSG-22", name: "Ahmed", text: "Can you carry 1.5kg laptop?", time: "5m", initials: "AH" },
        { id: "MSG-21", name: "Maria", text: "I can deliver tomorrow morning.", time: "1h", initials: "MR" },
        { id: "MSG-20", name: "Diego", text: "What’s the pickup location?", time: "3h", initials: "DG" },
    ]

    const checklist = [
        { label: "Verify your identity", done: false },
        { label: "Add payment method", done: true },
        { label: "Complete profile", done: false },
        { label: "Add default pickup address", done: false },
    ]

    return (
        <AppShell>
            {/* Welcome + Quick CTA */}
            <div className="mb-6 rounded-xl border bg-gradient-to-br from-emerald-50 to-white p-5 sm:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Welcome back</div>
                        <h1 className="text-2xl font-bold sm:text-3xl">Hi {user.name}, let’s get you moving</h1>
                        <p className="text-sm text-muted-foreground">
                            Start a shipment, post a trip, or review matches — all from your dashboard.
                        </p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                                <Link href="/start/ship" className="flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    Ship a package
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-3 sm:max-w-md">
                        {stats.map((s) => {
                            const Icon = s.icon
                            return (
                                <Card key={s.label} className="border-emerald-100">
                                    <CardContent className="flex items-center justify-between gap-2 p-4">
                                        <div>
                                            <div className="text-xs text-muted-foreground">{s.label}</div>
                                            <div className="text-lg font-semibold">{s.value}</div>
                                        </div>
                                        <Icon className={`h-5 w-5 ${s.accent}`} />
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* Left column: Activity */}
                <div className="xl:col-span-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>My activity</CardTitle>
                            <CardDescription>View your recent shipments and trips.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="divide-y rounded-md border">
                                {shipments.map((s) => (
                                    <li key={s.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50">
                                                <Package className="h-5 w-5 text-emerald-700" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{s.id}</div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {s.from} → {s.to} • {s.weight}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge
                                                className={
                                                    s.status === "Delivered"
                                                        ? "bg-emerald-600 hover:bg-emerald-700"
                                                        : "bg-amber-500 hover:bg-amber-600"
                                                }
                                            >
                                                {s.status}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4" />
                                                {s.eta}
                                            </div>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/dashboard/shipments/${s.id}`}>View</Link>
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-between">
                                <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                                    <Link href="/start/ship">Create shipment</Link>
                                </Button>
                                <Button variant="ghost" asChild className="text-emerald-700 hover:text-emerald-800">
                                    <Link href="/dashboard/shipments">
                                        See all shipments
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Matches */}
                    <Card className="mt-6">
                        <CardHeader className="pb-3">
                            <CardTitle>Recommended matches</CardTitle>
                            <CardDescription>Based on your recent activity and locations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="divide-y rounded-md border">
                                {matches.map((m) => (
                                    <li key={m.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50">
                                                <ShieldCheck className="h-5 w-5 text-emerald-700" />
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {m.from} → {m.to}
                                                </div>
                                                <div className="text-sm text-muted-foreground">{m.time}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-emerald-600 hover:bg-emerald-700">Confidence: {m.confidence}</Badge>
                                            <Button size="sm" variant="outline">
                                                View
                                            </Button>
                                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                                Chat
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 text-right">
                                <Button variant="ghost" asChild className="text-emerald-700 hover:text-emerald-800">
                                    <Link href="/dashboard/matches">
                                        See more matches
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column: Messages + Checklist + Insights */}
                <div className="space-y-6">
                    {/* Messages */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Messages</CardTitle>
                            <CardDescription>Continue conversations with travelers and senders.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="divide-y rounded-md border">
                                {messages.map((m) => (
                                    <li key={m.id} className="flex items-center justify-between gap-3 p-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src="/portrait-woman.png" alt={m.name} />
                                                <AvatarFallback>{m.initials}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="text-sm font-medium">{m.name}</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1">{m.text}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-muted-foreground">{m.time}</span>
                                            <Button size="sm" variant="outline" className="hidden sm:inline-flex bg-transparent">
                                                Open
                                            </Button>
                                            <Button size="icon" variant="ghost" className="sm:hidden" aria-label="Open message">
                                                <MessageSquare className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3 text-right">
                                <Button variant="ghost" asChild className="text-emerald-700 hover:text-emerald-800">
                                    <Link href="/dashboard/messages">
                                        Go to inbox
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Checklist */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Complete your setup</CardTitle>
                            <CardDescription>Finish these steps to increase trust and earnings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {checklist.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                            {item.done ? (
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                            ) : (
                                                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                        <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.label}</span>
                                    </div>
                                    {item.done ? (
                                        <Badge className="bg-emerald-600 hover:bg-emerald-700">Done</Badge>
                                    ) : (
                                        <Button variant="outline" size="sm">
                                            Start
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Separator className="my-2" />
                            <div className="flex items-center justify-between text-sm">
                                <span>Profile completion</span>
                                <span className="font-medium">50%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div className="h-full w-1/2 bg-emerald-600" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Insights */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Shipping overview</CardTitle>
                            <CardDescription>Track your shipping activity this month.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Wallet className="h-4 w-4 text-emerald-600" />
                                    Total spent
                                </div>
                                <div className="font-semibold">$260.00</div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Package className="h-4 w-4 text-emerald-600" />
                                    Delivered
                                </div>
                                <div className="font-semibold">5</div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                    On-time rate
                                </div>
                                <div className="font-semibold">97%</div>
                            </div>
                            <div className="mt-2">
                                <Button variant="outline" asChild className="w-full bg-transparent">
                                    <Link href="/dashboard/wallet">View billing</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    )
}
