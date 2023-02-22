import { rest } from 'msw'
import { interactionAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${interactionAPI.Url}`

const interactionPIs = [
  rest.get(Url, (req, res, ctx) => res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      result: [
        {
          interaction: 19.3,
        },
      ],
      code: 0,
    }),
  )),
]

export default interactionPIs
