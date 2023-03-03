import {
  Box, CardContent, Typography, Stack, Link, styled,
} from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import PropTypes from 'prop-types'
import { Card, DataGrid, BlueButton } from '@/components'
import { useState } from 'react'
import Tab from './Tab'

const PostListCardPropTypes = {
  withLikeShare: PropTypes.bool,
  tabValue: PropTypes.number,
  tabOnChange: PropTypes.func,
  tabNames: PropTypes.arrayOf(PropTypes.string),
  displayDateStart: PropTypes.string,
  displayDateEnd: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    cc: PropTypes.number,
    ch: PropTypes.string,
    dc: PropTypes.number,
    lc: PropTypes.number,
    pt: PropTypes.string,
    ref: PropTypes.string,
    sc: PropTypes.number,
    senti: PropTypes.string,
    src: PropTypes.string,
    stype: PropTypes.string,
    summary: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    vc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
}

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
})

const columns = [
  {
    field: 'title',
    headerName: '文章標題',
    sortable: false,
    flex: 1,
    renderCell: (index) => (
      <NoMaxWidthTooltip
        // open
        placement="top"
        title={<p style={{ fontSize: '15px', margin: '5px' }}>{index.value}</p>}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{
            color: 'white', backgroundColor: 'customGridTextBlue.light', paddingX: '1rem', paddingY: '.3rem', marginRight: '1rem', borderRadius: '5px', fontSize: '15px', fontWeight: '400',
          }}
          >
            {index.row.pt}
          </Typography>
          <Link
            href={index.row.url}
            sx={{
              textDecoration: 'none', color: 'customGridTextBlue.main', fontSize: '15px', fontWeight: '400',
            }}
            target="_block"
          >
            {index.value}
          </Link>
        </Box>
      </NoMaxWidthTooltip>
    ),
  },
  {
    field: 'src',
    headerName: '資料來源',
    width: 150,
    sortable: false,
  },
  {
    field: 'cc',
    headerName: '回文數',
    width: 100,
    sortable: false,
  },
  {
    field: 'time',
    headerName: '時間',
    width: 200,
    sortable: false,
  },
]

const additionalColumn = [
  {
    field: 'lc',
    headerName: '按讚數',
    width: 100,
    sortable: false,
  },
  {
    field: 'sc',
    headerName: '分享數',
    width: 100,
    sortable: false,
  },
]
function PostListCard({
  withLikeShare = false,
  tabValue = 0,
  tabOnChange = () => {},
  tabNames = [],
  data,
  displayDateStart,
  displayDateEnd,
}) {
  const dataWithId = data.map((item) => ({
    ...item,
    id: item.ref,
  }))
  const newColumns = withLikeShare
    ? [...columns.slice(0, 3), ...additionalColumn, ...columns.slice(3, 4)] : columns
  const [currentSlice, setCurrentSlice] = useState(10)
  return (
    <Card
      title={(
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              color: 'customGray.main',
              fontSize: '2.4rem',
            }}
          >
            {`${displayDateStart} - ${displayDateEnd}的文章列表`}
          </Typography>
        </Stack>
      )}
    >
      <CardContent sx={{ padding: 0, textAlign: 'center' }}>
        <Box
          sx={{
            height: '50rem',
            width: '100%',
            backgroundColor: 'customWhite.main',
            padding: '1rem',
          }}
        >
          {!!tabNames.length
          && <Tab tabValue={tabValue} tabOnChange={tabOnChange} tabNames={tabNames} />}
          <DataGrid
            rows={dataWithId.slice(0, currentSlice)}
            columns={newColumns}
            disableSelectionOnClick
            hideFooter
          />
        </Box>
        <BlueButton
          disabled={currentSlice === 50}
          onClick={() => setCurrentSlice((prev) => prev + 10)}
        >
          載入更多
        </BlueButton>
      </CardContent>
    </Card>
  )
}

PostListCard.propTypes = PostListCardPropTypes

export default PostListCard
