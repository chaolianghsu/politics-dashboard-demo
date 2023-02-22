import axios from 'axios'

const testUrl = 'http://35.234.54.82'

const devUrl = 'http://localhost:5173'

export const baseUrl = process.env.NODE_ENV === 'development' ? devUrl : testUrl

export const axiosInstance = axios.create({
  baseURL: baseUrl,
})
