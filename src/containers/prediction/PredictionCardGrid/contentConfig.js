import VolumeIcon from '@/assets/icons/volume.png'
import EngagementIcon from '@/assets/icons/engagement.png'
import FavorabilityIcon from '@/assets/icons/favorability.png'
import IntensityIcon from '@/assets/icons/intensity.png'
import InteractiveIcon from '@/assets/icons/interactive.png'
import ReputationIcon from '@/assets/icons/reputation.png'
import SpreadIcon from '@/assets/icons/spread.png'

const contentConfig = [
  {
    title: '網路聲量',
    subTitle: '3737',
    markNumber: 10,
    description: '網路討論數，筆數越多代表聲量越高。',
    imgSrc: VolumeIcon,
    linkTo: '/reputation/volume',
  },
  {
    title: '聲譽值',
    subTitle: '3737',
    markNumber: 10,
    description: '綜合評量網路聲量與好感度，數值越高代表聲譽越佳。',
    imgSrc: ReputationIcon,
    linkTo: '/reputation',
  }, {
    title: '好感度',
    subTitle: '3737',
    markNumber: -1,
    description: '正面情緒越多且負面情緒越少，好感度越高。',
    imgSrc: FavorabilityIcon,
    linkTo: '/reputation/favorability',
  }, {
    title: '社群互動力',
    subTitle: '3737',
    markNumber: null,
    description: '評量發文數、按讚數、留言數及分享數，數值越高表示該週互動度越高。',
    imgSrc: InteractiveIcon,
    linkTo: '/reputation',

  }, {
    title: '擴散廣度',
    subTitle: '3737',
    markNumber: null,
    description: '相關新聞出現的頻道數量。',
    imgSrc: SpreadIcon,
    linkTo: '/reputation/spread',

  }, {
    title: '互動強度',
    subTitle: '21.4 則',
    markNumber: null,
    description: '在社群、討論區、部落格中，平均每一篇文章有多少留言數。',
    imgSrc: IntensityIcon,
    linkTo: '/reputation/spread',

  }, {
    title: '粉絲觸及力',
    subTitle: '3737',
    markNumber: null,
    description: '粉專觸及的粉絲人數及粉絲成長數。',
    imgSrc: EngagementIcon,
    linkTo: '/reputation',
  },
]

export default contentConfig
