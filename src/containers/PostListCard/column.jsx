import {
  Box, Typography, Link,
} from '@mui/material'
import { NoMaxWidthTooltip, GridItemTypography } from '@/components'

const columns = [
  {
    field: 'title',
    headerName: '文章標題',
    sortable: false,
    flex: 1,
    minWidth: 200,
    renderCell: (index) => (
      <NoMaxWidthTooltip
        // open
        placement="top"
        title={<p style={{ fontSize: '15px', margin: '5px' }}>{index.value}</p>}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              color: 'white',
              backgroundColor: 'customGridTextBlue.light',
              paddingX: '1rem',
              paddingY: '.3rem',
              marginRight: '1rem',
              borderRadius: '5px',
              fontSize: '15px',
              fontWeight: '400',
            }}
          >
            {index.row.pt}
          </Typography>
          <Link
            href={index.row.url}
            sx={{
              textDecoration: 'none',
              color: 'customGridTextBlue.main',
              fontSize: '15px',
              fontWeight: '400',
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
    renderCell: (index) => (
      <NoMaxWidthTooltip
        // open
        placement="top"
        title={<p style={{ fontSize: '15px', margin: '5px' }}>{index.value}</p>}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GridItemTypography>{index.value}</GridItemTypography>
        </Box>
      </NoMaxWidthTooltip>
    ),
  },
  {
    field: 'cc',
    headerName: '回文數',
    width: 100,
    sortable: false,
    renderCell: (index) => <GridItemTypography>{index.value}</GridItemTypography>,
  },
  {
    field: 'time',
    headerName: '時間',
    width: 200,
    sortable: false,
    renderCell: (index) => <GridItemTypography>{index.value}</GridItemTypography>,
  },
]

const additionalColumns = [
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

export { columns, additionalColumns }
