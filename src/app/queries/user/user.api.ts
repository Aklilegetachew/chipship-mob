import axiosClient from "@/lib/axiosClient"

export async function getUserInfo() {
  const response = await axiosClient.get("/auth/userinfo")
  return response.data
}
