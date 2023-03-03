import { Typography, Stack, Box } from '@mui/material'
import PropTypes from 'prop-types'

function CardTitle({
  title, subTitle, mark, markColor = 'customRed.dark',
}) {
  return (
    <Stack alignItems="flex-end" gap="1rem">
      <Typography
        variant="h4"
        sx={{ color: 'customGray.main', fontSize: '2.6rem' }}
      >
        {title}
      </Typography>
      <Stack direction="row" gap="3rem" alignItems="center">
        <Box sx={{ color: markColor, fontWeight: 'normal' }}>{mark}</Box>
        <Typography
          variant="h4"
          sx={{
            color: 'customBlue.main',
            fontSize: '2.6rem',
            display: 'flex',
            alignItems: 'end',
          }}
        >
          {subTitle}
        </Typography>
      </Stack>
    </Stack>
  )
}

CardTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  mark: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  markColor: PropTypes.string,
}

export default CardTitle
