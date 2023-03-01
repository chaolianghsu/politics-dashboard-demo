import axios from 'axios'
import { axiosInstance } from '../axiosInstance'

export const Url = '/token'
export const tokenVerifyUrl = `${Url}/verify`
export const tokenRefreshUrl = `${Url}/refresh`

export const getToken = async ({ email, password }) => {
  const res = await axios.post(Url, {
    email,
    password,
  })
  return res.data
}

export const verifyToken = async ({ access }) => {
  const res = await axiosInstance.post(tokenVerifyUrl, {
    token: access,
  })
  return res.data
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response.status
    const originalReq = error.config

    if (
      statusCode !== 401
      || originalReq.retryFlag
      || originalReq.url === tokenRefreshUrl
    ) {
      return Promise.reject(error)
    }

    const originalReqAddedRetryFlag = { ...originalReq, retryFlag: true }

    const res = await axiosInstance({
      method: 'post',
      url: tokenRefreshUrl,
      data: { refresh: localStorage.getItem('politics_refresh') || '' },
    })
    const data = await res.data
    localStorage.setItem('politics_access', data.access)

    axiosInstance.defaults.headers.Authorization = `Bearer ${data.access}`

    if (originalReq.url === tokenVerifyUrl) {
      return axiosInstance({
        ...originalReqAddedRetryFlag,
        data: { token: localStorage.getItem('politics_access') || '' },
      })
    }

    return axiosInstance({
      ...originalReqAddedRetryFlag,
      headers: {
        ...originalReqAddedRetryFlag.headers,
        Authorization: localStorage.getItem('politics_access') || '',
      },
    })
  },
)
