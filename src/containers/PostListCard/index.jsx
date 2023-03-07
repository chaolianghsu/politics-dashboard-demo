import {
  Box, CardContent, Typography, Stack,
} from '@mui/material'
import PropTypes from 'prop-types'
import { Card, DataGrid, BlueButton } from '@/components'
import Tab from './Tab'

import fakeData from './fakeData'
import { columns, additionalColumns } from './column'

const PostListCardPropTypes = {
  withLikeShare: PropTypes.bool,
  tabValue: PropTypes.number,
  tabOnChange: PropTypes.func,
  tabNames: PropTypes.arrayOf(PropTypes.string),
  displayDateStart: PropTypes.string,
  displayDateEnd: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ),
  isLoading: PropTypes.bool,
  handleQueryPage: PropTypes.func,
  isNoMoreData: PropTypes.bool,
  customColumns: PropTypes.arrayOf(PropTypes.shape({})),
}

function PostListCard({
  isLoading,
  withLikeShare = false,
  handleQueryPage,
  tabValue = 0,
  tabOnChange = () => {},
  tabNames = [],
  data = fakeData,
  displayDateStart = '2023/01/01',
  displayDateEnd = '2023/02/01',
  isNoMoreData = false,
  customColumns = columns,
}) {
  const newColumns = withLikeShare
    ? [
      ...customColumns.slice(0, 3),
      ...additionalColumns,
      ...customColumns.slice(3, 4),
    ]
    : customColumns

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
      <CardContent
        sx={{
          padding: 0,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            height: '60rem',
            width: '100%',
            backgroundColor: 'customWhite.main',
            padding: '1rem 1rem 7.5rem 1rem',
          }}
        >
          {!!tabNames.length && (
            <Tab
              tabValue={tabValue}
              tabOnChange={tabOnChange}
              tabNames={tabNames}
            />
          )}
          <DataGrid
            rows={data}
            columns={newColumns}
            disableSelectionOnClick
            hideFooter
            loading={isLoading}
            getRowId={Math.random}
          />
        </Box>
        {handleQueryPage && (
          <BlueButton
            sx={{
              position: 'absolute',
              bottom: '-1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            disabled={isNoMoreData}
            onClick={handleQueryPage}
          >
            載入更多
          </BlueButton>
        )}
      </CardContent>
    </Card>
  )
}

PostListCard.propTypes = PostListCardPropTypes

export default PostListCard
