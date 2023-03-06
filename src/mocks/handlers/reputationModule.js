import { rest } from 'msw'
import { reputationModuleAPI, baseUrl } from '@/apis'

const Url = `${baseUrl}${reputationModuleAPI.Url}`

const reputationModuleAPIs = [
  rest.get(Url, (req, res, ctx) => res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({
      result: [
        {
          date: '2023/02/16 ~ 2023/02/22',
          update: '2023/02/21',
          name: '羅智強',
          image: 'http://35.234.54.82/media/image/羅智強.png',
          vol: {
            total: 8806,
            grow: '-52.26',
          },
          reputation: {
            total: 20589.6,
            grow: -55.5,
          },
          favorability: {
            total: 0.89,
            grow: '-3.26',
          },
          social_rc: 232229,
          social_touch: 118970,
          diffusion: 63,
          interaction: 19.3,
          hotkeyword: [
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
              value: 47,
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
              value: 17,
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
              name: '政府',
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
              name: '候選人',
              value: 9,
            },
            {
              name: '公職',
              value: 9,
            },
          ],
          textlist: [
            {
              ref: 'd08f4c51732e866c84e70ca2f5147204',
              title: '今天，我正式到立法院報到！\n我的新身分是：\n立法院高金素梅委員辦公室\n大安區義務選服主任\n\n也算是，',
              pt: '主文',
              src: 'FACEBOOK',
              time: '2023-02-21 08:01',
              senti: '中立',
              author: '羅智強',
              summary: '也算是，另一種形式的「前進國會」\n\n當然我也要特別謝謝高金素梅委員\n給我這樣一個職務和身分\n讓我還沒有選上立委\n就可以在高金素梅委員辦公室的協助下\n為大安區的選民服務\n所以大安區的朋友們\n如果有需要<span class="hl">羅智強</span>服務的地方',
              url: 'https://www.facebook.com/164872546882726_790278319120624',
              ch: '羅智強',
              lc: 37043,
              dc: 0,
              cc: 1466,
              sc: 150,
              vc: '-',
              stype: 'SM',
            },
            {
              ref: '465208d0127c2951f96c9f13fa2d7d5a',
              title: '[新聞] 鄭文燦蓋的羽球場出包　張善政被約談',
              pt: '主文',
              src: 'PTT',
              time: '2023-02-18 07:18',
              senti: '負面',
              author: 'icewood1',
              summary: '前北市議員<span class="hl">羅智強</span>也回應「這概念，是拿隋朝的弊\n案，逼宮唐朝的官！」',
              url: 'https://www.ptt.cc/bbs/Gossiping/M.1676675940.A.B55.html',
              ch: '八卦板',
              lc: 370,
              dc: 69,
              cc: 590,
              sc: 0,
              vc: '-',
              stype: 'BBS',
            },
            {
              ref: 'b2fe6de5153fd1f302cc55ae98ee87d5',
              title: '【頭條開講】世界顫抖吧!普丁:宣布恢復核試爆!是西方發動戰爭!秦王聯手出擊!世界安全不是個別國家說了',
              pt: '主文',
              src: 'YOUTUBE',
              time: '2023-02-21 22:09',
              senti: '正面',
              author: '頭條開講',
              summary: '主持人 #馬千惠 #鄭亦真\n\n時事評論員 #賴岳謙\n台大教授 #苑舉正\n時事評論員 #謝寒冰\n前立法委員 #蔡正元\n時事評論員 #王尚智\n前總統府副秘書長 #<span class="hl">羅智強</span>\n\n1.震撼世界的兩大演講開始! ... <span class="hl">羅智強</span>正式報到立院! ... 拜登 #普丁 #習近平 #烏克蘭 #俄羅斯 #基輔 #秦剛 #王毅 #德國 #科隆 #狂歡節 #熊貓 #香香 #日本 #韓國 #尹錫悅 #李在明 #逮捕 #台灣 #國民黨 #夏立言 #蔡英文 #蛋荒 #<span class="hl">羅智強</span>',
              url: 'https://www.youtube.com/watch?v=7AUNAn1uHDs',
              ch: '頭條開講',
              lc: 19163,
              dc: 0,
              cc: 554,
              sc: 0,
              vc: 229615,
              stype: 'SM',
            },
            {
              ref: '8742158e82d781ffb92fed430d47233d',
              title: '國民黨傳出要制定「大局條款」\n現任議員若欲更上層樓，將會受到影響\n\n我先說我的立場，我不贊成\n\n我決',
              pt: '主文',
              src: 'FACEBOOK',
              time: '2023-02-19 13:55',
              senti: '中立',
              author: '羅智強',
              summary: '我覺得還是應該要由選民決定\n\n就像在大安區\n也曾有選民對我說：\n「目前失業的<span class="hl">羅智強</span>選立法委員，並不會影響台北市議會的席次，這是我投票的考量原因之一，但更重要的是，我覺得你的戰力是最強的，你如果進到立法院',
              url: 'https://www.facebook.com/164872546882726_789117149236741',
              ch: '羅智強',
              lc: 10688,
              dc: 0,
              cc: 538,
              sc: 74,
              vc: '-',
              stype: 'SM',
            },
            {
              ref: 'ed34f17a22be4179cede889dcab6a223',
              title: '支持者們傳頌關於羅智強的神話，其中有一說，是他輔選三名助理選上市議員，這就是戰績，這就是戰功。\n\n但',
              pt: '主文',
              src: 'FACEBOOK',
              time: '2023-02-18 10:08',
              senti: '中立',
              author: '不演了新聞台',
              summary: '支持者們傳頌關於<span class="hl">羅智強</span>的神話，其中有一說，是他輔選三名助理選上市議員，這就是戰績，這就是戰功。 ... 台南市新科議員蔡宗豪，當然是青年才俊，也曾在<span class="hl">羅智強</span>團隊服務，但他之所以出來參選，是因為謝龍介。 ... 但在<span class="hl">羅智強</span>與粉絲關於世代交替的敘事中，謝龍介好像不見了，也沒有其他人，要謝就謝<span class="hl">羅智強</span>。 ... 在這幾天的論戰當中，我最受不了的就是早先的「戰將論」，把<span class="hl">羅智強</span>跟謝龍介、柯志恩相提並論，明明在選前選後，都是完全不同的狀況，拜託不要睜眼說瞎話。',
              url: 'https://www.facebook.com/112223830463444_744847337288383',
              ch: '不演了新聞台',
              lc: 919,
              dc: 0,
              cc: 526,
              sc: 6,
              vc: '-',
              stype: 'SM',
            },
            {
              ref: '0e9015affccb84642db5b9ba1184927a',
              title: '上班囉！\n\n擔任高金素梅大安區義務選服主任　\n先進國會實習！\n\n今天到立法院報到！擔任高金素梅的義務',
              pt: '主文',
              src: 'FACEBOOK',
              time: '2023-02-21 11:01',
              senti: '中立',
              author: '羅智強',
              summary: '未來高金素梅也會陪著<span class="hl">羅智強</span>經常一起出現在大安區活動，走進群眾，服務人民。 ... 高金素梅向選民喊話，他相信國會如果有<span class="hl">羅智強</span>，國家監督的力量，和政府的整體運作，一定能更上一層樓。',
              url: 'https://www.facebook.com/164872546882726_790351635779959',
              ch: '羅智強',
              lc: 14639,
              dc: 0,
              cc: 476,
              sc: 79,
              vc: '-',
              stype: 'SM',
            },
            {
              ref: '25b039dc0edf46e06dc05334da1960f8',
              title: '熟悉的智強最對味。\n\n羅智強寫自己參選大安區立委，「好像做了什麼十惡不赦的事情」，但事實是，他明明只',
              pt: '主文',
              src: 'FACEBOOK',
              time: '2023-02-17 09:36',
              senti: '中立',
              author: '不演了新聞台',
              summary: '<span class="hl">羅智強</span>寫自己參選大安區立委，「好像做了什麼十惡不赦的事情」，但事實是，他明明只是被質疑那些他真的做過的事，例如「一屆議員都沒當完」，「一年宣布參選四個不同選區職務」。 ... 而且出征好像大多是<span class="hl">羅智強</span>支持者？） ... 而我做為一個過去的支持者，質疑<span class="hl">羅智強</span>本人：那些價值咧？ ... 結果<span class="hl">羅智強</span>就會乾坤大挪移說我在攻擊邱，一手跟邱販賣人情，轉手又再向粉絲兜售一次自己的「委屈」。 ... 但其實我從未如此清明，因為徹底脫離了那個把政治演成善惡二元戲碼，而<span class="hl">羅智強</span>永遠是善的同溫層，很多事情都變得更加容易。',
              url: 'https://www.facebook.com/112223830463444_744168064022977',
              ch: '不演了新聞台',
              lc: 1092,
              dc: 0,
              cc: 465,
              sc: 10,
              vc: '-',
              stype: 'SM',
            },
            {
              ref: '2bcf4f4b5b37716735e14994ec2077c5',
              title: '台灣將成下個烏克蘭?! 蔡正元.羅智強分析"幕後黑手"驚人舉動 @CtiNews',
              pt: '主文',
              src: 'YOUTUBE',
              time: '2023-02-22 00:45',
              senti: '中立',
              author: '中天新聞',
              summary: '#烏克蘭#台灣#俄烏戰爭#秦剛#蔡正元#<span class="hl">羅智強</span>#兩岸#台海危機#監督的力量在中天#美國#拜登#民進黨#中國大陸#習近平\n責任小編:#昌編\n\n本片完整版:https://youtube.com/live/',
              url: 'https://www.youtube.com/watch?v=ymH_iYsXFf8',
              ch: '中天新聞',
              lc: 1882,
              dc: 0,
              cc: 319,
              sc: 0,
              vc: 43673,
              stype: 'SM',
            },
            {
              ref: 'e3063243976c5ac20724338fd3b13a44',
              title: '【週末大爆卦】獨家!內亂?徐巧芯哭訴遭藍營家暴?爆料陳宗彥召X藍綠互推?百官醜聞都在蔡英文手中?豆哥',
              pt: '主文',
              src: 'YOUTUBE',
              time: '2023-02-19 16:07',
              senti: '中立',
              author: '大新聞大爆卦',
              summary: '主持人 #李珮瑄\n\n#徐巧芯 #侯漢廷 #葉元之 #<span class="hl">羅智強</span> #董智森\n\n《精彩回顧》\n⭐️黃揚明爆陳宗彥召X"內用改外帶"內幕!',
              url: 'https://www.youtube.com/watch?v=HxXWmuR3OTc',
              ch: '大新聞大爆卦',
              lc: 10498,
              dc: 0,
              cc: 294,
              sc: 0,
              vc: 84942,
              stype: 'SM',
            },
            {
              ref: 'c373857e089cd3d3937612870920fdc9',
              title: '[新聞] 影／陳揮文建議退黨 徐巧芯哽咽落淚連說',
              pt: '主文',
              src: 'PTT',
              time: '2023-02-21 06:33',
              senti: '中立',
              author: 'zxc17893',
              summary: '資深媒體人陳揮文今天在「新聞大白話」語重心長地說，「其實我還滿希望她退黨」，他認\n為徐巧芯如同去年被幹掉的<span class="hl">羅智強</span>，直呼國民黨顢頇到這個程度，寧願不要這個戰將。',
              url: 'https://www.ptt.cc/bbs/Gossiping/M.1676932422.A.6EE.html',
              ch: '八卦板',
              lc: 128,
              dc: 73,
              cc: 285,
              sc: 0,
              vc: '-',
              stype: 'BBS',
            },
          ],
        },
      ],
      code: 0,
    }),
  )),
]

export default reputationModuleAPIs
