import {
  Card as MuiCard,
  CardHeader,
  CardContent,
  Stack,
  Box,
} from '@mui/material'
import PropTypes from 'prop-types'

const linearBg = 'linear-gradient(rgb(35, 99, 219) 0%, rgb(75, 194, 255) 100%)'

function Card({
  title, children, sx, icon, ...others
}) {
  return (
    <MuiCard
      sx={{
        position: 'relative',
        ...sx,
      }}
      {...others}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          height: '9rem',
          width: '9rem',
          background: linearBg,
          borderRadius: '3px 3px 85px',
        }}
      >
        <Box sx={{ marginTop: '1.2rem', marginLeft: '1.2rem' }}>{icon}</Box>
      </Box>
      <CardHeader
        title={(
          <Stack
            direction="row"
            sx={{ height: '100%', justifyContent: 'flex-end' }}
          >
            {title}
          </Stack>
        )}
        sx={{ marginTop: '-0.5rem' }}
      />
      <CardContent sx={{ padding: '0 0.5rem' }}>{children}</CardContent>
    </MuiCard>
  )
}

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  sx: PropTypes.shape({}),
  icon: PropTypes.node,
}

export default Card
