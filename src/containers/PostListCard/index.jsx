import {
  Box, CardContent, Typography, Stack, Link, styled, CircularProgress,
} from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import PropTypes from 'prop-types'
import { Card, DataGrid, BlueButton } from '@/components'
import Tab from './Tab'

const PostListCardPropTypes = {
  withLikeShare: PropTypes.bool,
  tabValue: PropTypes.number,
  tabOnChange: PropTypes.func,
  tabNames: PropTypes.arrayOf(PropTypes.string),
  displayDateStart: PropTypes.string,
  displayDateEnd: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    cc: PropTypes.number,
    ch: PropTypes.string,
    dc: PropTypes.number,
    lc: PropTypes.number,
    pt: PropTypes.string,
    ref: PropTypes.string,
    sc: PropTypes.number,
    senti: PropTypes.string,
    src: PropTypes.string,
    stype: PropTypes.string,
    summary: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    vc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  isLoading: PropTypes.bool,
  handleQueryPage: PropTypes.func,
  isNoMoreData: PropTypes.bool,
}

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
})

const CustomTypography = styled(Typography)({
  color: 'rgb(115, 144, 168)', paddingX: '1rem', paddingY: '.3rem', marginRight: '1rem', borderRadius: '5px', fontSize: '15px', fontWeight: '400',
})

