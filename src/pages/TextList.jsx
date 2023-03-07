import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'
import { useInfiniteQuery } from '@tanstack/react-query'
import { textlistAPI } from '@/apis'
import { HeaderBar, BlueButton } from '@/components'
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
  const displayDateStart = dateFormat(startDate, 'yyyy/mm/dd')
  const displayDateEnd = dateFormat(endDate, 'yyyy/mm/dd')
  const [tabValue, setTabValue] = useState(0)
  const navigate = useNavigate()

  const handleTableValue = (e, newValue) => {
    setTabValue(newValue)
  }
  const {
    data, fetchNextPage, isLoading, isFetching, isError,
  } = useInfiniteQuery({
    queryKey: [textlistAPI.Url, formattedDateStart, formattedDateEnd, queryConfig[tabValue]],
    queryFn: ({ pageParam = 1 }) => textlistAPI.getData({
      from: formattedDateStart,
      to: formattedDateEnd,
      type: queryConfig[tabValue],
      page: pageParam,
    }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.result.length !== 0) return allPages.length + 1
      return null
    },
  })
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
      <PostListCard
        data={data && data?.pages?.reduce((acc, item) => [...acc, ...item.result], [])}
        isLoading={isLoading || isFetching}
        tabValue={tabValue}
        tabOnChange={handleTableValue}
        tabNames={['全部來源', '新聞', '社群', '討論區']}
        displayDateStart={displayDateStart}
        displayDateEnd={displayDateEnd}
        handleQueryPage={fetchNextPage}
        isNoMoreData={isError}
      />
    </Stack>
  )
}

TextList.propTypes = {}

export default TextList
