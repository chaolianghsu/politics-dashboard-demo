import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'
import dateFormat from 'dateformat'
import { shallow } from 'zustand/shallow'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { textlistAPI, favorabilityAPI } from '@/apis'
import { useGlobalDateStore } from '@/store'
import { HeaderBar, BlueButton, LoadingProgress } from '@/components'
import { FavorabilityCard } from '@/containers/favorability'
import { PostListCard } from '@/containers'

const queryConfig = {
  0: 'positive',
  1: 'negative',
}
function Favorability() {
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
  const displayDateStart = dateFormat(startDate, 'yyyy/mm/dd')
  const displayDateEnd = dateFormat(endDate, 'yyyy/mm/dd')
  const [tabValue, setTabValue] = useState(0)

  const handleTableValue = (e, newValue) => {
    setTabValue(newValue)
  }
  const {
    data: textListData,
    fetchNextPage,
    isLoading: textListDataIsLoading,
    isFetching: textListDataIsFetching,
    isError: textListDataIsError,
  } = useInfiniteQuery({
    queryKey: [textlistAPI.Url, formattedDateStart, formattedDateEnd, queryConfig[tabValue]],
    queryFn: ({ pageParam = 1 }) => textlistAPI.getData({
      from: formattedDateStart,
      to: formattedDateEnd,
      senti: queryConfig[tabValue],
      page: pageParam,
    }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.result.length !== 0) return allPages.length + 1
      return null
    },
  })

  const {
    data: favorabilityData,
    isLoading: favorabilityDataIsLoading,
    isFetching: favorabilityDataIsFetching,
  } = useQuery({
    queryKey: [favorabilityAPI.Url, formattedDateStart, formattedDateEnd],
    queryFn: () => favorabilityAPI.getData({
      from: formattedDateStart,
      to: formattedDateEnd,
    }),
  })

  if (favorabilityDataIsLoading || favorabilityDataIsFetching) {
    return <LoadingProgress />
  }
  return (
    <Stack spacing={2} sx={{ paddingBottom: '5rem' }}>
      <HeaderBar
        text="聲譽模組 / 好感度
        "
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
      <FavorabilityCard data={favorabilityData.result[0]} />
      <PostListCard
        data={textListData && textListData.pages
          .reduce((acc, item) => [...acc, ...item.result], [])}
        isLoading={textListDataIsLoading || textListDataIsFetching}
        tabValue={tabValue}
        tabOnChange={handleTableValue}
        tabNames={['正面情緒文章列表', '負面情緒文章列表']}
        displayDateStart={displayDateStart}
        displayDateEnd={displayDateEnd}
        handleQueryPage={fetchNextPage}
        isNoMoreData={textListDataIsError}
      />
    </Stack>
  )
}

Favorability.propTypes = {}

export default Favorability
