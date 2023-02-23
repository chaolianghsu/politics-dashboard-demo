import { rest } from 'msw'
import { favorabilityAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${favorabilityAPI.Url}`

const favorabilityAPIs = [
  rest.get(Url, (req, res, ctx) => res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      result: [{
        params: {
          q: '(羅智強|羅小強|羅痔瘡|羅智|羅智弱|羅自戕|騾子強)', tn: '羅智強', min: '20230216', max: '20230222', type: 'NEWS,SM,BBS,BLOG', subq: '', q_fields: ['title', 'content', 'title_tags', 'content_tags', 'hash_tags'], filter_chnls: [], filter_ads: '', realname: '政治儀表板2.0', token: 'HowDoYouTurnThisOn',
        },
        data: [{
          g: [418, 500, 292, 188, 250, 609, 86], pc: '26.61%', senti: '正面', t: 2343,
        }, {
          g: [530, 639, 682, 523, 705, 536, 209], pc: '43.43%', senti: '中立', t: 3824,
        }, {
          g: [245, 419, 501, 377, 671, 249, 175], pc: '29.95%', senti: '負面', t: 2637,
        }],
        date: ['2023/02/16', '2023/02/17', '2023/02/18', '2023/02/19', '2023/02/20', '2023/02/21', '2023/02/22'],
        version: 'v2',
        status: 'success',
        pn: 0.89,
        grow: '-3.26',
      }],
      code: 0,
    }),
  )),
]

export default favorabilityAPIs