const fakeData = [
  {
    ref: '7ab5c993e7503cbf720a5f098ecb8e7f',
    title: '我決定，參選立委\n參選哪個選區，我還沒決定\n也想聽聽大家的意見\n\n我預定農曆年後\n就會作最後的決定',
    pt: '主文',
    src: 'FACEBOOK',
    time: '2023-01-15 08:34',
    senti: '中立',
    author: '羅智強',
    summary: '對於政府不當的決策甚至貪瀆不法，必須善盡監督之責\n我有自信，結合優秀的人才，一起進軍國會，我們一定會成為制度進步的先鋒\n興利除弊，努力打造更好的台灣\n\n我會努力\n而各位、我最親愛的好朋友們\n請大家一起當<span class="hl">羅智強</span>的後盾',
    url: 'https://www.facebook.com/164872546882726_764950844986705',
    ch: '羅智強',
    lc: 34086,
    dc: 0,
    cc: 3113,
    sc: 291,
    vc: '-',
    stype: 'SM',
  },
  {
    ref: '42510f09afbb4114c532c7b5bab51466',
    title: '兩岸開戰台北101將化為灰燼！？ 24劇本美日台慘勝「南台灣登陸戰」能源是死穴！【關鍵時刻】2023',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-01-11 00:00',
    senti: '中立',
    author: '關鍵時刻',
    summary: '美國24次兵推21次從南部登陸！？ 解放軍「一路向北」台灣要死守70天等待馳援！？\n解放軍登陸戰拚首日8千人上岸！？ CSIS：中國空降部隊太脆弱、只能靠海軍登陸！\n美國沉2航母換中國海軍全滅！？ 美',
    url: 'https://www.youtube.com/watch?v=EhCzDaE1Ru4',
    ch: '關鍵時刻',
    lc: 1635,
    dc: 0,
    cc: 1059,
    sc: 0,
    vc: 161242,
    stype: 'SM',
  },
  {
    ref: 'fcb4d8d258c20631249bb1b0877bf48a',
    title: '【精選】「南台灣成破口」解放軍登陸戰首日拚8千人上岸！？美兵推結果慘勝「基地」成扭轉台海戰局關鍵！【',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-01-15 19:00',
    senti: '中立',
    author: '關鍵時刻',
    summary: '(00:00:00)美國24次兵推21次從南部登陸！？解放軍「一路向北」台灣要死守70天等待馳援！？\n(00:19:33)濱海作戰團將「鎖死」中國在第一島鏈！CSIS台海兵推慘勝 「基地」成改戰局關鍵',
    url: 'https://www.youtube.com/watch?v=RF_pWovvHcw',
    ch: '關鍵時刻',
    lc: 1920,
    dc: 0,
    cc: 1044,
    sc: 0,
    vc: 202296,
    stype: 'SM',
  },
  {
    ref: '4e2654efe2d88c9d66b31b4f24130ca0',
    title: '【下班瀚你聊】2023-01-11 Ep.30 羅智強點名：2024只有"這個男人"能贏賴神！蘇揆遲',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-01-11 20:00',
    senti: '正面',
    author: '風傳媒 The Storm Media',
    summary: '<span class="hl">羅智強</span>:蘇揆態度成勝負關鍵! ... <span class="hl">羅智強</span>曝KMT 2024的隱憂是? ... <span class="hl">羅智強</span>曝藍營黃金陣容! ... <span class="hl">羅智強</span>獨揭KMT 2024的必勝王牌! ... <span class="hl">羅智強</span>的下班告白..',
    url: 'https://www.youtube.com/watch?v=yyWu-QuX_gs',
    ch: '風傳媒 The Storm Media',
    lc: 10361,
    dc: 0,
    cc: 826,
    sc: 0,
    vc: 452437,
    stype: 'SM',
  },
  {
    ref: '57aa39f0fa72bfedbb445ed6e10d4011',
    title: '羅智強選立委該去哪？\n\n看到智強 宣布參選立委，但選區未定……\n\n好多＜來這＞＜來這＞的強粉私訊來敲',
    pt: '主文',
    src: 'FACEBOOK',
    time: '2023-01-23 14:10',
    senti: '中立',
    author: '游淑慧 台北市議員',
    summary: '<span class="hl">羅智強</span>選立委該去哪？ ... 看到智強 宣布參選立委，但選區未定……\n\n好多＜來這＞＜來這＞的強粉私訊來敲我，要我遊說強哥到這到那……看來戰將<span class="hl">羅智強</span>到那，都是能帶動熱情的強棒。 ... 很期待2018班的 <span class="hl">羅智強</span> 、 徐巧芯  和我，能再次在2024年併肩作戰，讓民進黨從台北開始、一路潰敗。',
    url: 'https://www.facebook.com/725501890978632_718677953149191',
    ch: '游淑慧 台北市議員',
    lc: 12321,
    dc: 0,
    cc: 667,
    sc: 70,
    vc: '-',
    stype: 'SM',
  },
  {
    ref: 'f0a3740999402ad33f174f70a355686b',
    title: '閒暇之餘時常會在住家周邊的街道散步，因附近新蓋建築多，人行道較為平整，但是其他市區街道的狀況卻參差不',
    pt: '主文',
    src: 'FACEBOOK',
    time: '2023-01-16 11:03',
    senti: '中立',
    author: '柯志恩',
    summary: '先前與<span class="hl">羅智強</span>從科工館行腳到鳳山北門公園，印象中彼此講最多的一句話就是「小心路面!」',
    url: 'https://www.facebook.com/911433142308383_742317103915345',
    ch: '柯志恩',
    lc: 22384,
    dc: 0,
    cc: 662,
    sc: 177,
    vc: '-',
    stype: 'SM',
  },
  {
    ref: 'e0d5f6bbfe31f13c3f63ead2bf865a0b',
    title: '羅智強要拚的\n不只是立法委員\n更是政黨輪替',
    pt: '主文',
    src: 'FACEBOOK',
    time: '2023-01-16 14:19',
    senti: '中立',
    author: '羅智強',
    summary: '<span class="hl">羅智強</span>要拚的\n不只是立法委員\n更是政黨輪替',
    url: 'https://www.facebook.com/164872546882726_765822031566253',
    ch: '羅智強',
    lc: 17576,
    dc: 0,
    cc: 631,
    sc: 159,
    vc: '-',
    stype: 'SM',
  },
  {
    ref: '788743af1bde847f9e6625f11b1c35d1',
    title: '【頭條開講】秦剛雷霆怒!嚇到尹錫悅急令內閣快解釋!口岸簽證也不通!日韓嚇到嘴皮放軟"遺憾"?英義日大',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-01-11 22:54',
    senti: '中立',
    author: '頭條開講',
    summary: '主持人 #周玉琴\n\n前立法委員 #蔡正元\n前駐紐西蘭大使 #介文汲\n桃園市議員 #黃敬平\n前總統赴副秘書長 #<span class="hl">羅智強</span>\n前立法委員 #李勝峰\n時事評論員 #朱凱翔\n\n1.中國雷霆之怒加碼制裁!',
    url: 'https://www.youtube.com/watch?v=UROpMd9RBMg',
    ch: '頭條開講',
    lc: 22069,
    dc: 0,
    cc: 622,
    sc: 0,
    vc: 291387,
    stype: 'SM',
  },
  {
    ref: '3dd481c0ffb011abb4cdca68115fe8d8',
    title: '＃最新聲援王世堅名單\n\n✅韓國瑜\n✅郭正亮\n✅蔡正元\n✅王淺秋\n✅侯漢廷\n✅羅智強\n✅高嘉瑜\n✅黃珊',
    pt: '主文',
    src: 'FBP',
    time: '2023-01-17 18:08',
    senti: '中立',
    author: '王浩宇',
    summary: '＃最新聲援王世堅名單\n\n✅韓國瑜\n✅郭正亮\n✅蔡正元\n✅王淺秋\n✅侯漢廷\n✅<span class="hl">羅智強</span>\n✅高嘉瑜\n✅黃珊珊\n✅國橋汪導\n✅潘建志\n✅周偉航\n✅ 徐巧芯\n✅ 王鴻薇\n✅TVBS\n✅中天\n✅東森\n✅台海網（中共官媒',
    url: 'https://www.facebook.com/1775451270_10210745283186271',
    ch: '王浩宇',
    lc: 2197,
    dc: 0,
    cc: 614,
    sc: 93,
    vc: '-',
    stype: 'SM',
  },
  {
    ref: '112a16d7d8867749cf1e03db1eb6c224',
    title: '中國兩會後共軍對美台「極盡挑釁」！ 逼近台灣西北空域天弓、愛國者警鈴大作！？【關鍵時刻】202301',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-01-04 00:00',
    senti: '中立',
    author: '關鍵時刻',
    summary: '中國兩會後共軍對美台「極盡挑釁」！ 逼近台灣西北空域天弓、愛國者警鈴大作！？\n央視秀解放軍戰機「夜間密集作戰」！ 遼寧號近逼關島、山東艦「模擬攻擊」美艦！？ \n疫情大爆發之際…中國殲-11「到處點火」',
    url: 'https://www.youtube.com/watch?v=X6dXZ5PPIiM',
    ch: '關鍵時刻',
    lc: 1780,
    dc: 0,
    cc: 582,
    sc: 0,
    vc: 209354,
    stype: 'SM',
  },
]

