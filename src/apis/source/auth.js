import { axiosInstance } from '../axiosInstance'

export const Url = '/token'

export const getToken = async ({ email, password }) => {
  const res = await axiosInstance.post(Url, {
    email,
    password,
  })
  return res.data
}
export const getRefreshToken = async (refresh) => {
  const res = await axiosInstance.post(Url, {
    refresh,
  })
  return res.data
}
export const tokenVerify = async (token) => {
  const res = await axiosInstance.get(Url, {
    token,
  })
  return res.data
}
