"use client"

import type React from "react"
import { Settings } from "lucide-react" // Import Settings icon

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import { Bell, Home, Menu, MessageSquare, Package, ShieldCheck, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Shipments", href: "/dashboard/shipments", icon: Package },
  { label: "Matches", href: "/dashboard/matches", icon: ShieldCheck },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { label: "Settings", href: "/dashboard/settings", icon: Settings }, // Use Settings icon here
]

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background/60 p-4 md:block">
      <div className="mb-6 flex items-center gap-2 px-2">
        <ShieldCheck className="h-5 w-5 text-emerald-600" />
        <span className="text-lg font-semibold">ChipShip</span>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active ? "bg-emerald-50 text-emerald-800" : "text-foreground/80 hover:bg-accent hover:text-foreground",
              )}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
            >
              <Icon className={cn("h-4 w-4", active ? "text-emerald-700" : "text-muted-foreground")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-8 rounded-md border bg-card p-3">
        <div className="text-sm font-medium">Need help?</div>
        <p className="mt-1 text-xs text-muted-foreground">Visit FAQ or contact support anytime.</p>
        <Link href="/home#faq" className="mt-2 inline-block text-xs font-medium text-emerald-700 hover:underline">
          View FAQ
        </Link>
      </div>
    </aside>
  )
}

function MobileSidebar() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden bg-transparent" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="p-4">
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex w-full flex-col">
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4">
            <div className="flex items-center gap-2">
              <MobileSidebar />
              <div className="hidden md:block">
                <span className="text-sm text-muted-foreground">Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/start/ship">Ship a package</Link>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/portrait-woman.png" alt="User avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
