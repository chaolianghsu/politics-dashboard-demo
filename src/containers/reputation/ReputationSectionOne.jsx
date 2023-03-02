import {
  Stack,
  Avatar,
  Typography,
  CardContent,
  Box,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import {
  Card,
  TitleData,
  LineChart,
  DetailButton,
  ColChart,
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

function ReputationSectionOne() {
  const navigate = useNavigate()

  const sentiments = [
    {
      name: '正評',
      value: 770,
      percent: 18.03,
      color: '#8E9EE3',
    },
    {
      name: '負評',
      value: 1491,
      percent: 18.03,
      color: '#1BFBE4',
    },
  ]

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={4}>
        <Stack spacing={2} sx={{ height: '100%' }}>
          <Card>
            <CardContent>
              <Stack
                alignItems="center"
                sx={{ width: '100%', color: 'customBlue.dark' }}
                spacing={1}
              >
                <Avatar
                  src="https://images.alphacoders.com/443/443870.jpg"
                  sx={{
                    width: 140,
                    height: 140,
                    marginBottom: '1.2rem',
                    border: '0.3rem solid #d8d8d8',
                  }}
                />
                <Typography variant="h5" sx={{ fontSize: '2.2rem' }}>
                  羅智強
                </Typography>
                <Stack alignItems="center" sx={{ color: 'customBlue.main' }}>
                  <Typography variant="body1" sx={{ fontSize: '1.4rem' }}>
                    台北市
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.4rem' }}>
                    政黨：中國國民黨
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Card
            title={(
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
              >
                <TitleData
                  markNumber={10}
                  value={120}
                  unit="percentage"
                  title="聲譽值"
                  TitleStackProps={{
                    spacing: 0,
                    sx: {
                      alignItems: { xs: 'end', lg: 'start' },
                      flexDirection: {
                        xs: 'row',
                        lg: 'column',
                      },
                      gap: { xs: 2, lg: 0 },
                    },
                  }}
                />
              </Box>
            )}
            sx={{ flex: '1' }}
          />
        </Stack>
      </Grid>
      <Grid xs={12} md={8} lg={4} sx={{ display: 'flex', width: '100%' }}>
        <Card
          title={(
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <TitleData
                markNumber={10}
                value={120}
                unit="percentage"
                title="網路聲量"
              />
            </Box>
            )}
          sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          CardContentProps={{
            component: Stack,
            sx: {
              flex: '1',
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'customGray.main',
              fontSize: '2rem',
              marginBottom: '0.5rem',
            }}
          >
            聲量趨勢
          </Typography>
          <LineChart
            categories={fakeData.date}
            series={fakeData.data.map((d) => ({
              name: d.tn,
              data: d.g,
            }))}
          />
          <DetailButton onClick={() => navigate('/reputation/volume')} sx={{ marginTop: 'auto' }}>
            詳細資料
          </DetailButton>
        </Card>
      </Grid>
      <Grid xs={12} lg={4}>
        <Card
          title={(
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <TitleData
                markNumber={10}
                value={120}
                unit="percentage"
                title="好感度"
              />
            </Box>
        )}
        >
          <Stack sx={{ marginX: '1rem' }}>
            {sentiments.map((sen) => (
              <Stack direction="row" key={sen.name} sx={{ alignItems: 'end' }} spacing={1}>
                <Typography variant="body2">{sen.name}</Typography>
                <Typography variant="h4" sx={{ color: sen.color }}>
                  {sen.value.toLocaleString()}
                </Typography>
                <Typography variant="body2">筆</Typography>
                <Typography variant="body2">
                  &#40;
                  {sen.percent}
                  %&#41;
                </Typography>
              </Stack>
            ))}
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
              chartContainerProps={{
                sx: {
                  marginTop: '2rem',
                },
              }}
            />
            <DetailButton onClick={() => navigate('/reputation/favorability')}>
              詳細資料
            </DetailButton>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

ReputationSectionOne.propTypes = {}

export default ReputationSectionOne
