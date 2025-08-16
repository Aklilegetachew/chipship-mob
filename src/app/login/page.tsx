"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validators/login";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Message } from "primereact/message";
import { EnhancedHeader } from "@/components/enhanced-header";
import { Footer } from "@/components/footer";
import { Package } from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Email/Password Login
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const token = await userCredential.user.getIdToken();
      sessionStorage.setItem("authToken", token);

      showSuccess("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (error: any) {

      showError("Login failed", error.message || "");
    } finally {
      setIsLoading(false);
    }
  };



  // Google Sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      sessionStorage.setItem("authToken", token);
      showSuccess("Google sign-in successful!");
      setTimeout(() => router.push("/home"), 1200);
    } catch (error: any) {
      showError("Google sign-in failed", error.message || "");
    } finally {
      setIsLoading(false);
    }
  };

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



            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputText {...field} id="email" type="email" placeholder="john@example.com"
                      className={`w-full ${errors.email ? "p-invalid" : ""}`}
                    />
                  )}
                />
                {errors.email && <small className="text-red-500">{errors.email.message}</small>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Password {...field} id="password" placeholder="••••••••" toggleMask
                      feedback={false} className={`w-full ${errors.password ? "p-invalid" : ""}`} />
                  )}
                />
                {errors.password && <small className="text-red-500">{errors.password.message}</small>}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} inputId="rememberMe" checked={!!field.value}
                        onChange={(e) => field.onChange(e.checked)} className="mr-2" />
                    )}
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-500">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <div className="mt-8">
                <Button type="submit" label={isLoading ? "Signing In..." : "Sign In"} loading={isLoading} className="w-full" />
              </div>

              {/* Google Sign In */}
              <div className="mt-4">
                <Button type="button" onClick={handleGoogleSignIn} icon="pi pi-google"
                  label="Sign in with Google" className="w-full p-button-outlined" />
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-sm text-teal-600 hover:text-teal-500">
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
  );
}
