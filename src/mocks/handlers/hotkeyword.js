import { rest } from 'msw'
import { hotkeywordAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${hotkeywordAPI.Url}`

const hotkeywordAPIs = [
  rest.get(Url, (req, res, ctx) => res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      result: [
        {
          name: '立委',
          value: 85,
        },
        {
          name: '國民黨',
          value: 77,
        },
        {
          name: '加油',
          value: 70,
        },
        {
          name: '議員',
          value: 69,
        },
        {
          name: '羅智強',
          value: 59,
        },
        {
          name: '大安區',
          value: 51,
        },
        {
          name: '參選',
          value: 46,
        },
        {
          name: '台北市',
          value: 42,
        },
        {
          name: '初選',
          value: 40,
        },
        {
          name: '民進黨',
          value: 37,
        },
        {
          name: '支持',
          value: 36,
        },
        {
          name: '提名',
          value: 33,
        },
        {
          name: '徐巧芯',
          value: 32,
        },
        {
          name: '選舉',
          value: 31,
        },
        {
          name: '大局',
          value: 30,
        },
        {
          name: '大安',
          value: 27,
        },
        {
          name: '黨內',
          value: 27,
        },
        {
          name: '現任',
          value: 27,
        },
        {
          name: '條款',
          value: 27,
        },
        {
          name: '選區',
          value: 26,
        },
        {
          name: '選民',
          value: 26,
        },
        {
          name: '臉書',
          value: 25,
        },
        {
          name: '宣布',
          value: 25,
        },
        {
          name: '國會',
          value: 24,
        },
        {
          name: '立法院',
          value: 21,
        },
        {
          name: '政治',
          value: 21,
        },
        {
          name: '擔任',
          value: 20,
        },
        {
          name: '秘書長',
          value: 19,
        },
        {
          name: '總統',
          value: 17,
        },
        {
          name: '選戰',
          value: 16,
        },
        {
          name: '公平',
          value: 16,
        },
        {
          name: '監督',
          value: 16,
        },
        {
          name: '身分',
          value: 15,
        },
        {
          name: '藍營',
          value: 15,
        },
        {
          name: '進入',
          value: 15,
        },
        {
          name: '桃園',
          value: 15,
        },
        {
          name: '服務',
          value: 14,
        },
        {
          name: '國安',
          value: 14,
        },
        {
          name: '市長',
          value: 14,
        },
        {
          name: '投入',
          value: 13,
        },
        {
          name: '人民',
          value: 13,
        },
        {
          name: '相信',
          value: 12,
        },
        {
          name: '發文',
          value: 12,
        },
        {
          name: '媒體',
          value: 12,
        },
        {
          name: '傳出',
          value: 12,
        },
        {
          name: '優先',
          value: 12,
        },
        {
          name: '黨中央',
          value: 12,
        },
        {
          name: '主任',
          value: 12,
        },
        {
          name: '交替',
          value: 11,
        },
        {
          name: '世代',
          value: 11,
        },
        {
          name: '辦公室',
          value: 11,
        },
        {
          name: '地方',
          value: 11,
        },
        {
          name: '朱立倫',
          value: 11,
        },
        {
          name: '費鴻泰',
          value: 11,
        },
        {
          name: '攻擊',
          value: 11,
        },
        {
          name: '競選',
          value: 11,
        },
        {
          name: '北市',
          value: 10,
        },
        {
          name: '發言人',
          value: 10,
        },
        {
          name: '立院',
          value: 10,
        },
        {
          name: '郭台銘',
          value: 10,
        },
        {
          name: '從政',
          value: 10,
        },
        {
          name: '基層',
          value: 10,
        },
        {
          name: '力挺',
          value: 10,
        },
        {
          name: '張善政',
          value: 10,
        },
        {
          name: '直言',
          value: 10,
        },
        {
          name: '中央',
          value: 10,
        },
        {
          name: '團隊',
          value: 10,
        },
        {
          name: '民代',
          value: 10,
        },
        {
          name: '議會',
          value: 10,
        },
        {
          name: '大選',
          value: 10,
        },
        {
          name: '努力',
          value: 10,
        },
        {
          name: '納入',
          value: 10,
        },
        {
          name: '失敗',
          value: 9,
        },
        {
          name: '政府',
          value: 9,
        },
        {
          name: '挑戰',
          value: 9,
        },
        {
          name: '競爭',
          value: 9,
        },
        {
          name: '議長',
          value: 9,
        },
        {
          name: '無黨籍',
          value: 9,
        },
        {
          name: '公職',
          value: 9,
        },
        {
          name: '民選',
          value: 9,
        },
      ],
      code: 0,
    }),
  )),
]

export default hotkeywordAPIs
