import axiosClient from "@/lib/axiosClient"

export async function searchCities(query: string) {
  if (!query) return []
  const response = await axiosClient.get("/helpers/cities", {
    params: { q: query },
  })
  return response.data
}
