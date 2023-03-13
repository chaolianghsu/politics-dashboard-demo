import axios from 'axios'

const testUrl = 'http://35.234.54.82'

const prodUrl = 'https://api-taitung.keypo.tw'

const devUrl = 'http://localhost:5173'

const realUrl = +process.env.VITE_IS_TEST_API ? testUrl : prodUrl

export const baseUrl = +process.env.VITE_IS_MOCK_API ? devUrl : realUrl

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${localStorage.getItem('politics_access') || ''}` },
})
