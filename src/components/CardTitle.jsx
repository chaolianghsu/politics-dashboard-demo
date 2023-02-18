import { Typography, Stack } from '@mui/material'
import PropTypes from 'prop-types'

function CardTitle({
  title, subTitle, mark, markColor = 'customRed.dark',
}) {
  return (
    <Stack alignItems="flex-end" gap="1rem">
      <Typography variant="h4" sx={{ color: 'customGray.main', fontSize: '2.6rem' }}>
        {title}
      </Typography>
      <Stack direction="row" gap="3rem" alignItems="center">
        <Typography variant="body2" sx={{ color: markColor, fontWeight: 'normal' }}>
          {mark}
        </Typography>
        <Typography variant="h4" sx={{ color: 'customBlue.main', fontSize: '2.6rem' }}>
          {subTitle}
        </Typography>
      </Stack>
    </Stack>
  )
}

CardTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  mark: PropTypes.string,
  markColor: PropTypes.string,
}

export default CardTitle
