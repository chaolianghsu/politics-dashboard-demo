import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

function HeaderBar({ text, note, icon }) {
  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" gap="1rem" marginX="0.5rem">
      <Stack direction="row" gap="0.5rem" alignItems="center" marginRight="auto">
        {icon}
        <Typography
          variant="h4"
          color="customGray.main"
          sx={{ fontSize: '2.6rem' }}
        >
          {text}
        </Typography>
      </Stack>
      <Typography
        variant="body1"
        color="customGray.main"
        sx={{ fontWeight: 'normal', fontSize: '1.6rem' }}
      >
        {note}
      </Typography>
    </Stack>
  )
}

HeaderBar.propTypes = {
  text: PropTypes.string,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.node,
}

export default HeaderBar
