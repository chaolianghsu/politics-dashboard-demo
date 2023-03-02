import {
  LineChart, BarChart, ColChart, RadarChart, WordCloudChart, DataGrid,
} from '@/components'
import { Box } from '@mui/material'

const fakeData = {
  date: [
    '2023/02/14',
    '2023/02/15',
    '2023/02/16',
    '2023/02/17',
    '2023/02/18',
    '2023/02/19',
    '2023/02/20',
  ],
  data: [
    {
      tn: '羅智強',
      q: '(羅智強|羅小強|羅痔瘡|羅智|羅智弱|羅自戕|騾子強)',
      g: [1424, 1967, 1191, 1557, 1465, 1071, 428],
      pc: '100.0%',
      t: 9103,
    },
  ],
  total: 9103,
  grow: '-51.05',
}

const fakeWordCloud = [
  {
    name: '國民黨',
    value: 89,
  },
  {
    name: '立委',
    value: 88,
  },
  {
    name: '議員',
    value: 73,
  },
  {
    name: '羅智強',
    value: 62,
  },
  {
    name: '大安區',
    value: 53,
  },
  {
    name: '支持',
    value: 53,
  },
  {
    name: '加油',
    value: 51,
  },
  {
    name: '參選',
    value: 47,
  },
  {
    name: '台北市',
    value: 39,
  },
  {
    name: '初選',
    value: 36,
  },
  {
    name: '選民',
    value: 31,
  },
  {
    name: '臉書',
    value: 30,
  },
  {
    name: '總統',
    value: 30,
  },
  {
    name: '選區',
    value: 30,
  },
  {
    name: '選舉',
    value: 26,
  },
  {
    name: '大安',
    value: 25,
  },
  {
    name: '宣布',
    value: 25,
  },
  {
    name: '民進黨',
    value: 25,
  },
  {
    name: '黨內',
    value: 24,
  },
  {
    name: '市長',
    value: 22,
  },
  {
    name: '桃園',
    value: 22,
  },
  {
    name: '提名',
    value: 21,
  },
  {
    name: '現任',
    value: 19,
  },
  {
    name: '選戰',
    value: 19,
  },
  {
    name: '徐巧芯',
    value: 19,
  },
  {
    name: '發文',
    value: 18,
  },
  {
    name: '藍營',
    value: 18,
  },
  {
    name: '政治',
    value: 18,
  },
  {
    name: '秘書長',
    value: 15,
  },
  {
    name: '攻擊',
    value: 15,
  },
  {
    name: '承諾',
    value: 15,
  },
  {
    name: '輔選',
    value: 14,
  },
  {
    name: '監督',
    value: 14,
  },
  {
    name: '回應',
    value: 14,
  },
  {
    name: '保證',
    value: 14,
  },
  {
    name: '媒體人',
    value: 13,
  },
  {
    name: '全國',
    value: 13,
  },
  {
    name: '直言',
    value: 13,
  },
  {
    name: '交替',
    value: 13,
  },
  {
    name: '投入',
    value: 13,
  },
  {
    name: '世代',
    value: 13,
  },
  {
    name: '國安',
    value: 13,
  },
  {
    name: '認同',
    value: 13,
  },
  {
    name: '當選',
    value: 12,
  },
  {
    name: '服務',
    value: 12,
  },
  {
    name: '從政',
    value: 12,
  },
  {
    name: '議題',
    value: 12,
  },
  {
    name: '張善政',
    value: 11,
  },
  {
    name: '基層',
    value: 11,
  },
  {
    name: '人民',
    value: 11,
  },
  {
    name: '攻防',
    value: 11,
  },
  {
    name: '郭台銘',
    value: 11,
  },
  {
    name: '力挺',
    value: 11,
  },
  {
    name: '北市',
    value: 11,
  },
  {
    name: '對手',
    value: 10,
  },
  {
    name: '大局',
    value: 10,
  },
  {
    name: '挑戰',
    value: 10,
  },
  {
    name: '國會',
    value: 10,
  },
  {
    name: '立法委員',
    value: 10,
  },
  {
    name: '擔任',
    value: 10,
  },
  {
    name: '立法院',
    value: 9,
  },
  {
    name: '支持者',
    value: 9,
  },
  {
    name: '民代',
    value: 9,
  },
  {
    name: '競爭',
    value: 9,
  },
  {
    name: '回答',
    value: 9,
  },
  {
    name: '條款',
    value: 9,
  },
  {
    name: '大選',
    value: 9,
  },
  {
    name: '艱困',
    value: 9,
  },
  {
    name: '台北市長',
    value: 9,
  },
  {
    name: '進入',
    value: 8,
  },
  {
    name: '願意',
    value: 8,
  },
  {
    name: '公平',
    value: 8,
  },
  {
    name: '區域',
    value: 8,
  },
  {
    name: '桃園市',
    value: 8,
  },
  {
    name: '公投',
    value: 8,
  },
  {
    name: '徐弘庭',
    value: 8,
  },
  {
    name: '鍾沛君',
    value: 8,
  },
  {
    name: '青年',
    value: 8,
  },
  {
    name: '搬家',
    value: 8,
  },
  {
    name: '議長',
    value: 8,
  },
]

const randomRows = [...new Array(10)].map(() => ({
  id: Math.random(),
  col1: Math.random(),
  col2: Math.random(),
}))

const columns = [
  {
    field: 'col1', headerName: 'Column 1', width: 150, sortable: false, flex: 1,
  },
  {
    field: 'col2', headerName: 'Column 2', width: 150, sortable: false,
  },
]

function Demo() {
  return (
    <Box sx={{ height: '500vh' }}>
      <LineChart
        categories={fakeData.date}
        series={fakeData.data.map((d) => ({
          name: d.tn,
          data: d.g,
        }))}
      />
      <BarChart
        categories={fakeData.date}
        series={fakeData.data.map((d) => ({
          name: d.tn,
          data: d.g,
          color: '#8E9EE3',
        }))}
      />
      <ColChart
        series={[
          {
            name: '筆數',
            colorByPoint: true,
            data: [
              { name: '正評', y: 2323 },
              { name: '負評', y: 1122 },
            ],
          },
        ]}
      />
      <RadarChart
        categories={['大心', '哈', '哇', '嗚', '怒']}
        series={[{
          name: '',
          data: [14, 20, 133, 30, 52],
        }]}
      />
      <WordCloudChart data={fakeWordCloud.map((d) => ({ name: d.name, weight: d.value }))} />
      <Box sx={{
        height: '50rem', width: '100%', backgroundColor: 'customWhite.main', padding: '1rem',
      }}
      >
        <DataGrid rows={randomRows} columns={columns} disableSelectionOnClick hideFooter />
      </Box>
    </Box>
  )
}

Demo.propTypes = {}

export default Demo
