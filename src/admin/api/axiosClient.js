import axios from 'axios'

// Point this at your real backend when it's ready.
// The DentaFlow backend mounts its routes at the root (no /api prefix):
// /doctors, /services, /gallery, /offers, /reviews, /appointments, /settings.
// Example .env: VITE_API_BASE_URL=http://localhost:3000
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const apiClient = axios.create({
  baseURL,
  timeout: 8000,
})

apiClient.interceptors.request.use((config) => {
  // Let axios pick the right Content-Type: JSON for plain objects,
  // multipart/form-data (with the correct boundary) when the body is a
  // FormData instance, e.g. when uploading an image file.
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
  }
  // Attach auth headers here later if/when authentication is introduced.
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized place to log/report API errors.
    return Promise.reject(error)
  }
)

export default apiClient
