"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import * as userApi from "./user.api"

export function useUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: userApi.getUserInfo,
  })
}

interface ForgotPasswordParams {
  email: string
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordParams) => userApi.forgotpassword(data),
    onError: (error: any) => {
      console.error("Forgot password error:", error)
    },
  })
}
