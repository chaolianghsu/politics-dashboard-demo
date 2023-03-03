import {
  Box, CardContent, Typography, Stack, Link,
} from '@mui/material'
import PropTypes from 'prop-types'
import { Card, DataGrid, BlueButton } from '@/components'
import { useState } from 'react'
import Tab from './Tab'

const PostListCardPropTypes = {
  withLikeShare: PropTypes.bool,
  tabValue: PropTypes.number,
  tabOnChange: PropTypes.func,
  tabNames: PropTypes.arrayOf(PropTypes.string),
}
const fakeData = [
  {
    ref: '25a0b71d891bccf62fe657ac0cc57d6e',
    title: '羅智強直接痛批...（#妮塔）',
    pt: '主文',
    src: 'FACEBOOK',
    time: '2023-02-28 13:06',
    senti: '負面',
    author: 'ETtoday新聞雲',
    summary: '<span class="hl">羅智強</span>直接痛批...',
    url: 'https://www.facebook.com/242305665805605_6658184704217637',
    ch: 'ETtoday新聞雲',
    lc: 242,
    dc: 0,
    cc: 561,
    sc: 7,
    vc: '-',
    stype: 'SM',
  },
  {
    ref: '8695566a7eb29b36f23b1ef3bd494ab9',
    title: '停辦228追思會？\n羅智強：蔡英文家族\n是「威權得利者」',
    pt: '主文',
    src: 'FACEBOOK',
    time: '2023-03-01 15:40',
    senti: '負面',
    author: 'udn.com 聯合新聞網',
    summary: '<span class="hl">羅智強</span>：蔡英文家族\n是「威權得利者」',
    url: 'https://www.facebook.com/241284961029_10162937280916030',
    ch: 'udn.com 聯合新聞網',
    lc: 1492,
    dc: 0,
    cc: 543,
    sc: 19,
    vc: '-',
    stype: 'SM',
  },
  {
    ref: '07e8e75d24f3c1d11e3c5c91c705ce72',
    title: '【頭條開講】北京笑:你怕了嗎?美加下令刪除Tik Tok!南海衝突再擴大!小馬可仕要搞美日澳聯合巡航',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-02-28 22:11',
    senti: '中立',
    author: '頭條開講',
    summary: '主持人 #周玉琴 #林嘉源\n\n時事評論員 #賴岳謙\n台大教授 #苑舉正\n時事評論員 #謝寒冰\n前立法委員 #蔡正元\n前總統府副秘書長 #<span class="hl">羅智強</span>\n時事評論員 #黃士修\n\n1.擴大抗中戰線?',
    url: 'https://www.youtube.com/watch?v=tm6GTvtsQTw',
    ch: '頭條開講',
    lc: 16542,
    dc: 0,
    cc: 288,
    sc: 0,
    vc: 212587,
    stype: 'SM',
  },
  {
    ref: 'af43fa179e638adbbddce616f9979edf',
    title: '蔡英文澳洲空運蛋倒貼3千萬 高虹安揭綠朝十多官員疏失 新聞大白話@tvbstalk 20230301',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-03-01 15:30',
    senti: '中立',
    author: '新聞大白話',
    summary: '主持人：#翟翾\n本集來賓：#徐巧芯、#朱學恒、#<span class="hl">羅智強</span>\n\n【快按讚】《新聞大白話》Facebook▶️https://bit.ly/3BCysKp \n【快訂閱】《新聞大白話》YouTube▶️https',
    url: 'https://www.youtube.com/watch?v=0UKfYL1X4NQ',
    ch: '新聞大白話',
    lc: 2258,
    dc: 0,
    cc: 261,
    sc: 0,
    vc: 67806,
    stype: 'SM',
  },
  {
    ref: '0a78c0ad1fa49c6cab94de1e0632e647',
    title: '[新聞] 果然是綠共？羅智強批「全動法」復辟《',
    pt: '主文',
    src: 'PTT',
    time: '2023-02-28 12:00',
    senti: '中立',
    author: 'KONAMI',
    summary: '<span class="hl">羅智強</span>批「全動法」復辟《動員戡亂時期臨時條款》\n\n4.完整新聞內文:\n\n國防部近日預告修正「全民防衛動員準備法」，更名為「全民防衛動員法」，增訂動員實\n施階段徵購、徵用與罰則等，要求縣市政府平時就應對媒體 ... 對此，國民黨前台北市議員<span class="hl">羅智強</span>27日就痛批「果然是\n綠共！」 ... <span class="hl">羅智強</span>指出，國防部公告要修訂「全民防衛動員法」，未來平時媒體要配合政府的「調查\n、統計、 編組及規劃」，而只要總統發布「動員令」，就可以「對新聞從業人員作必要\n管制」，控制傳播媒體與通訊設備，他批評，「 ... <span class="hl">羅智強</span>表示，面臨緊急危難（例如戰爭），憲法本就給予總統「緊急命令」之權，但這個\n權限必須在十日內由立法院追認，他痛批，而現在民進黨要做的，就是把「緊急命令」常\n態化，把對媒體的控制日常化。',
    url: 'https://www.ptt.cc/bbs/Gossiping/M.1677556804.A.5B5.html',
    ch: '八卦板',
    lc: 133,
    dc: 38,
    cc: 252,
    sc: 0,
    vc: '-',
    stype: 'BBS',
  },
  {
    ref: '0055a3d2115baa05e30cc9b6235de459',
    title: '【每日必看】2024總統大選最新民調大逆轉 "他"衝向第一｜紀念二二八 侯友宜:國家人民利益超越黨派',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-03-01 08:58',
    senti: '中立',
    author: '中天新聞',
    summary: '蔡正元.<span class="hl">羅智強</span>分析"幕後黑手"驚人舉動\nhttps://youtu.be/ymH_iYsXFf8\n華為5G通訊成功"去美化" 設備美國零件占比不到1%\nhttps://youtu.be/ppcO_tE99nk',
    url: 'https://www.youtube.com/watch?v=dIZfrZw1T9w',
    ch: '中天新聞',
    lc: 1456,
    dc: 0,
    cc: 226,
    sc: 0,
    vc: 65081,
    stype: 'SM',
  },
  {
    ref: '3f68d64737feba28ca5201b5662f0641',
    title: '蔡英文Po文薦三電影被譙爆 綠解方要人民自己養雞生蛋？ 新聞大白話@tvbstalk 2023022',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-02-26 15:31',
    senti: '正面',
    author: '新聞大白話',
    summary: '主持人：#李作珩\n本集來賓：#<span class="hl">羅智強</span>、#游淑慧、#黃揚明\n\n【快按讚】《新聞大白話》Facebook▶️https://bit.ly/3BCysKp \n【快訂閱】《新聞大白話》YouTube▶️https',
    url: 'https://www.youtube.com/watch?v=WP-t4XBIHIU',
    ch: '新聞大白話',
    lc: 1323,
    dc: 0,
    cc: 207,
    sc: 0,
    vc: 39188,
    stype: 'SM',
  },
  {
    ref: 'b9175bcf6a97adaa28e863a842ac844d',
    title: '拜登視習近平生死鬥爭？秦剛G20外長會對上布林肯！福建艦海試將艦載殲-35？美債收益率乏力預言大限？',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-03-01 18:50',
    senti: '正面',
    author: '新聞大白話',
    summary: '主持人：#翟翾、#陳諺瑩\n本集來賓：#徐巧芯、#朱學恒、#<span class="hl">羅智強</span>、#介文汲、#楊永明、#苑舉正、#趙怡翔、#王鴻薇、#陳揮文、#賴岳謙、#謝寒冰、#蔡正元\n\n拜登視習近平生死鬥爭？',
    url: 'https://www.youtube.com/watch?v=ru67VYnSVoA',
    ch: '新聞大白話',
    lc: 6120,
    dc: 0,
    cc: 204,
    sc: 0,
    vc: 199137,
    stype: 'SM',
  },
  {
    ref: '960b03b9834172df0afb13c9a80bc0d9',
    title: '「選羅智強，CP值最高！」\n\n起床囉！5:30起床，6:00出發！出門送車去！今天到永康里和虎嘯里送',
    pt: '主文',
    src: 'FACEBOOK',
    time: '2023-03-02 07:10',
    senti: '正面',
    author: '羅智強',
    summary: '「選<span class="hl">羅智強</span>，CP值最高！」 ... 聽到里民說選<span class="hl">羅智強</span>「CP值最高」，我當場笑了出來，大家都好有哏呢！',
    url: 'https://www.facebook.com/164872546882726_795788441902945',
    ch: '羅智強',
    lc: 7905,
    dc: 0,
    cc: 194,
    sc: 38,
    vc: '-',
    stype: 'SM',
  },
  {
    ref: '1f91ea02fbce53906aa3ed3c9d88ba14',
    title: '《 DNA雙面刃？北市長蔣萬安上任首次大考！拆彈「228」？ 》【新聞面對面】2023.03.01',
    pt: '主文',
    src: 'YOUTUBE',
    time: '2023-03-01 22:43',
    senti: '中立',
    author: '新聞面對面',
    summary: '<span class="hl">羅智強</span>：復僻動員戡亂臨時條款？',
    url: 'https://www.youtube.com/watch?v=HwBH_LZqqNg',
    ch: '新聞面對面',
    lc: 123,
    dc: 0,
    cc: 165,
    sc: 0,
    vc: 13800,
    stype: 'SM',
  },
]
// add id for data grid
const data = fakeData.map((item) => ({
  ...item,
  id: item.ref,
}))

