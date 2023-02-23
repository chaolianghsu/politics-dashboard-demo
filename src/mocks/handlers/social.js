import { rest } from 'msw'
import { socialAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${socialAPI.Url}`

const socialAPIs = [
  rest.get(Url, (req, res, ctx) => res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      result: [
        {
          social_rc: {
            total: 232229,
            categories: [
              '2023-02-16',
              '2023-02-17',
              '2023-02-18',
              '2023-02-19',
              '2023-02-20',
              '2023-02-21',
              '2023-02-22',
            ],
            series: [
              {
                name: '社群互動數',
                data: [
                  9661,
                  55128,
                  48585,
                  37987,
                  29,
                  38,
                  0,
                ],
              },
            ],
          },
          social_touch: {
            total: 118970,
            categories: [
              '2023-02-16',
              '2023-02-17',
              '2023-02-18',
              '2023-02-19',
              '2023-02-20',
              '2023-02-21',
              '2023-02-22',
            ],
            series: [
              {
                name: '粉絲成長數',
                data: [
                  9661,
                  55128,
                  48585,
                  37987,
                  29,
                  38,
                  0,
                ],
              },
            ],
          },
          social_rc_ratio: {
            comments: 9721,
            shares: 2291,
            sad: 2219,
            wow: 569,
            love: 4509,
            angry: 325,
            haha: 5540,
            ratio: 1.95,
            like: 230010,
            reactions: 243172,
          },
        },
      ],
      code: 0,
    }),
  )),
]

export default socialAPIs
