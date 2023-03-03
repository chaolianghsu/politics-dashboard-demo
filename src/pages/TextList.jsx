import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'
import { useQuery } from '@tanstack/react-query'
import { textlistAPI } from '@/apis'
import { HeaderBar, BlueButton, LoadingProgress } from '@/components'
import { PostListCard } from '@/containers'
import { useGlobalDateStore } from '@/store'
import { shallow } from 'zustand/shallow'
import dateFormat from 'dateformat'

const queryConfig = {
  0: '',
  1: 'NEWS',
  2: 'SM',
  3: 'BBS',
}

function TextList() {
  const { startDate, endDate } = useGlobalDateStore(
    (state) => ({
      startDate: state.startDate,
      endDate: state.endDate,
    }),
    shallow,
  )
  const formattedDateStart = dateFormat(startDate, 'yyyymmdd')
  const formattedDateEnd = dateFormat(endDate, 'yyyymmdd')
  const [tabValue, setTabValue] = useState(0)
  const handleTableValue = (e, newValue) => {
    setTabValue(newValue)
  }
  const navigate = useNavigate()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [textlistAPI.Url, formattedDateStart, formattedDateEnd, queryConfig[tabValue]],
    queryFn: () => textlistAPI.getData({
      from: formattedDateStart,
      to: formattedDateEnd,
      type: queryConfig[tabValue],
    }),
    select: (d) => d.result,
  })

  if (isLoading || isFetching) {
    return <LoadingProgress />
  }
  return (
    <Stack spacing={2} sx={{ paddingBottom: '5rem' }}>
      <HeaderBar
        text="聲譽模組 / 熱門文章列表"
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
      <PostListCard data={data} tabValue={tabValue} tabOnChange={handleTableValue} tabNames={['全部來源', '新聞', '社群', '討論區']} />
    </Stack>
  )
}

TextList.propTypes = {}

export default TextList
