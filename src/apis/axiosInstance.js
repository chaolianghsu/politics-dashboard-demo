import axios from 'axios'

const testUrl = 'http://35.234.54.82'

const devUrl = 'http://localhost:5173'

export const baseUrl = +process.env.VITE_IS_MOCK_API ? devUrl : testUrl

export const axiosInstance = axios.create({
  baseURL: baseUrl,
})
