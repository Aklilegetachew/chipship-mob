"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "@/lib/firebase"
import { useRef, useState } from "react"
import axiosClient from "@/lib/axiosClient"
import { useToast } from "@/context/ToastContext"
import { useRouter } from "next/navigation"
import { EnhancedHeader } from "@/components/enhanced-header"
import { Footer } from "@/components/footer"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useToast()
  const router = useRouter()
  const validatePassword = (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasNonalphas = /\W/.test(password)

    if (password.length < minLength)
      return "Password must be at least 8 characters"
    if (!hasUpperCase) return "Password must contain uppercase letter"
    if (!hasLowerCase) return "Password must contain lowercase letter"
    if (!hasNumbers) return "Password must contain a number"
    if (!hasNonalphas) return "Password must contain a special character"
    return null
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    setLoading(true)
    try {
      // Step 1: Create Firebase account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      const token = await user.getIdToken()
      const response = await axiosClient.post("/auth/signup", {
        name,
        token,
      })
      showSuccess("Signed up successfully", "Welcome to our platform!")
      // redirect after signup
      router.push("/home")
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered")
        showError("Signup Failed", "Email already registered")
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format")
        showError("Signup Failed", "Invalid email format")
      } else {
        setError("Unexpected authentication error")
        showError("Signup Failed", "Unexpected authentication error")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    showSuccess("Signed up successfully", "Welcome to our platform!")
    try {
      const result = await signInWithPopup(auth, provider)

      const user = result.user
      const token = await user.getIdToken()
      await axiosClient.post("/auth/signup", { token })
      showSuccess("Signed up successfully", "Welcome to our platform!")
      router.push("/home")
    } catch (err: any) {
      if (err.code === "auth/email-already-exists") {
        setError("Email already registered")
        showError("Signup Failed", "Email already registered")
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format")
        showError("Signup Failed", "Invalid email format")
      } else {
        setError("Unexpected authentication error")
        showError("Signup Failed", "Unexpected authentication error")
      }

      showError(
        "Signup Failed",
        err.response?.data?.message ||
          "Failed to sign up with Google. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <EnhancedHeader />
      <motion.div
        className="min-h-screen flex items-center justify-center bg-white p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {" "}
        <Card className="w-full max-w-md rounded-2xl shadow-lg bg-white text-gray-900">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">Sign Up</CardTitle>
            <p className="text-gray-500">Create your account to get started!</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                id="password"
                type="password"
                placeholder="Password (min 8 chars, mixed case, number, special char)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-teal-400 text-white hover:bg-teal-500 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignup}
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up with Google"}
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600 hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <Footer />
    </>
  )
}
