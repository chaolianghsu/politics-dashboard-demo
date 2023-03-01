import { rest } from 'msw'
import { authAPI, baseUrl } from '@/apis'
import { genToken, tokenValidation } from '../utils/token'

const authAPIs = [
  rest.post(`${baseUrl}${authAPI.Url}`, async (req, res, ctx) => {
    const { email, password } = await req.json()
    if (email !== 'admin' || password !== 'admin') {
      return res(
        ctx.status(401),
        ctx.json({
          detail: 'error',
        }),
      )
    }
    const accessToken = genToken(10000)
    const refreshToken = genToken(2592000000)
    return res(
      ctx.status(200),
      ctx.json({
        refresh: accessToken,
        access: refreshToken,
      }),
    )
  }),
  rest.post(`${baseUrl}${authAPI.tokenVerifyUrl}`, async (req, res, ctx) => {
    const data = await req.json()
    const { token } = data
    const { success, message } = tokenValidation(token)
    if (success === true) {
      return res(
        ctx.status(200),
        ctx.json({ }),
      )
    }
    return res(
      ctx.status(401),
      ctx.json({
        detail: message,
      }),
    )
  }),

  rest.post(`${baseUrl}${authAPI.tokenRefreshUrl}`, async (req, res, ctx) => {
    const data = await req.json()
    const { refresh } = data
    const { success, message } = tokenValidation(refresh)
    if (success === true) {
      const accessToken = genToken(10000)
      return res(
        ctx.status(200),
        ctx.json({ access_token: accessToken }),
      )
    }
    return res(
      ctx.status(401),
      ctx.json({
        detail: message,
      }),
    )
  }),
]

export default authAPIs
