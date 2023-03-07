import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { shallow } from 'zustand/shallow'
import dateFormat from 'dateformat'
import { textlistAPI, volumeAPI } from '@/apis'
import { HeaderBar, BlueButton, LoadingProgress } from '@/components'
import { VolumeTrendCard } from '@/containers/volume'
import { PostListCard } from '@/containers'
import { useGlobalDateStore } from '@/store'

function Volume() {
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

  const {
    data: textListData,
    isError: textListDataIsError,
    fetchNextPage,
    isLoading: textListDataIsLoading,
    isFetching: textListDataIsFetching,
  } = useInfiniteQuery({
    queryKey: [textlistAPI.Url, formattedDateStart, formattedDateEnd],
    queryFn: ({ pageParam = 1 }) => textlistAPI.getData({
      from: formattedDateStart,
      to: formattedDateEnd,
      page: pageParam,
    }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.result.length !== 0) return allPages.length + 1
      return null
    },
  })

  const {
    data: volumeData,
    isLoading: volumeDataIsLoading,
    isFetching: volumeDataIsFetching,
  } = useQuery({
    queryKey: [volumeAPI.Url, formattedDateStart, formattedDateEnd],
    queryFn: () => volumeAPI.getData({
      from: formattedDateStart,
      to: formattedDateEnd,
    }),
  })
  const navigate = useNavigate()
  if (volumeDataIsLoading || volumeDataIsFetching) {
    return <LoadingProgress />
  }

  return (
    <Stack spacing={2} sx={{ paddingBottom: '5rem' }}>
      <HeaderBar
        text="聲譽模組 / 網路聲量"
        note={(
          <BlueButton
            onClick={() => { navigate('/reputation') }}
          >
            {' '}
            <ReplyIcon />
            返回
          </BlueButton>
)}
        icon={<EqualizerIcon sx={{ fontSize: '3rem' }} />}
      />
      <VolumeTrendCard data={volumeData && volumeData.result[0]} />
      <PostListCard
        data={textListData && textListData.pages
          .reduce((acc, item) => [...acc, ...item.result], [])}
        isLoading={textListDataIsLoading || textListDataIsFetching}
        displayDateStart={displayDateStart}
        displayDateEnd={displayDateEnd}
        handleQueryPage={fetchNextPage}
        isNoMoreData={textListDataIsError}
      />
    </Stack>
  )
}

Volume.propTypes = {}

export default Volume
