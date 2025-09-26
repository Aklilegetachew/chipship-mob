"use client"
import { useEffect, useState } from "react"

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === "accepted") {
      console.log("User accepted install ✅")
    } else {
      console.log("User dismissed install ❌")
    }
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  return (
    showPrompt && (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center gap-3 z-50">
        <h3 className="text-lg font-semibold">Install our app</h3>
        <p className="text-sm text-gray-600">
          Get a faster, app-like experience
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="bg-green-800  text-white px-4 py-2 rounded-lg"
          >
            Install
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="bg-gray-200 px-4 py-2 rounded-lg"
          >
            Later
          </button>
        </div>
      </div>
    )
  )
}
