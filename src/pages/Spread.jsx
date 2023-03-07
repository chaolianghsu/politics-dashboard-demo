import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ReplyIcon from '@mui/icons-material/Reply'
import { shallow } from 'zustand/shallow'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import dateFormat from 'dateformat'

import { diffusionAPI, interactionAPI, textlistAPI } from '@/apis'
import {
  HeaderBar,
  BlueButton,
  LoadingProgress,
  NoMaxWidthTooltip,
  GridItemTypography,
} from '@/components'
import { SpreadCard } from '@/containers/spread'
import { PostListCard } from '@/containers'
import { useGlobalDateStore } from '@/store'

const columns = [
  {
    field: 'channel',
    headerName: '頻道名稱',
    sortable: false,
    flex: 1,
    minWidth: 200,
    renderCell: (params) => (
      <NoMaxWidthTooltip
        placement="top"
        title={
          <p style={{ fontSize: '15px', margin: '5px' }}>{params.value}</p>
        }
      >
        <GridItemTypography>{params.value}</GridItemTypography>
      </NoMaxWidthTooltip>
    ),
  },
  {
    field: 'main',
    headerName: '主文數',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <GridItemTypography variant="body1">{params.value}</GridItemTypography>
    ),
  },
  {
    field: 'cc',
    headerName: '回文數',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <GridItemTypography>{params.value}</GridItemTypography>
    ),
  },
  {
    field: 'total',
    headerName: '文章數',
    width: 100,
    sortable: false,
    valueGetter: (params) => params.row.main + params.row.cc,
    renderCell: (params) => (
      <GridItemTypography>{params.value}</GridItemTypography>
    ),
  },
]

const formatData = ({ channelData, mainArticleData, replyData }) => channelData.map((d, ind) => ({
  channel: d,
  main: mainArticleData[ind],
  cc: replyData[ind],
}))

function Spread() {
  const navigate = useNavigate()

  const { startDate, endDate } = useGlobalDateStore(
    (state) => ({
      startDate: state.startDate,
      endDate: state.endDate,
    }),
    shallow,
  )
  const [tabValue, setTabValue] = useState(0)
  const formattedDateStart = dateFormat(startDate, 'yyyymmdd')
  const formattedDateEnd = dateFormat(endDate, 'yyyymmdd')
  const displayDateStart = dateFormat(startDate, 'yyyy/mm/dd')
  const displayDateEnd = dateFormat(endDate, 'yyyy/mm/dd')
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

  const handleTableValue = (e, newValue) => {
    setTabValue(newValue)
  }

  const {
    data,
    fetchNextPage,
    isLoading: isGetTextListDataLoading,
    isFetching: isGetTextListDataFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: [textlistAPI.Url, formattedDateStart, formattedDateEnd, ''],
    queryFn: ({ pageParam = 1 }) => textlistAPI.getData({
      from: formattedDateStart,
      to: formattedDateEnd,
      type: '',
      page: pageParam,
    }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.result.length !== 0) return allPages.length + 1
      return null
    },
  })

  if (
    isGetDiffusionDataLoading
    || isGetDiffusionDataFetching
    || isGetInteractionDataFetching
    || isGetInteractionDataLoading
  ) {
    return (
      <Box sx={{ marginTop: (theme) => -2 * theme.spacing }}>
        <LoadingProgress />
      </Box>
    )
  }

  const tabIndDataConfig = {
    0: formatData({
      channelData: diffusionData.textlist,
      mainArticleData: diffusionData.series[0].data,
      replyData: diffusionData.series[1].data,
    }),
    1: data.pages.reduce((acc, item) => [...acc, ...item.result], []),
  }

  return (
    <Stack spacing={2} sx={{ paddingBottom: '5rem' }}>
      <HeaderBar
        text="聲譽模組 / 網路散播力"
        note={(
          <BlueButton
            onClick={() => {
              navigate('/reputation')
            }}
          >
            {' '}
            <ReplyIcon />
            返回
          </BlueButton>
        )}
        icon={<EqualizerIcon sx={{ fontSize: '3rem' }} />}
      />
      <SpreadCard
        diffusionValue={diffusionData.diffusion}
        interactionValue={interactionData.interaction}
      />
      <PostListCard
        data={tabIndDataConfig[tabValue]}
        displayDateEnd={displayDateEnd}
        displayDateStart={displayDateStart}
        isLoading={isGetTextListDataLoading || isGetTextListDataFetching}
        handleQueryPage={fetchNextPage}
        isNoMoreData={tabValue === 0 ? true : isError}
        tabValue={tabValue}
        tabNames={['擴散頻道', '互動強度主文/回文']}
        tabOnChange={handleTableValue}
        customColumns={tabValue === 0 ? columns : undefined}
      />
    </Stack>
  )
}

Spread.propTypes = {}

export default Spread
