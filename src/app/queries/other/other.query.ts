import { useQuery } from "@tanstack/react-query"
import * as cityApi from "./other.api"

export function useCitySearch(query: string) {
  return useQuery({
    queryKey: ["cities", query],
    queryFn: () => cityApi.searchCities(query),
    enabled: !!query, 
    // staleTime: 5 * 60 * 1000, 
  })
}
