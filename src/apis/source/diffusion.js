import { axiosInstance } from '../axiosInstance'

export const Url = '/main/diffusion'

export const getData = async ({ from, to }) => {
  const res = await axiosInstance.get(Url, { params: { min: from, max: to } })
  return res.data
}
