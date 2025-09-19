import axiosClient from "@/lib/axiosClient"

export async function getOrders() {
  const response = await axiosClient.get("/order")
  return response.data
}

export async function getOrderById(orderId: number) {
  const response = await axiosClient.get(`/order/${orderId}`)
  return response.data
}


