import axiosClient from "@/lib/axiosClient"


export interface TravelerRoute {
  id?: number
  userId?: number
  fromLocation: string
  toLocation: string
  departureDate: string
  arrivalDate: string
  availableSpace: number
  pricePerKg: number
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface TravelerRouteResponse {
  message: string
  route: TravelerRoute
}


/**
 * ✅ Create a new traveler route
 * Example usage:
 * await createTravelerRoute({ fromLocation: "Addis", toLocation: "Nairobi", departureDate: "2025-10-15", ... })
 */
export async function createTravelerRoute(data: TravelerRoute) {
  try {
    const response = await axiosClient.post<TravelerRouteResponse>(
      "/traveler/routes",
      data
    )
    return response.data
  } catch (error: any) {
    console.error("❌ Error creating traveler route:", error)
    throw error.response?.data || { message: "Failed to create traveler route" }
  }
}

/**
 * 🧭 Get all available traveler routes (for sender to browse)
 */
export async function getAllTravelerRoutes() {
  try {
    const response = await axiosClient.get<TravelerRoute[]>("/traveler/routes")
    return response.data
  } catch (error: any) {
    console.error("❌ Error fetching traveler routes:", error)
    throw error.response?.data || { message: "Failed to fetch traveler routes" }
  }
}

/**
 * 🔍 Get a specific traveler route by ID
 */
export async function getTravelerRouteById(id: number) {
  try {
    const response = await axiosClient.get<TravelerRoute>(
      `/traveler/${id}`
    )
    return response.data
  } catch (error: any) {
    console.error(`❌ Error fetching traveler route #${id}:`, error)
    throw error.response?.data || { message: "Failed to fetch traveler route" }
  }
}

/**
 * ✏️ Update a traveler route (if traveler wants to edit details)
 */
export async function updateTravelerRoute(
  id: number,
  data: Partial<TravelerRoute>
) {
  try {
    const response = await axiosClient.patch<TravelerRouteResponse>(
      `/traveler/${id}`,
      data
    )
    return response.data
  } catch (error: any) {
    console.error("❌ Error updating traveler route:", error)
    throw error.response?.data || { message: "Failed to update traveler route" }
  }
}

/**
 * 🗑 Delete a traveler route
 */
export async function deleteTravelerRoute(id: number) {
  try {
    const response = await axiosClient.delete<{ message: string }>(
      `/traveler/${id}`
    )
    return response.data
  } catch (error: any) {
    console.error("❌ Error deleting traveler route:", error)
    throw error.response?.data || { message: "Failed to delete traveler route" }
  }
}
