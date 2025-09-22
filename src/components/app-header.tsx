"use client"

import { Button } from "@/components/ui/button"
import { Package, Plus, History, User } from "lucide-react"
import Link from "next/link"

export function MobileHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile: Centered logo and title */}
          <div className="flex items-center justify-center gap-2 flex-1 md:flex-none md:justify-start">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">ChipShip</h1>
          </div>

          {/* Desktop: Navigation items */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/add-order" className="flex items-center gap-2 text-foreground hover:text-primary">
              <Plus className="h-4 w-4" />
              <span>Add Order</span>
            </Link>
            <Link href="/history" className="flex items-center gap-2 text-foreground hover:text-primary">
              <History className="h-4 w-4" />
              <span>History</span>
            </Link>
            <Link href="/profile" className="flex items-center gap-2 text-foreground hover:text-primary">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </div>

          {/* Desktop: Place Order button */}
          <div className="hidden md:block">
            <Link href="/add-order">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Place Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
