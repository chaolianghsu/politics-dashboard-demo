import { Unstable_Grid2 as Grid, Box } from '@mui/material'

import { LoginForm } from '@/containers/login'
import LoginHeroImg from '@/assets/login-bg.jpg'

function Login() {
  return (
    <Grid container>
      <Grid xs={7} sx={{ height: '100vh' }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${LoginHeroImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Grid>
      <Grid xs={5} sx={{ display: 'flex' }}>
        <LoginForm />
      </Grid>
    </Grid>
  )
}

Login.propTypes = {}

export default Login
