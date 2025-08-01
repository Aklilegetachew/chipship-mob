"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
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

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-white p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full max-w-md rounded-2xl shadow-lg bg-white text-gray-900">
        <CardHeader className="text-center">
          <motion.div variants={itemVariants}>
            <CardTitle className="text-3xl font-bold mb-2">Sign Up</CardTitle>
          </motion.div>
          <motion.p className="text-gray-500" variants={itemVariants}>
            Create your account to get started!
          </motion.p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <motion.div variants={itemVariants}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full bg-teal-400 text-white py-3 rounded-lg font-semibold hover:bg-teal-500 transition-colors"
              >
                Sign Up
              </Button>
            </motion.div>
          </form>
          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600 hover:underline">
                Login
              </Link>
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
