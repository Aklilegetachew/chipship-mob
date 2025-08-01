"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormData } from "@/lib/validators/login"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { Checkbox } from "primereact/checkbox"
import { Message } from "primereact/message"
import { EnhancedHeader } from "@/components/enhanced-header"
import { Footer } from "@/components/footer"
import { Package } from "lucide-react"
import type { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "ChipShip - Login",
//   description: "Log in to your ChipShip account to manage your shipments.",
//   alternates: {
//     canonical: "https://yourdomain.com/login", // Replace with your actual domain
//   },
// }

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [apiMessage, setApiMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setApiMessage(null)

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()
      console.log(result)
      if (response.status === 200) {
        if (result.token) {
          localStorage.setItem("token", result.token)
        }
        setApiMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        })
        // Redirect to dashboard after successful login
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setApiMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setApiMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Welcome back to ChipShip
            </h1>

            {apiMessage && (
              <div className="mb-6">
                <Message
                  severity={apiMessage.type === "success" ? "success" : "error"}
                  text={apiMessage.text}
                  className="w-full"
                />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full ${errors.email ? "p-invalid" : ""}`}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        border: errors.email
                          ? "1px solid #ef4444"
                          : "1px solid #d1d5db",
                      }}
                    />
                  )}
                />
                {errors.email && (
                  <small className="text-red-500">{errors.email.message}</small>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Password
                      {...field}
                      id="password"
                      placeholder="••••••••"
                      toggleMask
                      className={`w-full ${errors.password ? "p-invalid" : ""}`}
                      inputStyle={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        border: errors.password
                          ? "1px solid #ef4444"
                          : "1px solid #d1d5db",
                      }}
                      feedback={false}
                      aria-invalid={errors.password ? "true" : "false"}
                      aria-describedby={
                        errors.password ? "password-error" : undefined
                      }
                    />
                  )}
                />
                {errors.password && (
                  <small id="password-error" className="text-red-500">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        inputId="rememberMe"
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.checked)}
                        className="mr-2"
                      />
                    )}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  label={isLoading ? "Signing In..." : "Sign In"}
                  loading={isLoading}
                  className="w-full"
                  style={{
                    backgroundColor: "#00796B",
                    borderColor: "#00796B",
                    padding: "0.75rem",
                    borderRadius: "9999px",
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                />
              </div>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
