import axios from 'axios'

const devUrl = 'http://localhost:5173'

export const baseUrl = process.env.VITE_API_URL ? process.env.VITE_API_URL : devUrl

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${localStorage.getItem('politics_access') || ''}` },
})
