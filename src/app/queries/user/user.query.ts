"use client"

import { useQuery } from "@tanstack/react-query"
import * as userApi from "./user.api"

export function useUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: userApi.getUserInfo,
  })
}
