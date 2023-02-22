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
      {icon && (
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          height: '8rem',
          width: '8rem',
          background: linearBg,
          borderRadius: '3px 3px 85px',
        }}
      >
        <Box sx={{ marginTop: '1rem', marginLeft: '1rem' }}>{icon}</Box>
      </Box>
      )}
      <CardHeader
        title={(
          <Stack
            direction="row"
            sx={{ height: '100%', justifyContent: icon && 'flex-end' }}
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
