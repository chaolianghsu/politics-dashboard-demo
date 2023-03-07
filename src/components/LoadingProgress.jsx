import { Box, CircularProgress } from '@mui/material'

function LoadingProgress() {
  return (
    <Box
      sx={{
        zIndex: 2000,
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.4)',
        top: 0,
        left: 0,
        color: '#D0D0D0',
      }}
    >
      <CircularProgress color="inherit" size={100} thickness={4} />
    </Box>
  )
}

LoadingProgress.propTypes = {}

export default LoadingProgress
