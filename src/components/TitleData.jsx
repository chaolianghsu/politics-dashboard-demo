import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function TitleData({ markNumber }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2} alignItems="end">
        <Typography
          variant="h4"
          sx={{
            color: 'customGray.main',
            fontSize: '2rem',
          }}
        >
          網路聲量
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: 'customPurple.main',
            fontSize: '3rem',
          }}
        >
          8,810
        </Typography>
        <Typography
          sx={{
            color: markNumber >= 0 ? 'customRed.dark' : 'customGreen.main',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.4rem',
          }}
        >
          {markNumber >= 0 ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
          {' '}
          {markNumber}
          %
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ color: 'customGray.light', fontSize: '1.5rem' }}>
        網路上提及自己討論數，筆數越多表示討論度越高。
      </Typography>
    </Stack>
  )
}

TitleData.propTypes = {
  markNumber: PropTypes.number,
}

export default TitleData
