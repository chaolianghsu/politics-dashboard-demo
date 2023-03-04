import {
  Typography, Unstable_Grid2 as Grid, Stack, Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import {
  Card,
  TitleData,
  DetailButton,
  DataGrid,
  WordCloudChart,
} from '@/components'

const randomRows = [...new Array(10)].map(() => ({
  id: Math.random(),
  col1: Math.random(),
  col2: Math.random(),
}))

const columns = [
  {
    field: 'col1',
    headerName: 'Column 1',
    width: 150,
    sortable: false,
    flex: 1,
  },
  {
    field: 'col2',
    headerName: 'Column 2',
    width: 150,
    sortable: false,
  },
]

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

function ReputationSectionTwo() {
  const navigate = useNavigate()
  return (
    <Grid container spacing={2}>
      <Grid
        xs={12}
        lg={7}
        sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
      >
        <Card title={<Typography variant="h4">網路散播力</Typography>}>
          <Stack margin={1.5}>
            <Stack sx={{
              marginBottom: '2rem',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              gap: '3rem',
            }}
            >
              <Box sx={{ flex: '1' }}>
                <TitleData value={10} unit="channels" title="擴散廣度" />
              </Box>
              <Box sx={{ flex: '1' }}>
                <TitleData value={120} unit="piece" title="互動強度" />
              </Box>
            </Stack>
            <DetailButton
              onClick={() => navigate('/reputation/spread')}
              sx={{ marginLeft: 'auto' }}
            >
              詳細資料
            </DetailButton>
          </Stack>
        </Card>
        <Card
          title={(
            <Stack spacing={1}>
              <Typography variant="h4">熱門文章</Typography>
              <Typography
                variant="body2"
                sx={{ color: 'customGray.light', fontSize: '1.5rem' }}
              >
                熱門文章為討論較多的文章，依據回文數排序。
              </Typography>
            </Stack>
          )}
        >
          <Stack margin={1.5}>
            <Box
              sx={{
                height: '30rem',
                width: '100%',
                backgroundColor: 'customWhite.main',
                padding: '1rem',
              }}
            >
              <DataGrid
                rows={randomRows}
                columns={columns}
                disableSelectionOnClick
                hideFooter
              />
            </Box>
            <DetailButton
              onClick={() => navigate('/reputation/spread')}
              sx={{ marginLeft: 'auto' }}
            >
              詳細資料
            </DetailButton>
          </Stack>
        </Card>
      </Grid>
      <Grid xs={12} lg={5} sx={{ display: 'flex' }}>
        <Card
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          CardContentProps={{
            sx: {
              flex: 1,
            },
          }}
          title={(
            <Stack spacing={1}>
              <Typography variant="h4">熱門關鍵字文字雲</Typography>
              <Typography
                variant="body2"
                sx={{ color: 'customGray.light', fontSize: '1.5rem' }}
              >
                熱門關鍵字詞，字詞越大代表越熱。
              </Typography>
            </Stack>
          )}
        >
          <Stack
            margin={1.5}
            sx={{ height: '100%', width: '100%' }}
          >
            <WordCloudChart
              data={fakeWordCloud.map((d) => ({
                name: d.name,
                weight: d.value,
              }))}
              chartContainerProps={{
                sx: {
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            />
            <DetailButton
              onClick={() => navigate('/reputation/spread')}
              sx={{ marginRight: '2rem', marginBottom: '2.5rem' }}
            >
              詳細資料
            </DetailButton>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

ReputationSectionTwo.propTypes = {}

export default ReputationSectionTwo
