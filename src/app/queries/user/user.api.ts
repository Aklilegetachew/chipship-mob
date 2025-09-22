import axiosClient from "@/lib/axiosClient"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface ForgotPasswordParams {
  email: string
}

export async function getUserInfo() {
  const response = await axiosClient.get("/auth/userinfo")
  return response.data
}

export async function forgotpassword({ email }: ForgotPasswordParams) {
  if (!email) throw new Error("Email is required")

  try {
    const resetUrl =
      (process.env.NEXT_PUBLIC_FRONTENDRETURNURL || "").replace(/\/$/, "") +
      "/reset-password"

    console.log("Reset URL:", resetUrl)

    await sendPasswordResetEmail(auth, email, { url: resetUrl })

    return {
      success: true,
      message:
        "✅ Check your email for a password reset link. If you don't see it, check your spam folder.",
    }
  } catch (error: any) {
    console.error(error)

    let message = "⚠ Something went wrong. Please try again."
    if (error.code === "auth/too-many-requests") {
      message =
        "⚠ Too many requests. Please wait a few minutes before trying again."
    } else if (error.code === "auth/user-not-found") {
      message = "⚠ No account found with this email."
    } else if (error.code === "auth/invalid-email") {
      message = "⚠ Invalid email address."
    }

    return { success: false, message }
  }
}
