"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "./sidebar"


export function AppHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-12 h-12 bg-white shadow-sm"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">Order Delivery</h1>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-12 h-12 bg-white shadow-sm"
        >
          <Search className="h-6 w-6" />
          <span className="sr-only">Search</span>
        </Button>
      </header>
      {/* <AnimatePresence>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </AnimatePresence> */}
    </>
  )
}
