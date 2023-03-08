import {
  Stack, Avatar, Typography,
} from '@mui/material'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import { useQuery } from '@tanstack/react-query'
import { shallow } from 'zustand/shallow'
import dateFormat from 'dateformat'

import { PredictionCardGrid } from '@/containers/prediction'
import { HeaderBar, LoadingProgress } from '@/components'

import { useGlobalDateStore } from '@/store'
import { predictModuleAPI } from '@/apis'

function Prediction() {
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
    queryKey: [predictModuleAPI.Url, formattedDateStart, formattedDateEnd],
    queryFn: () => predictModuleAPI.getData({ from: formattedDateStart, to: formattedDateEnd }),
    select: (d) => d.result[0],
  })

  if (isLoading || isFetching) {
    return <LoadingProgress />
  }

  return (
    <Stack spacing={2} sx={{ paddingBottom: '5rem' }}>
      <Stack alignItems="center" sx={{ width: '100%', color: 'customBlue.dark' }}>
        <Avatar
          src={data.image}
          sx={{
            width: 120, height: 120, marginBottom: '1.2rem', border: '0.3rem solid #d8d8d8',
          }}
        />
        <Typography variant="h5" sx={{ fontSize: '2.2rem' }}>{data.name}</Typography>
      </Stack>
      <HeaderBar
        text={`${data.name} 指標儀表板`}
        note={`數據調查期間：${dateFormat(startDate, 'yyyy/mm/dd')} ~ ${dateFormat(endDate, 'yyyy/mm/dd')}`}
        icon={<TrackChangesIcon sx={{ fontSize: '3rem' }} />}
      />
      <PredictionCardGrid data={data} />
    </Stack>
  )
}

Prediction.propTypes = {}

export default Prediction
