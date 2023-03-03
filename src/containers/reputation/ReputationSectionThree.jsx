import {
  Typography, Stack, Unstable_Grid2 as Grid, Box,
} from '@mui/material'
import {
  Card,
  TitleData,
  BarChart,
  RadarChart,
  LoadingProgress,
} from '@/components'
import { useQuery } from '@tanstack/react-query'
import { shallow } from 'zustand/shallow'
import dateFormat from 'dateformat'

import { useGlobalDateStore } from '@/store'
import { socialAPI } from '@/apis'

function ReputationSectionThree() {
  const { startDate, endDate } = useGlobalDateStore(
    (state) => ({
      startDate: state.startDate,
      endDate: state.endDate,
    }),
    shallow,
  )

  const formattedDateStart = dateFormat(startDate, 'yyyymmdd')
  const formattedDateEnd = dateFormat(endDate, 'yyyymmdd')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [socialAPI.Url, formattedDateStart, formattedDateEnd],
    queryFn: () => socialAPI.getData({ from: formattedDateStart, to: formattedDateEnd }),
    select: (d) => d.result[0],
  })

  if (isLoading || isFetching) {
    return <LoadingProgress />
  }

  const { categories } = data.social_touch

  const socialTouchData = data.social_touch
  const socialTouchSeries = [
    { ...socialTouchData.series[0], color: '#1BFBE4' },
  ]
  const socialTouchTotal = socialTouchData.total

  const socialReactionCountData = data.social_rc
  const socialReactionCountSeries = [
    { ...socialReactionCountData.series[0], color: '#8E9EE3' },
  ]
  const socialReactionCountTotal = socialReactionCountData.total

  const socialReactionCountRatio = data.social_rc_ratio
  const {
    comments: socialReactionCountRatioCommentsTotal,
    shares: socialReactionCountRatioSharesTotal,
    reactions: socialReactionCountRatioReactionsTotal,
    ratio: socialReactionCountRatioValue,
    sad: sadCount,
    wow: wowCount,
    love: loveCount,
    angry: angryCount,
    haha: hahaCount,
    like: likeCount,
  } = socialReactionCountRatio
  return (
    <Box sx={{ padding: '1rem' }}>
      <Card title={<Typography variant="h4">社群經營力</Typography>}>
        <Grid container spacing={2} sx={{ padding: '1rem' }}>
          <Grid xs={12} md={6} lg={4}>
            <Stack>
              <TitleData
                title="粉絲成長數"
                value={socialTouchTotal.toLocaleString()}
                unit="people"
              />
              <BarChart categories={categories} series={socialTouchSeries} />
            </Stack>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Stack>
              <TitleData
                title="社群互動率"
                value={socialReactionCountTotal.toLocaleString()}
              />
              <BarChart
                categories={categories}
                series={socialReactionCountSeries}
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
              <TitleData
                title="平均互動力"
                value={socialReactionCountRatioValue}
              />
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
                    {likeCount.toLocaleString()}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body1" sx={{ color: 'customGray.main' }}>
                    留言數
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'customBlue.main', fontSize: '2.2rem' }}
                  >
                    {socialReactionCountRatioCommentsTotal.toLocaleString()}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body1" sx={{ color: 'customGray.main' }}>
                    分享數
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'customBlue.main', fontSize: '2.2rem' }}
                  >
                    {socialReactionCountRatioSharesTotal.toLocaleString()}
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
                    data: [
                      loveCount,
                      hahaCount,
                      wowCount,
                      sadCount,
                      angryCount,
                    ],
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
                {socialReactionCountRatioReactionsTotal.toLocaleString()}
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
