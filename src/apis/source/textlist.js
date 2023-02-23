import { axiosInstance } from '../axiosInstance'

export const Url = '/main/textlist'

export const getData = async ({
  from, to, senti, pt, subq, sort, type, page,
}) => {
  const res = await axiosInstance.get(Url, {
    params: {
      min: from, max: to, senti, pt, subq, sort, type, page,
    },
  })
  return res.data
}