const columns = [
  {
    field: 'title',
    headerName: '文章標題',
    sortable: false,
    flex: 1,
    minWidth: 200,
    renderCell: (index) => (
      <NoMaxWidthTooltip
        // open
        placement="top"
        title={<p style={{ fontSize: '15px', margin: '5px' }}>{index.value}</p>}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{
            color: 'white', backgroundColor: 'customGridTextBlue.light', paddingX: '1rem', paddingY: '.3rem', marginRight: '1rem', borderRadius: '5px', fontSize: '15px', fontWeight: '400',
          }}
          >
            {index.row.pt}
          </Typography>
          <Link
            href={index.row.url}
            sx={{
              textDecoration: 'none', color: 'customGridTextBlue.main', fontSize: '15px', fontWeight: '400',
            }}
            target="_block"
          >
            {index.value}
          </Link>
        </Box>
      </NoMaxWidthTooltip>
    ),
  },
  {
    field: 'src',
    headerName: '資料來源',
    width: 150,
    sortable: false,
    renderCell: (index) => (
      <NoMaxWidthTooltip
      // open
        placement="top"
        title={<p style={{ fontSize: '15px', margin: '5px' }}>{index.value}</p>}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomTypography>
            {index.value}
          </CustomTypography>
        </Box>
      </NoMaxWidthTooltip>
    ),
  },
  {
    field: 'cc',
    headerName: '回文數',
    width: 100,
    sortable: false,
    renderCell: (index) => (
      <CustomTypography>
        {index.value}
      </CustomTypography>
    ),
  },
  {
    field: 'time',
    headerName: '時間',
    width: 200,
    sortable: false,
    renderCell: (index) => (
      <CustomTypography>
        {index.value}
      </CustomTypography>
    ),
  },
]

const additionalColumn = [
  {
    field: 'lc',
    headerName: '按讚數',
    width: 100,
    sortable: false,
  },
  {
    field: 'sc',
    headerName: '分享數',
    width: 100,
    sortable: false,
  },
]
function PostListCard({
  isLoading,
  withLikeShare = false,
  handleQueryPage,
  tabValue = 0,
  tabOnChange = () => {},
  tabNames = [],
  data = fakeData,
  displayDateStart = '2023/01/01',
  displayDateEnd = '2023/02/01',
  isNoMoreData = false,
}) {
  const dataWithId = data.map((item) => ({
    ...item,
    id: item.ref,
  }))
  const newColumns = withLikeShare
    ? [...columns.slice(0, 3), ...additionalColumn, ...columns.slice(3, 4)] : columns

  return (
    <Card
      title={(
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              color: 'customGray.main',
              fontSize: '2.4rem',
            }}
          >
            {`${displayDateStart} - ${displayDateEnd}的文章列表`}
          </Typography>
        </Stack>
      )}
    >
      <CardContent sx={{ padding: 0, textAlign: 'center' }}>
        <Box
          sx={{
            height: '50rem',
            width: '100%',
            backgroundColor: 'customWhite.main',
            padding: '1rem',
          }}
        >
          {!!tabNames.length
          && <Tab tabValue={tabValue} tabOnChange={tabOnChange} tabNames={tabNames} />}
          {isLoading ? (
            <Box sx={{
              zIndex: 2000, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#D0D0D0',
            }}
            >
              <CircularProgress color="inherit" size={100} thickness={4} />
            </Box>
          ) : (
            <DataGrid
              rows={dataWithId}
              columns={newColumns}
              disableSelectionOnClick
              hideFooter
            />
          )}
        </Box>
        <BlueButton
          sx={{ marginTop: '4rem' }}
          disabled={isNoMoreData}
          onClick={handleQueryPage}
        >
          載入更多
        </BlueButton>
      </CardContent>
    </Card>
  )
}

PostListCard.propTypes = PostListCardPropTypes

export default PostListCard
