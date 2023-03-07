import { rest } from 'msw'
import { reputationAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${reputationAPI.Url}`

const reputationAPIs = [
  rest.get(Url, (req, res, ctx) => res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      result: [
        {
          reputation: 20589.6,
          reputation_grow: -55.5,
        },
      ],
      code: 0,
    }),
  )),
]

export default reputationAPIs
