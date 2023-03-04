import {
  Typography, Stack, Unstable_Grid2 as Grid, Box,
} from '@mui/material'
import {
  Card, TitleData, BarChart, RadarChart,
} from '@/components'

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

function ReputationSectionThree() {
  return (
    <Box sx={{ padding: '1rem' }}>
      <Card title={<Typography variant="h4">社群經營力</Typography>}>
        <Grid container spacing={2} sx={{ padding: '1rem' }}>
          <Grid xs={12} md={6} lg={4}>
            <Stack>
              <TitleData title="粉絲觸及力" value={118829} unit="people" />
              <BarChart
                categories={fakeData.date}
                series={fakeData.data.map((d) => ({
                  name: d.tn,
                  data: d.g,
                  color: '#1BFBE4',
                }))}
              />
            </Stack>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Stack>
              <TitleData title="社群戶動力" value={11443} />
              <BarChart
                categories={fakeData.date}
                series={fakeData.data.map((d) => ({
                  name: d.tn,
                  data: d.g,
                  color: '#8E9EE3',
                }))}
              />
            </Stack>
          </Grid>
          <Grid
            xs={12}
            lg={4}
            sx={{
              overflow: 'hidden',
            }}
          >
            <Stack>
              <TitleData title="平均互動力" value={1.23} />
              <Stack
                sx={{
                  marginTop: '1rem',

                }}
                spacing={3}
                direction="row"
              >
                <Stack>
                  <Typography variant="body1" sx={{ color: 'customGray.main' }}>
                    按讚數
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'customBlue.main', fontSize: '2.2rem' }}
                  >
                    145404
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body1" sx={{ color: 'customGray.main' }}>留言數</Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'customBlue.main', fontSize: '2.2rem' }}
                  >
                    145404
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body1" sx={{ color: 'customGray.main' }}>分享數</Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'customBlue.main', fontSize: '2.2rem' }}
                  >
                    145404
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack sx={{ alignItems: 'center' }}>
              <RadarChart
                categories={['大心', '哈', '哇', '嗚', '怒']}
                series={[
                  {
                    name: '',
                    data: [14, 20, 133, 30, 52],
                  },
                ]}
              />
              <Typography variant="body1" sx={{ color: 'customGray.main' }}>
                心情數
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'customBlue.main', fontSize: '2.2rem' }}
              >
                145404
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>

  )
}

ReputationSectionThree.propTypes = {}

export default ReputationSectionThree
