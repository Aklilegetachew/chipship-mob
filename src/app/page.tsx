'use client'
import { useEffect, useRef, useState } from 'react'
import { EnhancedHeader } from "@/components/enhanced-header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { BenefitsSection } from "@/components/benefits-section"
import { TrustSafetySection } from "@/components/trust-safety-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { Toast } from 'primereact/toast'

export default function HomePage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    })
  }, [])

  const toast = useRef<Toast>(null);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
      }
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Toast ref={toast} />
      <EnhancedHeader />
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TrustSafetySection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      {deferredPrompt && (
        <button onClick={handleInstall}>Install App</button>
      )}
    </main>
  )
}