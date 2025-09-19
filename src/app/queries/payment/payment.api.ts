import axiosClient from "@/lib/axiosClient"

export const calculateShipmentPrice = async (
  items: { type: string; weight: number }[]
) => {
  const res = await axiosClient.post("/payment/calculate-price", { items })
  return res.data.total
}
