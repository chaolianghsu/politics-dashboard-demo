import { rest } from 'msw'
import { diffusionAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${diffusionAPI.Url}`

const diffusionAPIs = [
  rest.get(Url, (req, res, ctx) => res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({ result: [{ diffusion: 90 }], code: 0 }),
  )),
]

export default diffusionAPIs
