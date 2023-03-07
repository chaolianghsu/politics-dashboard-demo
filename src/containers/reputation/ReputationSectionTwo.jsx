import { useEffect } from 'react'
import {
  Typography, Unstable_Grid2 as Grid, Stack, Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { shallow } from 'zustand/shallow'
import dateFormat from 'dateformat'

import {
  Card,
  TitleData,
  DetailButton,
  DataGrid,
  WordCloudChart,
  LoadingProgress,
} from '@/components'
import { useGlobalDateStore } from '@/store'
import { hotkeywordAPI, diffusionAPI, interactionAPI } from '@/apis'

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

function ReputationSectionTwo() {
  const navigate = useNavigate()

  const { startDate, endDate } = useGlobalDateStore(
    (state) => ({
      startDate: state.startDate,
      endDate: state.endDate,
    }),
    shallow,
  )

  const formattedDateStart = dateFormat(startDate, 'yyyymmdd')
  const formattedDateEnd = dateFormat(endDate, 'yyyymmdd')

  const {
    data: wordCloudData,
    isLoading: isGetWordCloudDataLoading,
    isFetching: isGetWordCloudDataFetching,
  } = useQuery({
    queryKey: [hotkeywordAPI.Url, formattedDateStart, formattedDateEnd],
    queryFn: () => hotkeywordAPI.getData({ from: formattedDateStart, to: formattedDateEnd }),
    select: (d) => d.result,
  })

  const {
    data: diffusionData,
    isLoading: isGetDiffusionDataLoading,
    isFetching: isGetDiffusionDataFetching,
  } = useQuery({
    queryKey: [diffusionAPI.Url, formattedDateStart, formattedDateEnd],
    queryFn: () => diffusionAPI.getData({ from: formattedDateStart, to: formattedDateEnd }),
    select: (d) => d.result[0],
  })

  const {
    data: interactionData,
    isLoading: isGetInteractionDataLoading,
    isFetching: isGetInteractionDataFetching,
  } = useQuery({
    queryKey: [interactionAPI.Url, formattedDateStart, formattedDateEnd],
    queryFn: () => interactionAPI.getData({
      from: formattedDateStart,
      to: formattedDateEnd,
    }),
    select: (d) => d.result[0],
  })

  useEffect(() => {
    if (wordCloudData) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    }
  }, [wordCloudData])

  if (
    isGetWordCloudDataLoading
    || isGetWordCloudDataFetching
    || isGetDiffusionDataFetching
    || isGetDiffusionDataLoading
    || isGetInteractionDataFetching
    || isGetInteractionDataLoading
  ) {
    return (
      <Box sx={{ marginTop: (theme) => (-2 * theme.spacing) }}>
        <LoadingProgress />
      </Box>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid
        xs={12}
        lg={7}
        sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
      >
        <Card title={<Typography variant="h4">網路散播力</Typography>}>
          <Stack margin={1.5}>
            <Stack
              sx={{
                marginBottom: '2rem',
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
                gap: '3rem',
              }}
            >
              <Box sx={{ flex: '1' }}>
                <TitleData
                  value={diffusionData.diffusion.toLocaleString()}
                  unit="channels"
                  title="擴散廣度"
                />
              </Box>
              <Box sx={{ flex: '1' }}>
                <TitleData
                  value={interactionData.interaction.toLocaleString()}
                  unit="piece"
                  title="互動強度"
                />
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
              onClick={() => navigate('/reputation/textlist')}
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
              maxHeight: '70rem',
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
          <Stack margin={1.5} sx={{ width: '100%', height: '100%' }}>
            <WordCloudChart
              data={wordCloudData.map((d) => ({
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
              onClick={() => navigate('/reputation/hotkeyword')}
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
