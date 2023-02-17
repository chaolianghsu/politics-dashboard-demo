import { Box } from '@mui/material'

import LogoImage from '@/assets/logo.png'

function Logo() {
  return (
    <Box sx={{
      width: '100%', height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <img
        src={LogoImage}
        alt="網戰動態數據儀表板"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          padding: '2rem',
        }}
      />
    </Box>
  )
}

export default Logo
