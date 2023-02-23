import {
  Box, CardContent, Typography, Stack,
} from '@mui/material'

import { Card, DataGrid, BlueButton } from '@/components'
import { useState } from 'react'

const randomRows = [...new Array(50)].map(() => ({
  id: Math.random(),
  col1: Math.random(),
  col2: Math.random(),
}))

const columns = [
  {
    field: 'col1',
    headerName: 'Column 1',
    width: 150,
    sortable: false,
    flex: 1,
  },
  {
    field: 'col2',
    headerName: 'Column 2',
    width: 150,
    sortable: false,
  },
]
function PostListCard() {
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
            2023/02/17 的文章列表
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
          <DataGrid
            rows={randomRows.slice(0, currentSlice)}
            columns={columns}
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

PostListCard.propTypes = {}

export default PostListCard
