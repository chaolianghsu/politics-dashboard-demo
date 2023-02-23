import { Unstable_Grid2 as Grid, Box } from '@mui/material'

import { LoginForm } from '@/containers/login'
import LoginHeroImg from '@/assets/login-bg.jpg'

function Login() {
  return (
    <Grid container sx={{ position: 'relative', height: '100%' }}>
      <Grid
        xs={12}
        sm={5}
        md={7}
        sx={{
          height: '100%',
          position: { xs: 'absolute', sm: 'relative' },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${LoginHeroImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: { xs: 0.1, sm: 1 },
          }}
        />
      </Grid>
      <Grid
        xs={12}
        sm={7}
        md={5}
        sx={{
          display: 'flex',
          position: 'relative',
          zIndex: 100,
          height: '100%',
        }}
      >
        <LoginForm />
      </Grid>
    </Grid>
  )
}

Login.propTypes = {}

export default Login
