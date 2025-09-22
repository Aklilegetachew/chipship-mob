"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Package } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

export function EnhancedHeader() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/home"

  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Trust & Safety", href: "#trust-safety" },
    { name: "FAQ", href: "#faq" },
  ]

  const smoothScrollTo = (elementId: string) => {
    if (pathname !== "/") {
      window.location.href = `/${elementId}`
      return
    }

    const element = document.getElementById(elementId.replace("#", ""))
    if (element) {
      const headerOffset = 80 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

 
  useEffect(() => {
    if (pathname !== "/") return

    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", ""))
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(`#${sectionId}`)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ChipShip
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => smoothScrollTo(link.href)}
                  className={`font-medium transition-colors relative ${
                    activeSection === link.href
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                  }`}
                >
                  {link.name}
                  {activeSection === link.href && pathname === "/" && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </nav>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {pathname !== "/login" && pathname !== "/dashboard" && (
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Login
                </Button>
              </Link>
            )}
            {pathname !== "/signup" && pathname !== "/dashboard" && (
              <Link href="/signup">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 rounded-full">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800"
            >
              <div className="py-4 space-y-4">
                {!isAuthPage &&
                  navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => {
                        smoothScrollTo(link.href)
                        setIsMenuOpen(false)
                      }}
                      className={`block text-left font-medium transition-colors w-full ${
                        activeSection === link.href && pathname === "/"
                          ? "text-teal-600 dark:text-teal-400"
                          : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>
                  {pathname !== "/login" && pathname !== "/home" && (
                    <Link href="/login" className="w-full">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                      >
                        Login
                      </Button>
                    </Link>
                  )}
                  {pathname !== "/signup" && pathname !== "/home" && (
                    <Link href="/signup" className="w-full">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                        Sign Up
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
