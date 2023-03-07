import { rest } from 'msw'
import { predictModuleAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${predictModuleAPI.Url}`

const predictModuleAPIs = [
  rest.get(Url, (req, res, ctx) => res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      result: [
        {
          date: '2023/01/22 ~ 2023/02/21',
          update: '2023/02/21',
          name: '羅智強',
          image: 'http://35.234.54.82/media/image/羅智強.png',
          vol: {
            total: 41762,
            grow: '8.92',
          },
          reputation: {
            total: 93962.9,
            grow: 4,
          },
          favorability: {
            total: 0.8,
            grow: '-4.76',
          },
          social_rc: 712118,
          social_touch: 118652,
          diffusion: 77,
          interaction: 21.2,
        },
      ],
      code: 0,
    }),
  )),
]

export default predictModuleAPIs
