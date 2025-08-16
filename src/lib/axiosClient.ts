import axios from "axios"
import { auth } from "./firebase"

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

axiosClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    if (error.response?.status === 401) {
      // Optional: logout or refresh logic
      // await auth.signOut();
      console.warn("Unauthorized. Consider redirecting to login.")
    }
    return Promise.reject(error)
  }
)

export default axiosClient
