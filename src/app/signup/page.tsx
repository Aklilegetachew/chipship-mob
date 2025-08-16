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
import { useToast } from "@/context/ToastContext";

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useToast();

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
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create Firebase account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Call backend API — axiosClient adds token automatically
      await axiosClient.post("/auth/signup", {
        name, // backend can get uid and email from token
      });

      console.log("Signed up:", user.uid, user.email);
      // redirect after signup
    } catch (err: any) {
      console.error("Signup error:", err);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Try logging in instead.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Please choose a stronger password.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        default:
          setError(err.response?.data?.message || "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };



  const handleGoogleSignup = async () => {
    // setLoading(true);
    // setError("");

    showSuccess("Signed up successfully", "Welcome to our platform!");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Get the Firebase ID token from the signed-in user
      const token = await user.getIdToken();
      // Send the token to your backend signup API
      const response = await axiosClient.post("/auth/signup", { token });
      console.log("Backend response:", response.data);
      showSuccess("Signed up successfully", "Welcome to our platform!");


      // Optionally redirect after successful signup
      // router.push("/dashboard");
    } catch (err: any) {
      console.log("Google signup error:", err.response?.data?.message);

      showError("Signup Failed", err.response?.data?.message || "Failed to sign up with Google. Please try again.");

    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

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
  )
}


