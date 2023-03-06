import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'
import { useQuery } from '@tanstack/react-query'
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

  const [queryPage, setQueryPage] = useState(1)

  const handleQueryPage = () => {
    setQueryPage((prev) => prev + 1)
  }

  const [allQueryData, setAllQueryData] = useState([])
  const handleTableValue = (e, newValue) => {
    setTabValue(newValue)
    setAllQueryData([])
  }
  const {
    data, isLoading, isFetching, isSuccess,
  } = useQuery({
    queryKey: [
      textlistAPI.Url,
      formattedDateStart,
      formattedDateEnd,
      queryConfig[tabValue],
      queryPage,
    ],
    queryFn: () => textlistAPI.getData({
      from: formattedDateStart,
      to: formattedDateEnd,
      type: queryConfig[tabValue],
      page: queryPage,
    }),
    select: (d) => d.result,
  })

  useEffect(() => {
    if (isSuccess) {
      setAllQueryData((prev) => [...prev, ...data])
    }
  }, [data, isSuccess, queryPage])

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
        data={allQueryData}
        isLoading={isLoading || isFetching}
        tabValue={tabValue}
        tabOnChange={handleTableValue}
        tabNames={['全部來源', '新聞', '社群', '討論區']}
        displayDateStart={displayDateStart}
        displayDateEnd={displayDateEnd}
        handleQueryPage={handleQueryPage}
        isNoMoreData={data && data.length === 0}
      />
    </Stack>
  )
}

TextList.propTypes = {}

export default TextList
