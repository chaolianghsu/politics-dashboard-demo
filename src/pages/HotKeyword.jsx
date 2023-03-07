import EqualizerIcon from '@mui/icons-material/Equalizer'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply'
import { useQuery } from '@tanstack/react-query'
import { shallow } from 'zustand/shallow'
import {
  WordCloudChart, HeaderBar, LoadingProgress, BlueButton,
} from '@/components'
import { hotkeywordAPI } from '@/apis'
import { useGlobalDateStore } from '@/store'
import dateFormat from 'dateformat'

function HotKeyword() {
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
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [hotkeywordAPI.Url, formattedDateStart, formattedDateEnd],
    queryFn: () => hotkeywordAPI.getData({ from: formattedDateStart, to: formattedDateEnd }),
    select: (d) => d.result,
  })

  if (isLoading || isFetching) {
    return <LoadingProgress />
  }

  return (
    <Stack spacing={2} paddingBottom="2rem">
      <HeaderBar
        text="聲譽模組 / 熱門關鍵字文字雲"
        note={(
          <BlueButton
            onClick={() => { navigate('/reputation') }}
          >
            <ReplyIcon />
            返回
          </BlueButton>
)}
        icon={<EqualizerIcon sx={{ fontSize: '3rem' }} />}
      />
      <WordCloudChart
        data={data.map((d) => ({ name: d.name, weight: d.value }))}
        background
        size="large"
      />
    </Stack>
  )
}

HotKeyword.propTypes = {}

export default HotKeyword
