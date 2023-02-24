import { styled } from '@mui/material'
import { DateRangePicker } from 'react-date-range'

const StyledDataRangePicker = styled(DateRangePicker)(({ theme }) => ({
  flexWrap: 'wrap',
  '& .rdrDefinedRangesWrapper': {
    flexGrow: 1,
    '& .rdrStaticRanges': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      button: {
        width: '100%',
        [theme.breakpoints.between('xs', 'sm')]: {
          width: '50%',
        },
      },
    },
  },
}))

export default StyledDataRangePicker
