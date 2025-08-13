import axios from 'axios'

// In dev, leave baseURL empty so requests go to the same origin and hit Vite's proxy.
// In prod, set VITE_API_URL to your server URL (e.g., https://your-api.example.com).
const baseURL = import.meta.env.VITE_API_URL || ''

export const api = axios.create({
  baseURL,
  withCredentials: false,
})
