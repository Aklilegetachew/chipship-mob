"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as userApi from "./user.api"

export function useUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: userApi.getUserInfo,
    staleTime: Infinity,
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

export function useUpdateUserInfo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) => userApi.updateUserInfo(data),
    onSuccess: () => {
 
      queryClient.invalidateQueries({ queryKey: ["userInfo"] })
    },
    onError: (error: any) => {
      console.error("Update user info error:", error)
    },
  })
}
