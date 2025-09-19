
"use client"

import { useQuery } from "@tanstack/react-query"
import * as orderApi from "./order.api"

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getOrders,
  })
}

export function useOrder(orderId: number) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderApi.getOrderById(orderId),
    enabled: !!orderId, 
  })
}
