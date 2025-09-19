import { useQuery } from "@tanstack/react-query"
import { calculateShipmentPrice } from "./payment.api"

export const useCalculatePrice = (
  items: { type: string; weight: number }[],
  enabled = true
) => {
  return useQuery({
    queryKey: ["calculatePrice", items],
    queryFn: () => calculateShipmentPrice(items),
    enabled: enabled && items.length > 0,
    staleTime: 1000 * 60, // 1 min cache
    refetchOnWindowFocus: false,
  })
}
