import { rest } from 'msw'
import { authAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${authAPI.Url}`

const authAPIs = [
  rest.post(Url, async (req, res, ctx) => {
    const { email, password } = await req.json()
    if (email !== 'admin' || password !== 'admin') {
      return res(
        ctx.status(401),
        ctx.json({
          detail: 'error',
        }),
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        refresh: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY3NzIzMjEwNiwiaWF0IjoxNjc3MTQ1NzA2LCJqdGkiOiI5ZjA2ZWVmMDI1MmE0OTE1YjJkNDYxMjNhNjY4OTFiMyIsInVzZXJfaWQiOjF9.OEeWGTek-UXfFvM0mfoZ_5eYWjuImsDkhffIaq4B-QI',
        access: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3MjMyMTA2LCJpYXQiOjE2NzcxNDU3MDYsImp0aSI6IjliOTViZjliMTk0ZjQ3OGZiYTFlMDlhZGY4YTAwZjAzIiwidXNlcl9pZCI6MX0.tJRxggcnQh6Es_0tIJd7dcTHOxbQ3LNrAHr7WiKps2o',
      }),
    )
  }),
]

export default authAPIs
