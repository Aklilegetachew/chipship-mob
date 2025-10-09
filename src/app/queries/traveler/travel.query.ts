"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as travelerApi from "./travel.api"
import { TravelerRoute } from "./travel.api"
// ---------------------------
// Queries
// ---------------------------

export function useTravelerRoutes() {
  return useQuery({
    queryKey: ["travelerRoutes"],
    queryFn: travelerApi.getAllTravelerRoutes,
    staleTime: Infinity,
  })
}

export function useTravelerRouteById(id: number) {
  return useQuery({
    queryKey: ["travelerRoute", id],
    queryFn: () => travelerApi.getTravelerRouteById(id),
    enabled: !!id, // only fetch if id is truthy
    staleTime: Infinity,
  })
}

// ---------------------------
// Mutations
// ---------------------------

export function useCreateTravelerRoute() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TravelerRoute) => travelerApi.createTravelerRoute(data),
    onSuccess: () => {
      // Refresh all traveler routes after creating a new one
      queryClient.invalidateQueries({ queryKey: ["travelerRoutes"] })
    },
    onError: (error: any) => {
      console.error("Create traveler route error:", error)
    },
  })
}

export function useUpdateTravelerRoute(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<TravelerRoute>) =>
      travelerApi.updateTravelerRoute(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travelerRoutes"] })
      queryClient.invalidateQueries({ queryKey: ["travelerRoute", id] })
    },
    onError: (error: any) => {
      console.error("Update traveler route error:", error)
    },
  })
}

export function useDeleteTravelerRoute() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => travelerApi.deleteTravelerRoute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travelerRoutes"] })
    },
    onError: (error: any) => {
      console.error("Delete traveler route error:", error)
    },
  })
}
