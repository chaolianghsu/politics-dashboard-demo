import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material'

const StyledDataGrid = styled(DataGrid)({
  border: 'none !important',
  '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus':
    {
      outline: 'none !important',
    },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '.MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '.MuiDataGrid-columnHeaders': {
    backgroundColor: '#f5f6fa',
    color: '#828592',
    fontWeight: 'bold',
  },
  '.MuiDataGrid-columnHeaderTitle': {
    color: '#828592 !important',
    fontWeight: 'bold !important',
  },
  '.MuiDataGrid-cellContent': {
    fontWeight: 'normal !important',
  },
})

export default StyledDataGrid
