import { axiosInstance } from '../axiosInstance'

export const Url = '/token'
export const tokenVerifyUrl = `${Url}/verify`
export const tokenRefreshUrl = `${Url}/refresh`

export const getToken = async ({ email, password }) => {
  const res = await axiosInstance.post(Url, {
    email,
    password,
  })
  return res.data
}
export const refreshToken = async ({ refresh }) => {
  const res = await axiosInstance({
    method: 'post',
    url: tokenRefreshUrl,
    data: { refresh },
  })
  return res.data
}
export const verifyToken = async ({ access }) => {
  const res = await axiosInstance.get(Url, {
    token: access,
  })
  return res.data
}