const columns = [
  {
    field: 'title',
    headerName: '文章標題',
    sortable: false,
    flex: 1,
    renderCell: (index) => (
      <>
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
      </>
    ),
  },
  {
    field: 'src',
    headerName: '資料來源',
    width: 150,
    sortable: false,
  },
  {
    field: 'cc',
    headerName: '回文數',
    width: 100,
    sortable: false,
  },
  {
    field: 'time',
    headerName: '時間',
    width: 200,
    sortable: false,
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
  withLikeShare = false, tabValue = 0, tabOnChange = () => {}, tabNames = [],
}) {
  const newColumns = withLikeShare
    ? [...columns.slice(0, 3), ...additionalColumn, ...columns.slice(3, 4)] : columns
  const [currentSlice, setCurrentSlice] = useState(10)
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
            2023/02/17 的文章列表
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
          <DataGrid
            rows={data.slice(0, currentSlice)}
            columns={newColumns}
            disableSelectionOnClick
            hideFooter
          />
        </Box>
        <BlueButton
          disabled={currentSlice === 50}
          onClick={() => setCurrentSlice((prev) => prev + 10)}
        >
          載入更多
        </BlueButton>
      </CardContent>
    </Card>
  )
}

PostListCard.propTypes = PostListCardPropTypes

export default PostListCard
