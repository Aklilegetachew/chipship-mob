"use client"

import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { auth } from "@/lib/firebase"
import { EnhancedHeader } from "@/components/enhanced-header"
import { Footer } from "@/components/footer"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useForgotPassword } from "../queries/user/user.query"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const forgotPasswordMutation = useForgotPassword()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg("")

    try {
      const result = await forgotPasswordMutation.mutateAsync({ email })
      setMsg(result.message)
    } catch (error) {
      setMsg("⚠ Something went wrong.")
    }
  }

  //   async function handleSubmit(e: React.FormEvent) {
  //     e.preventDefault()
  //     setMsg("")
  //     setLoading(true)
  //     console.log(process.env.FRONTENDRETURNURL + "/reset-password")

  //     try {
  //       const resetUrl = process.env.FRONTENDRETURNURL + "/reset-password"

  //       await sendPasswordResetEmail(auth, email, { url: resetUrl })

  //       setMsg(
  //         "✅ Check your email for a password reset link. If you don't see it, check your spam folder."
  //       )
  //     } catch (error: any) {
  //       console.error(error)
  //       if (error.code === "auth/too-many-requests") {
  //         setMsg(
  //           "⚠ Too many requests. Please wait a few minutes before trying again."
  //         )
  //       } else if (error.code === "auth/user-not-found") {
  //         setMsg("⚠ No account found with this email.")
  //       } else if (error.code === "auth/invalid-email") {
  //         setMsg("⚠ Invalid email address.")
  //       } else {
  //         setMsg("⚠ " + error.message)
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <main className="flex-grow mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-20 md:pb-8">
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Forgot Password
            </h2>
            <p className="text-muted-foreground">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <InputText
            type="email"
            className="border p-2 w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full !bg-teal-600"
              disabled={loading}
              loading={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>

          {msg && <p className="mt-3">{msg}</p>}
        </form>
      </main>
      <Footer />
    </div>
  )
}
