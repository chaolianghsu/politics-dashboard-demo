import { rest } from 'msw'
import { volumeAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${volumeAPI.Url}`

const volumeAPIs = [
  rest.get(Url, (req, res, ctx) => res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      result: [
        {
          date: [
            '2023/02/16',
            '2023/02/17',
            '2023/02/18',
            '2023/02/19',
            '2023/02/20',
            '2023/02/21',
            '2023/02/22',
          ],
          data: [
            {
              tn: '羅智強',
              q: '(羅智強|羅小強|羅痔瘡|羅智|羅智弱|羅自戕|騾子強)',
              g: [
                1193,
                1558,
                1475,
                1088,
                1626,
                1394,
                474,
              ],
              pc: '100.0%',
              t: 8808,
            },
          ],
          total: 8808,
          grow: '-52.25',
        },
      ],
      code: 0,
    }),
  )),
]

export default volumeAPIs
